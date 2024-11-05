import * as vue from 'vue';
import { ComponentPropsOptions, ExtractPropTypes, VNodeChild, VNode } from 'vue';

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

type Density = null | 'default' | 'comfortable' | 'compact';

declare const VBottomNavigation: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            absolute: boolean;
            height: string | number;
            active: boolean;
            name: string;
            order: string | number;
            style: vue.StyleValue;
            disabled: boolean;
            multiple: boolean;
            tag: string;
            rounded: string | number | boolean;
            density: Density;
            selectedClass: string;
            grow: boolean;
        }> & Omit<{
            absolute: boolean;
            height: string | number;
            active: boolean;
            name: string;
            order: string | number;
            style: vue.StyleValue;
            disabled: boolean;
            multiple: boolean;
            tag: string;
            density: Density;
            selectedClass: string;
            grow: boolean;
            max?: number | undefined;
            border?: string | number | boolean | undefined;
            color?: string | undefined;
            class?: any;
            mode?: string | undefined;
            mandatory?: boolean | "force" | undefined;
            elevation?: string | number | undefined;
            theme?: string | undefined;
            rounded?: string | number | boolean | undefined;
            bgColor?: string | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
            absolute: boolean;
            height: string | number;
            active: boolean;
            name: string;
            order: string | number;
            style: vue.StyleValue;
            disabled: boolean;
            multiple: boolean;
            tag: string;
            density: Density;
            selectedClass: string;
            grow: boolean;
        } & {
            max?: number | undefined;
            border?: string | number | boolean | undefined;
            color?: string | undefined;
            class?: any;
            mode?: string | undefined;
            mandatory?: boolean | "force" | undefined;
            elevation?: string | number | undefined;
            theme?: string | undefined;
            rounded?: string | number | boolean | undefined;
            bgColor?: string | undefined;
        } & {}, "absolute" | "height" | "active" | "name" | "order" | "style" | "disabled" | "multiple" | "tag" | "rounded" | "density" | "selectedClass" | "grow">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            default?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<{
            absolute: boolean;
            height: string | number;
            active: boolean;
            name: string;
            order: string | number;
            style: vue.StyleValue;
            disabled: boolean;
            multiple: boolean;
            tag: string;
            density: Density;
            selectedClass: string;
            grow: boolean;
        } & {
            max?: number | undefined;
            border?: string | number | boolean | undefined;
            color?: string | undefined;
            class?: any;
            mode?: string | undefined;
            mandatory?: boolean | "force" | undefined;
            elevation?: string | number | undefined;
            theme?: string | undefined;
            rounded?: string | number | boolean | undefined;
            bgColor?: string | undefined;
        } & {}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'update:modelValue': (value: any) => boolean;
        }, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "update:modelValue">, string, {
            absolute: boolean;
            height: string | number;
            active: boolean;
            name: string;
            order: string | number;
            style: vue.StyleValue;
            disabled: boolean;
            multiple: boolean;
            tag: string;
            rounded: string | number | boolean;
            density: Density;
            selectedClass: string;
            grow: boolean;
        }, {}, string, vue.SlotsType<Partial<{
            default: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
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
        absolute: boolean;
        height: string | number;
        active: boolean;
        name: string;
        order: string | number;
        style: vue.StyleValue;
        disabled: boolean;
        multiple: boolean;
        tag: string;
        density: Density;
        selectedClass: string;
        grow: boolean;
    } & {
        max?: number | undefined;
        border?: string | number | boolean | undefined;
        color?: string | undefined;
        class?: any;
        mode?: string | undefined;
        mandatory?: boolean | "force" | undefined;
        elevation?: string | number | undefined;
        theme?: string | undefined;
        rounded?: string | number | boolean | undefined;
        bgColor?: string | undefined;
    } & {} & vue.ShallowUnwrapRef<{}> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    absolute: boolean;
    height: string | number;
    active: boolean;
    name: string;
    order: string | number;
    style: vue.StyleValue;
    disabled: boolean;
    multiple: boolean;
    tag: string;
    density: Density;
    selectedClass: string;
    grow: boolean;
} & {
    max?: number | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    class?: any;
    mode?: string | undefined;
    mandatory?: boolean | "force" | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    bgColor?: string | undefined;
} & {}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
    'update:modelValue': (value: any) => boolean;
}, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "update:modelValue">, string, {
    absolute: boolean;
    height: string | number;
    active: boolean;
    name: string;
    order: string | number;
    style: vue.StyleValue;
    disabled: boolean;
    multiple: boolean;
    tag: string;
    rounded: string | number | boolean;
    density: Density;
    selectedClass: string;
    grow: boolean;
}, {}, string, vue.SlotsType<Partial<{
    default: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T_1>(props: {
    modelValue?: T_1 | undefined;
    'onUpdate:modelValue'?: ((value: T_1) => void) | undefined;
}, slots: {
    default: never;
}) => GenericProps<{
    modelValue?: T_1 | undefined;
    'onUpdate:modelValue'?: ((value: T_1) => void) | undefined;
}, {
    default: never;
}>) & FilterPropsOptions<{
    theme: StringConstructor;
    modelValue: Omit<{
        type: null;
        default: undefined;
    }, "type" | "default"> & {
        type: vue.PropType<any>;
        default: any;
    };
    multiple: BooleanConstructor;
    mandatory: vue.PropType<boolean | "force">;
    max: NumberConstructor;
    selectedClass: {
        type: vue.PropType<string>;
        default: string;
    };
    disabled: BooleanConstructor;
    tag: Omit<{
        type: StringConstructor;
        default: string;
    }, "type" | "default"> & {
        type: vue.PropType<string>;
        default: string;
    };
    name: Omit<{
        type: StringConstructor;
    }, "type" | "default"> & {
        type: vue.PropType<string>;
        default: string;
    };
    order: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    absolute: BooleanConstructor;
    rounded: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: undefined;
    };
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    density: {
        type: vue.PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    border: (StringConstructor | BooleanConstructor | NumberConstructor)[];
    bgColor: StringConstructor;
    color: StringConstructor;
    grow: BooleanConstructor;
    mode: {
        type: StringConstructor;
        validator: (v: any) => boolean;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
}, vue.ExtractPropTypes<{
    theme: StringConstructor;
    modelValue: Omit<{
        type: null;
        default: undefined;
    }, "type" | "default"> & {
        type: vue.PropType<any>;
        default: any;
    };
    multiple: BooleanConstructor;
    mandatory: vue.PropType<boolean | "force">;
    max: NumberConstructor;
    selectedClass: {
        type: vue.PropType<string>;
        default: string;
    };
    disabled: BooleanConstructor;
    tag: Omit<{
        type: StringConstructor;
        default: string;
    }, "type" | "default"> & {
        type: vue.PropType<string>;
        default: string;
    };
    name: Omit<{
        type: StringConstructor;
    }, "type" | "default"> & {
        type: vue.PropType<string>;
        default: string;
    };
    order: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    absolute: BooleanConstructor;
    rounded: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: undefined;
    };
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    density: {
        type: vue.PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    border: (StringConstructor | BooleanConstructor | NumberConstructor)[];
    bgColor: StringConstructor;
    color: StringConstructor;
    grow: BooleanConstructor;
    mode: {
        type: StringConstructor;
        validator: (v: any) => boolean;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>;
type VBottomNavigation = InstanceType<typeof VBottomNavigation>;

export { VBottomNavigation };
