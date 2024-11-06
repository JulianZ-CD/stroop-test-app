import { useTranslation } from "@/contexts/LanguageContext";

interface GenderSelectionProps {
  selectedGender: string | null;
  genderError: string;
  onGenderSelect: (gender: string) => void;
}

export function GenderSelection({
  selectedGender,
  genderError,
  onGenderSelect,
}: GenderSelectionProps) {
  const { t } = useTranslation();

  return (
    <div className="gender-selection-container">
      <h3 className="title">{t("stroopTest.gender.label")}</h3>
      <div className="gender-options">
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={selectedGender === "male"}
            onChange={(e) => onGenderSelect(e.target.value)}
          />
          {t("stroopTest.gender.male")}
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={selectedGender === "female"}
            onChange={(e) => onGenderSelect(e.target.value)}
          />
          {t("stroopTest.gender.female")}
        </label>
      </div>
      {genderError && <div className="error-message">{genderError}</div>}
    </div>
  );
}
