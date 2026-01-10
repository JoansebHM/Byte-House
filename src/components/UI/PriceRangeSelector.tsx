import { useState, useEffect } from "react";

type PriceRangeSelectorProps = {
  minPrice: number;
  maxPrice: number;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
};

const PriceRangeSelector = ({
  minPrice,
  maxPrice,
  priceRange,
  onPriceChange,
}: PriceRangeSelectorProps) => {
  const [localRange, setLocalRange] = useState<[number, number]>(priceRange);

  const priceRangeKey = `${priceRange[0]}-${priceRange[1]}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localRange[0] !== priceRange[0] || localRange[1] !== priceRange[1]) {
        onPriceChange(localRange);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [localRange, onPriceChange, priceRangeKey, priceRange]);

  const getPercent = (value: number) =>
    Math.round(((value - minPrice) / (maxPrice - minPrice)) * 100);

  return (
    <div className="space-y-6">
      <div className="relative h-2 w-full mt-8">
        <div className="absolute h-full w-full bg-gray-200 dark:bg-gray-800 rounded-full" />

        <div
          className="absolute h-full bg-black dark:bg-white rounded-full"
          style={{
            left: `${getPercent(localRange[0])}%`,
            width: `${getPercent(localRange[1]) - getPercent(localRange[0])}%`,
          }}
        />

        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step={5000}
          value={localRange[0]}
          onChange={(e) => {
            const val = Math.min(
              Number(e.target.value),
              localRange[1] - 100000
            );
            setLocalRange([val, localRange[1]]);
          }}
          className="range-thumb-custom z-20"
        />

        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step={5000}
          value={localRange[1]}
          onChange={(e) => {
            const val = Math.max(
              Number(e.target.value),
              localRange[0] + 100000
            );
            setLocalRange([localRange[0], val]);
          }}
          className="range-thumb-custom z-30"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="border-2 border-black dark:border-white p-2 bg-white dark:bg-black">
          <span className="block text-[10px] uppercase font-bold text-gray-400">
            Desde
          </span>
          <span className="font-mono font-bold">
            ${localRange[0].toLocaleString()}
          </span>
        </div>
        <div className="border-2 border-black dark:border-white p-2 bg-white dark:bg-black">
          <span className="block text-[10px] uppercase font-bold text-gray-400">
            Hasta
          </span>
          <span className="font-mono font-bold">
            ${localRange[1].toLocaleString()}
          </span>
        </div>
      </div>

      <style>{`
        .range-thumb-custom {
          position: absolute;
          width: 100%;
          pointer-events: none;
          appearance: none;
          height: 0;
          top: 50%;
          transform: translateY(-50%);
          outline: none;
        }
        .range-thumb-custom::-webkit-slider-thumb {
          appearance: none;
          pointer-events: auto;
          width: 20px;
          height: 20px;
          border-radius: 100%; /* Cuadrados para estilo moderno */
          background: black;
          border: 2px solid white;
          cursor: pointer;
        }
        .dark .range-thumb-custom::-webkit-slider-thumb {
          background: white;
          border: 2px solid black;
        }
        .range-thumb-custom::-moz-range-thumb {
          pointer-events: auto;
          width: 20px;
          height: 20px;
          border-radius: 0%;
          background: black;
          border: 2px solid white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default PriceRangeSelector;
