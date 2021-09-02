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
      EventService.getEvents(2, params.page || 1)
        .then(response => {
          commit('SET_EVENTS', response.data)
          return response.data
        })
        .catch(error => {
          console.log(error)
          return error.response
        })
    },

    fetchEvent({ commit, state }, id) {
      const existingEvent = state.events.find(event => event.id === id)
      if (existingEvent) {
        commit('SET_EVENT', existingEvent)
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
            return response.data
          })
          .catch(error => {
            console.log(error)
            return error.response
          })
      }
    },

    async createEvent({ commit }, event) {
      try {
        let response = await EventService.postEvent(event)
        if (response) {
          console.log('createEvent response: ', response)
          commit('ADD_EVENT', event)
        }
      } catch (error) {
        console.log('createEvent error: ', error.response)
      }
    }
  },
  modules: {}
})
