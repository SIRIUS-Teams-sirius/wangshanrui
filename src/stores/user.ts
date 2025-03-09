import { defineStore } from 'pinia';
import { StorageEnum } from '@/enums';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: !!localStorage.getItem(StorageEnum.GB_TOKEN_STORE),
    token: localStorage.getItem(StorageEnum.GB_TOKEN_STORE) || '',
  }),
  actions: {
    // 登录成功
    login(token: string) {
      this.isLoggedIn = true;
      this.token = token;
      localStorage.setItem(StorageEnum.GB_TOKEN_STORE, token);
    },
    // 退出登录
    logout() {
      this.isLoggedIn = false;
      this.token = '';
      localStorage.removeItem(StorageEnum.GB_TOKEN_STORE);
    },
  },
});