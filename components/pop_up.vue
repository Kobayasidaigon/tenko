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
      console.log(this.$props.id);
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
            ja: "管理者からメッセージです"
          },
          contents: {
            en: "This is notification test",
            ja: this.message
          },
          //送信する相手の指定
          include_player_ids: [this.$props.id]
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
