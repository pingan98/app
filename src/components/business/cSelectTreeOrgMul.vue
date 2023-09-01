<!--
 * @Description: 部门搜索 可选多个 组件文档https://vue-treeselect.js.org
 * @Author: 辰月
 * @Date: 2023-06-20 11:28:17
 * @LastEditTime: 2023-06-20 16:42:05
 * @LastEditors: 辰月
-->
<template>
  <tree-select
    ref="treeselect"
    v-bind="$attrs"
    style="width: 16vw; line-height: 18px"
    no-results-text="未搜索到匹配项"
    :placeholder="placeholder"
    :normalizer="normalizer"
    :options="treeData"
    :flat="flat"
    :show-count="showCount"
    :limit="5"
    :limit-text="(count) => `及其它${count}项`"
    :default-expand-level="1"
    v-on="$listeners"
  />
</template>

<script>
import { getOrgList, getOrganizationAll } from '@/api/common'

export default {
  name: 'CSelectTreeOrgMul',
  props: {
    defOrgId: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    all: {
      // true整个拱墅区 false 派出所获取本部门
      type: Boolean,
      default: true
    },
    flat: {
      //设置平面模式（选中的标签不联动子节点和父节点）
      type: Boolean,
      default: true
    },
    showCount: {
      // 展示下拉总数数据
      type: Boolean,
      default: true
    },
    limit: {
      // 展示多选的标签个数
      type: Number,
      default: 5
    }
  },
  data() {
    this.normalizer = function (node) {
      return {
        id: node.id,
        children: node.child,
        label: node.shortName
      }
    }
    return {
      treeData: []
    }
  },

  mounted() {
    this.getOrgList(1)
  },
  methods: {
    getOrgList(dataType) {
      const fn = this.all ? getOrgList : getOrganizationAll
      fn({
        dataType, //1 树结构 2 列表
        // fullName: val,
        page: 1
        // size: this.limit
      })
        .then(({ data }) => {
          this.treeData = data
        })
        .catch(() => {
          this.treeData = []
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
