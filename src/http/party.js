import instance from "./index";

/**
 * 获取党委概况信息接口
 * @author 安俊霖
 * @argument
 * @returns
 */
export const getPartyOverview = () => {
    return instance.get("/auth/branch/getPartyOverview")
}

/**
 * 获取系統公告信息接口
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const getXtggInfo = () => {
    return instance.get("/systemMessages/page")
}

/**
 * 获取所有支部信息
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const findAllBranches = () => {
    return instance.get("/auth/branch/findAllBranches")
}

/**
 * 根据发展阶段查询
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const findByPhase = (queryItems) => {
    return instance.post("/stage/page", queryItems)
}

/**
 * 删除人员列表记录
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const deleteItem = (id) => {
    return instance.post("/stage/delete", id);
}

/**
 * 批量删除人员列表记录
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const deleteByBatch = (ids) => {
    return instance.post("/stage/deleteByBatch", ids);
}