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
        <v-toolbar-title>New Chat</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>

      <v-list subheader>
        <v-subheader>Recent chat</v-subheader>

        <v-list-item v-for="item in items" :key="item.title" >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list subheader>
        <v-subheader>Previous chats</v-subheader>

        <v-list-item v-for="item in items2" :key="item.title" >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-col>
</template>
<script>
import firebase from "~/plugins/firebase.js";
const db = firebase.firestore();
export default {
  data: () => ({
    items: [
      {
        active: true,
        title: "Jason Oner",
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
      },
      {
        active: true,
        title: "Ranee Carlson",
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
      },
      {
        title: "Cindy Baker",
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
      },
      {
        title: "Ali Connors",
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
      }
    ],
    items2: [
      {
        title: "Travis Howard",
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
      }
    ],
    login_id: ""
  }),
  asyncData: context => ({
    login_id: context.query.login_id
  }),
  mounted() {
    db.collection("user_position").get().then((result) => {
      result.forEach(element => {
        console.log(element.data());
      });    
    }).catch((err) => {
      
    });
  }
};
</script>
