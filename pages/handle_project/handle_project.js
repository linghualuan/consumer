import { request } from '../request/request'
Page({
  data: {
    startDate: '', //开始日期
    endDate: '', //结束日期
    orderNumber:0,  //预约数量
    showStartDate: false, //开始日历的关闭或显示
    showEndDate: false,   //结束日历的关闭或显示
    timeList:[{}],   //把预约时段、预约数量赋值给timeList数组
    indexNumber:0   //预约数量的下标
  },

  QueryParams:{
    orderProject:''
  },

  //显示页面最顶层的项目名称
  handleProject(){
    let orderProject = this.QueryParams.orderProject;
    this.setData({ orderProject })
  },

  onLoad(options){

    this.QueryParams.orderProject = options.orderProject;

    //定义初始timeList数组
    let timeList = new Array(1);
    let item = {startTime:'',endTime:'',number:0}
    timeList[0] = item;
    this.setData({timeList})
    console.log(this.data.timeList);

    this.handleProject()
  },

  //显示开始日期的日历表
  handleStartDate(){
    this.setData({ showStartDate: true });
  },

  //显示结束日期的日历表
  handleEndDate(){
    this.setData({ showEndDate: true });
  },

  //点击确认关掉开始日历表
  onCloseStartDate(){
    this.setData({ showStartDate: false });
  },

  //点击确认关掉结束日历表
  onCloseEndDate(){
    this.setData({ showEndDate: false });
  },

  formatDate(date){
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth()+1<10?'0':''}${date.getMonth() + 1}-${date.getDate()<10?'0':''}${date.getDate()}`;
  },


  //------------------------------------------------------------------------------

  //显示具体开始日期
  onConfirmStart(event){
    this.setData({
      showStartDate: false,
      startDate: this.formatDate(event.detail),
    });
  },

  //显示具体结束日期
  onConfirmEnd(event){
    this.setData({
      showEndDate: false,
      endDate: this.formatDate(event.detail),
    });
  },

  //显示开始的预约时段
  bindTimeChangeStart(e){
    let index = e.currentTarget.dataset.index;
    let timeList = this.data.timeList;

    //定义timelist中的每一项
    timeList[index].startTime = e.detail.value;
    this.setData({timeList})

    console.log(this.data.timeList);
    this.setData({ startTime:e.detail.value })
  },

  //显示结束的预约时段
  bindTimeChangeEnd(e){
    let index = e.currentTarget.dataset.index;
    let timeList = this.data.timeList;
    timeList[index].endTime = e.detail.value;
    this.setData({timeList})
    console.log(this.data.timeList);
    this.setData({ endTime:e.detail.value })
  },

  //预约数量
  onChange(e) {
    let index = e.currentTarget.dataset.index;
    let timeList = this.data.timeList;
    timeList[index].number = e.detail;
    this.setData({timeList})
    console.log(this.data.timeList);
  },

  //------------------------------------------------------------------------------

  //添加时间段
  add_time(){
    let timeList = this.data.timeList;
    let item = {startTime:'',endTime:'',number:0};
    let a = timeList[timeList.length - 1];
    if(!a.startTime || !a.endTime || a.number === 0){
      wx.showToast({
        title: '请填写完整信息',
        icon:'none'
      })
    }else{
      timeList.push(item)
      this.setData({ timeList })
      console.log(this.data.timeList);
    }
  },

  //判断开始日期和结束日期大小
  handleJudgeDate(date1,date2){
    let year1 = date1.slice(0,4);
    let month1 = date1.slice(5,7);
    let day1 = date1.slice(8,10);
    let year2 = date2.slice(0,4);
    let month2 = date2.slice(5,7);
    let day2 = date2.slice(8,10);

    //开始年月日和结束年月日相加转化为整数比较大小，当开始日期相加得到的整数小于结束日期得到的整数返回true，否则返回false
    if(parseInt(year1+month1+day1) <= parseInt(year2+month2+day2)){
      return true
    }else{
      return false
    }
  },

  //点击发送预约
  creatProject(){
    let startDate = this.data.startDate;
    let overDate = this.data.endDate;
    let timeList = this.data.timeList;
    let orderProject = this.QueryParams.orderProject;
    let isDate = this.handleJudgeDate(startDate,overDate);

    //数组中若有开始时间段小于结束时间段则返回false，否则返回true
    let isTime = timeList.every(item => {
      let startTime1 = item.startTime.slice(0,2);
      let startTime2 = item.startTime.slice(3,5);
      let endTime1 = item.endTime.slice(0,2);
      let endTime2 = item.endTime.slice(3,5);
      return parseInt(startTime1 + startTime2) < parseInt(endTime1 + endTime2)
    })


    if(!startDate || !overDate){
      wx.showToast({
        title: '开始日期或结束日期不能为空!',
        icon:'none'
      })
    }else{
      if(!isDate){
        wx.showToast({
          title: '开始日期必须小于结束日期',
          icon:'none'
        })
      }else if(!isTime){
        wx.showToast({
          title: '预约开始时段必须小于预约结束时段',
          icon:'none'
        })
      }else{
        let s = new Array(timeList.length);
        for(let i=0 ; i<timeList.length ; i++){
          let item = {orderTime:'',orderNumber:0}
          s[i] = item;
          let orderTime = timeList[i].startTime + '-' + timeList[i].endTime;
          s[i].orderTime = orderTime;
          s[i].orderNumber = timeList[i].number
        }
        request({url:'/superRoot/setting/settingDate',data:{startDate,overDate,times:s,projectName:orderProject},method:'post'})
        .then(
          res => {
            console.log(res);
            if(res.data.code === 1){
              wx.showToast({
                title: '创建成功',
                icon:'none'
              })
              setTimeout(() => {
                wx.navigateBack({
                  url: '../set_order/set_order'
                })
              },1000)
            }else{
              let msg = res.data.msg;
              wx.showToast({
                title: msg,
                icon:'none'
              })
            }
          }
        )
      }
    }
  }
})