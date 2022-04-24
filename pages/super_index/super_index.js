// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    showQRcode: false,
    selectListUser: true,   //为true显示选择管理或患者选项，否则不显示
    adminQRCodeImg: false,    //为true显示管理程序码，否则显示患者程序码
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // canIUseGetUserProfile: false,
    // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  // bindViewTap() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad() {
  //   if (wx.getUserProfile) {
  //     this.setData({
  //       canIUseGetUserProfile: true
  //     })
  //   }
  // },
  // getUserProfile(e) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       console.log(res)
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   })
  // },
  // getUserInfo(e) {
  //   // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
  //   console.log(e)
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  //点击小程序码生成功能或者点击弹出框的叉号
  handleShowQRcode(){
    let showQRcode = this.data.showQRcode;
    showQRcode = !showQRcode;
    let selectListUser = true
    this.setData({showQRcode,selectListUser})
  },

  //保存二维码
  handleClickQRcode(){
    let fileName = new Date().valueOf()
    let filePath = wx.env.USER_DATA_PATH + "/" + fileName + '.jpg'
    wx.downloadFile({
      url:'http://124.71.81.190:8881/createCode/patient',
      filePath:filePath,
      success:res => {
        // const tempFilePath = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: filePath,
          success: (result)=>{
            wx.showToast({
              title: '保存成功',
            })
          },
        });
      }
    })
  },

  //点击管理端程序码
  handleSelectAdmin() {
    let selectListUser = false
    let adminQRCodeImg = true
    this.setData({ selectListUser,adminQRCodeImg })
  },

  //点击患者端程序码
  handleSelectPatient() {
    let selectListUser = false
    let adminQRCodeImg = false
    this.setData({ selectListUser,adminQRCodeImg })
  },

  //弹窗页面的返回按钮
  handleBack() {
    let selectListUser = true
    this.setData({ selectListUser })
  },

  onShow(){
      //页面左上角小房子消失
      wx.hideHomeButton()
  }
})
