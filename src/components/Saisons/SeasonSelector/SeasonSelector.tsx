"use client"
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import "./SeasonSelector.css";

interface SeasonSelectorProps {
  year: string;
}

const SeasonSelector: React.FC<SeasonSelectorProps> = ({ year }) => {
  const router = useRouter();
  const minYear = 2015;
  const maxYear = 2025;

  const [season, setSeason] = useState(Number(year));
  const [index, setIndex] = useState(Number(year));
  const [thumbLeft, setThumbLeft] = useState(0);
  const sliderRef = useRef<HTMLInputElement>(null);

  const updateThumbPosition = useCallback(() => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const percent = (index - minYear) / (maxYear - minYear);
    const sliderWidth = slider.offsetWidth;
    const thumbWidth = 25;
    const padding = thumbWidth / 2;

    const left = percent * (sliderWidth - thumbWidth) + padding;
    setThumbLeft(left);
  }, [index]);

  useLayoutEffect(() => {
    updateThumbPosition();
  }, [updateThumbPosition])

  useEffect(() => {
    window.addEventListener('resize', updateThumbPosition);
    return () => window.removeEventListener('resize', updateThumbPosition);
  }, [updateThumbPosition]);

  useEffect(() => {
    if (season.toString() !== year) {
      router.push(season.toString());
    }
  }, [season, year, router]);

  const commitChange = () => {
    setSeason(index);
  };

  return (
    <div className='season-slider-container'>
      <input
        ref={sliderRef}
        className='slider'
        type="range"
        min={minYear}
        max={maxYear}
        step={1}
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
        onMouseUp={commitChange}
        onTouchEnd={commitChange}
      />
      <div
        className="slider-thumb-label font20"
        style={{
          left: `${thumbLeft}px`
        }}
      >
        {index}
      </div>
    </div>
  );
};

export default SeasonSelector;