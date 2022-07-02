// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    OPEN_ID:"",//用户的ID
    newOrder:true,
    _id:"",//订单对应的ID
    orderNum:"",//订单号
    tableEdit:false,//编辑状态
    orderinfo:"hahaha",//订单内容信息描述
    userInfo: {},
    // 表格数据
    tabData: [
      {"name":"订单编号","location":" ","specialty":"订单属性 ","skill":""},
      {"name":"订单日期","location":"","specialty":"发货日期 ","skill":" "},
      {"name":"尺寸","location":"","specialty":"厚度","skill":""},
      {"name":"工艺","location":"","specialty":"材质","skill":" "},
      {"name":"正面底部","location":" ","specialty":"背面 ","skill":" "},
      {"name":"抛光","location":"","price":13888.0,"specialty":"电镀","skill":"图 "},
      {"name":"包装带","location":"","specialty":"配件 ","skill":" "},
      {"name":"数量","location":"","specialty":""},
      {"name":"单价","location":"","skill":"","specialty":"总价"}
  ],
    // 表格标题列
    columns: [
      { label: '', prop: 'name', onclick: true, fontSize: '', textDecoration: 'underline', color: '#000'},
      { label: '', prop: 'location'},
      { label: '', prop: 'specialty'},
      { label: '', prop: 'skill', fontSize: '',  textDecoration: '', color: ''}
  
    ],
    // 自定义样式配置项
    setting: {
    
      tableEdit:false,
      tableRadius: 0, // 表格圆角
      tableOutBorder: '', // 表格外边框
      tableInBorder: '', // 表格内边框
      tableInBorderLevel: 'true', // 表格内只显示水平边框
      theadHeight: 70, // 表头的高度
      theadAlign: '', // 表头的字体对齐方式
      theadColor: '', // 表头的字体颜色
      theadBgColor: '', // 表头的背景色
      theadFontSize: '', // 表头的字体大小
      theadFontWeight: '', // 表头的字体粗细
      tbodyHeight: '600',  // 表格 tbody 的高度, 用于垂直滚动
      tbodyAlign: '', // 表格行的的字体对齐方式
      tbodyColor: '', // 表格行的字体颜色
      tbodyBgColor: '', // 表格行的背景色
      tbodyFontSize: '', // 表格行的字体大小
      tbodyFontWeight: '', // 表格行的字体粗细
      trHeight: 70, // 表格行 tr 的高度
      stripe: '#fdf5e6' // #fafafa #f5f5f5 #fdf5e6 #fff8dc #f0f9eb
    },
      stateItems: [
        {id: 'state1', name: '下单',time:"",imgPath:"",value:"ordering",disabled:false},
        {id: 'state2', name: '矢量图',time:"",imgPath:"",value:"plan",disabled:false},
        {id: 'state3', name: '雕刻磨具',time:"",imgPath:"",value:"making1",disabled:false},
        {id: 'state4', name: '底胚',time:"",imgPath:"",value:"making2",disabled:false},
        {id: 'state5', name: '电镀',time:"",imgPath:"",value:"making3",disabled:false},
        {id: 'state6', name: '上色',time:"",imgPath:"",value:"making4",disabled:false},
        {id: 'state7', name: '包装',time:"",imgPath:"",value:"packing",disabled:false},
        {id: 'state8', name: '发货',time:"",imgPath:"",value:"send",disabled:false}
      ]
      
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad(option) {
    console.log("....init...111.")
    const tmpData = JSON.parse(option.jsdata);
   // console.log(tmpData);
    if(tmpData.length >0)
    {
      this.setData({
        "tabData":tmpData[0].tabData,
        "stateItems":tmpData[0].stateItems,
        "newOrder":false,
        "_id":tmpData[0]._id,
       // "tableEdit":tmpData[0].tableEdit,
        "orderinfo":tmpData[0].orderinfo
      })
      //console.log(tmpData); 
      
    }else
    {
      console.log("新订单。。");
      this.setData({
        "newOrder":true})
    }
    
    var that = this;
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
   // console.log(option.query)
    const eventChannel = this.getOpenerEventChannel()
    //eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
    //eventChannel.emit('someEvent', {data: 'test'});
    // 监听 acceptDataFromOpenerPage 事件，获取上一页面通过 eventChannel 传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log("从父容器调整传递来的数据....."); 
      const mydata = data.data;
      //console.log(data.data)
      const num = that.data.tabData;
      num[0].location =data.data.orderNum;
      const thisdate =new Date();
     
      if(that.data.newOrder)
      {
        num[1].location =thisdate.getFullYear()+"/"+(thisdate.getMonth()+1)+"/"+thisdate.getDate();
      }
     
      that.setData({
        "orderNum":data.data.orderNum,
        "tableEdit":data.data.tableEdit,
        "tabData":num
      })
      //console.log(that.data.tabData[0]);
      //console.log(that.data)
     
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
       // console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
   // console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
 
  },
  // 表格的自定义点击事件
  getCurrentValue(e) {
    const { name } = e.detail
    wx.showToast({
      title: name,
      icon: 'none',
      duration: 1500
    })
  },
  //处理子组件数据变化的函数
  dataChange(e){
    //console.log("子组件 订单内容更新");
    
    this.setData({
        tabData:e.detail.tabData,
        orderinfo:e.detail.orderinfo
    })
   // console.log(this.data.tabData);
  },
  //处理子组件 订单状态
  upOrderSate(e){
   // console.log("父:收到子组件订单状态数据更新");
   // console.log(e.detail);
     this.setData({
       stateItems:e.detail
     })
  },

  //获取订单数据
  getOrderInfo(e){
    const db = wx.cloud.database()
    const com1 = db.collection('com1')
    const _ = db.command
      db.collection('com1').where({
        orderNum: _.eq("A01-13291")
      })
      .get({
        success: function(res) {
          //console.log("获得数据中的订单数据....");
          //console.log(res.data)
        }
})
  },
  //更新数据
  upData(e){
    console.log("所有数据更新:"+this.data.newOrder);
    //console.log(this.data);

    //给数据库添加图片订单相关信息
    const db = wx.cloud.database();
    const com1 = db.collection('com1') ;
    const that = this;
    if(this.data.newOrder)
    {
      //新订单新数据入库
      com1.add({
        data:this.data,
        success: function(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          //console.log(res)
          //console.log(that);
          that.setData({
            "newOrder":false,
            "_id":res._id
        })
        console.log("新数据更新完成:"+that.data.newOrder+"__"+that.data._id);
          wx.showToast({
            title: '数据更新成功',
          })
          
        }
      })
    }else
    {
        var order_id = this.data._id;
        var tmpdata = this.data;
      console.log("已有订单 更新数据:"+this.data._id);

     // console.log(tmpdata)
      //console.log(this.data);
      const _ = db.command;
      db.collection('com1').doc(order_id).update({
        // data 传入需要局部更新的数据
        data: {
            tabData:this.data.tabData,
            stateItems:this.data.stateItems,
            orderNum:this.data.orderNum,
            orderinfo:this.data.orderinfo
        },
        success: function(res) {
            console.log("旧订单数据更新成功");
            wx.showToast({
              title: '数据更新成功',
            })
         // console.log(res)
        }
      })
    }
    
  }
})
