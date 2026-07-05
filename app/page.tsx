"use client";

import { useMemo, useState } from "react";
import { deities, type Deity } from "@/data/deities";
import { drawOracleAnswer, getCupMeaning, tossDivinationCups, type CupResult } from "@/lib/oracle";

type Step = "home" | "choose" | "ask";

export default function Home() {
  const [step, setStep] = useState<Step>("home");
  const [selectedDeity, setSelectedDeity] = useState<Deity | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [cupResult, setCupResult] = useState<CupResult | null>(null);
  const [isFinal, setIsFinal] = useState(false);

  const ritualHint = useMemo(() => {
    if (!selectedDeity) return "焚一炷心香，择一位神明入座。";
    return `${selectedDeity.name} · ${selectedDeity.title}`;
  }, [selectedDeity]);

  function startRitual() {
    setStep("choose");
  }

  function chooseDeity(deity: Deity) {
    setSelectedDeity(deity);
    setQuestion("");
    setAnswer("");
    setCupResult(null);
    setIsFinal(false);
    setStep("ask");
  }

  function askOracle() {
    if (!selectedDeity || isFinal) return;
    setAnswer((previous) => drawOracleAnswer(selectedDeity.answers, previous));
    setCupResult(null);
  }

  function tossCups() {
    if (!answer || isFinal) return;
    const result = tossDivinationCups();
    setCupResult(result);
    setIsFinal(result === "阳杯");
  }

  function askAgain() {
    if (!selectedDeity || isFinal) return;
    setAnswer((previous) => drawOracleAnswer(selectedDeity.answers, previous));
    setCupResult(null);
  }

  function restart() {
    setStep("home");
    setSelectedDeity(null);
    setQuestion("");
    setAnswer("");
    setCupResult(null);
    setIsFinal(false);
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col overflow-x-hidden px-3 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-[calc(0.75rem+env(safe-area-inset-top))] min-[375px]:px-4 min-[390px]:py-5 sm:px-5 md:max-w-[480px]">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(245,190,87,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(245,190,87,.08)_1px,transparent_1px)] [background-size:28px_28px]" />

      <header className="mb-4 shrink-0 rounded-[1.5rem] border border-amber-400/40 bg-black/45 p-4 shadow-2xl shadow-amber-950/40 backdrop-blur min-[390px]:mb-5 min-[390px]:rounded-[1.75rem] min-[390px]:p-5">
        <p className="mb-2 text-xs tracking-[0.28em] text-amber-300/80 min-[390px]:tracking-[0.45em]">QUANZHOU ORACLE</p>
        <h1 className="text-[clamp(1.65rem,8vw,2.65rem)] font-black leading-tight text-amber-100">泉州 MBTI 神明答案之书</h1>
        <p className="mt-2 text-sm leading-6 text-amber-100/70 min-[390px]:mt-3">{ritualHint}</p>
      </header>

      {step === "home" && (
        <section className="flex flex-1 items-center py-2 min-[390px]:py-4">
          <div className="w-full rounded-[1.75rem] border border-amber-300/50 bg-gradient-to-b from-amber-950/40 to-black/70 p-4 text-center shadow-2xl shadow-black/60 min-[375px]:p-5 min-[390px]:rounded-[2rem] min-[390px]:p-6">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border border-amber-300/60 bg-amber-400/10 text-4xl shadow-inner shadow-amber-900/80 min-[390px]:mb-6 min-[390px]:h-32 min-[390px]:w-32 min-[390px]:text-5xl">卜</div>
            <h2 className="text-xl font-bold text-amber-100 min-[390px]:text-2xl">请在心中默念问题</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-stone-300 min-[390px]:mt-4 min-[390px]:leading-7">十六位 MBTI 神明各守一方性格命盘。此处无图，只有文字神龛、金色边框与随机神谕，用于验证第一版核心玩法。</p>
            <button onClick={startRitual} className="mt-6 min-h-11 rounded-full border border-amber-200 bg-amber-300 px-7 py-3 text-base font-bold text-stone-950 shadow-lg shadow-amber-900/50 transition hover:-translate-y-0.5 hover:bg-amber-200 active:translate-y-0 active:scale-[0.98] min-[390px]:mt-8 min-[390px]:px-8 min-[390px]:py-4">开始请示</button>
          </div>
        </section>
      )}

      {step === "choose" && (
        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-sm text-amber-300/70">第一步</p>
              <h2 className="text-xl font-bold leading-tight min-[390px]:text-2xl">选择一位 MBTI 神明</h2>
            </div>
            <button onClick={restart} className="min-h-11 shrink-0 rounded-full border border-amber-400/40 px-4 py-2 text-sm text-amber-100/80 active:scale-[0.98]">返回</button>
          </div>
          <div className="grid grid-cols-2 gap-3 min-[390px]:gap-4">
            {deities.map((deity) => (
              <button key={deity.id} onClick={() => chooseDeity(deity)} className="group flex min-h-[13.25rem] flex-col overflow-hidden rounded-2xl border border-amber-400/40 bg-black/50 p-0 text-left shadow-xl shadow-black/40 transition hover:-translate-y-1 hover:border-amber-200 active:scale-[0.98] min-[390px]:min-h-[14.5rem] min-[390px]:rounded-3xl">
                <div className={`h-16 shrink-0 bg-gradient-to-br ${deity.color} opacity-90 min-[390px]:h-20`} />
                <div className="flex flex-1 flex-col p-3 min-[390px]:p-4">
                  <p className="text-xs font-bold tracking-[0.3em] text-amber-300">{deity.mbti}</p>
                  <h3 className="mt-1 text-lg font-black leading-tight text-amber-100 min-[390px]:mt-2 min-[390px]:text-xl">{deity.name}</h3>
                  <p className="mt-1 text-sm leading-5 text-amber-200/80">{deity.title}</p>
                  <p className="mt-2 line-clamp-4 text-sm leading-5 text-stone-300 min-[390px]:mt-3 min-[390px]:leading-6">{deity.intro}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {step === "ask" && selectedDeity && (
        <section className="grid gap-4 pb-2 min-[390px]:gap-5 landscape:grid-cols-2 landscape:items-start">
          <aside className="overflow-hidden rounded-[1.5rem] border border-amber-400/40 bg-black/50 shadow-xl shadow-black/50 min-[390px]:rounded-[2rem]">
            <div className={`h-20 bg-gradient-to-br ${selectedDeity.color} min-[390px]:h-28 landscape:h-16`} />
            <div className="p-4 min-[390px]:p-5">
              <p className="text-xs font-bold tracking-[0.35em] text-amber-300">{selectedDeity.mbti}</p>
              <h2 className="mt-1 text-2xl font-black leading-tight min-[390px]:mt-2 min-[390px]:text-3xl">{selectedDeity.name}</h2>
              <p className="mt-1 text-amber-200/80">{selectedDeity.title}</p>
              <p className="mt-3 text-sm leading-6 text-stone-300 min-[390px]:mt-4 min-[390px]:text-base min-[390px]:leading-7">{selectedDeity.intro}</p>
              <button onClick={() => setStep("choose")} className="mt-4 min-h-11 rounded-full border border-amber-400/40 px-4 py-2 text-sm text-amber-100/80 active:scale-[0.98] min-[390px]:mt-5">重选神明</button>
            </div>
          </aside>

          <div className="rounded-[1.5rem] border border-amber-300/50 bg-stone-950/80 p-4 shadow-2xl shadow-black/60 min-[390px]:rounded-[2rem] min-[390px]:p-5">
            <label className="text-sm font-bold tracking-[0.2em] text-amber-300">写下你的问题</label>
            <textarea value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="例如：我该不该接受这个机会？" className="mt-3 min-h-28 w-full resize-y rounded-2xl border border-amber-500/30 bg-black/50 p-4 text-base text-amber-50 outline-none ring-amber-300/30 placeholder:text-stone-500 focus:ring-4 min-[390px]:min-h-32 min-[390px]:rounded-3xl" />
            <button onClick={askOracle} disabled={!question.trim() || isFinal} className="mt-4 min-h-12 w-full rounded-full border border-amber-200 bg-amber-300 px-6 py-3 text-base font-bold text-stone-950 shadow-lg shadow-amber-950/60 active:scale-[0.99] disabled:cursor-not-allowed disabled:border-stone-700 disabled:bg-stone-800 disabled:text-stone-500 min-[390px]:py-4">请神明给我一个答案</button>

            {answer && (
              <div className="mt-5 rounded-[1.5rem] border border-amber-300/50 bg-gradient-to-b from-amber-950/50 to-black p-4 shadow-inner shadow-amber-950/50 min-[390px]:mt-6 min-[390px]:rounded-[1.75rem] min-[390px]:p-5">
                <p className="text-xs tracking-[0.35em] text-amber-300/80">神谕</p>
                <p className="mt-3 break-words rounded-2xl border border-amber-400/20 bg-black/30 p-3 text-sm leading-6 text-stone-300">所问：{question}</p>
                <p className="mt-3 break-words text-xl font-bold leading-relaxed text-amber-100 min-[390px]:text-2xl">“{answer}”</p>
                {!cupResult && (
                  <button onClick={tossCups} className="mt-5 min-h-12 w-full rounded-full border border-red-200/60 bg-red-950 px-6 py-3 text-base font-bold text-red-50 shadow-lg shadow-red-950/50 active:scale-[0.99] min-[390px]:py-4">投掷茭杯确认</button>
                )}
              </div>
            )}

            {cupResult && (
              <div className="mt-5 rounded-[1.5rem] border border-amber-300/40 bg-black/60 p-4 text-center min-[390px]:rounded-[1.75rem] min-[390px]:p-5">
                <p className="text-sm text-amber-300/80">茭杯结果</p>
                <p className="mx-auto mt-2 flex h-20 w-20 items-center justify-center rounded-full border border-amber-300/50 bg-amber-300/10 text-3xl font-black text-amber-100 shadow-inner shadow-amber-950/70 min-[390px]:h-24 min-[390px]:w-24 min-[390px]:text-4xl">{cupResult}</p>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-stone-300 min-[390px]:text-base min-[390px]:leading-7">{getCupMeaning(cupResult)}</p>
                <div className="mt-5 grid gap-3 pb-[env(safe-area-inset-bottom)]">
                  {!isFinal && <button onClick={askAgain} className="min-h-12 rounded-full border border-amber-200 bg-amber-300 px-6 py-3 text-base font-bold text-stone-950 active:scale-[0.99]">重新请示</button>}
                  <button onClick={restart} className="min-h-12 rounded-full border border-amber-400/50 px-6 py-3 text-base font-bold text-amber-100 active:scale-[0.99]">{isFinal ? "重新开始" : "回到首页"}</button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
