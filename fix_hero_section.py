from pathlib import Path
path = Path('src/App.tsx')
text = path.read_text(encoding='utf-8')
start_marker = '      {/* Hero Section - 3D Focused-Blur Carousel */}'
end_marker = '      {/* Collection Grid Section */}'
start = text.find(start_marker)
if start == -1:
    raise RuntimeError('start marker not found')
end = text.find(end_marker, start)
if end == -1:
    raise RuntimeError('end marker not found')
new_section = '''      {/* Hero Section - exact screenshot style */}
      <section className="relative w-full h-screen min-h-[900px] pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={currentHero.imageUrl || 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600'}
            alt={currentHero.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-8">
          <div className="text-[11px] uppercase tracking-[0.6em] font-black text-white/80 mb-2">{currentHero.id.toUpperCase()}</div>
          <h1 className="text-7xl lg:text-[9rem] font-serif italic tracking-[0.06em] leading-tight text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            {currentHero.name}
          </h1>
          <p className="mt-8 max-w-2xl text-sm md:text-xl text-white/80 tracking-wider">{currentHero.description}</p>
          <div className="mt-10 flex items-center gap-4">
            <button onClick={() => setSelectedProduct(currentHero)} className="px-14 py-4 bg-white text-black uppercase tracking-widest text-xs font-black hover:bg-white/80 transition">Acquire Narrative</button>
            <button onClick={nextHero} className="px-14 py-4 border border-white text-white uppercase tracking-widest text-xs font-black hover:bg-white/20 transition">Next Artifact</button>
          </div>
        </div>
      </section>

'''
text = text[:start] + new_section + text[end:]
path.write_text(text, encoding='utf-8')
print('hero section replaced')
