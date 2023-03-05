import { Center } from '@/components/Flex';
import { store, useProvider, useStore } from '@/services/store/useStore';

const kShowDialog = 'kShowDialog';
const kShowToast = 'kShowToast';

export function showWeixinDialog() {
  store.set(kShowDialog, true);
}

export function hideWeixinDialog() {
  store.set(kShowDialog, false);
}

export const WeixinDialog = () => {
  useProvider(kShowDialog, false);
  const [show] = useStore(kShowDialog);
  return (
    <Center
      id="weixin"
      onClick={hideWeixinDialog}
      width="100vw"
      height="100vh"
      position="fixed"
      zIndex={100}
      background="rgba(0, 0, 0, 0.4)"
      visibility={show ? 'visible' : 'hidden'}
    >
      <img src="weixin.jpg" width="300px" style={{ borderRadius: '12px' }} />
    </Center>
  );
};

let preTimer: any = undefined;
export const showToast = (text: string) => {
  // 默认弹出微信关注弹窗
  showWeixinDialog();
  return;
  clearTimeout(preTimer);
  document.getElementById('toast')!.innerText = text;
  store.set(kShowToast, true);
  preTimer = setTimeout(() => {
    hideToast();
  }, 2000);
};

export const hideToast = () => {
  store.set(kShowToast, false);
};

export const Toast = () => {
  useProvider(kShowToast, false);
  const [show] = useStore(kShowToast);
  return (
    <Center
      width="100vw"
      height="100vh"
      position="fixed"
      zIndex={100}
      visibility={show ? 'visible' : 'hidden'}
      pointerEvents="none"
    >
      <Center
        id="toast"
        padding="4px 8px"
        borderRadius="4px"
        color="#fff"
        background="rgba(0, 0, 0, 0.6)"
      >
        你好
      </Center>
    </Center>
  );
};
