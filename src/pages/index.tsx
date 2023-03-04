import { useState } from 'react';

import { Box } from '@/components/Box';
import { Column, Row } from '@/components/Flex';
// import { http } from '@/services/http';
// import { envs } from '@/utils/env';
import { isEmpty } from '@/utils/is';

import { Msg, MsgBubble } from './Bubble';
import { Header } from './Header';
import { WeixinDialog } from './WeixinDiaog';

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
  const [msgs, setMsgs] = useState<Msg[]>([
    { type: 'bot', text: kHelp },
    { type: 'user', text: '你好' },
    { type: 'bot', text: '你好😊' },
    { type: 'user', text: '你是谁？' },
    { type: 'bot', text: '我是大明星' },
  ]);

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
      <Row
        width="100vw"
        height="100vh"
        justifyContent="center"
        background="#fff"
      >
        <Column
          maxWidth="1024px"
          width="100%"
          height="100vh"
          background="#ededed"
        >
          <Header />
          <Box height="8px" />
          {msgs.map((msg, idx) => {
            return <MsgBubble key={idx + msg.text} {...msg} />;
          })}
          <Box height="8px" />
        </Column>
      </Row>
    </>
  );
};
