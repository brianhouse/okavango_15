
import fetch from 'isomorphic-fetch'

export const LOAD_EXPEDITIONS = 'LOAD_EXPEDITIONS'

export function loadExpeditions () {
  return {
    type: LOAD_EXPEDITIONS
  }
}

export const REQUEST_EXPEDITIONS = 'REQUEST_EXPEDITIONS'

export function requestExpeditions () {
  return {
    type: REQUEST_EXPEDITIONS
  }
}

export const RECEIVE_EXPEDITIONS = 'RECEIVE_EXPEDITIONS'

export function receiveExpeditions (data) {
  return {
    type: RECEIVE_EXPEDITIONS,
    data
  }
}

export function fetchExpeditions () {
  return function (dispatch) {
    dispatch(requestExpeditions())

    return fetch('http://intotheokavango.org/api/expeditions')
      .then(response => response.json())
      .then(json =>
        dispatch(receiveExpeditions(json))
      )
      // TODO: catch errors
  }
}

export const SET_EXPEDITION = 'SET_EXPEDITION'

export function setExpeditions (id) {
  return {
    type: SET_EXPEDITION,
    id
  }
}

export const SET_CONTROL = 'SET_CONTROL'

export function setControl (target, mode) {
  return {
    type: SET_CONTROL,
    target,
    mode
  }
}

export const LOAD_DAY = 'LOAD_DAY'

export function loadDay (expeditionID, dayID) {
  return {
    type: LOAD_DAY,
    expeditionID,
    dayID
  }
}

export const REQUEST_DAY = 'REQUEST_DAY'

export function requestDay () {
  return {
    type: REQUEST_DAY
  }
}

export const RECEIVE_DAY = 'RECEIVE_DAY'

export function receiveDay (expeditionID, dayID, data) {
  return {
    type: RECEIVE_DAY,
    expeditionID,
    dayID,
    data
  }
}

export const LOAD_FEATURES = 'LOAD_FEATURES'

export function loadFeatures () {
  return {
    type: LOAD_FEATURES
  }
}

export const REQUEST_FEATURES = 'REQUEST_FEATURES'

export function requestFeatures () {
  return {
    type: REQUEST_FEATURES
  }
}

export const RECEIVE_FEATURES = 'RECEIVE_FEATURES'

export function receiveFeatures (expeditionID, data) {
  return {
    type: RECEIVE_FEATURES,
    expeditionID,
    data
  }
}

export const SELECT_FEATURE = 'SELECT_FEATURE'

export function selectFeature () {
  return {
    type: SELECT_FEATURE
  }
}

export const UNSELECT_FEATURE = 'UNSELECT_FEATURE'

export function unselectFeature () {
  return {
    type: UNSELECT_FEATURE
  }
}
