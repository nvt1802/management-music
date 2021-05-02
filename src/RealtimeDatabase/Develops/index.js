import { realtimeDB } from 'firebaseConfig'
import { v4 as uuidv4 } from 'uuid'

export function writeDeveloperData(name, age) {
  const developerId = uuidv4()
  realtimeDB.ref('developers/' + developerId).set({
    name: name,
    age: age,
  });
}

export function deleteDeveloperData(developerId) {
  realtimeDB.ref('developers/' + developerId).remove()
}


export const developDBRef = realtimeDB.ref('developers')