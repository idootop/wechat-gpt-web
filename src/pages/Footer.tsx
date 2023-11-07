import { Box } from '@/components/Box';
import { Center, Expand, Row } from '@/components/Flex';
import { TextInput } from '@/components/Input/TextInput';

import { IconAdd, IconSticker, IconVoice } from './Icons';
import { kDefaultText, useAppStore } from './store';
import { showToast } from './WeixinDiaog';

export const Footer = () => {
  const { input, onTextInput, send, isTexting, isSending } = useAppStore();
  return (
    <Row
      className="glass-blur"
      bottom="0"
      position="fixed"
      width="100vw"
      padding="8px"
      borderTop="1px solid #dcdfd5"
      alignItems="end"
    >
      <Center
        height="38px"
        onClick={() => {
          showToast(kDefaultText);
        }}
      >
        <IconVoice />
      </Center>
      <Expand alignItems="center" margin="0 8px">
        <TextInput
          height="38px"
          minHeight="38px"
          maxHeight="38px"
          value={isSending ? '' : input}
          hint={isSending ? '对方正在输入中...' : ''}
          onChange={onTextInput}
          onSubmit={send}
        />
      </Expand>
      <Center
        height="38px"
        onClick={() => {
          showToast(kDefaultText);
        }}
      >
        <IconSticker />
      </Center>
      <Box width="8px" />
      <Center
        height="38px"
        onClick={() => {
          showToast(kDefaultText);
        }}
      >
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
            onClick={(e) => {
              send();
              e.stopPropagation();
              e.preventDefault();
            }}
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
