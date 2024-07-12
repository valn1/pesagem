import { stringMd5 } from "react-native-quick-md5";
import { requestManager } from "./requestManager";

const validateResponse = async (response: Response) => {
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}

const post = async (url: string, body: any) => {
    try {
        const data = await requestManager.post(url, body)
        return await validateResponse(data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const API = {
    '/login' : (username: string, password: string) => {
        const md5Senha = stringMd5(password)
        return post('/login', {username, md5Senha})
    },
    '/logout' : async (username:string) => {
        return post('/logout', {username})
    },
    '/refresh' : async (username:string) => {
        return post('/refresh', {username})
    }
}
