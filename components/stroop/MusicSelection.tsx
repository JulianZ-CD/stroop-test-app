import { useTranslation } from "@/contexts/LanguageContext";
import { MusicOption, MUSIC_OPTIONS } from "@/pages/stroop";

interface MusicSelectionProps {
  selectedMusic: MusicOption | null;
  onMusicSelect: (music: MusicOption) => void;
  musicOptions: typeof MUSIC_OPTIONS;
  musicError?: string;
}

export function MusicSelection({
  selectedMusic,
  onMusicSelect,
  musicOptions,
  musicError,
}: MusicSelectionProps) {
  const { t } = useTranslation();

  return (
    <div className="music-selection">
      <h3 className="music-title">{t("stroopTest.musicSelection.title")}</h3>
      <div className="music-buttons">
        {(Object.entries(musicOptions) as [MusicOption, (typeof MUSIC_OPTIONS)[MusicOption]][]).map(
          ([key, option]) => (
            <button
              key={key}
              onClick={() => onMusicSelect(key)}
              className={`music-button ${selectedMusic === key ? "selected" : ""}`}
            >
              {t(`stroopTest.musicSelection.${option.name.toLowerCase()}`)}
              {selectedMusic === key && <span className="checkmark">✓</span>}
            </button>
          )
        )}
      </div>
      {musicError && <div className="error-message">{musicError}</div>}
    </div>
  );
}
