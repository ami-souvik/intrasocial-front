import axios from "axios";
import { useEnvars } from "../hooks/useEnvars";
import { getPersistState, setPersistState } from "../hooks/usePersistState";

const { VITE_API_BASE_URL } = useEnvars()

export async function checkRefresh() {
    const { access, refresh } = getPersistState('token');
    if(Number(atob(access.split('.')[1])["exp"]) > Math.floor(Date.now()/1000))
        return access;
    return axios.post(`${VITE_API_BASE_URL}/api/v1/token/refresh/`, { refresh })
        .then(res => {
            setPersistState('token', { access: res.data.access, refresh })
            return res.data.access
        })
        .catch(err => {
            alert(String(err))
        });
}

export async function get(path: string) {
    const access = await checkRefresh()
    return axios.get(`${VITE_API_BASE_URL}/api/v1/${path}/`, {
        headers: {
            Authorization: `Bearer ${access}`
        }
    })
}

export async function post<T>(path: string, body: T) {
    const access = await checkRefresh()
    return axios.post(`${VITE_API_BASE_URL}/api/v1/${path}/`, body, {
        headers: {
            Authorization: `Bearer ${access}`
        }
    })
}