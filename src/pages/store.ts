import { http } from '@/services/http';
import {
  store,
  useInit,
  useProvider,
  useStore,
} from '@/services/store/useStore';
import { envs } from '@/utils/env';
import { isNotEmpty } from '@/utils/is';

const kAppStore = 'kAppStore';
export const kDefaultText = "喵呜 ฅ'ω'ฅ";
const kHelp = "喵呜 ฅ'ω'ฅ";

export interface Msg {
  type: 'user' | 'bot';
  text: string;
}

interface AppSore {
  isSending: boolean;
  input: string;
  msgs: Msg[];
  inputHeight: string;
}

let userId = '404';
let question;
export const useAppStore = () => {
  const _msgs: any = useInit(() => {
    const url = new URL(window.location.href);
    userId = url.searchParams.get('userId') ?? '404';
    question = url.searchParams.get('question');
    if (isNotEmpty(question)) {
      setTimeout(() => {
        // 查询首个问题
        if (isNotEmpty(question)) {
          send(question);
        }
      }, 100);
      return [];
    }
    return [{ type: 'bot', text: kHelp }];
  });

  useProvider<AppSore>(kAppStore, {
    isSending: false,
    input: question ?? '',
    msgs: _msgs,
    inputHeight: '38px',
  });

  const [_store, setStore] = useStore<AppSore>(kAppStore);
  const { isSending, msgs, input, inputHeight } = _store ?? {};
  const isTexting = isNotEmpty(input);

  const getStore = () => store.get<any>(kAppStore);

  const addMsg = (text: string, type: 'bot' | 'user' = 'user') => {
    setStore({
      ...getStore(),
      msgs: [
        ...getStore().msgs,
        {
          type,
          text,
        },
      ],
    });
    // 滚动到最底部
    setTimeout(() => {
      document.getElementById('bottom')?.scrollIntoView();
    }, 100);
  };

  const send = async (question?: string, inputHeight?: string) => {
    const { isSending: _isSending, input } = getStore() ?? {};
    const _isTexting = isNotEmpty(input);
    if (_isSending || !_isTexting) return;
    const _input = question ?? input;
    // 发送消息
    addMsg(_input, 'user');
    setStore({
      ...getStore(),
      isSending: true,
      input: '',
      inputHeight,
    });
    // 等待回复
    const reply = await http.post(envs.kAPI, {
      userId,
      question: _input,
    });
    // 回复消息
    addMsg(isNotEmpty(reply) ? reply!.trim() : kDefaultText, 'bot');
    setStore({
      ...getStore(),
      isSending: false,
    });
  };

  const onTextInput = (input: string, inputHeight) => {
    setStore({
      ...getStore(),
      input,
      inputHeight,
    });
  };

  return {
    isSending,
    msgs,
    send,
    input,
    onTextInput,
    isTexting,
    inputHeight,
  };
};
