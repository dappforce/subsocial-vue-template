<template>
  <div v-if="post" class="post-item-wp">
    <v-card
      elevation="2"
      class="post-item"
    >
      <div v-if="post.hiddenSpace && isPostOwner" class="hidden-container">
        <div class="alert-text">
          <v-icon>
            mdi-alert-circle
          </v-icon>
          {{ $t('generalMessages.hiddenPostBySpace') }}
        </div>
        <div class="unhidden-btn">
          <span class="make-visible">
            <ToggleVisibilityButton
              :space="{struct: {id: post.spaceId, hidden: post.hiddenSpace}}"
              :toggle-type="'space'"
            />
          </span>
        </div>
      </div>

      <div v-if="post.hidden && isPostOwner" class="hidden-container">
        <div class="alert-text">
          <v-icon>
            mdi-alert-circle
          </v-icon>
          {{ $t('generalMessages.hiddenPost') }}
        </div>
        <div class="unhidden-btn">
          <span class="make-visible">
            <ToggleVisibilityButton :post="post" :toggle-type="'post'"/>
          </span>
        </div>
      </div>
      <div class="post-main-wp">
        <div class="post-data">
          <div class="post-item-header">
            <PostInfoItem
              :post-item="post"
            />
            <div v-if="!isSharedPost" class="button-wp">
              <OptionButton :post-id="post.id" :account-id="post.ownerId" :post="post" :can-edit="isPostOwner"
                            :toggle-type="'post'" :no-reactions="noReactions"
              />
            </div>
          </div>
          <Title size="large" :link="post.postLink" :name="post.title"/>
          <Youtube v-if="post.link" :link="post.link"/>
          <Paragraph
            v-if="post.summary.length"
            :text="post.summary"
            :is-show-more="post.isShowMore"
            :link="post.postLink"
            margin-top="10"
          />
        </div>

        <PostImage :image-src="post.imageUrl" :link="post.postLink"/>
      </div>
      <v-divider
        v-if="!isSharedPost"
        class="mx-4"
      />
      <div v-if="!isSharedPost" class="action-panel-wp">
        <ActionPanel :id="post.id" :is-show-label="false" :handle="post.ownerId" :post="post"/>
      </div>
    </v-card>
  </div>
</template>

<style lang="scss">
.post-item-wp {
  width: 100%;
  margin-top: $space_normal;

  .post-item {
    padding: $space_normal;
    box-shadow: $box_shadow_card !important;
  }

  .post-main-wp {
    display: flex;
    padding-bottom: $space_normal;

    .post-data {
      width: 100%;
    }
  }

  .post-item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: $space_normal;

    .button-wp {
      display: flex;
      align-items: center;
      height: $buttons_height;
    }
  }
}

@media only screen and (max-width: 768px) {
  .post-main-wp {
    flex-direction: column;
  }
}

</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { PostListItemData } from '~/models/post/post-list-item.model'
import { getIsPostOwner } from '~/utils/utils'

@Component
export default class PostListItem extends Vue {
  @Prop({
    type: Object,
    default: undefined
  }) postItemData!: PostListItemData

  @Prop({
    type: Boolean,
    default: false
  }) isSharedPost!: boolean

  @Prop({
    type: Boolean,
    default: false
  }) noReactions!: boolean

  @Prop({
    type: String
  }) currentUserId!: string

  isPostOwner: boolean = getIsPostOwner(this.postItemData.ownerId, this.currentUserId)
  post: PostListItemData = this.postItemData

  created () {
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'posts/SET_LOADING_POST_ID' && mutation.payload === this.postItemData.id) {
        this.post = this.$store.getters['posts/getPostInfo'](this.postItemData.id)
      }
    })

    this.$store.subscribeAction({
      after: (action) => {
        if (action.type === 'posts/updateHiddenState' && action.payload.id === this.postItemData.id) {
          this.post = this.$store.getters['posts/getPostInfo'](this.postItemData.id)
        }
      }
    })
  }
}
</script>
