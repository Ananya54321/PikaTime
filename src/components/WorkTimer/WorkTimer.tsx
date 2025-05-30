import React, { useState } from 'react';
import type { ProductivityState } from '../../types/Pet';
import { COINS_PER_MINUTE, MIN_WORK_SESSION } from '../../types/Pet';

interface WorkTimerProps {
  productivityState: ProductivityState;
  onStartWork: (description: string) => void;
  onEndWork: () => void;
  onCancelWork: () => void;
}

/**
 * WorkTimer component - Manages work sessions and productivity tracking
 */
export const WorkTimer: React.FC<WorkTimerProps> = ({
  productivityState,
  onStartWork,
  onEndWork,
  onCancelWork
}) => {
  const [workDescription, setWorkDescription] = useState('');

  const { currentSession } = productivityState;

  // Format time display
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Calculate estimated earnings for current session
  const getEstimatedEarnings = (): number => {
    if (!currentSession) return 0;
    return currentSession.duration >= MIN_WORK_SESSION ? currentSession.duration * COINS_PER_MINUTE : 0;
  };

  // Handle starting work session
  const handleStartWork = () => {
    if (workDescription.trim()) {
      onStartWork(workDescription.trim());
      setWorkDescription('');
    }
  };

  // Handle key press in input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && workDescription.trim()) {
      handleStartWork();
    }
  };

  return (
    <div className="p-6 h-full flex flex-col relative">
      <div className="text-center mb-4">
        <h3 className="m-0 mb-2 text-white/90 text-xl font-bold flex items-center justify-center gap-2 tracking-tight">
          <span>💼</span>
          Work Timer
        </h3>
        <p className="m-0 text-white/70 text-sm font-medium">
          Earn coins by tracking your work sessions
        </p>
      </div>

      {currentSession ? (
        // Active work session display
        <div>
          <div className="text-center my-4 flex-1 flex flex-col justify-center">
            <h2 className="text-5xl font-black text-white/95 m-0 mb-3 font-mono drop-shadow-lg tracking-tight">
              {formatTime(currentSession.duration)}
            </h2>
            <p className="text-lg text-white/80 font-semibold leading-relaxed">
              {currentSession.description}
            </p>
            <p className="text-base text-green-400/90 my-3 font-semibold flex items-center justify-center gap-2">
              💰 Earned: {getEstimatedEarnings()} coins
              {currentSession.duration < MIN_WORK_SESSION && (
                <span className="text-white/60"> (minimum {MIN_WORK_SESSION} minutes required)</span>
              )}
            </p>
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <button className="py-3 px-6 border-none rounded-xl font-bold text-sm cursor-pointer transition-all duration-300 ease-out flex items-center gap-2 font-sans backdrop-blur-md border border-white/10 shadow-lg shadow-black/15 min-w-[120px] justify-center bg-gradient-to-br from-green-500/20 to-green-400/20 text-white/95 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/25 hover:border-white/20 active:-translate-y-px" onClick={onEndWork}>
              <span>⏹️</span>
              Finish Work
            </button>
            <button className="py-3 px-6 border-none rounded-xl font-bold text-sm cursor-pointer transition-all duration-300 ease-out flex items-center gap-2 font-sans backdrop-blur-md border border-white/10 shadow-lg shadow-black/15 min-w-[120px] justify-center bg-gradient-to-br from-gray-600/20 to-gray-500/20 text-white/95 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/25 hover:border-white/20 active:-translate-y-px" onClick={onCancelWork}>
              <span>❌</span>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // Start work session form
        <div className="flex flex-col gap-4 mb-4">
          <input
            type="text"
            className="py-3 px-4 border-2 border-white/20 rounded-lg text-base transition-all duration-300 ease-out font-sans bg-white/5 text-white/90 backdrop-blur-sm placeholder:text-white/50 focus:outline-none focus:border-blue-500/60 focus:shadow-md focus:shadow-blue-500/10 focus:bg-white/8"
            placeholder="What are you working on?"
            value={workDescription}
            onChange={(e) => setWorkDescription(e.target.value)}
            onKeyPress={handleKeyPress}
            maxLength={100}
          />
          
          <div className="flex gap-3 justify-center flex-wrap">
            <button 
              className={`py-3 px-6 border-none rounded-xl font-bold text-sm cursor-pointer transition-all duration-300 ease-out flex items-center gap-2 font-sans backdrop-blur-md border border-white/10 shadow-lg shadow-black/15 min-w-[120px] justify-center bg-gradient-to-br from-green-500/20 to-green-400/20 text-white/95 ${
                workDescription.trim() 
                  ? 'hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/25 hover:border-white/20 active:-translate-y-px' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={handleStartWork}
              disabled={!workDescription.trim()}
            >
              <span>▶️</span>
              Start Work
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
