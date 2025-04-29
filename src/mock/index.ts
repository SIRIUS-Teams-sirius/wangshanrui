import Mock from 'mockjs'
import type { MockParams } from "./index.d";
import MockIndex from "./mock-index"
Mock.setup({
    timeout: "300",
});
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
