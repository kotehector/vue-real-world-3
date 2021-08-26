<template>
  <p>Register event</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  name: 'EventRegister',
  props: ['event'],
  methods: {
    register() {
      // call to API
      this.$router.push({
        name: 'EventDetails',
        params: { id: this.event.id }
      })
    }
  }
}
</script>
