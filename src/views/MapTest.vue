<template>
  <div class="amap-wrapper">
    <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
      <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
    </el-amap>

    <div class="toolbar">
      <button type="button" name="button" v-on:click="toggleVisible">toggle first marker</button>
      <button type="button" name="button" v-on:click="changePosition">change position</button>
      <button type="button" name="button" v-on:click="chnageDraggle">change draggle</button>
      <button type="button" name="button" v-on:click="addMarker">add marker</button>
      <button type="button" name="button" v-on:click="removeMarker">remove marker</button>
    </div>
  </div>
</template>

<script>

  module.exports = {
    name: 'MapTest',
    data() {
      return {
        count: 1,
        slotStyle: {
          padding: '2px 8px',
          background: '#eee',
          color: '#333',
          border: '1px solid #aaa'
        },
        zoom: 14,
        center: [121.5273285, 31.21515044],
        markers: [
          {
            position: [121.5273285, 31.21515044],
            events: {
              click: () => {
                alert('click marker');
              },
              dragend: (e) => {
                console.log('---event---: dragend')
                this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
              }
            },
            visible: true,
            draggable: false,
            template: '<span>1</span>',
          }
        ],

      };
    },
    methods: {
      onClick() {
        this.count += 1;
      },
      changePosition() {
        let position = this.markers[0].position;
        this.markers[0].position = [position[0] + 0.002, position[1] - 0.002];
      },
      chnageDraggle() {
        let draggable = this.markers[0].draggable;
        this.markers[0].draggable = !draggable;
      },
      toggleVisible() {
        let visableVar = this.markers[0].visible;
        this.markers[0].visible = !visableVar;
      },
      addMarker() {
        let marker = {
          position: [121.5273285 + (Math.random() - 0.5) * 0.02, 31.21515044 + (Math.random() - 0.5) * 0.02]
        };
        this.markers.push(marker);
      },
      removeMarker() {
        if (!this.markers.length) return;
        this.markers.splice(this.markers.length - 1, 1);
      }
    }
  };
</script>



<style scoped>
  #container {
    width:1100px;
    height: 500px;
    margin: -20px  auto 0 auto;
  }

  .amap-wrapper {
    width:1100px;
    height: 500px;
    margin: -20px  auto 0 auto;
  }
</style>