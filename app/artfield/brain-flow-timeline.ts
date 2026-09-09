export const PHASE_DURATION = 5_000;
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

export function phasePreviewTime(phase: number) {
  return [0, PHASE_DURATION * 1.5, SEQUENCE_DURATION][phase] ?? 0;
}

export function ticketTiming(index: number) {
  return { delay: 1200 + index * 470, duration: 2250 };
}

export function bubbleTiming(index: number) {
  return { delay: 10200 + index * 950, duration: 1150 };
}
