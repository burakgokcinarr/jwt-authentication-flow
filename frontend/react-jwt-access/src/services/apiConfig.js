import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:5000/auth/',
    timeout: 3000,
    headers: {'X-Custom-Header': 'foobar'},
    withCredentials: true,                  // Cookie'leri göndermek için bu özelliği eklendi
});