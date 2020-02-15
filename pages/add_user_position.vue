<template>
  <div>
    <v-btn @click="add_user">ユーザー現在地取得</v-btn>
  </div>
</template>
<script>
import firebase from "~/plugins/firebase.js";
const db = firebase.firestore();
var one_signal_id = "";
export default {
  methods: {
    async add_user() {
      await OneSignal.getUserId(userId => {
        one_signal_id = userId;
      });
      //googlemapの位置取得
      navigator.geolocation.getCurrentPosition(success, err);

      function success(position) {
        console.log(one_signal_id);
        db.collection("user_position").add({
          user: "大悟-",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          OneSignal: one_signal_id
        });
      }
      function err(e) {
        console.log(e);
      }
    }
  }
};
</script>
