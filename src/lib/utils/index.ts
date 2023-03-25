import type { Point } from '$lib/types';

export const translate =
	(x: number) =>
	(y: number) =>
	(ps: Point[]): Point[] =>
		ps.map(([px, py]) => [px + x, py + y]);
