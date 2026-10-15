import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-hidden flex relative selection:bg-cyan-500/30">
      {/* 3D/Glowing Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-600/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      
      {/* Frosted Glass Sidebar */}
      <aside className="w-64 h-screen p-6 flex flex-col gap-8 border-r border-white/10 bg-white/5 backdrop-blur-xl z-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center">
            <span className="font-bold text-lg tracking-wider text-white">TA</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Tâm An Admin
          </h1>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {[
            { name: 'Dashboard', active: true, icon: '❖' },
            { name: 'Knowledge Base', active: false, icon: '📚' },
            { name: 'Bot Config', active: false, icon: '🤖' },
            { name: 'Settings', active: false, icon: '⚙️' },
          ].map((item) => (
            <button
              key={item.name}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                item.active
                  ? 'bg-white/10 text-cyan-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
        
        <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)] animate-pulse" />
            <span className="text-sm font-medium text-gray-300">System Online</span>
          </div>
          <p className="text-xs text-gray-500">All services operational</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 z-10 h-screen overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-purple-200">
              RAG Metrics Overview
            </h2>
            <p className="text-gray-400 mt-2 text-sm">Real-time data synchronization</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm text-cyan-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              Live Sync
            </div>
            <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden bg-white/10 cursor-pointer hover:border-cyan-400 transition-colors">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Documents */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg relative overflow-hidden group hover:border-purple-500/50 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-purple-500/20 transition-all" />
            <h3 className="text-gray-400 text-sm font-medium mb-1">Total Documents</h3>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-white">12,450</span>
              <span className="text-green-400 text-sm mb-1 flex items-center">↑ 12%</span>
            </div>
            <div className="mt-4 w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[70%]" />
            </div>
          </div>

          {/* Card 2: Vectors */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg relative overflow-hidden group hover:border-cyan-500/50 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-cyan-500/20 transition-all" />
            <h3 className="text-gray-400 text-sm font-medium mb-1">Total Vectors</h3>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-white">1.2M</span>
              <span className="text-green-400 text-sm mb-1 flex items-center">↑ 8%</span>
            </div>
            <div className="mt-4 w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[85%]" />
            </div>
          </div>

          {/* Card 3: Bot Status */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg relative overflow-hidden group hover:border-green-500/50 transition-colors duration-500">
             <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-green-500/20 transition-all" />
            <h3 className="text-gray-400 text-sm font-medium mb-1">Browser-Use Bot</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-2xl font-bold text-white">Active</span>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
            <p className="mt-3 text-xs text-gray-400">Scraping 3 domains concurrently</p>
          </div>
        </div>

        {/* Main Chart Area */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden h-[400px] flex flex-col">
          <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Vector Ingestion Activity</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-gray-300 outline-none focus:border-cyan-500 backdrop-blur-md">
              <option className="bg-slate-900">Last 7 Days</option>
              <option className="bg-slate-900">Last 30 Days</option>
            </select>
          </div>

          {/* Mock Chart Visualization */}
          <div className="flex-1 flex items-end gap-2 px-2 pb-4">
            {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center group cursor-crosshair">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity mb-2 bg-white/10 border border-white/20 backdrop-blur-md px-2 py-1 rounded text-xs text-white absolute -translate-y-full mt-[-10px]">
                  {height * 100} reqs
                </div>
                {/* Bar */}
                <div 
                  className="w-full max-w-[48px] rounded-t-sm bg-gradient-to-t from-cyan-500/20 to-purple-500/80 border-t border-white/30 transition-all duration-500 group-hover:from-cyan-400/40 group-hover:to-purple-400 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
          
          {/* X Axis Labels */}
          <div className="flex justify-between px-6 text-xs text-gray-500 border-t border-white/5 pt-3">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </main>
    </div>
  );
}
