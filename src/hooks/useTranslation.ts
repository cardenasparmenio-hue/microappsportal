import { useLanguage } from "@/context/LanguageContext";

export function useTranslation() {
  const { language, isHydrated } = useLanguage();
  return { language, isHydrated };
}
