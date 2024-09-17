import { capitalize, getDate } from "@/lib/utils";
import { period } from "@/assets/data/data";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface LeagueInfoProps {
  category: string;
  popularLeague?: {
    name: string;
    logo: string;
  };
}

export default function LeagueInfo({
  category,
  popularLeague,
}: LeagueInfoProps) {
  const t = useTranslations("LEAGUE_INFO");

  const isPeriod = category && period.includes(category);

  return (
    <div className="mb-8 flex flex-col items-center">
      <div className="mb-6 text-center font-bold flex items-center gap-4 justify-center">
        {isPeriod ? (
          <h1 className="text-3xl lg:text-5xl text-center">
            {t(`${category?.toUpperCase()}_TITLE` as any)}
          </h1>
        ) : (
          popularLeague && (
            <>
              <Image
                width={40}
                height={40}
                src={popularLeague?.logo}
                alt="logo"
                className="w-10 h-10 bg-white rounded-full object-contain"
              />
              <h1 className="text-xl lg:text-2xl">
                {t("TITLE", { league: capitalize(popularLeague?.name) })}
              </h1>
            </>
          )
        )}
      </div>
      <p className="text-center max-w-5xl">
        {t(`${category?.toUpperCase()}_DESCRIPTION` as any)}
      </p>
    </div>
  );
}
