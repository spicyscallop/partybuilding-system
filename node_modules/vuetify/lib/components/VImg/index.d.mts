import * as vue from 'vue';
import { ComponentPropsOptions, ExtractPropTypes, nextTick, PropType } from 'vue';

interface FilterPropsOptions<PropsOptions extends Readonly<ComponentPropsOptions>, Props = ExtractPropTypes<PropsOptions>> {
    filterProps<T extends Partial<Props>, U extends Exclude<keyof Props, Exclude<keyof Props, keyof T>>>(props: T): Partial<Pick<T, U>>;
}

interface srcObject {
    src?: string;
    srcset?: string;
    lazySrc?: string;
    aspect: number;
}
declare const VImg: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            inline: boolean;
            transition: string | boolean | (vue.TransitionProps & {
                component?: vue.Component | undefined;
            });
            style: vue.StyleValue;
            draggable: boolean | "false" | "true";
            eager: boolean;
            options: IntersectionObserverInit;
            cover: boolean;
            src: string | srcObject;
        }> & Omit<{
            inline: boolean;
            transition: string | boolean | (vue.TransitionProps & {
                component?: vue.Component | undefined;
            });
            style: vue.StyleValue;
            eager: boolean;
            options: IntersectionObserverInit;
            cover: boolean;
            src: string | srcObject;
            height?: string | number | undefined;
            width?: string | number | undefined;
            aspectRatio?: string | number | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            position?: string | undefined;
            draggable?: boolean | "false" | "true" | undefined;
            class?: any;
            referrerpolicy?: "origin" | "same-origin" | "no-referrer" | "no-referrer-when-downgrade" | "origin-when-cross-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url" | undefined;
            alt?: string | undefined;
            crossorigin?: "" | "anonymous" | "use-credentials" | undefined;
            sizes?: string | undefined;
            srcset?: string | undefined;
            contentClass?: string | undefined;
            gradient?: string | undefined;
            lazySrc?: string | undefined;
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
                placeholder?: (() => vue.VNodeChild) | undefined;
                error?: (() => vue.VNodeChild) | undefined;
                sources?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
                placeholder?: false | (() => vue.VNodeChild) | undefined;
                error?: false | (() => vue.VNodeChild) | undefined;
                sources?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:placeholder"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:error"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:sources"?: false | (() => vue.VNodeChild) | undefined;
            onError?: ((value: string | undefined) => any) | undefined;
            onLoad?: ((value: string | undefined) => any) | undefined;
            onLoadstart?: ((value: string | undefined) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
            inline: boolean;
            transition: string | boolean | (vue.TransitionProps & {
                component?: vue.Component | undefined;
            });
            style: vue.StyleValue;
            eager: boolean;
            options: IntersectionObserverInit;
            cover: boolean;
            src: string | srcObject;
        } & {
            height?: string | number | undefined;
            width?: string | number | undefined;
            aspectRatio?: string | number | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            position?: string | undefined;
            draggable?: boolean | "false" | "true" | undefined;
            class?: any;
            referrerpolicy?: "origin" | "same-origin" | "no-referrer" | "no-referrer-when-downgrade" | "origin-when-cross-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url" | undefined;
            alt?: string | undefined;
            crossorigin?: "" | "anonymous" | "use-credentials" | undefined;
            sizes?: string | undefined;
            srcset?: string | undefined;
            contentClass?: string | undefined;
            gradient?: string | undefined;
            lazySrc?: string | undefined;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
                placeholder?: (() => vue.VNodeChild) | undefined;
                error?: (() => vue.VNodeChild) | undefined;
                sources?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
                placeholder?: false | (() => vue.VNodeChild) | undefined;
                error?: false | (() => vue.VNodeChild) | undefined;
                sources?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:placeholder"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:error"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:sources"?: false | (() => vue.VNodeChild) | undefined;
        } & {
            onError?: ((value: string | undefined) => any) | undefined;
            onLoad?: ((value: string | undefined) => any) | undefined;
            onLoadstart?: ((value: string | undefined) => any) | undefined;
        }, "inline" | "transition" | "style" | "draggable" | "eager" | "options" | "cover" | "src">;
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
            placeholder?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            error?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            sources?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: ((event: "error", value: string | undefined) => void) & ((event: "load", value: string | undefined) => void) & ((event: "loadstart", value: string | undefined) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<{
            inline: boolean;
            transition: string | boolean | (vue.TransitionProps & {
                component?: vue.Component | undefined;
            });
            style: vue.StyleValue;
            eager: boolean;
            options: IntersectionObserverInit;
            cover: boolean;
            src: string | srcObject;
        } & {
            height?: string | number | undefined;
            width?: string | number | undefined;
            aspectRatio?: string | number | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            position?: string | undefined;
            draggable?: boolean | "false" | "true" | undefined;
            class?: any;
            referrerpolicy?: "origin" | "same-origin" | "no-referrer" | "no-referrer-when-downgrade" | "origin-when-cross-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url" | undefined;
            alt?: string | undefined;
            crossorigin?: "" | "anonymous" | "use-credentials" | undefined;
            sizes?: string | undefined;
            srcset?: string | undefined;
            contentClass?: string | undefined;
            gradient?: string | undefined;
            lazySrc?: string | undefined;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
                placeholder?: (() => vue.VNodeChild) | undefined;
                error?: (() => vue.VNodeChild) | undefined;
                sources?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
                placeholder?: false | (() => vue.VNodeChild) | undefined;
                error?: false | (() => vue.VNodeChild) | undefined;
                sources?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:placeholder"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:error"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:sources"?: false | (() => vue.VNodeChild) | undefined;
        } & {
            onError?: ((value: string | undefined) => any) | undefined;
            onLoad?: ((value: string | undefined) => any) | undefined;
            onLoadstart?: ((value: string | undefined) => any) | undefined;
        }, {
            currentSrc: vue.ShallowRef<string>;
            image: vue.Ref<HTMLImageElement | undefined>;
            state: vue.ShallowRef<"error" | "loaded" | "idle" | "loading">;
            naturalWidth: vue.ShallowRef<number | undefined>;
            naturalHeight: vue.ShallowRef<number | undefined>;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
            loadstart: (value: string | undefined) => true;
            load: (value: string | undefined) => true;
            error: (value: string | undefined) => true;
        }, string, {
            inline: boolean;
            transition: string | boolean | (vue.TransitionProps & {
                component?: vue.Component | undefined;
            });
            style: vue.StyleValue;
            draggable: boolean | "false" | "true";
            eager: boolean;
            options: IntersectionObserverInit;
            cover: boolean;
            src: string | srcObject;
        }, {}, string, vue.SlotsType<Partial<{
            default: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            placeholder: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            error: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            sources: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
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
        $nextTick: typeof nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & {
        inline: boolean;
        transition: string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        });
        style: vue.StyleValue;
        eager: boolean;
        options: IntersectionObserverInit;
        cover: boolean;
        src: string | srcObject;
    } & {
        height?: string | number | undefined;
        width?: string | number | undefined;
        aspectRatio?: string | number | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        position?: string | undefined;
        draggable?: boolean | "false" | "true" | undefined;
        class?: any;
        referrerpolicy?: "origin" | "same-origin" | "no-referrer" | "no-referrer-when-downgrade" | "origin-when-cross-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url" | undefined;
        alt?: string | undefined;
        crossorigin?: "" | "anonymous" | "use-credentials" | undefined;
        sizes?: string | undefined;
        srcset?: string | undefined;
        contentClass?: string | undefined;
        gradient?: string | undefined;
        lazySrc?: string | undefined;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
            placeholder?: (() => vue.VNodeChild) | undefined;
            error?: (() => vue.VNodeChild) | undefined;
            sources?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
            placeholder?: false | (() => vue.VNodeChild) | undefined;
            error?: false | (() => vue.VNodeChild) | undefined;
            sources?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:placeholder"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:error"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:sources"?: false | (() => vue.VNodeChild) | undefined;
    } & {
        onError?: ((value: string | undefined) => any) | undefined;
        onLoad?: ((value: string | undefined) => any) | undefined;
        onLoadstart?: ((value: string | undefined) => any) | undefined;
    } & vue.ShallowUnwrapRef<{
        currentSrc: vue.ShallowRef<string>;
        image: vue.Ref<HTMLImageElement | undefined>;
        state: vue.ShallowRef<"error" | "loaded" | "idle" | "loading">;
        naturalWidth: vue.ShallowRef<number | undefined>;
        naturalHeight: vue.ShallowRef<number | undefined>;
    }> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    inline: boolean;
    transition: string | boolean | (vue.TransitionProps & {
        component?: vue.Component | undefined;
    });
    style: vue.StyleValue;
    eager: boolean;
    options: IntersectionObserverInit;
    cover: boolean;
    src: string | srcObject;
} & {
    height?: string | number | undefined;
    width?: string | number | undefined;
    aspectRatio?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    position?: string | undefined;
    draggable?: boolean | "false" | "true" | undefined;
    class?: any;
    referrerpolicy?: "origin" | "same-origin" | "no-referrer" | "no-referrer-when-downgrade" | "origin-when-cross-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url" | undefined;
    alt?: string | undefined;
    crossorigin?: "" | "anonymous" | "use-credentials" | undefined;
    sizes?: string | undefined;
    srcset?: string | undefined;
    contentClass?: string | undefined;
    gradient?: string | undefined;
    lazySrc?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
        placeholder?: (() => vue.VNodeChild) | undefined;
        error?: (() => vue.VNodeChild) | undefined;
        sources?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        placeholder?: false | (() => vue.VNodeChild) | undefined;
        error?: false | (() => vue.VNodeChild) | undefined;
        sources?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:placeholder"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:error"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:sources"?: false | (() => vue.VNodeChild) | undefined;
} & {
    onError?: ((value: string | undefined) => any) | undefined;
    onLoad?: ((value: string | undefined) => any) | undefined;
    onLoadstart?: ((value: string | undefined) => any) | undefined;
}, {
    currentSrc: vue.ShallowRef<string>;
    image: vue.Ref<HTMLImageElement | undefined>;
    state: vue.ShallowRef<"error" | "loaded" | "idle" | "loading">;
    naturalWidth: vue.ShallowRef<number | undefined>;
    naturalHeight: vue.ShallowRef<number | undefined>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    loadstart: (value: string | undefined) => true;
    load: (value: string | undefined) => true;
    error: (value: string | undefined) => true;
}, string, {
    inline: boolean;
    transition: string | boolean | (vue.TransitionProps & {
        component?: vue.Component | undefined;
    });
    style: vue.StyleValue;
    draggable: boolean | "false" | "true";
    eager: boolean;
    options: IntersectionObserverInit;
    cover: boolean;
    src: string | srcObject;
}, {}, string, vue.SlotsType<Partial<{
    default: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    placeholder: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    error: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    sources: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    transition: {
        type: PropType<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })>;
        default: string;
        validator: (val: unknown) => boolean;
    };
    class: PropType<any>;
    style: {
        type: PropType<vue.StyleValue>;
        default: null;
    };
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    aspectRatio: (StringConstructor | NumberConstructor)[];
    contentClass: StringConstructor;
    inline: BooleanConstructor;
    alt: StringConstructor;
    cover: BooleanConstructor;
    draggable: {
        type: PropType<boolean | "false" | "true">;
        default: undefined;
    };
    eager: BooleanConstructor;
    gradient: StringConstructor;
    lazySrc: StringConstructor;
    options: {
        type: PropType<IntersectionObserverInit>;
        default: () => {
            root: undefined;
            rootMargin: undefined;
            threshold: undefined;
        };
    };
    sizes: StringConstructor;
    src: {
        type: PropType<string | srcObject>;
        default: string;
    };
    crossorigin: PropType<"" | "anonymous" | "use-credentials">;
    referrerpolicy: PropType<"origin" | "same-origin" | "no-referrer" | "no-referrer-when-downgrade" | "origin-when-cross-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url">;
    srcset: StringConstructor;
    position: StringConstructor;
}, vue.ExtractPropTypes<{
    transition: {
        type: PropType<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })>;
        default: string;
        validator: (val: unknown) => boolean;
    };
    class: PropType<any>;
    style: {
        type: PropType<vue.StyleValue>;
        default: null;
    };
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    aspectRatio: (StringConstructor | NumberConstructor)[];
    contentClass: StringConstructor;
    inline: BooleanConstructor;
    alt: StringConstructor;
    cover: BooleanConstructor;
    draggable: {
        type: PropType<boolean | "false" | "true">;
        default: undefined;
    };
    eager: BooleanConstructor;
    gradient: StringConstructor;
    lazySrc: StringConstructor;
    options: {
        type: PropType<IntersectionObserverInit>;
        default: () => {
            root: undefined;
            rootMargin: undefined;
            threshold: undefined;
        };
    };
    sizes: StringConstructor;
    src: {
        type: PropType<string | srcObject>;
        default: string;
    };
    crossorigin: PropType<"" | "anonymous" | "use-credentials">;
    referrerpolicy: PropType<"origin" | "same-origin" | "no-referrer" | "no-referrer-when-downgrade" | "origin-when-cross-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url">;
    srcset: StringConstructor;
    position: StringConstructor;
}>>;
type VImg = InstanceType<typeof VImg>;

export { VImg };
