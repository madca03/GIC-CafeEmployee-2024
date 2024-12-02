import axios, {AxiosError, AxiosRequestConfig, ResponseType} from "axios";
import AppAPIError from "@/common/errors/AppAPIError";

const makeHTTPRequest = ({
    url,
    method,
    payload,
    showOverlay = true,
    responseType = undefined
}: {
    url: string,
    method: string,
    payload?: object,
    showOverlay?: boolean,
    responseType?: ResponseType
}) => {
    const options: AxiosRequestConfig = { url, method };

    if (method.toLowerCase() === "get") {
        options.params = payload;
    } else {
        options.data = payload;
    }

    if (payload instanceof FormData) {
        options.headers = {
            'Content-Type': 'multipart/form-data',
            ...options.headers
        }
    }

    if (responseType) {
        options.responseType = responseType;
    }

    return axios(options)
        .then(res => res.data)
        .catch((err: AxiosError<any>) => {
            const errorMessage = err.response?.data?.message ?? `Failed to call ${url}`;
            const appError = new AppAPIError(err.response?.status ?? -1, errorMessage, err.response?.data);

            console.error(err);
            throw appError;
        }).finally(() => {

        })
}

export default {
    makeHTTPRequest
}