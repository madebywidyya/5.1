# Class 5.1 — One Class, One Story, Nineteen Memories

Website kelas 5.1 yang cute, minimalis, modern, dan siap deploy ke **GitHub Pages**.

## Fitur utama

- **Home**: Welcome, slogan, live clock, tanggal, countdown, quote acak, pengumuman
- **19+ anggota**: Kartu profil dari data Google Sheet (nama, nickname, absen, motto, hobi, makanan/minuman favorit, warna, fun fact, cita-cita, quote, link project)
- Search nama/nickname + filter absen
- Klik kartu → profil lengkap (modal)
- **Wali kelas** (perempuan, suka kuning)
- **Jadwal Piket** Senin–Jumat (sesuai daftar yang diberikan)
- **Jadwal Pelajaran** Senin–Jumat
- **Class Memories** + Jar of Memories (kenangan acak)
- **Birthday Corner**
- **Digital Guestbook** (tersimpan di LocalStorage browser)
- **Who Am I?** tebak anggota dari petunjuk
- **Mood of The Class** (emoji)
- Animasi awan & bintang lembut
- Music bar: play/pause + mute (siap untuk sumber audio legal)
- Enter gate untuk kebijakan autoplay browser
- Responsive, mobile bottom nav, back-to-top
- Favicon + OG image

## Warna

Baby blue `#A8D8EA`, putih, navy `#1B3A4B`, aksen kuning untuk wali kelas.

## Data anggota

Diambil dari Google Sheet yang kamu berikan (nama, nickname, email, link GitHub Pages).  
Field tambahan (motto, hobi, dll.) diisi placeholder yang bisa diganti di `data/members.json`.

## Musik "Kita" — Sheila On 7

Lagu ini **berhak cipta**. Website **tidak** menyertakan file MP3 atau stream tidak resmi.

Cara menambahkan musik legal:

1. Dapatkan izin / gunakan sumber yang legal (misalnya akun streaming resmi sekolah, atau file yang sudah dilisensikan).
2. Upload file audio ke folder `assets/` (mis. `assets/kita.mp3`) **hanya jika** kalian punya hak.
3. Di `index.html`, isi `src` pada elemen `<audio id="bgAudio">`:

```html
<source src="assets/kita.mp3" type="audio/mpeg">
```

Atau gunakan embed YouTube resmi (perlu penyesuaian player).  
Tombol play/pause & mute sudah siap; lagu di-loop; tidak autoplay sampai pengunjung menekan **ENTER CLASS 5.1**.

## Cara menjalankan

1. Buka folder `Class-5.1`.
2. Buka `index.html` di browser, atau:

```bash
npx serve .
```

## Deploy ke GitHub Pages

1. Buat repo baru di GitHub.
2. Upload semua isi folder `Class-5.1` (jangan taruh di subfolder ekstra jika ingin root).
3. Settings → Pages → Source: branch `main`, folder `/ (root)`.
4. Situs akan live di `https://<username>.github.io/<repo>/`.

## Struktur

```
Class-5.1/
├── index.html
├── css/style.css
├── js/app.js
├── data/members.json
├── assets/favicon.svg
├── assets/og-image.svg
└── README.md
```

## Catatan

- Semua konten kelas bersifat fiksi/placeholder di bagian fun fact & motto; sesuaikan dengan data asli anggota.
- Guestbook & mood hanya tersimpan di browser pengunjung (LocalStorage), bukan server.
- Untuk 19 vs 20 nama: data sheet berisi 20 santriwati; semua dimasukkan. Sesuaikan jika perlu.

Dibuat dengan 💙 untuk Class 5.1.
