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
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => onUsernameChange(e.target.value)}
        placeholder={t("stroopTest.placeholders.enterUsername")}
        className="input"
        maxLength={50}
      />
      {usernameError && <div className="error-message">{usernameError}</div>}
    </div>
  );
}
