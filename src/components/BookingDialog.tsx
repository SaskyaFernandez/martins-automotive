"use client";
import { useState } from "react";

export default function BookingDialog() {
  const [open, setOpen] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 sm:p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
          aria-label="Fermer"
        >
          ✖
        </button>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 pr-8">
          Prendre rendez-vous
        </h2>
        <form className="space-y-3 sm:space-y-4">
          <select className="w-full p-3 border rounded text-sm sm:text-base">
            <option>Choisir un service</option>
          </select>
          <input type="date" className="w-full p-3 border rounded text-sm sm:text-base" />
          <input type="time" className="w-full p-3 border rounded text-sm sm:text-base" />
          <input
            type="text"
            placeholder="Téléphone"
            className="w-full p-3 border rounded text-sm sm:text-base"
          />
          <input
            type="text"
            placeholder="N° de châssis"
            className="w-full p-3 border rounded text-sm sm:text-base"
          />
          <textarea
            placeholder="Commentaire"
            rows={3}
            className="w-full p-3 border rounded text-sm sm:text-base"
          />
          <button className="bg-yellow-500 w-full p-3 rounded font-semibold hover:bg-yellow-400 transition text-sm sm:text-base">
            Confirmer le rendez-vous
          </button>
        </form>
      </div>
    </div>
  );
}