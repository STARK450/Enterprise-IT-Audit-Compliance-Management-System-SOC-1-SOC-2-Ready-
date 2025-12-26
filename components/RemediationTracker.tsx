
import React, { useState } from 'react';
import { Finding, FindingStatus, RiskSeverity } from '../types';
import { Sparkles, ArrowRight, User, Calendar, ExternalLink } from 'lucide-react';
import { generateRemediationPlan } from '../services/geminiService';

interface Props {
  findings: Finding[];
}

const RemediationTracker: React.FC<Props> = ({ findings }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [plans, setPlans] = useState<Record<string, string>>({});

  const handleSuggestPlan = async (finding: Finding) => {
    setLoadingId(finding.id);
    const plan = await generateRemediationPlan(finding.description);
    setPlans(prev => ({ ...prev, [finding.id]: plan }));
    setLoadingId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Remediation Tracker</h2>
        <p className="text-gray-500">Track and manage audit non-conformities and missing controls.</p>
      </div>

      <div className="space-y-4">
        {findings.map((finding) => (
          <div key={finding.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className="p-6 flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                  finding.severity === RiskSeverity.HIGH ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'
                }`}>
                  {finding.severity} Risk
                </span>
                <span className="text-xs text-gray-400 font-medium">#{finding.id}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{finding.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">{finding.description}</p>
              
              <div className="flex flex-wrap gap-6 items-center pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  <div className="text-xs">
                    <p className="text-gray-400">Owner</p>
                    <p className="font-semibold text-gray-700">{finding.owner}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  <div className="text-xs">
                    <p className="text-gray-400">Target Closure</p>
                    <p className="font-semibold text-gray-700">{finding.targetDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${finding.status === FindingStatus.OPEN ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                  <div className="text-xs">
                    <p className="text-gray-400">Status</p>
                    <p className="font-semibold text-gray-700">{finding.status}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-80 bg-slate-50 border-l border-gray-100 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">AI Remediation Assistant</span>
                <Sparkles size={14} className="text-purple-500" />
              </div>
              
              {plans[finding.id] ? (
                <div className="flex-1">
                   <div className="bg-white p-4 rounded-lg border border-purple-100 text-[13px] text-gray-700 whitespace-pre-line shadow-sm">
                    {plans[finding.id]}
                  </div>
                  <button 
                    onClick={() => setPlans(prev => {
                      const next = { ...prev };
                      delete next[finding.id];
                      return next;
                    })}
                    className="mt-3 text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1"
                  >
                    Clear Suggestion
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-3">
                    <Sparkles size={24} />
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Need help fixing this finding? Let Gemini draft a plan.</p>
                  <button 
                    disabled={loadingId === finding.id}
                    onClick={() => handleSuggestPlan(finding)}
                    className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loadingId === finding.id ? (
                      <span className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></span>
                    ) : (
                      <>Generate Plan <ArrowRight size={14} /></>
                    )}
                  </button>
                </div>
              )}
              
              <button className="mt-auto w-full py-2.5 border border-gray-200 bg-white text-gray-600 font-bold text-xs rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                Log Resolution <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemediationTracker;
