import axios, { AxiosRequestConfig } from 'axios';

export class HttpClientError extends Error {
    constructor(msg?: string) {
        super(msg);
        this.name = "HttpClientError";
    }
}

export interface IResponse<T> {
    code: number;
    msg: string;
    content: T;
}

export interface IHttpResponse<T> extends IResponse<T> {
    statusCode: number;
}

export interface HttpConfig<T> extends AxiosRequestConfig {
    resolve?: (content: any) => T;
}

export class HttpClient {

    constructor(private root?: string) { }

    public async get<T = any>(path: string, config?: HttpConfig<T>): Promise<IHttpResponse<T>> {
        const { resolve } = config || { resolve: null };
        try {
            const response = await axios.get(`${this.root}${path}`, Object.assign({}, config));
            const data = response.data;
            const res: IHttpResponse<T> = {
                statusCode: response.status,
                code: data.status,
                msg: data.msg,
                content: null as any
            };
            res.content = !!resolve ? resolve(data.content) : data.content;
            return res;
        } catch (e) {
            throw throwError("GET", `${this.root}${path}`, e);
        }
    }

}

function throwError(method: string, path: string, e: string) {
    return new HttpClientError(`\n\n [HttpClient errors] : when ${method} => ${path} .\n\n [SOURCE MESSAGE : ${e}]\n\n [STACKS] : `);
}
