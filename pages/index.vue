<template>
<div class="wrap">
   hello {{username}}
</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'homepage',
  data() {
    return {
    }
  },
  methods: {
    ...mapActions(['getData'])
  },
  computed: {
    ...mapState({
      username: state => state.userinfo.username || 'hello'
    })
  },
  created() {
    this.getData({
      type: 1
    })
  }
}
</script>
