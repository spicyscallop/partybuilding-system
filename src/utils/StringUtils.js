export function toPre0String(number,num) {
    //number不足num位时，添加前导0
    return number.toString().padStart(num, '0');
}

export function int2sex(number){
    if (number==1){
        return "男"
    }else if(number==2){
        return "女"
    }else{
        return "未知"
    }
}

export function sex2int(sex){
    if (sex=="男"){
        return 1
    }else if(sex=="女"){
        return 2
    }else{
        return 0
    }
}