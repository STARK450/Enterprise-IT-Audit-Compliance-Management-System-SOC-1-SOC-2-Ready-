
import React, { useState } from 'react';
import { QuestionnaireItem } from '../types';
// Fix: Added HelpCircle to imports
import { Search, Copy, Check, Download, BrainCircuit, Sparkles, HelpCircle } from 'lucide-react';
import { suggestQuestionnaireResponse } from '../services/geminiService';

interface Props {
  items: QuestionnaireItem[];
}

const QuestionnaireModule: React.FC<Props> = ({ items }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [aiDraft, setAiDraft] = useState<{ id: string; content: string } | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAiDraft = async (id: string, question: string) => {
    setLoadingAi(true);
    const draft = await suggestQuestionnaireResponse(question);
    setAiDraft({ id, content: draft || '' });
    setLoadingAi(false);
  };

  const filteredItems = items.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Security Q&A Library</h2>
          <p className="text-gray-500">Standardized responses for Client Security Questionnaires (CSQs).</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          <Download size={18} />
          Export All (XLSX)
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search for questions (e.g., encryption, password, SOC 2)..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-[10px] font-bold uppercase tracking-widest">{item.category}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2">{item.question}</h3>
                </div>
                <div className="flex gap-2">
                   <button 
                    disabled={loadingAi}
                    onClick={() => handleAiDraft(item.id, item.question)}
                    className="p-2 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-100 flex items-center gap-2 text-xs font-bold disabled:opacity-50"
                  >
                    {loadingAi && aiDraft?.id !== item.id ? <span className="animate-spin h-3 w-3 border-2 border-purple-600 border-t-transparent rounded-full"></span> : <BrainCircuit size={16} />}
                    {aiDraft?.id === item.id ? 'Regenerate Draft' : 'AI Draft'}
                  </button>
                  <button 
                    onClick={() => copyToClipboard(item.standardResponse, item.id)}
                    className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold border ${
                      copiedId === item.id ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {copiedId === item.id ? <Check size={16} /> : <Copy size={16} />}
                    {copiedId === item.id ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Internal Approved Response</p>
                  <p className="text-gray-700 leading-relaxed italic">"{item.standardResponse}"</p>
                </div>

                {aiDraft?.id === item.id && (
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-purple-600" />
                      <p className="text-xs font-bold text-purple-600 uppercase tracking-widest">Gemini Draft Variation</p>
                    </div>
                    <p className="text-gray-700 leading-relaxed italic">"{aiDraft.content}"</p>
                    <button 
                      onClick={() => copyToClipboard(aiDraft.content, `${item.id}-ai`)}
                      className="mt-3 text-[10px] font-bold text-purple-600 hover:underline flex items-center gap-1"
                    >
                      <Copy size={10} /> Copy Draft Variation
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-[10px] text-gray-400 flex justify-between">
              <span>Last Updated: Jan 12, 2024</span>
              <span className="font-bold text-gray-500 uppercase">Verified by Compliance Officer</span>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <HelpCircle className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 font-medium">No results found for "{searchTerm}"</p>
            <p className="text-xs text-gray-400 mt-1">Try a different keyword or create a new response.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionnaireModule;
