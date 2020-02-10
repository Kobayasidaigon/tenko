<template>
<div>
    <div id="map" style="width:600px; height:600px;"></div>
    <v-btn @click="sample" >click</v-btn>
    <v-btn @click="pin_add">ピンを増やす</v-btn>
    <v-btn @click="polygon">ポリゴン</v-btn>
</div>
</template>
<script>
var MyLatLng = new google.maps.LatLng(-25.344,131.036);
export default{
    data:()=>({
        options:{
            zoom: 0,      //地図の縮尺値
            center: MyLatLng,    //地図の中心座標
            mapTypeId: 'roadmap',
        },
        paths:[
            {lat: 40.800471, lng: -73.958122},
            {lat: 40.796881, lng: -73.94936},
            {lat: 40.764543, lng: -73.973062},
            {lat: 40.768313, lng: -73.982233}
        ],
    }),
    computed:{
        google(){
            return window.google
        }
    },
    methods:{
        sample(){
            const google = this.google
            const test = new google.maps.Map(document.getElementById('map'),this.options)
        },
        pin_add(){
         var map = new google.maps.Map(document.getElementById('map'), this.options);
            for (var i=0;i<5;i++){
                var lat = Math.random()*100;
                var lng = Math.random()*100;
                var uluru = {lat: lat, lng: lng};
                console.log(uluru);
                uluru =  new google.maps.LatLng(uluru);
                const test = new google.maps.Marker({position:uluru,map:map})
            }
    },
        polygon(){
                var map = new google.maps.Map(document.getElementById('map'), {zoom: 10, center: {lat: 40.800471, lng: -73.958122}});
              var uluru = {lat: 40.800471, lng: -73.958122};
              var polygon = new google.maps.Polygon({
                paths:this.paths,
                map: map,
                strokeOpacity: 0.8,
                strokeWeight: 3,
                fillColor: '#FF0000',
                fillOpacity: 0.25
              })
              const test_marker= new google.maps.Marker({position:uluru,map:map})
              var marker_position = new google.maps.LatLng(uluru.lat,uluru.lng);
              var res = google.maps.geometry.poly.containsLocation(marker_position,polygon);
                  if(res){
                        var msg = "現在、指定された範囲内に入っています。"
                    }else{
                        var msg = "現在は範囲外にいます。"
                    }
              console.log(res)
        }
    }
}
</script>