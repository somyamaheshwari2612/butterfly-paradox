# 🦋 Butterfly Paradox

> **Cataloguing Impossible Histories**
> 
> *A Temporal Experiment by Somya Maheshwari*

## Overview
**Butterfly Paradox** is an interactive alternate-history archive powered by Generative AI. It allows users to simulate how a single point of divergence (e.g., "What if electricity was never discovered?") spirals into an entirely new timeline of human history.

Users can browse deep-time events, dive into specific eras to interrogate hallucinated historical figures, rewrite the very fabric of reality, and push the timeline to its absolute breaking point.

## Features
- **Temporal Reconstruction:** Enter any "Point of Divergence" and watch the AI generate an entirely new timeline, complete with a unique Reality ID, dominant species, and stability metrics.
- **Master Timeline:** A beautifully rendered, horizontally scrolling interface that lets you explore decades of alternate history.
- **Era Diving:** Click into any generated era and actively interrogate the historical figures responsible for shaping that reality.
- **Reality Rewriting:** Not happy with how history unfolded? Rewrite it. Inject a new variable into the timeline and watch the AI seamlessly recalculate the future.
- **Infinite Extension & Collapse:** Push the reality further into the unknown. Generating new events slowly corrupts the stability of the timeline, resulting in haunting audiovisual glitches until the entire reality suffers a Temporal Cascade Failure.
- **Dossier Export:** Capture stylized, glitch-art PNG dossiers of your favorite alternate realities.

## Technology Stack
- **Frontend:** React, Vite, Framer Motion
- **AI Integration:** Google Gemini 1.5 Flash / Groq LLaMA 3
- **Audio Engine:** Custom Web Audio API Synthesizer (Real-time dynamic drone, UI interaction chimes, and procedural glitching)
- **Export Engine:** `html-to-image` for preserving complex CSS backdrops and glassmorphism

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file with your API keys:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_key_here
   VITE_GROQ_API_KEY=your_groq_key_here
   ```
4. Start the temporal engine:
   ```bash
   npm run dev
   ```

---
*“Be cautious, stranger. For in this era, knowledge is a currency that can be both power and poison.”*