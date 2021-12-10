<template>
  <div v-if="post" class="post-container">
    <div class="post-item-wp">
      <v-card
        elevation="2"
        class="post-item"
      >
        <div class="post-main-wp">
          <div class="post-data">
            <div class="post-item-header">
              <PostInfoItem
                :post-item="post"
              />
              <OptionButton :post-id="post.id" :account-id="post.ownerId" />
            </div>
            <Title size="large" :link="post.postLink" :name="post.title" />

            <p class="markdown-body" v-html="$md.render(post.body)" />

            <Tag v-for="(item, index) in post.tags" :key="index" :tag-name="item" size="medium" />
          </div>
        </div>
        <v-divider
          class="mx-4"
        />
        <div class="action-panel-wp">
          <ActionPanel :is-show-label="true" :is-show-comment-btn="false" :post="post" />
        </div>
      </v-card>
    </div>

    <SpaceListItem v-if="space && currentUser" :space-item-data="space" :avatar-size="40" :current-user="currentUser" />

    <v-card
      elevation="2"
      class="comment-container"
    >
      <Comment :id="post.id" :avatar-src="post.ownerImageUrl" :handle="post.handle" :count="post.visibleRepliesCount" />
    </v-card>
  </div>
</template>

<style lang="scss">
.post-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .comment-container {
    width: 100%;
    padding: $space_normal;
    margin-top: $space_normal;

    .divider {
      display: none;
    }
  }

  .post-item-wp {
    width: 100%;
    margin-top: $space_normal;

    .post-item {
      padding: $space_normal;
    }

    .post-main-wp {
      display: flex;
      padding-bottom: 22px;

      .post-data {
        width: 100%;

        .title {
          font-size: $font_huge;
        }
      }
    }

    .markdown-body {
      margin-top: $space_small;
      margin-bottom: 22px;
    }

    .post-item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: $space_normal;
    }
  }

  .description {
    margin-bottom: 0;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ProfileStruct, SpaceStruct } from '@subsocial/api/flat-subsocial/flatteners'
import { PostListItemData } from '~/models/post/post-list-item.model'
import { getPostIdFromLink } from '~/utils/utils'

@Component({})
export default class PostPage extends Vue {
  space: SpaceStruct | undefined | null = null
  post: PostListItemData | undefined | null = null
  currentUser?: ProfileStruct

  created (): void {
    this.currentUser = this.$store.state.profiles.currentUser
    this.post = this.$store.getters['posts/getPostInfo'](getPostIdFromLink(this.$route.params.post))
    this.$store.dispatch('space/findSpaceById', this.$route.params.space).then((space) => {
      this.space = space
    })

    const unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'posts/SET_SUGGESTED_POST_IDS' && this.post === undefined) {
        this.$store.dispatch('posts/getPostById', getPostIdFromLink(this.$route.params.post)).then(() => {
          this.post = this.$store.getters['posts/getPostInfo'](getPostIdFromLink(this.$route.params.post))
          this.currentUser = this.$store.state.profiles.currentUser
          unsubscribe()
        })
        this.$store.dispatch('space/getSpaceById', this.$route.params.space).then((space) => {
          this.space = space
        })
      }
    })

    this.$nuxt.$emit('isShowTabs', false)
  }
}
</script>
