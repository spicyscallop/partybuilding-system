import { type ExtractPropTypes, type PropType } from 'vue';
import type { Page } from '../utils/page';
export interface YearItem {
    year: number;
    id: string;
    label: string;
    ariaLabel: string;
    isActive: boolean;
    isCurrent: boolean;
    isDisabled: boolean;
    click: () => void;
}
export interface MonthItem extends YearItem {
    month: number;
}
export type IQuerySelector = Pick<HTMLElement, 'querySelector'>;
export type CalendarNavContext = ReturnType<typeof createCalendarNav>;
export type CalendarNavProps = Readonly<ExtractPropTypes<typeof propsDef>>;
export declare const propsDef: {
    value: {
        type: PropType<Page>;
        required: boolean;
    };
};
export declare const emitsDef: string[];
export declare function createCalendarNav(props: CalendarNavProps, { emit }: any): {
    navContainer: import("vue").Ref<{
        querySelector: {
            <K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
            <K_1 extends keyof SVGElementTagNameMap>(selectors: K_1): SVGElementTagNameMap[K_1] | null;
            <E extends Element = Element>(selectors: string): E | null;
        };
    } | null>;
    title: import("vue").ComputedRef<string | number>;
    monthMode: import("vue").Ref<boolean>;
    currentMonth: import("vue").ComputedRef<number>;
    currentYear: import("vue").ComputedRef<number>;
    activeItems: import("vue").ComputedRef<YearItem[]>;
    prevItemsEnabled: import("vue").ComputedRef<boolean>;
    nextItemsEnabled: import("vue").ComputedRef<boolean>;
    toggleMode: () => void;
    movePrev: () => void;
    moveNext: () => void;
    movePrevYear: () => void;
    moveNextYear: () => void;
    movePrevYearGroup: () => void;
    moveNextYearGroup: () => void;
};
export declare function useCalendarNav(): CalendarNavContext;
