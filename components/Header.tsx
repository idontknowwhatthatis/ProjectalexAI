export default function Header() {
  return (
    <header className="border-b border-white/10">
      <div className="container-max flex items-center gap-3 py-4">
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3l7.5 4.33v9.34L12 21 4.5 16.67V7.33L12 3z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 7l4.5 2.6v5.2L12 17l-4.5-2.2V9.6L12 7z" fill="currentColor"/>
        </svg>
        <div>
          <div className="text-lg font-semibold">ProjectAlex <span className="text-brand-400">AI</span></div>
          <div className="text-xs text-slate-400">Gemini 2.5 Flash • Vercel-ready</div>
        </div>
      </div>
    </header>
  );
}
