//index.js

Page({
  data: {
    isplay: false,
    neteaseData: [],
    qqData: [],
    xiamiData: [],
    kugouData: [],
    kuwoData: [],
    bilibiliData: []
  },

  onLoad() {
    this.getPlayMusic({ detail: {index: 0} });
    // this.onGetMusicList('neplaylist_2222557345');
    // this.onGetSearchMusic('netease', '小幸运', 1);
    // this.onGetLyric('netrack_537854958');
    // this.onGetMusicUrl('netrack_537854958');
  },


  showList(event) {
    wx.navigateTo({
      url: `../music_list/index?listId=${event.currentTarget.dataset.id}`
    })
  },

  getPlayMusic(event) {
    switch (event.detail.index) {
      case 0:
        this.onGetPlayMusic('netease', 'neteaseData');
        break;
      case 1:
        this.onGetPlayMusic('qq', 'qqData');
        break;
      case 2:
        this.onGetPlayMusic('xiami', 'xiamiData');
        break;
      case 3:
        this.onGetPlayMusic('kugou', 'kugouData');
        break;
      case 4:
        this.onGetPlayMusic('kuwo', 'kuwoData');
        break;
      case 5:
        this.onGetPlayMusic('bilibili', 'bilibiliData');
        break;
    }
  },

  // 平台音乐榜 //netease, qq, xiami, kugou, kuwo, bilibili
  onGetPlayMusic(platform, objData) {
    wx.cloud.callFunction({
      name: 'Listener',
      data: {
        opr: 'play_music',
        data: { platform }
      },
      success: res => {
        switch (objData) {
          case 'neteaseData':
            this.setData({
              neteaseData: res.result.result
            });
            break;
          case 'qqData':
            this.setData({
              qqData: res.result.result
            });
            break;
          case 'xiamiData':
            this.setData({
              xiamiData: res.result.result
            });
            break;
          case 'kugouData':
            this.setData({
              kugouData: res.result.result
            });
            break;
          case 'kuwoData':
            this.setData({
              kuwoData: res.result.result
            });
            break;
          case 'bilibiliData':
            this.setData({
              bilibiliData: res.result.result
            });
            break;
        }
      },
      fail: e => {
        console.log(e)
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
