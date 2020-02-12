<template>
  <div>
    <div id="map" style="width:600px; height:600px;"></div>
    <v-btn @click="sample">click</v-btn>
    <v-btn @click="pin_add">ピンを増やす</v-btn>
    <v-btn @click="polygon">ポリゴン</v-btn>
    <v-btn @click="get_position_from_firebase">firebaseから取得</v-btn>
  </div>
</template>
<script>
import firebase from "~/plugins/firebase.js";
const db = firebase.firestore();
var MyLatLng = new google.maps.LatLng(-25.344, 131.036);

export default {
  data: () => ({
    options: {
      zoom: 0, //地図の縮尺値
      center: MyLatLng, //地図の中心座標
      mapTypeId: "roadmap"
    },
    paths: [
      { lat: 40.800471, lng: -73.958122 },
      { lat: 40.796881, lng: -73.94936 },
      { lat: 40.764543, lng: -73.973062 },
      { lat: 40.768313, lng: -73.982233 }
    ],
    position_data: []
  }),
  computed: {
    google() {
      return window.google;
    }
  },
  methods: {
    sample() {
      const google = this.google;
      const test = new google.maps.Map(
        document.getElementById("map"),
        this.options
      );
    },
    pin_add() {
      var map = new google.maps.Map(
        document.getElementById("map"),
        this.options
      );
      for (var i = 0; i < 5; i++) {
        var lat = Math.random() * 100;
        var lng = Math.random() * 100;
        var uluru = { lat: lat, lng: lng };
        console.log(uluru);
        uluru = new google.maps.LatLng(uluru);
        const test = new google.maps.Marker({ position: uluru, map: map });
      }
    },
    //ポリゴンを使った領域判定
    polygon() {
      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: { lat: 40.800471, lng: -73.958122 }
      });
      var uluru = { lat: 50.800471, lng: -73.958122 };
      var polygon = new google.maps.Polygon({
        paths: this.paths,
        map: map,
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: "#FF0000",
        fillOpacity: 0.25
      });
      var marker_position = new google.maps.LatLng(uluru.lat, uluru.lng);
      var res = google.maps.geometry.poly.containsLocation(
        marker_position,
        polygon
      );
      if (res) {
        var msg = "現在、指定された範囲内に入っています。";
        const test_marker = new google.maps.Marker({
          position: uluru,
          map: map,
          icon: {
            fillColor: "#FFFFFF", //塗り潰し色
            fillOpacity: 0.8, //塗り潰し透過率
            path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW, //円を指定
            scale: 16, //円のサイズ
            strokeColor: "#000000", //枠の色
            strokeWeight: 1.0 //枠の透過率
          }
        });
      } else {
        var msg = "現在は範囲外にいます。";
        const test_marker = new google.maps.Marker({
          position: uluru,
          map: map,
          icon: {
            fillColor: "#000000", //塗り潰し色
            fillOpacity: 0.8, //塗り潰し透過率
            path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW, //円を指定
            scale: 16, //円のサイズ
            strokeColor: "#FFFFFF", //枠の色
            strokeWeight: 1.0 //枠の透過率
          }
        });
        
      }
      console.log(res);
    },
    //firebaseからもらった情報でマーカー設置
    async get_position_from_firebase() {
      var infoWindow;
      var map = new google.maps.Map(
        document.getElementById("map"),
        this.options
      );
      const positionRef = db.collection("user_position");
      const getDoc = await positionRef
        .get()
        .then(result => {
          result.forEach(element => {
            //console.log(element.data());
            this.position_data.push(element.data());
          });
        })
        .catch(err => {
          console.log(result);
        });
      this.position_data.forEach(element => {
        var uluru = {
          lat: element.latitude,
          lng: element.longitude
        };
        uluru = new google.maps.LatLng(uluru);
        const marker = new google.maps.Marker({ position: uluru, map: map });

        infoWindow = new google.maps.InfoWindow({
          // 吹き出しの追加
          content: element.user // 吹き出しに表示する内容
        });
        marker.addListener("click", function() {
          // マーカーをクリックしたとき
          infoWindow.open(map, marker); // 吹き出しの表示
        });
      });
    }
  }
};
</script>