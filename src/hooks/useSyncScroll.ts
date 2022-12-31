import { RefObject } from 'react';

export const useSyncScroll = (ref1: RefObject<any>, ref2: RefObject<any>) => {
  const handleScroll = (selfRef: RefObject<any>, otherRef: RefObject<any>) => {
    const selfHeight = selfRef.current?.clientHeight ?? 0;
    const othersHeight = otherRef.current?.clientHeight ?? 0;
    const othersScrollHeight = otherRef.current?.scrollHeight ?? 0;
    const selfScrollHeight = selfRef.current?.scrollHeight ?? 0;
    const selfPos = selfRef.current?.scrollTop ?? 0;
    const othersPos = otherRef.current?.scrollTop ?? 0;
    const scrollTo =
      ((othersScrollHeight - othersHeight) * selfPos) /
      (selfScrollHeight - selfHeight);

    if (othersPos - scrollTo < -1 || othersPos - scrollTo > 1) {
      otherRef.current?.scrollTo({ top: scrollTo });
    }
  };
  return {
    handleScroll1: () => handleScroll(ref1, ref2),
    handleScroll2: () => handleScroll(ref2, ref1),
  };
};
