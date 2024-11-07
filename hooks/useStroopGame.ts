import { useState, useCallback, useRef, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useTranslation } from "@/contexts/LanguageContext";
import {
  Word,
  Results,
  MusicOption,
  ColorValue,
  COLOR_NAMES,
  TRIALS_PER_SERIES,
  COLORS,
  MUSIC_OPTIONS,
  MAX_MISTAKES_ALLOWED,
} from "@/pages/stroop";

const client = generateClient<Schema>();

interface PreviousState {
  wordIndex: number;
  colorIndex: number;
}

interface StroopTestModel {
  userId: string;
  username: string;
  timestamp: string;
  rightFirstSeries: number;
  rightSecondSeries: number;
  mistakesFirstSeries: number;
  mistakesSecondSeries: number;
  averageResponsePercent: number;
  minTimeFirstSeries: number;
  minTimeSecondSeries: number;
  maxTimeFirstSeries: number;
  maxTimeSecondSeries: number;
  averageResponseTimeFirstSeries: number;
  averageResponseTimeSecondSeries: number;
  selectedMusic: MusicOption | null;
  avgResponseDelay: number;
  testingTime: number;
  gender: string;
}

export function useStroopGame(userId: string) {
  // State declarations
  const [testState, setTestState] = useState<"idle" | "first" | "second" | "completed">("idle");
  const { t } = useTranslation();
  const [selectedMusic, setSelectedMusic] = useState<MusicOption | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [musicError, setMusicError] = useState<string>("");
  const [trialCount, setTrialCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [previousState, setPreviousState] = useState<PreviousState>({
    wordIndex: -1,
    colorIndex: -1,
  });
  const [currentWord, setCurrentWord] = useState<Word>({
    word: "red",
    textColor: COLORS.RED,
    correctColor: COLORS.RED,
  });
  const [results, setResults] = useState<Results>({
    rightFirstSeries: 0,
    rightSecondSeries: 0,
    mistakesFirstSeries: 0,
    mistakesSecondSeries: 0,
    minTimeFirstSeries: Number.MAX_VALUE,
    minTimeSecondSeries: Number.MAX_VALUE,
    maxTimeFirstSeries: 0,
    maxTimeSecondSeries: 0,
    responseTimes: [],
    selectedMusic: null,
    username: "",
    gender: "",
  });
  const hasShownError = useRef(false);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [genderError, setGenderError] = useState("");

  const handleMusicSelection = useCallback((music: MusicOption) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setSelectedMusic(music);
    setMusicError("");
  }, []);

  useEffect(() => {
    if (selectedMusic && MUSIC_OPTIONS[selectedMusic].url) {
      const audio = new Audio(MUSIC_OPTIONS[selectedMusic].url);
      audio.loop = true;
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [selectedMusic]);

  const saveResults = useCallback(
    async (latestResults: Results) => {
      console.log("=== Save Results Debug ===", {
        resultsBeforeSave: latestResults,
      });

      try {
        const totalTime = (Date.now() - startTime) / 1000; // Convert to seconds
        const testData: StroopTestModel = {
          userId,
          username: latestResults.username,
          gender: latestResults.gender,
          timestamp: new Date().toISOString(),
          rightFirstSeries: latestResults.rightFirstSeries,
          rightSecondSeries: latestResults.rightSecondSeries,
          mistakesFirstSeries: latestResults.mistakesFirstSeries,
          mistakesSecondSeries: latestResults.mistakesSecondSeries,
          averageResponsePercent:
            ((latestResults.rightFirstSeries + latestResults.rightSecondSeries) /
              (TRIALS_PER_SERIES * 2)) *
            100,
          minTimeFirstSeries: Math.round((latestResults.minTimeFirstSeries / 1000) * 100) / 100, // Convert to seconds with 2 decimal places
          minTimeSecondSeries: Math.round((latestResults.minTimeSecondSeries / 1000) * 100) / 100,
          maxTimeFirstSeries: Math.round((latestResults.maxTimeFirstSeries / 1000) * 100) / 100,
          maxTimeSecondSeries: Math.round((latestResults.maxTimeSecondSeries / 1000) * 100) / 100,
          averageResponseTimeFirstSeries:
            Math.round(
              (latestResults.responseTimes.slice(0, TRIALS_PER_SERIES).reduce((a, b) => a + b, 0) /
                TRIALS_PER_SERIES /
                1000) *
                100
            ) / 100,
          averageResponseTimeSecondSeries:
            Math.round(
              (latestResults.responseTimes.slice(TRIALS_PER_SERIES).reduce((a, b) => a + b, 0) /
                TRIALS_PER_SERIES /
                1000) *
                100
            ) / 100,
          avgResponseDelay:
            Math.round(
              (latestResults.responseTimes.reduce((a, b) => a + b, 0) /
                (TRIALS_PER_SERIES * 2) /
                1000) *
                100
            ) / 100,
          testingTime: Math.round(totalTime * 100) / 100,
          selectedMusic: latestResults.selectedMusic || "NO",
        };

        await client.models.StroopTest.create(testData);
      } catch (error) {
        console.error("Error saving results:", error);
      }
    },
    [userId, results, startTime]
  );

  const getNextIndex = useCallback((currentIndex: number, excludeIndex: number): number => {
    const possibleIndices = Array.from({ length: COLOR_NAMES.length }, (_, i) => i).filter(
      (i) => i !== currentIndex && i !== excludeIndex
    );
    return possibleIndices[Math.floor(Math.random() * possibleIndices.length)];
  }, []);

  const generateMatchedWord = useCallback(() => {
    const newWordIndex = getNextIndex(previousState.wordIndex, -1);
    const word = COLOR_NAMES[newWordIndex];
    const correctColor = Object.values(COLORS)[newWordIndex] as ColorValue;

    setPreviousState({
      wordIndex: newWordIndex,
      colorIndex: newWordIndex,
    });

    return {
      word,
      textColor: COLORS.BLACK,
      correctColor: correctColor,
    };
  }, [previousState, getNextIndex]);

  const generateMismatchedWord = useCallback(() => {
    const newWordIndex = getNextIndex(previousState.wordIndex, -1);
    const newColorIndex = getNextIndex(previousState.colorIndex, newWordIndex);

    const word = COLOR_NAMES[newWordIndex];
    const correctColor = Object.values(COLORS)[newWordIndex] as ColorValue;
    const textColor = Object.values(COLORS)[newColorIndex] as ColorValue;

    setPreviousState({
      wordIndex: newWordIndex,
      colorIndex: newColorIndex,
    });

    return {
      word,
      textColor,
      correctColor,
    };
  }, [previousState, getNextIndex]);

  const handleColorClick = useCallback(
    async (selectedColor: ColorValue) => {
      const responseTime = Date.now() - startTime;
      const isCorrect = selectedColor === currentWord.correctColor;
      const newTrialCount = trialCount + 1;
      let updatedResults = { ...results };

      await new Promise<void>((resolve) => {
        setResults((prev) => {
          const newResults = { ...prev };
          newResults.responseTimes.push(responseTime);

          if (testState === "first") {
            if (isCorrect) newResults.rightFirstSeries++;
            else newResults.mistakesFirstSeries++;

            if (newResults.mistakesFirstSeries >= MAX_MISTAKES_ALLOWED && !hasShownError.current) {
              hasShownError.current = true;
              alert(t("stroopTest.alerts.tooManyErrors"));
              window.location.reload();
              return prev;
            }

            newResults.minTimeFirstSeries = Math.min(newResults.minTimeFirstSeries, responseTime);
            newResults.maxTimeFirstSeries = Math.max(newResults.maxTimeFirstSeries, responseTime);
          } else {
            if (isCorrect) {
              newResults.rightSecondSeries++;
            } else newResults.mistakesSecondSeries++;

            if (newResults.mistakesSecondSeries >= MAX_MISTAKES_ALLOWED && !hasShownError.current) {
              hasShownError.current = true;
              alert(t("stroopTest.alerts.tooManyErrors"));
              window.location.reload();
              return prev;
            }
            newResults.minTimeSecondSeries = Math.min(newResults.minTimeSecondSeries, responseTime);
            newResults.maxTimeSecondSeries = Math.max(newResults.maxTimeSecondSeries, responseTime);
          }

          updatedResults = newResults;
          setTimeout(() => resolve(), 0);
          return newResults;
        });
      });

      if (newTrialCount === TRIALS_PER_SERIES * 2) {
        console.log("=== Final Results Debug ===", {
          totalTrials: newTrialCount,
          rightSecondSeries: updatedResults.rightSecondSeries,
          resultsBeforeSave: updatedResults,
        });
        setTestState("completed");
        await saveResults(updatedResults);
        return;
      }

      let nextWord;
      if (newTrialCount === TRIALS_PER_SERIES) {
        setTestState("second");
        setPreviousState({ wordIndex: -1, colorIndex: -1 });
        nextWord = generateMismatchedWord();
      } else if (newTrialCount === TRIALS_PER_SERIES * 2) {
        console.log("=== Final Results Debug ===", {
          totalTrials: newTrialCount,
          rightSecondSeries: updatedResults.rightSecondSeries,
          resultsBeforeSave: updatedResults,
        });
        setTestState("completed");
        await saveResults(updatedResults);
        return;
      } else {
        nextWord = testState === "first" ? generateMatchedWord() : generateMismatchedWord();
      }

      setCurrentWord(nextWord);
      setTrialCount(newTrialCount);
      setStartTime(Date.now());
    },
    [
      currentWord,
      testState,
      startTime,
      trialCount,
      generateMatchedWord,
      generateMismatchedWord,
      saveResults,
    ]
  );

  const validateUsername = useCallback(
    async (name: string) => {
      if (!name.trim()) {
        setUsernameError(t("stroopTest.errors.usernameRequired"));
        return false;
      }

      try {
        const existingTests = await client.models.StroopTest.list({
          filter: {
            and: [
              {
                userId: {
                  eq: userId,
                },
              },
              {
                username: {
                  eq: name,
                },
              },
            ],
          },
        });

        if (existingTests.data.length > 0) {
          setUsernameError(t("stroopTest.errors.usernameTaken"));
          return false;
        }

        setUsernameError("");
        return true;
      } catch (error) {
        console.error("Error checking username:", error);
        setUsernameError(t("stroopTest.errors.checkingUsername"));
        return false;
      }
    },
    [t, userId]
  );

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    setGenderError("");
  };

  const startTest = useCallback(async () => {
    let hasError = false;

    if (!username.trim()) {
      setUsernameError(t("stroopTest.errors.usernameRequired"));
      hasError = true;
    }

    if (!selectedMusic) {
      setMusicError(t("stroopTest.errors.musicRequired"));
      hasError = true;
    }

    if (!selectedGender) {
      setGenderError(t("stroopTest.errors.genderRequired"));
      hasError = true;
    }

    if (hasError) return;

    if (!(await validateUsername(username))) {
      return;
    }

    try {
      if (audioRef.current) {
        await audioRef.current.play();
      }

      setPreviousState({
        wordIndex: -1,
        colorIndex: -1,
      });
      const firstWord = generateMatchedWord();
      setCurrentWord(firstWord);
      setTestState("first");
      setTrialCount(0);
      setStartTime(Date.now());
      setResults({
        rightFirstSeries: 0,
        rightSecondSeries: 0,
        mistakesFirstSeries: 0,
        mistakesSecondSeries: 0,
        minTimeFirstSeries: Number.MAX_VALUE,
        minTimeSecondSeries: Number.MAX_VALUE,
        maxTimeFirstSeries: 0,
        maxTimeSecondSeries: 0,
        responseTimes: [],
        selectedMusic,
        username,
        gender: selectedGender!,
      });
    } catch (error) {
      console.error("Error starting test:", error);
    }
  }, [generateMatchedWord, selectedMusic, t, username, validateUsername, selectedGender]);

  return {
    testState,
    currentWord,
    results,
    startTime,
    username,
    usernameError,
    musicError,
    selectedMusic,
    trialCount,
    handleColorClick,
    setUsername,
    handleMusicSelection,
    startTest,
    validateUsername,
    selectedGender,
    genderError,
    handleGenderSelect,
  };
}
