import axios from 'axios'
import { useEnvars } from '../hooks/useEnvars'

const { VITE_API_BASE_URL } = useEnvars()

export async function checkRefresh(token: { access?: string; refresh?: string }) {
  const { access, refresh } = token
  if (!access || !refresh) return null
  if (Number(JSON.parse(atob(access.split('.')[1])).exp) > Math.floor(Date.now() / 1000))
    return token
  return axios
    .post(`${VITE_API_BASE_URL}/api/v1/token/refresh/`, { refresh })
    .then((res) => ({ access: res.data.access, refresh }))
    .catch(() => null)
}

export class Callout {
  constructor(access: string) {
    this.access = access
  }
  async get(path: string) {
    return axios.get(`${VITE_API_BASE_URL}/api/v1/${path}/`, {
      headers: {
        Authorization: `Bearer ${this.access}`
      }
    })
  }
  async post<T>(path: string, body: T) {
    return axios.post(`${VITE_API_BASE_URL}/api/v1/${path}/`, body, {
      headers: {
        Authorization: `Bearer ${this.access}`
      }
    })
  }
}
