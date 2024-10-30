import { Attribute } from './attribute';
import type { DateRangeCell } from '@/utils/date/range';
import { type Bar, type Content, type Dot, type GlyphRenderer, type Glyph, type Highlight } from './glyph';
export interface Glyphs {
    highlights: Highlight[];
    dots: Dot[];
    bars: Bar[];
    content: Content[];
}
export declare class Theme {
    color: string;
    renderers: GlyphRenderer<Glyph>[];
    constructor(color: string);
    normalizeGlyphs(attr: Attribute): void;
    prepareRender(glyphs?: Partial<Glyphs>): Partial<Glyphs>;
    render(cell: DateRangeCell<Attribute>, glyphs: Partial<Glyphs>): void;
}
