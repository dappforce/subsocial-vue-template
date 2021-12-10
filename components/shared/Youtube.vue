<template>
  <iframe
    width="100%"
    height="315"
    :src="'https://www.youtube.com/embed/' + extractVideoID(link)"
  />
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Youtube extends Vue {
  @Prop({
    type: String
  }) link!: string

  extractVideoID (url: string) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
    const match = url.match(regExp)
    if (match && match[7].length === 11) {
      return match[7]
    } else if (url.length === 11) {
      return url
    } else {
      console.log('Could not extract video ID.')
    }
  }
}
</script>
