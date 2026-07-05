export type CupResult = "阳杯" | "阴杯" | "笑杯";

export function drawOracleAnswer(answers: string[], previousAnswer?: string): string {
  if (answers.length === 0) return "神明暂未降示，请稍后再问。";
  if (answers.length === 1) return answers[0];

  const availableAnswers = previousAnswer
    ? answers.filter((answer) => answer !== previousAnswer)
    : answers;

  return availableAnswers[Math.floor(Math.random() * availableAnswers.length)];
}

export function tossDivinationCups(): CupResult {
  const firstCup = Math.random() < 0.5 ? "正" : "反";
  const secondCup = Math.random() < 0.5 ? "正" : "反";

  if (firstCup !== secondCup) return "阳杯";
  return firstCup === "正" ? "笑杯" : "阴杯";
}

export function getCupMeaning(result: CupResult): string {
  if (result === "阳杯") return "一正一反，神意已准。本轮答案成立，请安心收束。";
  if (result === "阴杯") return "两反落地，神意未允。此问尚有阻滞，可重新请示。";
  return "两正相照，神明含笑未明。此答未定，可重新请示。";
}
