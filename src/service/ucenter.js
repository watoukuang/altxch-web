import request from "@/utils/request.js";

/**
 * 请求登录
 * @param data
 * @returns {*}
 */
export const fetchLogin = (data) => {
    return request({
        url: '/uc/login',
        method: 'post',
        data
    })
}

/**
 * 获取币种余额
 */
export const reqGetUnitBalance = (unit) => {
    return request({
        url: `/ALTXCH-MEMBER/asset/wallet/${unit}`,
        method: 'get',
    })
}


