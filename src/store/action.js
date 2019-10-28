import {SETBREAD, SETTOKEN, SETUSER} from "./action-type"

/**
 * 设置面包屑
 * @param breadcrumb
 * @returns {{breadcrumb: *, type: *}}
 */
export const setBreads = breadcrumb => {
    localStorage.setItem("bread", JSON.stringify(breadcrumb))
    return {
        type: SETBREAD,
        breadcrumb
    }
}
/**
 * 设置token
 * @param token
 * @returns {{type: *, token: *}}
 */
export const setTokens = token => {
    localStorage.setItem("token", token)
    return {
        type: SETTOKEN,
        token
    }
}
/**
 * 存储登录用户信息
 * @param userList
 * @returns {{userList: *, type: *}}
 */
export const setUsers = userList => {
    localStorage.setItem("userList", JSON.stringify(userList))
    return {
        type: SETUSER,
        userList
    }
}
