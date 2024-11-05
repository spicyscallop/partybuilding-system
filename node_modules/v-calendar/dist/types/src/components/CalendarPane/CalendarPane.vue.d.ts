import type { PropType } from 'vue';
import type { Page } from '../../utils/page';
declare const _default: import("vue").DefineComponent<{
    page: {
        type: PropType<Page>;
        required: true;
    };
}, {
    onWeeknumberClick: (week: import("../../utils/page").CalendarWeek, event: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    page: {
        type: PropType<Page>;
        required: true;
    };
}>>, {}>;
export default _default;
