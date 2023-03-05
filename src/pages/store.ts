// import { http } from '@/services/http';
import { useProvider, useStore } from '@/services/store/useStore';
// import { envs } from '@/utils/env';
import { isNotEmpty } from '@/utils/is';

const kAppStore = 'kAppStore';
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
  asking: boolean;
  input: string;
  msgs: Msg[];
}

export const useAppStore = () => {
  useProvider<AppSore>(kAppStore, {
    asking: false,
    input: '',
    msgs: [
      { type: 'bot', text: kHelp },
      { type: 'user', text: '你好' },
      { type: 'bot', text: '你好😊' },
      { type: 'user', text: '你是谁？' },
      { type: 'bot', text: '我是大明星' },
      { type: 'bot', text: kHelp },
      { type: 'user', text: '你好' },
      { type: 'bot', text: '你好😊' },
      { type: 'user', text: '你是谁？' },
      { type: 'bot', text: '我是大明星' },
      { type: 'bot', text: kHelp },
      { type: 'user', text: '你好' },
      { type: 'bot', text: '你好😊' },
      { type: 'user', text: '你是谁？' },
      { type: 'bot', text: '我是大明星' },
    ],
  });

  const [store, setStore] = useStore<AppSore>(kAppStore);
  const { asking, msgs, input } = store;
  const isTexting = isNotEmpty(input);

  const addMsg = (text: string, type: 'bot' | 'user' = 'user') => {
    setStore({
      ...store,
      msgs: [
        ...msgs,
        {
          type,
          text,
        },
      ],
    });
  };

  const askBot = async () => {
    if (asking || !isTexting) return;
    // 发送消息
    addMsg(input, 'user');
    setStore({
      ...store,
      asking: true,
      input: '',
    });
    // 等待回复
    const reply = '复读机：' + input;
    // await http.post(envs.kAPI, {
    //   userId: 'test',
    //   question: '你好，你是谁',
    // });
    // 回复消息
    addMsg(isNotEmpty(reply) ? reply : "喵呜 ฅ'ω'ฅ", 'bot');
    setStore({
      ...store,
      asking: false,
    });
  };

  const onTextInput = (input: string) => {
    setStore({
      ...store,
      input,
    });
  };

  return {
    asking,
    msgs,
    askBot,
    input,
    onTextInput,
    isTexting,
  };
};
