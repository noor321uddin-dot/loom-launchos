# Loom intro deck (Launch OS application)

Thirteen animated slides built with Remotion, styled after the reference card: pale ground,
heavy Inter Tight headlines, one orange accent word, a dot timeline.

## Record

1. `npm run dev`, open http://localhost:5199 in Chrome.
2. Optional: open http://localhost:5199/?notes in a second window or screen. It follows
   the slides and shows each script line. Keep it off the recorded screen.
3. Press **F** for full screen. Start Loom: Screen + Camera, bubble bottom-left (that corner
   is kept empty on every slide).
4. Press **R** to play the cover in, then **→** or **Space** for each slide. **←** goes back,
   **R** replays the current slide. `?s=6` opens at slide 6.

## Edit

- Words and timing: `src/slides.tsx` (the `say` field is the notes line).
- Colours, fonts, timeline, animations: `src/theme.tsx`.

## Optional MP4

`npm run studio` previews every slide in Remotion Studio. `npm run render` writes
`out/deck.mp4` (needs Remotion's headless Chrome download; not tested on this PC).
