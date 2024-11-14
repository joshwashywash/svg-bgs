import type { ColorValue, ListOptions } from 'svelte-tweakpane-ui';
import type { PageLoad } from './$types';

type Pattern = 'ninja stars' | 'polka dots' | 'spirals' | 'waves';
type PatternUnits = 'userSpaceOnUse' | 'objectBoundingBox';
type StrokeLineCap = 'butt' | 'round' | 'square';

type Page = {
	page: {
		description: string;
		title: string;
	};
};

type SVG = {
	color: {
		background: {
			label: 'background';
			value: ColorValue;
		};
		fill: {
			label: 'fill';
			value: boolean;
		};
		foreground: {
			label: 'foreground';
			value: ColorValue;
		};
	};
	path: {
		custom: {
			value: string;
		};
		premade: {
			label: 'path';
			options: ListOptions<Pattern>;
			value: Pattern;
			paths: Record<Pattern, string>;
		};
	};
	miscellaneous: {
		patternUnits: {
			label: 'pattern units';
			options: ListOptions<PatternUnits>;
			value: PatternUnits;
		};
	};
	stroke: {
		lineCap: {
			label: 'line cap';
			options: ListOptions<StrokeLineCap>;
			value: StrokeLineCap;
		};
		width: {
			label: 'width';
			max: number;
			min: number;
			value: number;
		};
	};
	transformation: {
		rotation: {
			label: 'rotation';
			max: number;
			min: number;
			value: number;
		};
		scale: {
			label: 'scale';
			max: number;
			min: number;
			value: number;
		};
		skewX: {
			label: 'skew x';
			max: number;
			min: number;
			value: number;
		};
		skewY: {
			label: 'skew y';
			max: number;
			min: number;
			value: number;
		};
	};
};

type Data = Page & {
	svg: SVG;
	titles: Record<keyof SVG, string>;
};

export const load: PageLoad = (): Data => {
	return {
		page: {
			description:
				'An svg pattern creator. Apply scale, skew, and rotation transformations to generate svg patterns.',
			title: 'svg pattern creator'
		},
		svg: {
			color: {
				background: {
					label: 'background',
					value: '#99c1f1'
				},
				foreground: {
					label: 'foreground',
					value: '#f9f06b'
				},
				fill: {
					label: 'fill',
					value: false
				}
			},
			path: {
				custom: {
					value: 'm0 0h1v1h-1v-1'
				},
				premade: {
					label: 'path',
					options: {
						'ninja stars': 'ninja stars',
						'polka dots': 'polka dots',
						spirals: 'spirals',
						waves: 'waves'
					},
					value: 'ninja stars',
					paths: {
						'ninja stars':
							'm0 0 .5.25.5-.25-.25.5.25.5-.5-.25-.5.25.25-.5-.25-.5',
						'polka dots': 'm.25.5a.25.25 0 00.5 0 .25.25 0 00-.5 0',
						spirals:
							'm.5.5a.0625.0625 0 00.125 0 .0625.0625 0 00-.25 0 .0625.0625 0 00.375 0 .0625.0625 0 00-.5 0 .0625.0625 0 00.625 0 .0625.0625 0 00-.75 0',
						waves: 'm-.5.5q.25-.5.5 0t.5 0q.25-.5.5 0t.5 0'
					}
				}
			},
			stroke: {
				lineCap: {
					label: 'line cap',
					options: {
						butt: 'butt',
						round: 'round',
						square: 'square'
					},
					value: 'round'
				},
				width: {
					label: 'width',
					max: 50,
					min: 0,
					value: 5
				}
			},
			miscellaneous: {
				patternUnits: {
					label: 'pattern units',
					options: {
						objectBoundingBox: 'objectBoundingBox',
						userSpaceOnUse: 'userSpaceOnUse'
					},
					value: 'userSpaceOnUse'
				}
			},
			transformation: {
				rotation: {
					label: 'rotation',
					max: 360,
					min: 0,
					value: 60
				},
				scale: {
					label: 'scale',
					max: 1,
					min: 0.01,
					value: 0.15
				},
				skewX: {
					label: 'skew x',
					max: 90,
					min: 0,
					value: 0
				},
				skewY: {
					label: 'skew y',
					max: 90,
					min: 0,
					value: 0
				}
			}
		},
		titles: {
			color: 'color',
			miscellaneous: 'miscellaneous',
			path: 'path',
			stroke: 'stroke',
			transformation: 'transformation'
		}
	};
};
