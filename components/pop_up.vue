<template>
  <v-row justify="center">
    <v-btn color="primary" dark @click.stop="dialog = true">
      Open Dialog
    </v-btn>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline"
          >送信メッセージ</v-card-title
        >

        <v-col cols="12" sm="6">
          <v-text-field v-model="message" single-line solo ></v-text-field>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false;send_messae()">
            送信
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      message:''
    };
  },
  methods: {
    //親コンポーネントからmethods呼び出し
    chenge_dialog() {
      dialog != dialog;
    },
    send_messae(){
        console.log(this.message);
    }
  }
};
</script>
