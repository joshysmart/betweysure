"use client";

import { useAuth } from "@/hooks/useAuth";
import MySelect from "../ui/my-select";
import useSelectCurrency from "@/hooks/useSelectCurrency";
import useUserPlan from "@/hooks/useUserPlan";
import { cn, formatCurrency } from "@/lib/utils";
import { FaInfo } from "react-icons/fa";
import Link from "next/link";

export default function Bundles() {
  const { user } = useAuth();
  const userCurrency = user?.currency || "NGN";

  const { supportedCountries, selectedCurrency, setSelectedCurrency } =
    useSelectCurrency({
      defaultCurrency: userCurrency,
    });
  const { userPlan, availableCurrency } = useUserPlan({
    currency: selectedCurrency?.split(" ").pop() || "NGN",
  });

  const plans = Object.keys(userPlan).map((key) => {
    return {
      name: key,
      duration: Object.keys(userPlan[key]).map((duration) => {
        return `${duration} ${key} plan ${formatCurrency(
          userPlan[key][duration],
          availableCurrency
        )}`;
      }),
    };
  });

  return (
    <>
      <div className="flex items-center gap-6 justify-between">
        <h3 className="min-w-fit">Select a plan</h3>
        <div className="max-w-xs w-full">
          <MySelect
            options={supportedCountries}
            bgDashboard
            selectedOption={selectedCurrency}
            setSelectedOption={setSelectedCurrency}
          />
        </div>
      </div>
      <h3 className="text-3xl mt-6">Football plans</h3>
      <div className="flex justify-between flex-col lg:flex-row gap-4 mt-10">
        {plans?.map((plan) => (
          <div
            key={plan.name}
            className="w-full bg-white shadow border border-gray-two lg:p-6 p-4 rounded dark:bg-blue-two dark:border-0"
          >
            <div className="border-gray-two pb-4 border-b flex items-center justify-between">
              <h3 className="capitalize">{plan.name} plan</h3>
              <div className="w-8 h-8 rounded-full border-cyan text-cyan flex items-center justify-center border">
                <FaInfo />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {plan.duration.map((duration, index) => {
                const planType = duration.split(" ").splice(0, 2).join("-");
                return (
                  <Link
                    href={`/dashboard/payment/?currency=${availableCurrency}&plan=${plan.name}&duration=${planType}`}
                    key={index}
                    className={cn(
                      "px-4 rounded flex bg-yellow-sunset text-white py-4 hover:bg-white hover:border hover:border-yellow-sunset items-center justify-between gap-4 hover:text-yellow-sunset",
                      {
                        "bg-purple-royal text-white hover:bg-white hover:border hover:border-purple-royal hover:text-purple-royal":
                          plan.name === "premium",
                      }
                    )}
                  >
                    <p>{duration}</p>
                    <button className="">Buy</button>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
