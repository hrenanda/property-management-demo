# Huni — Demo Property Management

Buka `dist/index.html` dengan browser. Satu file ini sudah memuat seluruh tampilan, gaya, dan interaksi, tanpa pemasangan aplikasi atau koneksi internet.

## Cara mencoba

1. Peran **Pengelola gedung**: lihat dashboard, cari unit, tambah unit, buat tagihan, dan verifikasi pembayaran.
2. Ganti ke **Penghuni · A-1205** di kanan atas. Buka tagihan, isi referensi dan lampirkan bukti contoh untuk konfirmasi pembayaran.
3. Ganti kembali ke pengelola. Buka invoice berstatus **Menunggu verifikasi**, lalu verifikasi. Ringkasan kas diperbarui dan kuitansi demo dapat diunduh.
4. Buat pengajuan renovasi dengan identitas fiktif. Dari peran pengelola, lakukan review engineering, kemudian persetujuan pengelola. Unduh izin demo.
5. Untuk aduan, tekan **Tugaskan teknisi**. Ganti ke peran vendor, isi seluruh checklist dan catatan, lalu selesaikan pekerjaan. Status aduan ikut diperbarui.
6. Buka **Otomasi & laporan** untuk mencoba pratinjau WhatsApp dan morning recap. Laporan tagihan dapat diunduh sebagai CSV yang dapat dibuka di Excel.
7. Coba layanan laundry, galon, atau servis AC. Pesanan dicatat hanya di demo.

## Batas demo

- Semua nama, unit, biaya, kontak, dan histori adalah data fiktif untuk presentasi.
- Data disimpan di browser melalui localStorage, bukan database. Browser dapat membatasi penyimpanan pada file lokal atau mode privat.
- Pergantian peran adalah simulasi, bukan autentikasi atau sistem hak akses produksi.
- WhatsApp, email, AI, jadwal otomatis, payment gateway, dan QR akses keamanan belum terintegrasi.
- Unggahan hanya mencatat nama berkas, tidak mengunggah atau menyimpan isi berkas.
- Ekspor laporan menggunakan CSV, bukan XLSX otomatis. Kuitansi dan izin berupa HTML yang dapat dicetak melalui browser.
- Tanggal acuan demo: 29 Oktober 2026. Grafik Mei–September adalah ilustrasi; angka Oktober mengikuti data transaksi demo.
- Tombol **Kembalikan data awal** mengembalikan contoh awal setelah konfirmasi.

Rujukan fitur: RANCANGAN_AWAL_APLIKASI_PROPERTY_MANAGEMENT.md, versi 1.0.
