<template>
  <h1>Uh-oh!!</h1>
  <h3>
    it looks like you're experiencing some network issues, please take a breath
    and <a href="#" @click="$router.go(-1)">click here</a>{{ resource }} to try
    again.
  </h3>
</template>

<script>
export default {
  name: 'NetworkError'
}
</script>
