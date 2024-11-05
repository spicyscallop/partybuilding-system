import * as vue from 'vue';
import { ComponentPropsOptions, ExtractPropTypes, VNodeChild, VNode, PropType } from 'vue';

type SlotsToProps<U extends RawSlots, T = MakeInternalSlots<U>> = {
    $children?: (VNodeChild | (T extends {
        default: infer V;
    } ? V : {}) | {
        [K in keyof T]?: T[K];
    });
    'v-slots'?: {
        [K in keyof T]?: T[K] | false;
    };
} & {
    [K in keyof T as `v-slot:${K & string}`]?: T[K] | false;
};
type RawSlots = Record<string, unknown>;
type Slot<T> = [T] extends [never] ? () => VNodeChild : (arg: T) => VNodeChild;
type VueSlot<T> = [T] extends [never] ? () => VNode[] : (arg: T) => VNode[];
type MakeInternalSlots<T extends RawSlots> = {
    [K in keyof T]: Slot<T[K]>;
};
type MakeSlots<T extends RawSlots> = {
    [K in keyof T]: VueSlot<T[K]>;
};
type GenericProps<Props, Slots extends Record<string, unknown>> = {
    $props: Props & SlotsToProps<Slots>;
    $slots: MakeSlots<Slots>;
};
interface FilterPropsOptions<PropsOptions extends Readonly<ComponentPropsOptions>, Props = ExtractPropTypes<PropsOptions>> {
    filterProps<T extends Partial<Props>, U extends Exclude<keyof Props, Exclude<keyof Props, keyof T>>>(props: T): Partial<Pick<T, U>>;
}

declare function deepEqual(a: any, b: any): boolean;

type VChipGroupSlots = {
    default: {
        isSelected: (id: number) => boolean;
        select: (id: number, value: boolean) => void;
        next: () => void;
        prev: () => void;
        selected: readonly number[];
    };
};
declare const VChipGroup: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            filter: boolean;
            style: vue.StyleValue;
            disabled: boolean;
            multiple: boolean;
            tag: string;
            column: boolean;
            variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
            selectedClass: string;
            valueComparator: typeof deepEqual;
        }> & Omit<{
            filter: boolean;
            style: vue.StyleValue;
            disabled: boolean;
            multiple: boolean;
            tag: string;
            column: boolean;
            variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
            selectedClass: string;
            valueComparator: typeof deepEqual;
            max?: number | undefined;
            color?: string | undefined;
            class?: any;
            mandatory?: boolean | "force" | undefined;
            theme?: string | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
            filter: boolean;
            style: vue.StyleValue;
            disabled: boolean;
            multiple: boolean;
            tag: string;
            column: boolean;
            variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
            selectedClass: string;
            valueComparator: typeof deepEqual;
        } & {
            max?: number | undefined;
            color?: string | undefined;
            class?: any;
            mandatory?: boolean | "force" | undefined;
            theme?: string | undefined;
        } & {}, "filter" | "style" | "disabled" | "multiple" | "tag" | "column" | "variant" | "selectedClass" | "valueComparator">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            default?: ((arg: {
                isSelected: (id: number) => boolean;
                select: (id: number, value: boolean) => void;
                next: () => void;
                prev: () => void;
                selected: readonly number[];
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<{
            filter: boolean;
            style: vue.StyleValue;
            disabled: boolean;
            multiple: boolean;
            tag: string;
            column: boolean;
            variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
            selectedClass: string;
            valueComparator: typeof deepEqual;
        } & {
            max?: number | undefined;
            color?: string | undefined;
            class?: any;
            mandatory?: boolean | "force" | undefined;
            theme?: string | undefined;
        } & {}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'update:modelValue': (value: any) => boolean;
        }, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "update:modelValue">, string, {
            filter: boolean;
            style: vue.StyleValue;
            disabled: boolean;
            multiple: boolean;
            tag: string;
            column: boolean;
            variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
            selectedClass: string;
            valueComparator: typeof deepEqual;
        }, {}, string, vue.SlotsType<Partial<{
            default: (arg: {
                isSelected: (id: number) => boolean;
                select: (id: number, value: boolean) => void;
                next: () => void;
                prev: () => void;
                selected: readonly number[];
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
        }>>> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & {
        filter: boolean;
        style: vue.StyleValue;
        disabled: boolean;
        multiple: boolean;
        tag: string;
        column: boolean;
        variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
        selectedClass: string;
        valueComparator: typeof deepEqual;
    } & {
        max?: number | undefined;
        color?: string | undefined;
        class?: any;
        mandatory?: boolean | "force" | undefined;
        theme?: string | undefined;
    } & {} & vue.ShallowUnwrapRef<{}> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    filter: boolean;
    style: vue.StyleValue;
    disabled: boolean;
    multiple: boolean;
    tag: string;
    column: boolean;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    selectedClass: string;
    valueComparator: typeof deepEqual;
} & {
    max?: number | undefined;
    color?: string | undefined;
    class?: any;
    mandatory?: boolean | "force" | undefined;
    theme?: string | undefined;
} & {}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
    'update:modelValue': (value: any) => boolean;
}, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "update:modelValue">, string, {
    filter: boolean;
    style: vue.StyleValue;
    disabled: boolean;
    multiple: boolean;
    tag: string;
    column: boolean;
    variant: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    selectedClass: string;
    valueComparator: typeof deepEqual;
}, {}, string, vue.SlotsType<Partial<{
    default: (arg: {
        isSelected: (id: number) => boolean;
        select: (id: number, value: boolean) => void;
        next: () => void;
        prev: () => void;
        selected: readonly number[];
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T_1>(props: {
    modelValue?: T_1 | undefined;
    'onUpdate:modelValue'?: ((value: T_1) => void) | undefined;
}, slots: VChipGroupSlots) => GenericProps<{
    modelValue?: T_1 | undefined;
    'onUpdate:modelValue'?: ((value: T_1) => void) | undefined;
}, VChipGroupSlots>) & FilterPropsOptions<{
    color: StringConstructor;
    variant: Omit<{
        type: PropType<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
        default: string;
        validator: (v: any) => boolean;
    }, "type" | "default"> & {
        type: PropType<NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">>;
        default: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    };
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: null;
        default: undefined;
    };
    multiple: BooleanConstructor;
    mandatory: PropType<boolean | "force">;
    max: NumberConstructor;
    selectedClass: {
        type: PropType<string>;
        default: string;
    };
    disabled: BooleanConstructor;
    class: PropType<any>;
    style: {
        type: PropType<vue.StyleValue>;
        default: null;
    };
    column: BooleanConstructor;
    filter: BooleanConstructor;
    valueComparator: {
        type: PropType<typeof deepEqual>;
        default: typeof deepEqual;
    };
}, vue.ExtractPropTypes<{
    color: StringConstructor;
    variant: Omit<{
        type: PropType<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
        default: string;
        validator: (v: any) => boolean;
    }, "type" | "default"> & {
        type: PropType<NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">>;
        default: NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
    };
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: null;
        default: undefined;
    };
    multiple: BooleanConstructor;
    mandatory: PropType<boolean | "force">;
    max: NumberConstructor;
    selectedClass: {
        type: PropType<string>;
        default: string;
    };
    disabled: BooleanConstructor;
    class: PropType<any>;
    style: {
        type: PropType<vue.StyleValue>;
        default: null;
    };
    column: BooleanConstructor;
    filter: BooleanConstructor;
    valueComparator: {
        type: PropType<typeof deepEqual>;
        default: typeof deepEqual;
    };
}>>;
type VChipGroup = InstanceType<typeof VChipGroup>;

export { VChipGroup };
