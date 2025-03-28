"use client";

import useSelectCurrency from "@/hooks/useSelectCurrency";
import { cn, formatCurrency } from "@/lib/utils";
import { FaInfo } from "react-icons/fa";
import Link from "next/link";
import { durations, planNames, plans } from "@/assets/data/data";
import RadixSelect from "../ui/radix-select";
import { SelectItem } from "../ui/select";

export default function Bundles() {
  const { supportedCountries, currency, setSelectedCurrency } =
    useSelectCurrency();

  const availablePlans = planNames.map((planType) => {
    return {
      name: planType,
      duration: durations.map((duration) => {
        const isSupported = currency && plans[currency];
        const plan = isSupported ? plans[currency] : plans["USD"];
        const amount = currency ? plan?.[planType]?.[duration] : null;
        const newCurrency = isSupported ? currency : "USD";

        return {
          duration,
          newCurrency,
          amount: amount ? formatCurrency(amount, newCurrency) : "____________",
        };
      }),
    };
  });

  const selectItems = supportedCountries.map((country) => (
    <SelectItem value={`${country.name.toLowerCase()}`} key={country.name}>
      <span className="flex items-center gap-2">
        <span className="flex flex-row-reverse items-center gap-2">
          <span>{country.name} </span>
          <span>{country.flag} </span>
        </span>
        <span>{country.currency} </span>
      </span>
    </SelectItem>
  ));
  console.log(currency);

  return (
    <>
      <div className="flex items-center gap-6 justify-between">
        <p className="flex-1 font-semibold">Select a plan</p>
        <div className="flex items-center justify-end gap-4 flex-1">
          <p className="font-medium">Select currency: </p>

          <div className="max-w-xs w-full flex-1">
            <RadixSelect
              selectItems={selectItems}
              placeholder={"Select currency"}
              handleValueChange={(v) => setSelectedCurrency(v)}
            />
          </div>
        </div>
      </div>
      <h1 className="text-3xl mt-6">Football plans</h1>
      <div className="flex justify-between flex-col lg:flex-row gap-4 mt-10">
        {availablePlans?.map((plan) => (
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
              {plan.duration.map(({ duration, amount, newCurrency }, index) => {
                return (
                  <Link
                    href={
                      currency
                        ? `/dashboard/payment/?currency=${newCurrency}&plan=${plan.name}&duration=${duration.replace(/\s/g, "-")}`
                        : "#"
                    }
                    key={index}
                    className={cn(
                      "px-4 rounded flex bg-yellow-sunset text-white py-4 hover:bg-white hover:border hover:border-yellow-sunset items-center justify-between gap-4 hover:text-yellow-sunset",
                      {
                        "bg-purple-royal text-white hover:bg-white hover:border hover:border-purple-royal hover:text-purple-royal":
                          plan.name === "premium",
                      },
                    )}
                  >
                    <p>
                      {duration} {plan.name} {amount}
                    </p>
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
