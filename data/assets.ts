import type { MbtiType } from "./deities";

// Browser-facing paths mirror the `final_path` column in asset_manifest.csv.
// Keep all asset path construction here so page components never embed filenames.
const ROOT = "/codex-assets";

const asset = (
  manifestPath: string,
) => `${ROOT}/${manifestPath}`;

export type DeityGroup = "i" | "e";

export type OracleVariant =
  | "01"
  | "02"
  | "03";

export type CupResultKey =
  | "yang"
  | "yin"
  | "smile";

export const groups: Record<
  DeityGroup,
  MbtiType[]
> = {
  i: [
    "INTJ",
    "INTP",
    "INFJ",
    "INFP",
    "ISTJ",
    "ISFJ",
    "ISTP",
    "ISFP",
  ],
  e: [
    "ENTJ",
    "ENTP",
    "ENFJ",
    "ENFP",
    "ESTJ",
    "ESFJ",
    "ESTP",
    "ESFP",
  ],
};

export const completeMbti =
  new Set<MbtiType>([
    "INTJ",
    "INTP",
    "INFJ",
    "INFP",
    "ENTJ",
    "ENTP",
    "ENFJ",
    "ESFJ",
  ]);

export const deityCards: Record<
  DeityGroup,
  MbtiType[]
> = {
  i: groups.i.filter((mbti) =>
    completeMbti.has(mbti),
  ),
  e: groups.e.filter((mbti) =>
    completeMbti.has(mbti),
  ),
};

export const homeAnimationOrder = [
  {
    mbti: "ENTP",
    delay: 0,
    animation:
      "home-deity-reveal-left",
  },
  {
    mbti: "ENTJ",
    delay: 300,
    animation:
      "home-deity-reveal-top",
  },
  {
    mbti: "ISTJ",
    delay: 600,
    animation:
      "home-deity-reveal-top",
  },
  {
    mbti: "INFP",
    delay: 900,
    animation:
      "home-deity-reveal-right",
  },
  {
    mbti: "ISTP",
    delay: 1200,
    animation:
      "home-deity-reveal-right",
  },
  {
    mbti: "ESTJ",
    delay: 1500,
    animation:
      "home-deity-reveal-right",
  },
  {
    mbti: "ESFP",
    delay: 1800,
    animation:
      "home-deity-reveal-right",
  },
  {
    mbti: "ENFP",
    delay: 2100,
    animation:
      "home-deity-reveal-right",
  },
  {
    mbti: "ISFP",
    delay: 2400,
    animation:
      "home-deity-reveal-bottom",
  },
  {
    mbti: "INTP",
    delay: 2700,
    animation:
      "home-deity-reveal-bottom",
  },
  {
    mbti: "ESTP",
    delay: 3000,
    animation:
      "home-deity-reveal-left",
  },
  {
    mbti: "ISFJ",
    delay: 3300,
    animation:
      "home-deity-reveal-left",
  },
  {
    mbti: "INTJ",
    delay: 3600,
    animation:
      "home-deity-reveal-left",
  },
  {
    mbti: "ENFJ",
    delay: 3900,
    animation:
      "home-deity-reveal-left",
  },
  {
    mbti: "ESFJ",
    delay: 4200,
    animation:
      "home-deity-reveal-left",
  },
] as const;

export const assets = {
  navigation: {
    back: asset(
      "04_mbti_select_assets/i_group/navigation/03-i-mbti-back-octagon.png",
    ),
  },

  home: {
    reference: asset(
      "01_ui_reference/01_home/01-home-reference.png",
    ),

    background: asset(
      "02_home_assets/background/01-home-oracle-paper-bg.png",
    ),

    title: asset(
      "02_home_assets/text/01-home-title-1.png",
    ),

    subtitle: asset(
      "02_home_assets/text/01-home-title-2.png",
    ),

    start: asset(
      "02_home_assets/buttons/01-home-start-button.png",
    ),

    fish: [
      {
        side: "left",
        src: asset(
          "02_home_assets/decor/01-entry-bg-05.png",
        ),
        x: 320,
        y: 2841,
        width: 213,
        zIndex: 6,
      },
      {
        side: "right",
        src: asset(
          "02_home_assets/decor/01-entry-bg-06.png",
        ),
        x: 1082,
        y: 2840,
        width: 280,
        zIndex: 6,
      },
    ],

    timing: {
      deityDuration: 520,
      titleDelay: 4720,
      buttonDelay: 5520,
      completeAt: 6200,
    },

    deities: [
      {
        mbti: "ENFJ",
        x: 99,
        y: 1506,
        width: 326,
        zIndex: 2,
        rotate: 0,
      },
      {
        mbti: "ENFP",
        x: 1182,
        y: 2136,
        width: 402,
        zIndex: 2,
        rotate: 0,
      },
      {
        mbti: "ENTJ",
        x: 532,
        y: 496,
        width: 326,
        zIndex: 2,
        rotate: 0,
      },
      {
        mbti: "ENTP",
        x: 222,
        y: 663,
        width: 354,
        zIndex: 2,
        rotate: 0,
      },
      {
        mbti: "ESFJ",
        x: 112,
        y: 1105,
        width: 355,
        zIndex: 2,
        rotate: 0,
      },
      {
        mbti: "ESFP",
        x: 1300,
        y: 1833,
        width: 244,
        zIndex: 2,
        rotate: 0,
      },
      {
        mbti: "ESTJ",
        x: 1272,
        y: 1414,
        width: 301,
        zIndex: 2,
        rotate: 0,
      },
      {
        mbti: "ESTP",
        x: 432,
        y: 2456,
        width: 351,
        zIndex: 2,
        rotate: 0,
      },
      {
        mbti: "INFP",
        x: 1113,
        y: 640,
        width: 358,
        zIndex: 2,
        rotate: 0,
      },
      {
        mbti: "INTJ",
        x: 176,
        y: 1892,
        width: 289,
        zIndex: 2,
        rotate: 0,
      },
      {
        mbti: "INTP",
        x: 790,
        y: 2496,
        width: 230,
        zIndex: 2,
        rotate: 0,
      },
      {
        mbti: "ISFJ",
        x: 125,
        y: 2294,
        width: 361,
        zIndex: 2,
        rotate: 0,
      },
      {
        mbti: "ISFP",
        x: 1057,
        y: 2507,
        width: 292,
        zIndex: 2,
        rotate: 0,
      },
      {
        mbti: "ISTJ",
        x: 831,
        y: 495,
        width: 284,
        zIndex: 2,
        rotate: 0,
      },
      {
        mbti: "ISTP",
        x: 1240,
        y: 1043,
        width: 321,
        zIndex: 2,
        rotate: 0,
      },
    ].map((placement) => ({
      ...placement,

      ...homeAnimationOrder.find(
        (item) =>
          item.mbti === placement.mbti,
      )!,

      src: asset(
        `02_home_assets/deities/01-home-deity-${placement.mbti}.png`,
      ),
    })),
  },

  entry: {
    reference: asset(
      "01_ui_reference/02_entry/02-entry-reference.png",
    ),

    booklets: [
      {
        group: "i",
        src: asset(
          "03_entry_assets/booklets/02-entry-i-booklet.png",
        ),
        x: 188,
        y: 530,
        width: 857,
        zIndex: 5,
      },
      {
        group: "e",
        src: asset(
          "03_entry_assets/booklets/02-entry-e-booklet.png",
        ),
        x: 380,
        y: 1728,
        width: 979,
        zIndex: 5,
      },
    ],

    decor: [
      {
        id: "yellow-bloom",
        src: asset(
          "03_entry_assets/decor/02-entry-bg-01.png",
        ),
        x: 1221,
        y: 918,
        width: 196,
        zIndex: 2,
      },
      {
        id: "cyan-small",
        src: asset(
          "03_entry_assets/decor/02-entry-bg-02.png",
        ),
        x: 1358,
        y: 1160,
        width: 121,
        zIndex: 2,
      },
      {
        id: "orange-star",
        src: asset(
          "03_entry_assets/decor/02-entry-bg-03.png",
        ),
        x: 323,
        y: 1659,
        width: 61,
        zIndex: 2,
      },
      {
        id: "yellow-star",
        src: asset(
          "03_entry_assets/decor/02-entry-bg-04.png",
        ),
        x: 1405,
        y: 2735,
        width: 61,
        zIndex: 2,
      },
      {
        id: "yellow-spark",
        src: asset(
          "03_entry_assets/decor/02-entry-bg-05.png",
        ),
        x: 1457,
        y: 2867,
        width: 27,
        zIndex: 2,
      },
      {
        id: "pink-bloom",
        src: asset(
          "03_entry_assets/decor/02-entry-bg-06.png",
        ),
        x: 1257,
        y: 2823,
        width: 171,
        zIndex: 2,
      },
      {
        id: "cyan-large",
        src: asset(
          "03_entry_assets/decor/02-entry-bg-07.png",
        ),
        x: 201,
        y: 1745,
        width: 193,
        zIndex: 2,
      },
    ],
  },

  select: (
    group: DeityGroup,
  ) => ({
    reference: asset(
      `01_ui_reference/0${
        group === "i" ? 3 : 4
      }_${group}_mbti_select/0${
        group === "i" ? 3 : 4
      }-${group}-mbti-select-reference.png`,
    ),

    background: asset(
      `04_mbti_select_assets/${group}_group/background/0${
        group === "i" ? 3 : 4
      }-${group}-mbti-oracle-paper-bg.png`,
    ),

    title: asset(
      `04_mbti_select_assets/${group}_group/text/0${
        group === "i" ? 3 : 4
      }-${group}-mbti-select-title.png`,
    ),

    back: asset(
      `04_mbti_select_assets/${group}_group/navigation/0${
        group === "i" ? 3 : 4
      }-${group}-mbti-back-octagon.png`,
    ),

    card: (
      mbti: MbtiType,
    ) =>
      asset(
        `04_mbti_select_assets/${group}_group/cards/0${
          group === "i" ? 3 : 4
        }-${group}-mbti-${mbti}.png`,
      ),

    placements:
      group === "i"
        ? {
            INTJ: {
              x: 215,
              y: 1206,
              width: 374,
            },
            INFJ: {
              x: 1054,
              y: 1104,
              width: 342,
            },
            ISTJ: {
              x: 661,
              y: 1444,
              width: 322,
            },
            INTP: {
              x: 240,
              y: 1845,
              width: 324,
            },
            ISFP: {
              x: 1125,
              y: 1824,
              width: 273,
            },
            ISFJ: {
              x: 661,
              y: 2129,
              width: 341,
            },
            INFP: {
              x: 241,
              y: 2531,
              width: 322,
            },
            ISTP: {
              x: 1088,
              y: 2458,
              width: 377,
            },
          }
        : {
            ENTJ: {
              x: 240,
              y: 1229,
              width: 324,
            },
            ENFJ: {
              x: 1054,
              y: 1104,
              width: 342,
            },
            ESTJ: {
              x: 661,
              y: 1444,
              width: 322,
            },
            ENTP: {
              x: 215,
              y: 1828,
              width: 374,
            },
            ESFP: {
              x: 1099,
              y: 1798,
              width: 326,
            },
            ESFJ: {
              x: 661,
              y: 2129,
              width: 341,
            },
            ENFP: {
              x: 241,
              y: 2531,
              width: 322,
            },
            ESTP: {
              x: 1088,
              y: 2458,
              width: 377,
            },
          },
  }),

  detail: {
    reference: asset(
      "01_ui_reference/05_deity_detail/05-deity-detail-reference.png",
    ),

    background: asset(
      "05_deity_detail_assets/background/05-oracle-paper-bg.png",
    ),

    back: asset(
      "05_deity_detail_assets/navigation/05-back-octagon.png",
    ),

    choose: asset(
      "05_deity_detail_assets/buttons/05-choose-deity-button.png",
    ),

    card: (
      mbti: MbtiType,
    ) =>
      asset(
        `05_deity_detail_assets/cards/05-deity-card-${mbti}.png`,
      ),
  },

  question: {
    background: asset(
      "06_question_page_assets/background/06-oracle-paper-bg.png",
    ),

    input: asset(
      "06_question_page_assets/input/06-question-input-frame.png",
    ),

    confirm: asset(
      "06_question_page_assets/buttons/06-question-confirm-button.png",
    ),

    stage: (
      mbti: MbtiType,
    ) =>
      asset(
        `06_question_page_assets/stage_frames/06-question-stage-frame-${mbti}.png`,
      ),
  },

  oracle: {
    background: asset(
      "07_oracle_page_assets/background/07-oracle-paper-bg.png",
    ),

    back: asset(
      "07_oracle_page_assets/navigation/07-back-octagon.png",
    ),

    approve: asset(
      "07_oracle_page_assets/buttons/07-oracle-approve-button.png",
    ),

    verify: asset(
      "07_oracle_page_assets/buttons/07-oracle-verify-button.png",
    ),

    paper: (
      mbti: MbtiType,
      variant: OracleVariant,
    ) =>
      asset(
        `07_oracle_page_assets/paper_presets/${mbti}/07-oracle-paper-${mbti}-${variant}.png`,
      ),
  },

  cupLoading: {
    reference: asset(
      "01_ui_reference/08_cup_loading/08-cup-loading-reference.png",
    ),

    glow: asset(
      "08_cup_animation_assets/visual/08-cup-glow.png",
    ),

    left: asset(
      "08_cup_animation_assets/visual/08-cup-left.png",
    ),

    right: asset(
      "08_cup_animation_assets/visual/08-cup-right.png",
    ),

    title: asset(
      "08_cup_animation_assets/text/08-cup-loading-title.png",
    ),
  },

  cupResult: {
    background: asset(
      "09_cup_result_assets/background/09-oracle-paper-bg.png",
    ),

    back: asset(
      "09_cup_result_assets/navigation/09-back-octagon.png",
    ),

    approve: asset(
      "09_cup_result_assets/buttons/09-result-approve-button.png",
    ),

    again: asset(
      "09_cup_result_assets/buttons/09-result-again-button.png",
    ),

    graphic: (
      result: CupResultKey,
    ) =>
      asset(
        `09_cup_result_assets/result_graphics/09-cup-result-${result}.png`,
      ),
  },

  save: {
    background: asset(
      "10_save_page_assets/background/10-oracle-paper-bg.png",
    ),

    back: asset(
      "10_save_page_assets/navigation/10-back-octagon.png",
    ),

    tip: asset(
      "10_save_page_assets/text/10-save-hold-tip.png",
    ),

    card: (
      mbti: MbtiType,
      variant: OracleVariant,
    ) =>
      asset(
        `10_save_page_assets/save_presets/${mbti}/10-deity-${mbti}-${variant}.png`,
      ),
  },
};