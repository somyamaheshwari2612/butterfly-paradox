let audioCtx = null;
let machineHumOsc = null;
let machineHumGain = null;
let bwooomTimer = null;
export let isMachineSlumbering = false;
export let isMuted = false;

// Audio context nodes for global effects
let masterConvolver = null;
let globalDelay = null;
let globalDelayFeedback = null;

// Sequencer state
let currentPhaseOscillators = [];
let clockTimer = null;
let reconstructionPlaying = false;

function initCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Setup basic global effects (very dry by default, will be wettened on instability)
    globalDelay = audioCtx.createDelay(2.0);
    globalDelay.delayTime.value = 0.4;
    globalDelayFeedback = audioCtx.createGain();
    globalDelayFeedback.gain.value = 0; // 0 by default, increases with instability

    globalDelay.connect(globalDelayFeedback);
    globalDelay.connect(globalDelayFeedback);
    globalDelayFeedback.connect(globalDelay);
    globalDelay.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended' && !isMuted) {
    audioCtx.resume();
  }
}

export async function toggleMute() {
  if (!audioCtx) initCtx();
  if (audioCtx.state === 'running') {
    await audioCtx.suspend();
    isMuted = true;
  } else if (audioCtx.state === 'suspended') {
    await audioCtx.resume();
    isMuted = false;
  }
  return isMuted;
}

// ==========================================
// THE MACHINE SLUMBER (Landing Page Ambience)
// ==========================================

export function playMachineSlumber() {
  try {
    initCtx();
    if (isMachineSlumbering) return;
    isMachineSlumbering = true;

    // The distant hum (very low sawtooth, heavily filtered)
    machineHumOsc = audioCtx.createOscillator();
    machineHumOsc.type = 'sawtooth';
    machineHumOsc.frequency.setValueAtTime(32.7, audioCtx.currentTime); // C1

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(60, audioCtx.currentTime); // Deep muffle

    machineHumGain = audioCtx.createGain();
    machineHumGain.gain.setValueAtTime(0, audioCtx.currentTime);
    machineHumGain.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 5);

    machineHumOsc.connect(filter);
    filter.connect(machineHumGain);
    filter.connect(globalDelay); // Feed a tiny bit to delay
    machineHumGain.connect(audioCtx.destination);

    machineHumOsc.start();

    // Audible BGM Pad (Midrange frequencies for laptop speakers)
    const bgmOsc1 = audioCtx.createOscillator();
    bgmOsc1.type = 'sine';
    bgmOsc1.frequency.setValueAtTime(130.81, audioCtx.currentTime); // C3

    const bgmOsc2 = audioCtx.createOscillator();
    bgmOsc2.type = 'triangle';
    bgmOsc2.frequency.setValueAtTime(196.00, audioCtx.currentTime); // G3

    const bgmOsc3 = audioCtx.createOscillator();
    bgmOsc3.type = 'sine';
    bgmOsc3.frequency.setValueAtTime(293.66, audioCtx.currentTime); // D4

    const bgmFilter = audioCtx.createBiquadFilter();
    bgmFilter.type = 'lowpass';
    bgmFilter.frequency.setValueAtTime(500, audioCtx.currentTime);

    const bgmGain = audioCtx.createGain();
    bgmGain.gain.setValueAtTime(0, audioCtx.currentTime);
    bgmGain.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 8);

    bgmOsc1.connect(bgmFilter);
    bgmOsc2.connect(bgmFilter);
    bgmOsc3.connect(bgmFilter);
    bgmFilter.connect(bgmGain);
    bgmGain.connect(globalDelay);
    bgmGain.connect(audioCtx.destination);

    bgmOsc1.start();
    bgmOsc2.start();
    bgmOsc3.start();

    // Occasional 'Bwooom'
    function triggerBwooom() {
      if (!isMachineSlumbering) return;

      const bOsc = audioCtx.createOscillator();
      const bGain = audioCtx.createGain();
      bOsc.type = 'sine';
      bOsc.frequency.setValueAtTime(45, audioCtx.currentTime); // Deep F1
      bOsc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 4);

      bGain.gain.setValueAtTime(0, audioCtx.currentTime);
      bGain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 1.5);
      bGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 6);

      bOsc.connect(bGain);
      bGain.connect(audioCtx.destination);
      bOsc.start();
      bOsc.stop(audioCtx.currentTime + 6.5);

      bwooomTimer = setTimeout(triggerBwooom, 15000 + Math.random() * 20000); // 15-35s
    }

    // Start first bwooom slightly delayed
    bwooomTimer = setTimeout(triggerBwooom, 4000);

  } catch (e) {
    console.log("Audio not allowed yet");
  }
}

// ==========================================
// INTERACTION CUES
// ==========================================

export function playCelestialChime() {
  try {
    initCtx();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1760 + (Math.random() * 20 - 10), audioCtx.currentTime); // A6 with slight detune

    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.03, audioCtx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    gain.connect(globalDelay); // Send to global delay for atmosphere

    osc.start();
    osc.stop(audioCtx.currentTime + 0.7);
  } catch (e) { }
}

export function playMetallicConfirm() {
  try {
    initCtx();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.1);

    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.25);
  } catch (e) { }
}

export function playDeepResonance() {
  try {
    initCtx();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.5);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, audioCtx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 1.5);

    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    gain.connect(globalDelay);

    osc.start();
    osc.stop(audioCtx.currentTime + 2.1);
  } catch (e) { }
}

// ==========================================
// RECONSTRUCTION SEQUENCE
// ==========================================

export function startReconstructionSequence(phaseIndex) {
  try {
    initCtx();

    if (phaseIndex === 0 && !reconstructionPlaying) {
      reconstructionPlaying = true;
      // Phase 0: Soft pulse drone
      const pOsc = audioCtx.createOscillator();
      const pGain = audioCtx.createGain();
      pOsc.type = 'sine';
      pOsc.frequency.setValueAtTime(110, audioCtx.currentTime);

      const lfo = audioCtx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(1, audioCtx.currentTime);
      const lfoGain = audioCtx.createGain();
      lfoGain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(pGain.gain);

      pGain.gain.setValueAtTime(0, audioCtx.currentTime);
      pGain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 2);

      pOsc.connect(pGain);
      pGain.connect(audioCtx.destination);
      pOsc.start();
      lfo.start();
      currentPhaseOscillators.push(pOsc, lfo);

    } else if (phaseIndex === 1) {
      // Phase 1: Strings (Sawtooth pads)
      const pOsc = audioCtx.createOscillator();
      const pGain = audioCtx.createGain();
      pOsc.type = 'sawtooth';
      pOsc.frequency.setValueAtTime(164.81, audioCtx.currentTime); // E3

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, audioCtx.currentTime);
      filter.frequency.linearRampToValueAtTime(800, audioCtx.currentTime + 5);

      pGain.gain.setValueAtTime(0, audioCtx.currentTime);
      pGain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 3);

      pOsc.connect(filter);
      filter.connect(pGain);
      pGain.connect(audioCtx.destination);
      pOsc.start();
      currentPhaseOscillators.push(pOsc);

    } else if (phaseIndex === 2) {
      // Phase 2: Rhythmic Ticking
      if (!clockTimer) {
        let toggle = false;
        function tick() {
          if (!reconstructionPlaying) return;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(toggle ? 2000 : 1800, audioCtx.currentTime);

          gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.05);

          toggle = !toggle;
          clockTimer = setTimeout(tick, 250);
        }
        tick();
      }
    } else if (phaseIndex === 3) {
      // Phase 3: Choir Pads (Rich Harmonics)
      const pOsc = audioCtx.createOscillator();
      const pGain = audioCtx.createGain();
      pOsc.type = 'square';
      pOsc.frequency.setValueAtTime(329.63, audioCtx.currentTime); // E4

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2000, audioCtx.currentTime + 4);

      pGain.gain.setValueAtTime(0, audioCtx.currentTime);
      pGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 2);

      pOsc.connect(filter);
      filter.connect(pGain);
      pGain.connect(audioCtx.destination);
      pGain.connect(globalDelay);
      pOsc.start();
      currentPhaseOscillators.push(pOsc);

    } else if (phaseIndex === 4) {
      // Phase 4: The Swell (Before Silence)
      // We don't add new notes, just increase intensity
    }
  } catch (e) { }
}

export function stopReconstructionSequence() {
  // ABRUPT DEAD SILENCE
  currentPhaseOscillators.forEach(osc => {
    try { osc.stop(); } catch (e) { }
  });
  currentPhaseOscillators = [];
  if (clockTimer) clearTimeout(clockTimer);
  clockTimer = null;
  reconstructionPlaying = false;
}

// ==========================================
// TIMELINE INSTABILITY CORRUPTION
// ==========================================

export function applyInstability(stabilityPercentage) {
  if (!audioCtx) return;

  if (stabilityPercentage > 80) {
    // Warm, Stable, Deep. No corruption.
    globalDelayFeedback.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 2);
    try { machineHumOsc.detune.linearRampToValueAtTime(0, audioCtx.currentTime + 2); } catch (e) { }

  } else if (stabilityPercentage > 50) {
    // Small detuning. Barely noticeable.
    globalDelayFeedback.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 2);
    try { machineHumOsc.detune.linearRampToValueAtTime(-15, audioCtx.currentTime + 2); } catch (e) { }

  } else if (stabilityPercentage > 20) {
    // Reverb grows. Machine sounds uncertain.
    globalDelayFeedback.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 2);
    try { machineHumOsc.detune.linearRampToValueAtTime(-40, audioCtx.currentTime + 2); } catch (e) { }

  } else {
    // Reality sounds wrong. Purple UI. Broken clocks. Reversed echoes.
    globalDelayFeedback.gain.linearRampToValueAtTime(0.8, audioCtx.currentTime + 2);
    try { machineHumOsc.detune.linearRampToValueAtTime(-100, audioCtx.currentTime + 2); } catch (e) { }

    // Add erratic noise corruption
    const noiseTimer = setInterval(() => {
      if (globalDelayFeedback.gain.value < 0.6) {
        clearInterval(noiseTimer);
        return;
      }
      if (Math.random() > 0.7) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(50 + Math.random() * 500, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(globalDelay); // Send to glitchy delay
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      }
    }, 500);
  }
}


export function playGlitchCollapse() {
  try {
    initCtx();
    // Harsh digital noise burst
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'square';

    osc1.frequency.setValueAtTime(100, audioCtx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 3);

    osc2.frequency.setValueAtTime(2000, audioCtx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 4);

    // Frantic LFO modulation
    const lfo = audioCtx.createOscillator();
    lfo.type = 'square';
    lfo.frequency.setValueAtTime(30, audioCtx.currentTime);
    lfo.frequency.linearRampToValueAtTime(5, audioCtx.currentTime + 4);

    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 4);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start();
    osc2.start();
    lfo.start();

    osc1.stop(audioCtx.currentTime + 4);
    osc2.stop(audioCtx.currentTime + 4);
    lfo.stop(audioCtx.currentTime + 4);
  } catch (e) { }
}
