const brandInputId: string[] = [
    'apple',
    'samsung',
    'oppo',
    'huawei',
    'microsoft-surface',
    'infinix',
    'hp-pavilion',
    'impression-of-acqua-di-gio',
    'royal-mirage',
    'fog-scent-xpressio',
    'al-munakh',
    'lord-rehab',
    'loreal-paris',
    'hemani-tea',
    'dermive',
    'rorec-white-rice',
    'fair-clear',
    'saaf-khaas',
    'bake-parlor-big',
    'baking-food-items',
    'fauji',
    'dry-rose',
    'boho-decor',
    'flying-wooden',
    'led-lights',
    'luxury-palace',
    'golden',
];

const promoCods: ObjectPromo = {
    css: 10,
    html: 10,
};
export type keyPromo = keyof ObjectPromo;

export interface ObjectPromo {
    css?: number;
    html?: number;
}

export { brandInputId, promoCods };
