TOKO SIAP ANTAR — KERANGKA HALAMAN FIRESTORE

File tambahan:
- firebase-config.js : konfigurasi Firebase proyek toko-siap-antar-9a7bb
- common.js / style.css : helper dan tema bersama
- login.html / register.html
- akun.html / checkout.html / riwayat.html / lacak.html
- admin.html / mitra.html / produk-admin.html / pengguna.html

File katalog, keranjang, logo dan gambar dari ZIP awal dipertahankan.

PENTING SEBELUM LIVE:
1. Pastikan Firebase Console > Firestore Rules memakai rules yang sudah disepakati dan sesuaikan nama field/koleksi jika berbeda.
2. Buat akun superadmin melalui register.html, lalu ubah role dokumen users/{UID} menjadi "superadmin" secara manual di Firebase Console. Jangan membuat dropdown role publik.
3. Hosting halaman dengan server HTTP/HTTPS (misalnya Firebase Hosting). Modul JavaScript tidak berjalan baik bila file dibuka langsung sebagai file://.
4. Checkout menggunakan localStorage key "cart" dan mendukung field item: id/productId, nama/name/title, qty/quantity, harga/price. Jika keranjang lama memakai format lain, samakan di checkout.html.
5. Kode ini merupakan kerangka awal yang perlu diuji dengan Rules aktual. Query pesanan yang memakai orderBy dapat meminta indeks Firestore; ikuti tautan indeks dari pesan error Firebase jika muncul.
6. Rules sebelumnya hanya mengizinkan admin mengubah pesanan dan tracking. Karena itu tombol mitra "Tandai selesai" mungkin ditolak; mitra hanya dapat membaca pesanan yang memiliki mitraUid sama dengan UID akunnya.
7. Koleksi tracking publik hanya boleh berisi status, invoice non-sensitif, riwayat status, dan waktu pembaruan. Jangan taruh alamat, email, atau nomor WhatsApp di koleksi ini.
8. Aturan sebelumnya mengizinkan admin mengubah dan menghapus pesanan. Sebelum produksi, sebaiknya perketat validasi status, pemilik pesanan, harga/total, dan perubahan role melalui Rules.
9. Halaman produk menggunakan koleksi "products" dengan field nama, kategori, harga, stok, gambar, deskripsi. Katalog lama berbasis Google Sheets tidak otomatis membaca koleksi ini; integrasikan jika ingin satu sumber produk.
10. Tidak ada koleksi atau data Firestore yang dihapus oleh proses ini.
