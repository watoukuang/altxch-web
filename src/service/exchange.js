import request from "@/utils/request.js";

export const fetchThumb = (data) => {
    return request({
        url: '/ALTXCH-EXCHANGE/exchange/symbol-thumb',
        method: 'post',
        data
    })
}

export const fetchPlate = (data) => {
    return request({
        url: '/ALTXCH-EXCHANGE/exchange/exchange-plate-mini',
        method: 'get',
        data
    })
}

export const fetchTrade = (data) => {
    return request({
        url: '/ALTXCH-EXCHANGE/exchangeTrade/latest-trade',
        method: 'post',
        data
    })
}
/**
 * 添加交易所订单
 */
export const reqAddExchangeOrder = (data) => {
    return request({
        url: '/ALTXCH-EXCHANGE/order/add',
        method: 'post',
        data
    })
}

/**
 * 分页获取当前订单
 */
export const reqPageCurrentOrder = (data) => {
    return request({
        url: '/ALTXCH-EXCHANGE/order/pageCurrentOrder',
        method: 'post',
        data
    })
}

export const reqPageHistoryOrder = (data) => {
    return request({
        url: '/ALTXCH-EXCHANGE/order/pageHistoryOrder',
        method: 'post',
        data
    })
}

export const reqGetKLineGraph = (data) => {
    return request({
        url: '/ALTXCH-EXCHANGE/exchange/history',
        method: 'post',
        data
    })
}

export const reqGetSymbolInfo = (params) => {
    return request({
        url: '/ALTXCH-EXCHANGE/exchange/symbol-info',
        method: 'get',
        params
    })
}

export const reqListSymbols = () => {
    return request({
        url: '/ALTXCH-EXCHANGE/market/symbol-thumb-trend',
        method: 'get'
    })
}