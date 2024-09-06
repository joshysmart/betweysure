import { cn } from "../../lib/utils";
import MySelect from "../ui/my-select";
import { useState } from "react";
import { Button } from "../ui/button";
import { DateCalendar } from "@mui/x-date-pickers";
import { FaCalendar } from "react-icons/fa";
import { getDate } from "../../lib/utils";
import { usePredictions } from "../../hooks/usePredictions";
import dayjs from "dayjs";
import OtherSportsPredictionTable from "../predictions/othersports-prediction-table";
import { otherSports } from "@/assets/data/data";
import { useTranslations } from "next-intl";

interface OtherSportsPredictionsProps {
  selectedSport: string;
  setSelectedSport: React.Dispatch<React.SetStateAction<string>>;
}

export default function OtherSportsPredictions({
  selectedSport,
  setSelectedSport,
}: OtherSportsPredictionsProps) {
  const t = useTranslations("PREDICTIONS_TABLE");
  const [showDate, setShowDate] = useState(false);
  const [period, setPeriod] = useState<"today" | "yesterday" | "tomorrow">(
    "today"
  );
  const periodArray: Array<{
    name: string;
    filter: "yesterday" | "today" | "tomorrow";
  }> = [
    {
      name: t("YESTERDAY"),
      filter: "yesterday",
    },
    {
      name: t("TODAY"),
      filter: "today",
    },
    {
      name: t("TOMORROW"),
      filter: "tomorrow",
    },
  ];

  const [fullDate, setFullDate] = useState(getDate(period));
  const option = selectedSport.replace(/\s/g, "").toLowerCase();
  const endpoint = `tips/othersports/${option}/${fullDate}`;
  const queryKey = ["predictions", period, option];
  const predictionsPerPage = 9;

  const { data, isLoading, from, to } = usePredictions({
    endpoint,
    queryKey,
    predictionsPerPage,
  });

  const predictions = data?.data as TOtherSportsResponse["data"] | undefined;

  const handlDateChange = (newValue: dayjs.Dayjs) => {
    const newDate = newValue.format("YYYY-MM-DD");
    setFullDate(newDate);
    setShowDate(false);
  };

  return (
    <div
      id={option}
      className="border shadow border-gray-three rounded-lg lg:rounded-[40px] text-blue-three overflow-x-scroll  min-h-[400px] dark:bg-blue-one dark:border-0 dark:text-white"
    >
      <div className="p-4 md:py-7 md:px-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
          <h2 className="text-xl font-bold">{t("OTHER_SPORTS_PREDICTIONS")}</h2>
          <div className="relative">
            <Button
              className="bg-transparent gap-2 text-xs text-gray-one py-0 hover:text-white"
              onClick={() => setShowDate(!showDate)}
            >
              <FaCalendar />
              {fullDate}
            </Button>

            {showDate && (
              <div className="absolute bg-white top-[calc(100%+16px)] right-0 rounded-lg text-blue-three shadow">
                <DateCalendar
                  value={dayjs(fullDate)}
                  onChange={(newValue) => handlDateChange(newValue)}
                />
              </div>
            )}
          </div>
        </div>
        {/* <Select /> */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between mt-8">
          <div className="w-[260px]">
            <MySelect
              options={otherSports}
              selectedOption={selectedSport}
              setSelectedOption={setSelectedSport}
            />
          </div>
          <div className="flex items-center gap-4">
            {periodArray.map((periodObj) => (
              <Button
                key={periodObj.name}
                onClick={() => {
                  setFullDate(
                    getDate(
                      periodObj.name.toLowerCase() as
                        | "today"
                        | "tomorrow"
                        | "yesterday"
                    )
                  );
                  setPeriod(periodObj.filter);
                }}
                className={cn(
                  "min-w-max hover:text-white text-center bg-transparent",
                  {
                    "text-cyan": periodObj.filter === period,
                  }
                )}
              >
                {periodObj.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <OtherSportsPredictionTable
            from={from}
            isLoading={isLoading}
            predictions={predictions}
            to={to}
            sport={selectedSport}
          />
        </div>
      </div>
    </div>
  );
}
