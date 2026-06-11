import { SectionShell } from "../components/SectionShell";
import { ProductDemo } from "../components/ProductDemo";
import { isPlaceholder } from "../lib/placeholders";

/**
 * §4 — Product. ★ The page's signature moment (DESIGN-V2.md).
 *
 * Server shell only: headline + caption. All choreography (panel
 * entrance, transcript-driven lane map, replay) lives in the
 * ProductDemo client island.
 *
 * The transcript is scripted, NOT a live LLM call — investors who
 * pause mid-scroll need to see the same thing every time.
 */

// Hidden by the data-hygiene rule until the TODO is resolved — the
// caption claims live data we can't show yet (DESIGN-V2.md rule #8).
const CAPTION_NOTE = "// TODO(alex): swap for real load IDs";

export function Product() {
  return (
    <SectionShell id="product" index="04" eyebrow="The product">
      <h2 className="logi-display-md v2-product__headline">
        Meet the dispatcher that{" "}
        <span className="v2-product__accent">never sleeps</span>.
      </h2>

      <ProductDemo />

      {!isPlaceholder(CAPTION_NOTE) ? (
        <p className="logi-body logi-body-muted v2-product__caption">
          Live dashboard. Every load above is a real active route on the
          Endurance network. <span className="logi-mono">{CAPTION_NOTE}</span>
        </p>
      ) : null}
    </SectionShell>
  );
}
