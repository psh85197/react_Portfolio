import envConfig from '@/env-config'
import {ApiResponse} from '@/types/api'
import axios, {AxiosInstance} from 'axios'
import {create} from 'zustand'

interface FileUploadStore {
  axiosInstance: AxiosInstance
  uploadFile: <T = string>(
    endpoint: string,
    formData: FormData,
    onProgress?: (progress: number) => void
  ) => Promise<ApiResponse<T>>
  createFileUploadClient: (endpoint: string) => FileUploadClient
}

interface FileUploadClient {
  upload: <T = string>(
    formData: FormData,
    onProgress?: (progress: number) => void
  ) => Promise<ApiResponse<T>>
}

export const useFileUploadStore = create<FileUploadStore>((_set, get) => ({
  axiosInstance: axios.create({
    baseURL: envConfig.BASE_API
  }),

  uploadFile: async <T = string>(endpoint: string, formData: FormData, onProgress?: (progress: number) => void) => {
    const instance = get().axiosInstance

    // 토큰 추가
    const token = localStorage.getItem('authToken')
    if (token) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    try {
      const response = await instance.post<ApiResponse<T>>(endpoint, formData, {
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = (progressEvent.loaded / progressEvent.total) * 100
            onProgress(progress)
          }
        }
      })

      return {
        code: response.status,
        data: response.data,
        msg: response.statusText, // TODO : msg 응답 데이터 statusText맞는지 체크하기
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data
      }
      throw error
    }
  },

  createFileUploadClient: (endpoint: string) => ({
    upload: <T = string>(formData: FormData, onProgress?: (progress: number) => void): Promise<ApiResponse<T>> => {
      return get().uploadFile(endpoint, formData, onProgress) as Promise<ApiResponse<T>>;
    }
  })
}));