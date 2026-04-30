'use client';

import { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
    accept: { 'application/pdf': ['.pdf'], 'text/csv': ['.csv'] }
  });

  const uploadAndCalculate = async () => {
    if (!file) return;
    setLoading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Upload and parse
      const uploadRes = await axios.post('http://localhost:8000/upload-invoice', formData);
      const items = uploadRes.data.extracted_items;
      
      // Calculate emissions
      const calcRes = await axios.post('http://localhost:8000/calculate', items);
      setResult(calcRes.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-2">🌿 CarbonLedger AI</h1>
        <p className="text-gray-600 mb-8">Turn business spending into climate action</p>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Upload Financial Data</h2>
          <div {...getRootProps()} className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500">
            <input {...getInputProps()} />
            <p className="text-gray-500">Drag & drop invoices, CSV, or PDF files here</p>
          </div>
          {file && <p className="mt-2 text-green-600">✓ {file.name}</p>}
          
          <button
            onClick={uploadAndCalculate}
            disabled={!file || loading}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Calculate Carbon Footprint'}
          </button>
        </div>
        
        {result && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold mb-4">📊 Your Carbon Report</h2>
            <p className="text-3xl font-bold text-green-700 mb-4">Total: {result.total_co2_kg} kg CO₂</p>
            <h3 className="font-semibold mb-2">Breakdown:</h3>
            <ul className="mb-4">
              {result.breakdown?.map((item: any, i: number) => (
                <li key={i}>{item.category}: {item.co2_kg} kg CO₂</li>
              ))}
            </ul>
            <h3 className="font-semibold mb-2">💡 Recommendations:</h3>
            <ul className="list-disc pl-5">
              {result.recommendations?.map((rec: string, i: number) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">Download ESG Report (PDF)</button>
          </div>
        )}
      </div>
    </main>
  );
}
