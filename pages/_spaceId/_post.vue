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

              <div class="button-wp">
                <EditButton v-if="isPostOwner && !isMobileScreen()" :link="'/post/?post=' + post.id" />

                <OptionButton
                  :post-id="post.id"
                  :account-id="post.ownerId"
                  :can-edit="isPostOwner"
                  :post="post"
                  :toggle-type="'post'"
                  :is-space-view="true"
                />
              </div>
            </div>
            <Title size="large" :link="post.postLink" :name="post.title" />

            <Youtube v-if="post.link" :link="post.link" />

            <p class="markdown-body" v-html="$md.render(post.body)" />

            <PostListItem
              v-if="sharedPost"
              :post-item-data="sharedPost"
              :current-user-id="currentUser.id"
              :is-shared-post="true"
              class="shared-post"
            />

            <div class="post-tags">
              <Tag v-for="(item, index) in post.tags" :key="index" :tag-name="item" size="medium" />
            </div>
          </div>
          <PostImage :image-src="post.imageUrl" :link="post.postLink" />
        </div>
        <v-divider
          class="mx-4"
        />
        <div class="action-panel-wp">
          <ActionPanel :is-show-label="true" :is-show-comment-btn="false" :post="post" />
        </div>
      </v-card>
    </div>

    <div class="space-item-container">
      <SpaceListItem v-if="space && currentUser" :space-item-data="space" :avatar-size="40" :current-user="currentUser" />
    </div>

    <v-card
      elevation="2"
      class="comment-container"
    >
      <Comment :id="post.id" :avatar-src="post.ownerImageUrl" :handle="post.handle" :count="post.visibleRepliesCount" :show-divider="false" />
    </v-card>
  </div>
</template>

<style scoped lang="scss">
.post-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .space-item-container {
    width: 100%;
    margin-bottom: $space_normal;
  }

  .comment-container {
    width: 100%;
    padding: $space_normal;
  }

  .post-item-wp {
    width: 100%;
    margin-top: $space_normal;

    .post-item {
      padding: $space_normal;
    }

    .post-main-wp {
      display: flex;
      padding-bottom: 0;

      .post-data {
        width: 100%;

        .title {
          font-size: $font_huge;
        }

        .post-tags {
          & .tag {
            margin-bottom: $space_normal;
          }
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
import { getIsPostOwner, getPostIdFromLink, isMobile } from '~/utils/utils'

@Component({})
export default class PostPage extends Vue {
  space: SpaceStruct | undefined | null = null
  post: PostListItemData | null = null
  currentUser?: ProfileStruct
  sharedPost: PostListItemData | null = null
  isPostOwner: boolean = false

  created (): void {
    if (this.$store.state.loading.isLoading) {
      this.post = this.$store.getters['posts/getPostInfo'](getPostIdFromLink(this.$route.params.post))
      this.setCurrentUser()
      this.getSharedPost()
      this.$store.dispatch('space/findSpaceById', this.$route.params.spaceId).then((space) => {
        this.space = space
      })
    }
  }

  mounted () {
    const unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'posts/SET_SUGGESTED_POST_IDS' && this.post === null) {
        this.$store.dispatch('posts/getPostById', getPostIdFromLink(this.$route.params.post)).then(() => {
          this.post = this.$store.getters['posts/getPostInfo'](getPostIdFromLink(this.$route.params.post))
          this.setCurrentUser()
          this.getSharedPost()
          unsubscribe()
        })
        this.$store.dispatch('space/getSpaceById', this.$route.params.spaceId).then((space) => {
          this.space = space
        })
      }
    })
  }

  setCurrentUser (): void {
    this.currentUser = this.$store.state.profiles.currentUser
    this.isPostOwner = this.currentUser && this.post ? getIsPostOwner(this.post.ownerId, this.currentUser.id) : false
  }

  getSharedPost () {
    const sharedPostId = this.post?.sharedPostId
    if (sharedPostId) {
      this.$store.dispatch('posts/getPostById', this.post?.sharedPostId).then(() => {
        this.sharedPost = this.$store.getters['posts/getPostInfo'](this.post?.sharedPostId)
      })
    }
  }

  isMobileScreen (): boolean {
    return isMobile()
  }
}
</script>
