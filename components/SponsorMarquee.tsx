import { motion } from "framer-motion";

const sponsors = [
  "Google",
  "AWS",
  "Meta",
  "Microsoft",
  "NVIDIA",
  "Apple",
  "OpenAI",
  "Netflix",
];

/**
 * 無限滾動贊助商 Marquee
 * - 文字大且粗體灰色
 * - 使用 Framer Motion 做平滑無限滾動
 * - 左右漸層遮罩，讓文字從虛無浮現/消失
 * - 響應式字級：手機小、電腦大
 */
export default function SponsorMarquee() {
  // 使用兩份相同序列串接，達到無縫滾動
  const sequence = [...sponsors, ...sponsors];

  return (
    <div
      className="relative w-full overflow-hidden py-6"
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.75) 12%, rgba(0,0,0,0.75) 88%, transparent 100%)",
        maskImage:
          "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.75) 12%, rgba(0,0,0,0.75) 88%, transparent 100%)",
      }}
    >
      <motion.div
        className="flex min-w-max gap-12"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 16,
        }}
      >
        {sequence.map((name, idx) => (
          <span
            key={`${name}-${idx}`}
            className="text-gray-300 font-extrabold text-xl sm:text-2xl md:text-3xl whitespace-nowrap"
          >
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

