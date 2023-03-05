import { Box } from '@/components/Box';
import { Center, Expand, Row } from '@/components/Flex';
import { TextArea } from '@/components/Input/TextArea';

import { IconAdd, IconSticker, IconVoice } from './Icons';
import { useAppStore } from './store';

export const Footer = () => {
  const { input, onTextInput, askBot, isTexting: _ } = useAppStore();
  return (
    <Row
      className="glass-blur"
      bottom="0"
      position="fixed"
      zIndex="2"
      width="100vw"
      padding="8px"
      borderTop="1px solid #dcdfd5"
      alignItems="end"
    >
      <Center height="38px">
        <IconVoice />
      </Center>
      <Expand alignItems="center" margin="0 8px">
        <TextArea value={input} onChange={onTextInput} onSubmit={askBot} />
      </Expand>
      <Center height="38px">
        <IconSticker />
      </Center>
      <Box width="8px" />
      <Center height="38px">
        <IconAdd />
      </Center>
    </Row>
  );
};
