// import { http } from '@/services/http';
import { store, useProvider, useStore } from '@/services/store/useStore';
import { delay } from '@/utils/base';
// import { envs } from '@/utils/env';
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

export const useAppStore = () => {
  useProvider<AppSore>(kAppStore, {
    isSending: false,
    input: '',
    msgs: [
      { type: 'bot', text: kHelp },
      { type: 'user', text: '你好' },
      { type: 'bot', text: '你好😊' },
      { type: 'user', text: '你是谁？' },
      { type: 'bot', text: '我是大明星' },
    ],
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
  };

  const send = async () => {
    if (isSending || !isTexting) return;
    // 发送消息
    addMsg(input, 'user');
    setStore({
      ...getStore(),
      isSending: true,
      input: '',
    });
    // 等待回复
    const reply = '复读机：' + input;
    await delay(3000);
    // await http.post(envs.kAPI, {
    //   userId: 'test',
    //   question: '你好，你是谁',
    // });
    // 回复消息
    addMsg(isNotEmpty(reply) ? reply : kDefaultText, 'bot');
    setStore({
      ...getStore(),
      isSending: false,
    });
    // TODO 滚动到最底部
  };

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
