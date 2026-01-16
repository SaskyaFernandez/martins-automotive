"use client";
import { useState } from "react";
import { getServiceDuration, formatDuration } from "@/utils/serviceDurations";
import { useTranslations, useLocale } from "next-intl";

interface CalendarPickerProps {
  selectedDate: string;
  selectedService: string;
  onDateSelect: (date: string) => void;
  onBack: () => void;
}

export default function CalendarPicker({ selectedDate, selectedService, onDateSelect, onBack }: CalendarPickerProps) {
  const t = useTranslations('appointment');
  const locale = useLocale();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const serviceDuration = getServiceDuration(selectedService);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    // Convert Sunday (0) to 6, and shift other days back by 1
    return day === 0 ? 6 : day - 1;
  };

  const formatDate = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  const isDateAvailable = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate minimum date (3 days from today)
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 3);

    const selectedDateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    selectedDateObj.setHours(0, 0, 0, 0);

    // Available if >= 3 days from today and not Sunday
    return selectedDateObj >= minDate && selectedDateObj.getDay() !== 0;
  };

  const monthNames = locale === 'fr'
    ? ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
    : ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];

  const dayNames = locale === 'fr'
    ? ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
    : ["Maa", "Din", "Woe", "Don", "Vri", "Zat", "Zon"];

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
          {t('back')}
        </button>
        <h2 className="text-2xl font-bold">{t('selectDate')}</h2>
        <div></div>
      </div>

      <div className="mb-6 p-4 bg-amber-100 rounded-lg text-center">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">{selectedService}</span> - {t('duration')} : {formatDuration(serviceDuration, locale)}
        </p>
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
                  p-2 text-center rounded hover:bg-amber-100 transition
                  ${isSelected ? 'bg-yellow-500 text-black font-semibold' : ''}
                  ${!isAvailable ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-amber-100'}
                  ${isAvailable && !isSelected ? 'text-gray-900' : ''}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-sm text-gray-500 text-center">
          <p>{t('calendar.sundaysClosed')}</p>
          <p>{t('calendar.minimumAdvance')}</p>
        </div>
      </div>
    </div>
  );
}