
import React from 'react';
import { Control, Risk, RiskSeverity } from '../types';
import { AlertTriangle, ShieldCheck, Filter, Search, Plus } from 'lucide-react';

interface Props {
  controls: Control[];
  risks: Risk[];
}

const RiskRegister: React.FC<Props> = ({ controls, risks }) => {
  const getSeverityColor = (sev: RiskSeverity) => {
    switch (sev) {
      case RiskSeverity.HIGH: return 'bg-red-100 text-red-700 border-red-200';
      case RiskSeverity.MEDIUM: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case RiskSeverity.LOW: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Risk & Control Register</h2>
          <p className="text-gray-500">Identify organization risks and map them to compliance controls.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
          <Plus size={18} />
          Create Audit Program
        </button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search risks or control codes..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 font-medium">
          <Filter size={18} />
          Framework: SOC 2
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Risk Identifier & Title</th>
              <th className="px-6 py-4">Inherent Severity</th>
              <th className="px-6 py-4">Mapped Controls</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {risks.map((risk) => (
              <tr key={risk.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded">
                      <AlertTriangle className="text-gray-500" size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{risk.title}</p>
                      <p className="text-xs text-gray-500 uppercase font-mono">{risk.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getSeverityColor(risk.severity)}`}>
                    {risk.severity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {risk.mappedControls.map(cid => {
                      const control = controls.find(c => c.id === cid);
                      return (
                        <span key={cid} className="px-2 py-1 bg-blue-50 text-blue-700 text-[11px] rounded flex items-center gap-1 border border-blue-100" title={control?.title}>
                          <ShieldCheck size={12} />
                          {control?.code}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Mitigated</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskRegister;
