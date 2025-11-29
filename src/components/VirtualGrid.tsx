import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { IndexItem } from '../types';
import IndexCard from './IndexCard';

interface Props {
  items: IndexItem[];
  onRemove: (id: string) => void;
  range: "7" | "30" | "90";
  gauge: "svg" | "radial";
}

export default function VirtualGrid({ items, onRemove, range, gauge }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(items.length / 2),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 250,
    overscan: 2,
  });

  return (
    <div
      ref={parentRef}
      className="h-[calc(100vh-300px)] overflow-auto"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * 2;
          const endIndex = Math.min(startIndex + 2, items.length);
          const rowItems = items.slice(startIndex, endIndex);

          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="grid md:grid-cols-2 gap-4"
            >
              {rowItems.map((item) => (
                <IndexCard
                  key={item.id}
                  item={item}
                  onRemove={onRemove}
                  range={range}
                  gauge={gauge}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
