Page({
  data: {
    listInfo: {},
    itemList: []
  },

  onLoad(option) {
    this.onGetMusicList(option.listId)
  },

  listen(event) {
    wx.navigateTo({
      url: `../music_play/index?listId=${event.currentTarget.dataset.id}&title=${event.currentTarget.dataset.title}`
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
        this.setData({
          itemList: res.result.tracks
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  }
})