import axios from "./request"
//请求示例
//get
export const mokeGet = (data) => {
    return axios({
        url: "/xxxx",
        method: "get",
        data,
        config: {
            headers: {
                'Request-Type': 'wechat'
            },
            timeout: 10000
        }
    })
}

//post
export const mokePost = (data) => {
    return axios({
        url: "/getCaptchaCode",
        method: "post",
        data,
        config: {
            headers: {
                'Request-Type': 'wechat'
            },
            timeout: 10000
        }
    })
}

/**
 * 跨域测试
 * @author 郭宗豪
 * @argument 
 * @returns
 */
export const getTest = () => {
    return axios({
        url: "/getHello",
        method: "get",
    })
}


/**
 * 登录接口
 * @author 郭宗豪
 * @argument 
 * @returns
 */
export const userLogin = (data) => {
    return axios({
        url: "/user/login",
        method: "post",
        data: data
    })
}

/**
 * 获取验证码图片接口
 * @author 郭宗豪
 * @argument 
 * @returns
 */
export const getCaptcha = () => {
    return axios({
        url: "/captcha",
        method: "get",
    })
}

/**
 * 校验验证码图片接口
 * @author 郭宗豪
 * @argument 
 * @returns
 */
export const getCaptchaVerify = (verCode,verKey) => {
    return axios({
        url: "/captcha/verify",
        method: "get",
        data: {
            verCode: verCode,
            verKey: verKey
        }
    })
}

/**
 * 获取个人设置-个人信息
 * @author 郭宗豪
 * @argument 
 * @returns
 */
export const getPersonDetail = (userId) => {
    return axios({
        url: "/users/findUser",
        method: "get",
        data: {
            id: userId
        }
    })
}

/**
 * 修改个人设置-个人信息
 * @author 郭宗豪
 * @argument 
 * @returns
 */
export const motifyPersonSetting = (dataFrame) => {
    return axios({
        url: "/users/updateUser",
        method: "post",
        data: dataFrame // 传递要修改的个人信息数据对象
    })
}

/**
 * 获取用户个人信息
 * @author 江中华
 * @argument 
 * @returns
 */
export const getUserInfo = (userNumber) => {
    return axios({
        url: "/users/info",
        method: "get",
        data: {
            userNumber: userNumber,
        }
    })
}

/**
 * 总培训时长接口 自主学习
 * @author 江中华
 * @argument 
 * @returns
 */
export const getCenterNumber1 = (userNumber) => {
    return axios({
        url: "/selfstudy/allstudyhour",
        method: "get",
        data: {
            userNumber: userNumber,
        }
    })
}

/**
 * 当前阶段培训时长接口 自主学习
 * @author 江中华
 * @argument 
 * @returns
 */
export const getCenterNumber2 = (userNumber) => {
    return axios({
        url: "/selfstudy/getallstudyhour/nowdevelopmentPhase",
        method: "get",
        data: {
            userNumber: userNumber,
        }
    })
}

/**
 * 未读消息接口
 * @author 江中华
 * @argument 
 * @returns
 */
export const getUnreadMessages = (userId) => {
    return axios({
        url: "/userMessages/allmessagetext",
        method: "get",
        data: {
            isRead: 0,
            recvUserId: userId
        }
    })
}



/**
 * 获取支部活动信息接口
 * @author zyy
 * @argument 
 * @returns
 */
export const getBranchActivities = () => {
    return axios({
        url: "/branchactivity/list/",
        method: "get",
        data: {
        }
    })
}

/**
 * 获取党内荣誉信息接口
 * @author zyy
 * @argument 
 * @returns
 */
export const getPartyHonors = () => {
    return axios({
        url: "/partyhonor/list/",
        method: "get",
        data: {
        }
    })
}

/**
 * 获取系统消息接口
 * @author 孙普华
 * @argument 
 * @returns
 */
export const getXtgg = () => {
    return axios({
        url: "/systemMessages/page",
        method: "get",
        data: {
        }
    })
}