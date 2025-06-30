interface Config {
  BASE_API: string,
  GOOGLE_MAP_API_KEY?: string,
  GOOGLE_ANALYTICS_API_KEY?: string,
}

type Environment = 'development' | 'production' | 'localhost' ;
const config: Record<Environment, Config> = {
  development: {
    BASE_API: "https://dev-api.cuberefund.com/",
    GOOGLE_MAP_API_KEY: 'AIzaSyAya5atBqkgK0DKXTWmGcWoUReOtRJSiu8',
    GOOGLE_ANALYTICS_API_KEY: 'AIzaSyAKHh9NsqCK5bTH1LV6DAPX_qWsS8_qDcU'
  },
  production: {
    BASE_API: "https://api-www.cuberefund.com/",
    GOOGLE_MAP_API_KEY: 'AIzaSyAya5atBqkgK0DKXTWmGcWoUReOtRJSiu8',
    GOOGLE_ANALYTICS_API_KEY: 'AIzaSyAKHh9NsqCK5bTH1LV6DAPX_qWsS8_qDcU'
  },
  localhost: {
    BASE_API: "http://localhost:8080/",
    GOOGLE_MAP_API_KEY: 'AIzaSyAya5atBqkgK0DKXTWmGcWoUReOtRJSiu8',
    GOOGLE_ANALYTICS_API_KEY: 'AIzaSyAKHh9NsqCK5bTH1LV6DAPX_qWsS8_qDcU'
  },
};

// 빌드 및 시작 구동시 --mode ${MODE} 와 맵핑 됩니다.
const env = import.meta.env.MODE as Environment;

const envConfig: Config = {
  ...(config[env] || config["development"]),
};

export default envConfig;