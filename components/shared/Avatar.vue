<template>
  <v-avatar
    :color="color"
    :size="size"
  >
    <img v-if="!showJdentity" :src="link" alt="" @error="onImgError">
    <client-only>
      <svg v-if="showJdentity" id="identicon" :width="size" :height="size" :data-jdenticon-value="userId" />
    </client-only>
  </v-avatar>
</template>

<script>
import { environment } from '~/environments/environment'
export default {
  name: 'Avatar',

  props: {
    name: {
      type: String,
      default: 'No Avatar'
    },
    src: {
      type: String
    },
    size: {
      type: Number,
      default: 40
    },
    color: {
      type: String,
      default: '#fff'
    },
    id: {
      type: String
    }
  },

  data () {
    return {
      showJdentity: false,
      url: environment.ipfsUrl,
      userId: '',
      link: ''
    }
  },

  watch: {
    src (newVal, oldVal) {
      this.showJdentity = false
      this.link = this.url + this.src
    }
  },

  created () {
    this.link = this.url + this.src
    this.userId = this.id
  },

  methods: {
    onImgError () {
      this.showJdentity = true
    }
  }
}
</script>
