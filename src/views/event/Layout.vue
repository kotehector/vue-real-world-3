<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">
        Details
      </router-link>
      <router-link :to="{ name: 'EventRegister' }">
        Register
      </router-link>
      <router-link :to="{ name: 'EventEdit' }">
        Edit
      </router-link>
    </div>

    <router-view :event="event" />
  </div>
</template>

<script>
export default {
  name: 'EventLayout',

  props: ['id'],

  created() {
    this.$store.dispatch('fetchEvent', this.id).catch(error => {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error }
      })
    })
  },

  computed: {
    event() {
      return this.$store.state.event
    }
  }
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
