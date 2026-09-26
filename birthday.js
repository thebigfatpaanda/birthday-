// A short, synthesized birthday tune. Sound starts only after the gift is tapped.
(() => {
  const dialog = document.getElementById('birthday-show');
  if (!dialog) return;
  const gift = document.getElementById('gift-button');
  const message = document.getElementById('gift-message');
  const line = document.getElementById('show-line');
  const toggle = document.getElementById('music-toggle');
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  let audioContext, timers = [], activeVoices = [], muted = false;
  const notes = [
    ['G4',.3],['G4',.16],['A4',.48],['G4',.48],['C5',.48],['B4',.85],
    ['G4',.3],['G4',.16],['A4',.48],['G4',.48],['D5',.48],['C5',.85],
    ['G4',.3],['G4',.16],['G5',.48],['E5',.48],['C5',.48],['B4',.48],['A4',.85],
    ['F5',.3],['F5',.16],['E5',.48],['C5',.48],['D5',.48],['C5',1.05]
  ];
  const pitch = {G4:392,A4:440,B4:493.88,C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99};
  const after = (fn, ms) => timers.push(setTimeout(fn, ms));
  function stop() {
    timers.forEach(clearTimeout); timers = [];
    activeVoices.forEach(v => { try { v.stop(); } catch (_) {} }); activeVoices = [];
  }
  function playNote(frequency, when, duration) {
    const voice = audioContext.createOscillator();
    const volume = audioContext.createGain();
    voice.type = 'sine'; voice.frequency.value = frequency;
    volume.gain.setValueAtTime(0, when);
    volume.gain.linearRampToValueAtTime(.14, when + .025);
    volume.gain.exponentialRampToValueAtTime(.001, when + duration * .88);
    voice.connect(volume).connect(audioContext.destination);
    voice.start(when); voice.stop(when + duration);
    activeVoices.push(voice);
  }
  async function start() {
    stop();
    dialog.classList.remove('celebrate');
    line.textContent = 'Make a wish…';
    if (!dialog.open) dialog.showModal();
    if (!muted && AudioContextClass) {
      try {
        audioContext ||= new AudioContextClass();
        await audioContext.resume();
        let t = audioContext.currentTime + .08;
        notes.forEach(([key, length]) => { playNote(pitch[key], t, length); t += length + .035; });
      } catch (_) { toggle.textContent = '🔇 Music unavailable'; }
    }
    after(() => line.textContent = 'This day is all yours 💖', 3200);
    after(() => line.textContent = 'Here’s to all your wishes coming true ✨', 7000);
    after(finish, 12000);
    confetti();
  }
  function finish() {
    stop();
    dialog.classList.add('celebrate');
    line.textContent = 'You are so loved. Happy birthday! 🎉';
    confetti();
    after(() => { dialog.close(); reveal(); }, 2200);
  }
  function reveal() {
    message.classList.add('show');
    message.scrollIntoView({behavior: 'smooth', block: 'center'});
  }
  gift.addEventListener('click', start);
  document.getElementById('replay-button').addEventListener('click', start);
  document.getElementById('show-skip').addEventListener('click', () => { stop(); dialog.close(); reveal(); });
  document.getElementById('show-close').addEventListener('click', () => { stop(); dialog.close(); });
  dialog.addEventListener('close', stop);
  toggle.addEventListener('click', () => {
    muted = !muted;
    toggle.textContent = muted ? '🔇 Music off' : '🔊 Music on';
    toggle.setAttribute('aria-label', muted ? 'Unmute music' : 'Mute music');
    if (muted) activeVoices.forEach(v => { try { v.stop(); } catch (_) {} });
    else start();
  });
})();
