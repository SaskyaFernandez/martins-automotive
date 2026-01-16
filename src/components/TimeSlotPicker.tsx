"use client";
import { useState, useEffect } from "react";
import { getAvailabilityWithCapacity } from "@/utils/appointmentApi";
import { getServiceDuration, canFitInWorkingHours, formatDuration } from "@/utils/serviceDurations";
import { useTranslations, useLocale } from "next-intl";

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00"
];

interface TimeSlotPickerProps {
  selectedTime: string;
  selectedDate: string;
  selectedService: string; // Added to determine duration
  onTimeSelect: (time: string) => void;
  onDateChange: (date: string) => void; // Added to allow date navigation
  onBack: () => void;
}

export default function TimeSlotPicker({ selectedTime, selectedDate, selectedService, onTimeSelect, onDateChange, onBack }: TimeSlotPickerProps) {
  const t = useTranslations('appointment');
  const locale = useLocale();
  const [availableSlots, setAvailableSlots] = useState<string[]>(TIME_SLOTS);
  const [loading, setLoading] = useState(true);
  const serviceDuration = getServiceDuration(selectedService);

  // Format the selected date for display
  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString + 'T12:00:00');
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return date.toLocaleDateString(locale, options);
  };

  // Navigate to previous day
  const goToPreviousDay = () => {
    const currentDate = new Date(selectedDate + 'T12:00:00');
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);

    // Don't allow dates in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (previousDate >= today) {
      const year = previousDate.getFullYear();
      const month = String(previousDate.getMonth() + 1).padStart(2, '0');
      const day = String(previousDate.getDate()).padStart(2, '0');
      onDateChange(`${year}-${month}-${day}`);
    }
  };

  // Navigate to next day
  const goToNextDay = () => {
    const currentDate = new Date(selectedDate + 'T12:00:00');
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);

    const year = nextDate.getFullYear();
    const month = String(nextDate.getMonth() + 1).padStart(2, '0');
    const day = String(nextDate.getDate()).padStart(2, '0');
    onDateChange(`${year}-${month}-${day}`);
  };

  // Check if we can go to previous day
  const canGoPrevious = () => {
    const currentDate = new Date(selectedDate + 'T12:00:00');
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return previousDate >= today;
  };

  useEffect(() => {
    async function fetchAvailability() {
      if (!selectedDate || !selectedService) return;

      try {
        setLoading(true);

        // Create date range as ISO strings without timezone conversion
        // This keeps the date in the selected day regardless of timezone
        const dateMin = `${selectedDate}T00:00:00.000Z`;
        const dateMax = `${selectedDate}T23:59:59.999Z`;

        const response = await getAvailabilityWithCapacity(dateMin, dateMax, selectedService);

        console.log('Selected date:', selectedDate);
        console.log('Response slots:', response.slots);
        console.log('Capacity info:', response.capacityInfo);

        // Extract available time slots for the selected date
        const availableTimes = response.slots
          .filter(slot => {
            console.log('Comparing slot.date:', slot.date, 'with selectedDate:', selectedDate);
            return slot.date === selectedDate && slot.available;
          })
          .map(slot => slot.time);

        console.log('Available times:', availableTimes);

        setAvailableSlots(availableTimes);
      } catch (error) {
        console.error("Error fetching availability:", error);
        // Fallback to all slots if there's an error
        setAvailableSlots(TIME_SLOTS);
      } finally {
        setLoading(false);
      }
    }

    fetchAvailability();
  }, [selectedDate, selectedService]);

  const isSlotAvailable = (time: string) => {
    // Check if slot is available from backend
    const backendAvailable = availableSlots.includes(time);

    // Check if service can fit in working hours
    const fitsInWorkingHours = canFitInWorkingHours(time, serviceDuration);

    return backendAvailable && fitsInWorkingHours;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-gray-600 hover:text-black">
          {t('back')}
        </button>
        <h2 className="text-2xl font-bold">{t('selectTime')}</h2>
        <div></div>
      </div>

      {/* Date navigation */}
      <div className="mb-6 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={goToPreviousDay}
            disabled={!canGoPrevious()}
            className={`p-2 rounded-lg transition ${
              canGoPrevious()
                ? 'hover:bg-yellow-100 text-gray-700'
                : 'text-gray-300 cursor-not-allowed'
            }`}
            aria-label={t('timeSlot.previousDay')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <div className="text-center flex-1">
            <p className="text-lg font-bold text-gray-800 capitalize">
              {formatDisplayDate(selectedDate)}
            </p>
          </div>

          <button
            onClick={goToNextDay}
            className="p-2 rounded-lg hover:bg-yellow-100 text-gray-700 transition"
            aria-label={t('timeSlot.nextDay')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-6 p-4 bg-amber-100 rounded-lg text-center">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">{selectedService}</span> - {t('duration')} : {formatDuration(serviceDuration, locale)}
        </p>
      </div>

      <div className=" mx-auto">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <p className="mt-2 text-gray-600">{t('timeSlot.loadingAvailability')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
          {TIME_SLOTS.map((time) => {
            const isAvailable = isSlotAvailable(time);
            const isSelected = selectedTime === time;
            
            return (
              <button
                key={time}
                onClick={() => isAvailable && onTimeSelect(time)}
                disabled={!isAvailable}
                className={`
                  p-4 rounded-lg border-2 transition font-semibold
                  ${isSelected 
                    ? 'bg-yellow-500 border-yellow-500 text-black' 
                    : isAvailable
                    ? 'bg-white border-gray-300 hover:border-yellow-500 hover:bg-yellow-50'
                    : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                <div className="text-lg">{time}</div>
                {!isAvailable && (
                  <div className="text-xs mt-1">{t('timeSlot.unavailable')}</div>
                )}
              </button>
            );
          })}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>{t('timeSlot.openingHours')}</p>
          <p>{t('timeSlot.mondayFriday')}</p>
          <p>{t('timeSlot.saturday')}</p>
          <p>{t('timeSlot.sunday')}</p>
        </div>
      </div>
    </div>
  );
}