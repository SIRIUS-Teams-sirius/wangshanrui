interface UtilVarType {
    baseUrl: string,
    code: string | number,
    noContentCode: number,
    ENC: boolean, //是否进行加密
}

const UtilVar: UtilVarType = {
    baseUrl: "",
    code: 401, //登陆过期
    noContentCode: 204, //请求成功但没有内容
    ENC: false,
}

const runtimeType: any = {
    production: () => {
        // 生产环境可设置为实际后端地址
        // UtilVar.baseUrl = "http://your-server-address"
    },
    development: () => {
        UtilVar.baseUrl = ""; // 关键：开发环境用相对路径，走vite代理
    },
    hash: () => {}
}

runtimeType[import.meta.env.MODE] && runtimeType[import.meta.env.MODE]()
export default UtilVar