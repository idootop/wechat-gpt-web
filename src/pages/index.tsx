import { Box } from '@/components/Box';
import { Column, Expand, Row } from '@/components/Flex';

import { MsgBubble } from './Bubble';
import { Header } from './Header';
import { useAppStore } from './store';
import { WeixinDialog } from './WeixinDiaog';

export const App = () => {
  const { msgs } = useAppStore();

  return (
    <>
      <WeixinDialog />
      <Row
        width="100vw"
        height="100vh"
        justifyContent="center"
        background="#fff"
      >
        <Column width="100%" height="100vh" background="#ededed">
          <Header />
          <Expand flexDirection="column">
            <Box height="8px" />
            {msgs.map((msg, idx) => {
              return <MsgBubble key={idx + msg.text} {...msg} />;
            })}
            <Box height="8px" />
          </Expand>
        </Column>
      </Row>
    </>
  );
};
