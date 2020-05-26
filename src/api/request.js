import { axiosInstance } from "./config";

/**
 * 获取最新轮播图片列表
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
}

/**
 * 获取推荐歌单列表
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
}

/**
 * 获取热门歌手列表
 * @param count
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getHotSingerListRequest = (count) => {
    return axiosInstance.get(`/top/artists?offset=${count}`);
}

/**
 * 获取歌手列表
 * @param category
 * @param alpha
 * @param count
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getSingerListRequest= (category, alpha, count) => {
    return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}

/**
 * 获取排行榜数据列表
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getRankListRequest = () => {
    return axiosInstance.get (`/toplist/detail`);
};

/**
 * 获取特定歌单详情
 * @param id 歌单id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAlbumDetailRequest = id => {
    return axiosInstance.get(`/playlist/detail?id=${id}`);
};
