"use client";
import { useState } from "react";

export default function BookingDialog() {
  const [open, setOpen] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 text-gray-500"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">Prendre rendez-vous</h2>
        <form className="space-y-4">
          <select className="w-full p-3 border rounded">
            <option>Choisir un service</option>
          </select>
          <input type="date" className="w-full p-3 border rounded" />
          <input type="time" className="w-full p-3 border rounded" />
          <input type="text" placeholder="Téléphone" className="w-full p-3 border rounded" />
          <input type="text" placeholder="N° de châssis" className="w-full p-3 border rounded" />
          <textarea placeholder="Commentaire" rows={3} className="w-full p-3 border rounded" />
          <button className="bg-yellow-500 w-full p-3 rounded font-semibold hover:bg-yellow-400">
            Confirmer le rendez-vous
          </button>
        </form>
      </div>
    </div>
  );
}