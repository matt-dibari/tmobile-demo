import React from 'react';
import { Headphones, CheckCircle2, Clock } from 'lucide-react';

export const EscalationCard: React.FC = () => {
  return (
    <div className="w-full max-w-sm rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden font-sans text-gray-900 my-2">
      {/* Clean Magenta Header */}
      <div className="bg-[#E20074] px-4 py-2.5 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Headphones className="w-3.5 h-3.5 text-white" />
          <span className="text-xs font-bold uppercase tracking-wider">
            IT Specialist Escalation
          </span>
        </div>
        <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded font-semibold">
          Queue #1
        </span>
      </div>

      <div className="p-4 space-y-2.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center text-[#E20074] shrink-0 font-bold text-xs">
            SK
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">
              Sarah K. (Bellevue Service Desk)
            </h4>
            <p className="text-[11px] text-gray-500">
              Assigned Specialist · Tier 2 Support
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono text-gray-600">
          <span>Incident: <strong className="text-gray-900">INC0091823</strong></span>
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <Clock className="w-3 h-3" />
            <span>Est. Wait: &lt; 1 min</span>
          </span>
        </div>
      </div>
    </div>
  );
};
