
Page({
    data: {
        medicalCard:'', //患者就诊卡号
        name:'',    //患者姓名
        sex:'', //患者性别
        tel:'',  //患者电话
        sexSelect:['男','女']
    },

    handleSubmit(){
        let medicalCard = this.data.medicalCard;
        let name = this.data.name;
        let sex = this.data.sex;
        let tel = this.data.tel;
        let Name = /^[\u2E80-\u9FFF]+$/;
        let Sex = /^[男|女]{1}$/;
        let Tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if(name.trim().length > 0 && medicalCard.trim().length > 0 && sex.trim().length > 0 && tel.trim().length > 0){
            if(!Name.test(name)){
                wx.showToast({
                  title: '名字不合法',
                  icon:'none'
                })
            }else if(!Sex.test(sex)){
                wx.showToast({
                    title:'性别不合法',
                    icon:'none'
                })
            }else if(!Tel.test(tel)){
                wx.showToast({
                    title:'手机号不合法',
                    icon:'none'
                })
            }else{
                wx.request({
                    url: 'http://124.71.81.190:8881/serve/relation/submitInfo',
                    data: { medicalCard, name, sex, tel},
                    header: {
                        'content-type':'application/json',
                        'Authorization':'Bearer ' + wx.getStorageSync('token')
                    },
                    method: 'post',
                    success: (res)=>{
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
                        wx.request({
                            url:'http://124.71.81.190:8881/serve/relation/defaultInfo',
                            data:{medicalCard},
                            header: {
                                'content-type':'application/json',
                                'Authorization':'Bearer ' + wx.getStorageSync('token')
                            },
                            method:'get',
                            success: res => {
                                console.log(res);
                            }
                        })
                        wx.reLaunch({
                            url:'/pages/index/index'
                        })
                    },
                });
            }
        }else{
            wx.showToast({
                title:'必填项不能为空!',
                icon:'none'
            })
        }
    },

    handlePendSex(e){
        let sex;
        let index = e.detail.value;
        if(index === '0'){
            sex = '男'
        }else{
            sex = '女'
        }
        this.setData({sex})
        console.log(this.data.sex);
    },

    //获取就诊卡号
    handleMedicalCard(e){
        let medicalCard = e.detail.value;
        this.setData({
            medicalCard
        })
        wx.setStorageSync('medicalCard', this.data.medicalCard);
    },

    //获取患者姓名
    handleName(e){
        let name = e.detail.value;
        this.setData({
            name
        })
        wx.setStorageSync('name', this.data.name);
    },

    //获取患者性别
    // handleSex(e){
    //     let sex = e.detail.value;
    //     this.setData({
    //         sex
    //     })
    //     wx.setStorageSync('sex', this.data.sex);
    // },

    //获取患者电话
    handleTel(e){
        let tel = e.detail.value;
        this.setData({
            tel
        })
        wx.setStorageSync('tel', this.data.tel);
    },

  // onShow(){
    //     //页面左上角小房子消失
    //     wx.hideHomeButton()
    // }
})





