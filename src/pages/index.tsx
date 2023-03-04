import { useState } from 'react';

import { Center } from '@/components/Flex';
import { Text } from '@/components/Text';
// import { http } from '@/services/http';
// import { envs } from '@/utils/env';
import { isEmpty } from '@/utils/is';

import { WeixinDialog } from './WeixinDiaog';

interface Msg {
  type: 'user' | 'bot';
  text: string;
}

const kHelp = `
华人牌 2060 款手机傻妞为您服务，请输入开机密码。

🔥 定制人设
💬 人设 @ 你是大明星

🔑 绑定密钥
💬 绑定 @ sk-xxx

🔌 重启傻妞
💬 重启
`.trim();

export const App = () => {
  const [asking, setAsking] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ type: 'bot', text: kHelp }]);

  const addMsg = (text: string, type: 'bot' | 'user' = 'user') => {
    setMsgs([
      ...msgs,
      {
        type,
        text,
      },
    ]);
  };

  const _askBot = async (question: string) => {
    if (asking) return;
    setAsking(true);
    const reply = '复读机：' + question;
    // await http.post(envs.kAPI, {
    //   userId: 'test',
    //   question: '你好，你是谁',
    // });
    addMsg(isEmpty(reply) ? "喵呜 ฅ'ω'ฅ" : reply!, 'bot');
    setAsking(false);
  };

  return (
    <>
      <WeixinDialog />
      <Center width="100%" height="100vh">
        <Center background={'pink'} size="200px">
          <Text>Hello world!</Text>
          <Text maxLines={1}>
            风急天高猿啸哀，渚清沙白鸟飞回。 无边落木萧萧下，不尽长江滚滚来。
          </Text>
        </Center>
      </Center>
    </>
  );
};
