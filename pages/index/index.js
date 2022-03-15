import { request } from "../request/request"

Page({
  data: {
    result:'',
    agree:true
  },

  //扫描二维码
  onLoad(){

  },

  handleIsAuthorization(){
    let userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      wx.getUserProfile({
        desc: '小程序',
        success:res => {
          console.log(res);
          wx.setStorageSync('userInfo', res.userInfo);
          wx.navigateTo({
            url: '../order_project/order_project',
          })
        },
        fail:res => {
          wx.showToast({
            title: '您取消了授权,授权成功后才能继续使用',
            icon:'none'
          })
        }
      })
    }else{
      wx.navigateTo({
        url: '../order_project/order_project',
      })
    }
  },

  getScanCode() {
    wx.scanCode({
      success: (res) => {
        console.log(res)
        let relId = wx.getStorageSync('relId')
        let result = res.result.split('&')
        let authQrCode =  result[0]
        request({url:'/queue/signIn',data:{relId,authQrCode}})
        .then(
          res => {
            console.log(res);
            let msg = res.data.msg;
            wx.showToast({
              title: msg,
              icon:'none'
            })
          }
        )
      },
      fail:res => {
        console.log(res);
      }
    })
  },

  //点击同意
  handleAgree(){
    let agree = this.data.agree;
    agree = !agree;
    this.setData({agree})
    console.log(this.data.agree);
    let isAgree = true
    wx.setStorageSync('isAgree',isAgree)
    wx.getUserProfile({
      desc:'小程序',
      success:res => {
        console.log(res);
        wx.setStorageSync('userInfo',res.userInfo);
        wx.showToast({
          title: '授权成功',
          icon:'none'
        })
      },
      fail:err => {
        wx.showToast({
          title:'您拒绝了授权,后续功能可能无法使用!',
          icon:'none'
        })
      }
    })
  },

  onLoad(){
    //若用户进入首页点击同意后则不再显示用户说明，否则弹出用户说明
    let isAgree = wx.getStorageSync('isAgree')
    if(isAgree){
      let agree = false;
      this.setData({agree})
    }else{
      let agree = true;
      this.setData({agree})
    }

  },

  onShow(){
    //页面左上角小房子消失
    wx.hideHomeButton()
  },
})
