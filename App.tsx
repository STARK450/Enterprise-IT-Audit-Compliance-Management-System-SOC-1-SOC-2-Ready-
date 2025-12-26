
import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  HelpCircle,
  Menu,
  X,
  Bell,
  User,
  ChevronRight
} from 'lucide-react';
import { AppView, RiskSeverity, EvidenceStatus, FindingStatus } from './types';
import { MOCK_CONTROLS, MOCK_RISKS, MOCK_EVIDENCE, MOCK_FINDINGS, MOCK_QUESTIONNAIRE } from './constants';
import Dashboard from './components/Dashboard';
import RiskRegister from './components/RiskRegister';
import EvidenceVault from './components/EvidenceVault';
import RemediationTracker from './components/RemediationTracker';
import QuestionnaireModule from './components/QuestionnaireModule';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('DASHBOARD');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, view: 'DASHBOARD' as AppView },
    { name: 'Risk & Controls', icon: ShieldCheck, view: 'RISKS' as AppView },
    { name: 'Evidence Vault', icon: FileText, view: 'EVIDENCE' as AppView },
    { name: 'Remediation', icon: AlertTriangle, view: 'FINDINGS' as AppView },
    { name: 'Security Q&A', icon: HelpCircle, view: 'QUESTIONNAIRE' as AppView },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'DASHBOARD': return <Dashboard />;
      case 'RISKS': return <RiskRegister controls={MOCK_CONTROLS} risks={MOCK_RISKS} />;
      case 'EVIDENCE': return <EvidenceVault controls={MOCK_CONTROLS} evidence={MOCK_EVIDENCE} />;
      case 'FINDINGS': return <RemediationTracker findings={MOCK_FINDINGS} />;
      case 'QUESTIONNAIRE': return <QuestionnaireModule items={MOCK_QUESTIONNAIRE} />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 bg-slate-900 border-r border-slate-800 flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="text-blue-400" />
              AuditGuard
            </h1>
          ) : (
            <ShieldCheck className="text-blue-400 mx-auto" />
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => setCurrentView(item.view)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                currentView === item.view 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="font-medium">{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg text-slate-400 hover:bg-slate-800"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Audit Management</span>
            <ChevronRight size={14} />
            <span className="font-medium text-gray-900 capitalize">{currentView.toLowerCase()}</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-gray-600 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">Alex Auditor</p>
                <p className="text-xs text-gray-500">Compliance Analyst</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
                AA
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
