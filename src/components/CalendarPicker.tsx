"use client";
import { useState } from "react";

interface CalendarPickerProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  onBack: () => void;
}

export default function CalendarPicker({ selectedDate, onDateSelect, onBack }: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return new Date(year, month, day).toISOString().split('T')[0];
  };

  const isDateAvailable = (day: number) => {
    const today = new Date();
    const selectedDateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return selectedDateObj >= today && selectedDateObj.getDay() !== 0; // Not Sunday and not in the past
  };

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-gray-600 hover:text-black">
          ← Retour
        </button>
        <h2 className="text-2xl font-bold">Choisissez une date</h2>
        <div></div>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded"
          >
            ←
          </button>
          <h3 className="text-lg font-semibold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded"
          >
            →
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty days for month start */}
          {emptyDays.map(day => (
            <div key={`empty-${day}`} className="p-2"></div>
          ))}
          
          {/* Actual days */}
          {days.map(day => {
            const dateString = formatDate(day);
            const isAvailable = isDateAvailable(day);
            const isSelected = selectedDate === dateString;
            
            return (
              <button
                key={day}
                onClick={() => isAvailable && onDateSelect(dateString)}
                disabled={!isAvailable}
                className={`
                  p-2 text-center rounded hover:bg-gray-100 transition
                  ${isSelected ? 'bg-yellow-500 text-black font-semibold' : ''}
                  ${!isAvailable ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}
                  ${isAvailable && !isSelected ? 'text-gray-900' : ''}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-sm text-gray-500 text-center">
          Les dimanches sont fermés
        </div>
      </div>
    </div>
  );
}