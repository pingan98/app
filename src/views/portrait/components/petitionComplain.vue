<script lang="ts" name="PetitionComplain" setup>
import { ref, watch } from "vue";

import { getXfTsNumRep, getXfTsListRep } from "@/api/personPortrait";

const props = defineProps({
  params: {
    type: Object,
    default: () => {}
  }
});

const bean = ref<any>({});
const tsList = ref<any>([]);
const queryType = ref(0);

const getData = (params: any) => {
  getXfTsNumRep(params).then(data => {
    bean.value = data || {};
  });
  getXfTsList();
};

const getXfTsList = () => {
  getXfTsListRep({
    ...props.params,
    queryType: queryType.value
  }).then(data => {
    tsList.value = data || [];
  });
};

const setQueryType = (type: number) => {
  queryType.value = type;
};

watch(
  () => props.params,
  newValue => {
    if (newValue.db33) {
      getData(props.params);
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <div class="petition-complain">
    <template v-if="bean.reportNumVo">
      <div class="all-count-box">
        <div
          class="all-count-item van-hairline--right"
          @click="setQueryType(1)"
        >
          <div class="name">信访件总量</div>
          <div>
            <span class="num">{{ bean.accXfNum || 0 }}</span
            >件
          </div>
        </div>
        <div class="all-count-item">
          <div class="name">投诉件总量</div>
          <div>
            <span class="num">{{ bean.reportNumVo.comTotalNum || 0 }}</span
            >件
          </div>
        </div>
        <div class="all-count-item">
          <!-- <div class="name">自接件</div>
          <div>
            <span class="num">{{ bean.reportNumVo.zjNum || 0 }}</span
            >件
          </div> -->
          <div class="all-count-row">
            自接: <span>{{ bean.reportNumVo.zjNum || 0 }}</span
            >件
          </div>
          <div class="all-count-row">12389: <span>12</span>件</div>
        </div>
      </div>

      <!-- <div class="status-box">
        <div class="status-item-box wait" @click="setQueryType(3)">
          <div class="name">未办结</div>
          <div>
            <span class="num">{{ bean.reportNumVo.wbjNum || 0 }}</span> 件
          </div>
        </div>
        <div class="status-item-box true" @click="setQueryType(4)">
          <div class="name">属实</div>
          <div>
            <span class="num">{{ bean.reportNumVo.ssNum || 0 }}</span> 件
          </div>
        </div>
        <div class="status-item-box part-true" @click="setQueryType(5)">
          <div class="name">部分属实</div>
          <div>
            <span class="num">{{ bean.reportNumVo.bfssNum || 0 }}</span> 件
          </div>
        </div>
      </div> -->
    </template>

    <div class="petition-list">
      <div
        class="petition-item van-hairline--bottom"
        v-for="(item, ind) in tsList"
        :key="ind"
      >
        <div class="left-img-box"></div>
        <div class="right-main-box">
          <div class="name">
            {{ item.queNature || "" }}
          </div>
          <div class="petition-status">
            <!--是否办结-->
            <div class="is-right petition-status-box" v-if="item.isComplete">
              <span
                :class="[
                  'icon-box',
                  {
                    true: item.isComplete === '是',
                    false: item.isComplete === '否'
                  }
                ]"
              ></span>
              {{ item.isComplete === "是" ? "已办结" : "未办结" || "" }}
            </div>
            <!--是否属实-->
            <div class="is-conclude petition-status-box" v-if="item.isTrue">
              <span
                :class="[
                  'icon-box',
                  {
                    true: item.isTrue === '属实',
                    false: item.isTrue === '不属实',
                    'part-true': item.isTrue === '部分属实'
                  }
                ]"
              ></span>
              {{ item.isTrue || "" }}
            </div>
          </div>
          <div class="info-box">
            <div class="info-item">
              <span class="label">投诉人：</span>{{ item.dutyPoliceName || "" }}
            </div>
            <div class="info-item">
              <span class="label">投诉方式：</span>{{ item.compMethod || "" }}
            </div>
            <div class="info-item">
              <span class="label">投诉时间：</span>{{ item.comTime || "" }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/styles/mixin.less";
.all-count-box {
  .flex(space-evenly);
  padding: 16px 0;
  height: 80px;
  background: linear-gradient(90deg, #0084ff 0%, #02c2fa 100%);
  box-shadow: 0px 2px 6px rgba(60, 130, 254, 0.16);
  border-radius: 5px;
  .all-count-item {
    flex: 1;
    .flex(center, center);
    flex-direction: column;
    color: #ffffff;
    font-size: 12px;
    .num {
      font-size: 30px;
      font-family: DIN;
      font-weight: bold;
    }
  }
}
.status-box {
  .flex(space-between);
  margin-top: 13px;
  margin-bottom: 20px;
  .status-item-box {
    padding: 7px 0 7px 45px;
    flex: 32% 0 0;
    color: var(--text-color2);
    border-radius: 5px;
    font-size: 12px;
    .num {
      font-size: 20px;
      font-family: DIN;
      color: var(--text-color1);
      font-weight: bold;
    }
    &.wait {
      background: #fef6f5 url("@/assets/wait_status@3x.png") no-repeat 12px
        center / 26px;
    }
    &.true {
      background: #e4fbf6 url("@/assets/check_right@3x.png") no-repeat 12px
        center / 28px;
    }
    &.part-true {
      background: #e7f3ff url("@/assets/warn_icon1@3x.png") no-repeat 12px
        center / 26px;
    }
  }
}
.petition-list {
  .petition-item {
    .flex(flex-start,flex-start);
    padding: 10px 0;
    .left-img-box {
      width: 40px;
      height: 40px;
      background: url("@/assets/petition_icon@3x.png") no-repeat center / 100%;
    }
    .right-main-box {
      flex: 1;
      margin-left: 10px;
      .name {
        font-weight: bold;
        margin-bottom: 3px;
        .ellipsisLine(2);
      }
      .petition-status {
        .flex(flex-start,center);
        .petition-status-box {
          color: var(--text-color2);
          font-size: 12px;
          .icon-box {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-right: 3px;
          }
        }
        .is-right {
          margin-right: 15px;
          .icon-box {
            &.true {
              background: url("@/assets/pass_icon@3x.png") no-repeat center /
                100%;
            }
            &.false {
              background: url("@/assets/false_icon2@3x.png") no-repeat center /
                100%;
            }
            &.part-true {
              background: url("@/assets/warn_icon2@3x.png") no-repeat center /
                100%;
            }
          }
        }
        .is-conclude {
          .icon-box {
            &.true {
              background: url("@/assets/pass_icon@3x.png") no-repeat center /
                100%;
            }
            &.false {
              background: url("@/assets/false_icon2@3x.png") no-repeat center /
                100%;
            }
          }
        }
      }
      .info-box {
        background: #f8f8f8;
        padding: 8px 11px;
        border-radius: 5px;
        .label {
          display: inline-block;
          width: 70px;
          color: var(--text-color2);
        }
      }
    }
  }
}
</style>
