import { atom, useRecoilState } from "recoil";

/**
 * 对话框详情
 */
const dialogAtom = atom({
  key: "dialog",
  default: {
    opened: false,
    type: undefined,
    data: undefined,
  },
});

export const useDialog = () => {
  const [info, setInfo] = useRecoilState(dialogAtom);
  const openDialog = (v) => {
    setInfo({
      opened: true,
      ...v,
    });
  };
  const closeDialog = () => {
    setInfo({
      opened: false,
      type: undefined,
      data: undefined,
    });
  };
  return {
    opened: info.opened,
    type: info.type,
    data: info.data,
    openDialog,
    closeDialog,
  };
};
