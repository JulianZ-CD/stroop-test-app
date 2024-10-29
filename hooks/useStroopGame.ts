import {useState, useCallback, useRef, useEffect} from "react";
import {generateClient} from "aws-amplify/data";
import type {Schema} from "@/amplify/data/resource";
import {useTranslation} from "@/contexts/LanguageContext";
import {
  Word,
  Results,
  MusicOption,
  ColorValue,
  COLOR_NAMES,
  TRIALS_PER_SERIES,
  COLORS,
  MUSIC_OPTIONS,
} from "@/pages/stroop";
import {Alert} from "@aws-amplify/ui-react";

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
}

export function useStroopGame(userId: string) {
  // State declarations
  const [testState, setTestState] = useState<
    "idle" | "first" | "second" | "completed"
  >("idle");
  const {t} = useTranslation();
  const [selectedMusic, setSelectedMusic] = useState<MusicOption | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
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
  });

  // 添加音乐选择处理函数
  const handleMusicSelection = useCallback((music: MusicOption) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setSelectedMusic(music);
  }, []);

  // 音乐效果处理
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

  const saveResults = useCallback(async () => {
    try {
      const testData: StroopTestModel = {
        userId,
        username: results.username,
        timestamp: new Date().toISOString(),
        rightFirstSeries: results.rightFirstSeries,
        rightSecondSeries: results.rightSecondSeries,
        mistakesFirstSeries: results.mistakesFirstSeries,
        mistakesSecondSeries: results.mistakesSecondSeries,
        averageResponsePercent:
          ((results.rightFirstSeries + results.rightSecondSeries) /
            (TRIALS_PER_SERIES * 2)) *
          100,
        minTimeFirstSeries: results.minTimeFirstSeries,
        minTimeSecondSeries: results.minTimeSecondSeries,
        maxTimeFirstSeries: results.maxTimeFirstSeries,
        maxTimeSecondSeries: results.maxTimeSecondSeries,
        averageResponseTimeFirstSeries:
          results.responseTimes
            .slice(0, TRIALS_PER_SERIES)
            .reduce((a, b) => a + b, 0) / TRIALS_PER_SERIES,
        averageResponseTimeSecondSeries:
          results.responseTimes
            .slice(TRIALS_PER_SERIES)
            .reduce((a, b) => a + b, 0) / TRIALS_PER_SERIES,
        selectedMusic: results.selectedMusic,
      };

      await client.models.StroopTest.create(testData);
    } catch (error) {
      console.error('Error saving results:', error);
    }
  }, [userId, results]);

  const getNextIndex = useCallback(
    (currentIndex: number, excludeIndex: number): number => {
      const possibleIndices = Array.from(
        {length: COLOR_NAMES.length},
        (_, i) => i
      ).filter((i) => i !== currentIndex && i !== excludeIndex);
      return possibleIndices[Math.floor(Math.random() * possibleIndices.length)];
    },
    []
  );

  const generateMatchedWord = useCallback(() => {
    const newWordIndex = getNextIndex(previousState.wordIndex, -1);
    const word = COLOR_NAMES[newWordIndex];
    const color = Object.values(COLORS)[newWordIndex] as ColorValue;

    setPreviousState({
      wordIndex: newWordIndex,
      colorIndex: newWordIndex,
    });

    return {
      word,
      textColor: color,
      correctColor: color,
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

      setResults((prev) => {
        const newResults = {...prev};
        newResults.responseTimes.push(responseTime);

        if (testState === "first") {
          if (isCorrect) newResults.rightFirstSeries++;
          else newResults.mistakesFirstSeries++;
          newResults.minTimeFirstSeries = Math.min(
            newResults.minTimeFirstSeries,
            responseTime
          );
          newResults.maxTimeFirstSeries = Math.max(
            newResults.maxTimeFirstSeries,
            responseTime
          );
        } else {
          if (isCorrect) newResults.rightSecondSeries++;
          else newResults.mistakesSecondSeries++;
          newResults.minTimeSecondSeries = Math.min(
            newResults.minTimeSecondSeries,
            responseTime
          );
          newResults.maxTimeSecondSeries = Math.max(
            newResults.maxTimeSecondSeries,
            responseTime
          );
        }

        return newResults;
      });

      let nextWord;
      if (newTrialCount === TRIALS_PER_SERIES) {
        setTestState("second");
        setPreviousState({wordIndex: -1, colorIndex: -1});
        nextWord = generateMismatchedWord();
      } else if (newTrialCount === TRIALS_PER_SERIES * 2) {
        setTestState("completed");
        await saveResults();
        return;
      } else {
        nextWord =
          testState === "first"
            ? generateMatchedWord()
            : generateMismatchedWord();
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

  const startTest = useCallback(async () => {
    if (!selectedMusic) {
      alert(t("stroopTest.alerts.selectMusic"));
      return;
    }

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
      });
    } catch (error) {
      console.error("Error starting test:", error);
    }
  }, [generateMatchedWord, selectedMusic, t, username, validateUsername]);

  return {
    testState,
    currentWord,
    results,
    startTime,
    username,
    usernameError,
    selectedMusic,
    trialCount,
    handleColorClick,
    setUsername,
    handleMusicSelection,
    startTest,
    validateUsername,
  };
}