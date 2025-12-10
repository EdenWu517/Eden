"use client";
import React, { useEffect, useState } from "react";

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

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [mounted]);

  const boxes = [
    { label: "天", value: pad(timeLeft.days) },
    { label: "時", value: pad(timeLeft.hours) },
    { label: "分", value: pad(timeLeft.minutes) },
    { label: "秒", value: pad(timeLeft.seconds) },
  ];

  // 骨架 UI
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
            <div
              key={box.label}
              className="flex flex-col items-center px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm shadow-lg"
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
                {box.label}
              </span>
            </div>
          ))
        : boxes.map((box) => (
            <div
              key={box.label}
              className="flex flex-col items-center px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm shadow-lg"
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
                key={box.value} // forces re-animation on value change
              >
                {box.value}
              </span>
              <span className="text-cyan-200 text-sm font-semibold tracking-wide mt-2 select-none drop-shadow">
                {box.label}
              </span>
            </div>
          ))}
    </div>
  );
}
