
import * as Pusher from "pusher"

const {
    PUSHER_APP_ID: appId,
    PUSHER_KEY: key,
    PUSHER_SECRET: secret,
    PUSHER_CLUSTER: cluster,
  } = process.env;
  


export default function pusherServerFlam (roomName, event, data) {

    const dasPusher = new Pusher({appId, key, secret, cluster});
    let channelName = 'client-' + roomName;
    var channel = dasPusher.trigger(channelName, event, data);
}