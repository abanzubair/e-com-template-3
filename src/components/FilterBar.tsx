import React from 'react';

interface FilterBarProps {
  fabrics: string[];
  activeFabric: string;
  onSelectFabric: (fabric: string) => void;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  fabrics,
  activeFabric,
  onSelectFabric,
  totalCount,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#eee8dc]">
      {/* Horizontal Fabric Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
        <button
          onClick={() => onSelectFabric('all')}
          className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-[0.14em] transition-all whitespace-nowrap ${
            activeFabric === 'all'
              ? 'bg-[#1a1918] text-[#fcfbf8]'
              : 'text-[#6c665e] hover:text-[#1a1918] hover:bg-[#f3efe6]'
          }`}
        >
          All Sarees
        </button>

        {fabrics.map((fabric) => {
          const isActive = activeFabric.toLowerCase() === fabric.toLowerCase();
          return (
            <button
              key={fabric}
              onClick={() => onSelectFabric(fabric)}
              className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-[0.14em] transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#1a1918] text-[#fcfbf8]'
                  : 'text-[#6c665e] hover:text-[#1a1918] hover:bg-[#f3efe6]'
              }`}
            >
              {fabric}
            </button>
          );
        })}
      </div>

      {/* Item Counter */}
      <div className="text-xs tracking-wider uppercase text-[#948e85] font-medium shrink-0">
        Showing {totalCount} {totalCount === 1 ? 'Design' : 'Designs'}
      </div>
    </div>
  );
};
