import type { Point } from './types';

export default (count: number) =>
	(inner: number) =>
	(outer: number): Point[] => {
		const positions: Point[] = [];
		const angle = (2 * Math.PI) / count;
		const scales = [inner, outer] as const;

		for (let i = 0; i < count; i += 1) {
			const scale = scales[i % scales.length];
			const a = i * angle;
			const x = scale * Math.cos(a);
			const y = scale * Math.sin(a);

			positions.push({ x, y });
		}
		return positions;
	};
