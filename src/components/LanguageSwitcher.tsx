"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const switchLanguage = (newLocale: 'fr' | 'nl') => {
    // Remove the current locale prefix from pathname
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

    // Preserve query parameters
    const queryString = searchParams.toString();
    const fullPath = queryString
      ? `${pathnameWithoutLocale}?${queryString}`
      : pathnameWithoutLocale;

    router.push(fullPath, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2 bg-gray-50/50 rounded-lg p-1 w-fit">
      <button
        onClick={() => switchLanguage("fr")}
        className={`px-3 py-1 rounded text-sm font-medium transition ${
          locale === "fr"
            ? "bg-yellow-400 text-black"
            : "text-gray-600 hover:text-black"
        }`}
        aria-label="Français"
      >
        FR
      </button>
      <button
        onClick={() => switchLanguage("nl")}
        className={`px-3 py-1 rounded text-sm font-medium transition ${
          locale === "nl"
            ? "bg-yellow-400 text-black"
            : "text-gray-600 hover:text-black"
        }`}
        aria-label="Nederlands"
      >
        NL
      </button>
    </div>
  );
}
