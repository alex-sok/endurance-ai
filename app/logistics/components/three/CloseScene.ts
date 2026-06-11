import type { SceneAPI, SceneInitOpts } from "./SceneCanvas";
import { createNightScene } from "./NightScene";

/**
 * §12 close — the SAME night world as the hero, re-shot from road level
 * with a dawn horizon. The bookend is literal: one world, journey done.
 * Wire a ScrollTrigger's progress to api.setProgress to brighten dawn.
 */
export function init(opts: SceneInitOpts): SceneAPI {
  return createNightScene(opts, "road");
}
