class RequestManager {
    private _token: string = '';
    private HEADERS = {
        'Client-Type': 'mobilepesagem',
        'Api-Version': 'v1',
        'App-Version': '0.0.1',
        'Device-OS': 'Vision Galaxy Tab A8',
        'Device-Version': '14',
        'UUID': '0da77d03a7bf38f8',
        'Content-Type': 'application/json',
    };
    public url: string = 'http://187.45.121.132:8090';

    set token(token: string) {
        this._token = token;
        this.HEADERS['Authorization'] = token?`Bearer ${token}`:'';
    }
    
    get token() {
        return this._token;
    }

    async get(url: string, headers: any = {}) {
        return await fetch(url, { method: 'GET', headers: headers });
    }

    async post(url: string, body: any, headers: any = {}) {
        return await fetch(url, { method: 'POST', body: JSON.stringify(body), headers: headers });
    }

    async put(url: string, body: any, headers: any = {}) {
        return await fetch(url, { method: 'PUT', body: JSON.stringify(body), headers: headers });
    }

    async delete(url: string, headers: any = {}) {
        return await fetch(url, { method: 'DELETE', headers: headers });
    }

}

export const requestManager = new RequestManager();