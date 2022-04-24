import { request } from '../request/request'
Page({
    data: {
        startTime:'',
        endTime:'',
        show1: false,
        show2: false,
        start_date: '',
        end_date: '',
        minDate:new Date(2022,3,10).getTime(),
        maxDate:new Date().getTime()
    },

    start_time() {
        this.setData({
          show1: true
        });
    },
    end_time() {
        this.setData({
          show2: true
        });
      },
    onClose1() {
        this.setData({
          show1: false
        });
    },
    onClose2() {
        this.setData({
          show2: false
        });
    },

    formatDate(date) {
        date = new Date(date);
        return `${date.getFullYear()}-${date.getMonth()+1<10?'0':''}${date.getMonth() + 1}-${date.getDate()<10?'0':''}${date.getDate()}`;
    },

    onConfirm1(event) {
        this.setData({
          show1: false,
          start_date: this.formatDate(event.detail),
        });
    },

    onConfirm2(event) {
        this.setData({
          show2: false,
          end_date: this.formatDate(event.detail),
        });
    },

    //点击复制链接到粘贴板
    handleData(){
        let start_date = this.data.start_date;
        let end_date = this.data.end_date;
        console.log(start_date);
        console.log(end_date);
        if(start_date || end_date){
            request({url:'/excel/create',data:{s:`${start_date}`,e:`${end_date}`}})
            .then(
                res => {
                    console.log(res.data);
                    wx.setClipboardData({
                        data:res.data,
                        success:res => {
                            wx.hideToast()
                            wx.showModal({
                            title:'提示',
                            content:'下载链接已复制到粘贴板',
                            showCancel:false,
                                success: res => {
                                    if(res.confirm){
                                        console.log('用户点击确定');
                                    }
                                }
                            })
                        }
                    })
                }
            )
        }else{
            wx.showToast({
                title:'请选择日期',
                icon:'none'
            })
        }
    }
})