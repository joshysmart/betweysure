import { Metadata } from "next";

import OtherPagesHero from "@/components/shared/other-pages-hero";
import { result } from "@/constants";
import ResultsHistory from "@/components/results/result-history";

export const metadata: Metadata = {
  title: result.title,
  description: result.description,
};

export default function ResultsPage() {
  return (
    <>
      <OtherPagesHero />
      <div
        id="football-predictions"
        className="mt-10 lg:mt-20 bg-gray-three rounded-lg lg:rounded-[40px] p-4 md:py-7 md:px-6 text-blue-three overflow-x-scroll min-h-[400px] dark:bg-blue-one dark:text-white"
      >
        <div className="lg:hidden grid grid-cols-2 px-6 text-center">
          {mobileHeading.map((heading) => (
            <h4 className="text-xs" key={heading}>
              {heading}
            </h4>
          ))}
        </div>

        <div className="lg:grid grid-cols-6 px-6 text-center hidden">
          {headings.map((heading) => (
            <h4 className="text-base" key={heading}>
              {heading}
            </h4>
          ))}
        </div>

        <ResultsHistory />
      </div>
    </>
  );
}

const headings = [
  "League",
  "Home",
  "Away",
  "Predicted Score",
  "Prediction",
  "Result",
];

const mobileHeading = ["Matches", "Prediction"];
