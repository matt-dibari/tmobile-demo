import React, { useState } from 'react';
import { Building2, CheckCircle2, ShieldCheck, CreditCard, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { sound } from '../../../utils/sound';

interface Props {
  onComplete?: () => void;
}

export const BadgeAccessWidget: React.FC<Props> = ({ onComplete }) => {
  const [selectedCampus, setSelectedCampus] = useState('Bellevue HQ - Building 4');
  const [accessTier, setAccessTier] = useState('Lab & Server Room (24/7)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const campuses = [
    'Bellevue HQ - Building 4',
    'Bellevue HQ - Building 2',
    'Overland Park Campus',
    'Frisco Innovation Center',
  ];

  const tiers = [
    { label: 'Standard Floor Access', desc: 'Mon-Fri 7am - 7pm' },
    { label: 'Lab & Server Room (24/7)', desc: 'Engineering & Lab clearance' },
    { label: 'Executive Briefing Center', desc: 'Client presentation spaces' },
  ];

  const handleSubmit = () => {
    sound.playClick();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsApproved(true);
      sound.playSuccess();
      if (onComplete) onComplete();
    }, 1100);
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 shadow-xl overflow-hidden font-sans text-gray-900 my-2">
      {/* Magenta Header Strip */}
      <div className="bg-[#E20074] px-4 py-3 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-white" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Corporate Badge Access Request
          </span>
        </div>
        <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded-full font-semibold">
          Auto-Approval Policy
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Digital ID Preview Mockup */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#E20074]/30 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E20074] flex items-center justify-center font-bold text-sm tracking-wider text-white shadow">
                MD
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Matt DiBari</h4>
                <p className="text-[11px] text-gray-300 font-mono">T-Mobile Corporate · EMP-48912</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono uppercase text-[#E20074] font-bold block">
                RFID Enabled
              </span>
              <span className="text-[10px] text-gray-300 font-mono">ACTIVE</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-300">
            <span>Access Point:</span>
            <span className="text-white font-semibold">{selectedCampus}</span>
          </div>
        </div>

        {!isApproved ? (
          <>
            {/* Campus Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-700">Select Campus / Facility</label>
              <select
                value={selectedCampus}
                onChange={(e) => {
                  sound.playClick();
                  setSelectedCampus(e.target.value);
                }}
                className="w-full text-xs bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E20074] focus:border-transparent font-medium"
              >
                {campuses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Clearance Tier */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-700">Clearance Level</label>
              <div className="grid grid-cols-1 gap-2">
                {tiers.map((t) => (
                  <div
                    key={t.label}
                    onClick={() => {
                      sound.playClick();
                      setAccessTier(t.label);
                    }}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between ${
                      accessTier === t.label
                        ? 'border-[#E20074] bg-[#E20074]/5 ring-1 ring-[#E20074]'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">{t.label}</span>
                      <span className="text-[10px] text-gray-500">{t.desc}</span>
                    </div>
                    {accessTier === t.label && (
                      <CheckCircle2 className="w-4 h-4 text-[#E20074]" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Action */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-lg bg-[#E20074] hover:bg-[#c40064] text-white text-xs font-bold shadow-md shadow-[#E20074]/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Syncing Security Credentials...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize & Issue Digital Pass</span>
                </>
              )}
            </button>
          </>
        ) : (
          /* Approved Confirmation State */
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-in fade-in">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-emerald-900">Access Granted Successfully!</h4>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Your physical and Apple Wallet badge profile for <strong>{selectedCampus}</strong> has been updated. Access is valid immediately for <strong>{accessTier}</strong>.
            </p>
            <div className="pt-2 text-[11px] font-mono text-gray-500">
              Transaction ID: <span className="font-semibold text-gray-800">SEC-RFID-99214-OK</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
