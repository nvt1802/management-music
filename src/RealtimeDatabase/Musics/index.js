import { realtimeDB } from 'firebaseConfig'
import { v4 as uuidv4 } from 'uuid'

export function createMusics(trackNameVN, trackNameCN, SingerName, UrlYoutube) {
  const musicId = uuidv4()
  realtimeDB.ref('musics/' + musicId).set({
    trackNameVN: trackNameVN,
    trackNameCN: trackNameCN,
    SingerName: SingerName,
    UrlYoutube: UrlYoutube.replace('watch?v=','embed/'),
  });
}

export function deleteMusics(musicId) {
  realtimeDB.ref('musics/' + musicId).remove()
}


export const developDBRef = realtimeDB.ref('musics')