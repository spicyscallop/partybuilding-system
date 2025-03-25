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
export const getXtggInfo = (queryItems) => {
    return instance.post("/systemMessages/page", queryItems)
}

/**
 * 添加系统公告
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const addXtggItem = (xtggItem) => {
    return instance.post("/systemMessages/add", xtggItem)
}

/**
 * 删除系统公告
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const deleteXtggItem = (idList) => {
    return instance.delete("/systemMessages/", {
        params: {
            idList
        }
    })
}

/**
 * 修改系统公告
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const editXtggItem = (xtggItem) => {
    return instance.put("/systemMessages/", xtggItem)
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
 * 获取所有支部信息（分页）
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const pageBranches = (queryItems) => {
    return instance.post("/auth/branch/page", queryItems);
}

/**
 * 创建新的支部
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const addBranch = (data) => {
    return instance.get("/auth/branch/addBranch", data);
}

/**
 * 删除支部
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const deleteBranch = (branchId) => {
    return instance.delete("/auth/branch/deleteBranch", branchId);
}

/**
 * 批量删除支部
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const deleteBranchByBatch = (ids) => {
    return instance.post("/auth/branch/deleteBranches", ids);
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

/**
 * 添加人员列表记录
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const addItem = (data) => {
    return instance.post("/stage/add", data);
}

/**
 * 修改人员列表记录
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const updateItem = (data) => {
    return instance.post("/stage/update", data)
}

/**
 * 组织会议概况
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const meetingOverview = () => {
    return instance.get("/meeting/overview")
}