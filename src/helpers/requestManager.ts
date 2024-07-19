import { server } from "./server";

class RequestManager {
    private _token: string = '';
    private HEADERS = {
        'Client-Type': 'mobileresiduos',
        'Api-Version': 'v1',
        'App-Version': '2.10.1',
        'Device-OS': 'Vision Galaxy Tab A8',
        'Device-Version': '14',
        'UUID': '0da77d03a7bf38f8',
        'Content-Type': 'application/json',
    };
    public url: string = server.url;

    constructor() {
        if (this.url === '') {
            server.getServer().then((response)=>{
                if (response) {
                    this.url = response.url;
                }
            });
        }
    }

    set token(token: string) {
        this._token = token;
        this.HEADERS['Authorization'] = token?`Bearer ${token}`:'';
    }
    
    get token() {
        return this._token;
    }

    async get(route: string, headers: any = {}) {
        return await fetch(this.url + route, { method: 'GET', headers: {...this.HEADERS,...headers} });
    }

    async post(route: string, body: any, headers: any = {}) {        
        return await fetch(this.url + route, { method: 'POST', body: JSON.stringify(body), headers: {...this.HEADERS,...headers} });
    }

    async put(route: string, body: any, headers: any = {}) {
        return await fetch(this.url + route, { method: 'PUT', body: JSON.stringify(body), headers: {...this.HEADERS,...headers} });
    }

    async delete(route: string, headers: any = {}) {
        return await fetch(this.url + route, { method: 'DELETE', headers: {...this.HEADERS,...headers} });
    }

}

export const requestManager = new RequestManager();