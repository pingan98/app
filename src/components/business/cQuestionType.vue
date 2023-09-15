<template>
  <div v-if="search">
    <form action="/">
      <van-search
        v-model="filterText"
        shape="round"
        placeholder="请输入搜索关键词"
        @update:model-value="handleFilter"
      />
    </form>
  </div>
  <van-radio-group v-model="selectValue">
    <el-tree
      ref="treeRef"
      class="custom-tree"
      :data="treeData"
      :show-checkbox="checkType === 'multiple'"
      :default-expand-all="false"
      node-key="id"
      highlight-current
      :props="defaultProps"
      empty-text="暂无数据"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
    >
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <div class="label">{{ node.label }}</div>
          <div
            class="radio"
            v-if="checkType === 'single'"
            style="position: relative; z-index: 0"
          >
            <template v-if="leafOnly">
              <van-radio
                v-if="!data.child.length"
                :name="data.id"
                @click="handleClickRadio(node, data, $event)"
              ></van-radio>
            </template>
            <template v-else>
              <van-radio :name="data.id" @click="handleClickRadio"></van-radio>
            </template>
          </div>
        </div>
      </template>
    </el-tree>
  </van-radio-group>
</template>

<script lang="ts" setup name="CQuestionType">
import "element-plus/es/components/tree/style/css";
import { ElTree } from "element-plus";
import { ref, watch, onMounted } from "vue";
import { getTreeList, getUserConcernTreeList } from "@/api/scoreManage";

// 文档地址： https://vangleer.github.io/vangle/zh/component/button.html
interface Tree {
  id: String;
  label: string;
  children?: Tree[];
}

const props = defineProps({
  modelValue: {
    type: String
    // required: true
  },
  isType: {
    type: String,
    default: "userConcernTreeList" // treeList/userConcernTreeList
  },
  checkType: {
    type: String,
    default: "single" // multiple/single
  },
  search: {
    type: Boolean,
    default: false
  },
  // 是否只能选择子节点
  leafOnly: {
    type: Boolean,
    default: true
  }
});
const filterText = ref<string | number>("");
const treeRef = ref<any>(null);
// const treeData = ref<Tree[]>();
const treeData = ref([]);
const mapTreeData = ref<any>({});
const checkedData = ref<any>({});

// 回显
const setCheckedNodes = () => {
  if (JSON.stringify(mapTreeData.value) !== "{}") {
    const arr = props.modelValue!.split(",").map((item: any) => {
      return mapTreeData.value[item];
    });
    treeRef.value!.setCheckedNodes(arr);
  }
};
onMounted(() => {
  getInit();
  if (props.modelValue) {
    if (props.checkType === "multiple") {
      setCheckedNodes();
    } else {
      selectValue.value = props.modelValue;
    }
  }
});
// 递归数据变成扁平化对象
const defData = (arr: any) => {
  arr.forEach((item: any) => {
    mapTreeData.value[item.id] = { ...item };
    if (item?.child?.length) {
      defData(item.child);
    }
  });
};
const getInit = () => {
  if (props.isType === "userConcernTreeList") {
    getUserConcernTreeList().then(res => {
      let str = JSON.stringify(res);
      str = str.replace(/\[\]/g, '""');
      treeData.value = JSON.parse(str) || [];
      // defData(treeData.value);
    });
  }
  if (props.isType === "treeList") {
    getTreeList().then(({ data }) => {
      let str = JSON.stringify(data);
      str = str.replace(/\[\]/g, '""');
      treeData.value = JSON.parse(str) || [];
      // defData(treeData.value);
    });
  }
};

// 重置
const resetChecked = () => {
  selectValue.value = null;
  checkedData.value = null;
  treeRef.value!.setCheckedKeys([], false);
};

const defaultProps = {
  children: "child",
  label: "name"
};

const selectValue = ref<any>(undefined);
// 节点点击事件(单选的情况)
function handleNodeClick(data: any) {
  // console.log("handleNodeClick-----------");
  // console.log(data);
  if (data.child?.length) return; // 不是最后一级节点就不操作
  if (props.checkType === "multiple") return; // 多选模式下也不操作
  selectValue.value = data.id;

  const node = treeRef.value.getNode(data);
  getCheckedKeys(node, data);
}

// 筛选函数
function filterNode(value: string, data: any) {
  if (!value) return true;
  return data.name.includes(value);
}
// 输入框的值变化触发筛选
function handleFilter(val: any) {
  treeRef.value!.filter(val);
}

function handleClickRadio(node: Node, data: any, e: any) {
  // console.log("Radio-----------");
  // console.log(node);
  // console.log(data);
  // console.log(e);
  if (!props.leafOnly) {
    e.stopPropagation();
  } else {
    getCheckedKeys(node, data);
    e.stopPropagation(true);
  }
}
const emit = defineEmits(["update:modelValue"]);
watch(
  () => selectValue.value,
  (val: any) => {
    emit("update:modelValue", val);
  }
);

let tempObj = {} as any;
let tempLabels = [] as any[];
let tempIds = [] as any[];
// 递归拿到parent信息
const defGetParent = (node: any, labels: any, ids: any) => {
  // console.log(node);

  if (node.parent && node.label) {
    tempObj = node.parent;
    labels.unshift(node.label);
    ids.unshift(node.id);

    defGetParent(tempObj, tempLabels, tempIds);
  }
};

const getCheckedKeys = (node: any, data: any) => {
  defGetParent(node?.parent, tempLabels, tempIds);

  tempLabels.push(data.name);
  tempIds.push(data.id);

  checkedData.value = {
    labels: tempLabels,
    labels_txt: tempLabels.join("-"),
    ids: tempIds,
    ids_txt: tempIds.join("-"),
    ...data
  };

  // 释放递归临时变量
  tempObj = {};
  tempLabels = [];
  tempIds = [];
};
// 向外暴露
defineExpose({
  checkedData,
  resetChecked
});
</script>
<style lang="less" scoped>
@import "@/styles/mixin.less";
</style>
