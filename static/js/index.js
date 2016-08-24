
/*

  The Okavango Delta is one of the world’s last great wetland wildernesses. A team of Ba’Yei, scientists, engineers and adventurers is journeying a 345 kilometers crossing the delta, finding new species and exploring new ground. Join us in real-time as we explore the beating heart of our planet.

  RELEASE
    round sightings location
    add grid journal
    mobile
    sighting popup
    update about page
    rollover on member markers
    add year selection

    add skip button to intro
    animate timeline cursor and direction
    sighting graph

    deep linking of features
    performance
    disable map motion for now
    endpoint for Jane

  JOURNAL
    loading of features
    update currentime
    link and location buttons
    reverse timeline
    show arrow on timeline direction
  RESPONSIVE
    layout doesnt deal well with window resize

  sighting popups
  responsive map

  introduction
  disconnect ambit paths when they are more than one day apart

  better night
  endpoint for Jane
  change animation speed based on framerate

  NICE TO HAVE:
  render features in webGL
  change initial map location
  timeline interaction / animation
  feature loading zoomed out
  focus
  fly to next location when there is no beacon or ambit for one day
  perlin noise moving sightings
  visual night

  KNOWN BUGS:
  pinterest extension breaks journal

  NOTES:
  Medium posts that have nothing to do with Okavango show up in blog query

  JOURNAL DATA LOADING APPROACHES:
  1 When reaching the extent of the journal content
    look for bordering days
    fetch content for those days
    CONS: tiles might not be loaded entirely so will require second load on map view
  2 When reaching the extent of the journal content
    load features for all available 
    look for beacons in neighboring days
    load all tiles intersecting with beacons
    CONS: this could leave tiles out in between beacons

  DATA LOADING:
    loading stack

*/

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
// import createLogger from 'redux-logger'
import { fetchExpeditions } from './actions'
import okavangoApp from './reducers'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import OkavangoContainer from './containers/OkavangoContainer'
import MapPage from './components/MapPage'
import JournalPageContainer from './containers/JournalPageContainer'
// import JournalPage from './components/JournalPage'
import DataPage from './components/DataPage'
import AboutPage from './components/AboutPage'
import SharePage from './components/SharePage'

// const loggerMiddleware = createLogger()

let store = createStore(
  okavangoApp,
  applyMiddleware(
    thunkMiddleware,
    // loggerMiddleware
  )
)

const routes = (
  <Route path="/" component={OkavangoContainer}>
    <IndexRoute component={MapPage}/>
    <Route path="map" component={MapPage}/>
    <Route path="journal" component={JournalPageContainer}/>
    <Route path="data" component={DataPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="share" component={SharePage}/>
  </Route>
)

var render = function () {
  ReactDOM.render(
    (
      <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
      </Provider>
    ),
    document.getElementById('okavango')
  )
}

store.subscribe(render)
store.dispatch(fetchExpeditions())

window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName('dropdown-content')
    var i
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i]
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show')
      }
    }
  }
}
