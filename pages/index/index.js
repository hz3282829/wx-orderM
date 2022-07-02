// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    OPEN_ID:"",
    tableEdit:true,
    superM:"o8CHh5Ub-JIkRigzBs42gl2ZK3rc",
    isSuperM:false,
    editManger:"",
    manger_serveid:"",
    managID:[]//管理ID
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //获取管理员数据
  getMangerHandle:function(e){
    //查询数据库
    var that = e;
    var mdb = wx.cloud.database();
    mdb.collection('com1_M').get({
        success: function(res) {
          //console.log("管理数据库:",res);
          var MdATA = res.data[0].managID;
          var m_arry =[];
          for(var i =0;i<MdATA.length;i++){
            m_arry.push(MdATA[i]);
          }
         // console.log(m_arry);
          that.setData({
            "managID":m_arry,
            "manger_serveid":res.data[0]._id
          })
          //console.log(that.data.managID);
          that.setMangeHandle(e);
        }
    })
  },
  //设置管理权限
  setMangeHandle:function(e){
   // console.log("设置管理员权限");
    var that = e;
    var m_arr =that.data.managID;
    var tmp_M =[];
    
    for(var i =0;i<m_arr.length;i++){
      tmp_M.push(m_arr[i].openid);
     }

     var isSuperM = that.data.superM ==that.data.OPEN_ID?true:false;
        that.setData({
          "tableEdit":isSuperM?false:!Boolean(tmp_M.indexOf(that.data.OPEN_ID) >=0),
          "isSuperM":isSuperM
        })
    
  },
  onLoad() {
    console.log("重新加载微信页面")
    const that = this;
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    //
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getMyDb',
      // 传给云函数的参数
      data: {
        a: 2,
        b: 2,
      },
      success: function(res) {
      //  console.log("云函数成功...");
       // console.log(res) 
        const openid_tmp = res.result.openid;
        that.setData({
          "OPEN_ID":openid_tmp
          //"tableEdit":!Boolean(that.data.managID.indexOf(openid_tmp) >=0)
        })

          
        that.getMangerHandle(that);
      },
      fail: console.error
    })
  },
  
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        //console.log(res)
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
  //管理员变动处理
  mangerDataChange(e){
   
     this.setData({
        "editManger":e.detail.value
     })
     //console.log(this.data.editManger)
  },
  //申请管理权限
  applyHandle(e){
    const str = this.data.OPEN_ID;
    wx.setClipboardData({
      data: str,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '申请成功,请找管理员,把ID告知(ID已复制)',
              icon:"none"
            })
          }
        })
      }})
  },
  //添加管理员
  addMangerHandle(e){
    //console.log(this.data);
    console.log("添加管理员",this.data.editManger);
    var tmpM_arry =this.data.managID;
   if(this.data.editManger ==""){
    wx.showToast({
      title: '请添加正确的ID',
    })
    return;
   }
    const tmp_editM =this.data.editManger.split("||");
    console.log(tmp_editM)
    if(tmp_editM.length ==1){
      tmp_editM.push("");
    }
    tmpM_arry.push({openid:tmp_editM[0],username:tmp_editM[1]});
    this.setData({
      "managID":tmpM_arry
    })
    console.log(tmpM_arry);
    this.upMangerDat_ser(tmpM_arry)
  },
   //删除管理员
  deleMangerHandle(e){
    //console.log("删除管理员",this.data.editManger);
    var M_arry =this.data.managID;
    var tmpM_arry=[];
    var tmpUserName_arry =[];
    var index =-1;
    var index1 =-1;
    var index2 = -1;
    for(var i=0;i<M_arry.length;i++){
      tmpM_arry.push(M_arry[i].openid);
      tmpUserName_arry.push(M_arry[i].username)
    }
    index1 = tmpM_arry.indexOf(this.data.editManger);
    index2 = tmpUserName_arry.indexOf(this.data.editManger);
    index = index1>=0?index1:index2;

   //console.log( this.data.isSuperM+"/ "+this.data.editManger);
    if(index >=0)
    {
     // console.log(this.data.managID);
      var tmp_arry_ser =this.data.managID;
      tmp_arry_ser.splice(index,1);
      this.setData({
        "managID":tmp_arry_ser
      })
     // console.log(tmp_arry_ser)
      this.upMangerDat_ser(tmp_arry_ser)
    }else if(this.data.isSuperM && this.data.editManger=="close"){
      this.upMangerDat_ser([]);
      wx.showToast({
        title: '超级管理操作',
      })
    }else
    {
     
        wx.showToast({
          title: '无效的ID，请核对后再操作:'+this.data.isSuperM+"/ "+this.data.editManger,
        })
        
    }
    
  },
  upMangerDat_ser:function(mydata){
    var mdb = wx.cloud.database();
    //manger_serveid
    mdb.collection('com1_M').doc(this.data.manger_serveid).update({
      data: {
        // 表示将 done 字段置为 true
        managID: mydata
      },
        success: function(res) {
          console.log("管理员变更成功",res);
          wx.showToast({
            title: '管理员变更成功',
          })
        }
    })
  },
  userImgHandle(e){
    wx.showToast({
      title: '图片获取成功',
    })
  },
  getImg1(e) {
    wx.chooseImage({
      count: 1,
      success(res) {
        //this.userImgHandle(res)
        const tempFilePaths = res.tempFiles[0].path;
        wx.cloud.uploadFile({
          cloudPath: 'com1/example.png', // 上传至云端的路径
          filePath: tempFilePaths, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
           // console.log("图片保地址:"+res.fileID)
                //给数据库添加图片订单相关信息
                  const db = wx.cloud.database()
                  const com1 = db.collection('com1') 
                  com1.add({
                    data: {
                      // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                      description: "订单图片信息",
                      due: new Date("2018-09-01"),
                      order:"",
                      imgPath:res.fileID,
                      orderInfo:{
                        order:"",
                        orderPor:"",
                        orderDate:"",
                        sendDate:"",
                        size:""
                      },
                      orderState:"making"
                    },
                    success: function(res) {
                      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                      console.log(res)
                    }
                  })

          },
          fail: console.error
        })
       
        // wx.uploadFile({
        //   filePath: tempFilePaths,
        //   name: 'imgtest',
        //   url: 'url',//服务器路径
        //   success (res){
        //     const data = res.data
        //     //do something
        //     console.log("图片保存成功")
        //   }
    
        //})
        wx.showToast({
          title: "{{res.tempFiles.tempFilePath}}",
        })
      }
    })

  },
  
  getmyOrderInfo(e) {
      const orderNum =this.data.orderValue;
      const tableEdit = this.data.tableEdit;
      const str = this.data.OPEN_ID;
     // console.log("orderNum:"+orderNum);
      //this.getUserProfile(e);
      if(this.data.orderValue =="" ||this.data.orderValue ==undefined){
        console.log("请输入订单号");
        wx.showToast({
          title: '请输入订单号',
          icon:"error"
        })
      }else if(orderNum =="申请"){
        wx.setClipboardData({
          data: this.data.OPEN_ID,
          success: function (res) {
            wx.getClipboardData({
              success: function (res) {
                wx.showToast({
                  title: '申请成功,请找管理员,把ID告知(ID已复制)',
                  icon:"none"
                })
              }
            })
          }})
        }else
        {
          //查询数据库
          const db = wx.cloud.database()
          const com1 = db.collection('com1')
          const _ = db.command
            db.collection('com1').where({
              orderNum: _.eq(orderNum)
            })
            .get({
              success: function(res) {
                
                const mydata = res.data;
               // console.log(typeof mydata)
               // console.log("开始获得数据中的订单数据....");
               // console.log(mydata)
            
                //获取到数据后开始跳转
                wx.navigateTo({
                  url:'../myTable/myTable?jsdata='+JSON.stringify(mydata),
                  events: {
                    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                    acceptDataFromOpenedPage: function(data) {
                     // console.log(data)
                    },
                    someEvent: function(data) {
                     // console.log(data)
                    }
                   
                  },
                  success: function(res) {
                    // 通过 eventChannel 向被打开页面传送数据
                    res.eventChannel.emit('acceptDataFromOpenerPage', { data:{
                      orderNum:orderNum,tableEdit:tableEdit} })
                  }
              })
               
              }
      })      
      }
      
},
handleorderValue(e){
  
this.setData({
      orderValue: e.detail.value
    })
    //console.log("订单数据改变了:"+e.detail.value);
    //console.log(this.data.orderValue)
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
