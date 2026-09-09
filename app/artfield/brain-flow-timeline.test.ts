import assert from 'node:assert/strict';
import { test } from 'node:test';
import { advancePlayback, playbackFrame, PHASE_DURATION, SEQUENCE_DURATION } from './brain-flow-timeline.ts';

test('each phase starts at its exact boundary', () => {
  assert.deepEqual(playbackFrame(0), { phase: 0, progress: 0, complete: false });
  assert.equal(playbackFrame(PHASE_DURATION - 1).phase, 0);
  assert.deepEqual(playbackFrame(PHASE_DURATION), { phase: 1, progress: 0, complete: false });
  assert.deepEqual(playbackFrame(PHASE_DURATION * 2), { phase: 2, progress: 0, complete: false });
});

test('playback ends on the complete story, never loops or indexes a fourth phase', () => {
  assert.deepEqual(playbackFrame(SEQUENCE_DURATION), { phase: 2, progress: 1, complete: true });
  assert.deepEqual(playbackFrame(SEQUENCE_DURATION + 9000), playbackFrame(SEQUENCE_DURATION));
  assert.equal(advancePlayback(SEQUENCE_DURATION - 100, 200), SEQUENCE_DURATION);
});

test('pause and fresh-clock resume preserve the current position', () => {
  const paused = PHASE_DURATION + 2700;
  assert.equal(advancePlayback(paused, 0), paused);
  assert.equal(advancePlayback(paused, 16), paused + 16);
  assert.equal(advancePlayback(paused, -50), paused);
});

test('seeking and replaying start a phase without inheriting old progress', () => {
  assert.deepEqual(playbackFrame(0), { phase: 0, progress: 0, complete: false });
  assert.equal(playbackFrame(-20).progress, 0);
  assert.equal(playbackFrame(PHASE_DURATION / 2).progress, 0.5);
  assert.equal(playbackFrame(PHASE_DURATION * 2).complete, false);
});
