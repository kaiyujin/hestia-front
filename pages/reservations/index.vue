<template>
  <div>

  </div>
</template>

<script>
  export default {
    layout: 'main',
    data () {
      return {}
    },
    mounted () {
      console.log(this.$store.state.token)
    }
  }
</script>
