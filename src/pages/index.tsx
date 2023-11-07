import './style.css';

import { Box } from '@/components/Box';
import { Column } from '@/components/Flex';
import { isWechat } from '@/utils/wechat';

import { MsgBubble } from './Bubble';
import { Footer } from './Footer';
import { Header } from './Header';
import { useAppStore } from './store';
import { Toast, WeixinDialog } from './WeixinDiaog';

export const App = () => {
  const { msgs } = useAppStore();
  const _isWechat = isWechat();

  return (
    <>
      <WeixinDialog />
      <Toast />
      {!_isWechat && <Header />}
      <Column
        minHeight={
          _isWechat ? 'calc(100vh - 55px)' : 'calc(100vh - 2 * 55px + 65px)'
        }
      >
        <Box height={(_isWechat ? 0 : 65) + 8} />
        {msgs?.map((msg, idx) => {
          return <MsgBubble key={idx + msg.text} {...msg} />;
        })}
        <Box height={8} />
        <Box height={1} id="bottom" />
      </Column>
      <Footer />
    </>
  );
};
