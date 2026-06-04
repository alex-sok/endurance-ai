import { SectionShell } from "../components/SectionShell";
import { EdgeStatement } from "../components/EdgeStatement";

/**
 * §11 — The edge (strategic backer).
 *
 * The deck's climax proof point: a $150M logistics brokerage is seeding
 * Endurance as both partner and investor. Treated as a showpiece — a giant
 * count-up $150M over an animated "capital seeds the network" graphic, so
 * the round lands on its strongest fact right before the close.
 *
 * The animation + SVG live in the EdgeStatement client island; this stays a
 * server component so the section shell renders on the server.
 */
export function Edge() {
  return (
    <SectionShell id="edge" index="11" eyebrow="The edge">
      <EdgeStatement />
    </SectionShell>
  );
}
