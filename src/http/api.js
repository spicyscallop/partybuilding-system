import axios from "./index"

/**
 * 登录接口
 * @author 郭宗豪
 * @argument 
 * @returns
 */
export const userLogin = (data) => {
    return axios.post( "/user/login", data)
}

/**
 * 获取验证码图片接口
 * @author 郭宗豪
 * @argument 
 * @returns
 */
export const getCaptcha = (data) => {
    return axios.post("/user/refreshCode", data)
}

/**
 * 获取个人设置-个人信息
 * @author 郭宗豪
 * @argument 
 * @returns
 */
export const getPersonDetail = (userId) => {
    return axios.get("/users/findUser")
}

/**
 * 修改个人设置-个人信息
 * @author 郭宗豪
 * @argument 
 * @returns
 */
export const motifyPersonSetting = (dataFrame) => {
    return axios.get("/users/updateUser")
}

/**
 * 获取用户个人信息
 * @author 江中华
 * @argument 
 * @returns
 */
export const getUserInfo = (userNumber) => {
    return axios.get("/users/info")
}

/**
 * 总培训时长接口 自主学习
 * @author 江中华
 * @argument 
 * @returns
 */
export const getCenterNumber1 = (userNumber) => {
    return axios.get("/selfstudy/allstudyhour")
}

/**
 * 当前阶段培训时长接口 自主学习
 * @author 江中华
 * @argument 
 * @returns
 */
export const getCenterNumber2 = (userNumber) => {
    return axios.get("/selfstudy/getallstudyhour/nowdevelopmentPhase")
}

/**
 * 未读消息接口
 * @author 江中华
 * @argument 
 * @returns
 */
export const getUnreadMessages = (userId) => {
    return axios.get("/userMessages/allmessagetext")
}

/**
 * 获取支部活动信息接口
 * @author zyy
 * @argument 
 * @returns
 */
export const getBranchActivities = () => {
    return axios.get("/branchactivity/list/")
}

/**
 * 获取党内荣誉信息接口
 * @author zyy
 * @argument 
 * @returns
 */
export const getPartyHonors = () => {
    return axios.get("/partyhonor/list/")
}

/**
 * 获取系统消息接口
 * @author 孙普华
 * @argument 
 * @returns
 */
export const getXtgg = () => {
    return axios.get("/systemMessages/page")
}

/**
 * 获取自主活动（实践成长）接口
 * @author 孙普华
 * @argument 
 * @returns
 */
export const getSelfActivity = () => {
    return axios.get("/self-activity/getMySelfActivity")
}

/**
 * 更新自主活动（实践成长）接口
 * @author 孙普华
 * @argument 
 * @returns
 */
export const addBranchActivity = (data) => {
    return axios.get("/self-activity/addBranchActivity", data)
}

/**
 * 获取某个阶段的成员接口
 * @author tfh,qyy
 * @argument 
 * @returns
 */
export const getStageMember = (data) => {
    return axios.post("/stage/page",data)
}

/**
 * 更改某个阶段的成员接口
 * @author tfh,qyy
 * @argument 
 * @returns
 */
export const updateStageMember = (data) => {
    return axios.post("/stage/update",data)
}

/**
 * 添加某个阶段的成员接口
 * @author tfh,qyy
 * @argument 
 * @returns
 */
export const addStageMember = (data) => {
    return axios.post("/stage/add",data)
}