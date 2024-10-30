export function syncScroller() {
    let nodes = Array.prototype.filter.call(arguments, item => item instanceof HTMLElement)

    let max = nodes.length
    if (!max || max === 1) return
    let sign = 0; // 用于标注

    function event() {
        if (!sign) { // 标注为 0 时 表示滚动起源
            sign = max - 1;
            let top = this.scrollTop
            let left = this.scrollLeft
            for (let node of nodes) { // 同步所有除自己以外节点
                if (node == this) continue;
                node.scrollTo(left, top);
            }
        } else
            --sign; // 其他节点滚动时 标注减一
    }

    nodes.forEach((ele, index) => {
        ele.addEventListener('scroll', event);
    });

    return () => {
        nodes.forEach((ele, index) => {
            ele.removeEventListener('scroll', event);
        });
    }
};