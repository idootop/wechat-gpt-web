import { http } from '@/services/http';
import { printf } from '@/utils/base';
import { envs } from '@/utils/env';

const main = async () => {
  const data = await http.post(envs.kAPI, {
    userId: 'test',
    question: '你好，你是谁',
  });
  printf(data);
};

main();
