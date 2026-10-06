import React, { useState } from 'react';
import { Wifi, CheckCircle2, AlertTriangle, RefreshCw, Shield, Globe } from 'lucide-react';
import { sound } from '../../../utils/sound';

interface Props {
  onComplete?: () => void;
}

export const NetworkDiagnosticWidget: React.FC<Props> = ({ onComplete }) => {
  const [certFixed, setCertFixed] = useState(false);
  const [isFixing, setIsFixing] = useState(false);

  const handleFix = () => {
    sound.playClick();
    setIsFixing(true);
    setTimeout(() => {
      setIsFixing(false);
      setCertFixed(true);
      sound.playSuccess();
      if (onComplete) onComplete();
    }, 1200);
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 shadow-xl overflow-hidden font-sans text-gray-900 my-2">
      {/* Header */}
      <div className="bg-[#18181B] px-4 py-3 text-white flex items-center justify-between border-b-2 border-[#E20074]">
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4 text-[#E20074]" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            T-Mobile Network Diagnostic
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
          Live Telemetry
        </span>
      </div>

      <div className="p-4 space-y-3">
        {/* Step 1: Corporate Wifi Ping */}
        <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <div>
              <span className="font-semibold text-gray-800 block">T-Mobile-Corp-5G WiFi</span>
              <span className="text-[10px] text-gray-500">SSID Signal: -54 dBm (Strong)</span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            14ms OK
          </span>
        </div>

        {/* Step 2: GlobalProtect VPN */}
        <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-gray-500" />
            <div>
              <span className="font-semibold text-gray-800 block">Palo Alto GlobalProtect VPN</span>
              <span className="text-[10px] text-gray-500">Gateway: vpn-sea.t-mobile.com</span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Connected
          </span>
        </div>

        {/* Step 3: Certificate Status */}
        <div
          className={`p-2.5 rounded-lg border flex items-center justify-between text-xs ${
            certFixed
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-amber-50 border-amber-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {certFixed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            )}
            <div>
              <span className="font-semibold text-gray-800 block">
                802.1X Device Identity Certificate
              </span>
              <span className="text-[10px] text-gray-600">
                {certFixed
                  ? 'Renewed · Valid until Oct 2027'
                  : 'Expiring in 4 days · Re-auth recommended'}
              </span>
            </div>
          </div>

          {!certFixed ? (
            <button
              onClick={handleFix}
              disabled={isFixing}
              className="text-[11px] font-bold px-2.5 py-1 rounded bg-[#E20074] hover:bg-[#c40064] text-white transition-all shadow-sm disabled:opacity-50"
            >
              {isFixing ? 'Renewing...' : 'Auto-Renew'}
            </button>
          ) : (
            <span className="text-[10px] font-mono font-bold text-emerald-700">Healthy</span>
          )}
        </div>
      </div>
    </div>
  );
};
