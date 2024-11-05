export default function getElementPos(el) {
    if (!el || !el.parentNode || el.style.display === 'none') {
      return false;
    }
    var parent = null;    
    var pos = [];    
    var box;    
    if (el.getBoundingClientRect) {// IE    
        box = el.getBoundingClientRect();    
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);    
        var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);    
        return {    
            x: box.left + scrollLeft,    
            y: box.top + scrollTop    
        };    
    } else  if (document.getBoxObjectFor) {    
        box = document.getBoxObjectFor(el);    
        var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;    
        var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;    
        pos = [box.x - borderLeft, box.y - borderTop];    
    } else {// safari & opera        
        pos = [el.offsetLeft, el.offsetTop];    
        parent = el.offsetParent;    
        if (parent != el) {    
            while (parent) {    
                pos[0] += parent.offsetLeft;    
                pos[1] += parent.offsetTop;    
                parent = parent.offsetParent;    
            }    
        }    
        if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {    
            pos[0] -= document.body.offsetLeft;    
            pos[1] -= document.body.offsetTop;    
        }    
    }    
    if (el.parentNode) {    
        parent = el.parentNode;    
    } else {    
        parent = null;    
    }    
    while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account for any scrolled ancestors    
        pos[0] -= parent.scrollLeft;    
        pos[1] -= parent.scrollTop;    
        if (parent.parentNode) {    
            parent = parent.parentNode;    
        } else {    
            parent = null;    
        }    
    }    
    return {   
        x: pos[0],    
        y: pos[1]    
    };    
} 