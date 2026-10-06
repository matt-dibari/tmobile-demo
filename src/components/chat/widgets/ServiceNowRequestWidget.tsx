import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  X,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Share2,
} from 'lucide-react';

interface Props {
  onComplete?: () => void;
}

export const ServiceNowRequestWidget: React.FC<Props> = ({ onComplete }) => {
  const [showReasoning, setShowReasoning] = useState(false);
  const [status, setStatus] = useState<'pending_permission' | 'form_open' | 'submitted' | 'denied'>(
    'pending_permission'
  );

  // Form field state matching Screenshot 2
  const [catalog, setCatalog] = useState('Employee Self Service');
  const [catalogItem, setCatalogItem] = useState('Request Group Access');
  const [justification, setJustification] = useState(
    'Need elevated access to the AWS development and pipeline group for Q4 deployment.'
  );
  const [group, setGroup] = useState('AWS-Cloud-Engineering-Dev');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const groupOptions = [
    'AWS-Cloud-Engineering-Dev',
    'Snowflake-Analytics-Readers',
    'Okta-ServiceNow-Jira-Admins',
    'T-Mobile-Corporate-GitHub-Members',
  ];

  const handleAllow = () => {
    setStatus('form_open');
    if (onComplete) onComplete();
  };

  const handleDeny = () => {
    setStatus('denied');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus('submitted');
      if (onComplete) onComplete();
    }, 800);
  };

  return (
    <div className="w-full max-w-xl font-sans text-gray-900 my-2 space-y-3">
      {/* 1. Reasoning Accordion matching Screenshot 1 */}
      <div>
        <button
          type="button"
          onClick={() => setShowReasoning(!showReasoning)}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 font-medium py-1 transition-colors"
        >
          <span>Show reasoning</span>
          {showReasoning ? (
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          )}
        </button>

        {showReasoning && (
          <div className="mt-1 p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono text-gray-600 space-y-1 animate-in fade-in">
            <div className="flex items-center gap-1.5 text-purple-700 font-semibold">
              <Sparkles className="w-3 h-3 text-purple-600" />
              <span>Thought Process:</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              1. User intent: Request group access in ServiceNow.<br />
              2. Catalog resolution: Querying ServiceNow taxonomy for "Request Group Access" within "Employee Self Service".<br />
              3. Checking user authorization & IAM boundaries for Matt DiBari.<br />
              4. Preparing ServiceNow Action V2 connector schema with pre-populated justification.
            </p>
          </div>
        )}
      </div>

      {/* 2. Structured Assistant Text matching Screenshot 1 */}
      <div className="text-xs text-gray-800 leading-relaxed space-y-2">
        <p>
          I can help with that. To request access to a group, you should use the "Request Group Access" service request form in Compass/ServiceNow.{' '}
          <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-gray-200 text-gray-600 text-[9px] font-bold">
            1
          </span>
        </p>
        <p>
          Please click the <strong>Create Request</strong> button below and select the <strong>Request Group Access</strong> form. Once it opens, you'll be able to specify the group and your business justification, and the request will route for the required approvals.{' '}
          <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-gray-200 text-gray-600 text-[9px] font-bold">
            2
          </span>
        </p>
        <p>
          After you click Create Request, do you already know the exact group name you need, or do you want help figuring that out first?
        </p>

        <div className="pt-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-medium border border-gray-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>2 sources</span>
          </span>
        </div>
      </div>

      {/* 3. Permission Request Card matching Screenshot 1 */}
      {status === 'pending_permission' && (
        <div className="p-3.5 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* ServiceNow Teal Icon */}
            <div className="w-9 h-9 rounded-xl bg-[#293E40] text-emerald-400 flex items-center justify-center font-bold text-xs shadow-xs">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#81B5A1]">
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="12" cy="12" r="3.5" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">ServiceNow Create Request</h4>
              <p className="text-[11px] text-gray-500">ServiceNow Actions V2</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDeny}
              className="text-xs text-rose-600 hover:text-rose-700 px-3 py-1.5 font-medium transition-colors"
            >
              Deny
            </button>
            <button
              onClick={handleAllow}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-full border border-gray-300 hover:border-gray-400 bg-white text-gray-800 shadow-xs hover:bg-gray-50 transition-all"
            >
              Allow once
            </button>
          </div>
        </div>
      )}

      {/* 4. Embedded Form matching Screenshot 2 */}
      {status === 'form_open' && (
        <div className="rounded-2xl bg-white border border-gray-300 shadow-xl overflow-hidden p-5 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900">
              ServiceNow Create Request
            </h3>
            <button
              onClick={() => setStatus('pending_permission')}
              className="w-6 h-6 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            The values of these fields were generated by Assistant. Please ensure you review them carefully before saving.
          </p>

          <form onSubmit={handleSubmitForm} className="space-y-3.5">
            {/* Catalog Field */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-800">
                Catalog <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center bg-[#E5E7EB]/70 rounded-xl px-3 py-2 border border-gray-300">
                <span className="text-xs font-medium text-gray-800 flex-1">{catalog}</span>
                <ChevronDown className="w-4 h-4 text-gray-500 mr-2" />
                <button
                  type="button"
                  onClick={() => setCatalog('')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Catalog Item Field */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-800">
                Catalog Item <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center bg-[#E5E7EB]/70 rounded-xl px-3 py-2 border border-gray-300">
                <span className="text-xs font-medium text-gray-800 flex-1">{catalogItem}</span>
                <ChevronDown className="w-4 h-4 text-gray-500 mr-2" />
                <button
                  type="button"
                  onClick={() => setCatalogItem('')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Business Justification Field */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-800">
                Business Justification <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="Write value"
                className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent font-medium"
              />
            </div>

            {/* Group Field */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-800">
                Group <span className="text-rose-500">*</span>
              </label>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="w-full bg-[#E5E7EB]/70 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 font-medium"
              >
                {groupOptions.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions: Cancel & Submit */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setStatus('pending_permission')}
                className="px-4 py-2 rounded-full border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-full bg-black hover:bg-gray-800 text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 5. Submitted Success Confirmation */}
      {status === 'submitted' && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 animate-in fade-in">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Request Submitted Successfully</span>
          </div>
          <p className="text-xs text-emerald-700 leading-relaxed font-sans">
            Ticket <strong>REQ0091845</strong> has been created in ServiceNow for group{' '}
            <strong>{group}</strong> and routed to your manager for approval.
          </p>
          <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 pt-1 border-t border-emerald-200/60">
            <span>Status: Awaiting Manager Approval</span>
            <span className="text-emerald-700 font-semibold">SLA: 4 hours</span>
          </div>
        </div>
      )}

      {status === 'denied' && (
        <div className="p-3 rounded-xl bg-gray-100 border border-gray-200 text-xs text-gray-600">
          Request permission denied. You can re-enable anytime.
        </div>
      )}

      {/* Bottom reaction footer matching Screenshot 1 */}
      <div className="flex items-center gap-3 pt-1 text-gray-400">
        <button className="hover:text-gray-600 p-1" title="Copy">
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button className="hover:text-gray-600 p-1" title="Helpful">
          <ThumbsUp className="w-3.5 h-3.5" />
        </button>
        <button className="hover:text-gray-600 p-1" title="Not helpful">
          <ThumbsDown className="w-3.5 h-3.5" />
        </button>
        <button className="hover:text-gray-600 p-1" title="Share">
          <Share2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
