import { atom } from 'recoil';

const serverAtom = atom({
   key: 'server',
   default: 'http://localhost:8000/'
});

export { serverAtom };