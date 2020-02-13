<template>
  <v-btn @click="push">push通知</v-btn>
</template>
<script>
import axios from "axios";
export default {
  methods: {
    push() {
      OneSignal.getUserId(userId => {
        console.log(userId);
      });
      const params = {
        method: "post",
        url: "https://onesignal.com/api/v1/notifications",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic `
        },
        data: {
          app_id: "",
          headings: {
            en: "notification test",
            ja: "name:hogeの人に通知です"
          },
          contents: {
            en: "This is notification test",
            ja: "name:hogeの人に通知です"
          },
          include_player_ids: ["755eab06-8acd-4c3b-801b-3fdc2731e1a3"],

          // オプションフィルターなので任意ここでは
          filters: [
            {
              field: "tag",
              key: "include_player_ids",
              relation: "=",
              value: "755eab06-8acd-4c3b-801b-3fdc2731e1a3"
            }
          ]
        }
      };
      axios(params).then(res => {
        console.log(res.data); // responseにセットした通知ID等が返却される
      });
    }
  }
};
</script>
