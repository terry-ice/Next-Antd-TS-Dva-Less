import axios from './base'

const TEST_URL = 'http://192.168.1.17:8008/erec-api'
const URL = 'http://172.16.9.45:8080/'

export const list = async () => {
    return (await axios.get('http://172.16.9.45:8080/cat/list')).data
}

/**
 * 获取result页商品分类
 * @param id
 */
export const getCategory = async (id: number) => {
    return (await axios.post(`${TEST_URL}/categoryApi/attribute`, {
        cat: id,
    })).data
}
/**
 * 获取搜索提示
 * @param query
 */
export const getSearchPrompt = async (query: any) => {
    return (await axios.post(`${TEST_URL}/swApi/list`, { query })).data
}

/**
 * 获取搜索结果
 * @param payload 搜索表单
 */
export const getSearchResult = async (payload: any) => {
    return (await axios.post(`${TEST_URL}/goodsApi/search`, payload)).data
}
export const getSimGoods = async () => {
    return (await axios.get(`${TEST_URL}/goodsApi/simGoods/405685595e8976a52b79c4d9e4c74252`)).data
}
