import type { Point } from '$lib/types';

export default (count: number) =>
	(inner: number) =>
	(outer: number): Point[] => {
		const positions: Point[] = [];
		const angle = (2 * Math.PI) / count;
		const scales = [inner, outer];

		for (let i = 0; i < count; i += 1) {
			const scale = scales[i % scales.length];
			const a = i * angle;
			positions.push([scale * Math.cos(a), scale * Math.sin(a)]);
		}
		return positions;
	};
