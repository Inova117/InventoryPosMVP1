/**
 * Category color-coding for the POS / inventory. Every accent is pulled from the
 * warm-sage palette family so color coding stays congruent with the brand.
 */
export interface CategoryAccent {
    /** Tinted chip / avatar background + text */
    chip: string
    /** Solid dot for compact contexts */
    dot: string
}

const ACCENTS: CategoryAccent[] = [
    { chip: 'bg-sage-100 text-sage-700 dark:bg-sage-900/30 dark:text-sage-300', dot: 'bg-sage-500' },
    { chip: 'bg-terracotta/15 text-terracotta-dark dark:bg-terracotta/20 dark:text-terracotta-light', dot: 'bg-terracotta' },
    { chip: 'bg-warning-soft text-warning-soft-foreground', dot: 'bg-warning' },
    { chip: 'bg-success-soft text-success-soft-foreground', dot: 'bg-success' },
    { chip: 'bg-warmth-200 text-warmth-700 dark:bg-warmth-800 dark:text-warmth-200', dot: 'bg-warmth-500' },
    { chip: 'bg-muted text-muted-foreground', dot: 'bg-warmth-400' },
]

// Stable mapping for the seeded café catalog; anything else hashes into the set.
const FIXED: Record<string, number> = {
    'Café': 0,
    'Bebidas': 1,
    'Repostería': 2,
    'Alimentos': 3,
    'Granos': 4,
    'Accesorios': 5,
    // English fallbacks in case a category is renamed
    Coffee: 0,
    Drinks: 1,
    Pastry: 2,
    Food: 3,
    Beans: 4,
    Accessories: 5,
}

function hash(str: string): number {
    let h = 0
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
    return Math.abs(h)
}

export function categoryAccent(category: string): CategoryAccent {
    // eslint-disable-next-line security/detect-object-injection
    const fixed = FIXED[category]
    const idx = fixed !== undefined ? fixed : hash(category) % ACCENTS.length
    // eslint-disable-next-line security/detect-object-injection
    return ACCENTS[idx] as CategoryAccent
}
