// pages/orderState/orderState.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    stateItems: { // 父组件传入的表格数据
      type: Array,
      value: []
    },
    tableEdit:{
      type:Boolean,
      value:{}
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    stateItems:[],
    tableEdit:true//编辑权限
  },

  /**
   * 组件的方法列表
   */
  observers: {
    'stateItems'(val) {
       // console.log("订单组件的状态方法列表.1111..........");
      // console.log('stateItems', val)
    },
    "tableEdit"(val){
     //console.log("订单组件的状态方法列表..222.........");
      // console.log('tableEdit', val)
    }
    
  },
  methods: {
    radioChange(e) {
        //console.log('radio发生change事件，携带value值为：', e.detail)
    
        const items = this.data.stateItems
        for (let i = 0, len = items.length; i < len; ++i) {
          items[i].checked = items[i].id === e.detail.value
        }
    
        this.setData({
          items
        })
        //console.log(items);
        this.triggerEvent("upOrderSate",this.data.stateItems)
      },
      
      takeImg(e){
        var btnId = e.currentTarget.id;
        console.log("上传订单状态图片操作:"+btnId);
        var tmp = this.data.stateItems;
        var that =this;

        wx.chooseImage({
          count: 1,
          success(res) {
            //this.userImgHandle(res)
            const tempFilePaths = res.tempFiles[0].path;
            const imgName = "com1/"+Math.random()*1000+".png";
            wx.cloud.uploadFile({
              cloudPath: imgName, // 上传至云端的路径
              filePath: tempFilePaths, // 小程序临时文件路径
              success: res => {
                //图片保存成功后 改变图片数据
                //console.log("图片保存成功:"+res.fileID)
                tmp[[btnId.slice(5)-1]].imgPath =res.fileID;
                //tmp.name=res.fileID;
                that.setData({
                  stateItems:tmp
                })
                //console.log(that.data.stateItems)
                that.triggerEvent("upOrderSate",that.data.stateItems)
                // 返回文件 ID
               // console.log("图片保地址:"+res.fileID)
                    
    
              },
              fail: console.error
            })
          
            wx.showToast({
              title: "{{res.tempFiles.tempFilePath}}",
            })
          }
        })

        
      },
      viewImg(e){
        var btnId = e.currentTarget.id;
       // console.log("预览订单状态图片操作:"+btnId);
        //console.log(this.data.stateItems);
        var tmp = this.data.stateItems;
        var imgUrl =tmp[btnId.slice(5) -1].imgPath;
        if(imgUrl !="")
        {
         // console.log(this.data)
          wx.previewImage({
            urls: [imgUrl]
          })
         
        }else{
          wx.showToast({
            title: '暂时没有图片',
          })
        }
       
      }
  }
})
