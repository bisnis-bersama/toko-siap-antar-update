PERBAIKAN PAKET KURIR — TOKO SIAP ANTAR

Yang diperbaiki:
1. data-pesana-kurir.html sekarang meminta antrean berdasarkan status yang layak, bukan membaca seluruh koleksi orders.
2. Pemeriksaan role kurir menerima alias role umum (kurir/courier/driver/mitra_kurir/mitra_pengantaran) dan variasi field role.
3. Halaman dompet/pencairan mengizinkan role kurir, sehingga tidak lagi ditolak hanya karena role-nya kurir.
4. Tautan menu tetap menggunakan nama file yang benar-benar ada di paket ini: data-pesana-kurir.html.

PENTING — Firestore Rules:
Pesan “Missing or insufficient permissions” berasal dari Firebase Rules, bukan sekadar tampilan HTML. Mengganti HTML saja tidak dapat memberi izin ke Firestore. Di Firebase Console > Firestore Database > Rules, pastikan rules proyek mengizinkan pengguna ber-role kurir membaca antrean yang statusnya DISETUJUI, MENUNGGU_KURIR, SIAP_DIAMBIL, atau DIKEMAS, serta mengambil pesanan dengan validasi atomik. Jangan membuka seluruh orders untuk semua pengguna.

Query antrean sekarang memakai filter status. Karena query Firestore harus memenuhi Rules untuk setiap dokumen hasil, aturan baca antrean harus selaras dengan status tersebut. Tombol Ambil/Tolak juga memerlukan izin update khusus kurir dengan validasi bahwa pesanan belum diambil kurir lain. Halaman ini tidak mengubah Rules Firebase secara otomatis.

Jika masih muncul “Missing or insufficient permissions”, kirimkan Firestore Rules yang sedang dipakai agar aturan bisa disesuaikan dengan field persis proyek Anda. Jangan menempelkan rules generik tanpa mencocokkan aturan admin, mitra, pelanggan, dan kurir.
