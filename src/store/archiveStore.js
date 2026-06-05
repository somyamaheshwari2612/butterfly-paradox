import { create } from 'zustand'

export const useArchiveStore = create((set) => ({
  // App States: ARCHIVE_STANDBY, RECONSTRUCTING, MANIFESTATION, MASTER_TIMELINE, ERA_DIVE, TIMELINE_COLLAPSE
  appState: 'ARCHIVE_STANDBY',
  
  // The current query
  activeQuery: '',
  
  // Current Reality Data
  realityData: null,
  
  // Active Era for the deep dive
  activeEra: null,
  
  // Is the timeline currently being extended
  isExtending: false,
  
  // Setters
  setAppState: (newState) => set({ appState: newState }),
  setActiveQuery: (query) => set({ activeQuery: query }),
  setRealityData: (data) => set({ realityData: data }),
  setActiveEra: (era) => set({ activeEra: era }),
  
  // Actions
  initiateReconstruction: async (query) => {
    set({ appState: 'RECONSTRUCTING', activeQuery: query, realityData: null })
    try {
      const { generateReality } = await import('../lib/gemini.js');
      const data = await generateReality(query);
      
      // Store the generated data, initialize extensions to 0
      set({ realityData: { ...data, extensions: 0 } });
    } catch (err) {
      console.error(err);
      // Fallback or handle error
      set({ appState: 'TIMELINE_COLLAPSE' });
    }
  },
  
  showManifestation: (data) => set({
    appState: 'MANIFESTATION',
    realityData: data
  }),
  
  enterTimeline: () => set({
    appState: 'MASTER_TIMELINE',
    activeEra: null
  }),

  enterEra: (eraData) => set({
    appState: 'ERA_DIVE',
    activeEra: eraData
  }),
  
  triggerCollapse: () => {
    set({ appState: 'COLLAPSING' })
    setTimeout(() => {
      set({ appState: 'TIMELINE_COLLAPSE' })
    }, 4000)
  },

  extendTimeline: async () => {
    const { realityData, triggerCollapse } = useArchiveStore.getState();
    if (!realityData) return;

    set({ isExtending: true });

    try {
      const { extendReality } = await import('../lib/gemini.js');
      const newData = await extendReality(realityData);

      // Roll probability for collapse based on new stability
      const newStabilityInt = parseInt(newData.newStability, 10);
      let collapseChance = 0;
      if (newStabilityInt <= 5) collapseChance = 0.8; // High
      else if (newStabilityInt <= 10) collapseChance = 0.4; // Moderate
      else if (newStabilityInt <= 20) collapseChance = 0.15; // Low
      
      if (Math.random() < collapseChance) {
        triggerCollapse();
        set({ isExtending: false });
        return;
      }

      set((state) => ({
        realityData: {
          ...state.realityData,
          stability: newData.newStability,
          events: [...state.realityData.events, ...newData.events],
          extensions: (state.realityData.extensions || 0) + 1
        },
        isExtending: false
      }));
    } catch (err) {
      console.error(err);
      triggerCollapse();
      set({ isExtending: false });
    }
  }
}))
