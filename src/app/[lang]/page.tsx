import Link from "next/link";
import { notFound } from "next/navigation";

import { appName } from "@/lib/app-config";

import { Button } from "@/components/ui/button";

import { hasLocale, localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const { home } = await getDictionary(lang);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-16">
      <section className="max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
            {appName}
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg leading-8">
            {home.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="h-10 px-4">
            <Link href={localizePath(lang, "/join")}>{home.primaryAction}</Link>
          </Button>
          <Button asChild className="h-10 px-4" variant="outline">
            <Link href={localizePath(lang, "/login")}>
              {home.secondaryAction}
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
