import Vue from 'vue'

Vue.filter('addressShortness', (address:string, length: number) => {
  if (length > address.length) {
    return address
  } else {
    const index = Math.floor(length / 2)
    return address.substring(0, index) + '...' + address.slice(-index)
  }
})
