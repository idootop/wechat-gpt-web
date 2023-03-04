import { Expand, Row } from '@/components/Flex';
import { Text } from '@/components/Text';

import { IconBack, IconMe } from './Icons';

export const Header = () => {
  return (
    <Row
      top="0"
      position="sticky"
      width="100%"
      padding="16px"
      background="#ededed"
      borderBottom="1px solid #dcdfd5"
    >
      <IconBack />
      <Expand justifyContent="center">
        <Text fontSize="16px" fontWeight="bold">
          乂乂又又
        </Text>
      </Expand>
      <IconMe />
    </Row>
  );
};
