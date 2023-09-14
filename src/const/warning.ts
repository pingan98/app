export const WARN_STATUS = {
  reviewed: "0",
  audited: "1"
};

export const WARN_STATUS_TXT = {
  [WARN_STATUS.reviewed]: "待处理",
  [WARN_STATUS.audited]: "已处理"
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
//  处置方式
export const DISPOSAL_METHOD = {
  ji_lv: "0",
  jin_bi: "1",
  t_z_z_x_z_w: "2",
  j_g_j_f: "3",
  tong_bao: "4",
  p_p_j_y: "5",
  other: "6"
};

export const DISPOSAL_METHOD_TXT = {
  [DISPOSAL_METHOD.ji_lv]: "纪律处分",
  [DISPOSAL_METHOD.jin_bi]: "禁闭",
  [DISPOSAL_METHOD.t_z_z_x_z_w]: "停止执行职务",
  [DISPOSAL_METHOD.j_g_j_f]: "局规记分",
  [DISPOSAL_METHOD.tong_bao]: "通报",
  [DISPOSAL_METHOD.p_p_j_y]: "批评教育",
  [DISPOSAL_METHOD.other]: "其他"
};
