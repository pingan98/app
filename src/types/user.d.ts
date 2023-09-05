export type User = {
  /** token令牌 */
  token: string;
};

type OmitUser = Omit<User, "token">;
export type UserInfo = OmitUser & {
  /** 关注 */
  likeNumber: number;
  /** 收藏 */
  collectionNumber: number;
  /** 积分 */
  score: number;
  /** 优惠券 */
  couponNumber: number;
  orderInfo: {
    /** 待付款 */
    paidNumber: number;
    /** 待发货 */
    receivedNumber: number;
    /** 待收货 */
    shippedNumber: number;
    /** 已完成 */
    finishedNumber: number;
  };
};
