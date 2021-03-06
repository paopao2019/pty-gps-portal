import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LocationMap from "../views/LocationMap";
import Distance from "../views/Distance";
import Transfer from "../views/Transfer";
// import MapTest from "../views/MapTest";

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home},
  { path: '/distance', name: 'Distance', component: Distance},
  { path: '/map', name: 'LocationMap', component: LocationMap },
  // { path: '/map-test', name: 'MapTest', component: MapTest }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
