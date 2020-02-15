<template>
  <v-row justify="center">
    <v-btn color="primary" dark @click.stop="dialog = true">
      Open Dialog
    </v-btn>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">送信メッセージ</v-card-title>

        <v-col cols="12" sm="6">
          <v-text-field v-model="message" single-line solo></v-text-field>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="
              dialog = false;
              send_messae();
            "
          >
            送信
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      message: ""
    };
  },
  methods: {
    //親コンポーネントからmethods呼び出し
    chenge_dialog() {
      dialog != dialog;
    },
    send_messae() {
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
            ja: "管理者からメッセージです"
          },
          contents: {
            en: "This is notification test",
            ja: this.message
          },
          include_player_ids: [this.$props.id],

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
  },
  props: {
    id: String 
  }
};
</script>
