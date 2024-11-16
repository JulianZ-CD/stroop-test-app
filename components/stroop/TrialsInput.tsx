import { useTranslation } from "@/contexts/LanguageContext";

interface TrialsInputProps {
  trialsPerSeries: number;
  setTrialsPerSeries: (trials: number) => void;
  defaultTrials: number;
}

export function TrialsInput({
  trialsPerSeries,
  setTrialsPerSeries,
  defaultTrials,
}: TrialsInputProps) {
  const { t } = useTranslation();

  return (
    <div className="trials-input-container">
      <h3 className="title">{t("stroopTest.trialsInput.label")}</h3>
      <input
        id="trials-input"
        type="number"
        min="1"
        placeholder={t("stroopTest.trialsInput.placeholder", { suggestions: "30, 60, 100" })}
        value={trialsPerSeries}
        onChange={(e) => setTrialsPerSeries(Math.max(1, parseInt(e.target.value) || defaultTrials))}
      />
    </div>
  );
}
