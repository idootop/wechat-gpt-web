import fetch from 'isomorphic-unfetch';

import { jsonDecode, jsonEncode } from '@/utils/base';
import { envs } from '@/utils/env';
import { isBlob, isNotEmpty, isObject } from '@/utils/is';
import pTimeout from '@/utils/p-timeout';

const kProxyKey = 'x-proxy-target';
const kProxyHeadersKey = 'x-proxy-headers';
const kBaseHeaders = {
  [kProxyHeadersKey]: jsonEncode({
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0',
  })!,
};

const _buildURL = (url: string, query?: Record<string, any>) => {
  const _url = new URL(url);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (isNotEmpty(value)) {
      _url.searchParams.append(key, value.toString());
    }
  }
  return _url.href;
};

type HttpConfig = {
  timeout?: number;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

const get = async (
  url: string,
  query?: Record<string, any>,
  config?: HttpConfig,
) => {
  const { timeout = http.timeout, headers = {}, signal } = config ?? {};
  const newUrl = _buildURL(url, query);
  const response = await pTimeout(
    fetch(newUrl, {
      method: 'GET',
      headers: {
        ...headers,
      },
      signal,
    }).catch((e) => {
      if (!e.message?.includes('aborted')) {
        console.error('❌ 网络异常：', e);
      }
      return undefined;
    }),
    timeout,
  ).catch(() => {
    console.error('🕙 请求超时');
    return undefined;
  });
  let result = await response?.text();
  result = jsonDecode(result) ?? result;
  return result;
};

const post = async (url: string, data?: any, config?: HttpConfig) => {
  const { timeout = http.timeout, headers = {}, signal } = config ?? {};
  const body = isObject(data) && !isBlob(data) ? jsonEncode(data) : data;
  const response = await pTimeout(
    fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
      },
      body,
      signal,
    }).catch((e) => {
      if (!e.message?.includes('aborted')) {
        console.error('❌ 网络异常：', e);
      }
      return undefined;
    }),
    timeout,
  ).catch(() => {
    console.error('🕙 请求超时');
    return undefined;
  });
  let result = await response?.text();
  result = jsonDecode(result) ?? result;
  return result;
};

export const http = {
  httpProxy: envs.kHttpProxy,
  /**
   * 默认超时：30s
   */
  timeout: 30 * 1000,
  get,
  post,
  proxy: {
    get(url: string, query?: Record<string, any>, config?: HttpConfig): any {
      const { headers = {}, signal } = config ?? {};
      if (!http.httpProxy) {
        return get(url, query, config);
      }
      return get(http.httpProxy, query, {
        ...config,
        headers: { ...kBaseHeaders, ...headers, [kProxyKey]: url },
        signal,
      });
    },
    post(url: string, data?: any, config?: HttpConfig): any {
      const { headers = {}, signal } = config ?? {};
      if (!http.httpProxy) {
        return post(url, data, config);
      }
      return post(http.httpProxy, data, {
        ...config,
        headers: { ...kBaseHeaders, ...headers, [kProxyKey]: url },
        signal,
      });
    },
  },
};
