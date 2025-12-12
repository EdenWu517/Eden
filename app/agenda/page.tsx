export default function AgendaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-blue-950 to-gray-950 w-full relative">
      {/* 返回首頁按鈕 */}
      <div className="absolute top-6 left-6 z-20">
        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M15 19l-7-7 7-7" />
          </svg>
          返回首頁
        </a>
      </div>

      {/* 背景科技特效 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-32 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-56 h-56 bg-blue-400/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
      </div>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-16">
        <h1 className="text-white text-3xl md:text-5xl font-extrabold mb-8 drop-shadow-lg tracking-wider text-center">
          活動議程
        </h1>
        <section className="max-w-xl w-full">
          <ol className="relative border-s-2 border-cyan-600 ml-4">
            <li className="mb-12 last:mb-0 flex items-start group">
              <span className="flex items-center justify-center w-7 h-7 bg-cyan-500 rounded-full -left-4 absolute border-4 border-blue-950 shadow-lg"></span>
              <div className="ml-8">
                <time className="block text-cyan-300 text-lg font-bold mb-1 tracking-wide drop-shadow">
                  09:30
                </time>
                <div className="text-white text-xl font-semibold mb-2">
                  與會者報到
                </div>
              </div>
            </li>
            <li className="mb-12 last:mb-0 flex items-start group">
              <span className="flex items-center justify-center w-7 h-7 bg-cyan-500 rounded-full -left-4 absolute border-4 border-blue-950 shadow-lg"></span>
              <div className="ml-8">
                <time className="block text-cyan-300 text-lg font-bold mb-1 tracking-wide drop-shadow">
                  10:00
                </time>
                <div className="text-white text-xl font-semibold mb-2">
                  貴賓致詞與合照
                </div>
              </div>
            </li>
            <li className="mb-12 last:mb-0 flex items-start group">
              <span className="flex items-center justify-center w-7 h-7 bg-cyan-500 rounded-full -left-4 absolute border-4 border-blue-950 shadow-lg"></span>
              <div className="ml-8">
                <time className="block text-cyan-300 text-lg font-bold mb-1 tracking-wide drop-shadow">
                  12:00
                </time>
                <div className="text-white text-xl font-semibold mb-2">
                  午餐
                </div>
              </div>
            </li>
            <li className="flex items-start group">
              <span className="flex items-center justify-center w-7 h-7 bg-cyan-500 rounded-full -left-4 absolute border-4 border-blue-950 shadow-lg"></span>
              <div className="ml-8">
                <time className="block text-cyan-300 text-lg font-bold mb-1 tracking-wide drop-shadow">
                  13:30
                </time>
                <div className="text-white text-xl font-semibold mb-2">
                  分組論壇
                </div>
              </div>
            </li>
          </ol>
        </section>
      </main>
      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-indigo-950 to-gray-950 py-6 mt-auto text-center relative z-10">
        <div className="text-cyan-100 text-sm tracking-wider select-none">
          Copyright © 2026 次世代行動創新應用Demo Day
        </div>
      </footer>
    </div>
  );
}
