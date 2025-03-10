import { defineStore } from 'pinia';
import { StorageEnum } from '@/enums';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false, // 初始化为 false
    token: '',
    username: '',
  }),
  actions: {
    // 初始化用户状态（在应用启动时调用）
    initialize() {
      const token = localStorage.getItem(StorageEnum.GB_TOKEN_STORE);
      const username = localStorage.getItem(StorageEnum.GB_USERNAME_STORE);

      // 检查 token 和 username 是否有效
      if (token && username) {
        this.isLoggedIn = true;
        this.token = token;
        this.username = username;
      }
    },

    // 登录成功
    login(token: string, username: string) {
      if (!token || !username) {
        throw new Error('Token 和 username 不能为空');
      }

      this.isLoggedIn = true;
      this.token = token;
      this.username = username;

      // 存储到 localStorage
      localStorage.setItem(StorageEnum.GB_TOKEN_STORE, token);
      localStorage.setItem(StorageEnum.GB_USERNAME_STORE, username);
    },

    // 退出登录
    logout() {
      this.isLoggedIn = false;
      this.token = '';
      this.username = '';

      // 清除 localStorage
      localStorage.removeItem(StorageEnum.GB_TOKEN_STORE);
      localStorage.removeItem(StorageEnum.GB_USERNAME_STORE);

      // 如果有其他用户数据，也可以在这里清除
      // localStorage.removeItem('other_user_data');
    },
  },
});