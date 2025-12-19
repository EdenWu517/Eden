'use client'
// 滑鼠移上時有互動效果的主頁選單

import Link from "next/link";
import Countdown from "../components/Countdown";
import FadeIn from "../components/FadeIn";
import SponsorMarquee from "../components/SponsorMarquee";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Speakers from "../components/Speakers";

export default function Home() {
  // 右下浮動按鈕邏輯：預設隱藏，捲動超過 600px 才顯示
  const [showFloatBtn, setShowFloatBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowFloatBtn(true);
      } else {
        setShowFloatBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // 檢查初始位置（如F5刷新時）
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col w-full relative overflow-x-hidden"
    >
      {/* === 獨立背景層修正版 === */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/02.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
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
                <span className="block break-words whitespace-normal">
                  次世代行動創新應用
                  <br className="md:hidden" />
                  <span className="block mt-2 break-words whitespace-normal md:hidden">Demo Day</span>
                </span>
                {/* 桌面版（md 以上）單獨顯示為一行 */}
                <span className="hidden md:block mt-2 break-words whitespace-normal">Demo Day</span>
              </h1>
            </div>
            {/* Countdown 元件置中，hover 效果取消，只顯示一般狀態 */}
            <div className="flex justify-center w-full my-8 max-w-full">
              <Countdown />
            </div>
            {/* 報名按鈕 - 放在計時器下方 */}
            <div className="flex justify-center w-full mt-8 max-w-full">
              <Link
                href="/signup"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-400/80 to-blue-600/80 text-white font-bold tracking-wide text-lg md:text-xl shadow-lg transition-all duration-200 hover:from-cyan-300 hover:to-blue-500 hover:-translate-y-1 hover:scale-105 active:scale-95 outline-none focus:ring-2 focus:ring-cyan-300"
              >
                我要報名
              </Link>
            </div>
          </section>
        </FadeIn>
      </main>
      {/* 下方特色卡片區塊：加上標題，卡片直向排列，寬度不變 */}
     {/* 下方特色卡片區塊：已改為橫向三欄並排 (Grid) */}
     <FadeIn>
        <section id="highlight"
        className="w-full flex flex-col items-center z-10 mt-16 px-4 pb-16 relative max-w-full">
          {/* 特色卡片標題 */}
          <h2 className="text-white text-xl md:text-3xl font-bold mb-12 tracking-wide flex items-center gap-4 justify-center text-center break-words whitespace-normal">
            <span className="inline-block h-1 w-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
            亮點特色
            <span className="inline-block h-1 w-8 bg-gradient-to-l from-teal-400 to-cyan-400 rounded-full" />
          </h2>

          {/* 新增區塊：活動介紹文字（電腦版） */}
          <div className="max-w-3xl mx-auto text-LEFT text-cyan-100/80 text-base md:text-lg leading-relaxed mb-12 hidden md:block">
            數位轉型不僅是口號，更是正在發生的進行式。
            由數位產業署指導，工業技術研究院與資訊工業策進會主辦的
            「次世代行動創新應用 Demo Day」
            將於 2026 年 1 月 16 日在大台南會展中心盛大登場。
            
            本次活動聚焦「智慧醫療」、「精準農業」與「數位韌性」三大主軸。
            我們將展示 AI 與 5G 技術如何走出實驗室，深入急診室搶救生命、飛越農田守護作物，
            並進入社區提供溫暖的心理輔療。
          </div>

          {/* 新增區塊：活動介紹文字（手機版讓伍編輯斷句） */}
          <div className="max-w-3xl mx-auto text-LEFT text-cyan-100/80 text-base leading-relaxed mb-12 block md:hidden">
            {/* 手機版請在下列每一行內自由斷句 */}
            <div>
              數位轉型不僅是口號，
              更是正在發生的進行式。
              由數位產業署指導，
              工業技術研究院與資訊工業策進會主辦的「次世代行動創新應用 Demo Day」
              將於 2026 年 1 月 16 日
              在大台南會展中心盛大登場。
            
              本次活動聚焦
              「智慧醫療」、「精準農業」與「數位韌性」三大主軸。
              我們將展示 AI 與 5G 技術
              如何走出實驗室，
              深入急診室搶救生命、
              飛越農田守護作物，
              並進入社區
              提供溫暖的心理輔療。
            </div>
          </div>
          
          {/* ★★★ 修改重點：這裡改成了 Grid 網格佈局 (電腦版三欄) ★★★ */}
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
            
            {/* 卡片 1：創新成果展示 */}
            <FadeIn>
              <div className="h-full bg-white/10 backdrop-blur-sm rounded-xl px-6 py-8 shadow-lg flex flex-col items-center gap-4 transition-all duration-200 cursor-pointer hover:-translate-y-2 hover:bg-white/15 hover:shadow-[0_0_36px_rgba(34,211,238,0.23)] active:scale-97 relative group w-full border border-white/5">
                <div className="p-4 rounded-full bg-cyan-500/10 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {/* 保留原本的火箭 Icon */}
                  <svg width={48} height={48} fill="none" viewBox="0 0 24 24" stroke="#22d3ee" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="w-full text-center">
                  <div className="text-white text-xl md:text-2xl font-bold mb-3 transition-colors duration-200 group-hover:text-cyan-200">
                    創新成果展示
                  </div>
                  <div className="text-cyan-100/80 text-base leading-relaxed text-center">
                    多元主題攤位，帶來最新的科技解決方案，體驗創新成果。
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 卡片 2：互動體驗 */}
            <FadeIn>
              <div className="h-full bg-white/10 backdrop-blur-sm rounded-xl px-6 py-8 shadow-lg flex flex-col items-center gap-4 transition-all duration-200 cursor-pointer hover:-translate-y-2 hover:bg-white/15 hover:shadow-[0_0_36px_rgba(59,130,246,0.20)] active:scale-97 relative group w-full border border-white/5">
                <div className="p-4 rounded-full bg-blue-500/10 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {/* 保留原本的手指點擊 Icon */}
                  <svg width={48} height={48} fill="none" viewBox="0 0 24 24" stroke="#60a5fa" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
                  </svg>
                </div>
                <div className="w-full text-center">
                  <div className="text-white text-xl md:text-2xl font-bold mb-3 transition-colors duration-200 group-hover:text-blue-200">
                    互動體驗
                  </div>
                  <div className="text-cyan-100/80 text-base leading-relaxed text-center">
                    現場互動操作，實際感受技術帶來的改變。
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 卡片 3：專家論壇 */}
            <FadeIn>
              <div className="h-full bg-white/10 backdrop-blur-sm rounded-xl px-6 py-8 shadow-lg flex flex-col items-center gap-4 transition-all duration-200 cursor-pointer hover:-translate-y-2 hover:bg-white/15 hover:shadow-[0_0_36px_rgba(20,184,166,0.20)] active:scale-97 relative group w-full border border-white/5">
                <div className="p-4 rounded-full bg-teal-500/10 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {/* 保留原本的麥克風 Icon */}
                  <svg width={48} height={48} fill="none" viewBox="0 0 24 24">
                    <rect x={9} y={2} width={6} height={12} rx={3} fill="#14b8a6"/>
                    <path d="M5 10v2a7 7 0 0 0 14 0v-2" stroke="#14b8a6" strokeWidth={2}/>
                    <path d="M12 20v2" stroke="#14b8a6" strokeWidth={2} strokeLinecap="round"/>
                    <path d="M8 22h8" stroke="#14b8a6" strokeWidth={2} strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="w-full text-center">
                  <div className="text-white text-xl md:text-2xl font-bold mb-3 transition-colors duration-200 group-hover:text-teal-100">
                    專家論壇
                  </div>
                  <div className="text-cyan-100/80 text-base leading-relaxed text-center">
                    邀請業界領袖現場分享，把握寶貴交流學習的機會。
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </section>
      </FadeIn>
      <FadeIn>
        <Speakers />
      </FadeIn>
      {/* 議程區塊 - 放在亮點下方、地圖上方 */}
      <FadeIn>
        <section
          id="agenda"
          className="w-full flex flex-col items-center z-10 mt-16 px-4 pb-16 relative max-w-full"
        >
          <h2 className="text-white text-xl md:text-3xl font-bold mb-10 tracking-wide flex items-center gap-4 justify-center text-center break-words whitespace-normal">
            <span className="inline-block h-1 w-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
            活動議程
            <span className="inline-block h-1 w-8 bg-gradient-to-l from-teal-400 to-cyan-400 rounded-full" />
          </h2>
          <div className="max-w-xl w-full">
            <ol className="relative border-s-2 border-cyan-600 ml-4">
              <li className="mb-12 last:mb-0 flex items-start group">
                <span className="flex items-center justify-center w-7 h-7 bg-cyan-500 rounded-full -left-4 absolute border-4 border-blue-950 shadow-lg"></span>
                <div className="ml-8">
                  <time className="block text-cyan-300 text-lg font-bold mb-1 tracking-wide drop-shadow">
                    10:00 – 10:30
                  </time>
                  <div className="text-white text-xl font-semibold mb-2">
                    報到
                  </div>
                </div>
              </li>
              <li className="mb-12 last:mb-0 flex items-start group">
                <span className="flex items-center justify-center w-7 h-7 bg-cyan-500 rounded-full -left-4 absolute border-4 border-blue-950 shadow-lg"></span>
                <div className="ml-8">
                  <time className="block text-cyan-300 text-lg font-bold mb-1 tracking-wide drop-shadow">
                    10:30 – 10:35
                  </time>
                  <div className="text-white text-xl font-semibold mb-2">
                    開幕影片
                  </div>
                </div>
              </li>
              <li className="mb-12 last:mb-0 flex items-start group">
                <span className="flex items-center justify-center w-7 h-7 bg-cyan-500 rounded-full -left-4 absolute border-4 border-blue-950 shadow-lg"></span>
                <div className="ml-8">
                  <time className="block text-cyan-300 text-lg font-bold mb-1 tracking-wide drop-shadow">
                    10:35 – 10:40
                  </time>
                  <div className="text-white text-xl font-semibold mb-2">
                    部長致詞
                  </div>
                </div>
              </li>
              <li className="mb-12 last:mb-0 flex items-start group">
                <span className="flex items-center justify-center w-7 h-7 bg-cyan-500 rounded-full -left-4 absolute border-4 border-blue-950 shadow-lg"></span>
                <div className="ml-8">
                  <time className="block text-cyan-300 text-lg font-bold mb-1 tracking-wide drop-shadow">
                    10:40 – 10:45
                  </time>
                  <div className="text-white text-xl font-semibold mb-2">
                    大合照
                  </div>
                </div>
              </li>
              <li className="mb-12 last:mb-0 flex items-start group">
                <span className="flex items-center justify-center w-7 h-7 bg-cyan-500 rounded-full -left-4 absolute border-4 border-blue-950 shadow-lg"></span>
                <div className="ml-8">
                  <time className="block text-cyan-300 text-lg font-bold mb-1 tracking-wide drop-shadow">
                    10:45 – 12:00
                  </time>
                  <div className="text-white text-xl font-semibold mb-2">
                    上半場 Pitch簡報
                  </div>
                </div>
              </li>
              <li className="mb-12 last:mb-0 flex items-start group">
                <span className="flex items-center justify-center w-7 h-7 bg-cyan-500 rounded-full -left-4 absolute border-4 border-blue-950 shadow-lg"></span>
                <div className="ml-8">
                  <time className="block text-cyan-300 text-lg font-bold mb-1 tracking-wide drop-shadow">
                    12:00 – 13:30
                  </time>
                  <div className="text-white text-xl font-semibold mb-2">
                    午餐交流&攤位展示
                  </div>
                </div>
              </li>
              <li className="mb-12 last:mb-0 flex items-start group">
                <span className="flex items-center justify-center w-7 h-7 bg-cyan-500 rounded-full -left-4 absolute border-4 border-blue-950 shadow-lg"></span>
                <div className="ml-8">
                  <time className="block text-cyan-300 text-lg font-bold mb-1 tracking-wide drop-shadow">
                    13:30 – 14:45
                  </time>
                  <div className="text-white text-xl font-semibold mb-2">
                    下半場 Pitch簡報
                  </div>
                </div>
              </li>
              <li className="flex items-start group">
                <span className="flex items-center justify-center w-7 h-7 bg-cyan-500 rounded-full -left-4 absolute border-4 border-blue-950 shadow-lg"></span>
                <div className="ml-8">
                  <time className="block text-cyan-300 text-lg font-bold mb-1 tracking-wide drop-shadow">
                    14:45 – 15:00
                  </time>
                  <div className="text-white text-xl font-semibold mb-2">
                    閉幕
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </section>
      </FadeIn>
      {/* 活動地點與交通資訊合併區塊 */}
      <FadeIn>
        <section id="map" 
        className="w-full flex flex-col items-center z-10 mt-16 px-4 pb-8 relative max-w-full">
          <h2 className="text-white text-xl md:text-3xl font-bold mb-10 tracking-wide flex items-center gap-4 justify-center text-center break-words whitespace-normal">
            <span className="inline-block h-1 w-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
            活動地點 
            <span className="inline-block h-1 w-8 bg-gradient-to-l from-teal-400 to-cyan-400 rounded-full" />
          </h2>
          <div className="w-full max-w-4xl">
            <div className="bg-blue-950/90 backdrop-blur-md rounded-xl p-4 md:p-8 shadow-lg overflow-hidden grid grid-cols-1 xl:grid-cols-2 gap-8 items-center">
              {/* 地圖區域，窄一點 */}
              <div className="w-full max-w-md mx-auto h-[280px] md:h-[400px] xl:h-[500px] rounded-lg overflow-hidden flex-shrink-0 flex-grow-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8078.039575040239!2d120.28286338610523!3d22.92301144906241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e73a7e3c1ac45%3A0xffc82d9d0d27c87a!2z5aSn6Ie65Y2X5pyD5bGV5Lit5b-DIElDQyBUQUlOQU4!5e0!3m2!1szh-TW!2stw!4v1765355448494!5m2!1szh-TW!2stw"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="大台南會展中心地圖"
                />
                <div className="mt-4 text-center">
                  <p className="text-cyan-100 text-base md:text-lg break-words whitespace-normal">
                    <span className="text-white font-semibold break-words whitespace-normal">活動地址：</span>
                    <span className="ml-2 break-words whitespace-normal">台南市歸仁區歸仁十二路3號（大台南會展中心）</span>
                  </p>
                </div>
              </div>
              {/* 交通資訊區域 */}
              <div className="w-full">
                {/* 三個交通方式垂直排列：台鐵、高鐵、停車，圖文靠左 */}
                <div className="flex flex-col gap-5">
                  {/* 台鐵 */}
                  <div className="flex flex-row items-start text-left bg-white/5 rounded-lg p-5 transition-[background] hover:bg-cyan-800/10">
                    {/* Train Icon */}
                    <div className="mb-0 mr-4 flex-shrink-0 flex items-center justify-center">
                      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* 背景圓圈 */}
                        
                        {/* 火車圖案 */}
                        <path d="M12 2C8 2 4 2.5 4 6V15.5C4 17.43 5.57 19 7.5 19L6 20.5V22H18V20.5L16.5 19C18.43 19 20 17.43 20 15.5V6C20 2.5 16 2 12 2ZM11 7H6V5H11V7ZM18 7H13V5H18V7ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM18 12H6V9H18V12Z" fill="#22D3EE"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-bold text-base md:text-lg mb-1">台鐵</div>
                      <div className="text-cyan-100/90 text-sm md:text-base">
                        搭乘台鐵至沙崙火車站，步行約5分鐘即可抵達
                      </div>
                    </div>
                  </div>
                  {/* 高鐵 */}
                  <div className="flex flex-row items-start text-left bg-white/5 rounded-lg p-5 transition-[background] hover:bg-cyan-800/10">
                    {/* HSR Icon */}
                    <div className="mb-0 mr-4 flex-shrink-0 flex items-center justify-center">
                    <svg width="42" height="42" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    
  <path d="M 25 75 L 15 95 L 28 95 L 35 78 Z" fill="#22D3EE" />
  <path d="M 75 75 L 85 95 L 72 95 L 65 78 Z" fill="#22D3EE" />

  <path d="M 32 15 
           Q 50 5 68 15 
           C 85 25 90 50 75 70 
           Q 50 85 25 70 
           C 10 50 15 25 32 15 Z" 
        fill="#22D3EE" />

  <rect x="35" y="20" width="30" height="15" rx="5" fill="22D3EE" />

  <rect x="32" y="42" width="12" height="5" rx="2" fill="22D3EE" />
  <rect x="56" y="42" width="12" height="5" rx="2" fill="22D3EE" />

  <path d="M 28 65 Q 50 58 72 65" stroke="black" strokeWidth="3" fill="none" />

</svg>
                    </div>
                    <div>
                      <div className="text-white font-bold text-base md:text-lg mb-1">高鐵</div>
                      <div className="text-cyan-100/90 text-sm md:text-base">
                        搭乘高鐵至台南高鐵站，步行約5分鐘即可抵達
                      </div>
                    </div>
                  </div>
                  {/* 停車 */}
                  <div className="flex flex-row items-start text-left bg-white/5 rounded-lg p-5 transition-[background] hover:bg-cyan-800/10">
                    {/* Parking Icon */}
                    <div className="mb-0 mr-4 flex-shrink-0 flex items-center justify-center">
                    <svg width="42" height="42" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="45" stroke="NONE" strokeWidth="6" fill="none" />
  
  <text x="50" y="54" 
        fontFamily="Arial, sans-serif" 
        fontSize="80"  textAnchor="middle" 
        dominantBaseline="central" 
        fill="#22D3EE">P</text>
</svg>
                    </div>
                    <div>
                      <div className="text-white font-bold text-base md:text-lg mb-1">停車</div>
                      <div className="text-cyan-100/90 text-sm md:text-base">
                        大台南會展中心備有停車場，來賓可選擇自行開車前往，由歸仁大道/高鐵橋下台南段道路/台39線，右轉進入歸仁十八路。汽車與紅黃牌重機原價40元/小時。
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
      {/* 贊助商部分由SponsorMarquee執行 */}
      <SponsorMarquee />
      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-indigo-950 to-gray-950 py-6 mt-auto text-center relative z-10 max-w-full px-4">
        <div className="text-cyan-100 text-sm tracking-wider select-none break-words whitespace-normal">
          Copyright © 次世代行動創新應用Demo Day
        </div>
        {/* 聯繫方式 */}
        <div className="text-cyan-200 text-xs mt-2 tracking-wide">
          任何疑問請來信洽詢活動小組：<a href="mailto:eden@impr.com.tw" className="underline hover:text-cyan-300 transition">eden@impr.com.tw</a>
        </div>
      </footer>
      {/* 右下角浮動報名按鈕 (滾動超過600px時出現，AnimatePresence動畫) */}
      <AnimatePresence>
        {showFloatBtn && (
          <motion.div
            key="float-signup-btn"
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            whileHover={{
              scale: 1.1,
            }}
          >
            <motion.div
              className="rounded-full shadow-lg animate-gradient-xy"
              style={{
                background:
                  "linear-gradient(135deg, #475569 0%, #6366f1 45%, #a855f7 90%, #334155 100%)",
                backgroundSize: "200% 200%",
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
        )}
      </AnimatePresence>
      {/* Parallax Effect Script (removed) */}
      {/* no script here, background will not move with scroll */}
    </div>
  );
}
