import { createStore } from 'vuex'
import EventService from '@/services/EventService.js'

export default createStore({
  state: {
    user: 'Hector MH',
    events: []
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },

    SET_EVENTS(state, events) {
      state.events = events
    },

    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    fetchEvents({ commit }, params) {
      return EventService.getEvents(2, params.page || 1)
        .then(response => {
          commit('SET_EVENTS', response.data)
          return response.data
        })
        .catch(error => {
          throw error
        })
    },

    fetchEvent({ commit, state }, id) {
      const existingEvent = state.events.find(event => event.id === id)
      if (existingEvent) {
        commit('SET_EVENT', existingEvent)
      } else {
        return EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
            return response.data
          })
          .catch(error => {
            throw error
          })
      }
    },

    async createEvent({ commit }, event) {
      return EventService.postEvent(event)
        .then(response => {
          console.log('createEvent response: ', response)
          commit('ADD_EVENT', event)
        })
        .catch(error => {
          throw error
        })
    }
  },
  modules: {}
})
