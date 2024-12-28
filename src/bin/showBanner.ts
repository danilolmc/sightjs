import figlet from 'figlet';
import { LIBNAME } from '@/bin/index.ts';

export async function showBanner() {
  return new Promise((resolve, reject) => {
    figlet(LIBNAME, (err, data) => {
      if (err) {
        return reject(err);
      }
      console.log(data);
      console.log('--- Lets setup a new project together ---');
      resolve(null);
    });
  });
}
