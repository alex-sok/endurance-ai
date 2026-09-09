import assert from 'node:assert/strict';
import { test } from 'node:test';
import { advancePlayback, bubbleTiming, phasePreviewTime, playbackFrame, PHASE_DURATION, SEQUENCE_DURATION, ticketTiming } from './brain-flow-timeline.ts';

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

test('every ticket merges before the first chat bubble emerges', () => {
  const lastTicket = ticketTiming(7);
  const firstBubble = bubbleTiming(0);
  assert.ok(lastTicket.delay + lastTicket.duration < firstBubble.delay);
  assert.ok(lastTicket.delay + lastTicket.duration < phasePreviewTime(1));
});

test('all chat bubbles finish before the final hold', () => {
  const lastBubble = bubbleTiming(2);
  assert.ok(lastBubble.delay + lastBubble.duration < SEQUENCE_DURATION);
  assert.equal(phasePreviewTime(2), SEQUENCE_DURATION);
});

test('manual step previews show distinct meaningful moments', () => {
  for (let phase = 0; phase < 3; phase++) {
    assert.equal(playbackFrame(phasePreviewTime(phase)).phase, phase);
  }
});
