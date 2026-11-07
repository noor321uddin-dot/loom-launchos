/// <reference types="vite/client" />
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';

// Remotion's staticFile() prefixes window.remotion_staticBase, which a plain Vite
// build never sets, so under a subpath (GitHub Pages) images resolved from the site
// root and 404'd. staticFile reads it at render time, so setting it here is enough.
(window as unknown as {remotion_staticBase: string}).remotion_staticBase =
  import.meta.env.BASE_URL.replace(/\/$/, '');
import {Thumbnail} from '@remotion/player';
import {SLIDES} from './slides';
import {C, F} from './theme';

// Presenter for recording a Loom over the slides.
//   →, Space, PageDown  next slide (plays its animation, then holds)
//   ←, PageUp           previous slide
//   R                   replay the current slide (press once at the start to play the cover in)
//   F                   full screen
// Open /?notes in a second window: it follows along and shows the script line.

const FPS = 30;
const channel = new BroadcastChannel('loom-deck');
const params = new URLSearchParams(location.search);
const start = Math.min(Math.max(Number(params.get('s') ?? 1) - 1, 0), SLIDES.length - 1);

type Cmd = 'next' | 'prev' | 'replay' | 'sync';
const keyToCmd = (key: string): Cmd | null => {
  if (['ArrowRight', ' ', 'PageDown'].includes(key)) return 'next';
  if (['ArrowLeft', 'PageUp'].includes(key)) return 'prev';
  if (key === 'r' || key === 'R') return 'replay';
  return null;
};

const Presenter: React.FC = () => {
  const [i, setI] = useState(start);
  const [take, setTake] = useState(0);
  // Until the first keypress the opening slide shows its finished frame,
  // so the page looks complete when the recording starts; R plays it in.
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    channel.postMessage(i);
    const run = (cmd: Cmd) => {
      setArmed(true);
      if (cmd === 'next') setI((v) => Math.min(v + 1, SLIDES.length - 1));
      else if (cmd === 'prev') setI((v) => Math.max(v - 1, 0));
      else if (cmd === 'replay') setTake((t) => t + 1);
      else if (cmd === 'sync') channel.postMessage(i);
    };
    const onKey = (e: KeyboardEvent) => {
      const cmd = keyToCmd(e.key);
      if (cmd) run(cmd);
      else if (e.key === 'f' || e.key === 'F') document.documentElement.requestFullscreen?.();
      else return;
      e.preventDefault();
    };
    // The notes window sends the same commands, so either window can drive.
    const onMsg = (e: MessageEvent) => {
      if (typeof e.data === 'object' && e.data?.cmd) run(e.data.cmd as Cmd);
    };
    window.addEventListener('keydown', onKey);
    channel.addEventListener('message', onMsg);
    return () => {
      window.removeEventListener('keydown', onKey);
      channel.removeEventListener('message', onMsg);
    };
  }, [i]);

  // The Player's own playback sometimes stayed paused at frame 0 after a
  // slide change, so a wall-clock loop picks the frame and <Thumbnail>
  // renders exactly that frame. A throttled tab catches up instead of stalling.
  const s = SLIDES[i];
  const [frame, setFrame] = useState(s.duration - 1);
  useLayoutEffect(() => {
    if (!armed) {
      setFrame(s.duration - 1);
      return;
    }
    const t0 = performance.now();
    let id = 0;
    const tick = (now: number) => {
      const f = Math.min(Math.floor(((now - t0) / 1000) * FPS), s.duration - 1);
      setFrame(f);
      if (f < s.duration - 1) id = requestAnimationFrame(tick);
    };
    setFrame(0);
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [i, take, armed]);

  return (
    <div style={{width: '100vw', height: '100vh', background: C.bg, cursor: 'none'}}>
      <Thumbnail
        key={s.id}
        component={s.component}
        durationInFrames={s.duration}
        fps={FPS}
        compositionWidth={1920}
        compositionHeight={1080}
        frameToDisplay={Math.min(frame, s.duration - 1)}
        style={{width: '100%', height: '100%'}}
      />
    </div>
  );
};

const Notes: React.FC = () => {
  const [i, setI] = useState(start);
  const [linked, setLinked] = useState(false);
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (typeof e.data === 'number') {
        setI(e.data);
        setLinked(true);
      }
    };
    channel.addEventListener('message', onMsg);
    channel.postMessage({cmd: 'sync'});
    // Keys work here too. If a deck window is open it moves and echoes the
    // index back; with no deck open the notes page just pages on its own.
    const onKey = (e: KeyboardEvent) => {
      const cmd = keyToCmd(e.key);
      if (!cmd) return;
      e.preventDefault();
      channel.postMessage({cmd});
      if (cmd === 'next') setI((v) => Math.min(v + 1, SLIDES.length - 1));
      else if (cmd === 'prev') setI((v) => Math.max(v - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => {
      channel.removeEventListener('message', onMsg);
      window.removeEventListener('keydown', onKey);
    };
  }, []);
  const s = SLIDES[i];
  const next = SLIDES[i + 1];
  return (
    <div style={{fontFamily: F.body, background: C.ink, color: C.bg, minHeight: '100vh', padding: 48, boxSizing: 'border-box'}}>
      <div style={{fontFamily: F.mono, color: C.accent, fontSize: 20}}>
        {i + 1} / {SLIDES.length} · {s.id}
        <span style={{color: '#8A949D', marginLeft: 24}}>{linked ? 'linked to deck' : 'no deck window open'}</span>
      </div>
      <div style={{fontSize: 40, lineHeight: 1.4, marginTop: 24}}>{s.say}</div>
      {next && <div style={{fontSize: 22, color: '#8A949D', marginTop: 40}}>Next: {next.id}</div>}
      <div style={{fontFamily: F.mono, fontSize: 16, color: '#8A949D', marginTop: 56}}>
        → or Space: next · ←: back · R: replay slide · keys work in this window or the deck
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(params.has('notes') ? <Notes /> : <Presenter />);
