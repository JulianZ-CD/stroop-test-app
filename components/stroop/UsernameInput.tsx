import { useTranslation } from "@/contexts/LanguageContext";

interface UsernameInputProps {
  username: string;
  usernameError: string;
  onUsernameChange: (username: string) => void;
}

export function UsernameInput({ username, usernameError, onUsernameChange }: UsernameInputProps) {
  const { t } = useTranslation();

  return (
    <div className="username-input-container">
      <label htmlFor="username" className="username-label">
        {t("common.greetings")}
      </label>
      <h3 className="title">{t("stroopTest.username.title")}</h3>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => onUsernameChange(e.target.value)}
        placeholder={t("stroopTest.username.placeholders")}
        className="input"
        maxLength={50}
      />
      {usernameError && <div className="error-message">{usernameError}</div>}
    </div>
  );
}
