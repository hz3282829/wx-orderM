// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    tableEdit:true,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') ,// 如需尝试获取用户信息可改为false
      headers: ["订单编号", "A01-1329", "订单属性", "续订四"],  //表格头部信息
      list:[["2022-05-17",100,100,100],[200,200,200,200]], //表格数据，每一项表示一行的数据
      tableW: [120, 180,180,180] , //每一列宽
    // 表格数据
    tabData: [
      { 
        id: 1,
        name: '订单编号儿11',
        location: 'A01-1329 ',
        specialty: '订单属性 ',
        skill: '续订 ',
        price: 13888,
        showUpRate: 0.001,
        shelveTime: 1545062400000
      },
      {
        id: 2,
        name: '订单日期',
        location: '2022/5/17',
        specialty: '发货日期 ',
        skill: '2022/6/17 ',
        price: 8888,
        showUpRate: 0.01,
        shelveTime: 1445270400000
      },
      { 
        id: 3,
        name: '尺寸',
        location: '如图',
        specialty: '厚度',
        skill: '1.8',
        price: 8888,
        showUpRate: 0.0003,
        shelveTime: 1445270400000
      },
      { 
        id: 4,
        name: '工艺',
        location: '烤漆',
        specialty: '材质',
        skill: '锌合金 ',
        price: 8888,
        showUpRate: 0.06,
        shelveTime: 1445270400000
      },
      { 
        id: 5,
        name: '正面底部',
        location: '放细沙 ',
        specialty: '背面 ',
        skill: '放沙 ',
        price: 8888,
        showUpRate: 0.005,
        shelveTime: 1445270400000
      },
      { 
        id: 6,
        name: '抛光',
        location: '正面,边缘',
        specialty: '电镀',
        skill: '如图 ',
        price: 13888,
        showUpRate: 0.00001,
        shelveTime: 1550764800000
      },
      { 
        id: 7,
        name: '包装带',
        location: '自封带',
        specialty: '配件 ',
        skill: '所缴帽*2 左右 ',
        price: 13888,
        showUpRate: 0.4,
        shelveTime: 1548777600000
      },
      { 
        id: 8,
        name: '数量',
        location: '294',
        specialty: '磨具费+打样',
        skill: ' ',
        price: 13888,
        showUpRate: 0.8,
        shelveTime: 1537977600000
      },
      {
        id: 9,
        name: '单价',
        location: '',
        specialty: '总价',
        skill: '',
        price: 13888,
        showUpRate: 0.07,
        shelveTime: 1542816000000
      }
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
    items: [
        { name: 'USA', value: '美国' },
        { name: 'CHN', value: '中国', checked: 'true' },
        { name: 'BRA', value: '巴西' },
        { name: 'JPN', value: '日本' },
        { name: 'ENG', value: '英国' },
        { name: 'TUR', value: '法国' },
      ],
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
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    console.log("....init...111.")
    console.log(this.data.tableEdit);
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
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
  }
})
