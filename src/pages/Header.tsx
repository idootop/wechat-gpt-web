import { Expand, Row } from '@/components/Flex';
import { Text } from '@/components/Text';

import { IconBack, IconMe } from './Icons';
import { useAppStore } from './store';

export const Header = () => {
  const { isSending } = useAppStore();
  return (
    <Row
      className="glass-blur"
      top="0"
      position="fixed"
      zIndex="2"
      width="100%"
      padding="16px"
      borderBottom="1px solid #dcdfd5"
    >
      <IconBack />
      <Expand justifyContent="center">
        <Text fontSize="16px" fontWeight="bold">
          {isSending ? '对方正在输入...' : '乂乂又又'}
        </Text>
      </Expand>
      <IconMe />
    </Row>
  );
};
