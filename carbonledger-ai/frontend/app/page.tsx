'use client';

import { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { CloudUpload, Leaf, AlertCircle, FileText, Download, CheckCircle2, Factory, Car, Plane, Zap } from 'lucide-react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setIsDragActive(false);
    },
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    accept: { 'application/pdf': ['.pdf'], 'text/csv': ['.csv'] }
  });

  const uploadAndCalculate = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const uploadRes = await axios.post(`${apiUrl}/upload-invoice`, formData);
      const items = uploadRes.data.extracted_items;

      const calcRes = await axios.post(`${apiUrl}/calculate`, items);
      setResult(calcRes.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const getIconForCategory = (category: string) => {
    if (category.includes('electricity')) return <Zap className="w-5 h-5 text-yellow-400" />;
    if (category.includes('gasoline')) return <Car className="w-5 h-5 text-blue-400" />;
    if (category.includes('air_travel')) return <Plane className="w-5 h-5 text-purple-400" />;
    return <Factory className="w-5 h-5 text-gray-400" />;
  };

  const exportReport = () => {
    if (!result) return;
    const reportStr = JSON.stringify(result, null, 2);
    const blob = new Blob([reportStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'carbon-footprint-report.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050505] text-slate-200">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-900/20 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10 flex flex-col min-h-screen">

        {/* Header */}
        <header className="flex justify-between items-center mb-16 animate-float" style={{ animationDuration: '8s' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <Leaf className="text-white w-7 h-7" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-200">
              CarbonLedger AI
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-slate-400">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> API Active</span>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 flex-grow">

          {/* Left Column: Upload */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 text-white">
                Turn spending into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                  climate action.
                </span>
              </h2>
              <p className="text-lg text-slate-400">
                Instantly extract and analyze the carbon footprint hidden within your financial invoices and expense reports using AI.
              </p>
            </div>

            <div className={`glass-panel p-1 rounded-2xl transition-all duration-300 ${isDragActive ? 'glass-panel-glow scale-[1.02]' : ''}`}>
              <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors duration-300 flex flex-col items-center justify-center min-h-[280px]
                  ${isDragActive ? 'border-emerald-400 bg-emerald-900/10' : 'border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800/30'}`}
              >
                <input {...getInputProps()} />
                <div className={`p-4 rounded-full mb-4 transition-all duration-300 ${isDragActive ? 'bg-emerald-500/20 animate-pulse-glow' : 'bg-slate-800'}`}>
                  <CloudUpload className={`w-10 h-10 ${isDragActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                </div>

                {file ? (
                  <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                    <FileText className="w-8 h-8 text-emerald-400 mb-2" />
                    <p className="text-emerald-300 font-medium truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-slate-500 mt-1">Ready for analysis</p>
                  </div>
                ) : (
                  <>
                    <p className="text-slate-300 font-medium mb-1">Drag & drop your invoice here</p>
                    <p className="text-sm text-slate-500">Supports PDF, CSV (Max 10MB)</p>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={uploadAndCalculate}
              disabled={!file || loading}
              className="mt-6 w-full relative group overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 transition-transform duration-300 group-hover:scale-105" />
              <div className="relative px-6 py-4 flex items-center justify-center gap-2 text-white font-semibold text-lg">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing Data...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Calculate Footprint
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Right Column: Results Dashboard */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {result ? (
              <div className="glass-panel-glow p-8 rounded-3xl animate-in slide-in-from-right-8 duration-700 h-full flex flex-col justify-between">

                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Total Impact</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black text-white">{result.total_co2_kg}</span>
                      <span className="text-xl text-emerald-400 font-bold">kg CO₂</span>
                    </div>
                  </div>
                  <button
                    onClick={exportReport}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg text-sm font-medium text-slate-200 border border-slate-700"
                  >
                    <Download className="w-4 h-4" /> Export Report
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 border-b border-slate-700/50 pb-2">Emission Breakdown</h4>
                    <div className="space-y-3">
                      {result.breakdown?.map((item: any, i: number) => {
                        const percentage = Math.round((item.co2_kg / result.total_co2_kg) * 100);
                        return (
                          <div key={i} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/50 hover:border-slate-700 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                {getIconForCategory(item.category)}
                                <span className="font-medium text-slate-200 capitalize">{item.category.replace('_', ' ')}</span>
                              </div>
                              <span className="font-bold text-emerald-400">{item.co2_kg} <span className="text-sm font-normal text-slate-500">kg</span></span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-1.5 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${percentage}%`, transitionDelay: `${i * 100}ms` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-emerald-950/30 p-5 rounded-2xl border border-emerald-900/50">
                    <h4 className="flex items-center gap-2 text-emerald-400 font-semibold mb-3">
                      <AlertCircle className="w-5 h-5" /> AI Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {result.recommendations?.map((rec: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-emerald-100/80">
                          <span className="text-emerald-500 mt-0.5">•</span> {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-panel p-8 rounded-3xl h-full min-h-[500px] flex flex-col items-center justify-center text-center border-dashed">
                <div className="w-24 h-24 rounded-full bg-slate-800/50 flex items-center justify-center mb-6">
                  <Leaf className="w-10 h-10 text-slate-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-300 mb-2">Awaiting Data</h3>
                <p className="text-slate-500 max-w-sm">
                  Upload your financial documents to generate a detailed, AI-driven carbon footprint analysis.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
