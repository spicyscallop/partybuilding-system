import { PropType } from 'vue';
import { Attribute } from '../../utils/attribute';
declare const _default: import("vue").DefineComponent<{
    attribute: {
        type: PropType<Attribute>;
        required: true;
    };
}, {
    indicator: import("vue").ComputedRef<{
        class: string;
    } | null>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    attribute: {
        type: PropType<Attribute>;
        required: true;
    };
}>>, {}>;
export default _default;
