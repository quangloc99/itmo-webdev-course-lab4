export interface ScreenSizeSplitter{
  size: number;
  name: string;
}

// this is when you realize you need adaptive/responsive design, but then you have a lot of components :p
export function screenSizeListener(splitter: ScreenSizeSplitter[], callback: (screenName: string, oldScreenName) => void, immediate = true) {
  splitter = splitter.splice(0).sort((lhs, rhs) => lhs.size - rhs.size);
  let currentScreenName: string = null;
  function listener() {
    const w = window.innerWidth;
    for (const {size, name} of splitter) {
      if (w >= size) continue;
      if (currentScreenName !== name) {
        callback(name, currentScreenName);
        currentScreenName = name;
      }
      return ;
    }
    if (currentScreenName !== null) {
      callback(null, currentScreenName);
      currentScreenName = null;
    }
  }
  window.addEventListener('resize', listener);
  if (immediate) listener();
  return listener;
}
