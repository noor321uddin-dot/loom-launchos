import React from 'react';
import {Composition, Series} from 'remotion';
import {SLIDES} from '../slides';

// Studio view of every slide, plus FullDeck for an MP4 render
// (each slide plays its animation, then holds for 3 seconds).
const HOLD = 90;

const FullDeck: React.FC = () => (
  <Series>
    {SLIDES.map((s) => (
      <Series.Sequence key={s.id} durationInFrames={s.duration + HOLD}>
        <s.component />
      </Series.Sequence>
    ))}
  </Series>
);

export const Root: React.FC = () => (
  <>
    <Composition
      id="FullDeck"
      component={FullDeck}
      durationInFrames={SLIDES.reduce((t, s) => t + s.duration + HOLD, 0)}
      fps={30}
      width={1920}
      height={1080}
    />
    {SLIDES.map((s) => (
      <Composition key={s.id} id={s.id} component={s.component} durationInFrames={s.duration} fps={30} width={1920} height={1080} />
    ))}
  </>
);
