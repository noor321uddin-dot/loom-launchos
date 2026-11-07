import React from 'react';
import {
  AbsoluteFill,
  Img,
  staticFile,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {loadFont as loadInterTight} from '@remotion/google-fonts/InterTight';
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';

// Design tokens taken from the reference card: pale blue-grey ground,
// near-black heavy grotesk, one orange accent, hairline timeline.
export const C = {
  bg: '#E7ECEF',
  ink: '#121519',
  body: '#4A535C',
  muted: '#7C868F',
  line: '#A9B1B8',
  accent: '#E5572B',
  accentText: '#C2441B', // accent dark enough for small text on bg
};

export const F = {
  heading: loadInterTight('normal', {weights: ['600', '800'], subsets: ['latin']}).fontFamily,
  body: loadInter('normal', {weights: ['400', '600', '700'], subsets: ['latin']}).fontFamily,
  mono: loadMono('normal', {weights: ['500', '700'], subsets: ['latin']}).fontFamily,
};

// Content column starts at x=560 so the left third, and the Loom face
// bubble in the bottom-left corner, never covers anything.
export const COL_X = 560;
export const COL_W = 1232;

const useSpring = (delay: number, damping = 200) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config: {damping}});
};

// With `media`, the slide splits: text on the left (kept above y=780 so the
// face bubble stays clear) and proof screenshots on the right.
export const MEDIA_W = 852;

export const Frame: React.FC<{n: number; total: number; children: React.ReactNode; media?: React.ReactNode}> = ({
  n,
  total,
  children,
  media,
}) => {
  const p = useSpring(0);
  const column: React.CSSProperties = media
    ? {left: 128, width: 732, top: 150, bottom: 300}
    : {left: COL_X, width: COL_W, top: 0, bottom: 0};
  return (
    <AbsoluteFill style={{background: C.bg, fontFamily: F.body, color: C.ink}}>
      <div
        style={{
          position: 'absolute',
          left: 128,
          right: 128,
          top: 88,
          display: 'flex',
          justifyContent: 'space-between',
          opacity: p,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 3,
        }}
      >
        <span>NOOR UDDIN</span>
        <span style={{color: C.muted, fontFamily: F.mono, fontWeight: 500}}>
          {String(n).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
      <div
        style={{
          position: 'absolute',
          ...column,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: media ? 32 : 40,
        }}
      >
        {children}
      </div>
      {media && (
        <div
          style={{
            position: 'absolute',
            left: 1920 - 128 - MEDIA_W,
            width: MEDIA_W,
            top: 120,
            bottom: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {media}
        </div>
      )}
    </AbsoluteFill>
  );
};

export const Rise: React.FC<{delay: number; children: React.ReactNode; style?: React.CSSProperties}> = ({
  delay,
  children,
  style,
}) => {
  const p = useSpring(delay);
  return (
    <div style={{opacity: p, transform: `translateY(${(1 - p) * 32}px)`, ...style}}>{children}</div>
  );
};

export const Eyebrow: React.FC<{children: React.ReactNode; delay?: number}> = ({children, delay = 2}) => (
  <Rise delay={delay}>
    <div style={{fontSize: 24, fontWeight: 700, letterSpacing: 3, color: C.accentText, textTransform: 'uppercase'}}>
      {children}
    </div>
  </Rise>
);

// A line quoted from the Launch OS posting, so each slide states which
// requirement it answers before showing the proof.
export const JobQuote: React.FC<{topic: string; children: React.ReactNode}> = ({topic, children}) => (
  <Rise delay={2}>
    <div style={{borderLeft: `4px solid ${C.accent}`, paddingLeft: 22}}>
      <div style={{fontSize: 22, fontWeight: 700, letterSpacing: 3, color: C.accentText, textTransform: 'uppercase'}}>
        Your posting · {topic}
      </div>
      <div style={{fontSize: 28, lineHeight: 1.35, color: C.body, fontStyle: 'italic', marginTop: 6, maxWidth: 1100}}>
        “{children}”
      </div>
    </div>
  </Rise>
);

export const A: React.FC<{children: React.ReactNode}> = ({children}) => (
  <span style={{color: C.accent}}>{children}</span>
);

const Line: React.FC<{delay: number; children: React.ReactNode}> = ({delay, children}) => {
  const p = useSpring(delay);
  return (
    <div style={{overflow: 'hidden', paddingBottom: 6}}>
      <div style={{transform: `translateY(${(1 - p) * 110}%)`}}>{children}</div>
    </div>
  );
};

export const Headline: React.FC<{lines: React.ReactNode[]; delay?: number; size?: number}> = ({
  lines,
  delay = 6,
  size = 112,
}) => (
  <div
    style={{
      fontFamily: F.heading,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.0,
      letterSpacing: -size * 0.03,
    }}
  >
    {lines.map((l, i) => (
      <Line key={i} delay={delay + i * 5}>
        {l}
      </Line>
    ))}
  </div>
);

export const Sub: React.FC<{children: React.ReactNode; delay: number; size?: number; color?: string}> = ({
  children,
  delay,
  size = 34,
  color = C.body,
}) => (
  <Rise delay={delay}>
    <div style={{fontSize: size, lineHeight: 1.4, color, maxWidth: 1100}}>{children}</div>
  </Rise>
);

export const CountUp: React.FC<{to: number; delay: number; duration?: number}> = ({to, delay, duration = 36}) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [delay, delay + duration], [0, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return <span style={{fontVariantNumeric: 'tabular-nums'}}>{Math.round(v).toLocaleString('en-US')}</span>;
};

export type Stop = {label: string; sub?: string; active?: boolean};

// The reference card's timeline: a hairline that draws across, hollow
// dots that pop in order, the final (or chosen) stop filled orange.
export const Timeline: React.FC<{stops: Stop[]; delay: number; width?: number}> = ({
  stops,
  delay,
  width = COL_W,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const dot = 26;
  const span = width - 200;
  const step = span / (stops.length - 1);
  const draw = interpolate(frame, [delay, delay + 10 + stops.length * 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  return (
    <div style={{position: 'relative', width, height: 120}}>
      <div
        style={{
          position: 'absolute',
          left: dot / 2,
          top: dot / 2 - 1,
          height: 2,
          width: span * draw,
          background: C.line,
        }}
      />
      {stops.map((s, i) => {
        const p = spring({frame: frame - delay - 4 - i * 6, fps, config: {damping: 12, mass: 0.6}});
        const t = spring({frame: frame - delay - 8 - i * 6, fps, config: {damping: 200}});
        return (
          <div key={s.label} style={{position: 'absolute', left: i * step, top: 0, width: 200}}>
            <div
              style={{
                width: dot,
                height: dot,
                borderRadius: dot,
                boxSizing: 'border-box',
                border: `3px solid ${s.active ? C.accent : C.ink}`,
                background: s.active ? C.accent : C.bg,
                transform: `scale(${p})`,
              }}
            />
            <div style={{opacity: t, transform: `translateY(${(1 - t) * 10}px)`, marginTop: 18}}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  color: s.active ? C.accentText : C.ink,
                  whiteSpace: 'nowrap',
                }}
              >
                {s.label}
              </div>
              {s.sub && <div style={{fontSize: 20, color: C.muted, marginTop: 4, whiteSpace: 'nowrap'}}>{s.sub}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Strike: React.FC<{children: React.ReactNode; delay: number}> = ({children, delay}) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [delay, delay + 12], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return (
    <span style={{position: 'relative', display: 'inline-block'}}>
      {children}
      <span
        style={{position: 'absolute', left: -6, top: '52%', height: 8, width: `calc(${w / 100} * (100% + 12px))`, background: C.accent}}
      />
    </span>
  );
};

export type Rect = {x: number; y: number; w: number; h: number};

// A real screenshot in a browser window. `crop` (source pixels) picks the
// region to show at `width`; `marks` are rows to circle in orange, popping
// in after the window lands so the eye goes where the voice is.
export const Shot: React.FC<{
  src: string;
  srcW: number;
  crop: Rect;
  width: number;
  label: string;
  delay: number;
  marks?: Rect[];
  style?: React.CSSProperties;
}> = ({src, srcW, crop, width, label, delay, marks = [], style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: {damping: 200}});
  const k = width / crop.w;
  return (
    <div
      style={{
        width,
        background: '#FFFFFF',
        borderRadius: 14,
        overflow: 'hidden',
        border: '1px solid #D2D9DE',
        boxShadow: '0 30px 80px rgba(18,21,25,0.16), 0 2px 6px rgba(18,21,25,0.08)',
        opacity: p,
        transform: `translateX(${(1 - p) * 80}px)`,
        ...style,
      }}
    >
      <div style={{height: 40, background: '#F2F5F7', display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px'}}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{width: 12, height: 12, borderRadius: 12, background: '#C9D0D6'}} />
        ))}
        <div style={{marginLeft: 12, fontSize: 18, fontWeight: 600, color: C.muted}}>{label}</div>
      </div>
      <div style={{position: 'relative', height: crop.h * k, overflow: 'hidden'}}>
        <Img
          src={staticFile(src)}
          style={{position: 'absolute', left: -crop.x * k, top: -crop.y * k, width: srcW * k}}
        />
        {marks.map((m, i) => {
          const s = spring({frame: frame - delay - 20 - i * 8, fps, config: {damping: 14, mass: 0.6}});
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: (m.x - crop.x) * k - 6,
                top: (m.y - crop.y) * k - 4,
                width: m.w * k + 12,
                height: m.h * k + 8,
                border: `4px solid ${C.accent}`,
                borderRadius: 10,
                boxShadow: '0 0 0 6px rgba(229,87,43,0.15)',
                opacity: Math.min(s, 1),
                transform: `scale(${0.9 + 0.1 * s})`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const Phone: React.FC<{src: string; width: number; delay: number; style?: React.CSSProperties}> = ({
  src,
  width,
  delay,
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: {damping: 200}});
  return (
    <div
      style={{
        width,
        height: width * 2.05,
        borderRadius: 40,
        border: `10px solid ${C.ink}`,
        overflow: 'hidden',
        background: C.ink,
        boxShadow: '0 30px 80px rgba(18,21,25,0.25)',
        opacity: p,
        transform: `translateY(${(1 - p) * 60}px)`,
        ...style,
      }}
    >
      <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top'}} />
    </div>
  );
};
