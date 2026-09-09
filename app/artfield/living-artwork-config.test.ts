import assert from 'node:assert/strict';
import { test } from 'node:test';
import { BOAT_LIMIT, coverTransform, motionMaps, objectPosition, REGION_LIMIT } from './living-artwork-config.ts';

test('cover keeps the full source when aspect ratios match', () => {
  assert.deepEqual(coverTransform(1659, 948, 1659, 948, [.5, .72]), { scale: [1, 1], offset: [0, 0] });
});

test('portrait art direction crops horizontally without moving source-space masks', () => {
  const crop = coverTransform(400, 800, 1600, 900, [.83, .5]);
  assert.equal(crop.scale[1], 1);
  assert.equal(crop.offset[1], 0);
  assert.equal(crop.offset[0], (1 - crop.scale[0]) * .83);
  assert.ok(crop.offset[0] + crop.scale[0] <= 1);
});

test('wide sections crop vertically using their CSS object-position', () => {
  const crop = coverTransform(1600, 500, 1600, 900, [.5, .77]);
  assert.equal(crop.scale[0], 1);
  assert.equal(crop.offset[0], 0);
  assert.equal(crop.offset[1], (1 - crop.scale[1]) * .77);
});

test('all existing responsive object positions are supported', () => {
  assert.deepEqual(objectPosition('50% 72%'), [.5, .72]);
  assert.deepEqual(objectPosition('83% center'), [.83, .5]);
  assert.deepEqual(objectPosition('76% bottom'), [.76, 1]);
  assert.deepEqual(objectPosition('center'), [.5, .5]);
  assert.deepEqual(objectPosition('top'), [.5, 0]);
});

test('all localized masks fit the shader limits and use valid image coordinates', () => {
  for (const map of Object.values(motionMaps)) {
    for (const category of ['clouds', 'water', 'leaves', 'lights', 'falls'] as const) {
      assert.ok(map[category].length <= REGION_LIMIT);
      for (const [x, y, rx, ry] of map[category]) {
        assert.ok(x >= 0 && x <= 1 && y >= 0 && y <= 1);
        assert.ok(rx > 0 && rx < .5 && ry > 0 && ry < .5);
      }
    }
    assert.ok(map.boats.length <= BOAT_LIMIT);
    for (const { region: [x, y, rx, ry], pivot } of map.boats) {
      assert.ok(Math.abs(pivot[0] - x) <= rx && Math.abs(pivot[1] - y) <= ry);
    }
  }
});
