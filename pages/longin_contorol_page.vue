<template>
  <div>
    <input v-model="login_id" />
    {{login_id}}
    <v-btn @click="login" >login</v-btn>
  </div>
</template>
<script>
import firebase from "~/plugins/firebase.js";
const db = firebase.firestore();
export default {
  data: () => ({
    login_id: ""
  }),
  methods: {
     login() {
       //ページ遷移の条件はfirebaseのドキュメントに中身があるかないか
        db.collection("user_position").doc(this.login_id).get().then(doc => {
          if (!doc.exists) {
            console.log("No such document!");
            return;
          } else {            
            //ログインIDはfirebaseのドキュメント名
            this.$router.push("/contorol_page?login_id="+this.login_id);
          }
        })
        .catch(err => {
          console.log("Error getting document", err);
        });
    }
  }
};
</script>