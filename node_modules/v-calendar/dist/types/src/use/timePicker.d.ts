import { DateParts } from '../utils/date/helpers';
export interface TimePickerProps {
    position: number;
}
export type TimePickerContext = ReturnType<typeof createTimePicker>;
export declare function createTimePicker(props: TimePickerProps): {
    showHeader: import("vue").ComputedRef<boolean>;
    timeAccuracy: import("vue").Ref<number>;
    parts: import("vue").ComputedRef<DateParts | {
        isValid: boolean;
    }>;
    isValid: import("vue").ComputedRef<boolean>;
    date: import("vue").ComputedRef<Date | null>;
    hours: import("vue").WritableComputedRef<number>;
    minutes: import("vue").WritableComputedRef<number>;
    seconds: import("vue").WritableComputedRef<number>;
    milliseconds: import("vue").WritableComputedRef<number>;
    options: import("vue").ComputedRef<{
        milliseconds: import("../utils/date/helpers").DatePartOption[];
        seconds: import("../utils/date/helpers").DatePartOption[];
        minutes: import("../utils/date/helpers").DatePartOption[];
        hours: import("../utils/date/helpers").DatePartOption[];
    }>;
    hourOptions: import("vue").ComputedRef<{
        value: number;
        label: string;
    }[]>;
    isAM: import("vue").WritableComputedRef<boolean>;
    isAMOptions: import("vue").ComputedRef<{
        value: boolean;
        label: string;
    }[]>;
    is24hr: import("vue").Ref<boolean>;
    showCalendar: import("vue").Ref<boolean>;
    datePickerPopoverId: import("vue").Ref<string>;
    popoverRef: any;
    popoverEvents: import("vue").ComputedRef<Partial<import("../utils/popovers").PopoverEventHandlers>>;
    calendarRef: any;
    isRange: import("vue").ComputedRef<boolean>;
    isTimeMode: import("vue").ComputedRef<boolean>;
    isDateTimeMode: import("vue").ComputedRef<boolean>;
    hideTimeHeader: import("vue").Ref<boolean>;
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
    rules: import("vue").ComputedRef<import("../utils/date/helpers").DatePartsRules[]>;
    move: (target: import("./calendar").MoveTarget, opts?: Partial<import("./calendar").MoveOptions>) => Promise<any>;
    moveBy: (pages: number, opts?: Partial<import("./calendar").MoveOptions>) => Promise<any>;
    moveToValue: (target: import("../use/datePicker").ValueTarget, opts?: Partial<import("./calendar").MoveOptions>) => Promise<any>;
    updateValue: (value: any, opts?: Partial<import("../use/datePicker").UpdateOptions>) => Promise<string | number | Date | DateParts | {
        start: string | number | Date | DateParts | null;
        end: string | number | Date | DateParts | null;
    } | null>;
    showPopover: (opts?: Partial<import("../utils/popovers").PopoverOptions>) => void;
    hidePopover: (opts?: Partial<import("../utils/popovers").PopoverOptions>) => void;
    togglePopover: (opts: Partial<import("../utils/popovers").PopoverOptions>) => void;
    onDayClick: (day: import("../utils/page").CalendarDay, event: MouseEvent) => void;
    onDayKeydown: (day: import("../utils/page").CalendarDay, event: KeyboardEvent) => void;
    onDayMouseEnter: (day: import("../utils/page").CalendarDay, event: MouseEvent) => void;
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
