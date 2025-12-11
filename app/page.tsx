'use client'
// 滑鼠移上時有互動效果的主頁選單

import Link from "next/link";
import Countdown from "../components/Countdown";
import FadeIn from "../components/FadeIn";
import SponsorMarquee from "../components/SponsorMarquee";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

function HoverScaleCountdown() {
  // 用 pointer enter/leave 控制 hover 狀態
  const [hovering, setHovering] = useState(false);
  return (
    <div
      className={`transition-all duration-200 ${
        hovering
          ? "scale-105 -translate-y-1 shadow-[0_0_32px_rgba(34,211,238,0.45)]"
          : ""
      }`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        borderRadius: "1rem",
      }}
    >
      <Countdown />
    </div>
  );
}

import { useCallback } from "react";

export default function Home() {
  // 首頁平滑滾動至頂端
  const handleHomeClick = useCallback((e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col w-full relative overflow-x-hidden bg-scroll md:bg-fixed"
      style={{
        backgroundImage: "url('/02.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 滑鼠移上時有互動效果的主頁選單 */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-end p-5 backdrop-blur-md bg-gradient-to-r from-black/70 via-blue-950/50 to-transparent">
        <nav className="flex gap-5 md:gap-8 pr-2">
          <Link
            href="/"
            className="px-5 py-2 rounded-lg bg-black/30 text-cyan-200 font-semibold tracking-wide text-base md:text-lg shadow transition 
              hover:bg-cyan-600/30 hover:text-white hover:-translate-y-1 hover:scale-105
              active:scale-95 outline-none focus:ring-2 focus:ring-cyan-500"
            onClick={handleHomeClick}
          >
            首頁
          </Link>
          <Link
            href="/agenda"
            className="px-5 py-2 rounded-lg bg-black/30 text-cyan-200 font-semibold tracking-wide text-base md:text-lg shadow transition-all duration-300 
              hover:bg-cyan-600/30 hover:text-white hover:-translate-y-1 hover:scale-105
              active:scale-95 outline-none focus:ring-2 focus:ring-cyan-500"
          >
            議程
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400/80 to-blue-600/80 text-white font-bold tracking-wide text-base md:text-lg shadow-lg transition 
              hover:from-cyan-300 hover:to-blue-500 hover:-translate-y-1 hover:scale-105
              active:scale-95 outline-none focus:ring-2 focus:ring-cyan-300"
          >
            我要報名
          </Link>
        </nav>
      </div>

      {/* 背景層移除，直接用根div的 fixed background */}
      {/* <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/02.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "translateZ(0)",
        }}
        id="bg-parallax"
      /> */}
      {/* 半透明遮罩(靜態)：讓淡黑漸層漸暗效果拉到底部 */}
      <div className="absolute left-0 right-0 top-0 bottom-0 h-full w-full bg-gradient-to-b from-black/50 via-black/60 to-black/90 z-0 pointer-events-none" style={{ minHeight: '100vh' }} />
      {/* 額外亮點漸層 */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_60%_30%,rgba(34,211,238,0.10),transparent_48%)]" />
      {/* 主體內容 */}
      <main className="flex flex-1 items-center justify-center relative z-10 px-4">
        <FadeIn>
          <section className="z-10 flex flex-col items-center text-center justify-center min-h-[520px] md:min-h-[680px] w-full max-w-full">
            {/* 只在 h1 上加入 group，確保 hover 效果只在 h1 hover 時觸發 */}
            <div className="w-full group">
              <h1
                className="relative text-3xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-teal-300 to-blue-500 drop-shadow-[0_0_18px_rgba(34,211,238,0.55)] tracking-[0.10em] leading-tight transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1 font-[var(--font-orbitron)] animate-[fadeDown_1.2s_ease_forwards] break-words whitespace-normal"
                style={{ animationDelay: "0s" }}
              >
                <span className="absolute inset-x-0 -bottom-3 mx-auto h-0.5 w-20 bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" aria-hidden />
                <span className="block break-words whitespace-normal">次世代行動創新應用</span>
                <span className="block mt-2 break-words whitespace-normal">Demo Day</span>
              </h1>
            </div>
            {/* Countdown 元件置中，hover 效果取消，只顯示一般狀態 */}
            <div className="flex justify-center w-full my-8 max-w-full">
              <Countdown />
            </div>
          </section>
        </FadeIn>
      </main>
      {/* 下方特色卡片區塊：加上標題，卡片直向排列，寬度不變 */}
      <FadeIn>
        <section className="w-full flex flex-col items-center z-10 mt-16 px-4 pb-16 relative max-w-full">
          {/* 特色卡片標題 */}
          <h2 className="text-white text-xl md:text-3xl font-bold mb-10 tracking-wide flex items-center gap-4 justify-center text-center break-words whitespace-normal">
            <span className="inline-block h-1 w-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
            亮點特色
            <span className="inline-block h-1 w-8 bg-gradient-to-l from-teal-400 to-cyan-400 rounded-full" />
          </h2>
          {/* 卡片直向排列，統一寬度 */}
          <div className="max-w-full w-full flex flex-col gap-10 mx-auto">
            <FadeIn>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-6 md:py-8 shadow-lg flex flex-col items-center gap-4 transition-all duration-200 cursor-pointer hover:-translate-y-2 hover:scale-105 hover:shadow-[0_0_36px_rgba(34,211,238,0.23)] active:scale-97 relative group w-full max-w-full">
                <div className="w-full text-center">
                  <div className="text-white text-lg md:text-xl font-bold mb-1 transition-colors duration-200 group-hover:text-cyan-200 flex flex-col items-center gap-2 text-center break-words whitespace-normal">
                    <span className="inline-block">
                      {/* 創新 icon: 火箭 */}
                      <svg width={32} height={32} fill="none" viewBox="0 0 24 24"><path d="M3 21l6-6M4 17.5l7 2.5 7-7c1-1 1-2.5 0-3.5l-3-3C14.5 5 13 5 12 6l-7 7 2.5 7z" stroke="#22d3ee" strokeWidth={2} strokeLinecap="round" /><circle cx={15} cy={9} r={1.5} fill="#22d3ee"/></svg>
                    </span>
                    <span className="break-words whitespace-normal">創新成果展示</span>
                  </div>
                  <div className="text-cyan-100 text-base text-center break-words whitespace-normal">多元主題攤位，帶來最新的科技解決方案，體驗創新成果。</div>
                </div>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-6 md:py-8 shadow-lg flex flex-col items-center gap-4 transition-all duration-200 cursor-pointer hover:-translate-y-2 hover:scale-105 hover:shadow-[0_0_36px_rgba(59,130,246,0.20)] active:scale-97 relative group w-full max-w-full">
                <div className="w-full text-center">
                  <div className="text-white text-lg md:text-xl font-bold mb-1 transition-colors duration-200 group-hover:text-blue-200 flex flex-col items-center gap-2 text-center break-words whitespace-normal">
                    <span className="inline-block">
                      {/* 互動 icon: 手指點擊 */}
                      <svg width={32} height={32} fill="none" viewBox="0 0 24 24"><path d="M12 11v7a2 2 0 1 0 4 0v-3h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-5" stroke="#60a5fa" strokeWidth={2} strokeLinecap="round"/><circle cx={12} cy={8} r={2} fill="#60a5fa"/></svg>
                    </span>
                    <span className="break-words whitespace-normal">互動體驗</span>
                  </div>
                  <div className="text-cyan-100 text-base text-center break-words whitespace-normal">現場動手操作、互動遊戲，實際感受技術帶來的改變。</div>
                </div>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-6 md:py-8 shadow-lg flex flex-col items-center gap-4 transition-all duration-200 cursor-pointer hover:-translate-y-2 hover:scale-105 hover:shadow-[0_0_36px_rgba(20,184,166,0.20)] active:scale-97 relative group w-full max-w-full">
                <div className="w-full text-center">
                  <div className="text-white text-lg md:text-xl font-bold mb-1 transition-colors duration-200 group-hover:text-teal-100 flex flex-col items-center gap-2 text-center break-words whitespace-normal">
                    <span className="inline-block">
                      {/* 專家論壇 icon: 麥克風 */}
                      <svg width={32} height={32} fill="none" viewBox="0 0 24 24"><rect x={9} y={2} width={6} height={12} rx={3} fill="#14b8a6"/><path d="M5 10v2a7 7 0 0 0 14 0v-2" stroke="#14b8a6" strokeWidth={2}/><path d="M12 20v2" stroke="#14b8a6" strokeWidth={2} strokeLinecap="round"/><path d="M8 22h8" stroke="#14b8a6" strokeWidth={2} strokeLinecap="round"/></svg>
                    </span>
                    <span className="break-words whitespace-normal">專家論壇</span>
                  </div>
                  <div className="text-cyan-100 text-base text-center break-words whitespace-normal">邀請業界領袖現場分享，把握寶貴交流學習的機會。</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </FadeIn>
      {/* 活動地點地圖區塊 */}
      <FadeIn>
        <section className="w-full flex flex-col items-center z-10 mt-16 px-4 pb-16 relative max-w-full">
          <h2 className="text-white text-xl md:text-3xl font-bold mb-10 tracking-wide flex items-center gap-4 justify-center text-center break-words whitespace-normal">
            <span className="inline-block h-1 w-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
            活動地點
            <span className="inline-block h-1 w-8 bg-gradient-to-l from-teal-400 to-cyan-400 rounded-full" />
          </h2>
          <div className="max-w-full w-full">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg overflow-hidden max-w-full w-full">
              <div className="w-full h-[300px] md:h-[500px] rounded-lg overflow-hidden max-w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8078.039575040239!2d120.28286338610523!3d22.92301144906241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e73a7e3c1ac45%3A0xffc82d9d0d27c87a!2z5aSn6Ie65Y2X5pyD5bGV5Lit5b-DIElDQyBUQUlOQU4!5e0!3m2!1szh-TW!2stw!4v1765355448494!5m2!1szh-TW!2stw"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-cyan-100 text-base md:text-lg break-words whitespace-normal">
                  <span className="text-white font-semibold break-words whitespace-normal">活動地址：</span>
                  <span className="ml-2 break-words whitespace-normal">台南市歸仁區歸仁十二路3號（大台南會展中心）</span>
                </p>
                <p className="text-cyan-200 text-sm md:text-base mt-2 break-words whitespace-normal"></p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
      {/* 贊助商無限滾動（放在最底部） */}
      <FadeIn>
        <div className="w-full px-4 mt-4 mb-12 max-w-full">
          <SponsorMarquee />
        </div>
      </FadeIn>
      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-indigo-950 to-gray-950 py-6 mt-auto text-center relative z-10 max-w-full px-4">
        <div className="text-cyan-100 text-sm tracking-wider select-none break-words whitespace-normal">
          Copyright © 次世代行動創新應用Demo Day
        </div>
      </footer>
      {/* 右下角浮動報名按鈕 */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{
          scale: 1.1,
        }}
      >
        <motion.div
          className="rounded-full shadow-lg animate-gradient-xy"
          style={{
            background:
              "linear-gradient(135deg, #475569 0%, #6366f1 45%, #a855f7 90%, #334155 100%)", // slate-600, indigo-500, purple-500, slate-700
            backgroundSize: "200% 200%",
            // backdropBlur optional if you want the mystic touch, otherwise can remove:
            backdropFilter: "blur(8px)"
          }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(34, 211, 238, 0.7)",
              "0 0 0 30px rgba(34, 211, 238, 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <Link
            href="/signup"
            className="block rounded-full font-bold text-white text-base md:text-lg px-6 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-300 flex items-center justify-center min-w-[120px] relative z-10"
          >
            立即報名
          </Link>
        </motion.div>
      </motion.div>
      {/* Parallax Effect Script (removed) */}
      {/* no script here, background will not move with scroll */}
    </div>
  );
}
