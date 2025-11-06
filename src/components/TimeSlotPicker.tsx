"use client";

const TIME_SLOTS = [
  "09:00",
  "10:00", 
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00"
];

interface TimeSlotPickerProps {
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  onBack: () => void;
}

export default function TimeSlotPicker({ selectedTime, onTimeSelect, onBack }: TimeSlotPickerProps) {
  // Mock unavailable slots - in real app, this would come from backend
  const unavailableSlots = ["10:00", "15:00"];

  const isSlotAvailable = (time: string) => {
    return !unavailableSlots.includes(time);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-gray-600 hover:text-black">
          ← Retour
        </button>
        <h2 className="text-2xl font-bold">Choisissez un horaire</h2>
        <div></div>
      </div>

      <div className="max-w-md mx-auto">
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
                  <div className="text-xs mt-1">Indisponible</div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Horaires d&apos;ouverture :</p>
          <p>Lun - Ven : 9h00 - 18h00</p>
          <p>Sam : 9h00 - 17h00</p>
          <p>Dim : Fermé</p>
        </div>
      </div>
    </div>
  );
}