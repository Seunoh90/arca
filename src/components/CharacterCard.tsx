import React, { useState } from 'react';
import { QuoteCarousel } from './QuoteCarousel';
import { ImageModal } from './ImageModal';

interface Character {
  id: string;
  name: string;
  nameEn: string;
  faction: string;
  role: string;
  specs: string[];
  desc: string;
  likes: string[];
  dislikes: string[];
  nsfw: string;
  images: string[];
  quotes: string[];
}

export const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="bg-[#0f141e] border border-slate-800 rounded-xl overflow-hidden shadow-xl transition-all hover:border-[#334155]">
      {/* Name Header */}
      <div className="p-6 border-b border-slate-800/50 bg-gradient-to-r from-slate-900 to-[#0f141e]">
        <div className="flex justify-between items-end mb-2">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            {character.name} <span className="text-xl font-normal text-slate-500 opacity-60 ml-2">{character.nameEn}</span>
          </h3>
          <span className="text-xs px-3 py-1 rounded-full border border-slate-700 text-slate-300 tracking-widest bg-slate-900/50">
            {character.faction}
          </span>
        </div>
        <p className="text-cyan-400/80 font-medium text-sm tracking-wide">{character.role}</p>
      </div>

      <div className="p-6">
        {/* Images Grid */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {character.images.map((img, idx) => (
            <div 
              key={idx} 
              className="aspect-[3/4] overflow-hidden rounded cursor-pointer group relative border border-slate-800"
              onClick={() => setSelectedImage(img)}
            >
              <div className="absolute inset-0 bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col justify-end p-2 mix-blend-overlay"></div>
              <img 
                src={img} 
                alt={`${character.name} ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="space-y-4 text-sm text-slate-300">
          <div className="flex gap-2 items-start">
            <span className="text-[#ff3333] font-bold uppercase tracking-wider text-xs w-16 shrink-0 pt-1">Specs</span>
            <div className="flex flex-wrap gap-2">
              {character.specs.map((spec, i) => (
                <span key={i} className="px-2 py-1 bg-slate-800 text-slate-300 text-[11px] font-medium tracking-wide rounded-md border border-slate-700/50">
                  {spec}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2 items-start">
            <span className="text-[#ff3333] font-bold uppercase tracking-wider text-xs w-16 shrink-0 pt-1">Info</span>
            <p className="leading-relaxed">{character.desc}</p>
          </div>

          <div className="flex gap-2 items-start mt-2">
            <span className="text-[#ff3333] font-bold uppercase tracking-wider text-xs w-16 shrink-0 pt-1">Likes</span>
            <div className="flex flex-wrap gap-2">
              {character.likes.map((like, i) => (
                <span key={i} className="px-2 py-1.5 bg-cyan-900/20 text-cyan-400 text-[11px] font-medium tracking-wide rounded-md border border-cyan-800/40">
                  {like}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <span className="text-[#ff3333] font-bold uppercase tracking-wider text-xs w-16 shrink-0 pt-1">Dislikes</span>
            <div className="flex flex-wrap gap-2">
              {character.dislikes.map((dislike, i) => (
                <span key={i} className="px-2 py-1.5 bg-red-900/10 text-[#ff3333] text-[11px] font-medium tracking-wide rounded-md border border-red-900/30">
                  {dislike}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2 items-baseline mt-4 pt-4 border-t border-slate-800/50">
             <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs w-16 shrink-0">Style</span>
             <p className="text-slate-200">{character.nsfw}</p>
          </div>
        </div>

        {/* Quotes */}
        <QuoteCarousel quotes={character.quotes} />
      </div>

      <ImageModal 
        isOpen={!!selectedImage} 
        imageSrc={selectedImage || ''} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
};
