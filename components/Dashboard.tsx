
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Shield, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
// Fix: Added MOCK_RISKS to imports
import { MOCK_CONTROLS, MOCK_EVIDENCE, MOCK_FINDINGS, MOCK_RISKS } from '../constants';
import { EvidenceStatus, FindingStatus } from '../types';

const Dashboard: React.FC = () => {
  const approvedEvidenceCount = MOCK_EVIDENCE.filter(e => e.status === EvidenceStatus.APPROVED).length;
  const totalControls = MOCK_CONTROLS.length;
  const auditReadiness = Math.round((approvedEvidenceCount / totalControls) * 100);

  const riskData = [
    { name: 'High', value: 2, color: '#ef4444' },
    { name: 'Medium', value: 1, color: '#f59e0b' },
    { name: 'Low', value: 0, color: '#10b981' },
  ];

  const statusData = [
    { name: 'Approved', value: MOCK_EVIDENCE.filter(e => e.status === EvidenceStatus.APPROVED).length },
    { name: 'Under Review', value: MOCK_EVIDENCE.filter(e => e.status === EvidenceStatus.UNDER_REVIEW).length },
    { name: 'Pending', value: MOCK_EVIDENCE.filter(e => e.status === EvidenceStatus.PENDING).length },
  ];

  const STATS_COLORS = ['#3b82f6', '#f59e0b', '#94a3b8'];

  return (
    <div className="space-y-8">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
            <Shield size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Audit Readiness</p>
            <p className="text-2xl font-bold text-gray-900">{auditReadiness}%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-lg text-green-600">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Compliant Controls</p>
            <p className="text-2xl font-bold text-gray-900">{approvedEvidenceCount}/{totalControls}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 rounded-lg text-red-600">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Open Findings</p>
            <p className="text-2xl font-bold text-gray-900">{MOCK_FINDINGS.filter(f => f.status !== FindingStatus.CLOSED).length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Review</p>
            <p className="text-2xl font-bold text-gray-900">{MOCK_EVIDENCE.filter(e => e.status === EvidenceStatus.UNDER_REVIEW).length}</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Evidence Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Risk Severity Profile</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-900">{MOCK_RISKS.length}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Total Risks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold">Urgent Audit Activities</h3>
          <button className="text-sm text-blue-600 hover:underline">View all</button>
        </div>
        <div className="divide-y divide-gray-100">
          {MOCK_FINDINGS.map(finding => (
            <div key={finding.id} className="p-6 flex items-start gap-4 hover:bg-gray-50 transition-colors">
              <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${finding.severity === 'High' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-gray-900">{finding.title}</h4>
                  <span className="text-xs text-gray-500">Target: {finding.targetDate}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-1">{finding.description}</p>
                <div className="mt-2 flex items-center gap-3">
                   <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase">{finding.status}</span>
                   <span className="text-xs text-gray-400">Owner: {finding.owner}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
