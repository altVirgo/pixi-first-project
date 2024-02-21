import { atom, useRecoilState } from "recoil";

/**
 * 当前组织
 */
const orgAtom = atom({
  key: "current-org",
  default: { id: 6, name: "苏州福海护理院有限公司" },
});

/**
 * 是否打开组织
 */
const isOpenAtom = atom({
  key: "is-opened",
  default: false,
});

export const useOrg = () => {
  const [org, setOrg] = useRecoilState(orgAtom);
  const [opened, setOpened] = useRecoilState(isOpenAtom);
  const selectOrg = (org) => {
    setOrg(org);
  };
  const toggleOpened = () => {
    setOpened(!opened);
  };
  return {
    opened,
    toggleOpened,
    org,
    setOrg,
    selectOrg,
  };
};
