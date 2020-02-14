<template>
  <v-col class="text-center" cols="12" sm="4">
    <div class="my-2">
      <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">group_id</div>
            <v-list-item-title class="headline mb-1">{{login_id}}</v-list-item-title>
            <v-list-item-subtitle>サブタイトル</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>

    <v-card max-width="500" class="mx-auto">
      <v-toolbar color="deep-purple accent-4" dark>
        <v-toolbar-title>ユーザー一覧</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>

      <v-list subheader>
        <v-list-item v-for="item in this.user_list" :key="item.name" >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.user"></v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-list>
    </v-card>
    <bottom_nav></bottom_nav>
  </v-col>
  
</template>
<script>
import bottom_nav from '~/components/bottom_nav.vue'
import firebase from "~/plugins/firebase.js";
const db = firebase.firestore();
export default {
  data: () => ({
    login_id: "",
    user_list:[]
  }),
  asyncData: context => ({
    login_id: context.query.login_id
  }),
  mounted() {
    db.collection("user_position").get().then((result) => {
      result.forEach(element => {
        this.user_list.push(element.data());
      });
    }).catch((err) => {
      console.log(err);
    });
  },
  components:{
    bottom_nav
  }
};
</script>
