import React from 'react';
import { PropsAdvantageList } from '@/components/advantage/advantage.interface';
import { Advantage } from '@/components/advantage/advantage';

export function AdvantageList({ advantage, className }: PropsAdvantageList) {
  return (
    <div className={className}>
      {advantage.map((item, index) => (
        <Advantage key={index} {...item} />
      ))}
    </div>
  );
}
