<template>
  <div>
    <v-btn @click="add_user">ユーザー現在地取得</v-btn>
  </div>
</template>
<script>
import firebase from "~/plugins/firebase.js";
const db = firebase.firestore();
export default {
  methods: {
    add_user() {
      navigator.geolocation.getCurrentPosition(success, err);
      function success(position) {
        console.log(position);
      }
      function err(e) {
        console.log(e);
      }
      // db.collection('user_position').add({
      //     user:"大悟"
      // });
    }
  }
};
</script>
