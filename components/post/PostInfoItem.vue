<template>
  <div v-if="postItem" class="post-info-wp">
    <Avatar :id="postItem.ownerId" :src="postItem.ownerImageUrl" :name="postItem.ownerName" />
    <div class="info-container">
      <Title :link="'/accounts/'+ postItem.ownerId" :name="postItem.ownerName" />
      <div class="post-additional-info">
        <span class="owner-name"><NuxtLink :to="postItem.handle ? '/@'+postItem.handle : '/'+postItem.spaceId">{{ postItem.spaceName }}</NuxtLink></span>
        <span>·</span>
        <span v-if="postItem.postLink"><NuxtLink :to="postItem.postLink">{{ toDate }}</NuxtLink></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.post-info-wp {
  display: flex;

  .info-container {
    margin-left: 15px;

    .title {
      max-width: 360px;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .post-additional-info {
    font-size: $font_small;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: $main_text_color;

    a {
      color: $main_text_color;
      text-decoration: none;
    }

    span {
      margin-right: 4px;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { PostListItemData } from '~/models/post/post-list-item.model'

@Component
export default class PostInfoItem extends Vue {
  @Prop({
    type: Object,
    default: undefined
  }) postItem!: PostListItemData

  get toDate () {
    const diff = this.$dayjs().diff(this.$dayjs(+this.postItem.createdAtTime), 'days')

    if (diff < 7) {
      return this.$dayjs(+this.postItem.createdAtTime).fromNow().toLowerCase()
    } else if (diff > 7 && diff < 365) {
      return this.$dayjs(+this.postItem.createdAtTime).format('D MMM')
    } else {
      return this.$dayjs(+this.postItem.createdAtTime).format('D MMM YY')
    }
  }
}
</script>
