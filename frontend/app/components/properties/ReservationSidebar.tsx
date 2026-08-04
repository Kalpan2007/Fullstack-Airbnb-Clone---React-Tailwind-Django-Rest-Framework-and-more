"use client";

import { useState } from "react";
import { StaticProperty } from "@/app/data/properties";

interface ReservationSidebarProps {
  property: StaticProperty;
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({
  property,
}) => {
  const [guests, setGuests] = useState("1");
  const nights = 1;
  const fee = (property.price_per_night / 100) * 5;
  const totalPrice = property.price_per_night + fee;
  const guestsRange = Array.from(
    { length: property.guests },
    (_, index) => index + 1
  );

  return (
    <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
      <h2 className="mb-5 text-2xl">${property.price_per_night} per night</h2>

      <div className="mb-6 p-3 border border-gray-400 rounded-xl">
        <label className="mb-2 block font-bold text-xs">Guests</label>

        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="w-full -ml-1 text-sm"
        >
          {guestsRange.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl cursor-pointer">
        Book
      </div>

      <div className="mb-4 flex justify-between align-center">
        <p>
          ${property.price_per_night} * {nights} nights
        </p>
        <p>${property.price_per_night * nights}</p>
      </div>

      <div className="mb-4 flex justify-between align-center">
        <p>Djangobnb fee</p>
        <p>${fee}</p>
      </div>

      <hr />

      <div className="mt-4 flex justify-between align-center font-bold">
        <p>Total</p>
        <p>${totalPrice}</p>
      </div>
    </aside>
  );
};

export default ReservationSidebar;
