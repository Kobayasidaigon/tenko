<template>
  <v-btn @click="push">push通知</v-btn>
</template>
<script>
import axios from "axios";
export default {
  methods: {
    push() {
      const params = {
        method: "post",
        url: "https://onesignal.com/api/v1/notifications",
        headers: {
          "Content-Type": "application/json",
          Authorization: ``
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
          // オプションフィルターなので任意ここでは
          filters: [
            {
              field: "tag",
              key: "name",
              relation: "!=",
              value: "hoge"
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
