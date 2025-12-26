
import React, { useState } from 'react';
import { Control, Evidence, EvidenceStatus } from '../types';
import { Upload, FileText, CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';

interface Props {
  controls: Control[];
  evidence: Evidence[];
}

const EvidenceVault: React.FC<Props> = ({ controls, evidence }) => {
  const [filter, setFilter] = useState<EvidenceStatus | 'ALL'>('ALL');

  const filteredEvidence = filter === 'ALL' 
    ? evidence 
    : evidence.filter(e => e.status === filter);

  const getStatusIcon = (status: EvidenceStatus) => {
    switch (status) {
      case EvidenceStatus.APPROVED: return <CheckCircle className="text-green-500" size={16} />;
      case EvidenceStatus.PENDING: return <Clock className="text-gray-400" size={16} />;
      case EvidenceStatus.UNDER_REVIEW: return <AlertCircle className="text-yellow-500" size={16} />;
      case EvidenceStatus.REJECTED: return <XCircle className="text-red-500" size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Evidence Vault</h2>
          <p className="text-gray-500">Centralized repository for all compliance artifacts and screenshots.</p>
        </div>
        <div className="flex bg-white border border-gray-200 rounded-lg p-1">
          {(['ALL', ...Object.values(EvidenceStatus)] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs font-semibold rounded ${
                filter === s ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-white hover:border-blue-300 transition-all cursor-pointer group">
          <div className="p-4 bg-white rounded-full shadow-sm text-gray-400 group-hover:text-blue-500 group-hover:scale-110 transition-all mb-4">
            <Upload size={32} />
          </div>
          <p className="font-bold text-gray-700">Upload New Evidence</p>
          <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG or CSV up to 10MB</p>
          <input type="file" className="hidden" />
        </div>

        {filteredEvidence.map((ev) => {
          const control = controls.find(c => c.id === ev.controlId);
          return (
            <div key={ev.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded">
                  <FileText size={20} />
                </div>
                <div className="flex items-center gap-1.5">
                  {getStatusIcon(ev.status)}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{ev.status}</span>
                </div>
              </div>
              <h4 className="font-bold text-gray-900 truncate mb-1" title={ev.fileName}>{ev.fileName}</h4>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold">{control?.code}</span>
                <span className="text-[10px] text-gray-400">Map to Control</span>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{ev.uploadDate}</span>
                </div>
                <span className="font-medium text-gray-700">By {ev.uploader}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EvidenceVault;
