import React, { useRef, useEffect, useState } from "react";

const logos = [
  // 保留原本的圖片資料，請在這裡填入你的 logo 物件，例如：
  { src: "/sponsor/acme.svg", alt: "Acme" },
  { src: "/sponsor/xyz.svg", alt: "XYZ" },
  { src: "/sponsor/nautilus.svg", alt: "Nautilus" },
  { src: "/sponsor/nctu.svg", alt: "NCTU" },
  { src: "/sponsor/openstack.svg", alt: "OpenStack" },
  { src: "/sponsor/costar.svg", alt: "Costar" },
  { src: "/sponsor/sony.svg", alt: "Sony" },
  { src: "/sponsor/qnap.svg", alt: "QNAP" },
  // ...可以再加入其他圖片
];

const SCROLL_SPEED = 80; // px per second, 可依照需求調整

export default function SponsorMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [marqueeWidth, setMarqueeWidth] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(20);

  // 計算單次 logo 列總寬度，確保動畫時間正確
  useEffect(() => {
    if (containerRef.current) {
      const singleRow = containerRef.current.querySelector<HTMLDivElement>(".marquee-inner");
      if (singleRow) {
        const rowWidth = singleRow.offsetWidth;
        setMarqueeWidth(rowWidth);
        setAnimationDuration(rowWidth / SCROLL_SPEED);
      }
    }
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-black/90 py-4">
      <div
        ref={containerRef}
        className="relative w-full h-20 select-none flex items-center"
        style={{ willChange: "transform" }}
      >
        <div
          className="absolute left-0 top-0 flex marquee-animate"
          style={{
            width: marqueeWidth ? `${marqueeWidth * 2}px` : "auto",
            animation: marqueeWidth
              ? `marqueeLinear ${animationDuration}s linear infinite`
              : "none",
          }}
        >
          <div className="marquee-inner flex">
            {logos.map((logo, idx) => (
              <div key={logo.src + idx} className="mx-8 flex-shrink-0 flex items-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 w-auto max-w-xs drop-shadow-lg"
                  draggable={false}
                  loading="lazy"
                  style={{ userSelect: "none" }}
                />
              </div>
            ))}
          </div>
          {/* duplicated for seamless effect */}
          <div className="marquee-inner flex" aria-hidden="true">
            {logos.map((logo, idx) => (
              <div key={logo.src + "dup" + idx} className="mx-8 flex-shrink-0 flex items-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 w-auto max-w-xs drop-shadow-lg"
                  draggable={false}
                  loading="lazy"
                  style={{ userSelect: "none" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 動畫樣式，直接內嵌 */}
      <style>{`
        @keyframes marqueeLinear {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-animate {
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
