import { useTranslation } from "@/contexts/LanguageContext";
import { ColorValue, COLORS } from "@/pages/stroop";

interface ColorButtonsProps {
  colors: typeof COLORS;
  onColorClick: (color: ColorValue) => void;
  getColorTranslationKey: (colorName: string) => string;
}

export function ColorButtons({ colors, onColorClick, getColorTranslationKey }: ColorButtonsProps) {
  const { t } = useTranslation();

  return (
    <div className="color-buttons">
      {(Object.entries(colors) as [string, ColorValue][]).map(([name, color]) => (
        <button
          key={color}
          onClick={() => onColorClick(color)}
          className="color-button"
          style={{ backgroundColor: color }}
          aria-label={t(getColorTranslationKey(name))}
        />
      ))}
    </div>
  );
}
