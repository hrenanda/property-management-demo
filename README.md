# Hunilink — Demo Property Management

Demo publik: [hrenanda.github.io/property-management-demo](https://hrenanda.github.io/property-management-demo/).

Buka `dist/index.html` dengan browser. Satu file ini sudah memuat seluruh tampilan, gaya, dan interaksi, tanpa pemasangan aplikasi atau koneksi internet.

## Login simulasi

Kunjungan pertama dimulai dari halaman login. Pilih kartu peran untuk mengisi akun contoh, lalu tekan **Masuk**.

| Peran | Email demo | Kata sandi | Halaman awal |
| --- | --- | --- | --- |
| Pengelola | pengelola@hunilink.demo | demo123 | Ringkasan operasional |
| Penghuni | penghuni@hunilink.demo | demo123 | Portal unit A-1205 |
| Vendor | vendor@hunilink.demo | demo123 | Pekerjaan PT Elevasi Teknik |

Login memvalidasi akun contoh dan menyimpan peran sesi pada tab browser. Kata sandi tidak disimpan. Muat ulang mempertahankan sesi; tombol **Keluar** menghapus sesi dan mengembalikan halaman login. Untuk mencoba peran lain, keluar dan pilih akun berikutnya. Logout tidak menghapus data simulasi.

Menu dan aksi disesuaikan dengan peran. Penghuni hanya melihat tagihan, izin, dan pesanan unit A-1205; vendor hanya melihat dan memperbarui tugas PT Elevasi Teknik. Pengelola memantau seluruh operasional, memverifikasi pembayaran, menyetujui izin, dan menugaskan aduan. Checklist lapangan diperbarui oleh vendor; pengelola melihat laporannya.

## Publikasi GitHub Pages

Sumber publikasi: branch `main`, folder `/ (root)`. Halaman `index.html` di root membuka demo pada `dist/index.html`. Berkas `.nojekyll` memastikan berkas statis dilayani langsung.

Aktivasi dilakukan melalui pengaturan GitHub Pages pada repositori. Ketersediaan Pages untuk repositori privat bergantung pada paket akun GitHub.

## Cara mencoba

1. Login **Pengelola**: lihat dashboard, cari unit, tambah unit, buat tagihan, dan verifikasi pembayaran.
2. Tekan **Keluar**, lalu login **Penghuni**. Buka tagihan, isi referensi dan lampirkan bukti contoh untuk konfirmasi pembayaran.
3. Keluar dan login kembali sebagai pengelola. Buka invoice berstatus **Menunggu verifikasi**, lalu verifikasi. Ringkasan kas diperbarui dan kuitansi demo dapat diunduh.
4. Buat pengajuan renovasi dengan identitas fiktif. Dari peran pengelola, lakukan review engineering, kemudian persetujuan pengelola. Unduh izin demo.
5. Untuk aduan, tekan **Tugaskan teknisi** dari akun pengelola. Keluar dan login sebagai vendor, isi seluruh checklist dan catatan, lalu selesaikan pekerjaan. Status aduan ikut diperbarui.
6. Buka **Otomasi & laporan** untuk mencoba pratinjau WhatsApp dan morning recap. Laporan tagihan dapat diunduh sebagai CSV yang dapat dibuka di Excel.
7. Coba layanan laundry, galon, atau servis AC. Pesanan dicatat hanya di demo.

## Batas demo

- Semua nama, unit, biaya, kontak, dan histori adalah data fiktif untuk presentasi.
- Data disimpan di browser melalui localStorage, bukan database. Browser dapat membatasi penyimpanan pada file lokal atau mode privat.
- Login, sesi, dan pembatasan peran adalah simulasi pada browser, bukan autentikasi atau sistem hak akses server untuk produksi. Seluruh data contoh dan akun demo ada pada sumber statis publik. Jangan gunakan kata sandi atau data pribadi asli.
- WhatsApp, email, AI, jadwal otomatis, payment gateway, dan QR akses keamanan belum terintegrasi.
- Unggahan hanya mencatat nama berkas, tidak mengunggah atau menyimpan isi berkas.
- Ekspor laporan menggunakan CSV, bukan XLSX otomatis. Kuitansi dan izin berupa HTML yang dapat dicetak melalui browser.
- Tanggal acuan demo: 29 Oktober 2026. Grafik Mei–September adalah ilustrasi; angka Oktober mengikuti data transaksi demo.
- Tombol **Kembalikan data awal** mengembalikan contoh awal setelah konfirmasi.

Rujukan fitur: RANCANGAN_AWAL_APLIKASI_PROPERTY_MANAGEMENT.md, versi 1.0.
