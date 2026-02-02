import React from "react";

// Dumb overlay container for the global action mark icons.
export default function ActionMarkOverlay() {
  return (
    <div
      id="indActionMark"
      className="fixed inset-0 z-2147483647 hidden pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    >
      <div id="indActionMarkWrap" className="h-40 w-40">
        <svg
          id="indMarkCheck"
          className="hidden h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <rect className="ind-mark-stroke ind-stroke-animate" x="4" y="4" width="16" height="16" rx="4" strokeWidth="1.1"></rect>
          <path
            className="ind-mark-stroke ind-stroke-animate"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M8.2 12.6l2.5 2.5 5.1-6.2"
          ></path>
        </svg>
        <svg
          id="indMarkWarning"
          className="hidden h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <rect className="ind-mark-stroke ind-stroke-animate" x="4" y="4" width="16" height="16" rx="4" strokeWidth="1.1"></rect>
          <path
            className="ind-mark-stroke ind-stroke-animate"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M12 7.2v7.1"
          ></path>
          <path
            className="ind-mark-stroke ind-stroke-animate"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            d="M12 17.3h.01"
          ></path>
        </svg>
        <svg
          id="indMarkError"
          className="hidden h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <rect className="ind-mark-stroke ind-stroke-animate" x="4" y="4" width="16" height="16" rx="4" strokeWidth="1.1"></rect>
          <path
            className="ind-mark-stroke ind-stroke-animate"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M8.5 8.5l7 7"
          ></path>
          <path
            className="ind-mark-stroke ind-stroke-animate"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M15.5 8.5l-7 7"
          ></path>
        </svg>
      </div>
      <div className="hidden text-emerald-600 text-rose-600 text-amber-500 drop-shadow-[0_18px_24px_rgba(0,0,0,0.15)]"></div>
    </div>
  );
}
