import qs from 'qs';

const HTTP_METHOD = ['get', 'post', 'put', 'patch', 'delete'];
// can send data method
const CAN_SEND_METHOD = ['post', 'put', 'delete', 'patch'];

const COMMON_OPTS: Partial<RequestInit> = {
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'content-type': 'application/x-www-form-urlencoded'
  },
  credentials: 'include',
  mode: 'same-origin',
  cache: 'no-cache',
};

const meowFetch = Object.create(null);

HTTP_METHOD.forEach(method => {

  meowFetch[method] = async (path: string, { data, query, timeout = 5000, isWithAuthorization = false, isDownload = false }: {
    data?: Record<string, any>;
    query?: Record<string, string>;
    timeout?: number;
    isWithAuthorization?: boolean;
    isDownload?: boolean;
  } = {}) => {

    let url = path;

    const opts: RequestInit = {
      
      ...COMMON_OPTS,
     method,
    };

    if (query) {
      url += `${url.includes('?') ? '&' : '?'}${buildQueryString(query)}`;
    }

    if (CAN_SEND_METHOD.includes(method)) {
      opts.body = qs.stringify(data);
    }

    const res = await fetchWithTimeout({
      options: opts,
      url, 
      timeout,
      isWithAuthorization,
      isDownload
    });
    return (await res.json());
  };
});

const buildQueryString = (query: Record<string, string>): string => {
  return Object.keys(query)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
    .join('&');
};

interface IFetchWithTimeout {
  url: string;
  options?: RequestInit;
  timeout?: number;
  isWithAuthorization?: boolean;
  isDownload?: boolean;
}

// nodejs和window上都有setTimeout
const fetchWithTimeout = async ({
  url,
  options,
  timeout,
  isWithAuthorization,
  isDownload,
}: IFetchWithTimeout) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    if (!url) {
      throw new Error('fetch url is required');
    }
    

    if (!options || !options.method) {
      throw new Error('fetch method is required');
    }

    const opts: RequestInit = {
      ...COMMON_OPTS,
      ...options,
    };

    if (isWithAuthorization) {
      opts.headers = {
        ...opts.headers,
        'Authorization': 'Bearer ' + localStorage.getItem('meowAckToken'),
      };
    }
    return await fetch(url, { ...opts, signal }).then(res => {

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      if (isDownload) {
        return res.blob();
      }

      const contentType = res.headers.get('content-type') || 'application/json';

      if (contentType.includes('application/json')) {
        return res.json();
      } else if (contentType.includes('text/plain')) {
        return res.text();
      } else {
        // 其他类型可根据需要进一步处理
        throw new Error('不支持的Content-Type');
      }
    }).catch(err => {
      throw err;
    });
  } finally {
    return clearTimeout(id);
  }
};

export default meowFetch;


/**
 * isDownload 是否为文件需要下载，默认为false
 * isWithAuthorization 是否为需要授权，默认为false，暂时需要在客户端应用
 */