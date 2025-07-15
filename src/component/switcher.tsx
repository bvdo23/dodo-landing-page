"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = ({ nextLocale }: { nextLocale: "en" | "vi" }) => {
    startTransition(() => {
      const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`);
      router.replace(newPathname);
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => switchLocale({ nextLocale: "en" })}
        className={`text-sm px-2 py-1 rounded ${
          locale === "en" ? "bg-blue-100 text-blue-700" : ""
        }`}
        disabled={isPending}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale({ nextLocale: "vi" })}
        className={`text-sm px-2 py-1 rounded ${
          locale === "vi" ? "bg-blue-100 text-blue-700" : ""
        }`}
        disabled={isPending}
      >
        VI
      </button>
    </div>
  );
}
