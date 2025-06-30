import envConfig from '@/env-config'
import { ApiResponse } from '@/types/api'
import axios, { AxiosInstance } from 'axios'
import { create } from 'zustand'

interface ApiStore {
  axiosInstance: AxiosInstance
  createQueryString: <D extends Record<string, unknown>>(parameters: D) => string
  request: <T, D extends Record<string, unknown> = Record<string, unknown>>(
    endpoint: string,
    method: HttpMethod,
    url?: string,
    data?: D
  ) => Promise<ApiResponse<T>>
  createApiClient: (endpoint: string) => ApiClient
}

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'

interface ApiClient {
  all: <T>() => Promise<ApiResponse<T>>
  find: <T>(id: string | number) => Promise<ApiResponse<T>>
  create: <T>(item: Record<string, unknown>) => Promise<ApiResponse<T>>
  update: <T>(id: string | number, item: Record<string, unknown>) => Promise<ApiResponse<T>>
  patch: <T>(id: string | number, item: Record<string, unknown>) => Promise<ApiResponse<T>>  // 추가
  destroy: <T>(id: string | number) => Promise<ApiResponse<T>>
  submit: <T, D extends Record<string, unknown> = Record<string, unknown>>(
    method: HttpMethod,
    url: string,
    data?: D
  ) => Promise<ApiResponse<T>>
}

export const useApiStore = create<ApiStore>((_set, get) => ({
  axiosInstance: axios.create({
    baseURL: envConfig.BASE_API,
    headers: {
      'Content-Type': 'application/json',
    },
  }),

  createQueryString: (parameters) => {
    const validParams = Object.entries(parameters)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)

    return validParams.length ? `?${validParams.join('&')}` : ''
  },

  request: async (endpoint, method, url = '', data?) => {
    const instance = get().axiosInstance
    const createQueryString = get().createQueryString

    const token = localStorage.getItem("authToken");
    if (token) {
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete instance.defaults.headers.common["Authorization"];
    }

    try {
      let apiUrl = url ? `${endpoint}/${url}` : endpoint
      let config = {}

      if (method === 'delete' && data) {
        config = { data }
      } else if (method === 'get' && data) {
        apiUrl += createQueryString(data)
      } else if (data) {
        config = { data }
      }

      const response = await instance({
        method,
        url: apiUrl,
        ...config
      })

      return {
        code: response.status,
        data: response.data,
        msg: response.data?.msg ?? 'Success'
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          code: error.response.status,
          data: error.response.data,
          msg: error.response.data?.msg ?? 'Error occurred'
        }
      }
      throw error
    }
  },

  createApiClient: (endpoint: string) => ({
    all: <T>() => 
      get().request<T>(endpoint, 'get'),

    find: <T>(id: string | number) => 
      get().request<T>(endpoint, 'get', `${id}`),

    create: <T>(item: Record<string, unknown>) => 
      get().request<T>(endpoint, 'post', '', item),

    update: <T>(id: string | number, item: Record<string, unknown>) => 
      get().request<T>(endpoint, 'put', `${id}`, item),

    patch: <T>(id: string | number, item: Record<string, unknown>) => 
      get().request<T>(endpoint, 'patch', `${id}`, item),
    
    destroy: <T>(id: string | number) => 
      get().request<T>(endpoint, 'delete', `${id}`),

    submit: <T, D extends Record<string, unknown> = Record<string, unknown>>(
      method: HttpMethod,
      url: string,
      data?: D
    ) => {
      return get().request<T, D>(endpoint, method, url, data)
    }
  })
}))