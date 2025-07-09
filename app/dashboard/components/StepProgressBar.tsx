import React from "react";

interface Step {
  label: string;
  done: boolean;
  current?: boolean;
}

interface StepProgressBarProps {
  steps: Step[];
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ steps }) => (
  <div className="flex items-center justify-between mb-8 pr-2">
    {steps.map((step, idx, arr) => (
      <div
        key={step.label}
        className={`flex items-center ${idx < 6 ? "grow" : ""}`}
      >
        <div
          className={`flex items-center justify-center w-7 h-7 rounded-full ${
            step.done
              ? "bg-green-100"
              : step.current
              ? "bg-primary/80 text-white"
              : "bg-gray-200 border-gray-300 text-gray-400"
          } text-sm font-bold`}
        >
          {step.done ? (
            <svg
              className="w-4 h-4 text-primary "
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : step.current ? (
            idx + 1
          ) : (
            idx + 1
          )}
        </div>
        <span className={`ml-2 text-xs`}>{step.label}</span>
        {idx < arr.length - 1 && (
          <div className="flex-1 h-0.5 mx-2 bg-primary/30" />
        )}
      </div>
    ))}
  </div>
);

export default StepProgressBar;
