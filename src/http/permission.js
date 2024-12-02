import instance from "./index";

/**
 * 权限管理列表
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const getPersonAccessList = (queryItem) => {
    return instance.get("/auth/xxx", {
        params: {
            ...queryItem,
        }
    })
}

/**
 * 修改人员权限
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const updatePersonAccess = (data) => {
    return instance.post("/auth/xxx", data)
}

/**
 * 删除人员权限记录
 * @author 安俊霖
 * @argument 
 * @returns
 */
export const deleteItem = (userId) => {
    return instance.get("/auth/xxx", {
        params: {
            userId: userId
        }
    });
}