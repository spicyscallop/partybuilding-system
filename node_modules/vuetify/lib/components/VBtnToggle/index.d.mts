import * as vue from 'vue';
import { ComponentPropsOptions, ExtractPropTypes, VNodeChild, VNode, ComponentInternalInstance, Ref, ComputedRef } from 'vue';

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

interface GroupItem {
    id: number;
    value: Ref<unknown>;
    disabled: Ref<boolean | undefined>;
}
interface GroupProvide {
    register: (item: GroupItem, cmp: ComponentInternalInstance) => void;
    unregister: (id: number) => void;
    select: (id: number, value: boolean) => void;
    selected: Ref<Readonly<number[]>>;
    isSelected: (id: number) => boolean;
    prev: () => void;
    next: () => void;
    selectedClass: Ref<string | undefined>;
    items: ComputedRef<{
        id: number;
        value: unknown;
        disabled: boolean | undefined;
    }[]>;
    disabled: Ref<boolean | undefined>;
    getItemIndex: (value: unknown) => number;
}

type BtnToggleSlotProps = 'isSelected' | 'select' | 'selected' | 'next' | 'prev';
interface DefaultBtnToggleSlot extends Pick<GroupProvide, BtnToggleSlotProps> {
}
type VBtnToggleSlots = {
    default: DefaultBtnToggleSlot;
};
declare const VBtnToggle: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            style: vue.StyleValue;
            disabled: boolean;
            multiple: boolean;
            tag: string;
            rounded: string | number | boolean;
            density: Density;
            variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
            divided: boolean;
        }> & Omit<{
            style: vue.StyleValue;
            disabled: boolean;
            multiple: boolean;
            tag: string;
            density: Density;
            variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
            divided: boolean;
            max?: number | undefined;
            border?: string | number | boolean | undefined;
            color?: string | undefined;
            class?: any;
            mandatory?: boolean | "force" | undefined;
            elevation?: string | number | undefined;
            theme?: string | undefined;
            rounded?: string | number | boolean | undefined;
            selectedClass?: string | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
            style: vue.StyleValue;
            disabled: boolean;
            multiple: boolean;
            tag: string;
            density: Density;
            variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
            divided: boolean;
        } & {
            max?: number | undefined;
            border?: string | number | boolean | undefined;
            color?: string | undefined;
            class?: any;
            mandatory?: boolean | "force" | undefined;
            elevation?: string | number | undefined;
            theme?: string | undefined;
            rounded?: string | number | boolean | undefined;
            selectedClass?: string | undefined;
        } & {}, "style" | "disabled" | "multiple" | "tag" | "rounded" | "density" | "variant" | "divided">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            default?: ((arg: DefaultBtnToggleSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<{
            style: vue.StyleValue;
            disabled: boolean;
            multiple: boolean;
            tag: string;
            density: Density;
            variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
            divided: boolean;
        } & {
            max?: number | undefined;
            border?: string | number | boolean | undefined;
            color?: string | undefined;
            class?: any;
            mandatory?: boolean | "force" | undefined;
            elevation?: string | number | undefined;
            theme?: string | undefined;
            rounded?: string | number | boolean | undefined;
            selectedClass?: string | undefined;
        } & {}, {
            next: () => void;
            prev: () => void;
            select: (id: number, value: boolean) => void;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'update:modelValue': (value: any) => boolean;
        }, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "update:modelValue">, string, {
            style: vue.StyleValue;
            disabled: boolean;
            multiple: boolean;
            tag: string;
            rounded: string | number | boolean;
            density: Density;
            variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
            divided: boolean;
        }, {}, string, vue.SlotsType<Partial<{
            default: (arg: DefaultBtnToggleSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
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
        style: vue.StyleValue;
        disabled: boolean;
        multiple: boolean;
        tag: string;
        density: Density;
        variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
        divided: boolean;
    } & {
        max?: number | undefined;
        border?: string | number | boolean | undefined;
        color?: string | undefined;
        class?: any;
        mandatory?: boolean | "force" | undefined;
        elevation?: string | number | undefined;
        theme?: string | undefined;
        rounded?: string | number | boolean | undefined;
        selectedClass?: string | undefined;
    } & {} & vue.ShallowUnwrapRef<{
        next: () => void;
        prev: () => void;
        select: (id: number, value: boolean) => void;
    }> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    style: vue.StyleValue;
    disabled: boolean;
    multiple: boolean;
    tag: string;
    density: Density;
    variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
    divided: boolean;
} & {
    max?: number | undefined;
    border?: string | number | boolean | undefined;
    color?: string | undefined;
    class?: any;
    mandatory?: boolean | "force" | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    selectedClass?: string | undefined;
} & {}, {
    next: () => void;
    prev: () => void;
    select: (id: number, value: boolean) => void;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
    'update:modelValue': (value: any) => boolean;
}, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "update:modelValue">, string, {
    style: vue.StyleValue;
    disabled: boolean;
    multiple: boolean;
    tag: string;
    rounded: string | number | boolean;
    density: Density;
    variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
    divided: boolean;
}, {}, string, vue.SlotsType<Partial<{
    default: (arg: DefaultBtnToggleSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T_1>(props: {
    modelValue?: T_1 | undefined;
    'onUpdate:modelValue'?: ((value: T_1) => void) | undefined;
}, slots: VBtnToggleSlots) => GenericProps<{
    modelValue?: T_1 | undefined;
    'onUpdate:modelValue'?: ((value: T_1) => void) | undefined;
}, VBtnToggleSlots>) & FilterPropsOptions<{
    modelValue: {
        type: null;
        default: undefined;
    };
    multiple: BooleanConstructor;
    mandatory: vue.PropType<boolean | "force">;
    max: NumberConstructor;
    selectedClass: StringConstructor;
    disabled: BooleanConstructor;
    color: StringConstructor;
    variant: {
        type: vue.PropType<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
        default: string;
        validator: (v: any) => boolean;
    };
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
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
    divided: BooleanConstructor;
}, vue.ExtractPropTypes<{
    modelValue: {
        type: null;
        default: undefined;
    };
    multiple: BooleanConstructor;
    mandatory: vue.PropType<boolean | "force">;
    max: NumberConstructor;
    selectedClass: StringConstructor;
    disabled: BooleanConstructor;
    color: StringConstructor;
    variant: {
        type: vue.PropType<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">;
        default: string;
        validator: (v: any) => boolean;
    };
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
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
    divided: BooleanConstructor;
}>>;
type VBtnToggle = InstanceType<typeof VBtnToggle>;

export { VBtnToggle };
