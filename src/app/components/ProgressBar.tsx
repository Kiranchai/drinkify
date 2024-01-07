import React from "react";

export default function ProgressBar({
  transactionCount,
  goal,
}: {
  transactionCount: number;
  goal: number;
}) {
  const percentage = (transactionCount * 100) / goal;

  return (
    <div className="flex flex-col items-center p-4 h-full">
      <span className="text-primary mb-4 text-center">
        <strong className="text-primary">{goal.toString()}</strong> sprzedaży
      </span>
      <div className={`h-full bg-slate-300 w-7 rounded-md relative shadow-md`}>
        <div
          className={`absolute bottom-0 left-0 w-7 rounded-md bg-primary`}
          style={{ height: `${percentage.toFixed(0)}%` }}
        ></div>
      </div>
      <span className="text-primary pt-2 font-semibold">
        {percentage.toFixed(1)}%
      </span>
    </div>
  );
}
