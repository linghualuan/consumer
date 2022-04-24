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
            wx.setStorageSync('token', res.data.data);
          },
        });
      }
    })
  }
})
