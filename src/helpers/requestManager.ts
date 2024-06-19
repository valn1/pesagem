class RequestManager {
    private token: string = '';
    private headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
    }
    private url: string = '';

    constructor() {
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