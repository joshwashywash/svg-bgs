import NinjaStar from './NinjaStar.svelte';
import PolkaDots from './PolkaDots.svelte';
import Spiral from './Spiral.svelte';
import Waves from './Waves.svelte';

export const patterns = [
	{ name: 'ninja star', component: NinjaStar },
	{ name: 'polka dots', component: PolkaDots },
	{ name: 'spiral', component: Spiral },
	{ name: 'waves', component: Waves },
];
