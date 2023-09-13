<template>
  <div v-if="search">
    <van-search
      v-model="keyword"
      shape="round"
      placeholder="请输入搜索关键词"
      @update:model-value="handleFilter"
    />
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
                v-if="!data.children?.length"
                :name="data.id"
                @click="handleClickRadio"
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

<script lang="ts" setup>
import "element-plus/es/components/tree/style/css";
import { ElTree } from "element-plus";
import { ref, watch, onMounted } from "vue";
// import "vangle/dist/style.css";
// import { VanTree } from "vangle";
import { getOrgList } from "@/api/org";
import { toMap } from "@/utils";

// 文档地址： https://vangleer.github.io/vangle/zh/component/button.html
interface Tree {
  id: string;
  label: string;
  children?: Tree[];
}

const props = defineProps({
  modelValue: {
    type: String
    // required: true
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
    default: false
  }
});
const keyword = ref<string | number>("");
const treeRef = ref<any>(null);
// const treeData = ref<Tree[]>();
const treeData = ref<any>([]);
const mapTreeData = ref<any>({});

// 回显
const setCheckedNodes = () => {
  if (JSON.stringify(mapTreeData.value) !== "{}") {
    const arr = props.modelValue!.split(",").map((item: any) => {
      return mapTreeData.value[item];
    });
    treeRef.value!.setCheckedNodes(arr);
  }
};
onMounted(async () => {
  await getInit();
  if (props.modelValue) {
    if (props.checkType === "multiple") {
      setCheckedNodes();
    } else {
      selectValue.value = props.modelValue;
    }
  }
});
const defData = (arr: any) => {
  arr.forEach((item: any) => {
    mapTreeData.value[item.id] = { ...item };
    if (item?.children?.length) {
      defData(item.children);
    }
  });
};
const getInit = async () => {
  const res = await getOrgList();
  /*const obj = {
    id: "330421540770",
    children: "",
    code: "330421540770",
    fullName: "xx派出所",
    shortName: "xx派出所",
    unitInitial: "",
    address: "",
    parentId: "330421000000",
    parentCode: "330421000000",
    enable: "U",
    sort: "",
    createTime: "",
    beginId: "",
    isSupervision: "",
    policeNum: "",
    id1: ""
  };
  res[0].children.push(obj);*/
  treeData.value = res;
  defData(res || []);
};

// 重置
const resetChecked = () => {
  selectValue.value = null;
  treeRef.value!.setCheckedKeys([], false);
};

const defaultProps = {
  children: "children",
  label: "shortName"
};

/*let treeData: Tree[] = [
  {
    id: "1",
    label: "Level one 1",
    children: [
      {
        id: "4",
        label: "Level two 1-1",
        children: [
          {
            id: "9",
            label: "Level three 1-1-1"
          },
          {
            id: "10",
            label: "Level three 1-1-2"
          }
        ]
      }
    ]
  },
  {
    id: "2",
    label: "Level one 2",
    children: [
      {
        id: "5",
        label: "Level two 2-1"
      },
      {
        id: "6",
        label: "Level two 2-2"
      }
    ]
  },
  {
    id: "3",
    label: "Level one 3",
    children: [
      {
        id: "7",
        label: "Level two 3-1"
      },
      {
        id: "8",
        label: "Level two 3-2"
      }
    ]
  }
]*/
const selectValue = ref<any>(undefined);
// 节点点击事件(单选的情况)
function handleNodeClick(node: any) {
  if (node.childNodes?.length) return; // 不是最后一级节点就不操作
  if (props.checkType === "multiple") return; // 多选模式下也不操作
  selectValue.value = node.id;
}

// 筛选函数
function filterNode(value: any, data: any) {
  if (!value) return true;
  return data.label.includes(value);
}
// 输入框的值变化触发筛选
function handleFilter(val: any) {
  treeRef.value!.filter(val);
}

function handleClickRadio(e: any) {
  if (!props.leafOnly) {
    e.stopPropagation();
  } else {
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

// 获取当前选中的节点node数组(向外暴露的方法)多选
const getCheckedNodes = () => {
  return treeRef.value!.getCheckedNodes(true, false);
};
// 获取当前选中的节点id数组(向外暴露的方法)单选
const getCheckedKeys = () => {
  return {
    orgId: selectValue.value,
    orgName: mapTreeData.value[selectValue.value].shortName,
    data: mapTreeData.value[selectValue.value]
  };
};

defineExpose({
  getCheckedNodes,
  getCheckedKeys,
  resetChecked
});
</script>
<style lang="less" scoped></style>
