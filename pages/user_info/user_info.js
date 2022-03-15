import { request } from '../request/request'
Page({
  data: {
    tabs: [
      {
        id: 1,
        value: "预约护士",
        isActive: true
      },
      {
        id: 2,
        value: "注射护士",
        isActive: false
      },
      {
        id: 3,
        value: "技术员",
        isActive: false
      },
      {
        id: 4,
        value: "患者用户",
        isActive: false
      }
    ],

    orderNurse:[],

    injectNurse:[],

    technician:[],

    userInfo:[]
  },



  handleItemTabChange(e) {
    let index = e.detail;
    let tabs = this.data.tabs;
    tabs.forEach((v, i) => { i === index ? v.isActive = true : v.isActive = false })
    this.setData({tabs})
    if(index === 0){
      this.handleOrderNurse()
    }else if(index === 1){
      this.handleInjectNurse()
    }else if(index === 2){
      this.handleTechnician()
    }else{
      this.handleUserInfo()
    }
    
  },

  //获取预约护士信息
  handleOrderNurse(){
    request({url:'/superRoot/project/getDifferentDoctor',data:{number:1}})
    .then(
      res => {
        console.log('预约护士');
        console.log(res);
        let records = res.data.data;
        let orderNurse = [];
        for(let i =0;i<records.length;i++){
          orderNurse[i] = records[i]
        }
        this.setData({ orderNurse })
      }
    )
  },

  //获取注射护士信息
  handleInjectNurse(){
    request({url:'/superRoot/project/getDifferentDoctor',data:{number:2}})
    .then(
      res => {
        console.log('注射护士');
        console.log(res);
        let records = res.data.data;
        let injectNurse = [];
        for(let i =0;i<records.length;i++){
          injectNurse[i] = records[i]
        }
        this.setData({ injectNurse })
      }
    )
  },

  //获取技术员信息
  handleTechnician(){
    request({url:'/superRoot/project/getDifferentDoctor',data:{number:3}})
    .then(
      res => {
        console.log('技术员');
        console.log(res);
        let records = res.data.data;
        let technician = [];
        for(let i =0;i<records.length;i++){
          technician[i] = records[i]
        }
        this.setData({ technician })
      }
    )
  },

  //获取患者信息
  handleUserInfo(){
    request({url:'/superRoot/project/getDifferentDoctor',data:{number:4}})
    .then(
      res => {
        console.log('患者');
        console.log(res);
        let records = res.data.data;
        let userInfo = [];
        for(let i =0;i<records.length;i++){
            userInfo[i] = records[i]
        }
        this.setData({ userInfo })
      }
    )
  },

  onShow(){
    this.handleOrderNurse();
    this.handleInjectNurse();
    this.handleTechnician();
  }
})