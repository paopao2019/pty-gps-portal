import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';

import VueAMap from 'vue-amap';

import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: '81d8cce3ed2e8954b9eb2e1095ba17ae',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor',
          'AMap.Transfer'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

// 路由守卫
import Bus from '@/utils/bus.js'
Vue.use(Bus)


export default new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')