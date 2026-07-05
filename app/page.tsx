"use client";

import { useState } from "react";
import { deities, type Deity } from "@/data/deities";
import { drawOracleAnswer, getCupMeaning, tossDivinationCups, type CupResult } from "@/lib/oracle";

type Step = "home" | "choose" | "ask";

export default function Home() {
  const [step, setStep] = useState<Step>("home");
  const [selectedDeity, setSelectedDeity] = useState<Deity | null>(null);
  const [previewDeity, setPreviewDeity] = useState<Deity | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [cupResult, setCupResult] = useState<CupResult | null>(null);
  const [isFinal, setIsFinal] = useState(false);
  const [paperOpen, setPaperOpen] = useState(false);

  function startRitual() {
    setStep("choose");
  }

  function openDeityPreview(deity: Deity) {
    setPreviewDeity(deity);
  }

  function closeDeityPreview() {
    setPreviewDeity(null);
  }

  function chooseDeity(deity: Deity) {
    setSelectedDeity(deity);
    setPreviewDeity(null);
    setQuestion("");
    setAnswer("");
    setCupResult(null);
    setIsFinal(false);
    setPaperOpen(false);
    setStep("ask");
  }

  function askOracle() {
    if (!selectedDeity || isFinal) return;
    setAnswer((previous) => drawOracleAnswer(selectedDeity.answers, previous));
    setCupResult(null);
    setIsFinal(false);
    setPaperOpen(true);
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
    setPaperOpen(true);
  }

  function restart() {
    setStep("home");
    setSelectedDeity(null);
    setPreviewDeity(null);
    setQuestion("");
    setAnswer("");
    setCupResult(null);
    setIsFinal(false);
    setPaperOpen(false);
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[460px] flex-col overflow-x-hidden px-3 py-4 text-amber-50 min-[380px]:px-4">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(245,190,87,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(245,190,87,.08)_1px,transparent_1px)] [background-size:28px_28px]" />

      {step === "home" && (
        <section className="flex flex-1 items-center py-3">
          <div className="w-full rounded-[2.25rem] border border-amber-300/50 bg-gradient-to-b from-amber-950/50 to-black/80 p-6 text-center shadow-2xl shadow-black/60">
            <p className="mb-3 text-xs tracking-[0.45em] text-amber-300/80">QUANZHOU ORACLE</p>
            <h1 className="text-[clamp(2rem,10vw,3rem)] font-black leading-tight text-amber-100">泉州 MBTI 神明答案之书</h1>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-stone-300">焚一炷心香，择一位神明入座。输入你的疑问，抽取神谕，再以茭杯确认。</p>
            <div className="mx-auto my-8 flex h-28 w-28 items-center justify-center rounded-full border border-amber-300/60 bg-amber-400/10 text-5xl shadow-inner shadow-amber-900/80">卜</div>
            <button onClick={startRitual} className="min-h-12 w-full rounded-full border border-amber-200 bg-amber-300 px-8 py-4 text-base font-bold text-stone-950 shadow-lg shadow-amber-900/50 transition active:scale-[0.98]">开始请示</button>
          </div>
        </section>
      )}

      {step === "choose" && (
        <section className="relative pb-6">
          <div className={`transition duration-300 ${previewDeity ? "scale-[0.98] blur-sm" : ""}`}>
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-sm text-amber-300/70">第一步</p>
                <h1 className="text-2xl font-black text-amber-100">选择一位 MBTI 神明</h1>
              </div>
              <button onClick={restart} className="rounded-full border border-amber-400/40 px-4 py-2 text-sm text-amber-100/80">返回</button>
            </div>
            <div className="grid grid-cols-2 gap-3 min-[380px]:gap-4">
              {deities.map((deity) => (
                <button
                  key={deity.id}
                  onClick={() => openDeityPreview(deity)}
                  className="flex min-h-[108px] items-center justify-center rounded-[1.75rem] border border-amber-400/40 bg-black/55 text-2xl font-black tracking-[0.18em] text-amber-100 shadow-xl shadow-black/40 transition active:scale-[0.96]"
                >
                  {deity.mbti}
                </button>
              ))}
            </div>
          </div>

          {previewDeity && (
            <div className="fixed inset-0 z-40 flex items-center justify-center px-5 py-8">
              <button aria-label="关闭神明预览" onClick={closeDeityPreview} className="absolute inset-0 h-full w-full bg-black/55 backdrop-blur-md" />
              <div className="relative z-10 w-full max-w-[360px] animate-card-reveal overflow-hidden rounded-[2rem] border border-amber-300/70 bg-stone-950 shadow-2xl shadow-black/80">
                <div className={`flex h-60 items-center justify-center bg-gradient-to-br ${previewDeity.color}`}>
                  <div className="rounded-full border border-amber-200/50 bg-black/25 px-5 py-3 text-sm tracking-[0.3em] text-amber-100/80">神明形象预留</div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-bold tracking-[0.4em] text-amber-300">{previewDeity.mbti}</p>
                  <h2 className="mt-3 text-3xl font-black leading-tight text-amber-100">{previewDeity.name}</h2>
                  <p className="mt-2 text-base font-bold text-amber-200/90">{previewDeity.title}</p>
                  <p className="mt-4 text-sm leading-7 text-stone-300">{previewDeity.intro}</p>
                  <button onClick={() => chooseDeity(previewDeity)} className="mt-6 min-h-12 w-full rounded-full border border-amber-200 bg-amber-300 px-6 py-3.5 text-base font-black text-stone-950 shadow-lg shadow-amber-950/60 transition active:scale-[0.98]">选择TA</button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {step === "ask" && selectedDeity && (
        <section className="flex flex-1 flex-col gap-4 pb-6">
          <nav className="flex items-center justify-between rounded-full border border-amber-400/35 bg-black/45 px-4 py-3 shadow-xl shadow-black/40">
            <span className="text-sm text-amber-100/80">{selectedDeity.mbti} · {selectedDeity.name}</span>
            <button onClick={() => setStep("choose")} className="rounded-full border border-amber-400/50 px-4 py-2 text-sm font-bold text-amber-100">重选神明</button>
          </nav>

          <div className="rounded-[2rem] border border-amber-300/50 bg-stone-950/85 p-5 shadow-2xl shadow-black/60">
            <label className="text-sm font-bold tracking-[0.2em] text-amber-300">写下你的问题</label>
            <textarea value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="例如：我该不该接受这个机会？" className="mt-3 min-h-32 w-full rounded-3xl border border-amber-500/30 bg-black/50 p-4 text-base leading-7 text-amber-50 outline-none ring-amber-300/30 placeholder:text-stone-500 focus:ring-4" />
            <button onClick={askOracle} disabled={!question.trim()} className="mt-4 min-h-12 w-full rounded-full border border-amber-200 bg-amber-300 px-6 py-3.5 text-base font-bold text-stone-950 shadow-lg shadow-amber-950/60 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:border-stone-700 disabled:bg-stone-800 disabled:text-stone-500">请神明给我一个答案</button>
          </div>
        </section>
      )}

      {step === "ask" && selectedDeity && answer && paperOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/45 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-[390px] animate-paper-rise pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div className="mx-auto max-h-[88dvh] overflow-y-auto rounded-t-[2.4rem] border border-rose-300/70 bg-[#f9d7dc] p-5 text-rose-900 shadow-2xl shadow-black/80">
              <div className="mx-auto flex min-h-[540px] w-full max-w-[300px] flex-col rounded-[1.4rem] border border-rose-500/70 bg-[#ffe5e9] p-5">
                <div className="border-b border-rose-500/50 pb-3 text-center">
                  <p className="text-2xl font-black tracking-[0.5em]">签灵</p>
                  <p className="mt-2 text-xs tracking-[0.35em]">{selectedDeity.name}</p>
                </div>
                <div className="flex flex-1 items-center justify-center py-6">
                  <p className="[writing-mode:vertical-rl] max-h-[360px] text-2xl font-bold leading-[2.4] tracking-[0.25em]">{answer}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 border-t border-rose-500/50 pt-4">
                  <button onClick={restart} className="min-h-12 rounded-full border border-rose-500/60 bg-rose-100 px-4 py-3 text-base font-black text-rose-900">认准</button>
                  <button onClick={tossCups} className="min-h-12 rounded-full border border-rose-700 bg-rose-700 px-4 py-3 text-base font-black text-rose-50">投掷茭杯</button>
                </div>
              </div>
            </div>

            {cupResult && (
              <div className="absolute inset-x-4 top-10 z-50 rounded-[2rem] border border-amber-300/60 bg-stone-950/95 p-5 text-center text-amber-50 shadow-2xl shadow-black/80">
                <p className="text-sm tracking-[0.25em] text-amber-300">茭杯结果</p>
                <p className="mt-3 text-4xl font-black">{cupResult}</p>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-stone-300">{getCupMeaning(cupResult)}</p>
                <div className="mt-5 grid gap-3">
                  {!isFinal && <button onClick={askAgain} className="min-h-12 rounded-full border border-amber-200 bg-amber-300 px-6 py-3.5 text-base font-bold text-stone-950">重新指示</button>}
                  <button onClick={restart} className="min-h-12 rounded-full border border-amber-400/50 px-6 py-3.5 text-base font-bold text-amber-100">重新开始</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
