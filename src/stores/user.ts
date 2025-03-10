import { defineStore } from 'pinia';
import { StorageEnum } from '@/enums';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: !!localStorage.getItem(StorageEnum.GB_TOKEN_STORE),
    token: localStorage.getItem(StorageEnum.GB_TOKEN_STORE) || '',
    username: localStorage.getItem(StorageEnum.GB_USERNAME_STORE) || '', // 新增 username 存储
  }),
  actions: {
    // 登录成功
    login(token: string, username: string) {
      this.isLoggedIn = true;
      this.token = token;
      this.username = username;
      localStorage.setItem(StorageEnum.GB_TOKEN_STORE, token);
      localStorage.setItem(StorageEnum.GB_USERNAME_STORE, username); // 存储用户名
    },
    // 退出登录
    logout() {
      this.isLoggedIn = false;
      this.token = '';
      this.username = '';
      localStorage.removeItem(StorageEnum.GB_TOKEN_STORE);
      localStorage.removeItem(StorageEnum.GB_USERNAME_STORE); // 清除用户名
    },
  },
});