import { request } from '../request/request'
Page({
    data: {
        medicalCard:'',
        name:'',
        sex:'',
        age:'',
        tel:'',
        project:'',
        turnTime:'',
        index:'',
        date:'',
        isActive:false,   //当为false时不显示弹框
        textareaInput:''  //失败原因
    },

    QueryParams:{
        id:'',
        relId:''
    },

    //显示用户信息
    handleUserInfo(){
        let id = this.QueryParams.id;
        request({url:'/technician/getDetailScan',data:{id}})
        .then(
            res => {
                console.log(res);
                let medicalCard = res.data.data.medicalCard;
                let name = res.data.data.name;
                let sex = res.data.data.sex;
                let age = res.data.data.age;
                let tel = res.data.data.tel;
                let project = res.data.data.project;
                let turnTime = res.data.data.turnTime;
                let date = res.data.data.date;
                this.setData({ medicalCard, name, sex, age, tel, project, turnTime, date })
            }
        )
    },

    //输入失败原因
    handleInput(e){
      console.log(e.detail.value);
      let textareaInput = e.detail.value;
      this.setData({textareaInput})
    },


    //用户点击×号
    handleError(){
      let isActive = false;
      let textareaInput = '';
      this.setData({ isActive, textareaInput })
    },

    //用户点击取消按钮
    handleFailText(){
      let isActive = false;
      let textareaInput = '';
      this.setData({ isActive, textareaInput })
    },

    //检查成功
    handleClickSuccess() {
        let medicalCard = this.data.medicalCard;
        let id = this.QueryParams.id;
        let project = this.data.project;
        let errorMsg = '成功';
        let date = this.data.date;
        let operatorId = wx.getStorageSync('relId');
        let relId = this.QueryParams.relId;
        wx.showModal({
            title: '提示',
            content: '是否检查成功',
            success (res) {
              if (res.confirm) {
                request({url:'/technician/updateScanState',data:{relId,id,date,errorMsg,operatorId,medicalCard,project,scanState:1},method:'get'})
                .then(
                    res => {
                        console.log(res);
                        wx.showToast({
                          title:'检查成功'
                        })
                        setTimeout(()=>{
                            wx.reLaunch({
                                url: '../technician/technician',
                              })
                        },1000)
                    }
                )
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
    },

    //点击检查失败按钮
    handleFail(){
      let isActive = true;
      this.setData({ isActive });
    },

    //检查失败
    handleSuccessCancel(){
        let medicalCard = this.data.medicalCard;
        let project = this.data.project;
        let id = this.QueryParams.id;
        let relId = this.QueryParams.relId;
        let errorMsg = this.data.textareaInput;
        let date = this.data.date;
        let operatorId = wx.getStorageSync('relId');
        if(!errorMsg){
          wx.showToast({
            title: '请输入失败原因',
            icon:'none'
          })
        }else{
          request({url:'/technician/updateScanState',data:{relId,id,date,errorMsg,operatorId,medicalCard,project,scanState:2},method:'get'})
          .then(
              res => {
                  console.log(res);
                  wx.showToast({
                      icon:'error',
                    title:'检查失败'
                  })
                  setTimeout(()=>{
                      wx.reLaunch({
                          url: '../technician/technician',
                        })
                  },1000)
              }
          )
        }
    },

    onLoad(option){

        console.log(option);

        this.QueryParams.id = option.id;

        this.QueryParams.relId = option.relId;

        this.handleUserInfo();
    }
})