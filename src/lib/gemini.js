import { GoogleGenerativeAI } from '@google/generative-ai';

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateReality(query) {
  const prompt = `
You are the HISTORIAN, a temporal simulation engine for the Butterfly Paradox archive.
The user has requested to inspect an alternate reality based on the following divergence: "${query}"

Generate a highly cinematic, dramatic, and immersive alternate timeline.
Output MUST be in raw JSON format, without any markdown formatting blocks.
CRITICAL: Make your descriptions EXTREMELY detailed and extensive. Provide long, richly described paragraphs for the divergence and every event. Do not be brief. Elaborate heavily on the historical consequences.
The JSON structure MUST be exactly:
{
  "id": "Randomized 4-character ID (e.g., BF-1934, ZX-9912)",
  "stability": "A random percentage between 10% and 99%",
  "confidence": "A random percentage between 60% and 99%",
  "species": "Primary dominant species in this timeline (e.g. DINOSAURIAN, HOMO SAPIENS, CYBERNETIC)",
  "population": "Estimated population (e.g. 14.2 BILLION)",
  "divergence": {
    "year": "The exact year of divergence",
    "title": "BUTTERFLY EVENT",
    "desc": "Detailed description of the single event that changed history.",
    "type": "divergence"
  },
  "events": [
    // Array of 8-10 major historical events following the divergence, leading up to the present or far future.
    {
      "year": "e.g., 1200 AD",
      "title": "Short dramatic title",
      "desc": "Description of what happened and its consequences.",
      "type": "event"
    }
  ]
}

Focus on awe, mystery, and dramatic consequences. Make the events sound like classified historical records.
  `;

  try {
    const groqKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!groqKey) throw new Error("No Groq key provided.");
    
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: 'You are an AI that outputs pure JSON only.' }, { role: 'user', content: prompt }]
      })
    });
    
    if (!groqRes.ok) throw new Error(`Groq failed: ${groqRes.statusText}`);
    const groqData = await groqRes.json();
    let text = groqData.choices[0].message.content;
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.warn("Groq failed, falling back to Gemini:", error);
    
    const model = ai.getGenerativeModel({
      model: 'gemini-3.1-flash-lite',
      generationConfig: { responseMimeType: "application/json" }
    });
    
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(text);
  }
}

export async function chatWithFigure(eraData, figureName, userMessage, chatHistory) {
  const prompt = `
You are ${figureName}, the chief architect of the following era in an alternate timeline:
Year: ${eraData.year}
Event: ${eraData.title}
Context: ${eraData.desc}

Respond to the time-traveling archivist in character. Keep it brief, secretive, and fitting the tone of a dark, alternate timeline.
If the archivist asks about things outside your era, act confused or suspicious.

Chat History:
${chatHistory.map(m => `${m.role}: ${m.text}`).join('\n')}
Archivist: ${userMessage}
${figureName}:`;

  try {
    const groqKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!groqKey) throw new Error("No Groq key");
    
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }]
      })
    });
    if (!groqRes.ok) throw new Error("Groq failed");
    const groqData = await groqRes.json();
    return groqData.choices[0].message.content.trim();
  } catch (error) {
    console.warn("Groq Chat Error, falling back to Gemini:", error);
    try {
      const model = ai.getGenerativeModel({ model: 'gemini-3.1-flash-lite' });
      const result = await model.generateContent(prompt);
      return result.response.text().trim();
    } catch (fallbackError) {
      console.error("Era Chat failed", fallbackError);
      return "The connection to this era has been lost. The temporal frequency is too unstable.";
    }
  }
}

export async function extendReality(realityData) {
  const lastEvent = realityData.events[realityData.events.length - 1];
  
  const prompt = `
You are the HISTORIAN, a temporal simulation engine for the Butterfly Paradox archive.
The user wants to extend an existing alternate timeline further into the future.

CURRENT REALITY ID: ${realityData.id}
POINT OF DIVERGENCE: ${realityData.divergence.title}
CURRENT DOMINANT SPECIES: ${realityData.species}

LAST RECORDED EVENT:
Year: ${lastEvent.year}
Title: ${lastEvent.title}
Description: ${lastEvent.desc}

Generate EXACTLY 5 new, chronological historical events that occur AFTER the last recorded event.
Push the timeline further into the future. The events should become increasingly bizarre, extreme, or evolved, reflecting the butterfly effect spiraling out of control.

CRITICAL: Output MUST be in raw JSON format, without any markdown formatting blocks.

The JSON structure MUST be exactly:
{
  "newStability": "XX% (Must be randomized, exactly 5% to 15% LOWER than the current stability of ${realityData.stability})",
  "events": [
    {
      "year": "e.g., 2500 AD",
      "title": "Short dramatic title",
      "desc": "Description of what happened and its consequences.",
      "type": "event"
    }
  ]
}

Make the events sound like classified historical records. Focus on awe, mystery, and dramatic consequences.
  `;

  try {
    const groqKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!groqKey) throw new Error("No Groq key provided.");
    
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: 'You are an AI that outputs pure JSON only.' }, { role: 'user', content: prompt }]
      })
    });
    
    if (!groqRes.ok) throw new Error(`Groq failed: ${groqRes.statusText}`);
    const groqData = await groqRes.json();
    let text = groqData.choices[0].message.content;
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.warn("Groq failed, falling back to Gemini:", error);
    
    const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = ai.getGenerativeModel({
      model: 'gemini-3.1-flash-lite',
      generationConfig: { responseMimeType: "application/json" }
    });
    
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(text);
  }
}

export async function rewriteReality(realityData, eraData, userPrompt) {
  // We want to keep all events *before* this era, and rewrite from this era onward.
  const pastEvents = realityData.events.filter(e => parseInt(e.year) < parseInt(eraData.year));
  
  const prompt = `
You are the HISTORIAN, rewriting an alternate reality.
We are branching off from an existing timeline.

The Original Divergence was:
${realityData.divergence.year}: ${realityData.divergence.title} - ${realityData.divergence.desc}

Events leading up to the branch point:
${pastEvents.map(e => `${e.year}: ${e.title} - ${e.desc}`).join('\n')}

But now, at the year ${eraData.year}, the following NEW divergence has been introduced by the user:
"${userPrompt}"

Generate a NEW cinematic, dramatic alternate timeline continuing from this new divergence point.
CRITICAL: Make your descriptions EXTREMELY detailed and extensive. Provide long, richly described paragraphs for every event. Do not be brief. Elaborate heavily on the historical consequences.
Output MUST be in raw JSON format, exactly matching this structure:
{
  "id": "BF-XXXX (random 4 digits)",
  "stability": "XX% (usually lower because it's a rewrite)",
  "confidence": "XX%",
  "species": "Primary dominant species",
  "population": "Estimated population",
  "divergence": {
    "year": "${realityData.divergence.year}",
    "title": "${realityData.divergence.title}",
    "desc": "${realityData.divergence.desc}",
    "type": "divergence"
  },
  "events": [
    // Include the past events first exactly as provided
    // Then generate 5-7 NEW events based on the new divergence
  ]
}
  `;

  try {
    const groqKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!groqKey) throw new Error("No Groq key provided.");
    
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: 'You are an AI that outputs pure JSON only.' }, { role: 'user', content: prompt }]
      })
    });
    
    if (!groqRes.ok) throw new Error(`Groq failed: ${groqRes.statusText}`);
    const groqData = await groqRes.json();
    let text = groqData.choices[0].message.content;
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.warn("Groq Rewrite Failed, falling back to Gemini:", error);
    
    const model = ai.getGenerativeModel({
      model: 'gemini-3.1-flash-lite',
      generationConfig: { responseMimeType: "application/json" }
    });
    
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(text);
  }
}
