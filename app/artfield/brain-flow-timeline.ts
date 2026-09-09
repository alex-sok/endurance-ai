export const PHASE_DURATION = 6_000;
export const SEQUENCE_DURATION = PHASE_DURATION * 3;

export function playbackFrame(elapsed: number) {
  const time = Math.max(0, Math.min(elapsed, SEQUENCE_DURATION));
  const phase = Math.min(2, Math.floor(time / PHASE_DURATION));
  return {
    phase,
    progress: (time - phase * PHASE_DURATION) / PHASE_DURATION,
    complete: time === SEQUENCE_DURATION,
  };
}

export function advancePlayback(elapsed: number, delta: number) {
  return Math.max(0, Math.min(elapsed + Math.max(0, delta), SEQUENCE_DURATION));
}
