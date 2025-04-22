import instance from "./index";
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

export const resetPwd = (data) => {
    return axios.post( "/user/resetPwd", data)
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
export const getCenterNumber1 = () => {
    return axios.get(`/selfstudy/allstudyhour`)
}

/**
 * 当前阶段培训时长接口 自主学习
 * @author 江中华
 * @argument 
 * @returns
 */
export const getCenterNumber2 = (developmentPhase) => {
    return axios.get("/selfstudy/allstudyhour",{
        params: { developmentPhase },
    })
}

/**
 * 未读消息接口
 * @author 江中华
 * @argument 
 * @returns
 */
export const getUnreadMessages = (userId) => {
    return axios.get("/userMessages/getNotRead",userId)
}

/**
 * 获取支部活动信息接口
 * @author zyy
 * @argument 
 * @returns
 */
export const getBranchActivities = (params) => {
    return axios.post("/activities/pageStudent",params)
}

/**
 * 获取党内荣誉信息接口
 * @author zyy
 * @argument 
 * @returns
 */
export const getPartyHonors = () => {
    return axios.get("/prize/selectByUser")
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
 * 根据id获取自主活动（实践成长）接口
 * @author 孙普华
 * @argument 
 * @returns
 */
export const getSelfActivity = () => {
    return axios.get("/self-activity/getMySelfActivity")
}

/**
 * 分页获取自主活动（实践成长）接口
 * @author 孙普华
 * @argument {Object} data
 * @returns
 */
export const getSelfActivityPage = (data) => {
    return axios.post("/self-activity/page", data)
}

/**
 * 更新自主活动（实践成长）接口
 * @author 孙普华
 * @argument 
 * @returns
 */
export const updateSelfActivity = (data) => {
    return axios.post("/self-activity/update", data)
}

/**
 * 团委新增支部活动（实践成长）接口
 * @author 孙普华
 * @argument 
 * @returns
 */
export const addBranchActivity = (data) => {
    return axios.post("/self-activity/add", data)
}

/**
 * 删除自主活动（实践成长）接口
 * @author 孙普华
 * @argument 
 * @returns
 */
export const deleteSelfActivity = (id) => {
    return axios.get('/self-activity/delete', {
        params: { id },
    });
};

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

/**
 * 获取支部概况信息接口
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const getBranchOverview = () => {
    return instance.get("/auth/branch/getBranchOverview")
}