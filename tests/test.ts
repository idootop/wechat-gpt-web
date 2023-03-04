import { http } from '@/services/http';
import { printf, printJson } from '@/utils/base';

const main = async () => {
  const data = await http.get(
    'https://movie.douban.com/j/subject_suggest?q=爱的迫降',
  );
  printJson(data);
  printf(`Hello world`);
};

main();
