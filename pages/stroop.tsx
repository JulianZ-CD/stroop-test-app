import {useAuthenticator} from "@aws-amplify/ui-react";
import {useState, useCallback, useEffect, useRef} from "react";
import {generateClient} from "aws-amplify/data";
import {useRouter} from "next/router";
import type {Schema} from "@/amplify/data/resource";
import {useTranslation} from "@/contexts/LanguageContext";

const client = generateClient<Schema>();

const COLORS = {
    RED: "#ff0000",
    YELLOW: "#ffff00",
    BLUE: "#0000ff",
    BLACK: "#000000",
    GREEN: "#008000",
} as const;

const COLOR_NAMES = ["red", "yellow", "blue", "black", "green"] as const;
const TRIALS_PER_SERIES = 10;

const MUSIC_OPTIONS = {
    MOZART: {
        name: "Mozart",
        url: "/music/(KV 488) Piano Concerto n° 23_compressed.mp3"
    },
    POP: {
        name: "Pop_Music",
        url: "/music/pop.mp3"
    },
    NO: {
        name: "No_Music",
        url: "/music/no.mp3"
    }
} as const;

type ColorValue = (typeof COLORS)[keyof typeof COLORS];
type ColorName = (typeof COLOR_NAMES)[number];
type MusicOption = keyof typeof MUSIC_OPTIONS;

interface Word {
    word: ColorName;
    textColor: ColorValue;
    correctColor: ColorValue;
}

interface PreviousState {
    wordIndex: number;
    colorIndex: number;
}

export default function StroopTest() {
    const {user} = useAuthenticator();
    const router = useRouter();
    const {t} = useTranslation();
    const [testState, setTestState] = useState<
        "idle" | "first" | "second" | "completed"
    >("idle");
    const [selectedMusic, setSelectedMusic] = useState<MusicOption | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [trialCount, setTrialCount] = useState(0);
    const [currentWord, setCurrentWord] = useState<Word>({
        word: "red",
        textColor: COLORS.RED,
        correctColor: COLORS.RED,
    });
    const [startTime, setStartTime] = useState(0);
    const [previousState, setPreviousState] = useState<PreviousState>({
        wordIndex: -1,
        colorIndex: -1,
    });
    const [results, setResults] = useState({
        rightFirstSeries: 0,
        rightSecondSeries: 0,
        mistakesFirstSeries: 0,
        mistakesSecondSeries: 0,
        minTimeFirstSeries: Number.MAX_VALUE,
        minTimeSecondSeries: Number.MAX_VALUE,
        maxTimeFirstSeries: 0,
        maxTimeSecondSeries: 0,
        responseTimes: [] as number[],
        selectedMusic: null as MusicOption | null,
    });

    const getNextIndex = (currentIndex: number, excludeIndex: number): number => {
        console.log("---- getNextIndex ----");
        console.log("Current index:", currentIndex);
        console.log("Exclude index:", excludeIndex);

        // Generate array of possible indices
        const possibleIndices = Array.from(
            {length: COLOR_NAMES.length},
            (_, i) => i
        ).filter((i) => i !== currentIndex && i !== excludeIndex);

        console.log("Possible indices:", possibleIndices);

        // Randomly select from possible indices
        const selectedIndex =
            possibleIndices[Math.floor(Math.random() * possibleIndices.length)];
        console.log("Selected index:", selectedIndex);
        console.log("-------------------");

        return selectedIndex;
    };

    const generateMatchedWord = useCallback(() => {
        console.log("==== generateMatchedWord ====");
        console.log("Previous state:", previousState);

        // Get next word index, excluding previous
        const newWordIndex = getNextIndex(previousState.wordIndex, -1);

        const word = COLOR_NAMES[newWordIndex];
        const color = Object.values(COLORS)[newWordIndex] as ColorValue;

        // Update previous state
        const newState = {
            wordIndex: newWordIndex,
            colorIndex: newWordIndex, // For matched words, both indices are the same
        };
        console.log("New state:", newState);

        const newWord = {
            word,
            textColor: color,
            correctColor: color,
        };
        console.log("Generated word:", newWord);
        console.log("========================");

        setPreviousState(newState);
        return newWord;
    }, [previousState]);

    const generateMismatchedWord = useCallback(() => {
        console.log("==== generateMismatchedWord ====");
        console.log("Previous state:", previousState);

        // Get next indices, ensuring neither word nor color repeats
        const newWordIndex = getNextIndex(previousState.wordIndex, -1);
        const newColorIndex = getNextIndex(previousState.colorIndex, newWordIndex); // Also exclude matching word's color

        const word = COLOR_NAMES[newWordIndex];
        const correctColor = Object.values(COLORS)[newWordIndex] as ColorValue;
        const textColor = Object.values(COLORS)[newColorIndex] as ColorValue;

        // Update previous state
        const newState = {
            wordIndex: newWordIndex,
            colorIndex: newColorIndex,
        };
        console.log("New state:", newState);

        const newWord = {
            word,
            textColor,
            correctColor,
        };
        console.log("Generated word:", newWord);
        console.log("========================");

        setPreviousState(newState);
        return newWord;
    }, [previousState]);

    useEffect(() => {
        if (selectedMusic && !audioRef.current) {
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

    const handleMusicSelection = (music: MusicOption) => {
        setSelectedMusic(music);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        const audio = new Audio(MUSIC_OPTIONS[music].url);
        audio.loop = true;
        audioRef.current = audio;
    };

    const startTest = useCallback(async () => {
        if (!selectedMusic) {
            alert(t("stroopTest.alerts.selectMusic"));
            return;
        }

        console.log("==== Starting Test ====");
        try {
            if (audioRef.current) {
                await audioRef.current.play();
            }
            // 重置所有状态
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
            });
            console.log("Test started with word:", firstWord);
            console.log("=====================");
        } catch (error) {
            console.error("Error starting test:", error);
            alert(t("stroopTest.alerts.musicError"));
        }
    }, [generateMatchedWord, selectedMusic, t]);

    const handleColorClick = useCallback(
        async (selectedColor: ColorValue) => {
            console.log("==== handleColorClick ====");
            console.log("Selected color:", selectedColor);
            console.log("Current word:", currentWord);
            console.log("Current state:", {testState, trialCount});

            const responseTime = Date.now() - startTime;
            const isCorrect = selectedColor === currentWord.correctColor;
            const newTrialCount = trialCount + 1;

            console.log("Response time:", responseTime);
            console.log("Is correct:", isCorrect);
            console.log("New trial count:", newTrialCount);

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

            // Handle series transition
            let nextWord;
            if (newTrialCount === TRIALS_PER_SERIES) {
                console.log("Switching to second series");
                setTestState("second");
                // Reset previous state for second phase
                setPreviousState({wordIndex: -1, colorIndex: -1});
                nextWord = generateMismatchedWord();
            } else if (newTrialCount === TRIALS_PER_SERIES * 2) {
                console.log("Test completed");
                setTestState("completed");
                await saveResults();
                return;
            } else {
                nextWord =
                    testState === "first"
                        ? generateMatchedWord()
                        : generateMismatchedWord();
            }

            console.log("Next word:", nextWord);

            setCurrentWord(nextWord);
            setTrialCount(newTrialCount);
            setStartTime(Date.now());
            console.log("=====================");
        },
        [
            currentWord,
            testState,
            startTime,
            trialCount,
            generateMatchedWord,
            generateMismatchedWord,
        ]
    );

    const formatTime = (ms: number) => {
        return (ms / 1000).toFixed(2) + "s";
    };

    const getColorTranslationKey = (colorName: string): string =>
        `stroopTest.colors.${colorName.toLowerCase()}`;

    const saveResults = async () => {
        console.log("==== Saving Results ====");
        const avgTime = (arr: number[]) =>
            arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

        try {
            const savedResult = await client.models.StroopTest.create({
                userId: user.username,
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
                avgTimeFirstSeries: avgTime(
                    results.responseTimes.slice(0, TRIALS_PER_SERIES)
                ),
                avgTimeSecondSeries: avgTime(
                    results.responseTimes.slice(TRIALS_PER_SERIES)
                ),
                avgResponseDelay: avgTime(results.responseTimes),
                testingTime: (Date.now() - startTime) / 1000,
            });
            console.log("Results saved successfully:", savedResult);
        } catch (error) {
            console.error("Error saving results:", error);
        }
        console.log("=====================");
    };

    return (
        <main>
            <div className="stroop-container">
                <h1 className="stroop-title">{t("stroopTest.title")}</h1>

                {testState === "completed" ? (
                    <div className="result-container">
                        <h2>{t("stroopTest.results.completed")}</h2>
                        <div className="result-grid">
                            <div className="result-section">
                                <h3>{t("stroopTest.results.practiceRound")}</h3>
                                <div>
                                    {t("stroopTest.results.correctAnswers")}:{" "}
                                    {results.rightFirstSeries}
                                </div>
                                <div>
                                    {t("stroopTest.results.mistakes")}:{" "}
                                    {results.mistakesFirstSeries}
                                </div>
                                <div>
                                    {t("stroopTest.results.minResponseTime")}:{" "}
                                    {formatTime(results.minTimeFirstSeries)}
                                </div>
                                <div>
                                    {t("stroopTest.results.maxResponseTime")}:{" "}
                                    {formatTime(results.maxTimeFirstSeries)}
                                </div>
                                <div>
                                    {t("stroopTest.results.avgResponseTime")}:{" "}
                                    {formatTime(
                                        results.responseTimes
                                            .slice(0, TRIALS_PER_SERIES)
                                            .reduce((a, b) => a + b, 0) / TRIALS_PER_SERIES
                                    )}
                                </div>
                            </div>

                            <div className="result-section">
                                <h3>{t("stroopTest.results.testRound")}</h3>
                                <div>
                                    {t("stroopTest.results.correctAnswers")}:{" "}
                                    {results.rightSecondSeries}
                                </div>
                                <div>
                                    {t("stroopTest.results.mistakes")}:{" "}
                                    {results.mistakesSecondSeries}
                                </div>
                                <div>
                                    {t("stroopTest.results.minResponseTime")}:{" "}
                                    {formatTime(results.minTimeSecondSeries)}
                                </div>
                                <div>
                                    {t("stroopTest.results.maxResponseTime")}:{" "}
                                    {formatTime(results.maxTimeSecondSeries)}
                                </div>
                                <div>
                                    {t("stroopTest.results.avgResponseTime")}:{" "}
                                    {formatTime(
                                        results.responseTimes
                                            .slice(TRIALS_PER_SERIES)
                                            .reduce((a, b) => a + b, 0) / TRIALS_PER_SERIES
                                    )}
                                </div>
                            </div>

                            <div className="result-section full-width">
                                <h3>{t("stroopTest.results.overallPerformance")}</h3>
                                <div>
                                    {t("stroopTest.results.totalAccuracy")}:{" "}
                                    {(
                                        ((results.rightFirstSeries + results.rightSecondSeries) /
                                            (TRIALS_PER_SERIES * 2)) *
                                        100
                                    ).toFixed(1)}
                                    %
                                </div>
                                <div>
                                    {t("stroopTest.results.avgResponseTime")}:{" "}
                                    {formatTime(
                                        results.responseTimes.reduce((a, b) => a + b, 0) /
                                        (TRIALS_PER_SERIES * 2)
                                    )}
                                </div>
                                <div>
                                    {t("stroopTest.results.totalTestingTime")}:{" "}
                                    {formatTime(Date.now() - startTime)}
                                </div>
                            </div>
                        </div>
                        <div className="navigation-buttons">
                            <button onClick={() => window.location.reload()}>
                                {t("common.startNewTest")}
                            </button>
                            <button className="home-button" onClick={() => router.push("/")}>
                                {t("common.backToHome")}
                            </button>
                        </div>
                    </div>
                ) : testState === "idle" ? (
                    <div className="result-container">
                        <p className="instructions">
                            {t("stroopTest.instructions.part1")}
                            <br/>
                            {t("stroopTest.instructions.part2")}
                            <br/>
                            {t("stroopTest.instructions.part3")}
                            <br/>
                            {t("stroopTest.instructions.totalTrials", {
                                total: TRIALS_PER_SERIES * 2,
                                perSeries: TRIALS_PER_SERIES,
                            })}
                        </p>

                        <div className="music-selection">
                            <h3 className="music-title">{t("stroopTest.musicSelection.title")}</h3>
                            <div className="music-buttons">
                                {(Object.entries(MUSIC_OPTIONS) as [MusicOption, typeof MUSIC_OPTIONS[MusicOption]][]).map(
                                    ([key, option]) => (
                                        <button
                                            key={key}
                                            onClick={() => handleMusicSelection(key)}
                                            className={`music-button ${selectedMusic === key ? 'selected' : ''}`}
                                        >
                                            {t(`stroopTest.musicSelection.${option.name.toLowerCase()}`)}
                                            {selectedMusic === key && (
                                                <span className="checkmark">✓</span>
                                            )}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="navigation-buttons">
                            <button
                                onClick={startTest}
                                className={!selectedMusic ? 'disabled' : ''}
                                disabled={!selectedMusic}
                            >
                                {t("stroopTest.buttons.start")}
                            </button>
                            <button className="home-button" onClick={() => router.push("/")}>
                                {t("common.backToHome")}
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
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

                        <div
                            className="stroop-word"
                            style={{color: currentWord.textColor}}
                        >
                            {t(getColorTranslationKey(currentWord.word))}
                        </div>

                        <div className="color-buttons">
                            {(Object.entries(COLORS) as [string, ColorValue][]).map(
                                ([name, color]) => (
                                    <button
                                        key={color}
                                        onClick={() => handleColorClick(color)}
                                        className="color-button"
                                        style={{backgroundColor: color}}
                                        aria-label={t(getColorTranslationKey(name))}
                                    />
                                )
                            )}
                        </div>

                        <button className="home-button" onClick={() => router.push("/")}>
                            {t("common.backToHome")}
                        </button>
                    </>
                )}
            </div>
        </main>
    );
}
