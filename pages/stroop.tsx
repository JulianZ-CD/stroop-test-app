import { useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";
import { useTranslation } from "@/contexts/LanguageContext";
// import {useState} from 'react';
import { ColorButtons } from "@/components/stroop/ColorButtons";
import { ResultsView } from "@/components/stroop/ResultsView";
import { UsernameInput } from "@/components/stroop/UsernameInput";
import { MusicSelection } from "@/components/stroop/MusicSelection";
import { useStroopGame } from "@/hooks/useStroopGame";

export const COLORS = {
  RED: "#ff0000",
  YELLOW: "#ffff00",
  BLUE: "#0000ff",
  BLACK: "#000000",
  GREEN: "#008000",
} as const;

export const COLOR_NAMES = ["red", "yellow", "blue", "black", "green"] as const;
export const TRIALS_PER_SERIES = 10;

export const MUSIC_OPTIONS = {
  MOZART: {
    name: "Mozart",
    url: "/music/(KV 488) Piano Concerto n° 23_compressed.mp3",
  },
  POP: {
    name: "Pop_Music",
    url: "/music/Lead Me On.mp3",
  },
  NO: {
    name: "No_Music",
    url: null,
  },
} as const;

export type ColorValue = (typeof COLORS)[keyof typeof COLORS];
export type ColorName = (typeof COLOR_NAMES)[number];
export type MusicOption = keyof typeof MUSIC_OPTIONS;

export interface Word {
  word: ColorName;
  textColor: ColorValue;
  correctColor: ColorValue;
}

export interface Results {
  rightFirstSeries: number;
  rightSecondSeries: number;
  mistakesFirstSeries: number;
  mistakesSecondSeries: number;
  minTimeFirstSeries: number;
  minTimeSecondSeries: number;
  maxTimeFirstSeries: number;
  maxTimeSecondSeries: number;
  responseTimes: number[];
  selectedMusic: MusicOption | null;
  username: string;
}

export default function StroopTest() {
  const { user } = useAuthenticator();
  const router = useRouter();
  const { t } = useTranslation();

  const {
    testState,
    currentWord,
    results,
    startTime,
    username,
    usernameError,
    selectedMusic,
    musicError,
    trialCount,
    handleColorClick,
    setUsername,
    handleMusicSelection,
    startTest,
  } = useStroopGame(user.username);

  const getColorTranslationKey = (colorName: string): string =>
    `stroopTest.colors.${colorName.toLowerCase()}`;

  if (testState === "completed") {
    return (
      <main>
        <div className="stroop-container">
          <h1 className="stroop-title">{t("stroopTest.title")}</h1>
          <ResultsView
            results={results}
            startTime={startTime}
            onStartNewTest={() => window.location.reload()}
            onBackToHome={() => router.push("/")}
          />
        </div>
      </main>
    );
  }

  if (testState === "idle") {
    return (
      <main>
        <div className="stroop-container">
          <h1 className="stroop-title">{t("stroopTest.title")}</h1>
          <div className="result-container">
            <p className="instructions">
              {t("stroopTest.instructions.part1")}
              <br />
              {t("stroopTest.instructions.part2")}
              <br />
              {t("stroopTest.instructions.part3")}
              <br />
              {t("stroopTest.instructions.totalTrials", {
                total: TRIALS_PER_SERIES * 2,
                perSeries: TRIALS_PER_SERIES,
              })}
            </p>

            <UsernameInput
              username={username}
              usernameError={usernameError}
              onUsernameChange={setUsername}
            />

            <MusicSelection
              selectedMusic={selectedMusic}
              onMusicSelect={handleMusicSelection}
              musicOptions={MUSIC_OPTIONS}
              musicError={musicError}
            />

            <div className="navigation-buttons">
              <button
                onClick={startTest}
              >
                {t("stroopTest.buttons.start")}
              </button>
              <button className="home-button" onClick={() => router.push("/")}>
                {t("common.backToHome")}
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="stroop-container">
        <h1 className="stroop-title">{t("stroopTest.title")}</h1>
        <div className="stroop-progress">
          {t(
            testState === "first"
              ? "stroopTest.progress.practiceRound"
              : "stroopTest.progress.testRound"
          )}
          :{" "}
          {t("stroopTest.progress.trial", {
            current: (trialCount % TRIALS_PER_SERIES) + 1,
            total: TRIALS_PER_SERIES,
          })}
        </div>

        <div className="stroop-word" style={{ color: currentWord.textColor }}>
          {t(getColorTranslationKey(currentWord.word))}
        </div>

        <ColorButtons
          colors={COLORS}
          onColorClick={handleColorClick}
          getColorTranslationKey={getColorTranslationKey}
        />

        <button className="home-button" onClick={() => router.push("/")}>
          {t("common.backToHome")}
        </button>
      </div>
    </main>
  );
}
