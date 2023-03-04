import { useEffect } from 'react';

import { Center } from '@/components/Flex';

export function showWeixinDialog() {
  document.getElementById('weixin')!.style.visibility = 'visible';
}

export function hideWeixinDialog() {
  document.getElementById('weixin')!.style.visibility = 'hidden';
}

export const WeixinDialog = () => {
  useEffect(() => {
    hideWeixinDialog();
  }, []);
  return (
    <Center
      id="weixin"
      onClick={hideWeixinDialog}
      width="100vw"
      height="100vh"
      position="fixed"
      zIndex={100}
      background="rgba(0, 0, 0, 0.4)"
    >
      <img src="weixin.jpg" width="300px" style={{ borderRadius: '16px' }} />
    </Center>
  );
};
