import './style.css';

import { Box } from '@/components/Box';
import { Column } from '@/components/Flex';

import { MsgBubble } from './Bubble';
import { Footer } from './Footer';
import { Header } from './Header';
import { useAppStore } from './store';
import { Toast, WeixinDialog } from './WeixinDiaog';

export const App = () => {
  const { msgs } = useAppStore();

  return (
    <>
      <WeixinDialog />
      <Toast />
      <Header />
      <Column className="hide-scollbar">
        <Box height={65 + 8} />
        {msgs.map((msg, idx) => {
          return <MsgBubble key={idx + msg.text} {...msg} />;
        })}
        <Box height={65 + 8} />
        <Box height={1} id="bottom" />
      </Column>
      <Footer />
    </>
  );
};
