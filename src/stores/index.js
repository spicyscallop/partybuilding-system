import { defineStore } from 'pinia'

export const useUserStore = defineStore("user", {
    state: () => ({
        user: null
    }),
    getters: {
        getUser: (state) => {
            return state.user || JSON.parse(localStorage.getItem('user'));
        }
    },
    actions: {
        setUser(user) {
            this.user = user;
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                localStorage.removeItem('user');
            }
        }
    },
    persist: {
        enabled: true, // 启用持久化
        strategies: [
            {
                key: 'userStore', // 本地存储的键名
                storage: localStorage, // 存储方式：localStorage 或 sessionStorage
                paths: ['user'], // 指定要持久化的字段
            },
        ],
    },
})