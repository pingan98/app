export const WARN_STATUS = {
  audited: "1",
  reviewed: "0"
};

export const WARN_STATUS_TXT = {
  [WARN_STATUS.audited]: "已处理",
  [WARN_STATUS.reviewed]: "待处理"
};

export const QK_TYPE = {
  true: "0",
  follow: "2",
  false: "1"
};

export const QK_TYPE_TXT = {
  [QK_TYPE.true]: "存在违纪违规情况",
  [QK_TYPE.follow]: "作为线索继续跟进",
  [QK_TYPE.false]: "排除问题和风险"
};
export const ASSIGN_STATUS = {
  pending: "0",
  review: "1",
  archive: "2",
  all: "3"
};

export const ASSIGN_STATUS_TXT = {
  [ASSIGN_STATUS.pending]: "待处理",
  [ASSIGN_STATUS.review]: "待审核",
  [ASSIGN_STATUS.archive]: "已归档",
  [ASSIGN_STATUS.all]: "汇总"
};
