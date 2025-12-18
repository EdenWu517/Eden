import React from "react";

// 只要六張圖
const logos = [
    { src: "/SP01.png", alt: "SP01" },
    { src: "/SP02.png", alt: "SP02" },
    { src: "/SP03.png", alt: "SP03" },
    { src: "/SP04.jpeg", alt: "SP04" },
    { src: "/SP05.png", alt: "SP05" },
    { src: "/SP06.png", alt: "SP06" },
    { src: "/Moda-logo.png", alt: "SP07" },
];

// 複製一份做馬拉松無縫
const logosForMarquee = [...logos, ...logos];

export default function SponsorMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-black/90 py-4">
      <div
        className="flex w-max h-28 items-center gap-16 animate-marquee"
        style={{
          minWidth: `${logosForMarquee.length * 180}px`,
        }}
      >
        {logosForMarquee.map((logo, idx) => (
          <div
            key={`${logo.src}-${idx}`}
            className="relative w-44 h-20 flex items-center justify-center"
            style={{
              minWidth: "176px",
              flex: "0 0 176px",
            }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
                userSelect: "none",
              }}
              draggable={false}
              loading="eager"
              width={176}
              height={80}
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 24s linear infinite;
        }
      `}</style>
    </div>
  );
}
