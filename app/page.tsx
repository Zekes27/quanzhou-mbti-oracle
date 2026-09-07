"use client";
/* eslint-disable @next/next/no-img-element -- packaged transparent artwork is rendered at intrinsic proportions. */

import { useEffect, useMemo, useRef, useState } from "react";
import {
  assets,
  completeMbti,
  groups,
  type CupResultKey,
  type DeityGroup,
  type OracleVariant,
} from "@/data/assets";
import type { MbtiType } from "@/data/deities";

type Step =
  | "home"
  | "entry"
  | "select"
  | "detail"
  | "question"
  | "oracle"
  | "cup-loading"
  | "cup-result"
  | "save";

type CardDirection = "next" | "previous";

type OracleRevealPhase =
  | "idle"
  | "page-transition"
  | "drawing"
  | "ready";

const variants: OracleVariant[] = ["01", "02", "03"];

function randomVariant(previous?: OracleVariant): OracleVariant {
  const options = previous
    ? variants.filter((variant) => variant !== previous)
    : variants;

  return options[Math.floor(Math.random() * options.length)];
}

function randomCupResult(): CupResultKey {
  const value = Math.random();

  if (value < 0.5) return "yang";
  if (value < 0.75) return "yin";

  return "smile";
}

function AssetButton({
  src,
  alt,
  onClick,
  disabled = false,
  className = "",
  style,
}: {
  src: string;
  alt: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <button
      type="button"
      aria-label={alt}
      disabled={disabled}
      onClick={onClick}
      className={`asset-button ${className}`}
      style={style}
    >
      <img src={src} alt="" />
    </button>
  );
}

function BackButton({
  src,
  onClick,
}: {
  src: string;
  onClick: () => void;
}) {
  return (
    <AssetButton
      src={src}
      alt="返回上一级"
      onClick={onClick}
      className="back-button"
    />
  );
}

function MissingAsset({
  mbti,
  onBack,
}: {
  mbti: MbtiType;
  onBack: () => void;
}) {
  return (
    <div className="missing-card">
      <strong>{mbti}</strong>

      <p>
        该神明的下游视觉素材尚未提供，本阶段不生成替代图。
      </p>

      <button
        type="button"
        onClick={onBack}
      >
        返回选择
      </button>
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState<Step>("home");
  const [homeReady, setHomeReady] = useState(false);
  const [isHomeExiting, setIsHomeExiting] = useState(false);

  const [entryTransitionGroup, setEntryTransitionGroup] =
    useState<DeityGroup | null>(null);

  const [isSelectReturning, setIsSelectReturning] =
    useState(false);

  const [detailTransitionMbti, setDetailTransitionMbti] =
    useState<MbtiType | null>(null);

  const [isDetailReturning, setIsDetailReturning] =
    useState(false);

const [
  isQuestionTransitioning,
  setIsQuestionTransitioning,
] = useState(false);

  const [group, setGroup] =
    useState<DeityGroup | null>(null);

  const [mbti, setMbti] =
    useState<MbtiType | null>(null);

  const [question, setQuestion] = useState("");

  const [variant, setVariant] =
    useState<OracleVariant | null>(null);

const [
  oracleRevealPhase,
  setOracleRevealPhase,
] = useState<OracleRevealPhase>("idle");

  const [cupResult, setCupResult] =
    useState<CupResultKey | null>(null);

const [
  isCupResultTransitioning,
  setIsCupResultTransitioning,
] = useState(false);

  const [cardOrder, setCardOrder] =
    useState<MbtiType[]>([]);

  const [cardDirection, setCardDirection] =
    useState<CardDirection | null>(null);

const [isSaveTransitioning, setIsSaveTransitioning] =
  useState(false);

  const pointerStart =
    useRef<{ x: number; y: number } | null>(null);

  const groupAssets = group
    ? assets.select(group)
    : null;

  const completeGroup = useMemo(
    () =>
      group
        ? groups[group].filter((type) =>
            completeMbti.has(type),
          )
        : [],
    [group],
  );

  useEffect(() => {
  if (step !== "cup-loading") return;

  /*
   * 3秒投掷动画＋0.5秒静止停留，
   * 然后启动迷雾，但暂不直接切换页面。
   */
  const timer = window.setTimeout(() => {
    setCupResult(randomCupResult());
    setIsCupResultTransitioning(true);
  }, 3500);

  return () => {
    window.clearTimeout(timer);
  };
}, [step]);

useEffect(() => {
  if (!isCupResultTransitioning) return;

  /*
   * 迷雾动画总长2600ms。
   * 1300ms时雾气完全遮住页面，
   * 此时在雾后切换到结果页。
   */
  const switchTimer =
    window.setTimeout(() => {
      setStep("cup-result");
    }, 1300);

  const finishTimer =
    window.setTimeout(() => {
      setIsCupResultTransitioning(false);
    }, 2600);

  return () => {
    window.clearTimeout(switchTimer);
    window.clearTimeout(finishTimer);
  };
}, [isCupResultTransitioning]);

  useEffect(() => {
    if (step !== "home") return;

    setHomeReady(false);

    const timer = window.setTimeout(
      () => {
        setHomeReady(true);
      },
      assets.home.timing.completeAt,
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [step]);

  useEffect(() => {
    if (!isHomeExiting) return;

    const timer = window.setTimeout(() => {
      setStep("entry");
      setIsHomeExiting(false);
    }, 2600);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isHomeExiting]);

useEffect(() => {
  if (!isQuestionTransitioning) return;

  const timer = window.setTimeout(() => {
    setStep("question");
    setIsQuestionTransitioning(false);
  }, 680);

  return () => {
    window.clearTimeout(timer);
  };
}, [isQuestionTransitioning]);

useEffect(() => {
  if (
    oracleRevealPhase !==
    "page-transition"
  ) {
    return;
  }

  const timer = window.setTimeout(() => {
    setStep("oracle");
    setOracleRevealPhase("drawing");
  }, 680);

  return () => {
    window.clearTimeout(timer);
  };
}, [oracleRevealPhase]);

  useEffect(() => {
    if (!entryTransitionGroup) return;

    const timer = window.setTimeout(() => {
      setStep("select");
      setEntryTransitionGroup(null);
    }, 520);

    return () => {
      window.clearTimeout(timer);
    };
  }, [entryTransitionGroup]);

  useEffect(() => {
    if (!isSelectReturning) return;

    const timer = window.setTimeout(() => {
      setStep("entry");
      setIsSelectReturning(false);
    }, 480);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isSelectReturning]);

  useEffect(() => {
    if (!detailTransitionMbti) return;

    const timer = window.setTimeout(() => {
      setStep("detail");
      setDetailTransitionMbti(null);
    }, 1900);

    return () => {
      window.clearTimeout(timer);
    };
  }, [detailTransitionMbti]);

  useEffect(() => {
    if (!isDetailReturning) return;

    const timer = window.setTimeout(() => {
      setStep("select");
      setIsDetailReturning(false);
    }, 520);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isDetailReturning]);

useEffect(() => {
  if (!isSaveTransitioning) return;

  const timer = window.setTimeout(() => {
    setStep("save");
    setIsSaveTransitioning(false);
  }, 520);

  return () => {
    window.clearTimeout(timer);
  };
}, [isSaveTransitioning]);

  function beginGroup(nextGroup: DeityGroup) {
    setGroup(nextGroup);
    setMbti(null);
    setEntryTransitionGroup(nextGroup);
  }

  function chooseMbti(nextMbti: MbtiType) {
    setMbti(nextMbti);

    const available = completeGroup;
    const start = available.indexOf(nextMbti);

    setCardOrder(
      start < 0
        ? []
        : [
            ...available.slice(start),
            ...available.slice(0, start),
          ],
    );

    setCardDirection(null);
    setDetailTransitionMbti(nextMbti);
  }

  function moveCard(direction: CardDirection) {
  if (
    cardDirection ||
    detailTransitionMbti ||
    isDetailReturning ||
    cardOrder.length < 2
  ) {
    return;
  }

  setCardDirection(direction);
}

function finishCardMove() {
  if (!cardDirection) return;

  setCardOrder((current) => {
    const next =
      cardDirection === "next"
        ? [...current.slice(1), current[0]]
        : [
            current[current.length - 1],
            ...current.slice(0, -1),
          ];

    setMbti(next[0]);

    return next;
  });

  setCardDirection(null);
}

  function onCardPointerDown(
    event: React.PointerEvent<HTMLButtonElement>,
  ) {
    if (
      cardDirection ||
      detailTransitionMbti
    ) {
      return;
    }

    pointerStart.current = {
      x: event.clientX,
      y: event.clientY,
    };

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );
  }

  function onCardPointerUp(
    event: React.PointerEvent<HTMLButtonElement>,
  ) {
    const start = pointerStart.current;

    pointerStart.current = null;

    if (
      !start ||
      cardDirection ||
      detailTransitionMbti
    ) {
      return;
    }

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;

    if (
      Math.abs(dx) >= 42 &&
      Math.abs(dx) > Math.abs(dy)
    ) {
      moveCard(
        dx < 0
          ? "next"
          : "previous",
      );

      return;
    }

    if (
      Math.abs(dx) < 12 &&
      Math.abs(dy) < 12
    ) {
      moveCard("next");
    }
  }

  function beginOracleReveal() {
  setVariant(randomVariant());
  setCupResult(null);
  setOracleRevealPhase(
    "page-transition",
  );
}

function draw(next = false) {
  setVariant(
    randomVariant(
      next && variant
        ? variant
        : undefined,
    ),
  );

  setCupResult(null);
  setOracleRevealPhase("ready");
  setStep("oracle");
}

/* 在这里添加 */
function enterSavePage() {
  if (isSaveTransitioning) return;

  setIsSaveTransitioning(true);
}

const carouselCards = cardOrder.length
  ? ([
      ["far-left", -2],
      ["left", -1],
      ["center", 0],
      ["right", 1],
      ["far-right", 2],
    ] as const).map(([slot, offset]) => ({
      slot,
      card:
        cardOrder[
          (offset + cardOrder.length) %
            cardOrder.length
        ],
    }))
  : [];

  return (
    <main className="app-shell">
      {step === "home" && (
        <section
          className={`page home-page${
            isHomeExiting
              ? " home-page-exiting"
              : ""
          }`}
          aria-busy={!homeReady}
          style={{
            backgroundImage: `url(${assets.home.background})`,
          }}
        >
          <div
            className="home-deities"
            aria-hidden="true"
          >
            {assets.home.deities.map(
              (deity) => (
                <img
                  key={deity.mbti}
                  src={deity.src}
                  alt=""
                  style={{
                    top: `${
                      (deity.y / 3550) *
                      100
                    }%`,
                    left: `${
                      (deity.x / 1638) *
                      100
                    }%`,
                    width: `${
                      (deity.width / 1638) *
                      100
                    }%`,
                    zIndex: deity.zIndex,
                    rotate:
                      `${deity.rotate}deg`,
                    animationName:
                      deity.animation,
                    animationDelay:
                      `${deity.delay}ms`,
                    animationDuration:
                      `${assets.home.timing.deityDuration}ms`,
                  }}
                />
              ),
            )}
          </div>

          <img
            className="home-title"
            src={assets.home.title}
            alt="与神对话"
            style={{
              animationDelay:
                `${assets.home.timing.titleDelay}ms`,
            }}
          />

          <div
            className="home-fish"
            aria-hidden="true"
          >
            {assets.home.fish.map(
              (fish) => (
                <img
                  key={fish.side}
                  src={fish.src}
                  alt=""
                  style={{
                    top: `${
                      (fish.y / 3550) *
                      100
                    }%`,
                    left: `${
                      (fish.x / 1638) *
                      100
                    }%`,
                    width: `${
                      (fish.width / 1638) *
                      100
                    }%`,
                    zIndex: fish.zIndex,
                    animationDelay:
                      `${assets.home.timing.buttonDelay}ms`,
                  }}
                />
              ),
            )}
          </div>

          <img
            className="home-subtitle"
            src={assets.home.subtitle}
            alt=""
            style={{
              animationDelay:
                `${assets.home.timing.buttonDelay}ms`,
            }}
          />

          <AssetButton
            src={assets.home.start}
            alt="开始"
            disabled={
              !homeReady ||
              isHomeExiting
            }
            onClick={() => {
              setIsHomeExiting(true);
            }}
            className="home-start"
            style={{
              animationDelay:
                `${assets.home.timing.buttonDelay}ms`,
            }}
          />
        </section>
      )}

      {(step === "entry" ||
        isHomeExiting ||
        isSelectReturning) && (
        <section
          className={`page entry-page${
            isHomeExiting
              ? " entry-page-revealing"
              : ""
          }${
            entryTransitionGroup
              ? " entry-page-sliding-out"
              : ""
          }${
            isSelectReturning
              ? " entry-page-sliding-in"
              : ""
          }`}
          aria-hidden={
            isHomeExiting ||
            isSelectReturning ||
            undefined
          }
          style={{
            backgroundImage: `url(${assets.home.background})`,
          }}
        >
          <div
            className="decor-layer"
            aria-hidden="true"
          >
            {assets.entry.decor.map(
              (decor) => (
                <img
                  key={decor.id}
                  src={decor.src}
                  alt=""
                  style={{
                    top: `${
                      (decor.y / 3550) *
                      100
                    }%`,
                    left: `${
                      (decor.x / 1638) *
                      100
                    }%`,
                    width: `${
                      (decor.width / 1638) *
                      100
                    }%`,
                    zIndex:
                      decor.zIndex,
                  }}
                />
              ),
            )}
          </div>

          {assets.entry.booklets.map(
            (booklet) => (
              <button
                type="button"
                disabled={
                  isHomeExiting ||
                  Boolean(
                    entryTransitionGroup,
                  )
                }
                key={booklet.group}
                className={`booklet${
                  entryTransitionGroup ===
                  booklet.group
                    ? " booklet-selected"
                    : ""
                }`}
                style={{
                  top: `${
                    (booklet.y / 3550) *
                    100
                  }%`,
                  left: `${
                    (booklet.x / 1638) *
                    100
                  }%`,
                  width: `${
                    (booklet.width /
                      1638) *
                    100
                  }%`,
                  zIndex:
                    booklet.zIndex,
                }}
                onClick={() => {
                  beginGroup(
                    booklet.group as DeityGroup,
                  );
                }}
              >
                <img
                  src={booklet.src}
                  alt={`进入 ${booklet.group} 神`}
                />
              </button>
            ),
          )}

          <BackButton
            src={assets.navigation.back}
            onClick={() => {
              setStep("home");
            }}
          />
        </section>
      )}

      {(isHomeExiting ||
  isCupResultTransitioning) && (
  <div
    className="mist-transition"
    aria-hidden="true"
  >
    {Array.from(
      { length: 12 },
      (_, index) => (
        <span key={index} />
      ),
    )}
  </div>
)}

      {(step === "select" ||
        Boolean(entryTransitionGroup) ||
        isDetailReturning) &&
        group &&
        groupAssets && (
          <section
            className={`page select-page${
              entryTransitionGroup
                ? " select-page-sliding-in"
                : ""
            }${
              isSelectReturning
                ? " select-page-sliding-out"
                : ""
            }${
              detailTransitionMbti
                ? " select-page-to-detail"
                : ""
            }${
              isDetailReturning
                ? " select-page-from-detail"
                : ""
            }`}
            style={{
              backgroundImage: `url(${groupAssets.background})`,
            }}
          >
            <BackButton
              src={groupAssets.back}
              onClick={() => {
                setIsSelectReturning(true);
              }}
            />

            <img
              className="select-title"
              src={groupAssets.title}
              alt={`选择 ${group} 神 MBTI`}
            />

            <div className="mbti-grid">
              {groups[group].map(
                (type) => {
                  const placement =
                    groupAssets.placements[
                      type as keyof typeof groupAssets.placements
                    ]!;

                  return (
                    <button
                      type="button"
                      key={type}
                      onClick={() => {
                        chooseMbti(type);
                      }}
                      style={{
                        top: `${
                          (placement.y /
                            3550) *
                          100
                        }%`,
                        left: `${
                          (placement.x /
                            1638) *
                          100
                        }%`,
                        width: `${
                          (placement.width /
                            1638) *
                          100
                        }%`,
                      }}
                    >
                      <img
                        src={groupAssets.card(
                          type,
                        )}
                        alt={type}
                      />
                    </button>
                  );
                },
              )}
            </div>
          </section>
        )}

      {(step === "detail" ||
        Boolean(detailTransitionMbti)) &&
        mbti && (
          <section
            className={`page detail-page${
  detailTransitionMbti
    ? " detail-page-entering"
    : ""
}${
  isDetailReturning
    ? " detail-page-returning"
    : ""
}${
  isQuestionTransitioning
    ? " detail-page-to-question"
    : ""
}`}
          >
            <div
              className="detail-background"
              style={{
                backgroundImage: `url(${assets.detail.background})`,
              }}
            />

            <BackButton
  src={assets.detail.back}
  onClick={() => {
    if (
      cardDirection ||
      detailTransitionMbti ||
      isQuestionTransitioning
    ) {
      return;
    }

    setIsDetailReturning(true);
  }}
/>

            {completeMbti.has(mbti) &&
            cardOrder.length ? (
              <>
                <div
  className={`card-stack${
    cardDirection
      ? ` card-stack-${cardDirection}`
      : ""
  }`}
  aria-live="polite"
  onAnimationEnd={(event) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.classList.contains(
        "deity-card-center",
      )
    ) {
      finishCardMove();
    }
  }}
>
  {carouselCards.map(({ slot, card }) => {
    const isCenter = slot === "center";

    return (
      <button
        type="button"
        key={slot}
        className={`deity-card deity-card-${slot}`}
        aria-label={
          isCenter
            ? `${card} 神明详情，点击或左右滑动切换`
            : undefined
        }
        aria-hidden={!isCenter || undefined}
        tabIndex={isCenter ? 0 : -1}
        disabled={
          !isCenter ||
          Boolean(cardDirection) ||
          Boolean(detailTransitionMbti)
        }
        onPointerDown={
          isCenter
            ? onCardPointerDown
            : undefined
        }
        onPointerUp={
          isCenter
            ? onCardPointerUp
            : undefined
        }
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
      >
        <img
          className={
            isCenter
              ? "stack-main"
              : "stack-back"
          }
          src={assets.detail.card(card)}
          alt={
            isCenter
              ? `${card} 神明详情`
              : ""
          }
        />
      </button>
    );
  })}
</div>

                <AssetButton
  src={assets.detail.choose}
  alt="选择祂"
  onClick={() => {
    if (
      cardDirection ||
      detailTransitionMbti ||
      isDetailReturning ||
      isQuestionTransitioning
    ) {
      return;
    }

    setMbti(cardOrder[0]);
    setIsQuestionTransitioning(true);
  }}
  className="wide-action"
/>
              </>
            ) : (
              <MissingAsset
                mbti={mbti}
                onBack={() => {
                  setStep("select");
                }}
              />
            )}
          </section>
        )}

      {(step === "question" ||
  isQuestionTransitioning) &&
  mbti && (
    <section
      className={`page question-page${
  isQuestionTransitioning
    ? " question-page-entering"
    : ""
}${
  oracleRevealPhase ===
  "page-transition"
    ? " question-page-to-oracle"
    : ""
}`}
            style={{
              backgroundImage: `url(${assets.question.background})`,
            }}
          >
            <BackButton
              src={assets.navigation.back}
              onClick={() => {
                setStep("detail");
              }}
            />

            <img
              className="question-stage"
              src={assets.question.stage(
                mbti,
              )}
              alt={`${mbti} 神龛`}
            />

            <div className="question-input">
              <img
                src={
                  assets.question.input
                }
                alt=""
              />

              <textarea
                value={question}
                onChange={(event) => {
                  setQuestion(
                    event.target.value,
                  );
                }}
                placeholder="请写下你的问题？"
                maxLength={120}
              />
            </div>

            <AssetButton
  src={assets.question.confirm}
  alt="确认提问"
  disabled={
    !question.trim() ||
    oracleRevealPhase !== "idle"
  }
  onClick={() => {
    if (!question.trim()) return;

    beginOracleReveal();
  }}
  className="wide-action question-confirm"
/>
          </section>
        )}

      {(step === "oracle" ||
  oracleRevealPhase ===
    "page-transition") &&
  mbti &&
  variant && (
    <section
  className={`page oracle-page${
    oracleRevealPhase ===
    "page-transition"
      ? " oracle-page-entering"
      : ""
  }${
    oracleRevealPhase === "drawing"
      ? " oracle-page-drawing"
      : ""
  }${
    oracleRevealPhase === "ready"
      ? " oracle-page-ready"
      : ""
  }${
    isSaveTransitioning
      ? " save-transition-source"
      : ""
  }`}
      style={{
        backgroundImage: `url(${assets.oracle.background})`,
      }}
    >
      {oracleRevealPhase === "ready" && (
        <BackButton
          src={assets.oracle.back}
          onClick={() => {
            setOracleRevealPhase("idle");
            setStep("question");
          }}
        />
      )}

      {(oracleRevealPhase === "drawing" ||
        oracleRevealPhase ===
          "ready") && (
        <img
          className="oracle-paper"
          src={assets.oracle.paper(
            mbti,
            variant,
          )}
          alt={`${mbti} 第 ${variant} 支签`}
          onAnimationEnd={(event) => {
            if (
              event.animationName ===
                "oracle-paper-draw-up" &&
              oracleRevealPhase ===
                "drawing"
            ) {
              setOracleRevealPhase(
                "ready",
              );
            }
          }}
        />
      )}

      {oracleRevealPhase === "ready" && (
        <div className="dual-actions oracle-actions">
          <AssetButton
  src={assets.oracle.approve}
  alt="认可"
  onClick={enterSavePage}
/>

          <AssetButton
            src={assets.oracle.verify}
            alt="我要验牌"
            onClick={() => {
              setStep("cup-loading");
            }}
          />
        </div>
      )}
    </section>
  )}

      {step === "cup-loading" && (
        <section className="page cup-loading-page">
          <img
            className="cup-glow"
            src={assets.cupLoading.glow}
            alt=""
          />

          <img
  className="cup-title"
  src={assets.cupLoading.title}
  alt="虔诚中"
/>

<div
  className="cup-progress"
  aria-hidden="true"
>
  <span className="cup-progress-dot cup-progress-dot-left" />
  <span className="cup-progress-dot cup-progress-dot-middle" />
  <span className="cup-progress-dot cup-progress-dot-right" />
</div>

<div
  className="cups"
  aria-hidden="true"
>
  <img
    className="cup-piece cup-piece-left"
    src={assets.cupLoading.left}
    alt=""
  />

  <img
    className="cup-piece cup-piece-right"
    src={assets.cupLoading.right}
    alt=""
  />
</div>
        </section>
      )}

      {step === "cup-result" &&
        cupResult && (
          <section
  className={`page result-page${
    isSaveTransitioning
      ? " save-transition-source"
      : ""
  }`}
  style={{
    backgroundImage: `url(${assets.cupResult.background})`,
  }}
>
            <BackButton
              src={assets.cupResult.back}
              onClick={() => {
                setStep("oracle");
              }}
            />

            {mbti && variant && (
              <img
                className="result-oracle-paper"
                src={assets.oracle.paper(
                  mbti,
                  variant,
                )}
                alt="当前签文"
              />
            )}

            <div className="result-graphic-panel">
  <img
    className="result-graphic"
    src={assets.cupResult.graphic(cupResult)}
    alt={
      cupResult === "yang"
        ? "阳杯"
        : cupResult === "yin"
          ? "阴杯"
          : "笑杯"
    }
  />
</div>

            <div className="dual-actions result-actions">
              <AssetButton
  src={assets.cupResult.approve}
  alt="认可"
  onClick={enterSavePage}
/>

              <AssetButton
                src={
                  assets.cupResult.again
                }
                alt="再来一次"
                onClick={() => {
                  draw(true);
                }}
              />
            </div>
                    </section>
        )}

      {/* 左滑过渡期间，只显示保存页背景 */}
      {isSaveTransitioning && (
        <section
          className="page save-transition-background"
          style={{
            backgroundImage: `url(${assets.save.background})`,
          }}
          aria-hidden="true"
        />
      )}

      {step === "save" &&
  mbti &&
  variant && (
    <section
      className="page save-page save-page-entered"
      style={{
        backgroundImage: `url(${assets.save.background})`,
      }}
    >
      <BackButton
        src={assets.save.back}
        onClick={() => {
          setStep(
            cupResult
              ? "cup-result"
              : "oracle",
          );
        }}
      />

      <img
        className="save-card save-card-dropping"
        src={assets.save.card(
          mbti,
          variant,
        )}
        alt={`${mbti} 最终保存卡 ${variant}`}
      />

      <img
        className="save-tip save-tip-delayed"
        src={assets.save.tip}
        alt="长按保存图片"
      />
    </section>
  )}
    </main>
  );
}