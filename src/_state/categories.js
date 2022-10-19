import { atom } from 'recoil';

const categoriesAtom = atom({
   key: 'categories',
   // get initial state from local storage to enable user to stay logged in
   default: null
});

export { categoriesAtom };