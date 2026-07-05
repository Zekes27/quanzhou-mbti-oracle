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
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(245,190,87,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(245,190,87,.08)_1px,transparent_1px)] [background-size:28px_28px]" />

      <header className="mb-6 rounded-[2rem] border border-amber-400/40 bg-black/45 p-5 shadow-2xl shadow-amber-950/40 backdrop-blur">
        <p className="mb-2 text-xs tracking-[0.45em] text-amber-300/80">QUANZHOU ORACLE</p>
        <h1 className="text-3xl font-black leading-tight text-amber-100 sm:text-5xl">泉州 MBTI 神明答案之书</h1>
        <p className="mt-3 text-sm leading-6 text-amber-100/70">{ritualHint}</p>
      </header>

      {step === "home" && (
        <section className="flex flex-1 items-center">
          <div className="w-full rounded-[2rem] border border-amber-300/50 bg-gradient-to-b from-amber-950/40 to-black/70 p-6 text-center shadow-2xl shadow-black/60">
            <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full border border-amber-300/60 bg-amber-400/10 text-5xl shadow-inner shadow-amber-900/80">卜</div>
            <h2 className="text-2xl font-bold text-amber-100">请在心中默念问题</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-300">十六位 MBTI 神明各守一方性格命盘。此处无图，只有文字神龛、金色边框与随机神谕，用于验证第一版核心玩法。</p>
            <button onClick={startRitual} className="mt-8 rounded-full border border-amber-200 bg-amber-300 px-8 py-4 font-bold text-stone-950 shadow-lg shadow-amber-900/50 transition hover:-translate-y-0.5 hover:bg-amber-200">开始请示</button>
          </div>
        </section>
      )}

      {step === "choose" && (
        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-amber-300/70">第一步</p>
              <h2 className="text-2xl font-bold">选择一位 MBTI 神明</h2>
            </div>
            <button onClick={restart} className="rounded-full border border-amber-400/40 px-4 py-2 text-sm text-amber-100/80">返回</button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {deities.map((deity) => (
              <button key={deity.id} onClick={() => chooseDeity(deity)} className="group overflow-hidden rounded-3xl border border-amber-400/40 bg-black/50 p-0 text-left shadow-xl shadow-black/40 transition hover:-translate-y-1 hover:border-amber-200">
                <div className={`h-24 bg-gradient-to-br ${deity.color} opacity-90`} />
                <div className="p-4">
                  <p className="text-xs font-bold tracking-[0.3em] text-amber-300">{deity.mbti}</p>
                  <h3 className="mt-2 text-xl font-black text-amber-100">{deity.name}</h3>
                  <p className="mt-1 text-sm text-amber-200/80">{deity.title}</p>
                  <p className="mt-3 line-clamp-4 text-sm leading-6 text-stone-300">{deity.intro}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {step === "ask" && selectedDeity && (
        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="overflow-hidden rounded-[2rem] border border-amber-400/40 bg-black/50 shadow-xl shadow-black/50">
            <div className={`h-36 bg-gradient-to-br ${selectedDeity.color}`} />
            <div className="p-5">
              <p className="text-xs font-bold tracking-[0.35em] text-amber-300">{selectedDeity.mbti}</p>
              <h2 className="mt-2 text-3xl font-black">{selectedDeity.name}</h2>
              <p className="mt-1 text-amber-200/80">{selectedDeity.title}</p>
              <p className="mt-4 leading-7 text-stone-300">{selectedDeity.intro}</p>
              <button onClick={() => setStep("choose")} className="mt-5 rounded-full border border-amber-400/40 px-4 py-2 text-sm text-amber-100/80">重选神明</button>
            </div>
          </aside>

          <div className="rounded-[2rem] border border-amber-300/50 bg-stone-950/80 p-5 shadow-2xl shadow-black/60">
            <label className="text-sm font-bold tracking-[0.2em] text-amber-300">写下你的问题</label>
            <textarea value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="例如：我该不该接受这个机会？" className="mt-3 min-h-32 w-full rounded-3xl border border-amber-500/30 bg-black/50 p-4 text-amber-50 outline-none ring-amber-300/30 placeholder:text-stone-500 focus:ring-4" />
            <button onClick={askOracle} disabled={!question.trim() || isFinal} className="mt-4 w-full rounded-full border border-amber-200 bg-amber-300 px-6 py-4 font-bold text-stone-950 shadow-lg shadow-amber-950/60 disabled:cursor-not-allowed disabled:border-stone-700 disabled:bg-stone-800 disabled:text-stone-500">请神明给我一个答案</button>

            {answer && (
              <div className="mt-6 rounded-[1.75rem] border border-amber-300/50 bg-gradient-to-b from-amber-950/50 to-black p-5">
                <p className="text-xs tracking-[0.35em] text-amber-300/80">神谕</p>
                <p className="mt-3 text-2xl font-bold leading-relaxed text-amber-100">“{answer}”</p>
                {!cupResult && (
                  <button onClick={tossCups} className="mt-5 w-full rounded-full border border-red-200/60 bg-red-950 px-6 py-4 font-bold text-red-50 shadow-lg shadow-red-950/50">投掷茭杯确认</button>
                )}
              </div>
            )}

            {cupResult && (
              <div className="mt-5 rounded-[1.75rem] border border-amber-300/40 bg-black/60 p-5">
                <p className="text-sm text-amber-300/80">茭杯结果</p>
                <p className="mt-2 text-4xl font-black text-amber-100">{cupResult}</p>
                <p className="mt-3 leading-7 text-stone-300">{getCupMeaning(cupResult)}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {!isFinal && <button onClick={askAgain} className="rounded-full border border-amber-200 bg-amber-300 px-6 py-3 font-bold text-stone-950">重新请示</button>}
                  <button onClick={restart} className="rounded-full border border-amber-400/50 px-6 py-3 font-bold text-amber-100">重新开始</button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
