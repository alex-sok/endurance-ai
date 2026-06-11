import type { SceneAPI, SceneInitOpts } from "./SceneCanvas";
import { createNightScene } from "./NightScene";

/** §1 hero — the night network from above. Lazy-loaded by SceneCanvas. */
export function init(opts: SceneInitOpts): SceneAPI {
  return createNightScene(opts, "aerial");
}
