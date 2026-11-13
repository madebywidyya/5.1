/**
 * Class 5.1 — Main application
 */
(async function () {
  // ---------- Sky decoration ----------
  const sky = document.getElementById('sky');
  for (let i = 0; i < 5; i++) {
    const c = document.createElement('div');
    c.className = 'cloud';
    const size = 40 + Math.random() * 60;
    c.style.width = size + 'px';
    c.style.height = size * 0.4 + 'px';
    c.style.top = 5 + Math.random() * 40 + '%';
    c.style.animationDuration = 40 + Math.random() * 50 + 's';
    c.style.animationDelay = -Math.random() * 40 + 's';
    c.style.opacity = 0.4 + Math.random() * 0.3;
    sky.appendChild(c);
  }
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 60 + '%';
    s.style.animationDelay = Math.random() * 3 + 's';
    sky.appendChild(s);
  }

  // ---------- Greeting by time ----------
  const hour = new Date().getHours();
  let greet = 'Selamat datang';
  if (hour < 11) greet = 'Good Morning ☀️';
  else if (hour < 15) greet = 'Good Afternoon 🌤';
  else if (hour < 18) greet = 'Good Afternoon 🌸';
  else greet = 'Good Evening 🌙';
  document.getElementById('greeting').textContent = greet;

  // ---------- Live clock ----------
  function tick() {
    const now = new Date();
    document.getElementById('liveClock').textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('liveDate').textContent = now.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' });
  }
  tick();
  setInterval(tick, 1000);

  // ---------- Countdown (example: end of school year / special day — adjust date) ----------
  const target = new Date('2027-06-15T00:00:00');
  function updateCountdown() {
    const diff = target - new Date();
    if (diff <= 0) {
      document.getElementById('countdown').textContent = 'Hari ini!';
      return;
    }
    const d = Math.floor(diff / 86400000);
    document.getElementById('countdown').textContent = d + ' hari';
  }
  updateCountdown();
  setInterval(updateCountdown, 60000);

  // ---------- Random class quote ----------
  const quotes = [
    '“Kebersamaan adalah cerita terindah.”',
    '“One class, one story, nineteen memories.”',
    '“Belajar bersama, tumbuh bersama.”',
    '“Hari ini jadi kenangan yang manis.”',
    '“Class 5.1 — tempat kita saling menguatkan.”',
    '“Senyum kecil, makna besar.”'
  ];
  document.getElementById('classQuote').textContent = quotes[Math.floor(Math.random() * quotes.length)];

  // ---------- Load members ----------
  let members = [];
  try {
    const res = await fetch('data/members.json');
    members = await res.json();
  } catch (e) {
    console.warn('Members data missing', e);
  }

  // Filter absen options
  const filterSel = document.getElementById('filterAbsen');
  members.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.absen;
    opt.textContent = 'Absen ' + m.absen;
    filterSel.appendChild(opt);
  });

  function renderMembers(list) {
    const grid = document.getElementById('membersGrid');
    if (!list.length) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted)">Tidak ada hasil.</p>';
      return;
    }
    grid.innerHTML = list.map(m => `
      <article class="member-card" data-id="${m.id}" tabindex="0" role="button">
        <div class="avatar">${m.nickname.charAt(0)}</div>
        <h3>${m.name}</h3>
        <div class="nick">${m.nickname}</div>
        <span class="absen">Absen ${m.absen}</span>
      </article>
    `).join('');
    grid.querySelectorAll('.member-card').forEach(card => {
      card.addEventListener('click', () => openProfile(+card.dataset.id));
      card.addEventListener('keydown', e => { if (e.key === 'Enter') openProfile(+card.dataset.id); });
    });
  }

  function filterMembers() {
    const q = (document.getElementById('searchInput').value || '').toLowerCase().trim();
    const abs = filterSel.value;
    let list = members;
    if (abs !== 'all') list = list.filter(m => String(m.absen) === abs);
    if (q) list = list.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.nickname.toLowerCase().includes(q)
    );
    renderMembers(list);
  }

  document.getElementById('searchInput').addEventListener('input', filterMembers);
  filterSel.addEventListener('change', filterMembers);
  renderMembers(members);

  // ---------- Profile modal ----------
  const modal = document.getElementById('profileModal');
  function openProfile(id) {
    const m = members.find(x => x.id === id);
    if (!m) return;
    document.getElementById('profileContent').innerHTML = `
      <button class="modal-close" id="closeModal" aria-label="Tutup">×</button>
      <div class="profile-avatar">${m.nickname.charAt(0)}</div>
      <h2 style="text-align:center;color:var(--navy);font-size:1.25rem">${m.name}</h2>
      <p style="text-align:center;color:var(--baby-deep);font-weight:600">${m.nickname} · Absen ${m.absen}</p>
      <div class="profile-grid">
        <div class="profile-row"><strong>Motto</strong>${m.motto}</div>
        <div class="profile-row"><strong>Hobi</strong>${m.hobby}</div>
        <div class="profile-row"><strong>Makanan favorit</strong>${m.food}</div>
        <div class="profile-row"><strong>Minuman favorit</strong>${m.drink}</div>
        <div class="profile-row"><strong>Warna favorit</strong>${m.color}</div>
        <div class="profile-row"><strong>Fun fact</strong>${m.funFact}</div>
        <div class="profile-row"><strong>Cita-cita</strong>${m.citaCita}</div>
        <div class="profile-row"><strong>Quote pribadi</strong>“${m.quote}”</div>
        ${m.github ? `<div class="profile-row"><strong>Project</strong><a href="${m.github}" target="_blank" rel="noopener" style="color:var(--baby-deep)">Lihat GitHub Pages →</a></div>` : ''}
      </div>
    `;
    modal.classList.add('open');
    document.getElementById('closeModal').onclick = () => modal.classList.remove('open');
  }
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

  // ---------- Piket ----------
  const piket = [
    { day: 'Senin', icon: '🧹', names: ['Putri', 'Shafiyyah', 'Bunga', 'Kartika'] },
    { day: 'Selasa', icon: '✨', names: ['Nadin', 'Ziya', 'Widiya', 'Khansa'] },
    { day: 'Rabu', icon: '🪣', names: ['Salsa', 'Bintang', 'Hafiza', 'Nisa'] },
    { day: 'Kamis', icon: '🌟', names: ['Luna', 'Nadya', 'Samsa', 'Nindy'] },
    { day: 'Jumat', icon: '💫', names: ['Donita', 'Rily', 'Manda', 'Haniffah'] }
  ];
  document.getElementById('piketGrid').innerHTML = piket.map(p => `
    <div class="day-card">
      <h3>${p.icon} ${p.day}</h3>
      <ul>${p.names.map(n => `<li>${n}</li>`).join('')}</ul>
    </div>
  `).join('');

  // ---------- Birthday ----------
  document.getElementById('bdayGrid').innerHTML = members.map(m => {
    const d = new Date(m.birthday);
    const label = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' });
    return `<div class="bday-card"><div class="date">${label}</div><div>${m.nickname}</div></div>`;
  }).join('');

  // ---------- Guestbook (localStorage) ----------
  const GUEST_KEY = 'class51_guestbook';
  function loadGuests() {
    try { return JSON.parse(localStorage.getItem(GUEST_KEY) || '[]'); } catch { return []; }
  }
  function saveGuests(arr) {
    localStorage.setItem(GUEST_KEY, JSON.stringify(arr.slice(0, 50)));
  }
  function renderGuests() {
    const list = loadGuests();
    const el = document.getElementById('guestList');
    if (!list.length) {
      el.innerHTML = '<p style="text-align:center;color:var(--muted);font-size:0.9rem">Belum ada pesan. Jadilah yang pertama!</p>';
      return;
    }
    el.innerHTML = list.map(g => `
      <div class="memory-item">
        <div class="from">${g.name}</div>
        <div>${g.msg}</div>
      </div>
    `).join('');
  }
  document.getElementById('guestForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('guestName').value.trim();
    const msg = document.getElementById('guestMsg').value.trim();
    if (!name || !msg) return;
    const arr = loadGuests();
    arr.unshift({ name, msg, at: Date.now() });
    saveGuests(arr);
    document.getElementById('guestForm').reset();
    renderGuests();
  });
  renderGuests();

  // ---------- Jar of Memories ----------
  const jarMemories = [
    'Hari pertama masuk kelas — semua masih malu-malu.',
    'Ketawa bareng sampai perut sakit karena satu candaan.',
    'Project desain grafis yang dikerjakan sampai malam.',
    'Berbagi bekal di jam istirahat.',
    'Foto bersama yang berantakan tapi paling berkesan.',
    'Momen presentasi yang deg-degan tapi berhasil.',
    'Menolong teman yang kesulitan materi.',
    'Ulang tahun yang dirayakan diam-diam di kelas.'
  ];
  document.getElementById('jarBtn').addEventListener('click', () => {
    const r = jarMemories[Math.floor(Math.random() * jarMemories.length)];
    const el = document.getElementById('jarResult');
    el.style.display = 'block';
    el.textContent = '“' + r + '”';
  });

  // ---------- Who Am I ----------
  let whoAnswer = null;
  document.getElementById('whoBtn').addEventListener('click', () => {
    const m = members[Math.floor(Math.random() * members.length)];
    whoAnswer = m.nickname.toLowerCase();
    document.getElementById('whoClue').style.display = 'block';
    document.getElementById('whoClue').textContent =
      `Petunjuk: Hobi = ${m.hobby}. Makanan favorit = ${m.food}. Fun fact: ${m.funFact}`;
    document.getElementById('whoGuess').style.display = 'block';
    document.getElementById('whoCheck').style.display = 'block';
    document.getElementById('whoResult').style.display = 'none';
    document.getElementById('whoGuess').value = '';
  });
  document.getElementById('whoCheck').addEventListener('click', () => {
    const g = (document.getElementById('whoGuess').value || '').trim().toLowerCase();
    const res = document.getElementById('whoResult');
    res.style.display = 'block';
    if (g === whoAnswer) {
      res.style.color = '#2a7a4b';
      res.textContent = 'Benar! 🎉 Itu ' + whoAnswer;
    } else {
      res.style.color = '#a52d36';
      res.textContent = 'Belum tepat. Coba lagi!';
    }
  });

  // ---------- Mood ----------
  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mood = btn.dataset.mood;
      const log = JSON.parse(localStorage.getItem('class51_moods') || '{}');
      log[mood] = (log[mood] || 0) + 1;
      localStorage.setItem('class51_moods', JSON.stringify(log));
      document.getElementById('moodLog').textContent = `Kamu memilih ${mood}. Terima kasih sudah berbagi suasana hati!`;
    });
  });

  // ---------- Music player ----------
  const audio = document.getElementById('bgAudio');
  const playBtn = document.getElementById('playPauseBtn');
  const muteBtn = document.getElementById('muteBtn');
  let userStarted = false;

  function tryPlay() {
    if (!audio.src || audio.src.endsWith('/')) {
      // No legal source set — still update UI so structure works
      playBtn.textContent = '▶';
      return;
    }
    audio.play().then(() => {
      playBtn.textContent = '⏸';
      userStarted = true;
    }).catch(() => {
      playBtn.textContent = '▶';
    });
  }

  playBtn.addEventListener('click', () => {
    if (audio.paused) tryPlay();
    else {
      audio.pause();
      playBtn.textContent = '▶';
    }
  });
  muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? '🔇' : '🔊';
  });

  // Enter gate
  document.getElementById('enterBtn').addEventListener('click', () => {
    document.getElementById('enterGate').classList.add('hidden');
    userStarted = true;
    tryPlay();
  });

  // ---------- Nav ----------
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      nav.querySelectorAll('a').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
    });
  });

  // ---------- Back to top ----------
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 400);
  });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
