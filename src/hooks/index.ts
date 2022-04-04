let fullfilled = false;
let promise = null;

export const useTimeout = (ms: number) => {
  if (!fullfilled) {
    throw (promise ||= new Promise((res) => {
      setTimeout(() => {
        fullfilled = true;
        res(true);
      }, ms);
    }));
  }
};
