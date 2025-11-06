"use client";
import { useState } from "react";

interface InfoIconProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function InfoIcon({ title, children, className = "" }: InfoIconProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Info Icon */}
      <div className={`relative inline-block ${className}`}>
        {/* Desktop: Hover tooltip */}
        <div className="group hidden md:inline-block">
          <button
            type="button"
            className="w-5 h-5 bg-gray-400 hover:bg-gray-500 text-white rounded-full text-xs font-bold flex items-center justify-center transition"
            aria-label={title}
          >
            i
          </button>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-0 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
            <div className="bg-black text-white p-3 rounded-lg shadow-lg whitespace-nowrap">
              <div className="font-semibold mb-2 text-sm">{title}</div>
              <div className="text-sm">
                {children}
              </div>
              {/* Arrow */}
              <div className="absolute top-full left-4 -mt-1">
                <div className="border-4 border-transparent border-t-black"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Click to open modal */}
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="w-5 h-5 bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-white rounded-full text-xs font-bold flex items-center justify-center transition md:hidden"
          aria-label={title}
        >
          i
        </button>
      </div>

      {/* Mobile Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 md:hidden">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg">{title}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
                aria-label="Fermer"
              >
                ×
              </button>
            </div>
            <div>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}