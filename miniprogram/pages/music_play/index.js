const myaudio = wx.createInnerAudioContext();

Page({
  data: {
    title: "",
    playUrl: "",
    isplay: false,
    isShow: false
  },

  onLoad(option) {
    this.setData({ title: option.title})
    this.onGetMusicUrl(option.listId)
  },

  onGetMusicUrl(musicId) {
    console.log(musicId);
    wx.cloud.callFunction({
      name: 'Listener',
      data: {
        opr: 'music_url',
        data: { musicId }
      },
      success: res => {
        console.log(res);
        myaudio.src = res.result.url;
        console.log(myaudio);
        this.setData({ isShow: true });
      },
      fail: e => {
        console.error(e)
      }
    })
  },

  //播放
  play: function () {
    myaudio.play();
    this.setData({ isplay: true });
  },

  // 停止
  stop: function () {
    myaudio.pause();
    this.setData({ isplay: false });
  },

})