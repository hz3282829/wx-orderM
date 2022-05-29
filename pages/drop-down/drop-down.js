// pages/component/custom-drop-down/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    option2: {
      type: Array,
      value: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ]
    },
    show: {
      type:Boolean,
      value:false
    }
  },
 
  /**
   * 组件的初始数据
   */
  data: {
    provinceValue:'下单状态',
    option2:[
      { text: '下单状态', value: 'a' },
      { text: '矢量图状态', value: 'b' },
      { text: '雕刻模具', value: 'c' },
      { text: '底胚状态', value: 'd' },
      { text: '电镀状态', value: 'e' },
      { text: '上色状态', value: 'f' },
      { text: '包装状态', value: 'h' },
      { text: '发货状态', value: 'i' }
    ]
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    clickShow: function() {
      console.log(this.data.option2.length<1?"no data":" good")
      console.log(this.data);
      this.setData({
        show:!this.data.show
      })
    },
    selectIndex: function(option) {
      console.log('selectIndex',option);
      let index = option.currentTarget.dataset.index;
      console.log('selectIndex====',this.data.option2[index].text);
      for(let i=0;i<this.data.option2.length;i++) {
        let item = this.data.option2[i];
        if(i == index) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      }
      this.setData({
        provinceValue:this.data.option2[index].text,
        option2:this.data.option2,
        show:false
      })
    }
  }
})