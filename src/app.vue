<template>
  <div>
    <router-view />
    <global-fab v-show="showFab"></global-fab>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ArrowUpIcon from '$icons/ArrowUp'
import GlobalFab from '$components/GlobalFab'
export default {
  name: 'app',
  components: {
    ArrowUpIcon, GlobalFab
  },
  data(){
    return {
      showFab: true
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    hideFab(){
      this.showFab = false
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss">
</style>
