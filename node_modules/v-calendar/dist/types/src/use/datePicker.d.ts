import { type SetupContext, type ExtractPropTypes, type PropType } from 'vue';
import type { AttributeConfig } from '../utils/attribute';
import { type CalendarDay } from '../utils/page';
import type { DatePatch, DateParts, DatePartsRules } from '../utils/date/helpers';
import { type PopoverOptions } from '../utils/popovers';
import type { MoveTarget, MoveOptions } from './calendar';
export type DateType = 'date' | 'string' | 'number';
export interface DateConfig {
    type: DateType;
    rules: DatePartsRules;
    mask?: string;
}
export type DateModes = 'date' | 'datetime' | 'time';
export type ValueTarget = 'start' | 'end';
export interface UpdateOptions {
    config: any;
    patch: DatePatch;
    debounce: number;
    clearIfEqual: boolean;
    formatInput: boolean;
    hidePopover: boolean;
    dragging: boolean;
    targetPriority: ValueTarget;
    moveToValue: boolean;
}
export interface ModelModifiers {
    number?: boolean;
    string?: boolean;
    range?: boolean;
}
export type DatePickerDate = number | string | Date | null;
export type DatePickerRangeArray = [DatePickerDate, DatePickerDate];
export type DatePickerRangeObject = Partial<{
    start: DatePickerDate;
    end: DatePickerDate;
}>;
export type DatePickerContext = ReturnType<typeof createDatePicker>;
export type DatePickerProps = Readonly<ExtractPropTypes<typeof propsDef>>;
export declare const propsDef: {
    mode: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: PropType<string | number | Date | Partial<{
            start: DatePickerDate;
            end: DatePickerDate;
        }> | null>;
    };
    modelModifiers: {
        type: PropType<ModelModifiers>;
        default: () => {};
    };
    rules: PropType<DatePartsRules | "auto">;
    is24hr: BooleanConstructor;
    hideTimeHeader: BooleanConstructor;
    timeAccuracy: {
        type: NumberConstructor;
        default: number;
    };
    isRequired: BooleanConstructor;
    isRange: BooleanConstructor;
    updateOnInput: {
        type: BooleanConstructor;
        default: () => any;
    };
    inputDebounce: {
        type: NumberConstructor;
        default: () => any;
    };
    popover: {
        type: PropType<boolean | Partial<PopoverOptions>>;
        default: boolean;
    };
    dragAttribute: PropType<AttributeConfig>;
    selectAttribute: PropType<AttributeConfig>;
    attributes: (ArrayConstructor | ObjectConstructor)[];
    color: {
        type: StringConstructor;
        default: () => any;
    };
    isDark: {
        type: PropType<boolean | "system" | import("vue-screen-utils").DarkModeClassConfig>;
        default: () => any;
    };
    firstDayOfWeek: PropType<import("../utils/date/helpers").DayOfWeek>;
    masks: ObjectConstructor;
    locale: PropType<string | import("../utils/locale").default | Record<string, any>>;
    timezone: StringConstructor;
    minDate: null;
    maxDate: null;
    disabledDates: null;
};
export declare const emits: string[];
export declare function createDatePicker(props: DatePickerProps, ctx: SetupContext<string[]>): {
    showCalendar: import("vue").Ref<boolean>;
    datePickerPopoverId: import("vue").Ref<string>;
    popoverRef: any;
    popoverEvents: import("vue").ComputedRef<Partial<import("../utils/popovers").PopoverEventHandlers>>;
    calendarRef: any;
    isRange: import("vue").ComputedRef<boolean>;
    isTimeMode: import("vue").ComputedRef<boolean>;
    isDateTimeMode: import("vue").ComputedRef<boolean>;
    is24hr: import("vue").Ref<boolean>;
    hideTimeHeader: import("vue").Ref<boolean>;
    timeAccuracy: import("vue").Ref<number>;
    isDragging: import("vue").ComputedRef<boolean>;
    inputValue: import("vue").ComputedRef<string | {
        start: string;
        end: string;
    }>;
    inputEvents: import("vue").ComputedRef<{
        click?: ((e: MouseEvent) => void) | undefined;
        mousemove?: ((e: MouseEvent) => void) | undefined;
        mouseleave?: ((e: MouseEvent) => void) | undefined;
        focusin?: ((e: MouseEvent) => void) | undefined;
        focusout?: ((e: MouseEvent) => void) | undefined;
        input: (e: InputEvent) => void;
        change: (e: InputEvent) => void;
        keyup: (e: KeyboardEvent) => void;
    } | {
        start: {
            click?: ((e: MouseEvent) => void) | undefined;
            mousemove?: ((e: MouseEvent) => void) | undefined;
            mouseleave?: ((e: MouseEvent) => void) | undefined;
            focusin?: ((e: MouseEvent) => void) | undefined;
            focusout?: ((e: MouseEvent) => void) | undefined;
            input: (e: InputEvent) => void;
            change: (e: InputEvent) => void;
            keyup: (e: KeyboardEvent) => void;
        };
        end: {
            click?: ((e: MouseEvent) => void) | undefined;
            mousemove?: ((e: MouseEvent) => void) | undefined;
            mouseleave?: ((e: MouseEvent) => void) | undefined;
            focusin?: ((e: MouseEvent) => void) | undefined;
            focusout?: ((e: MouseEvent) => void) | undefined;
            input: (e: InputEvent) => void;
            change: (e: InputEvent) => void;
            keyup: (e: KeyboardEvent) => void;
        };
    }>;
    dateParts: import("vue").ComputedRef<(DateParts | null)[]>;
    attributes: import("vue").ComputedRef<any[]>;
    rules: import("vue").ComputedRef<DatePartsRules[]>;
    move: (target: MoveTarget, opts?: Partial<MoveOptions>) => Promise<any>;
    moveBy: (pages: number, opts?: Partial<MoveOptions>) => Promise<any>;
    moveToValue: (target: ValueTarget, opts?: Partial<MoveOptions>) => Promise<any>;
    updateValue: (value: any, opts?: Partial<UpdateOptions>) => Promise<string | number | Date | DateParts | {
        start: string | number | Date | DateParts | null;
        end: string | number | Date | DateParts | null;
    } | null>;
    showPopover: (opts?: Partial<PopoverOptions>) => void;
    hidePopover: (opts?: Partial<PopoverOptions>) => void;
    togglePopover: (opts: Partial<PopoverOptions>) => void;
    onDayClick: (day: CalendarDay, event: MouseEvent) => void;
    onDayKeydown: (day: CalendarDay, event: KeyboardEvent) => void;
    onDayMouseEnter: (day: CalendarDay, event: MouseEvent) => void;
    onPopoverBeforeShow: (el: HTMLElement) => void;
    onPopoverAfterShow: (el: HTMLElement) => void;
    onPopoverBeforeHide: (el: HTMLElement) => void;
    onPopoverAfterHide: (el: HTMLElement) => void;
    color: import("vue").ComputedRef<string>;
    isDark: import("vue").ComputedRef<boolean | "system" | import("vue-screen-utils").DarkModeClassConfig>;
    displayMode: import("vue").ComputedRef<"light" | "dark">;
    theme: import("vue").ComputedRef<import("../utils/theme").Theme>;
    locale: import("vue").ComputedRef<import("../utils/locale").default>;
    masks: import("vue").ComputedRef<any>;
    disabledDates: import("vue").ComputedRef<import("../utils/date/range").DateRange[]>;
    disabledAttribute: import("vue").ComputedRef<import("../utils/attribute").Attribute>;
};
export declare function useDatePicker(): {
    showCalendar: import("vue").Ref<boolean>;
    datePickerPopoverId: import("vue").Ref<string>;
    popoverRef: any;
    popoverEvents: import("vue").ComputedRef<Partial<import("../utils/popovers").PopoverEventHandlers>>;
    calendarRef: any;
    isRange: import("vue").ComputedRef<boolean>;
    isTimeMode: import("vue").ComputedRef<boolean>;
    isDateTimeMode: import("vue").ComputedRef<boolean>;
    is24hr: import("vue").Ref<boolean>;
    hideTimeHeader: import("vue").Ref<boolean>;
    timeAccuracy: import("vue").Ref<number>;
    isDragging: import("vue").ComputedRef<boolean>;
    inputValue: import("vue").ComputedRef<string | {
        start: string;
        end: string;
    }>;
    inputEvents: import("vue").ComputedRef<{
        click?: ((e: MouseEvent) => void) | undefined;
        mousemove?: ((e: MouseEvent) => void) | undefined;
        mouseleave?: ((e: MouseEvent) => void) | undefined;
        focusin?: ((e: MouseEvent) => void) | undefined;
        focusout?: ((e: MouseEvent) => void) | undefined;
        input: (e: InputEvent) => void;
        change: (e: InputEvent) => void;
        keyup: (e: KeyboardEvent) => void;
    } | {
        start: {
            click?: ((e: MouseEvent) => void) | undefined;
            mousemove?: ((e: MouseEvent) => void) | undefined;
            mouseleave?: ((e: MouseEvent) => void) | undefined;
            focusin?: ((e: MouseEvent) => void) | undefined;
            focusout?: ((e: MouseEvent) => void) | undefined;
            input: (e: InputEvent) => void;
            change: (e: InputEvent) => void;
            keyup: (e: KeyboardEvent) => void;
        };
        end: {
            click?: ((e: MouseEvent) => void) | undefined;
            mousemove?: ((e: MouseEvent) => void) | undefined;
            mouseleave?: ((e: MouseEvent) => void) | undefined;
            focusin?: ((e: MouseEvent) => void) | undefined;
            focusout?: ((e: MouseEvent) => void) | undefined;
            input: (e: InputEvent) => void;
            change: (e: InputEvent) => void;
            keyup: (e: KeyboardEvent) => void;
        };
    }>;
    dateParts: import("vue").ComputedRef<(DateParts | null)[]>;
    attributes: import("vue").ComputedRef<any[]>;
    rules: import("vue").ComputedRef<DatePartsRules[]>;
    move: (target: MoveTarget, opts?: Partial<MoveOptions>) => Promise<any>;
    moveBy: (pages: number, opts?: Partial<MoveOptions>) => Promise<any>;
    moveToValue: (target: ValueTarget, opts?: Partial<MoveOptions>) => Promise<any>;
    updateValue: (value: any, opts?: Partial<UpdateOptions>) => Promise<string | number | Date | DateParts | {
        start: string | number | Date | DateParts | null;
        end: string | number | Date | DateParts | null;
    } | null>;
    showPopover: (opts?: Partial<PopoverOptions>) => void;
    hidePopover: (opts?: Partial<PopoverOptions>) => void;
    togglePopover: (opts: Partial<PopoverOptions>) => void;
    onDayClick: (day: CalendarDay, event: MouseEvent) => void;
    onDayKeydown: (day: CalendarDay, event: KeyboardEvent) => void;
    onDayMouseEnter: (day: CalendarDay, event: MouseEvent) => void;
    onPopoverBeforeShow: (el: HTMLElement) => void;
    onPopoverAfterShow: (el: HTMLElement) => void;
    onPopoverBeforeHide: (el: HTMLElement) => void;
    onPopoverAfterHide: (el: HTMLElement) => void;
    color: import("vue").ComputedRef<string>;
    isDark: import("vue").ComputedRef<boolean | "system" | import("vue-screen-utils").DarkModeClassConfig>;
    displayMode: import("vue").ComputedRef<"light" | "dark">;
    theme: import("vue").ComputedRef<import("../utils/theme").Theme>;
    locale: import("vue").ComputedRef<import("../utils/locale").default>;
    masks: import("vue").ComputedRef<any>;
    disabledDates: import("vue").ComputedRef<import("../utils/date/range").DateRange[]>;
    disabledAttribute: import("vue").ComputedRef<import("../utils/attribute").Attribute>;
};
