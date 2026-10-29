const fs = require('fs');
const vm = require('vm');
const assert = require('assert');
const html = fs.readFileSync('dist/index.html', 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const elements = new Map();
const el = key => {
  if (!elements.has(key)) elements.set(key, {innerHTML:'',textContent:'',style:{},classList:{remove(){},toggle(){}},focus(){},querySelectorAll(){return[]}});
  return elements.get(key);
};
const context = vm.createContext({
  structuredClone, console, Blob, URL, assert,
  setTimeout:()=>0, clearTimeout(){},
  localStorage:{getItem(){return null},setItem(){}},
  document:{querySelector:el,body:{style:{}},addEventListener(){},createElement(){return{click(){}}}},
  window:{scrollTo(){}},
  FormData:class {constructor(form){this.form=form} *[Symbol.iterator](){yield* Object.entries(this.form)} get(k){return this.form[k]}}
});
vm.runInContext(script, context);
vm.runInContext(`
  let checks=0;
  for (const [r,items] of Object.entries(navs)) {
    role=r;
    for (const [p] of items) {
      page=p; render();
      const html=$('#content').innerHTML;
      assert(html.length>500,r+' '+p+' rendered');
      assert(!html.includes('undefined'),r+' '+p+' undefined');
      for(const m of html.matchAll(/onclick="([^"]*)"/g)) new Function(m[1]);
      checks++;
    }
  }
  role='bm'; page='dashboard';
  const b=data.bills.find(b=>b.status==='Menunggu verifikasi');
  const paidBefore=data.bills.filter(b=>b.status==='Lunas').length;
  verify(b.id);
  assert.equal(data.bills.filter(b=>b.status==='Lunas').length,paidBefore+1);
  advanceRequest('IZN-001');
  assert.equal(data.requests[0].status,'Review Pengelola');
  advanceRequest('IZN-001');
  assert.equal(data.requests[0].status,'Disetujui');
  assert.equal(data.units.find(u=>u.id==='A-0601').status,'Renovasi');
  advanceRequest('ADU-003');
  const task=data.tasks.at(-1);
  assert.equal(task.requestId,'ADU-003');
  assert.equal(data.requests.find(r=>r.id==='ADU-003').status,'Dikerjakan');
  completeTask({preventDefault(){},target:{note:{value:'Pipa diperbaiki dan diuji.'}}},task.id);
  assert.notEqual(task.status,'Selesai','incomplete checklist must block completion');
  task.checks.forEach((_,i)=>updateCheck(task.id,i,true));
  completeTask({preventDefault(){},target:{note:{value:'Pipa diperbaiki dan diuji.'}}},task.id);
  assert.equal(task.status,'Selesai');
  assert.equal(data.requests.find(r=>r.id==='ADU-003').status,'Selesai');
  const event={preventDefault(){},target:{unit:'A-1205',period:'2026-11',due:'2026-11-10',electric:'325000',water:'85000'}};
  const before=data.bills.length;
  createBilling(event);
  assert.equal(data.bills.length,before+1);
  assert.equal(total(data.bills.at(-1)),1328000);
  createBilling(event);
  assert.equal(data.bills.length,before+1,'duplicate invoice must be blocked');
  role='tenant'; assert(scopedBills().every(b=>b.unit==='A-1205'));
  console.log(checks+' role/page renders passed; inline button syntax passed; payment, approval, dispatch, checklist and invoice calculations passed.');
`, context);
