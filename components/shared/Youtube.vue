<template>
  <iframe width="100%" height="315"
          :src="'https://www.youtube.com/embed/' + extractVideoID(link)">
  </iframe>
</template>

<script>
export default {
  name: 'Youtube',
  
  props: {
    link: String
  },
  
  methods: {
    extractVideoID (url) {
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
      const match = url.match(regExp)
      if (match && match[7].length == 11) {
        return match[7]
      } else if (url.length == 11) {
        return url
      } else {
        console.log("Could not extract video ID.")
      }
    }
  }
}
</script>