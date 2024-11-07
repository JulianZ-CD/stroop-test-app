import { useTranslation } from "@/contexts/LanguageContext";
import { useRouter } from "next/router";
import { Results, TRIALS_PER_SERIES } from "@/pages/stroop";

interface ResultsViewProps {
  results: Results;
  startTime: number;
  onStartNewTest: () => void;
  onBackToHome: () => void;
}

export function ResultsView({
  results,
  startTime,
  onStartNewTest,
  onBackToHome,
}: ResultsViewProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const formatTime = (ms: number) => {
    return (ms / 1000).toFixed(2) + "s";
  };

  return (
    <div className="result-container">
      <h2>{t("stroopTest.results.completed")}</h2>
      <div className="result-grid">
        <div className="result-section">
          <h3>{t("stroopTest.results.practiceRound")}</h3>
          <div>
            {t("stroopTest.results.correctAnswers")}: {results.rightFirstSeries}
          </div>
          <div>
            {t("stroopTest.results.mistakes")}: {results.mistakesFirstSeries}
          </div>
          <div>
            {t("stroopTest.results.minResponseTime")}: {formatTime(results.minTimeFirstSeries)}
          </div>
          <div>
            {t("stroopTest.results.maxResponseTime")}: {formatTime(results.maxTimeFirstSeries)}
          </div>
          <div>
            {t("stroopTest.results.avgResponseTime")}:{" "}
            {formatTime(
              results.responseTimes.slice(0, TRIALS_PER_SERIES).reduce((a, b) => a + b, 0) /
                TRIALS_PER_SERIES
            )}
          </div>
          <div>
            {t("stroopTest.results.totalTestingTime")}: {results.firstTestTotalTime.toFixed(2)}s
          </div>
        </div>

        <div className="result-section">
          <h3>{t("stroopTest.results.testRound")}</h3>
          <div>
            {t("stroopTest.results.correctAnswers")}: {results.rightSecondSeries}
          </div>
          <div>
            {t("stroopTest.results.mistakes")}: {results.mistakesSecondSeries}
          </div>
          <div>
            {t("stroopTest.results.minResponseTime")}: {formatTime(results.minTimeSecondSeries)}
          </div>
          <div>
            {t("stroopTest.results.maxResponseTime")}: {formatTime(results.maxTimeSecondSeries)}
          </div>
          <div>
            {t("stroopTest.results.avgResponseTime")}:{" "}
            {formatTime(
              results.responseTimes.slice(TRIALS_PER_SERIES).reduce((a, b) => a + b, 0) /
                TRIALS_PER_SERIES
            )}
          </div>
          <div>
            {t("stroopTest.results.totalTestingTime")}: {results.secondTestTotalTime.toFixed(2)}s
          </div>
        </div>

        <div className="result-section full-width">
          <h3>{t("stroopTest.results.overallPerformance")}</h3>
          <div>
            {t("stroopTest.results.totalAccuracy")}:{" "}
            {(
              ((results.rightFirstSeries + results.rightSecondSeries) / (TRIALS_PER_SERIES * 2)) *
              100
            ).toFixed(1)}
            %
          </div>
          <div>
            {t("stroopTest.results.avgResponseTime")}:{" "}
            {formatTime(results.responseTimes.reduce((a, b) => a + b, 0) / (TRIALS_PER_SERIES * 2))}
          </div>
          <div>
            {t("stroopTest.results.totalTestingTime")}: {results.allTestTotalTime.toFixed(2)}s
          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        <button onClick={onStartNewTest}>{t("common.startNewTest")}</button>
        <button className="home-button" onClick={() => router.push("/")}>
          {t("common.backToHome")}
        </button>
      </div>
    </div>
  );
}
