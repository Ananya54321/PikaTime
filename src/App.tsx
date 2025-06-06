import { Pet } from './components/Pet/Pet';
import { PetStats } from './components/PetStats/PetStats';
import { ActionButtons } from './components/ActionButtons/ActionButtons';
import { WorkTimer } from './components/WorkTimer/WorkTimer';
import { WorkStats } from './components/WorkStats/WorkStats';
import { WorkHistory } from './components/WorkHistory/WorkHistory';
import { HelpDialog } from './components/HelpDialog/HelpDialog';
import { usePetState } from './hooks/usePetState';
import { useProductivityState } from './hooks/useProductivityState';
import { useState } from 'react';

/**
 * Main App component for the Virtual Pet application
 */
function App() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  
  const {
    productivityState,
    actions: productivityActions,
    getWorkStats
  } = useProductivityState();
  
  const { petState, actions } = usePetState(productivityActions.spendCoins);
  
  const workStats = getWorkStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] p-4 font-sans text-white antialiased">
      <header className="text-center mb-6 p-2 relative">
        {/* Reset Button - Top Left Corner */}
        <button
          onClick={actions.resetPet}
          className="absolute top-0 left-0 p-3 flex items-center gap-2 py-2 px-3 border-2 border-red-500/50 bg-red-500/10 text-white/90 rounded-xl cursor-pointer font-semibold transition-all duration-300 ease-out backdrop-blur-md text-sm hover:bg-red-500/20 hover:border-red-500/80 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-transparent"
          title="Reset pet to default state"
        >
          <span className="text-sm">🔄</span>
          Reset
        </button>
        
        <h1 className="text-4xl font-black bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-2 tracking-tight">
          🐾 PikaTime!
        </h1>
        <p className="text-lg text-white/80 font-normal">
          Take care of your pikachu by being productive!
        </p>
        
        {/* Help Button */}
        <button
          onClick={() => setIsHelpOpen(true)}
          className="absolute top-0 right-0 p-3 text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label="Open help dialog"
          title="Get help and productivity tips"
        >
          <span className="text-2xl">❓</span>
        </button>
      </header>

      <main className="w-full h-[80vh] mx-auto grid grid-cols-12 grid-rows-6 gap-4 [grid-template-areas:'hero_hero_hero_timer_timer_timer_timer_timer_actions_actions_actions_actions'_'hero_hero_hero_timer_timer_timer_timer_timer_actions_actions_actions_actions'_'hero_hero_hero_timer_timer_timer_timer_timer_actions_actions_actions_actions'_'stats_stats_stats_workstats_workstats_workstats_workstats_history_history_history_history_history'_'stats_stats_stats_workstats_workstats_workstats_workstats_history_history_history_history_history'_'stats_stats_stats_workstats_workstats_workstats_workstats_history_history_history_history_history']">
        {/* Hero Section - Pet Display */}
        <div className="[grid-area:hero] h-full rounded-3xl bg-white/[0.02] backdrop-blur-2xl border border-white/10 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 hover:border-white/20 focus-within:outline-2 focus-within:outline-[#667eea] focus-within:outline-offset-2 focus-within:-translate-y-0.5 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:rounded-3xl before:pointer-events-none bg-gradient-to-br from-[#667eea]/10 to-[#764ba2]/10" role="main" aria-label="Pet display">
          <Pet petState={petState} />
        </div>
        
        {/* Stats Panel */}
        <div className="[grid-area:stats] h-full rounded-3xl bg-white/[0.02] backdrop-blur-2xl border border-white/10 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 hover:border-white/20 focus-within:outline-2 focus-within:outline-[#667eea] focus-within:outline-offset-2 focus-within:-translate-y-0.5 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:rounded-3xl before:pointer-events-none bg-gradient-to-br from-green-500/10 to-emerald-400/10" role="region" aria-label="Pet statistics">
          <PetStats petState={petState} />
        </div>
        
        {/* Work Timer - Featured */}
        <div className="[grid-area:timer] h-full rounded-3xl bg-white/[0.02] backdrop-blur-2xl border border-white/10 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 hover:border-white/20 focus-within:outline-2 focus-within:outline-[#667eea] focus-within:outline-offset-2 focus-within:-translate-y-0.5 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:rounded-3xl before:pointer-events-none bg-gradient-to-br from-yellow-400/10 to-orange-500/10" role="region" aria-label="Work timer">
          <WorkTimer
            productivityState={productivityState}
            onStartWork={productivityActions.startWorkSession}
            onEndWork={productivityActions.endWorkSession}
            onCancelWork={productivityActions.cancelWorkSession}
          />
        </div>

        {/* Work Statistics */}
        <div className="[grid-area:workstats] h-full rounded-3xl bg-white/[0.02] backdrop-blur-2xl border border-white/10 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 hover:border-white/20 focus-within:outline-2 focus-within:outline-[#667eea] focus-within:outline-offset-2 focus-within:-translate-y-0.5 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:rounded-3xl before:pointer-events-none bg-gradient-to-br from-purple-500/10 to-blue-500/10" role="region" aria-label="Work statistics">
          <WorkStats
            productivityState={productivityState}
            workStats={workStats}
          />
        </div>
        
        {/* Action Buttons */}
        <div className="[grid-area:actions] h-full rounded-3xl bg-white/[0.02] backdrop-blur-2xl border border-white/10 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 hover:border-white/20 focus-within:outline-2 focus-within:outline-[#667eea] focus-within:outline-offset-2 focus-within:-translate-y-0.5 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:rounded-3xl before:pointer-events-none bg-gradient-to-br from-red-500/10 to-orange-500/10" role="region" aria-label="Pet care actions">
          <ActionButtons 
            petState={petState}
            coins={productivityState.coins}
            onFeed={actions.feed}
            onPlay={actions.play}
            onRest={actions.rest}
          />
        </div>
        
        {/* Work History */}
        <div className="[grid-area:history] h-full rounded-3xl bg-white/[0.02] backdrop-blur-2xl border border-white/10 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 hover:border-white/20 focus-within:outline-2 focus-within:outline-[#667eea] focus-within:outline-offset-2 focus-within:-translate-y-0.5 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:rounded-3xl before:pointer-events-none bg-gradient-to-br from-gray-600/10 to-gray-400/10" role="region" aria-label="Work history and statistics">
          <WorkHistory
            workHistory={productivityState.workHistory}
          />
        </div>
      </main>
      
      {/* Help Dialog */}
      <HelpDialog 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
      />
      
    </div>
  );
}

export default App
