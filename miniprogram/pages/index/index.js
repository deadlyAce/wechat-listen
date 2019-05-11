//index.js
const app = getApp()
const myaudio = wx.createInnerAudioContext();

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    isplay: false,
  },

  onLoad: function() {
    // this.onGetPlayMusic('netease');
    // this.onGetMusicList('neplaylist_2222557345');
    // this.onGetSearchMusic('netease', '小幸运', 1);
    // this.onGetLyric('netrack_537854958');
    // this.onGetMusicUrl('netrack_537854958');
  },

  onShow: function () {
    myaudio.src = "http://m10.music.126.net/20190512000923/c897116dbb4cde5b1403dd8a42c9854c/ymusic/722d/3423/8e4b/cde2ef1e41c58dad5683f50d3cf4da48.mp3";
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

  // 平台音乐榜 //netease, qq, xiami, kugou, kuwo, bilibili
  onGetPlayMusic(platform) {
    wx.cloud.callFunction({
      name: 'Listener',
      data: {
        opr: 'play_music',
        data: { platform }
      },
      success: res => {
        console.log(res);
      },
      fail: e => {
        console.error(e)
      }
    })
  },

  onGetMusicList(listId) {
    wx.cloud.callFunction({
      name: 'Listener',
      data: {
        opr: 'list_music',
        data: { listId }
      },
      success: res => {
        console.log(res);
      },
      fail: e => {
        console.error(e)
      }
    })
  },

  onGetSearchMusic(platform, keyword, page) {
    wx.cloud.callFunction({
      name: 'Listener',
      data: {
        opr: 'search',
        data: { platform, keyword, page }
      },
      success: res => {
        console.log(res);
      },
      fail: e => {
        console.error(e)
      }
    })
  },

  onGetLyric(musicId) {
    wx.cloud.callFunction({
      name: 'Listener',
      data: {
        opr: 'lyric',
        data: { musicId }
      },
      success: res => {
        console.log(res);
      },
      fail: e => {
        console.error(e)
      }
    })
  },

  onGetMusicUrl(musicId){
    wx.cloud.callFunction({
      name: 'Listener',
      data: {
        opr: 'music_url',
        data: { musicId }
      },
      success: res => {
        console.log(res);
      },
      fail: e => {
        console.error(e)
      }
    })
  }
})
