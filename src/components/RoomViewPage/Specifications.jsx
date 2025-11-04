import React from 'react';

const Specifications = () => {
  const specs = [
    { feature: 'Occupancy', details: '2 Adults' },
    { feature: 'Bed Type', details: 'King or Twin Beds' },
    { feature: 'Size', details: '450 sq ft' },
    { feature: 'View', details: 'City or Garden View' },
    { feature: 'Check-in/Check-out', details: '11:00 AM / 9:00 AM' },
  ];

  return (
    <>
      <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Specifications
      </h2>
      <div className="px-4 py-3">
        <div className="flex overflow-hidden rounded-xl border border-[#dbe0e6] bg-white">
          <table className="flex-1">
            <thead>
              <tr className="bg-white">
                <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                  Feature
                </th>
                <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {specs.map((spec, index) => (
                <tr key={index} className="border-t border-t-[#dbe0e6]">
                  <td className="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                    {spec.feature}
                  </td>
                  <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal">
                    {spec.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Specifications;
