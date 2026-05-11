import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CharacterCard } from './components/CharacterCard';
import { LocationModal } from './components/LocationModal';
import { WORLDVIEW, LOCATIONS, CHARACTERS } from './data';

export default function App() {
  const [activeSection, setActiveSection] = useState('worldview');
  const [selectedLocation, setSelectedLocation] = useState<{name: string, image: string, desc: string} | null>(null);
  const [isGlitching, setIsGlitching] = useState(false);

  const triggerGlitch = () => {
    if (isGlitching) return;
    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
    }, 600);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['worldview', 'infra', 'locations', 'characters'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e14] text-slate-300 font-sans selection:bg-cyan-500/30 text-sm">
      <Header activeSection={activeSection} />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-32">
        {/* Banner Section */}
        <section className="flex flex-col items-center justify-center py-16 px-6 relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/30">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.05)_0%,transparent_70%)]"></div>
           <div className="text-center relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-white mb-4">{WORLDVIEW.title}</h1>
              <p className="text-cyan-400 font-medium tracking-widest text-lg">{WORLDVIEW.subtitle}</p>
           </div>
        </section>

        {/* SECTION 1: WORLDVIEW */}
        <section id="worldview" className="space-y-12 scroll-mt-32">
          <SectionTitle title="SYSTEM.WORLDVIEW" subtitle="세계관" />
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white border-l-4 border-[#ff3333] pl-4">{WORLDVIEW.sections[0].title}</h3>
              <p className="text-slate-300 leading-relaxed text-base">{WORLDVIEW.sections[0].content}</p>
              <ul className="space-y-3">
                {WORLDVIEW.sections[0].bullets?.map((b, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-cyan-400 mt-1">▰</span>
                    <span className="leading-relaxed"><strong className="text-white">{b.split(':')[0]}:</strong>{b.split(':')[1]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900/50 p-6 flex items-center">
               <div className="space-y-4 w-full">
                  <div className="text-xs text-slate-500 font-mono mb-2">[ ARCA CLIMATE SHELL DATA ]</div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-cyan-400/50 w-[98%]"></div>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-[#ff3333]/50 w-[12%]"></div>
                  </div>
                  <p 
                    onClick={triggerGlitch}
                    className="text-slate-400 text-sm italic mt-4 text-center cursor-pointer hover:text-[#ff3333] transition-colors"
                  >
                    "완벽한 기후막 아래 누수는 없다"
                  </p>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: INFRASTRUCTURE */}
        <section id="infra" className="space-y-16 scroll-mt-32">
          <SectionTitle title="SYSTEM.INFRASTRUCTURE" subtitle="아르카" />

          {/* Sectors Table */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white border-l-4 border-cyan-400 pl-4">{WORLDVIEW.sections[1].title}</h3>
            <p className="text-slate-300 leading-relaxed text-base">{WORLDVIEW.sections[1].content}</p>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-900/80 text-cyan-400 font-mono">
                  <tr>
                    <th className="p-4 border-b border-slate-800">섹터</th>
                    <th className="p-4 border-b border-slate-800">기후</th>
                    <th className="p-4 border-b border-slate-800">기능 및 인프라</th>
                    <th className="p-4 border-b border-slate-800">계급 (코드)</th>
                    <th className="p-4 border-b border-slate-800">의도 (명칭)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 bg-[#0f141e]/50">
                  {WORLDVIEW.sections[1].table?.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 font-bold text-white text-lg">{row.sector}</td>
                      <td className="p-4 text-slate-300">{row.climate}</td>
                      <td className="p-4 text-slate-400 whitespace-normal">{row.infrastructure}</td>
                      <td className="p-4"><span className="px-2 py-1 rounded bg-slate-800 text-slate-200 text-xs tracking-wider">{row.class}</span></td>
                      <td className="p-4 text-slate-500 italic">{row.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
             <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white border-l-4 border-cyan-400 pl-4">{WORLDVIEW.sections[2].title}</h3>
                <ul className="space-y-4">
                  {WORLDVIEW.sections[2].bullets?.map((b, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="text-cyan-400 mt-1">◈</span>
                      <span className="leading-relaxed"><strong className="text-white">{b.split(':')[0]}:</strong>{b.split(':')[1]}</span>
                    </li>
                  ))}
                </ul>
             </div>
             <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white border-l-4 border-[#ff3333] pl-4">{WORLDVIEW.sections[3].title}</h3>
                <ul className="space-y-4">
                  {WORLDVIEW.sections[3].bullets?.map((b, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="text-[#ff3333] mt-1">◈</span>
                      <span className="leading-relaxed text-slate-300"><strong className="text-white">{b.split(':')[0]}:</strong>{b.split(':')[1]}</span>
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </section>

        {/* SECTION 3: LOCATIONS */}
        <section id="locations" className="space-y-12 scroll-mt-32">
          <SectionTitle title="DATABASE.LOCATIONS" subtitle="구역 안내" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOCATIONS.map((loc, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedLocation(loc)}
                className="group relative overflow-hidden rounded-lg border border-slate-700/50 bg-[#0f141e] hover:border-cyan-500/50 transition-colors h-24 cursor-pointer shadow-lg"
              >
                <img src={loc.image} alt={loc.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 group-hover:opacity-40 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14]/90 to-transparent"></div>
                <div className="absolute inset-0 p-4 flex items-end">
                  <h4 className="text-lg font-bold text-white tracking-widest">{loc.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: CHARACTERS */}
        <section id="characters" className="space-y-12 scroll-mt-32">
          <SectionTitle title="DATABASE.CHARACTERS" subtitle="인물 파일" />
          
          <div className="grid lg:grid-cols-2 gap-8">
            {CHARACTERS.map((char) => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </div>
        </section>

      </main>

      {isGlitching && (
        <div className="fixed inset-0 z-[100] pointer-events-none glitch-screen flex items-center justify-center bg-red-900/40 overflow-hidden mix-blend-hard-light backdrop-invert">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none"></div>
           <h1 className="relative text-[8rem] md:text-[15rem] font-black text-white glitch-text tracking-tighter mix-blend-difference">
              거짓말
           </h1>
        </div>
      )}
      
      <LocationModal 
        isOpen={!!selectedLocation} 
        location={selectedLocation} 
        onClose={() => setSelectedLocation(null)} 
      />

      <footer className="border-t border-slate-800/50 py-8 text-center text-slate-600 font-mono text-xs">
         <p>Leaknet Terminal v2.0 - Encrypted Connection</p>
         <p className="mt-2 text-slate-700">© 2260 ARCA Underground. ACC Monitor Bypassed.</p>
      </footer>
    </div>
  );
}

const SectionTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="flex flex-col items-center mb-12 relative">
    <div className="absolute w-full h-px bg-slate-800 top-1/2 -z-10"></div>
    <div className="bg-[#0a0e14] px-8 text-center flex flex-col items-center">
       <span className="text-slate-500 font-mono tracking-[0.2em] text-xs mb-2">{title}</span>
       <h2 className="text-3xl font-bold text-white tracking-widest">{subtitle}</h2>
    </div>
  </div>
);

