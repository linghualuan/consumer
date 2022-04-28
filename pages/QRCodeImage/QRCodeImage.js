Page({

    data: {
        timer:null,
        url:''
    },

    handleQRCodeImage(){
        wx.request({
          url: 'http://124.71.81.190:8881/queue/queueCode',
          success:res => {
            let url = res.data;
            this.setData({url})
          }
        })
    },

    onShow(){
        this.handleQRCodeImage()
        this.setData({
            timer:setInterval(() => {
                this.handleQRCodeImage()
            },1000 * 60)
        })

    },

    onHide(){
        clearInterval(this.data.timer)
        this.setData({
            timer:null
        })
    },

    onUnload(){
        clearInterval(this.data.timer)
        this.setData({
            timer:null
        })
    }
})