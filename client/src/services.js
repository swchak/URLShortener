const axios = require('axios')

export class HttpService {
    constructor() {
        this.http = axios.create({ 
            baseURL: 'http://localhost:3000',
            timeout: 1000
        });
    }

    get(url) {
        console.log(url)
        return this.http.get(url)
    }

    post(url, payload) {
       return this.http.post(url, payload) 
    }
}

const httpSvc = new HttpService()
export default httpSvc

