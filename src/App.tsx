import { Pet } from './components/Pet/Pet';
import { PetStats } from './components/PetStats/PetStats';
import { ActionButtons } from './components/ActionButtons/ActionButtons';
import { WorkTimer } from './components/WorkTimer/WorkTimer';
import { WorkHistory } from './components/WorkHistory/WorkHistory';
import { usePetState } from './hooks/usePetState';
import { useProductivityState } from './hooks/useProductivityState';
import './App.css';

/**
 * Main App component for the Virtual Pet application
 */
function App() {
  const {
    productivityState,
    actions: productivityActions,
    getWorkStats
  } = useProductivityState();
  
  const { petState, actions } = usePetState(productivityActions.spendCoins);
  
  const workStats = getWorkStats();

  return (
    <div className="app">
      <header className="app-header">
        <h1>🐾 Virtual Pet</h1>
        <p>Take care of your digital companion by being productive!</p>
      </header>
      
      <main className="bento-grid">
        {/* Hero Section - Pet Display */}
        <div className="bento-item bento-hero" role="main" aria-label="Pet display">
          <Pet petState={petState} />
        </div>
        
        {/* Stats Panel */}
        <div className="bento-item bento-stats" role="region" aria-label="Pet statistics">
          <PetStats petState={petState} />
        </div>
        
        {/* Work Timer - Featured */}
        <div className="bento-item bento-timer" role="region" aria-label="Work timer">
          <WorkTimer
            productivityState={productivityState}
            onStartWork={productivityActions.startWorkSession}
            onEndWork={productivityActions.endWorkSession}
            onCancelWork={productivityActions.cancelWorkSession}
            workStats={workStats}
          />
        </div>
        
        {/* Action Buttons */}
        <div className="bento-item bento-actions" role="region" aria-label="Pet care actions">
          <ActionButtons 
            petState={petState}
            coins={productivityState.coins}
            onFeed={actions.feed}
            onPlay={actions.play}
            onRest={actions.rest}
            onReset={actions.resetPet}
          />
        </div>
        
        {/* Work History */}
        <div className="bento-item bento-history" role="region" aria-label="Work history and statistics">
          <WorkHistory
            workHistory={productivityState.workHistory}
            workStats={workStats}
          />
        </div>
      </main>
      
      <footer className="app-footer">
        <p>💡 Work to earn coins and take care of your pet!</p>
      </footer>
    </div>
  );
}

export default App
