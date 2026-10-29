# Validasi demo login v2

Tanggal: 30 Oktober 2026.

## Pemeriksaan lokal sebelum unggah

- JavaScript valid; `node verify-demo.cjs` lulus.
- Kunjungan baru menampilkan login; kata sandi salah ditolak.
- Tiga akun demo masuk ke halaman dan menu masing-masing.
- Logout menghapus sesi dan tampilan sebelumnya; data simulasi tetap ada.
- Muat ulang memulihkan sesi tab yang aktif.
- Seluruh 12 kombinasi halaman dan peran berhasil dirender.
- Aksi pengelola, unit penghuni, dan pekerjaan vendor diperiksa sesuai lingkup peran.
- Perhitungan invoice, pencegahan tagihan ganda, verifikasi pembayaran, persetujuan izin, penugasan aduan, dan checklist selesai diperiksa.
- Browser lokal: login pengelola, penghuni, dan vendor berhasil dicoba langsung.
- Browser lokal: aduan dari A-1205 dibuat penghuni, diterima pengelola, ditugaskan ke vendor, kemudian diselesaikan melalui checklist dan catatan.
- Browser lokal: sesi vendor dan status pekerjaan tetap ada setelah muat ulang.
- Browser lokal: kata sandi salah menampilkan pesan kesalahan dan tetap berada di login.
- Tata letak login diperiksa pada breakpoint desktop dan ponsel; konten tidak melebar keluar layar.

Login ini adalah simulasi frontend untuk presentasi, bukan pengujian autentikasi server atau penilaian keamanan produksi.
