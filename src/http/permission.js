import instance from "./index";

/**
 * 权限管理列表
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const getPersonAccessList = (queryItem) => {
    return instance.post("/stage/page", queryItem)
}

/**
 * 修改人员权限
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const updatePersonAccess = (data) => {
    return instance.post("/stage/update", data)
}

/**
 * 删除人员权限记录
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const deleteItem = (id) => {
    return instance.post("/stage/delete", id);
}

/**
 * 批量删除人员权限记录
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const deleteByBatch = (ids) => {
    return instance.post("/stage/deleteByBatch", ids);
}

/**
 * 添加人员权限记录
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const addItem = (data) => {
    return instance.post("/stage/add", data);
}

export const downloadTemplate = (type) => {
    return instance({
        method: "get",
        url: "/files/downloadByDocTemplateType",
        params: {
            type
        },
        responseType: 'blob',
    })
}