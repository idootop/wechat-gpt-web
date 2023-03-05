import './style.css';

import { Box } from '@/components/Box';
import { Column } from '@/components/Flex';

import { MsgBubble } from './Bubble';
import { Footer } from './Footer';
import { Header } from './Header';
import { useAppStore } from './store';
import { WeixinDialog } from './WeixinDiaog';

export const App = () => {
  const { msgs } = useAppStore();

  return (
    <>
      <WeixinDialog />
      <Header />
      <Column className="hide-scollbar">
        <Box height={65 + 8} />
        {msgs.map((msg, idx) => {
          return <MsgBubble key={idx + msg.text} {...msg} />;
        })}
        <Box height={65 + 8} />
      </Column>
      <Footer />
    </>
  );
};
