"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  // 控制手機版選單開關的狀態
  const [isOpen, setIsOpen] = useState(false);

  // 使 agenda 區塊的上方間距與 Speakers 區塊一致
  // 參考 Speakers (padding/margin top: py-8 on container)
  // 於 scroll offset 處理
  const AGENDA_OFFSET = 32; // = py-8 (32px) in Speakers

  // 滑動到指定 id 的元素
  const smoothScrollTo = (id: string) => {
    setIsOpen(false);
    // id 不能包含 #
    const el = document.getElementById(id.replace(/^#/, ""));
    if (el) {
      // 1. speakers 區塊：py-8(container) + 16px nav = 32 + 64=96px
      // 2. nav 高度 h-16 (mobile 64px) / md:h-20 (desktop 80px)
      // 確保 agenda 距離頂部與 speakers 一致
      
      // 取 nav 高度再 + py-8
      const nav = document.querySelector('nav');
      let navHeight = 0;
      if (nav instanceof HTMLElement) {
        navHeight = nav.offsetHeight;
      } else {
        navHeight = window.innerWidth >= 768 ? 80 : 64; // Fallback
      }
      // py-8 = 32px
      const agendaOffset = navHeight + AGENDA_OFFSET;

      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const top = rect.top + scrollTop - agendaOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // 電腦選單的選項
  return (
    // nav 外框：固定在頂部，背景半透明灰色模糊
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* 1. 左側 Logo 區塊 (移除左上角字體，留空佔位) */}
          <div className="flex-shrink-0 flex items-center">
            {/* 已移除左上角字體 */}
          </div>

          {/* 2. 電腦版選單 (手機版隱藏 hidden md:block) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-semibold transition-colors"
                onClick={e => {
                  // 觸發smooth scroll到最頂（首頁）
                  e.preventDefault();
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                首頁
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
              <Link 
                href="/signup" 
                className="bg-white text-black hover:bg-cyan-100 px-6 py-3 rounded-full text-lg font-extrabold transition-all hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              >
                我要報名
              </Link>
            </div>
          </div>

          {/* 3. 手機版漢堡按鈕 (電腦版隱藏 md:hidden) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {/* 根據 isOpen 狀態切換圖示 (三條線 vs 叉叉) */}
              {!isOpen ? (
                // 三條線圖示 (Menu)
                <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                // 叉叉圖示 (X)
                <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4. 手機版下拉選單 (只在 isOpen 為 true 時顯示) */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-xl border-b border-white/10 animate-in slide-in-from-top-5 fade-in duration-200">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-center gap-4">
            {/* 首頁：smooth scroll 回頂部 */}
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
            {/* 活動議程：smooth scroll */}
            <a
              href="#agenda"
              onClick={e => {
                e.preventDefault();
                setIsOpen(false);
                // scroll to agenda with offset equal to navbar height (72px)
                const yOffset = -72; // 4.5rem = 72px (navbar h-18，預設兩行)
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
            {/* 特邀講師：smooth scroll */}
            <a
              href="#Speakers"
              onClick={e => {
                e.preventDefault();
                setIsOpen(false);
                // scroll to Speakers with offset equal to navbar height (72px)
                const yOffset = -72; // 與電腦版導覽列一致
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
            {/* 我要報名（前往註冊頁，不做 scroll）*/}
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