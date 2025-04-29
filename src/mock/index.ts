import Mock from 'mockjs'
import type { MockParams } from "./index.d";
import MockIndex from "./mock-index"
Mock.setup({
    timeout: "300",
});

// ===== Mock.js 全局拦截白名单，登录/注册/退出/联邦接口不拦截 =====
const XHR = window.XMLHttpRequest;
const open = XHR.prototype.open;
XHR.prototype.open = function (
  method: string,
  url: string | URL,
  async: boolean = true,
  username?: string | null,
  password?: string | null
) {
  if (
    typeof url === 'string' &&
    (
      url.includes('/api/user/login') ||
      url.includes('/api/user/register') ||
      url.includes('/api/user/logout') ||
      url.includes('/api/start_training') ||
      url.includes('/api/set_dataset')
    )
  ) {
    // @ts-ignore
    this.isMock = false;
  } else {
    // @ts-ignore
    this.isMock = true;
  }
  // 明确 async 参数为 boolean 类型
  return open.call(this, method, url, async === undefined ? true : async, username, password);
};

const mocks = [...MockIndex];
export function mockXHR() {
    let i: MockParams;
    for (i of mocks) {
        // 只拦截数据大屏相关接口，不拦截登录、注册、退出、联邦模块相关接口
        // 只拦截 /bigscreen/ 开头的接口
        if (/^\/bigscreen\//.test(i.url)) {
            Mock.mock(new RegExp(i.url), i.type || "get", i.response);
        }
        // 其它接口（如 /api/user/login, /api/user/register, /api/user/logout, /api/start_training, /api/set_dataset 等）不注册 mock，直接放行
    }
}
