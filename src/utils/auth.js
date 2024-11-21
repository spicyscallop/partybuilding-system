import { useUserStore } from '@/stores/index.js';

// 封装登录逻辑
export const login = (user) => {
    const userStore = useUserStore();
    userStore.setUser(user);
};

// 封装登出逻辑
export const logout = () => {
    const userStore = useUserStore();
    userStore.setUser(null);
};

// 获取当前用户
export const getCurrentUser = () => {
    const userStore = useUserStore();
    return userStore.getUser;
};
