import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIndices } from '../store/indices.ts';
import Barometer from '../components/Barometer.tsx';
import IndexChart from '../components/IndexChart.tsx';
import { useTranslation } from 'react-i18next';
import { getCategoryTranslationKey } from '../config/categories';

const IndexDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { items } = useIndices();
  const index = items.find(item => item.id === id);

  const [days, setDays] = useState(30); // Standard: 30 Tage

  if (!index) {
    return <div>{t("not_found")}</div>;
  };
  const chartData = index.history.slice(-days); 

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        >
            ← {t("back_to_dashboard")}
        </button>
        <div className="text-sm text-zinc-400">ID: {index.id}</div>
      </div>

      {/* Title Section */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{index.name}</h1>
        <div className="flex gap-2 mt-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900 dark:text-blue-200">
                {t(getCategoryTranslationKey(index.category))}
            </span>
            {index.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-zinc-100 text-zinc-600 text-xs rounded-full dark:bg-zinc-800 dark:text-zinc-400">
                    #{tag}
                </span>
            ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Stats & Barometer */}
        <div className="space-y-6">
            {/* Current Value Card */}
            <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-zinc-700 dark:text-zinc-300">{t("current_value")}</h3>
                <div className="flex justify-center">
                    <Barometer value={index.value} />
                </div>
                <div className="text-center mt-4 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                    {index.value}
                </div>
            </div>
        </div>

        {/* Right Column: Chart (takes up 2 columns) */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">{t("history")}</h3>
                <select 
                    value={days} 
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="bg-zinc-50 border border-zinc-200 text-zinc-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-zinc-800 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white"
                >
                    <option value={7}>{t("7_days")}</option>
                    <option value={30}>{t("30_days")}</option>
                    <option value={90}>{t("90_days")}</option>
                    <option value={365}>{t("1_year")}</option>
                </select>
            </div>
            <div className="h-[300px] w-full">
                <IndexChart data={chartData} />
            </div>
        </div>

      </div>
    </div>
  );
};

export default IndexDetail;
