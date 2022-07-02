// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
 
    
    wx.cloud.init(
      {
        env:"cloud1-3g7i34i0e66e5a88"
      }
    )

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  },
  onLoad() {
    console.log("重新加载微信页面1111")
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })

    }}

})
