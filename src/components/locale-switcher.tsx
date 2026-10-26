"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { type Locale, locales } from "@/i18n/config";

const flags = { en: "🇬🇧", es: "🇪🇸", ko: "🇰🇷" };

export function LocaleSwitcher({
  labels,
  locale,
}: {
  labels: { label: string; en: string; es: string; ko: string };
  locale: Locale;
}) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild data-testid="lang-switcher">
        <Button variant="ghost" size="icon" aria-label={labels.label}>
          {flags[locale]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((nextLocale) => (
          <DropdownMenuItem
            key={nextLocale}
            onClick={() => {
              document.cookie =
                "locale=" +
                nextLocale +
                "; path=/; max-age=31536000; SameSite=Lax";
              router.refresh();
            }}
          >
            <span aria-hidden="true">{flags[nextLocale]}</span>{" "}
            {labels[nextLocale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
