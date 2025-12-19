"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  // signup頁面時不要出現 Navbar
  if (pathname === "/signup") return null;

  // 控制手機版選單開關的狀態
  const [isOpen, setIsOpen] = useState(false);

  // 使 agenda 區塊的上方間距與 Speakers 區塊一致
  const AGENDA_OFFSET = 32; // = py-8 (32px) in Speakers

  // 滑動到指定 id 的元素
  const smoothScrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id.replace(/^#/, ""));
    if (el) {
      const nav = document.querySelector('nav');
      let navHeight = 0;
      if (nav instanceof HTMLElement) {
        navHeight = nav.offsetHeight;
      } else {
        navHeight = window.innerWidth >= 768 ? 80 : 64;
      }
      const agendaOffset = navHeight + AGENDA_OFFSET;
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const top = rect.top + scrollTop - agendaOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0 flex items-center">
            {/* 已移除左上角字體 */}
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-semibold transition-colors"
                onClick={e => {
                  e.preventDefault();
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                首頁
              </a>
              {/* 新增亮點特色按鈕，邏輯與其他案件一致 */}
              <a
                href="#highlight"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-semibold transition-colors"
                onClick={e => {
                  e.preventDefault();
                  smoothScrollTo("highlight");
                }}
              >
                亮點特色
              </a>
              {/* 將“特邀講師”按鍵排在“活動議程”前面 */}
              <a
                href="#Speakers"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-semibold transition-colors"
                onClick={e => {
                  e.preventDefault();
                  smoothScrollTo("Speakers");
                }}
              >
                特邀講師
              </a>
              <a
                href="#agenda"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-semibold transition-colors"
                onClick={e => {
                  e.preventDefault();
                  smoothScrollTo("agenda");
                }}
              >
                活動議程
              </a>
              {/* 新增活動地點按鈕，邏輯與其他按鍵一致 */}
              <a
                href="#map"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-semibold transition-colors"
                onClick={e => {
                  e.preventDefault();
                  smoothScrollTo("map");
                }}
              >
                活動地點
              </a>
              <Link 
                href="/signup" 
                className="bg-white text-black hover:bg-cyan-100 px-6 py-3 rounded-full text-lg font-extrabold transition-all hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              >
                我要報名
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-xl border-b border-white/10 animate-in slide-in-from-top-5 fade-in duration-200">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-center gap-4">
            <a
              href="/"
              onClick={e => {
                e.preventDefault();
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-center hover:bg-white/5"
            >
              首頁
            </a>
            {/* 新增亮點特色按鈕，邏輯與其他案件一致 */}
            <a
              href="#highlight"
              onClick={e => {
                e.preventDefault();
                setIsOpen(false);
                const yOffset = -72;
                const element = document.getElementById("highlight");
                if (element) {
                  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-center hover:bg-white/5"
            >
              亮點特色
            </a>
            {/* 將“特邀講師”排在“活動議程”前 */}
            <a
              href="#Speakers"
              onClick={e => {
                e.preventDefault();
                setIsOpen(false);
                const yOffset = -72;
                const element = document.getElementById("Speakers");
                if (element) {
                  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-center hover:bg-white/5"
            >
              特邀講師
            </a>
            <a
              href="#agenda"
              onClick={e => {
                e.preventDefault();
                setIsOpen(false);
                const yOffset = -72;
                const element = document.getElementById("agenda");
                if (element) {
                  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-center hover:bg-white/5"
            >
              活動議程
            </a>
            {/* 新增活動地點按鈕，邏輯與其他按鍵一致 */}
            <a
              href="#map"
              onClick={e => {
                e.preventDefault();
                setIsOpen(false);
                const yOffset = -72;
                const element = document.getElementById("map");
                if (element) {
                  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-center hover:bg-white/5"
            >
              活動地點
            </a>
            <Link 
              href="/signup" 
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white block px-8 py-3 rounded-full text-base font-bold w-fit shadow-lg"
            >
              我要報名
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}