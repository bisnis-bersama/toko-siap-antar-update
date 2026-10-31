# Alur Pesanan Toko Siap Antar

## Status pesanan
1. Checkout membuat satu dokumen `orders` untuk setiap mitra pemilik produk:
   - `status: pending`
   - `statusPemenuhan: pending`
   - `statusPembayaran: belum_verifikasi` (COD: `cod_menunggu`)
2. Admin menyetujui pesanan: `status: disetujui`.
3. Mitra memilih proses sendiri atau serahkan ke kurir:
   - Proses sendiri/ekspedisi: `status: dikemas` → `status: dikirim`.
   - Serahkan ke kurir: `status: menunggu_kurir`.
4. Kurir mengambil pesanan: `status: diantar`.
5. Mitra/kurir menyelesaikan pesanan:
   - `status: selesai`
   - `statusPemenuhan: selesai`
   - `statusPembayaran: menunggu_verifikasi`
6. Tab Verifikasi Admin mencari `statusPembayaran == menunggu_verifikasi`.
7. Setelah admin memverifikasi pembagian saldo:
   - `statusPembayaran: terverifikasi`
   - `saldoDibagi: true`
   - `status` tetap `selesai`.

## Pembagian E-Wallet
- Mitra mengirim sendiri atau melalui ekspedisi: harga produk + ongkir masuk ke E-Wallet mitra, dipotong 5%.
- Pesanan diserahkan kepada kurir Siap Antar: harga produk masuk ke mitra dan ongkir masuk ke kurir; masing-masing dipotong 5%.
- Total potongan 5% masuk ke saldo E-Wallet admin.
- Mutasi disimpan di koleksi `ewallet_transactions` dengan field `uid`, `type`, dan `amount` agar terbaca pada halaman E-Wallet.
- Saldo disimpan pada `users/{uid}` di field `saldoEwallet`, `saldoWallet`, `saldo`, dan `totalPendapatan`.
- E-Wallet pelanggan tidak menerima hasil penjualan; hanya digunakan untuk proses pengembalian dana bila pesanan dibatalkan.

## Catatan keamanan
Halaman web memeriksa sesi dan status, tetapi Firebase Security Rules tetap wajib membatasi:
- hanya admin yang dapat menyetujui dan memverifikasi;
- hanya mitra pemilik pesanan yang dapat mengubah proses mitra;
- hanya kurir yang mengambil/menyelesaikan pesanan yang ditugaskan kepadanya;
- hanya admin/backend tepercaya yang boleh menulis saldo dan mutasi E-Wallet.
Untuk produksi, penulisan saldo idealnya dipindahkan ke Cloud Functions agar pengguna tidak dapat memalsukan kredit melalui browser.
