export const SPECIES = {
  wgwj: "1",
  petition: "2",
  drink: "3",
  case: "4"
};

export const SPECIES_TXT = {
  [SPECIES.wgwj]: "违规违纪",
  [SPECIES.petition]: "信访投诉",
  [SPECIES.drink]: "饮酒报备",
  [SPECIES.case]: "执法办案"
};

export const VERIFIED = {
  true: "0",
  part_true: "1",
  false: "2"
};
export const VERIFIED_TXT = {
  [VERIFIED.true]: "属实",
  [VERIFIED.part_true]: "部分属实",
  [VERIFIED.false]: "不属实"
};
export const COMPLETE = {
  yes: "1",
  no: "0"
};
export const COMPLETE_TXT = {
  [COMPLETE.yes]: "已办结",
  [COMPLETE.no]: "未办结"
};
export const POLICE_TYPE = {
  // 获取警员接口，所传type区分
  min: "0",
  fu: "1"
};

export const POLICE_TYPE_TXT = {
  [POLICE_TYPE.min]: "民警",
  [POLICE_TYPE.fu]: "辅警"
};
