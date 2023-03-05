import NinjaStars from './NinjaStars.svelte';
import PolkaDots from './PolkaDots.svelte';
import Spirals from './Spirals.svelte';
import Waves from './Waves.svelte';

export const patterns = [
	{ name: 'ninja stars', component: NinjaStars },
	{ name: 'polka dots', component: PolkaDots },
	{ name: 'spirals', component: Spirals },
	{ name: 'waves', component: Waves },
];
