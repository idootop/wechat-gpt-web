import './style.css';

import { Box } from '@/components/Box';
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
      <Box height={8 + (_isWechat ? 0 : 57)} />
      {msgs?.map((msg, idx) => {
        return <MsgBubble key={idx + msg.text} {...msg} />;
      })}
      <Box height={8} />
      <Box height={1} id="bottom" />
      <Box height={`calc(38px + 2 * 8px)`} />
      <Footer />
    </>
  );
};
