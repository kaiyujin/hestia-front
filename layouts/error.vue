<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">{{ $t("error.page_not_found") }}</h1>
    <h1 v-else>{{ $t("error.internal_server_error") }}</h1>
  </div>
</template>
<script>
  export default {
    props: ['error'],
    layout: 'default'
  }
</script>
