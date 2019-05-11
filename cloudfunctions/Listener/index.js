const cloud = require('wx-server-sdk');
const listenApi = require('./listener.js');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  function onGetPlayMusic(platform) {
    return new Promise(resolve => {
      listenApi.apiGet(`/show_playlist?source=${platform}`).then(data => {
        resolve(data);
      });
    });
  }

  function onGetMusicList(listId) {
    return new Promise(resolve => {
      listenApi.apiGet(`/playlist?list_id=${listId}`).then(data => {
        resolve(data);
      });
    });
  }

  function onGetSearchMusic(platform, keyword, page) {
    return new Promise(resolve => {
      listenApi.apiGet(`/search?source=${platform}&keywords=${keyword}&curpage=${page}`).then(data => {
        resolve(data);
      });
    })
  }

  function onGetLyric(musicId) {
    return new Promise(resolve => {
      listenApi.apiGet(`/lyric?track_id=${musicId}`).then(data => {
        resolve(data);
      });
    });
  }

  function onGetMusicUrl(musicId) {
    return new Promise(resolve => {
      listenApi.apiGet(`/bootstrap_track?track_id=${musicId}`).then(data => {
        resolve(data);
      });
    });
  }

  let reqDat;
  switch(event.opr) {
    case 'play_music':
      reqData = await onGetPlayMusic(event.data.platform);
      return reqData;
    case 'list_music':
      reqData = await onGetMusicList(event.data.listId);
      return reqData;
    case 'search':
      reqData = await onGetSearchMusic(event.data.platform, event.data.keyword, event.data.page);
      return reqData;
    case  'lyric':
      reqData = await onGetLyric(event.data.musicId);
      return reqData;
    case 'music_url':
      reqData = await onGetMusicUrl(event.data.musicId);
      return reqData;
  }
}


