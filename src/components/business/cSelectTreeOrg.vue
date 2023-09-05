<script lang="ts" name="CSelectTreeOrg" setup>
import { reactive, ref, watch } from "vue";
const emits = defineEmits(["update:modelValue", "change", "confirm"]);
const props = defineProps({
  // 绑定值
  modelValue: {
    type: Array,
    default: () => []
  },
  listData: {
    type: Array,
    default: () => []
  },
  // label key
  labelKey: {
    type: String,
    default: "name"
  },
  // id key
  idKey: {
    type: String,
    default: "id"
  },
  // pid key
  pidKey: {
    type: String,
    default: "pid"
  },
  // 是否联动勾选
  isLink: {
    type: Boolean,
    default: true
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: true
  }
});

const data = reactive({
  treeParam: "",
  treeParamAlready: "", // 已经进行了搜索的参数
  list: props.listData, // 树数组
  listObj: {}, // 数组对象
  selectList: [], // 选中的数据
  searchSomeDataList: [], // 搜索相同对象数组
  canCheckList: [], // 能够选择的数据集合
  canCheckListFixed: [], // 固定的能够选择的数据集合
  allSelect: false, // 是否全选
  state: "0", // "" -- 全部   0 -- 在职   1 -- 离职
  names: ""
});

const treeSelectRef = ref(null);

const init = type => {
  if (type) {
    data.names = "";
  }

  data.treeParam = "";
  data.treeParamAlready = "";
  data.canCheckList = [];
  data.canCheckListFixed = [];
};
const initData = options => {
  if (options && options.length) {
    data.list = options;
    init();
    data.listObj = setListObj(options);
  }
};
// 将树形数据转为扁平对象
const setListObj = (list, pid) => {
  let listObj = {};
  list.forEach(itm => {
    if (pid) {
      itm[props.pidKey] = pid;
    }
    data.canCheckList.push(itm);
    data.canCheckListFixed.push(itm);
    listObj[itm[props.idKey]] = itm;
    if (itm.children && itm.children.length) {
      listObj = {
        ...listObj,
        ...setListObj(itm.children, itm[props.idKey])
      };
    }
  });
  return listObj;
};
</script>

<template>
  <div class="c-select-tree-org">
    <div
      class="item"
      v-for="item in props.list"
      :key="item[idKey]"
      v-show="!item.isHide"
    >
      <div class="title">
        <div class="checkbox-box">
          <van-checkbox
            v-if="props.multiple"
            icon-size="16px"
            shape="square"
            @click.stop="checkChange(item)"
            v-model="item.checked"
            ><span style="font-size: 15px">{{
              item[labelKey]
            }}</span></van-checkbox
          >
          <p
            v-else
            :style="{
              fontSize: '15px',
              color: defaultId === item[idKey] ? 'var(--van-primary-color)' : ''
            }"
            @click.stop="checkChange(item)"
          >
            {{ item[labelKey] }}
          </p>
        </div>
        <div @click.stop="itemClick(item)" class="arrow">
          <van-icon
            v-if="item.children && item.children.length"
            :name="item.isShowChildren ? 'arrow-up' : 'arrow-down'"
          />
        </div>
      </div>
      <div class="tree" v-show="item.isShowChildren">
        <c-select-tree-org
          :labelKey="props.labelKey"
          :idKey="props.idKey"
          :pidKey="props.pidKey"
          :isLink="props.isLink"
          v-if="item.children && item.children.length"
          :list="item.children"
          :listObj="props.listObj"
          :isFirstFloor="false"
          :multiple="props.multiple"
          @confirm="onConfirm"
          :defaultId="defaultId"
        >
        </c-select-tree-org>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
