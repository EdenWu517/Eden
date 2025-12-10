'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

function classNames(...args: any[]) {
  return args.filter(Boolean).join(' ');
}

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbwr8XfETeie6wHpG59CynQa2Iz57zEeM4rz1SqLS7xXW0DZs2zcaOT_vdhoRnikPN6T/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          body: new FormData(e.currentTarget),
        }
      );
      setDone(true);
    } catch (err) {
      // ignore error (no-cors), but set done anyway if fetch succeeds
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center py-6 px-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('/02.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 背景遮罩與亮點漸層，與首頁一致 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/85 pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(34,211,238,0.10),transparent_48%)]" />
      {/* 返回首頁按鈕 */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-cyan-200 hover:text-cyan-100 font-semibold transition-colors text-sm md:text-base"
        aria-label="返回首頁"
      >
        <svg
          width={22}
          height={22}
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block"
        >
          <path
            d="M15 19l-7-7 7-7"
            stroke="#67e8f9"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        返回首頁
      </Link>

      {/* 主卡片 */}
      <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl px-6 py-9 md:px-10 md:py-12 flex flex-col items-center relative">
        <h1 className="text-white text-2xl md:text-3xl font-extrabold mb-8 tracking-wider text-center drop-shadow-lg">
          立即保留席位
        </h1>
        {!done ? (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-5"
            autoComplete="off"
          >
            <div>
              <label htmlFor="name" className="block mb-1 text-cyan-100 font-semibold">
                姓名 <span className="text-pink-400">*</span>
              </label>
              <input
                required
                type="text"
                id="name"
                name="name"
                className="w-full rounded-lg bg-white/15 text-cyan-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-base font-medium placeholder:text-cyan-200/70"
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="org" className="block mb-1 text-cyan-100 font-semibold">
                服務機構 <span className="text-pink-400">*</span>
              </label>
              <input
                required
                type="text"
                id="org"
                name="org"
                className="w-full rounded-lg bg-white/15 text-cyan-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-base font-medium placeholder:text-cyan-200/70"
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="title" className="block mb-1 text-cyan-100 font-semibold">
                職稱 <span className="text-pink-400">*</span>
              </label>
              <input
                required
                type="text"
                id="title"
                name="title"
                className="w-full rounded-lg bg-white/15 text-cyan-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-base font-medium placeholder:text-cyan-200/70"
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-1 text-cyan-100 font-semibold">
                電話號碼 <span className="text-pink-400">*</span>
              </label>
              <input
                required
                type="tel"
                id="phone"
                name="phone"
                className="w-full rounded-lg bg-white/15 text-cyan-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-base font-medium placeholder:text-cyan-200/70"
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 text-cyan-100 font-semibold">
                電子信箱 <span className="text-pink-400">*</span>
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                className="w-full rounded-lg bg-white/15 text-cyan-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-base font-medium placeholder:text-cyan-200/70"
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block mb-2 text-cyan-100 font-semibold">
                飲食習慣 <span className="text-pink-400">*</span>
              </label>
              <div className="flex gap-8">
                <label className="flex items-center gap-2 cursor-pointer text-cyan-50">
                  <input
                    required
                    type="radio"
                    name="diet"
                    value="葷"
                    className="accent-cyan-400 w-5 h-5"
                  />
                  <span>葷</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-cyan-50">
                  <input
                    required
                    type="radio"
                    name="diet"
                    value="素"
                    className="accent-green-400 w-5 h-5"
                  />
                  <span>素</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className={classNames(
                "w-full mt-3 py-3 rounded-lg text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95", 
                loading && "opacity-60 cursor-not-allowed"
              )}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle
                      className="opacity-20"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#fff"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-80"
                      fill="#fff"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  傳送中...
                </span>
              ) : (
                '確認報名'
              )}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center w-full py-16">
            <div className="bg-green-500/20 border-2 border-green-400 rounded-full p-6 mb-4">
              <svg viewBox="0 0 48 48" width={64} height={64} fill="none">
                <circle cx="24" cy="24" r="22" fill="#22c55e" opacity="0.3"/>
                <path d="M15 26l6 6 12-14" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <div className="text-green-300 text-2xl font-bold mb-2">報名成功！</div>
            <div className="text-cyan-100 text-lg font-medium text-center">我們已收到您的資料</div>
          </div>
        )}
      </div>
    </div>
  );
}
