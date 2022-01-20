<template>
  <v-avatar
    :size="size"
  >
    <img v-if="!showJdentity && src" :src="link" alt="" @error="onImgError">
    <client-only>
      <svg v-if="showJdentity" id="identicon" :width="size" :height="size" :data-jdenticon-value="userId" />
    </client-only>
  </v-avatar>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { environment } from '~/environments/environment'

@Component
export default class Avatar extends Vue {
  @Prop({
    type: String,
    default: 'No Avatar'
  }) name!: string

  @Prop({
    type: String
  }) id!: string

  @Prop({
    type: String
  }) src!: string

  @Prop({
    type: Number,
    default: 40
  }) size!: number

  showJdentity: boolean = false
  url: string = environment.ipfsUrl
  userId: string = ''
  link: string = ''

  @Watch('src')
  srcHandle () {
    this.showJdentity = !this.src
    this.link = this.url + this.src
  }

  created (): void {
    this.link = this.url + this.src
    this.showJdentity = !this.src
    this.userId = this.id
  }

  onImgError (): void {
    this.showJdentity = true
  }
}
</script>
