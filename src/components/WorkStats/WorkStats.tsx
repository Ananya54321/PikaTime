import React from 'react';
import type { ProductivityState } from '../../types/Pet';

interface WorkStatsProps {
  productivityState: ProductivityState;
  workStats: {
    todayWorkTime: number;
    todayCoins: number;
    todaySessions: number;
    totalWorkTime: number;
    totalCoins: number;
    totalSessions: number;
  };
}

/**
 * WorkStats component - Displays work productivity statistics
 */
export const WorkStats: React.FC<WorkStatsProps> = ({
  productivityState,
  workStats
}) => {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="text-center mb-4">
        <h3 className="m-0 mb-2 text-white/90 text-xl font-bold flex items-center justify-center gap-2 tracking-tight">
          <span>📊</span>
          Work Statistics
        </h3>
        <p className="m-0 text-white/70 text-sm font-medium">
          Track your productivity progress
        </p>
      </div>

      <div className="flex-1 flex items-center">
        <div className="w-full grid grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
            <p className="text-3xl font-black text-white/95 m-0 mb-2 drop-shadow-sm">
              {workStats.todayWorkTime}
            </p>
            <p className="text-xs text-white/70 m-0 uppercase tracking-wider font-semibold">
              Today (min)
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
            <p className="text-3xl font-black text-white/95 m-0 mb-2 drop-shadow-sm">
              {workStats.todayCoins}
            </p>
            <p className="text-xs text-white/70 m-0 uppercase tracking-wider font-semibold">
              Today Coins
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
            <p className="text-3xl font-black text-white/95 m-0 mb-2 drop-shadow-sm">
              {Math.floor(workStats.totalWorkTime / 60)}
            </p>
            <p className="text-xs text-white/70 m-0 uppercase tracking-wider font-semibold">
              Total Hours
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
            <p className="text-3xl font-black text-white/95 m-0 mb-2 drop-shadow-sm">
              {productivityState.coins}
            </p>
            <p className="text-xs text-white/70 m-0 uppercase tracking-wider font-semibold">
              Total Coins
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
