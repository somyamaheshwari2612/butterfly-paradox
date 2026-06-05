import React, { useEffect, useState, useRef } from 'react'
import { useArchiveStore } from './store/archiveStore'
import { motion } from 'framer-motion'
import { playMachineSlumber, playCelestialChime, playMetallicConfirm, playDeepResonance, startReconstructionSequence, stopReconstructionSequence, applyInstability, playGlitchCollapse } from './lib/soundEngine'

// Landing Page
const LandingMachine = () => {
  const { initiateReconstruction } = useArchiveStore()
  const [query, setQuery] = useState('')

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      initiateReconstruction(query)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', position: 'relative', zIndex: 10 }}>
      <div className="hud-panel" style={{ position: 'absolute', top: 40, right: 40, padding: '15px 25px', textAlign: 'right', fontSize: '1rem', zIndex: 100 }}>
        <div style={{ color: 'var(--color-silver)', marginBottom: '5px', letterSpacing: '1px' }}>REALITY STATUS: <span style={{ color: 'var(--color-shy-crimson)', textShadow: '0 0 10px rgba(227,93,106,0.5)', fontWeight: 'bold' }}>STABLE</span></div>
        <div style={{ color: 'var(--color-silver)', letterSpacing: '1px' }}>TEMPORAL CORE: <span style={{ color: 'var(--color-gold)', textShadow: '0 0 10px rgba(212,175,55,0.5)', fontWeight: 'bold' }}>ONLINE</span></div>
      </div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2, ease: "easeOut" }}
        whileHover={{ scale: 1.05, textShadow: '0 0 40px rgba(255,215,0,0.8)', letterSpacing: '0.8rem' }}
        className="glow-text"
        style={{ fontSize: '5rem', letterSpacing: '0.6rem', marginBottom: '1rem', textAlign: 'center', fontWeight: 'normal', cursor: 'default', transition: 'all 0.3s ease' }}>
        BUTTERFLY PARADOX
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2, delay: 1 }}
        style={{ fontSize: '1.2rem', letterSpacing: '0.3rem', marginBottom: '4rem', color: 'var(--color-silver)' }}>
        Cataloguing impossible histories.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
        style={{ width: '60%', maxWidth: '800px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); playTypeSound(); }}
          onKeyDown={handleKeyDown}
          placeholder="Which reality would you like to inspect?"
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.02)',
            border: 'none',
            borderBottom: '2px solid rgba(255,255,255,0.3)',
            color: 'var(--color-gold)',
            fontSize: '1.5rem',
            fontFamily: 'var(--font-mono)',
            padding: '1.5rem',
            outline: 'none',
            textAlign: 'center',
            borderRadius: '12px 12px 0 0',
            textShadow: '0 0 10px rgba(255,255,255,0.5)',
            boxShadow: 'inset 0 -10px 20px -10px rgba(255,255,255,0.1)'
          }}
          autoFocus
        />
      </motion.div>

      {/* Landing Page Bottom Elements to fill space */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '30%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '2rem', opacity: 0.8, pointerEvents: 'none' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-silver)' }}>
          <div style={{ marginBottom: '0.5rem' }}>SYSTEM: ONLINE</div>
          <div style={{ marginBottom: '0.5rem' }}>REALITY ENGINE: INITIALIZED</div>
          <div>AWAITING TEMPORAL COORDINATES...</div>
        </div>

        {/* Massive decorative timeline preview at the bottom */}
        <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.8), transparent)' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ position: 'absolute', left: `${20 + i * 15}%`, top: '-5px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-gold)', boxShadow: '0 0 10px rgba(212,175,55,0.8)' }} />
          ))}
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-silver)', textAlign: 'right' }}>
          <div style={{ marginBottom: '0.5rem' }}>OBSERVED FUTURES: 12,844</div>
          <div style={{ marginBottom: '0.5rem' }}>LAST FORK: 2.3MS AGO</div>
          <div>READY.</div>
        </div>
      </div>
    </div>
  )
}

// Reconstructing Machine (Loading State)
const ReconstructingMachine = () => {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [logs, setLogs] = useState([])
  const { realityData, showManifestation } = useArchiveStore()

  const phases = [
    {
      title: "PHASE 1: ARCHIVE ACCESS GRANTED",
      substeps: ["Searching historical records...", "Locating primary divergence..."]
    },
    {
      title: "PHASE 2: BUTTERFLY EVENT IDENTIFIED",
      substeps: ["Analyzing causal pathways...", "Calculating historical drift..."]
    },
    {
      title: "PHASE 3: CASCADE PROPAGATION",
      substeps: ["Reconstructing civilizations...", "Projecting geopolitical evolution..."]
    },
    {
      title: "PHASE 4: TEMPORAL STABILIZATION",
      substeps: ["Resolving paradoxes...", "Eliminating contradictions..."]
    },
    {
      title: "PHASE 5: ARCHIVE COMPILATION",
      substeps: ["Generating newspapers...", "Generating historical figures...", "Generating cultural artifacts..."]
    }
  ]

  const fakeLogsPool = [
    "[Historian] Alternative timeline detected.",
    "[Historian] 13,442 years reconstructed.",
    "[Skeptic] Potential contradiction discovered.",
    "[Skeptic] Contradiction resolved.",
    "[Archivist] Compiling historical artifacts.",
    "[System] Quantum entanglement ratio: 0.98",
    "[Observer] Divergence magnitude exceeds limits.",
    "[Historian] Fossil record rewritten."
  ]

  // Advance Phases
  useEffect(() => {
    if (phaseIndex < phases.length) {
      startReconstructionSequence(phaseIndex)
      const timer = setTimeout(() => {
        setPhaseIndex(i => i + 1)
      }, Math.random() * 2000 + 1500)
      return () => clearTimeout(timer)
    } else if (phaseIndex === phases.length && realityData) {
      // Transition to Manifestation
      stopReconstructionSequence()
      const timer = setTimeout(() => {
        showManifestation(realityData)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [phaseIndex, realityData, showManifestation])

  // Stream Fake Logs
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        const randomLog = fakeLogsPool[Math.floor(Math.random() * fakeLogsPool.length)]
        setLogs(prev => [...prev, randomLog].slice(-6)) // keep last 6
      }
    }, 600)
    return () => clearTimeout(interval)
  }, [])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100vw', height: '100vh', padding: '10vh 15vw', zIndex: 10 }}>
      {/* Left Column: Hierarchical Phases */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {phaseIndex < phases.length ? (
          phases.slice(0, phaseIndex + 1).map((phase, i) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: i === phaseIndex ? 1 : 0.4, x: 0 }}
              key={i}
              style={{ marginBottom: '2rem' }}>
              <div style={{ color: 'var(--color-gold)', fontSize: '1.2rem', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '0.5rem', textShadow: i === phaseIndex ? '0 0 10px rgba(212,175,55,0.5)' : 'none' }}>
                {phase.title}
              </div>
              <div style={{ color: 'var(--color-silver)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)', paddingLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
                {phase.substeps.map((sub, j) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: j * 0.5 }}
                    key={j} style={{ margin: '0.3rem 0' }}>{'>'} {sub}</motion.div>
                ))}
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ color: 'var(--color-shy-crimson)' }}
          >
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', letterSpacing: '4px', textShadow: '0 0 20px rgba(227,93,106,0.8)', marginBottom: '2rem' }}>
              REALITY STABILIZED
            </div>
            
            {/* Reality Age Tracker */}
            <div style={{ padding: '0.8rem', background: 'rgba(212,175,55,0.05)', borderLeft: '2px solid var(--color-gold)' }}>
              <div style={{ color: 'var(--color-silver)', fontSize: '0.7rem', opacity: 0.7 }}>REALITY AGE</div>
              <div style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{realityData.extensions || 0} EXTENSIONS</div>
            </div>

            <div style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.03)' }}>
              <div style={{ color: 'var(--color-silver)', fontSize: '0.7rem', opacity: 0.7 }}>STABILITY</div>
              <div style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>{parseInt(realityData?.stability, 10)}%</div>
            </div>
            <div style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.03)' }}>
              <div style={{ color: 'var(--color-silver)', fontSize: '0.7rem', opacity: 0.7 }}>CONFIDENCE</div>
              <div style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>{realityData?.confidence}</div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Right Column: Fake Terminal Logs */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '10vh' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {logs.map((log, i) => (
            <motion.div
              key={`${i}-${log}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {log}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Manifestation
const Manifestation = () => {
  const { realityData, enterTimeline } = useArchiveStore()

  useEffect(() => {
    playDeepResonance()
    const timer = setTimeout(() => {
      enterTimeline()
    }, 4500)
    return () => clearTimeout(timer)
  }, [enterTimeline])

  if (!realityData) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', zIndex: 10 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.5 }}
        className="glass-panel"
        style={{ padding: '4rem 6rem', textAlign: 'center' }}>

        <h2 className="glow-text" style={{ fontSize: '4rem', color: 'var(--color-silver)', letterSpacing: '0.8rem', marginBottom: '3rem' }}>
          REALITY {realityData.id}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem 4rem', textAlign: 'left', fontSize: '1.4rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '1px' }}>
          <div>DIVERGENCE POINT:</div><div style={{ color: 'var(--color-gold)', textShadow: '0 0 10px rgba(212,175,55,0.6)', fontWeight: 'bold' }}>{realityData.divergence?.year || realityData.divergence}</div>
          <div>STATUS:</div><div style={{ color: 'var(--color-shy-crimson)', textShadow: '0 0 10px rgba(227,93,106,0.6)', fontWeight: 'bold' }}>{realityData.stability} STABLE</div>
          <div>CONFIDENCE:</div><div style={{ color: 'var(--color-silver)' }}>{realityData.confidence}</div>
          <div>PRIMARY SPECIES:</div><div style={{ color: 'var(--color-silver)' }}>{realityData.species}</div>
          <div>KNOWN POPULATION:</div><div style={{ color: 'var(--color-silver)' }}>{realityData.population}</div>
        </div>
      </motion.div>
    </div>
  )
}

// Random animated bar for Causality Sensor
const RandomBar = () => {
  const [height, setHeight] = useState(Math.random() * 80 + 20)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeight(Math.random() * 80 + 20)
    }, 500 + Math.random() * 1500)
    return () => clearTimeout(interval)
  }, [])

  return (
    <motion.div
      animate={{ height: `${height}%` }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{ width: '100%', background: 'rgba(255,215,0,0.3)', borderRadius: '2px' }}
    />
  )
}

// Master Timeline
const MasterTimeline = ({ isCollapsing }) => {
  const { realityData, enterEra, extendTimeline, isExtending } = useArchiveStore()
  const containerRef = useRef(null)
  const captureRef = useRef(null)
  const [toast, setToast] = useState(null)
  const [glitchTitle, setGlitchTitle] = useState(null);
  const [screenGlitch, setScreenGlitch] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => {
    if (isCollapsing) {
      applyInstability(0); // Maximum corruption audio
      playGlitchCollapse();
    } else if (realityData?.stability) {
      applyInstability(parseInt(realityData.stability, 10));
    }
  }, [realityData, isCollapsing]);
  
  const events = realityData ? [realityData.divergence, ...realityData.events] : []
  const stabilityInt = realityData ? parseInt(realityData.stability, 10) : 100;
  
  // Calculate dynamic system values
  const coreTemp = Math.floor(42 + (100 - stabilityInt) * 1.5);
  const fluxVal = (1.21 + Math.random() * (100 - stabilityInt) / 50).toFixed(2);
  
  // Reality Corruption Logic (Stage 3)
  useEffect(() => {
    if (stabilityInt < 30 && !isCollapsing) {
      const interval = setInterval(() => {
        // Glitch event titles
        if (Math.random() > 0.4) {
          const randomIdx = Math.floor(Math.random() * events.length);
          setGlitchTitle(randomIdx);
          setTimeout(() => setGlitchTitle(null), 150);
        }
        // Glitch entire screen
        if (Math.random() > 0.7) {
          setScreenGlitch(true);
          setTimeout(() => setScreenGlitch(false), 200 + Math.random() * 300);
        }
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [stabilityInt, events.length, isCollapsing]);

  const handleExport = async () => {
    try {
      const dossier = `
ARCHIVE RECORD: ${realityData.id}
STABILITY: ${realityData.stability}
CONFIDENCE: ${realityData.confidence}

POINT OF DIVERGENCE:
${realityData.divergence.year} - ${realityData.divergence.title}

[ THE BUTTERFLY PARADOX ]
      `.trim();

      // 1. Guaranteed action: Immediately copy dossier to clipboard
      try {
        await navigator.clipboard.writeText(dossier);
      } catch (e) {
        console.warn("Clipboard write failed", e);
      }

      if (!window.htmlToImage || !captureRef.current) {
        showToast("Dossier copied to clipboard!");
        return;
      }

      showToast("Compiling timeline image...");

      const dataUrl = await window.htmlToImage.toPng(captureRef.current, {
        backgroundColor: '#050508',
        pixelRatio: 2,
        filter: (node) => {
          if (node.classList && (node.classList.contains('btn-alter') || node.classList.contains('toast-msg'))) {
            return false;
          }
          return true;
        }
      });
      const link = document.createElement('a');
      link.download = `Reality-${realityData.id}.png`;
      link.href = dataUrl;
      link.click();
      showToast("Image downloaded & Dossier copied!");
    } catch (e) {
      console.error("Export failed", e);
      showToast("Dossier copied (Image skipped).");
    }
  }

  return (
    <motion.div 
      ref={captureRef} 
      animate={
        isCollapsing ? { 
          x: [0, -30, 30, -20, 20, 0], 
          y: [0, 15, -15, 10, -10, 0], 
          opacity: [1, 0.5, 0.8, 0.2, 0], 
          scale: [1, 1.05, 0.95, 1.1, 1.5],
          filter: ['hue-rotate(0deg)', 'hue-rotate(250deg) blur(5px) contrast(200%)', 'hue-rotate(300deg) blur(10px) invert(100%)', 'blur(20px)']
        } : screenGlitch ? {
          x: [-10, 10, -5, 5, 0],
          y: [-5, 5, -2, 2, 0],
          filter: ['hue-rotate(0deg)', 'hue-rotate(90deg) contrast(150%)', 'invert(20%)', 'hue-rotate(0deg)']
        } : { x: 0, y: 0, filter: 'none' }
      }
      transition={isCollapsing ? { duration: 4, ease: 'easeInOut' } : screenGlitch ? { duration: 0.3 } : {}}
      style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      {/* Top half: The Timeline */}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: '8%',
          height: '55%',
          width: '100vw',
          overflowX: 'auto',
          overflowY: 'hidden',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '10vw',
          paddingRight: '50vw',
          zIndex: 10
        }}>

        {/* Background Track */}
        <div className="timeline-track"></div>

        {events.map((ev, i) => {
          const isGlitching = glitchTitle === i;
          const displayYear = stabilityInt < 60 && Math.random() > 0.8 ? `${ev.year}?` : ev.year;
          const displayTitle = isGlitching ? ev.title.split('').reverse().join('') : ev.title;
          
          return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-panel timeline-node-card"
                style={{ 
                  position: 'relative', 
                  minWidth: '450px',
                  maxWidth: '450px',
                  height: '100%',
                  overflowY: 'auto',
                  marginRight: '150px',
                  paddingLeft: '3rem',
                  paddingBottom: '1rem'
                }}
              >
              {/* Timeline Node Dot */}
              <motion.div 
                whileHover={{ scale: 1.5, background: 'var(--color-gold)', boxShadow: '0 0 30px var(--color-gold)' }}
                onMouseEnter={() => { playCelestialChime() }}
                style={{ 
                  position: 'absolute', 
                  left: '-75px', 
                  top: '50%', 
                  width: '12px', 
                  height: '12px', 
                  background: stabilityInt < 20 ? 'var(--color-purple)' : ev.type === 'divergence' ? 'var(--color-gold)' : 'var(--color-silver)',
                  borderRadius: '50%', 
                  transform: 'translateY(-50%)',
                  boxShadow: stabilityInt < 20 ? '0 0 20px var(--color-purple)' : `0 0 20px ${ev.type === 'divergence' ? 'var(--color-gold)' : 'var(--color-silver)'}`,
                  zIndex: 2 
                }}
              />
              
              {/* Connector line to node */}
              <div style={{
                position: 'absolute',
                left: '-63px',
                top: '50%',
                width: '63px',
                height: '1px',
                background: stabilityInt < 20 ? 'rgba(138,43,226,0.5)' : 'rgba(255,255,255,0.1)',
                transform: 'translateY(-50%)'
              }} />
              
              <div style={{ 
                background: 'rgba(255,255,255,0.02)', 
                border: stabilityInt < 20 ? '1px solid rgba(175, 55, 212, 0.2)' : '1px solid rgba(255,255,255,0.05)', 
                padding: '2rem', 
                backdropFilter: 'blur(20px)',
                filter: stabilityInt < 20 ? 'sepia(0.5) hue-rotate(250deg)' : 'none'
              }}>
                <div className={stabilityInt < 80 ? 'flicker-text' : ''} style={{ fontFamily: 'var(--font-mono)', color: stabilityInt < 20 ? 'var(--color-purple)' : 'var(--color-gold)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  {displayYear}
                </div>
                <h3 className={isGlitching ? 'glitch-text' : ''} style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--color-gold)', letterSpacing: '1px' }}>
                  {displayTitle}
                </h3>
                <p style={{ color: 'var(--color-silver)', lineHeight: '1.8' }}>
                  {ev.desc}
                </p>
                
                {ev.type !== 'divergence' && stabilityInt > 0 && (
                  <button 
                    className="btn-alter" 
                    onClick={() => { playMetallicConfirm(); enterEra({ year: displayYear, title: displayTitle, desc: ev.desc }); }}
                    style={{ marginTop: '1.5rem', fontSize: '0.8rem', padding: '0.5rem 1.5rem' }}
                  >
                    DIVE INTO ERA
                  </button>
                )}
              </div>
            </motion.div>
          )
        })}

        {/* EXTEND REALITY BUTTON */}
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', paddingRight: '20vw', marginLeft: '50px' }}>
          <button 
            className="btn-alter" 
            onClick={() => { playMetallicConfirm(); extendTimeline(); }}
            disabled={isExtending}
            style={{ 
              padding: '1.5rem 3rem', 
              fontSize: '1.2rem', 
              background: isExtending ? 'rgba(255,255,255,0.05)' : 'rgba(212, 175, 55, 0.1)',
              borderColor: 'var(--color-gold)',
              color: 'var(--color-gold)',
              minWidth: '400px',
              whiteSpace: 'nowrap'
            }}
          >
            {isExtending ? 'CALCULATING TEMPORAL CASCADES...' : 'EXTEND REALITY [ HIGH RISK ]'}
          </button>
        </div>
      </div>

      {/* Bottom half: Temporal HUD */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '35%',
        background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.8) 70%, transparent 100%)',
        borderTop: '1px solid rgba(212,175,55,0.2)',
        zIndex: 5,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '2rem 4rem',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4rem', width: '100%' }}>

          <div className="hud-panel" style={{ padding: '1.5rem', height: '100%' }}>
            <h4 style={{ color: 'var(--color-silver)', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '1rem' }}>CAUSALITY SENSOR</h4>
            <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <RandomBar key={i} />
              ))}
            </div>
          </div>

          <div className="hud-panel" style={{ padding: '1.5rem', height: '100%', overflow: 'hidden' }}>
            <h4 style={{ color: 'var(--color-silver)', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '1rem' }}>TEMPORAL DRIFT LOG</h4>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', opacity: 0.8, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{`>`} ANALYZING NODE DENSITY: HIGH</div>
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{`>`} QUANTUM ENTANGLEMENT: STABLE</div>
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{`>`} OBSERVER EFFECT: MINIMAL</div>
              <div style={{ color: 'var(--color-shy-crimson)', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{`>`} REALITY ID {realityData?.id} SECURED</div>
            </div>
          </div>

          <div className="hud-panel" style={{ padding: '1.5rem', height: '100%' }}>
            <h4 style={{ color: 'var(--color-silver)', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '1rem' }}>SYSTEM STABILITY</h4>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginTop: '1rem' }}>
              <div className={stabilityInt <= 25 ? "value glitch-text" : "value glow-text"} style={{ color: stabilityInt <= 25 ? 'var(--color-shy-crimson)' : 'var(--color-offwhite)', fontSize: '3.5rem', fontFamily: 'var(--font-mono)' }}>
                {stabilityInt}%
              </div>
              <div style={{ color: 'var(--color-silver)', fontSize: '0.8rem', opacity: 0.6, fontFamily: 'var(--font-mono)' }}>
                <div>CORE TEMP: {coreTemp}°C</div>
                <div>FLUX: {fluxVal} GW</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="toast-msg"
          style={{ position: 'fixed', bottom: 40, right: 40, background: 'var(--color-obsidian)', border: '1px solid var(--color-gold)', color: 'var(--color-gold)', padding: '1rem 2rem', zIndex: 1000, borderRadius: '4px', fontFamily: 'var(--font-mono)', boxShadow: '0 0 20px rgba(212,175,55,0.2)' }}
        >
          {toast}
        </motion.div>
      )}

      {/* Alter History global button floats at top right */}
      <div style={{ position: 'fixed', top: 30, right: 40, zIndex: 100, display: 'flex', gap: '1rem' }}>
        <button className="btn-alter" onClick={() => { playMetallicConfirm(); handleExport(); }} style={{ background: 'rgba(0, 229, 255, 0.1)', borderColor: 'rgba(0, 229, 255, 0.3)', color: '#00e5ff' }}>
          EXPORT REALITY
        </button>
        <button className="btn-alter" onClick={() => { playMetallicConfirm(); useArchiveStore.getState().setAppState('ARCHIVE_STANDBY'); }} style={{ background: 'rgba(255, 215, 0, 0.1)', borderColor: 'rgba(255, 215, 0, 0.3)', color: 'var(--color-gold)' }}>
          NEW SCENARIO
        </button>
      </div>

    </motion.div>
  )
}

// Era Dive
const EraDive = () => {
  const { activeEra, realityData, enterTimeline, initiateReconstruction } = useArchiveStore()
  const [chatHistory, setChatHistory] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [isChatting, setIsChatting] = useState(false)

  const [rewriteInput, setRewriteInput] = useState('')
  const [isRewriting, setIsRewriting] = useState(false)

  if (!activeEra) return null

  const handleChatSubmit = async (e) => {
    if (e.key === 'Enter' && chatInput.trim() && !isChatting) {
      const msg = chatInput.trim()
      setChatInput('')
      setChatHistory(prev => [...prev, { role: 'Archivist', text: msg }])
      setIsChatting(true)

      try {
        const { chatWithFigure } = await import('./lib/gemini.js')
        const figureName = "Varnok The Pioneer"
        const response = await chatWithFigure(activeEra, figureName, msg, chatHistory)
        setChatHistory(prev => [...prev, { role: figureName, text: response }])
      } catch (err) {
        setChatHistory(prev => [...prev, { role: 'System', text: '[ CONNECTION SEVERED ]' }])
      } finally {
        setIsChatting(false)
      }
    }
  }

  const handleRewriteSubmit = async () => {
    if (rewriteInput.trim() && !isRewriting) {
      setIsRewriting(true)
      try {
        const { rewriteReality } = await import('./lib/gemini.js')
        const newData = await rewriteReality(realityData, activeEra, rewriteInput)

        useArchiveStore.getState().setAppState('RECONSTRUCTING')
        useArchiveStore.getState().setRealityData(newData)
      } catch (err) {
        console.error(err)
        useArchiveStore.getState().setAppState('TIMELINE_COLLAPSE')
      } finally {
        setIsRewriting(false)
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.2, y: -100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 100 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        overflowY: 'auto', padding: '10vh 20vw', zIndex: 20
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '3rem', color: 'var(--color-gold)', letterSpacing: '0.2rem' }}>{activeEra.year} / {activeEra.title}</h2>
        <button className="btn-alter" onClick={() => { playMetallicConfirm(); enterTimeline(); }}>Return to Master Timeline</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }}>
        {/* Left Column: Newspapers / Documents & Rewrite */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '3rem', backgroundColor: 'rgba(250, 240, 230, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontFamily: 'var(--font-serif)', borderBottom: '2px solid rgba(255,255,255,0.2)', paddingBottom: '1rem', marginBottom: '2rem', textAlign: 'center' }}>
              <h1 style={{ fontSize: '3rem', letterSpacing: '0.1rem', color: 'var(--color-silver)', margin: 0 }}>THE DAILY CHRONICLE</h1>
              <p style={{ fontSize: '1rem', color: 'var(--color-bronze)', fontStyle: 'italic', margin: '0.5rem 0 0' }}>Published {activeEra.year}</p>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', lineHeight: '1.2', color: 'var(--color-gold)', marginBottom: '1.5rem' }}>
              Unprecedented Advancements in {activeEra.title.toLowerCase()} Spark Global Debate
            </h2>
            <div style={{ columnCount: 2, columnGap: '2rem', fontFamily: 'var(--font-serif)', fontSize: '1.1rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.7)', textAlign: 'justify' }}>
              <p>Reports from the capital indicate that {activeEra.desc.toLowerCase()} The scientific community is currently evaluating the long-term impact on our social structures. Critics argue that rapid progress threatens traditional values, while proponents herald a new age of prosperity.</p>
              <p>An anonymous source within the High Council stated, "We are standing on the precipice of a new frontier. The choices we make today will echo for millennia." Only time will tell if these developments lead to utopian harmony or unforeseen consequences.</p>
            </div>
          </div>

          {/* Rewrite Interface */}
          <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(227,93,106,0.3)', boxShadow: '0 0 20px rgba(227,93,106,0.1)' }}>
            <h3 style={{ color: 'var(--color-shy-crimson)', letterSpacing: '2px', fontSize: '1.1rem', marginBottom: '1rem' }}>FRACTURE TIMELINE (REWRITE ERA)</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Inject a new anomaly into this exact moment to branch the timeline.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input
                type="text"
                value={rewriteInput}
                onChange={e => { setRewriteInput(e.target.value); }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleRewriteSubmit()
                  }
                }}
                placeholder="What if..."
                style={{ flex: 1, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(227,93,106,0.3)', color: 'var(--color-silver)', padding: '1rem', fontFamily: 'var(--font-mono)', outline: 'none' }}
              />
              <button className="btn-alter" onClick={() => { playMetallicConfirm(); handleRewriteSubmit(); }} disabled={isRewriting} style={{ borderColor: 'var(--color-shy-crimson)', color: 'var(--color-shy-crimson)' }}>
                {isRewriting ? 'BRANCHING...' : 'REWRITE'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Historical Figure Bio & Chat */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--color-silver)', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>HISTORICAL RECORD</h3>
            <div style={{ width: '100%', height: '200px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(255, 215, 0, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ opacity: 0.5 }}>[ PORTRAIT MISSING ]</span>
            </div>
            <h2 style={{ color: 'var(--color-gold)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Varnok The Pioneer</h2>
            <p style={{ color: 'var(--color-bronze)', fontSize: '1rem', marginBottom: '1rem' }}>Chief Architect of {activeEra.title}</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: '1.6' }}>
              Known for their radical theories and relentless pursuit of progress. Their contributions during {activeEra.year} fundamentally reshaped the course of civilization.
            </p>
          </div>

          {/* Chat Interface */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '400px' }}>
            <h3 style={{ color: 'var(--color-gold)', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,215,0,0.2)', paddingBottom: '0.5rem' }}>INTERROGATE: VARNOK</h3>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
              {chatHistory.length === 0 && (
                <div style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', textAlign: 'center', marginTop: '2rem' }}>Establish connection...</div>
              )}
              {chatHistory.map((m, i) => (
                <div key={i} style={{ 
                  marginBottom: '1.5rem', 
                  color: m.role === 'Archivist' ? 'var(--color-gold)' : 'var(--color-silver)',
                  fontFamily: m.role === 'Archivist' ? 'var(--font-sans)' : 'var(--font-serif)',
                  fontStyle: m.role === 'Archivist' ? 'normal' : 'italic',
                  paddingLeft: m.role === 'Archivist' ? '0' : '2rem',
                  borderLeft: m.role === 'Archivist' ? 'none' : '2px solid rgba(255,255,255,0.1)'
                }}>
                  {m.text}
                </div>
              ))}
              {isChatting && <div style={{ color: 'var(--color-gold)', fontSize: '0.8rem' }}>Transmitting...</div>}
            </div>
            <input
              type="text"
              value={chatInput}
              onChange={e => { setChatInput(e.target.value); }}
              onKeyDown={handleChatSubmit}
              placeholder="Ask a question..."
              style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,215,0,0.3)', color: 'var(--color-gold)', padding: '1rem', fontFamily: 'var(--font-mono)', outline: 'none' }}
              disabled={isChatting}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Butterfly Cursor Component
const ButterflyCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dust, setDust] = useState([])

  useEffect(() => {
    let lastTime = 0
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })

      const now = Date.now()
      if (now - lastTime > 100) {
        setDust(prev => [...prev, {
          id: now,
          x: e.clientX,
          y: e.clientY,
          year: Math.floor(Math.random() * 4000) - 1000
        }].slice(-20))
        lastTime = now
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setDust(prev => prev.filter(d => Date.now() - d.id < 2000))
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {dust.map(d => (
        <div key={d.id} style={{
          position: 'fixed',
          left: d.x,
          top: d.y,
          pointerEvents: 'none',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-mono)',
          transition: 'all 2s ease-out',
          transform: `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)`,
          opacity: Math.max(0, 1 - (Date.now() - d.id) / 2000),
          zIndex: 9999,
          textShadow: '0 0 5px rgba(255,255,255,0.8)'
        }}>
          {d.year > 0 ? d.year : Math.abs(d.year) + ' BC'}
        </div>
      ))}
      <div style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 10000,
        fontSize: '1.8rem',
        textShadow: '0 0 15px rgba(255,255,255,1)',
        filter: 'drop-shadow(0 0 8px rgba(153, 255, 255, 0.8))'
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 5px rgba(255,215,0,0.8))' }}>
          <path d="M12 2C12 2 12 7 15 10C18 13 22 13 22 13C22 13 20 17 15 17C10 17 12 22 12 22" />
          <path d="M12 2C12 2 12 7 9 10C6 13 2 13 2 13C2 13 4 17 9 17C14 17 12 22 12 22" />
          <line x1="12" y1="2" x2="12" y2="22" stroke="rgba(255,255,255,0.3)" />
        </svg>
      </div>
    </>
  )
}

// -----------------------------
// TIMELINE COLLAPSE (The Haunting Screen)
// -----------------------------
const TimelineCollapse = () => {
  const { setAppState, realityData } = useArchiveStore()

  useEffect(() => {
    // Abruptly kill all oscillators and play a final harsh noise
    applyInstability(0); // Maximum audio corruption
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#020005', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Dissolving Violet Mist */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, rgba(138, 43, 226, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 4 }}
        style={{ zIndex: 10, textAlign: 'center' }}
      >
        <h1 className="glitch-text" style={{ fontFamily: 'var(--font-mono)', fontSize: '4rem', color: 'var(--color-purple)', letterSpacing: '0.2em', marginBottom: '2rem' }}>
          TEMPORAL CASCADE FAILURE
        </h1>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem', fontStyle: 'italic' }}>
          Reality {realityData?.id || 'BF-XXXX'} no longer exists.
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--color-silver)', opacity: 0.3, letterSpacing: '2px' }}>
          ARCHIVE RECORD CORRUPTED BEYOND RECOVERY.
        </p>

        <button 
          className="btn-alter" 
          onClick={() => { setAppState('ARCHIVE_STANDBY'); window.location.reload(); }}
          style={{ marginTop: '5rem', borderColor: 'var(--color-purple)', color: 'var(--color-purple)', background: 'rgba(138, 43, 226, 0.05)' }}
        >
          SEEK NEW DIVERGENCE
        </button>
      </motion.div>

      {/* Floating disconnected nodes */}
      {Array.from({length: 20}).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0, x: (Math.random() - 0.5) * 800 }}
          animate={{ opacity: [0, 0.5, 0], y: -500, x: (Math.random() - 0.5) * 1000 }}
          transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
          style={{
            position: 'absolute',
            bottom: '0',
            width: '4px',
            height: '4px',
            background: 'var(--color-purple)',
            borderRadius: '50%',
            boxShadow: '0 0 10px var(--color-purple)'
          }}
        />
      ))}
    </div>
  )
}

function App() {
  const { appState } = useArchiveStore()

  return (
    <div
      onPointerDown={playMachineSlumber}
      style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      <div className="noise-overlay" />
      <div className="vignette" />
      <ButterflyCursor />

      {/* Dark Dreamy & Lustrous Background */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(circle at center, rgba(15,15,20,1) 0%, var(--color-obsidian) 100%)',
        zIndex: 1,
        overflow: 'hidden'
      }}>

        {/* Lustrous Glowing Orbs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw',
            background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(60px)', mixBlendMode: 'screen'
          }} />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            position: 'absolute', bottom: '-20%', right: '-10%', width: '60vw', height: '60vw',
            background: 'radial-gradient(circle, rgba(227,93,106,0.06) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(80px)', mixBlendMode: 'screen'
          }} />

        {/* Faint Decorative Astrolabe/Radar Rings */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '120vw', height: '120vw', border: '1px solid rgba(212,175,55,0.05)', borderRadius: '50%',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '80vw', height: '80vw', border: '1px dashed rgba(212,175,55,0.08)', borderRadius: '50%',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '40vw', height: '40vw', border: '1px solid rgba(227,93,106,0.04)', borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        {/* Subtle Grid overlay for empty spaces */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          pointerEvents: 'none'
        }} />

        {/* Magical floating particles */}
        {Array.from({ length: 80 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 3 + 'px',
            height: Math.random() * 3 + 'px',
            background: Math.random() > 0.5 ? 'rgba(255,215,0,0.5)' : 'rgba(255,255,255,0.3)',
            opacity: Math.random() * 0.5 + 0.1,
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(255,215,0,0.2)'
          }} />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 10, height: '100%' }}>
        {appState === 'ARCHIVE_STANDBY' && <LandingMachine />}
        {appState === 'RECONSTRUCTING' && <ReconstructingMachine />}
        {appState === 'MANIFESTATION' && <Manifestation />}
        {(appState === 'MASTER_TIMELINE' || appState === 'COLLAPSING') && <MasterTimeline isCollapsing={appState === 'COLLAPSING'} />}
        {appState === 'ERA_DIVE' && <EraDive />}
        {appState === 'TIMELINE_COLLAPSE' && <TimelineCollapse />}
      </div>
      {/* Global Footer */}
      <div style={{ position: 'fixed', bottom: 5, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 50, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-silver)', opacity: 0.6, letterSpacing: '1px' }}>
        <div>Cataloguing Impossible Histories</div>
        <div style={{ marginTop: '0.2rem' }}>A Temporal Experiment by <span style={{ color: 'var(--color-gold)', fontWeight: 'bold' }}>Somya Maheshwari</span></div>
      </div>
    </div>
  )
}

export default App
