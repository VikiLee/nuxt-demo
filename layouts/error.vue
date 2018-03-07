<template>
  <div class="error">
      <p>
        <nuxt-link class="error-link" to="/">Back to the home page</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'error',
    mounted() {
    },
    beforeDestroy() {
    }
  }
</script>