import React, { useState } from 'react';
import { ClipboardCheck, CheckCircle2, XCircle, AlertCircle, DollarSign, UserCheck, Shield } from 'lucide-react';
import { sound } from '../../../utils/sound';

interface Props {
  onComplete?: () => void;
}

export const ITApprovalWidget: React.FC<Props> = ({ onComplete }) => {
  const [decision, setDecision] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDecision = (choice: 'approved' | 'rejected') => {
    sound.playClick();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setDecision(choice);
      if (choice === 'approved') {
        sound.playSuccess();
      }
      if (onComplete) onComplete();
    }, 900);
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 shadow-xl overflow-hidden font-sans text-gray-900 my-2">
      {/* Header */}
      <div className="bg-[#E20074] px-4 py-3 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="w-4 h-4 text-white" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Pending IT Expenditure Approval
          </span>
        </div>
        <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded-full font-semibold">
          REQ-0091842
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Request Overview */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-mono">Requestor:</span>
            <span className="font-semibold text-gray-800">Alex Miller (Principal DevOps)</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-mono">Cost Center:</span>
            <span className="font-semibold text-gray-800">CC-7712 (Magenta Cloud Core)</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-mono">Monthly Budget Impact:</span>
            <span className="font-mono font-bold text-gray-900">$4,200 / month</span>
          </div>
        </div>

        {/* Itemized breakdown */}
        <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-2">
          <div className="flex items-center justify-between font-semibold text-gray-800">
            <span>AWS Production Sandbox Cluster (us-west-2)</span>
            <span className="font-mono">$3,400</span>
          </div>
          <div className="flex items-center justify-between text-gray-600">
            <span>Datadog APM Enterprise Monitoring Seats (x5)</span>
            <span className="font-mono">$800</span>
          </div>
          <p className="text-[11px] text-gray-500 pt-1 border-t border-gray-200 italic">
            "Required for staging and testing the customer migration pipeline ahead of peak traffic."
          </p>
        </div>

        {decision === 'pending' ? (
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => handleDecision('rejected')}
              disabled={isProcessing}
              className="py-2.5 px-3 rounded-lg border border-gray-300 hover:bg-gray-100 text-xs font-semibold text-gray-700 transition-colors disabled:opacity-50"
            >
              Reject / Inquire
            </button>
            <button
              onClick={() => handleDecision('approved')}
              disabled={isProcessing}
              className="py-2.5 px-3 rounded-lg bg-[#E20074] hover:bg-[#c40064] text-xs font-bold text-white shadow-md shadow-[#E20074]/20 flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Approve & Provision</span>
            </button>
          </div>
        ) : decision === 'approved' ? (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1 animate-in fade-in">
            <div className="flex items-center justify-center gap-1.5 text-emerald-700 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Request Approved</span>
            </div>
            <p className="text-[11px] text-emerald-600">
              Provisioning webhook dispatched to AWS IAM and ServiceNow.
            </p>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-center space-y-1 animate-in fade-in">
            <div className="flex items-center justify-center gap-1.5 text-rose-700 font-bold text-xs">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Request Rejected</span>
            </div>
            <p className="text-[11px] text-rose-600">
              Request returned to Alex Miller with request for cost justification.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
