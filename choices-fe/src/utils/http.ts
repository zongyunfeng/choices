import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

type Result<T> = {
    errCode: number,
    errMsg: string,
    data: T
}

const get = <T = any>(
    url: string,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<Result<T>>> => {
    return axios.get(url, config);
}

const post = <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<Result<T>>> => {
    return axios.post(url, data, config);
}

export {get, post}

