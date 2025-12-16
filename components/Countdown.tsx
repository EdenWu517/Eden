"use client";
import React, { useEffect, useState, useRef } from "react";

// 倒數邏輯抽出，避免倒數元件不必要的重繪
const TARGET_DATE = new Date("2026-01-16T10:00:00");

function getTimeLeft() {
  const now = new Date();
  const total = Math.max(0, TARGET_DATE.getTime() - now.getTime());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}

function pad(num: number) {
  return String(num).padStart(2, "0");
}

// 單一倒數格子，只有該數字變化時才重繪
const CountdownBox = React.memo(function CountdownBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="flex flex-col items-center px-4 py-3 rounded-xl shadow-lg"
      style={{
        minWidth: "72px",
        transition: "background 0.3s",
      }}
    >
      <span
        className="font-extrabold text-white text-5xl md:text-7xl font-mono transition-all duration-200 ease-in-out"
        style={{
          lineHeight: "1.1",
          letterSpacing: "0.02em",
          textShadow: "0 0 16px rgba(0,0,0,0.40), 0 1px 10px #0ff5",
        }}
        key={value} // 強制動畫
      >
        {value}
      </span>
      <span className="text-cyan-200 text-sm font-semibold tracking-wide mt-2 select-none drop-shadow">
        {label}
      </span>
    </div>
  );
});

// 骨架畫面 (skeleton)
const CountdownSkeleton = React.memo(function CountdownSkeleton({
  label,
}: {
  label: string;
}) {
  return (
    <div
      className="flex flex-col items-center px-4 py-3 rounded-xl shadow-lg"
      style={{
        minWidth: "72px",
        transition: "background 0.3s",
      }}
    >
      <span
        className="font-extrabold text-white text-5xl md:text-7xl font-mono transition-all duration-200 ease-in-out bg-cyan-400/30 rounded animate-pulse w-16 h-14 md:w-24 md:h-20 flex items-center justify-center"
        style={{
          lineHeight: "1.1",
          letterSpacing: "0.02em",
        }}
      >
        &nbsp;
      </span>
      <span className="text-cyan-200 text-sm font-semibold tracking-wide mt-2 select-none drop-shadow">
        {label}
      </span>
    </div>
  );
});

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // 計算下一次秒變化的 delay，精確貼齊秒
    function startCountdownTicking() {
      // 第一次立即同步時間
      setTimeLeft(getTimeLeft());

      const tick = () => {
        setTimeLeft(getTimeLeft());
      };

      // 精確校正 interval：讓倒數能準確跳秒
      const now = new Date();
      const msUntilNextSecond = 1000 - (now.getMilliseconds());
      // 先 setTimeout 再進入 setInterval
      const timeout = setTimeout(() => {
        tick();
        intervalRef.current = setInterval(tick, 1000);
      }, msUntilNextSecond);

      // 返回一個清除 function
      return () => {
        clearTimeout(timeout);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }

    const cleanup = startCountdownTicking();
    return cleanup;
  }, [mounted]);

  const boxes = [
    { label: "天", value: pad(timeLeft.days) },
    { label: "時", value: pad(timeLeft.hours) },
    { label: "分", value: pad(timeLeft.minutes) },
    { label: "秒", value: pad(timeLeft.seconds) },
  ];

  const skeletonBoxes = [
    { label: "天" },
    { label: "時" },
    { label: "分" },
    { label: "秒" },
  ];

  return (
    <div className="flex gap-4 items-center justify-center">
      {!mounted
        ? skeletonBoxes.map((box) => (
            <CountdownSkeleton key={box.label} label={box.label} />
          ))
        : boxes.map((box) => (
            <CountdownBox key={box.label} label={box.label} value={box.value} />
          ))}
    </div>
  );
}
