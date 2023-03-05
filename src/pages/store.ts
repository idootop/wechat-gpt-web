import { useEffect } from 'react';

import { http } from '@/services/http';
import {
  store,
  useInit,
  useProvider,
  useStore,
} from '@/services/store/useStore';
import { envs } from '@/utils/env';
import { isNotEmpty } from '@/utils/is';

const kAppStore = 'kAppStore';
export const kDefaultText = "喵呜 ฅ'ω'ฅ";
const kHelp = `
华人牌 2060 款手机傻妞为您服务，请输入开机密码。

🔥 定制人设
💬 人设 @ 你是大明星

🔑 绑定密钥
💬 绑定 @ sk-xxx

🔌 重启傻妞
💬 重启
`.trim();

export interface Msg {
  type: 'user' | 'bot';
  text: string;
}

interface AppSore {
  isSending: boolean;
  input: string;
  msgs: Msg[];
}

let userId = '404';
let question;
export const useAppStore = () => {
  const _msgs: any = useInit(() => {
    const url = new URL(window.location.href);
    userId = url.searchParams.get('userId') ?? '404';
    question = url.searchParams.get('question');
    return isNotEmpty(question) ? [] : [{ type: 'bot', text: kHelp }];
  });

  useProvider<AppSore>(kAppStore, {
    isSending: false,
    input: question ?? '',
    msgs: _msgs,
  });

  const [_store, setStore] = useStore<AppSore>(kAppStore);
  const { isSending, msgs, input } = _store;
  const isTexting = isNotEmpty(input);

  const getStore = () => store.get<any>(kAppStore);

  const addMsg = (text: string, type: 'bot' | 'user' = 'user') => {
    setStore({
      ...getStore(),
      msgs: [
        ...getStore().msgs,
        {
          type,
          text,
        },
      ],
    });
    // 滚动到最底部
    setTimeout(() => {
      document.getElementById('bottom')?.scrollIntoView();
    }, 100);
  };

  const send = async (question?: string) => {
    const { isSending: _isSending, input } = getStore() ?? {};
    const _isTexting = isNotEmpty(input);
    if (_isSending || !_isTexting) return;
    const _input = question ?? input;
    // 发送消息
    addMsg(_input, 'user');
    setStore({
      ...getStore(),
      isSending: true,
      input: '',
    });
    // 等待回复
    const reply = await http.post(envs.kAPI, {
      userId,
      question: _input,
    });
    // 回复消息
    addMsg(isNotEmpty(reply) ? reply! : kDefaultText, 'bot');
    setStore({
      ...getStore(),
      isSending: false,
    });
  };

  useEffect(() => {
    // 查询首个问题
    if (isNotEmpty(question)) {
      send(question);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTextInput = (input: string) => {
    setStore({
      ...getStore(),
      input,
    });
  };

  return {
    isSending,
    msgs,
    send,
    input,
    onTextInput,
    isTexting,
  };
};
