"use client";
export const SpeakersAnchorId = "Speakers";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
// 確保已安裝 lucide-react，或自行替換圖標
import { ChevronLeft, ChevronRight } from "lucide-react"; 

// --- 資料結構定義 ---
interface Speaker {
  id: number;
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
}

const speakersData: Speaker[] = [
  {
    id: 1,
    name: "張00",
    title: "AI 技術總監",
    company: "FutureTech",
    bio: "專精於生成式 AI 與大型語言模型應用，曾主導多項跨國企業的 AI 轉型計畫，致力於將前沿技術轉化為實際商業價值。",
    image: "/空白大頭貼.jpeg",
  },
  {
    id: 2,
    name: "李00",
    title: "首席營運官",
    company: "NextGen Mobility",
    bio: "擁有 15 年電動車產業經驗，專注於智慧交通生態系的建構與營運優化，推動綠色能源與移動服務的整合。",
    image: "/空白大頭貼.jpeg",
  },
  {
    id: 3,
    name: "王00",
    title: "資深架構師",
    company: "CloudCore",
    bio: "雲端原生架構的先驅者，擅長 Kubernetes 與微服務架構設計，協助企業打造高可用性與彈性的數位基礎設施。",
    image: "/空白大頭貼.jpeg",
  },
  {
    id: 4,
    name: "陳00",
    title: "產品副總裁",
    company: "SmartLife IoT",
    bio: "物聯網產品設計專家，主導開發的智慧家居系統榮獲多項國際設計大獎，深信科技應為人性化生活服務。",
    image: "/空白大頭貼.jpeg",
  },
  {
    id: 5,
    name: "林00",
    title: "區塊鏈研發負責人",
    company: "BlockChain X",
    bio: "致力於 Web3 技術的落地應用，專研去中心化金融 (DeFi) 與數位身分認證技術，推動價值互聯網的實現。",
    image: "/空白大頭貼.jpeg",
  },
  {
    id: 6,
    name: "吳00",
    title: "使用者體驗總監",
    company: "DesignOps",
    bio: "結合心理學與設計思維，專注於打造沉浸式的人機互動體驗，認為優秀的介面設計是連結使用者與科技的橋樑。",
    image: "/空白大頭貼.jpeg",
  },
  {
    id: 7,
    name: "劉00",
    title: "資安顧問",
    company: "SecureNet",
    bio: "擁有豐富的資安攻防實戰經驗，協助政府與金融機構建構主動防禦體系，守護數位資產安全。",
    image: "/空白大頭貼.jpeg",
  },
  {
    id: 8,
    name: "楊00",
    title: "數據科學家",
    company: "DataInsight",
    bio: "擅長大數據分析與機器學習演算法，從海量數據中挖掘商業洞察，協助企業進行精準決策。",
    image: "/空白大頭貼.jpeg",
  },
];

export default function Speakers() {
  const [activeId, setActiveId] = useState<number>(1);
  const activeSpeaker = speakersData.find((s) => s.id === activeId) || speakersData[0];

  // 手機版分頁邏輯
  const mobileStartIndex = Math.floor((activeId - 1) / 4) * 4;
  const mobileVisibleSpeakers = speakersData.slice(mobileStartIndex, mobileStartIndex + 4);

  const handleNext = () => {
    setActiveId((prev) => (prev === speakersData.length ? 1 : prev + 1));
  };

  const handlePrev = () => {
    setActiveId((prev) => (prev === 1 ? speakersData.length : prev - 1));
  };

  return (
    <div 
      id="Speakers"
    className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6 relative z-10">
      
      {/* --- 標題區塊 (已修正：使用您提供的漸層樣式) --- */}
      <div className="text-center mb-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-wide flex items-center justify-center gap-4">
          {/* 左邊：漸層從 亮青 到 藍 */}
          <span className="inline-block h-1 w-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
          特邀講師
          {/* 右邊：漸層從 藍綠 到 亮青 */}
          <span className="inline-block h-1 w-8 bg-gradient-to-l from-teal-400 to-cyan-400 rounded-full" />
        </h2>
        <p className="text-cyan-100/70 text-sm">
          匯聚產業菁英，分享前瞻觀點
        </p>
      </div>

      {/* =========================================
          手機版佈局 (md:hidden) - 維持原本設計
         ========================================= */}
      <div className="flex flex-col gap-4 md:hidden">
        {/* 詳細資訊卡 */}
        <div className="sticky top-16 z-20">
          <DetailCard speaker={activeSpeaker} isMobile={true} />
        </div>

        {/* 導覽列 */}
        <div className="flex items-center justify-between gap-1">
          <button
            onClick={handlePrev}
            className="p-1 rounded-full bg-white/10 hover:bg-cyan-500/20 text-white transition-colors flex-shrink-0"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="grid grid-cols-4 gap-2 flex-1">
            {mobileVisibleSpeakers.map((speaker) => (
              <SpeakerCard
                key={speaker.id}
                speaker={speaker}
                isActive={activeId === speaker.id}
                onClick={() => setActiveId(speaker.id)}
                isCompact={true}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-1 rounded-full bg-white/10 hover:bg-cyan-500/20 text-white transition-colors flex-shrink-0"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* =========================================
          電腦版佈局 (hidden md:flex) - 縮小一點 
         ========================================= */}
      <div className="hidden md:flex flex-col gap-3 w-full scale-90 lg:scale-95" style={{ maxWidth: "950px", margin: "0 auto" }}>
        {/* 上排：使用 Grid 系統，強制 4 等分，並填滿寬度 */}
        <div className="grid grid-cols-4 gap-2 w-full">
          {speakersData.slice(0, 4).map((speaker) => (
            <SpeakerCard
              key={speaker.id}
              speaker={speaker}
              isActive={activeId === speaker.id}
              onClick={() => setActiveId(speaker.id)}
              isDesktopSmall={true}
            />
          ))}
        </div>

        {/* 中間：詳細資訊卡，填滿寬度 (w-full) */}
        <div className="w-full">
          <DetailCard speaker={activeSpeaker} />
        </div>

        {/* 下排：使用 Grid 系統，與上排對稱 */}
        <div className="grid grid-cols-4 gap-2 w-full">
          {speakersData.slice(4, 8).map((speaker) => (
            <SpeakerCard
              key={speaker.id}
              speaker={speaker}
              isActive={activeId === speaker.id}
              onClick={() => setActiveId(speaker.id)}
              isDesktopSmall={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- 子組件：講師小卡 ---
function SpeakerCard({
  speaker,
  isActive,
  onClick,
  isCompact = false,
  isDesktopSmall = false,
}: {
  speaker: Speaker;
  isActive: boolean;
  onClick: () => void;
  isCompact?: boolean;
  isDesktopSmall?: boolean;
}) {
  return (
    
    <div
      onClick={onClick}
      className={`relative group cursor-pointer w-full transition-all duration-300 rounded-lg overflow-hidden border ${
        isActive
          ? "border-cyan-400 ring-1 ring-cyan-400/50 z-10 bg-cyan-900/40"
          : "border-white/10 bg-white/5 hover:border-cyan-400/50 hover:bg-white/10"
      }`}
      style={{
        maxWidth: isDesktopSmall ? 170 : undefined,
        marginLeft: isDesktopSmall ? "auto" : undefined,
        marginRight: isDesktopSmall ? "auto" : undefined,
      }}
    >
      {/* 圖片容器：保持正方形 (aspect-square) */}
      <div
        className={`relative w-full ${
          isCompact || isDesktopSmall ? "aspect-square" : "aspect-[5/4]"
        } overflow-hidden`}
      >
        <Image
          src={speaker.image}
          alt={speaker.name}
          fill
          className={`object-cover transition-transform duration-500 ${
            isActive
              ? "scale-105"
              : "group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
          }`}
        />
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isActive
              ? "bg-transparent"
              : "bg-black/20 group-hover:bg-transparent"
          }`}
        />
      </div>

      <div
        className={`text-center transition-colors duration-300 flex flex-col justify-center absolute bottom-0 w-full ${
          isCompact || isDesktopSmall
            ? "p-[3px] lg:p-1 bg-black/70"
            : "p-2 bg-black/60"
        } ${isActive ? "bg-cyan-950/90" : ""}`}
      >
        <h3
          className={`font-bold truncate ${
            isCompact || isDesktopSmall
              ? "text-[10px] md:text-xs"
              : "text-sm md:text-base"
          } ${isActive ? "text-cyan-300" : "text-white group-hover:text-cyan-200"}`}
        >
          {speaker.name}
        </h3>

        {!isCompact && !isDesktopSmall && (
          <p className="text-[10px] md:text-xs text-gray-400 truncate mt-0.5">
            {speaker.company}
          </p>
        )}
      </div>
    </div>
  );
}

// --- 子組件：詳細資訊卡 ---
function DetailCard({
  speaker,
  isMobile = false,
}: {
  speaker: Speaker;
  isMobile?: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={speaker.id}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3 }}
        className="w-full relative rounded-xl overflow-hidden border border-cyan-500/30 bg-[#0B1121]/90 backdrop-blur-md shadow-lg flex flex-row items-stretch"
        style={{
          minHeight: isMobile
            ? "150px"
            : "160px", // 電腦縮小: 原 200px 改 160px
          maxHeight: isMobile
            ? "180px"
            : "200px", // 電腦縮小: 原 260px 改 200px
        }}
      >
        {/* 左側大圖 */}
        <div
          className={`relative flex-shrink-0 ${
            isMobile
              ? "w-[100px]"
              : "w-1/4 md:w-[130px] lg:w-[150px]"
          }`}
        >
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B1121]/95" />
        </div>

        {/* 右側文字 */}
        <div className="flex-1 p-3 md:p-4 flex flex-col justify-center relative overflow-y-auto scrollbar-thin">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2 mb-1">
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-white">
                {speaker.name}
              </h3>
              <div className="text-xs md:text-xs lg:text-sm text-cyan-400 font-semibold flex flex-wrap items-center gap-2">
                <span>{speaker.company}</span>
                <span className="hidden md:inline text-gray-600">|</span>
                <span className="text-gray-300">{speaker.title}</span>
              </div>
            </div>

            <p className="text-gray-300 text-xs md:text-xs lg:text-sm leading-relaxed text-justify line-clamp-4 md:line-clamp-3">
              {speaker.bio}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}