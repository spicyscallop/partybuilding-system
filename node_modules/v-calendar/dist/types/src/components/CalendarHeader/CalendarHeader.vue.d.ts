import { PropType } from 'vue';
import { Page } from '../../utils/page';
declare const _default: import("vue").DefineComponent<{
    page: {
        type: PropType<Page>;
        required: true;
    };
    layout: StringConstructor;
    isLg: BooleanConstructor;
    isXl: BooleanConstructor;
    is2xl: BooleanConstructor;
    hideTitle: BooleanConstructor;
    hideArrows: BooleanConstructor;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    page: {
        type: PropType<Page>;
        required: true;
    };
    layout: StringConstructor;
    isLg: BooleanConstructor;
    isXl: BooleanConstructor;
    is2xl: BooleanConstructor;
    hideTitle: BooleanConstructor;
    hideArrows: BooleanConstructor;
}>>, {
    isLg: boolean;
    isXl: boolean;
    is2xl: boolean;
    hideTitle: boolean;
    hideArrows: boolean;
}>;
export default _default;
