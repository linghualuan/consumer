App({
  onLaunch() {

    wx.login({
      success: res => {

        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("code:"+res.code);
        wx.request({
          url: 'http://124.71.81.190:8881/login/up',
          data: {code:res.code},
          method: 'get',
          success: (res)=>{
            console.log('token:'+res.data.data);
            this.globalData.token = res.data.data;
            wx.setStorage({key:'token', data:res.data.data});
          },
        });
      }
    })

    let number = wx.getStorageSync('medicalCard');
    if(number){
      this.localCheck(number);
    }
  },

  // demo(){
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //       console.log("code:"+res.code);
  //       wx.request({
  //         url: 'http://124.71.81.190:8881/login/up',
  //         data: {code:res.code},
  //         method: 'get',
  //         success: (res)=>{
  //           // resolve(res.data.data)
  //           console.log('token:'+res.data.data);
  //           this.globalData.token = res.data.data;
  //           wx.setStorage({key:'token', data:res.data.data});
  //         },
  //       });
  //     }
  //   })
  // },

  //本地身份检查方法
  localCheck(number) {
      if(number === 's10001'){ //如果本地信息为超级管理员则跳转到超级管理员
        setTimeout(() => {
            wx.reLaunch({
                url:'/pages/super_index/super_index'
            })
        },0)
    }else if(number === 'n10002'){ //如果本地信息为预约护士则跳转到预约护士
        setTimeout(() => {
            wx.reLaunch({
              url: '/pages/nurse_order/nurse_order',
            })
        },0)
    }else if(number === 'n10003'){ //如果本地信息为注射护士则跳转到注射护士
        setTimeout(() => {
            wx.reLaunch({
              url: '/pages/nurse_injection/nurse_injection',
            })
        },0)
    }else if(number === 't10004'){ //如果本地信息为采集技师则跳转到采集技师
        setTimeout(() => {
            wx.reLaunch({
              url: '/pages/technician/technician',
            })
        },0)
    }else if(number && number !== 's10001' && number !== 'n10002'
    && number !== 'n10003' && number !== 't10004') {
      //如果本地信息非空且非管理员身份则跳转患者部分
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/index/index',
        })
      },0)
    }
  },


  // 服务端身份判断方法                           
  idCheck(){
      wx.request({
        url: 'http://124.71.81.190:8881/serve/relation/checkInfo',
        header: { 'content-type':'application/json', 'Authorization':'Bearer ' + wx.getStorageSync('token') },
        success: (res)=>{
          if(res.data.data){
              wx.setStorageSync('medicalCard',res.data.data.medicalCard);
              wx.setStorageSync('name',res.data.data.name);
              wx.setStorageSync('sex',res.data.data.sex);
              wx.setStorageSync('tel',res.data.data.tel);
              wx.setStorageSync('black',res.data.data.black);
              wx.setStorageSync('defaults',res.data.data.defaults);
              wx.setStorageSync('inspectId',res.data.data.inspectId);
              wx.setStorageSync('relId',res.data.data.relId);
              wx.setStorageSync('relationship',res.data.data.relationship);
              wx.setStorageSync('updateTime',res.data.data.updateTime);
              //根据返回的身份跳转
              this.localCheck(res.data.data.medicalCard);
          }
        }
    });
  },


  globalData: {
    userInfo: null,
    token:null
  }
})
