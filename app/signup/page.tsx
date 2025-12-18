'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

function classNames(...args: any[]) {
  return args.filter(Boolean).join(' ');
}

// 個資蒐集聲明內容範本
const PRIVACY_TEXT = `
本報名活動依據個人資料保護法相關規定辦理，主辦單位將於下列特定目的內蒐集、處理及利用您的個人資料：
一、蒐集目的：活動聯繫、身分核實、會後統計分析及後續宣傳通知事宜。
二、個人資料類別：姓名、服務機構、職稱、電話、電子信箱、飲食習慣。
三、利用期間：活動期間及活動結束後一年內。
四、利用地區：僅限於中華民國境內。
五、利用對象及方式：僅供本次主辦單位及其委託單位於前述目的範圍內以電話、電子郵件等方式聯繫及通知。
六、權益行使：您可隨時依個資法規定，請求查詢、閱覽、製給複本、補充、更正、停止蒐集處理利用或刪除您的個人資料。

如未提供完整資料，將影響報名作業。送出報名表即表示同意本聲明。
`;

function PrivacyModal({ show, onClose }: { show: boolean; onClose: () => void }) {
  if (!show) return null;
  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* 遮罩與模糊 */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-label="關閉個資聲明"
      />
      {/* Modal內容 */}
      <div className="relative bg-white/95 dark:bg-[#131c25]/95 rounded-xl max-w-md w-[90vw] p-6 md:pt-8 md:px-8 md:pb-8 shadow-2xl z-10 text-gray-900 dark:text-gray-100">
        <button
          type="button"
          className="absolute top-3 right-3 rounded-full p-2 hover:bg-gray-200 hover:dark:bg-gray-600 transition"
          onClick={onClose}
          aria-label="關閉個資聲明"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <h2 className="text-lg md:text-xl font-bold mb-4 text-cyan-700 dark:text-cyan-200 flex items-center gap-2">
          <svg className="inline-block text-cyan-500" width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9 0 4.301 3.056 7.872 7.157 8.797l.129.029.043.009.04.005.059.009.073.006h.065c.249 0 .472-.158.553-.397l.112-.347a.488.488 0 00-.17-.532c-.914-.738-1.527-1.888-1.527-3.049V15c0-.284.114-.555.319-.756l2.049-2.006V9.917C9.914 6.894 10.75 6 12 6s2.086.894 2.086 3.917v2.321l2.05 2.006c.205.201.319.472.319.756v.134c0 1.161-.613 2.312-1.528 3.049a.486.486 0 00-.169.532l.111.347c.098.304.373.497.653.497h.064l.073-.006.059-.009.04-.005.043-.009.129-.029C17.944 19.872 21 16.301 21 12c0-4.97-4.03-9-9-9z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>
          個資蒐集聲明
        </h2>
        <div className="mb-2 whitespace-pre-line text-base leading-relaxed text-gray-800 dark:text-gray-100">
          {PRIVACY_TEXT}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold shadow"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasRead, setHasRead] = useState(false); // 新增: 是否讀過聲明
  const [agreed, setAgreed] = useState(false); // 新增: 勾選狀態
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showToast, setShowToast] = useState(false); // (1) 新增 Toast 狀態
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = (formData: FormData): Record<string, string> => {
    const errors: Record<string, string> = {};

    // Name validation: required, max 50 characters
    const name = formData.get('name')?.toString().trim() || '';
    if (!name) {
      errors.name = '姓名為必填項目';
    } else if (name.length > 50) {
      errors.name = '姓名不能超過50個字元';
    }

    // Organization validation: required, max 100 characters
    const org = formData.get('org')?.toString().trim() || '';
    if (!org) {
      errors.org = '服務機構為必填項目';
    } else if (org.length > 100) {
      errors.org = '服務機構不能超過100個字元';
    }

    // Title validation: required, max 50 characters
    const title = formData.get('title')?.toString().trim() || '';
    if (!title) {
      errors.title = '職稱為必填項目';
    } else if (title.length > 50) {
      errors.title = '職稱不能超過50個字元';
    }

    // Phone validation: exactly 10 digits, must start with 0
    const phone = formData.get('phone')?.toString().trim() || '';
    const phoneDigits = phone.replace(/\D/g, ''); // Remove non-digits
    if (!phone) {
      errors.phone = '電話號碼為必填項目';
    } else if (phoneDigits.length !== 10) {
      errors.phone = '電話號碼必須為10位數字';
    } else if (!phoneDigits.startsWith('0')) {
      errors.phone = '電話號碼必須以0開頭（例如：0912345678）';
    }

    // Email validation: required, valid email format, max 100 characters
    const email = formData.get('email')?.toString().trim() || '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = '電子信箱為必填項目';
    } else if (email.length > 100) {
      errors.email = '電子信箱不能超過100個字元';
    } else if (!emailRegex.test(email)) {
      errors.email = '請輸入有效的電子信箱格式';
    }

    // Diet validation: required
    const diet = formData.get('diet')?.toString();
    if (!diet) {
      errors.diet = '飲食習慣為必填項目';
    }

    // 個資勾選
    if (!agreed) {
      errors.agreed = '請勾選同意個資蒐集聲明';
    }

    return errors;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 10);
    if (value.length > 0 && !value.startsWith('0')) {
      value = '0' + value.replace(/^0+/, '').slice(0, 9);
    }
    e.target.value = value;
  };

  // 勾選同意個資聲明的 onChange 處理
  const handleAgreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasRead) {
      e.preventDefault && e.preventDefault();
      setShowToast(true); // (2) 顯示警告
      setTimeout(() => setShowToast(false), 2000); // (2) 3秒後隱藏
      return;
    }
    setAgreed(e.target.checked);
  };

  // 點擊個資聲明藍色文字
  const handleShowPrivacy = () => {
    setShowPrivacy(true);
    setHasRead(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbwr8XfETeie6wHpG59CynQa2Iz57zEeM4rz1SqLS7xXW0DZs2zcaOT_vdhoRnikPN6T/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        }
      );
      setDone(true);
    } catch (err) {
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/02.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 返回首頁按鈕 */}
      <Link
        href="/"
        className="fixed z-[100] top-2 left-4 flex items-center gap-2 text-cyan-200 hover:text-cyan-100 font-semibold transition-colors text-xl md:text-2xl px-5 py-3 md:px-6 md:py-4 rounded-lg shadow-lg"
        aria-label="返回首頁"
        style={{
          textShadow: "0 2px 8px rgba(0,0,0,0.36)",
        }}
      >
        <svg
          width={28}
          height={28}
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

      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/85 pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(34,211,238,0.10),transparent_48%)]" />

      {/* RWD Main Layout：flex-col (mobile) / flex-row (desktop) */}
      <main className="relative flex flex-col lg:flex-row items-stretch justify-center w-full px-2 md:px-6 lg:px-12 mt-24 md:mt-28 gap-8 lg:gap-16 z-10 max-w-6xl mx-auto">
        {/* 活動資訊區塊：左／上 */}
       {/* 活動資訊區塊：左／上 */}
       <aside className="w-full lg:w-[345px] flex-shrink-0 mb-8 lg:mb-0">
          <div className="sticky top-8">
            {/* 標題與標籤 */}
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white mb-6 drop-shadow-lg flex flex-wrap items-center gap-2">
              <span>次世代行動創新應用 Demo Day</span>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500/60 to-yellow-400/70 text-white shadow ml-1 animate-pulse">
                立即報名
              </span>
            </h1>
            
            {/* 活動資訊卡群 */}
            <div className="flex flex-col gap-5">
              
              {/* 1. 日期卡片 (加入互動效果) */}
              <div className="group relative flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl px-4 py-4 border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] cursor-default overflow-hidden">
                {/* 裝飾光暈 */}
                <div className="absolute -right-4 -top-4 w-12 h-12 bg-cyan-400/20 rounded-full blur-xl transition-all group-hover:bg-cyan-400/40" />
                
                <div className="flex-shrink-0 aspect-square flex items-center justify-center h-12 w-12 rounded-lg bg-cyan-700/40 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 border border-cyan-500/30">
                <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-cyan-300">
  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
  <line x1="16" y1="2" x2="16" y2="6" />
  <line x1="8" y1="2" x2="8" y2="6" />
  <line x1="3" y1="10" x2="21" y2="10" />
</svg>
                </div>
                <div className="flex flex-col min-w-0 relative z-10">
                  <div className="text-cyan-200 text-sm font-bold uppercase tracking-wider mb-0.5">Date</div>
                  <div className="text-white text-lg font-bold tracking-wide group-hover:text-cyan-50 transition-colors">
                    2026/1/16 (五)
                  </div>
                  <div className="text-cyan-100/70 text-xs">10:00 - 15:00</div>
                </div>
              </div>

              {/* 2. 地點卡片 (加入互動效果) */}
              <div className="group relative flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl px-4 py-4 border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/20 hover:border-fuchsia-400/50 hover:shadow-[0_0_20px_rgba(232,121,249,0.3)] cursor-default overflow-hidden">
                {/* 裝飾光暈 */}
                <div className="absolute -right-4 -top-4 w-12 h-12 bg-fuchsia-400/20 rounded-full blur-xl transition-all group-hover:bg-fuchsia-400/40" />

                <div className="flex-shrink-0 aspect-square flex items-center justify-center h-12 w-12 rounded-lg bg-fuchsia-800/40 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110 border border-fuchsia-500/30">
                <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-300">
  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
  <circle cx="12" cy="10" r="3" />
</svg>
                </div>
                <div className="flex flex-col min-w-0 relative z-10">
                  <div className="text-fuchsia-200 text-sm font-bold uppercase tracking-wider mb-0.5">Location</div>
                  <div className="text-white text-base font-bold leading-tight group-hover:text-fuchsia-50 transition-colors">
                    大臺南會展中心
                    <span className="block text-sm font-normal text-fuchsia-100/80 mt-1">
                      3F 大員 D 廳 (近高鐵站)
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. 費用卡片 (加入互動效果) */}
              <div className="group relative flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl px-4 py-4 border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/20 hover:border-green-400/50 hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] cursor-default overflow-hidden">
                {/* 裝飾光暈 */}
                <div className="absolute -right-4 -top-4 w-12 h-12 bg-green-400/20 rounded-full blur-xl transition-all group-hover:bg-green-400/40" />

                <div className="flex-shrink-0 aspect-square flex items-center justify-center h-12 w-12 rounded-lg bg-green-700/40 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 border border-green-500/30">
                <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-green-300">
  <rect x="2" y="6" width="20" height="12" rx="2" />
  <circle cx="12" cy="12" r="2" />
  <path d="M6 12h.01M18 12h.01" />
</svg>
                </div>
                <div className="flex flex-col min-w-0 relative z-10">
                  <div className="text-green-200 text-sm font-bold uppercase tracking-wider mb-0.5">Ticket</div>
                  <div className="text-white text-xl font-bold group-hover:text-green-50 transition-colors">
                    免費 / Free
                  </div>
                </div>
              </div>

            </div>
          </div>
        </aside>

        {/* 報名表單主卡片：右／下 */}
        <section className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl px-6 py-9 md:px-10 md:py-12 flex flex-col items-center relative">
            {/* 主標題 (手機版顯示, PC 隱藏，僅供輔助) */}
            <h2 className="block lg:hidden text-white text-2xl font-extrabold mb-8 tracking-wider text-center drop-shadow-lg">
              立即報名
            </h2>
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
                    maxLength={50}
                    className={`w-full rounded-lg bg-white/15 text-cyan-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-base font-medium placeholder:text-cyan-200/70 ${
                      errors.name ? 'ring-2 ring-red-400' : ''
                    }`}
                    autoComplete="off"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
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
                    maxLength={100}
                    className={`w-full rounded-lg bg-white/15 text-cyan-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-base font-medium placeholder:text-cyan-200/70 ${
                      errors.org ? 'ring-2 ring-red-400' : ''
                    }`}
                    autoComplete="off"
                  />
                  {errors.org && <p className="text-red-400 text-sm mt-1">{errors.org}</p>}
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
                    maxLength={50}
                    className={`w-full rounded-lg bg-white/15 text-cyan-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-base font-medium placeholder:text-cyan-200/70 ${
                      errors.title ? 'ring-2 ring-red-400' : ''
                    }`}
                    autoComplete="off"
                  />
                  {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
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
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    onChange={handlePhoneChange}
                    className={`w-full rounded-lg bg-white/15 text-cyan-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-base font-medium placeholder:text-cyan-200/70 ${
                      errors.phone ? 'ring-2 ring-red-400' : ''
                    }`}
                    autoComplete="off"
                    placeholder=""
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
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
                    maxLength={100}
                    className={`w-full rounded-lg bg-white/15 text-cyan-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-base font-medium placeholder:text-cyan-200/70 ${
                      errors.email ? 'ring-2 ring-red-400' : ''
                    }`}
                    autoComplete="off"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
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
                  {errors.diet && <p className="text-red-400 text-sm mt-1">{errors.diet}</p>}
                </div>

                {/* 個資同意 */}
                <div className="flex items-start gap-2 mt-2 mb-1">
                  <input
                    type="checkbox"
                    id="gdpr"
                    checked={agreed}
                    onChange={handleAgreedChange}
                    className="accent-cyan-500 w-5 h-5 mt-[2px] flex-shrink-0"
                  />
                  <label htmlFor="gdpr" className="text-cyan-100 text-[15px] font-medium cursor-pointer leading-relaxed">
                    我已詳細閱讀並同意
                    {' '}
                    <button
                      type="button"
                      onClick={handleShowPrivacy}
                      className="underline underline-offset-2 text-cyan-300 hover:text-cyan-100 font-semibold transition px-1"
                      tabIndex={0}
                    >
                      個資蒐集聲明
                    </button>
                    ，並同意主辦單位聯繫。
                  </label>
                </div>
                {errors.agreed && <p className="text-red-400 text-sm mb-2 -mt-2">{errors.agreed}</p>}

                <button
                  type="submit"
                  className={classNames(
                    "w-full mt-3 py-3 rounded-lg text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95",
                    (loading || !agreed) && "opacity-60 cursor-not-allowed"
                  )}
                  disabled={loading || !agreed}
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
        </section>
      </main>
      {/* 個資聲明 Modal */}
      <PrivacyModal show={showPrivacy} onClose={() => setShowPrivacy(false)} />
      {/* (3) 警告 Toast */}
      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[130] flex items-center gap-3 bg-red-500/90 text-white rounded-xl shadow-lg px-5 py-3 transition-opacity duration-200 animate-bounce backdrop-blur-sm whitespace-nowrap">
          {/* AlertCircle SVG */}
          <svg className="flex-shrink-0" width="26" height="26" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="#fff" opacity="0.11"/>
            <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.5" opacity="0.24"/>
            <path d="M12 8v4m0 4h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-bold">請先閱讀個資聲明</span>
        </div>
      )}
    </div>
  );
}
