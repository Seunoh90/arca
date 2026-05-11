import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const navItems = [
    { id: 'worldview', label: '세계관' },
    { id: 'infra', label: '아르카 인프라' },
    { id: 'locations', label: '구역 안내' },
    { id: 'characters', label: '인물 DB' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0a0e14]/90 backdrop-blur-md border-b border-[#1e293b]/50 z-40 border-b-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 min-h-[5rem] py-3 md:py-0 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-12">
        {/* Logo Section */}
        <div className="flex items-center gap-4 shrink-0 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <div className="relative">
             <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"></div>
             <ShieldAlert className="text-cyan-400 w-8 h-8 md:w-10 md:h-10 relative z-10" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-widest text-lg md:text-xl leading-none font-mono">LEAKNET</span>
            <span className="text-slate-200 text-sm md:text-base font-medium mt-1 leading-none">리크넷</span>
            <span className="text-slate-500 text-[9px] md:text-[10px] tracking-widest mt-1 uppercase hidden sm:block">underground relay board</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-4 sm:gap-8 w-full md:w-auto overflow-x-auto whitespace-nowrap no-scrollbar justify-start md:justify-start pl-1 md:pl-8 border-l-0 md:border-l border-slate-800 pb-1 md:pb-0">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative px-2 py-4 text-sm font-medium transition-colors hover:text-cyan-400
                ${activeSection === item.id ? 'text-[#ff3333]' : 'text-slate-400'}
              `}
            >
              {item.label}
              {activeSection === item.id && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff3333] shadow-[0_0_8px_#ff3333]"></div>
              )}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
