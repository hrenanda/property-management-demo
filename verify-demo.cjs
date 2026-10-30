const fs = require('fs');
const vm = require('vm');
const assert = require('assert');
const html = fs.readFileSync('dist/index.html', 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const elements = new Map();
const el = key => {
  if (!elements.has(key)) elements.set(key, {innerHTML:'',textContent:'',hidden:false,style:{},classList:{remove(){},toggle(){}},focus(){},setAttribute(){},querySelectorAll(){return[]}});
  return elements.get(key);
};
const sessionValues = new Map();
const context = vm.createContext({
  structuredClone, console, Blob, URL, assert,
  setTimeout:()=>0, clearTimeout(){},
  localStorage:{getItem(){return null},setItem(){}},
  sessionStorage:{getItem:k=>sessionValues.get(k)||null,setItem:(k,v)=>sessionValues.set(k,v),removeItem:k=>sessionValues.delete(k)},
  document:{querySelector:el,querySelectorAll(){return[]},body:{style:{}},addEventListener(){},createElement(){return{click(){}}}},
  window:{scrollTo(){}},
  FormData:class {constructor(form){this.form=form} *[Symbol.iterator](){yield* Object.entries(this.form)} get(k){return this.form[k]}}
});
vm.runInContext(script, context);
vm.runInContext(`
  assert.equal(session,null,'first visit starts at login');
  assert.equal($('#appview').hidden,true);
  assert($('#loginview').innerHTML.includes('Selamat datang di Hunilink.'));
  const eventFor=target=>({preventDefault(){},target});
  submitLogin(eventFor({email:'pengelola@hunilink.demo',password:'salah'}));
  assert.equal(session,null,'wrong password must not create a session');
  assert.equal($('#loginerror').hidden,false);
  for(const r of Object.keys(accounts)) {
    selectLoginRole(r);
    assert.equal($('#loginEmail').value,accounts[r].email);
    assert.equal(submitLogin(eventFor({email:accounts[r].email,password:'demo123'})),true);
    assert.equal(session.role,r); assert.equal(page,accounts[r].home);
    assert.equal($('#loginview').hidden,true); assert.equal($('#appview').hidden,false);
    assert.equal(JSON.parse(sessionStorage.getItem(SESSION_KEY)).role,r);
    session=null; assert(restoreDemoSession(),'refresh restores role');
    assert.equal(session.role,r);
    logoutDemo();
    assert.equal(session,null); assert.equal(sessionStorage.getItem(SESSION_KEY),null);
    assert.equal($('#content').innerHTML,'','logout removes private view from DOM');
    assert.equal($('#appview').hidden,true);
  }
  let checks=0;
  for (const [r,items] of Object.entries(navs)) {
    role=r; session={role:r};
    for (const [p] of items) {
      page=p; render();
      const html=$('#content').innerHTML;
      assert(html.length>500,r+' '+p+' rendered');
      assert(!html.includes('undefined'),r+' '+p+' undefined');
      for(const m of html.matchAll(/onclick="([^"]*)"/g)) new Function(m[1]);
      checks++;
    }
  }
  role='bm'; session={role:'bm'}; page='dashboard';
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
  updateCheck(task.id,0,true);
  assert.equal(task.checks[0],false,'manager can monitor but cannot edit vendor checklist');
  role='vendor'; session={role:'vendor'};
  completeTask({preventDefault(){},target:{note:{value:'Pipa diperbaiki dan diuji.'}}},task.id);
  assert.notEqual(task.status,'Selesai','incomplete checklist must block completion');
  task.checks.forEach((_,i)=>updateCheck(task.id,i,true));
  completeTask({preventDefault(){},target:{note:{value:'Pipa diperbaiki dan diuji.'}}},task.id);
  assert.equal(task.status,'Selesai');
  assert.equal(data.requests.find(r=>r.id==='ADU-003').status,'Selesai');
  role='bm'; session={role:'bm'};
  const event={preventDefault(){},target:{unit:'A-1205',period:'2026-11',due:'2026-11-10',electric:'325000',water:'85000'}};
  const before=data.bills.length;
  createBilling(event);
  assert.equal(data.bills.length,before+1);
  assert.equal(total(data.bills.at(-1)),1328000);
  createBilling(event);
  assert.equal(data.bills.length,before+1,'duplicate invoice must be blocked');
  role='tenant'; session={role:'tenant'}; page='portal';
  assert(scopedBills().every(b=>b.unit==='A-1205'));
  go('units'); assert.equal(page,'portal','tenant cannot open unit directory');
  const snapshot=JSON.stringify(data);
  createBilling(event); advanceRequest('IZN-001'); updateCheck(1,0,true);
  submitRequest(eventFor({unit:'B-1502',type:'Aduan',title:'Tidak boleh'}));
  assert.equal(JSON.stringify(data),snapshot,'tenant cannot mutate other role data');
  $('#modalroot').innerHTML=''; invoice('INV-202610-002');
  assert.equal($('#modalroot').innerHTML,'','tenant cannot inspect another unit invoice');
  role='vendor'; session={role:'vendor'}; page='vendor';
  go('billing'); assert.equal(page,'vendor','vendor cannot open financial pages');
  assert.equal(scopedBills().length,0);
  assert.equal(allowedTask(3),false,'vendor cannot inspect another vendor task');
  session=null; $('#modalroot').innerHTML=''; unitForm();
  assert.equal($('#modalroot').innerHTML,'','logged out action is blocked');
  assert.equal(esc('<img src=x onerror=alert(1)>'),'&lt;img src=x onerror=alert(1)&gt;');
  console.log('LOCAL CHECKS PASSED: three logins, wrong password, logout, session restore, role access, unit/vendor scoping; '+checks+' role/page renders; payment, approval, dispatch, checklist, invoice totals and duplicate prevention.');
`, context);
