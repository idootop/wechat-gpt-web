import { Box } from '@/components/Box';
import { Center, Expand, Row } from '@/components/Flex';
import { TextArea } from '@/components/Input/TextArea';

import { IconAdd, IconSticker, IconVoice } from './Icons';
import { useAppStore } from './store';

export const Footer = () => {
  const { input, onTextInput, send, isTexting, isSending } = useAppStore();
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
        <TextArea
          value={isSending ? '' : input}
          hint={isSending ? '对方正在输入中...' : ''}
          onChange={onTextInput}
          onSubmit={send}
        />
      </Expand>
      <Center height="38px">
        <IconSticker />
      </Center>
      <Box width="8px" />
      <Center height="38px">
        {isTexting ? (
          <Box
            cursor="pointer"
            userSelect="none"
            fontSize="14px"
            fontWeight="500"
            padding="6px 14px"
            color="#fff"
            background="#58be69"
            borderRadius="4px"
            onClick={send}
          >
            发送
          </Box>
        ) : (
          <IconAdd />
        )}
      </Center>
    </Row>
  );
};
