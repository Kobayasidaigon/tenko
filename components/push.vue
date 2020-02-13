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
          Authorization: `Basic OTEwZGZmN2QtYTNiYS00NTE5LTg3OTYtZWRmNjk3NTkxY2Ni`
        },
        data: {
          app_id: "1e9e3388-0b73-4114-bd73-1ad9c84edcf2",
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
    },
    call_parent(){

    }
  }
};
</script>
