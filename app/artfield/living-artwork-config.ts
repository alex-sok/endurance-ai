// Regions are authored in the original artwork's top-left, normalized coordinates.
// The image files stay untouched; only these small areas are allowed to move.
export type Region = readonly [number, number, number, number];
export type Boat = { region: Region; pivot: readonly [number, number] };
export type ArtworkKind = 'sunrise' | 'atelier' | 'world';
export const REGION_LIMIT = 6;
export const BOAT_LIMIT = 3;

type MotionMap = {
  clouds: readonly Region[];
  water: readonly Region[];
  leaves: readonly Region[];
  lights: readonly Region[];
  falls: readonly Region[];
  boats: readonly Boat[];
  canal?: readonly [number, number, number, number];
};

export const motionMaps: Record<ArtworkKind, MotionMap> = {
  sunrise: {
    clouds: [[.50, .32, .38, .30], [.79, .40, .11, .24]],
    water: [[.61, .82, .19, .106], [.83, .75, .09, .058], [.38, .88, .13, .06]],
    leaves: [[.968, .15, .032, .14], [.915, .50, .063, .074], [.742, .89, .16, .085], [.95, .93, .06, .07], [.04, .82, .065, .15], [.30, .966, .20, .027]],
    lights: [], falls: [],
    boats: [
      { region: [.4774, .838, .012, .027], pivot: [.4774, .861] },
      { region: [.5805, .797, .008, .020], pivot: [.5805, .8122] },
      { region: [.6323, .790, .006, .016], pivot: [.6323, .8027] },
    ],
  },
  atelier: {
    clouds: [[.20, .29, .20, .13], [.058, .35, .10, .067]],
    water: [],
    canal: [.33, .688, .639, .928],
    leaves: [[.47, .055, .16, .057], [.606, .27, .027, .22], [.789, .32, .023, .17], [.865, .37, .035, .10], [.731, .46, .026, .054], [.90, .067, .073, .07]],
    lights: [[.724, .504, .012, .014], [.936, .52, .012, .014]],
    falls: [[.646, .929, .01, .04]], boats: [],
  },
  world: {
    clouds: [[.102, .056, .091, .051], [.289, .098, .045, .044]],
    water: [[.10, .27, .17, .13], [.27, .79, .25, .10], [.81, .93, .19, .057]],
    leaves: [[.42, .95, .16, .052], [.508, .362, .08, .045], [.713, .169, .077, .045]],
    lights: [[.71, .687, .039, .06], [.798, .60, .055, .19], [.93, .593, .025, .108], [.075, .42, .01, .015]],
    falls: [[.967, .492, .016, .086], [.842, .436, .014, .058], [.490, .548, .021, .095], [.530, .666, .014, .068], [.334, .460, .017, .061], [.968, .224, .015, .037]],
    boats: [{ region: [.241, .828, .023, .044], pivot: [.241, .861] }],
  },
};

export function objectPosition(value: string): [number, number] {
  const parts = value.trim().split(/\s+/);
  if (parts.length === 1) {
    if (parts[0] === 'top' || parts[0] === 'bottom') parts.unshift('center');
    else parts.push('center');
  }
  return parts.slice(0, 2).map(part => {
    if (part === 'left' || part === 'top') return 0;
    if (part === 'right' || part === 'bottom') return 1;
    return part.endsWith('%') ? parseFloat(part) / 100 : .5;
  }) as [number, number];
}

// Match CSS object-fit: cover, including the existing mobile art direction.
export function coverTransform(width: number, height: number, imageWidth: number, imageHeight: number, position: readonly [number, number]) {
  const viewAspect = width / height;
  const imageAspect = imageWidth / imageHeight;
  const scale: [number, number] = viewAspect < imageAspect ? [viewAspect / imageAspect, 1] : [1, imageAspect / viewAspect];
  const offset: [number, number] = [(1 - scale[0]) * position[0], (1 - scale[1]) * position[1]];
  return { scale, offset };
}
