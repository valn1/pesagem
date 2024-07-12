import { stringMd5 } from "react-native-quick-md5"
import { TableColumn } from "../entities/commons/database"
import { db } from "./database"
import { API } from "./API"
import { requestManager } from "./requestManager"


const getUserToken = (username:string) => {
    return db.selectTop('TBL_USUARIOS', ['DS_TOKEN'], 1, `DS_LOGIN = ?`, [username])
}

const setUserToken = (username:string, token:string) => {
    return db.update('TBL_USUARIOS', ['DS_TOKEN'], [token], `DS_LOGIN = ?`, [username])
}

const login = async (username:string, password:string) => {
    const md5Senha = stringMd5(password)

    API['/login'](username, md5Senha).then(async data => {
        const token = data.token;
        if (token) {
            requestManager.token = token;
            const columns: TableColumn<'TBL_USUARIOS'>[] = ['DS_LOGIN','DS_MD5_SENHA','DS_TOKEN'];
            db.update('TBL_USUARIOS', columns as string[], [username,md5Senha,token], `DS_LOGIN = ?`, [username])
        }
    }).catch(console.error)
}

const logout = async (username:string) => {
    API['/logout'](username).then(async data => {
        const token = data.token;
        if (token) {
            const columns: TableColumn<'TBL_USUARIOS'>[] = ['DS_TOKEN'];
            db.update('TBL_USUARIOS', columns as string[], [''], `DS_LOGIN = ?`, [username])
        }
    }).catch(console.error)
}

const refresh = async (username:string) => {
    API['/refresh'](username).then(async data => {
        const token = data.token;
        if (token) {
            const columns: TableColumn<'TBL_USUARIOS'>[] = ['DS_TOKEN'];
            db.update('TBL_USUARIOS', columns as string[], [token], `DS_LOGIN = ?`, [username])
        }
    }).catch(console.error)
}

export const auth = {
    login,
    logout,
    refresh,
    getUserToken,
    setUserToken
}
