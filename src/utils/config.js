/**
 * 设置cookie
 * @param cookies
 */
export const setCookie = (cookies) =>
    localStorage.setItem('cookieList', JSON.stringify(cookies));
/**
 * 获取cookie
 * @returns {any}
 */
export const getCookie = () => JSON.parse(localStorage.getItem('cookieList'));
/**
 * 清除缓存
 */
export const clearStorage = () => localStorage.clear();
/**
 * 跳转
 * @param link
 * @returns {boolean}
 */
export const openUrl = (link) => {
    if (link.links.indexOf('localhost') >= 0) {
        window.location.href = '/login';
        return false;
    }
    if (link.links.indexOf('-dev') >= 0) {
        window.location.href = `http://172.16.1.61:8080/${
            link.status
            }?service=http://${link.links}`;
        return false;
    }
    window.location.href = `https://sso.youxin.com/${link.status}?service=${
        link.links
        }`;
};
/**
 * 退出登录
 * @constructor
 */
export const Logout = () => {
    const links = window.location.origin;
    openUrl({
        status: 'logout',
        links
    });
};
