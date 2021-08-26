<template>
  <p>Register event</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  name: 'EventRegister',
  props: ['event'],
  inject: ['GStore'],
  methods: {
    register() {
      // call to API

      this.GStore.flashMessage =
        'You are successfully registered for ' + this.event.title

      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)

      this.$router.push({
        name: 'EventDetails',
        params: { id: this.event.id }
      })
    }
  }
}
</script>
