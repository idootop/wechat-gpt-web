import './style.css';

import { Column, Expand, Row } from '@/components/Flex';
import { Text } from '@/components/Text';

import { Msg } from '../store';
import { showWeixinDialog } from '../WeixinDiaog';

export const MsgBubble = (props: Msg) => {
  const { type, text } = props;
  return type === 'bot' ? (
    <Row width="100%" alignItems="start" padding="10px 64px 10px 16px">
      <img
        onClick={() => {
          showWeixinDialog();
        }}
        src="logo.jpg"
        width="42px"
        height="42px"
        style={{
          borderRadius: '4px',
        }}
      />
      <Expand>
        <Column justifyContent="center" className="chat-bubble-left">
          <Text fontSize="16px" fontWeight="400">
            {text}
          </Text>
        </Column>
      </Expand>
    </Row>
  ) : (
    <Row width="100%" alignItems="start" padding="10px 16px 10px 64px">
      <Expand justifyContent="end">
        <Column justifyContent="center" className="chat-bubble-right">
          <Text fontSize="16px" fontWeight="400">
            {text}
          </Text>
        </Column>
      </Expand>
      <img
        onClick={() => {
          // TODO 编辑上传个人头像
          showWeixinDialog();
        }}
        src="user.jpg"
        width="42px"
        height="42px"
        style={{
          borderRadius: '4px',
        }}
      />
    </Row>
  );
};
