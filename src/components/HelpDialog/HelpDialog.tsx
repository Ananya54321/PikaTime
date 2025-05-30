import React from 'react';
import { ACTION_COSTS } from '../../types/Pet';

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * HelpDialog component - Shows productivity tips and game instructions
 */
export const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      {/* Dialog Overlay */}
      <div 
        className="absolute inset-0 bg-black/30" 
        onClick={onClose}
        aria-label="Close dialog"
      />
      
      {/* Dialog Content */}
      <div className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#667eea] to-[#764ba2] p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">💡</span>
              Help & Tips
            </h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors duration-200 text-2xl hover:bg-white/10 rounded-full w-10 h-10 flex items-center justify-center"
              aria-label="Close help dialog"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* How to Earn Coins */}
          <section className="bg-white/5 rounded-2xl p-6 border-l-4 border-yellow-500/60 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white/90 mb-4 flex items-center gap-2">
              <span className="text-2xl">💰</span>
              How to Earn Coins
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-white/70 relative pl-8 before:content-['•'] before:absolute before:left-0 before:text-yellow-500/80 before:font-bold">
                💼 <strong className="text-white/90 font-semibold">Complete work sessions</strong> - Use the timer to focus and earn coins for each completed session
              </li>
              <li className="text-sm text-white/70 relative pl-8 before:content-['•'] before:absolute before:left-0 before:text-yellow-500/80 before:font-bold">
                ⏱️ <strong className="text-white/90 font-semibold">Longer sessions = more coins</strong> - Extended focus periods reward you with bonus coins
              </li>
              <li className="text-sm text-white/70 relative pl-8 before:content-['•'] before:absolute before:left-0 before:text-yellow-500/80 before:font-bold">
                📈 <strong className="text-white/90 font-semibold">Stay consistent</strong> - Regular work sessions help build healthy productivity habits
              </li>
            </ul>
          </section>

          {/* Pet Care Actions */}
          <section className="bg-white/5 rounded-2xl p-6 border-l-4 border-green-500/60 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white/90 mb-4 flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              Pet Care Actions
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-white/70 relative pl-8 before:content-['•'] before:absolute before:left-0 before:text-green-500/80 before:font-bold">
                🍎 <strong className="text-white/90 font-semibold">Feed</strong> costs {ACTION_COSTS.feed} coins - increases hunger but makes your pet sleepy
              </li>
              <li className="text-sm text-white/70 relative pl-8 before:content-['•'] before:absolute before:left-0 before:text-green-500/80 before:font-bold">
                🎾 <strong className="text-white/90 font-semibold">Play</strong> costs {ACTION_COSTS.play} coins - boosts happiness but uses energy and hunger
              </li>
              <li className="text-sm text-white/70 relative pl-8 before:content-['•'] before:absolute before:left-0 before:text-green-500/80 before:font-bold">
                💤 <strong className="text-white/90 font-semibold">Rest</strong> costs {ACTION_COSTS.rest} coins - restores energy but decreases hunger slightly
              </li>
              <li className="text-sm text-white/70 relative pl-8 before:content-['•'] before:absolute before:left-0 before:text-green-500/80 before:font-bold">
                📉 <strong className="text-white/90 font-semibold">Stats decrease over time</strong> - check on your pet regularly to keep them healthy
              </li>
            </ul>
          </section>

          {/* Productivity Tips */}
          <section className="bg-white/5 rounded-2xl p-6 border-l-4 border-blue-500/60 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white/90 mb-4 flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              Productivity Tips
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-white/70 relative pl-8 before:content-['•'] before:absolute before:left-0 before:text-blue-500/80 before:font-bold">
                🎯 <strong className="text-white/90 font-semibold">Use the Pomodoro Technique</strong> - Work in focused 25-minute intervals with short breaks
              </li>
              <li className="text-sm text-white/70 relative pl-8 before:content-['•'] before:absolute before:left-0 before:text-blue-500/80 before:font-bold">
                📱 <strong className="text-white/90 font-semibold">Eliminate distractions</strong> - Put your phone away and close unnecessary tabs
              </li>
              <li className="text-sm text-white/70 relative pl-8 before:content-['•'] before:absolute before:left-0 before:text-blue-500/80 before:font-bold">
                🎵 <strong className="text-white/90 font-semibold">Find your focus music</strong> - Use instrumental music or white noise to enhance concentration
              </li>
              <li className="text-sm text-white/70 relative pl-8 before:content-['•'] before:absolute before:left-0 before:text-blue-500/80 before:font-bold">
                ☕ <strong className="text-white/90 font-semibold">Stay hydrated</strong> - Keep water nearby and take brief stretch breaks
              </li>
              <li className="text-sm text-white/70 relative pl-8 before:content-['•'] before:absolute before:left-0 before:text-blue-500/80 before:font-bold">
                📝 <strong className="text-white/90 font-semibold">Set clear goals</strong> - Define what you want to accomplish before starting each session
              </li>
            </ul>
          </section>

          {/* Game Mechanics */}
          <section className="bg-white/5 rounded-2xl p-6 border-l-4 border-purple-500/60 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white/90 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎮</span>
              Game Mechanics
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-white/70 relative pl-8 before:content-['•'] before:absolute before:left-0 before:text-purple-500/80 before:font-bold">
                😊 <strong className="text-white/90 font-semibold">Pet mood changes</strong> - Your pet's emoji and colors reflect their overall well-being
              </li>
              <li className="text-sm text-white/70 relative pl-8 before:content-['•'] before:absolute before:left-0 before:text-purple-500/80 before:font-bold">
                🔄 <strong className="text-white/90 font-semibold">Reset anytime</strong> - Use the reset button in the pet area to start fresh
              </li>
              <li className="text-sm text-white/70 relative pl-8 before:content-['•'] before:absolute before:left-0 before:text-purple-500/80 before:font-bold">
                📊 <strong className="text-white/90 font-semibold">Track your progress</strong> - View your work history and productivity statistics
              </li>
              <li className="text-sm text-white/70 relative pl-8 before:content-['•'] before:absolute before:left-0 before:text-purple-500/80 before:font-bold">
                💝 <strong className="text-white/90 font-semibold">Balance is key</strong> - Keep all three stats (hunger, happiness, energy) healthy
              </li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 p-6 border-t border-white/10 rounded-b-3xl backdrop-blur-md">
          <div className="text-center">
            <p className="text-white/60 text-sm mb-4">
              🌟 Remember: Taking care of your virtual pet helps you build real productivity habits!
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
