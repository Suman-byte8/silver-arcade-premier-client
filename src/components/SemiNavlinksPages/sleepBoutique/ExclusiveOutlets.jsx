import React from "react";
import banquite from '../../../assets/SleepBonquite/banquite.webp'


const ExclusiveOutlets = () => {
  return (
    <section className="mb-16">
      <h3 className="text-center text-2xl font-serif font-bold mb-6 tracking-wide">
        Exclusive Silver Arcade Premier Services
      </h3>
      <p className="text-center text-gray-500 mb-12 italic">
        Located at: Silver Arcade Premier, Rathbari More, Malda
      </p>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
        <img
          src={banquite}
          alt="Boutique Outlet"
          className="rounded-lg shadow-lg object-cover w-full h-80"
        />
        <div>
          <h4 className="font-semibold mb-2">Silver Arcade Premier</h4>
          <p className="text-gray-700 mb-1">
            Address - Rathbari More, Ward No. 24, Malda, West Bengal 732101
          </p>
          <p className="text-gray-700 mb-1">
            Services Offered - Luxury Rooms, Banquets, Spa, Wellness, Dining, Premium Events
          </p>
          <p className="text-gray-700 mb-1">
            Location - Central Malda (Rathbari More)
          </p>
          <p className="text-gray-700 mb-1">
            Operational Timing - 24x7 Services
          </p>
          <p className="text-gray-700 mb-4">
            Contact Details - {import.meta.env.VITE_CONTACT_PHONE} | {import.meta.env.VITE_CONTACT_EMAIL}
          </p>
          <button className="text-sm border border-gray-400 rounded-full px-4 py-1 hover:bg-gray-100 transition">
            EXPLORE MORE
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveOutlets;
