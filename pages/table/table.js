/**list:表格数据, headers:表头名称数据,tableW:每一列宽  */
Component({
  // 组件的属性列表
  properties: {
    list: {
      type: Array,
      value: []
    },
    headers: {
      type: Array,
      value: []
    },
    tableW: {
      type: Array,
      value: [180, 120,180,180,180,180,140]
    }
  }
})