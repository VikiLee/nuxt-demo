<template>
<div class="wrap">
   hello {{username}}
   <div class="wrap">
    <h1>姓名：{{info.name}}</h1>
      <h2>年龄：{{info.age}}</h2>
      <h2>兴趣：{{info.interest}}</h2>
  </div>
</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'homepage',
  //middleware: 'authenticated',
  // async asyncData({req, res, query, store}) {
  //   store.dispatch('getuserinfo')
  //   var {data} = await axios('https://api.myjson.com/bins/1329lz', {})
  //   return {info: data}
  // },
  fetch({store}) {
    return store.dispatch('getuserinfo')
  },
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
    }),
    info() {
      return this.$store.state.userinfo
    }
  },
  created() {
    this.getData({
      type: 1
    })
  }
}
</script>
