// Language context for internationalization
import { createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/router";
import en from "@/locales/en";
import zh from "@/locales/zh";
import fr from "@/locales/fr";

// Define available translations with const assertion for type safety
const translations = { en, zh, fr } as const;
// Extract locale type from translations object
type Locale = keyof typeof translations;
// Use English translations as the base type
type TranslationType = typeof en;

// Recursive type for generating nested object paths
type PathImpl<T, Key extends keyof T> = Key extends string
 ? T[Key] extends Record<string, any>
   ? `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> & string}`
   : Key
 : never;

// Type for all possible paths in the translation object
type Path<T> = PathImpl<T, keyof T> | keyof T;

// Type for getting the value type at a given path
type PathValue<T, P extends Path<T>> = P extends `${infer K}.${infer Rest}`
 ? K extends keyof T
   ? Rest extends Path<T[K]>
     ? PathValue<T[K], Rest>
     : never
   : never
 : P extends keyof T
 ? T[P]
 : never;

// Interface defining the language context shape
interface LanguageContextType {
 locale: Locale;  // Current language
 t: (key: string, params?: Record<string, string | number>) => string;  // Translation function
 changeLocale: (locale: Locale) => void;  // Language switch function
}

// Create context with undefined as initial value
const LanguageContext = createContext<LanguageContextType | undefined>(
 undefined
);

// Language Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
 const router = useRouter();
 // Get current locale from router or default to English
 const locale = (router.locale || "en") as Locale;

 // Translation function
 const t = (key: string, params?: Record<string, string | number>) => {
   // Split key into parts for nested object access
   const keys = key.split(".");
   let value: any = translations[locale];

   // Traverse through the translation object
   for (const k of keys) {
     if (value === undefined) return key;
     value = value[k];
   }

   // Return original key if value is not a string
   if (typeof value !== "string") return key;

   // Replace template parameters if provided
   if (params) {
     return value.replace(/{{(\w+)}}/g, (_, paramKey) =>
       String(params[paramKey] || `{{${paramKey}}}`)
     );
   }

   return value;
 };

 // Function to change the current locale
 const changeLocale = (newLocale: Locale) => {
   router.push(router.pathname, router.pathname, { locale: newLocale });
 };

 // Provide the language context to child components
 return (
   <LanguageContext.Provider value={{ locale, t, changeLocale }}>
     {children}
   </LanguageContext.Provider>
 );
}

// Custom hook for using translations in components
export function useTranslation() {
 const context = useContext(LanguageContext);
 if (!context) {
   throw new Error("useTranslation must be used within a LanguageProvider");
 }
 return context;
}