import type { WorkSession } from '../../types/Pet';

interface WorkHistoryProps {
  workHistory: WorkSession[];
 
}

/**
 * WorkHistory component - Displays work session history and statistics
 */
export const WorkHistory: React.FC<WorkHistoryProps> = ({
  workHistory,
}) => {

  // Format date display
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // Check if it's today
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Check if it's yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise show date
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Format duration display
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="p-5 h-full flex flex-col relative">
     <p className="text-white/90 text-center text-xl font-bold">Work History</p>

      {/* Work History List - Only when toggled and has content */}
      { workHistory.length > 0 && (
        <div className=" overflow-y-auto border border-white/10 rounded-xl bg-white/[0.02] backdrop-blur-sm flex-1 mt-3 scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20 scrollbar-thumb-rounded hover:scrollbar-thumb-white/30">
          {workHistory.map((session) => (
            <div key={session.id} className="p-4 border-b border-white/8 transition-all duration-300 ease-out last:border-b-0 hover:bg-white/5 hover:backdrop-blur-md">
              <div className="flex justify-between items-start mb-3 flex-col sm:flex-row sm:gap-4">
                <p className="font-bold text-white/90 text-lg m-0 flex-1 mr-4 leading-tight sm:mr-0 sm:mb-0 mb-3">
                  {session.description}
                </p>
                <span className="bg-gradient-to-br from-green-500/30 to-green-400/30 text-white/90 py-1.5 px-3 rounded-xl text-sm font-bold whitespace-nowrap border border-green-400/40 backdrop-blur-sm">
                  💰 {session.coinsEarned}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-white/70">
                <span className="flex items-center gap-2 font-semibold">
                  <span>⏱️</span>
                  {formatDuration(session.duration)}
                </span>
                <span className="text-xs font-medium">
                  {formatDate(session.startTime)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
