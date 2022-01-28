<template>
  <div v-if="post" class="post-item-wp">
    <v-card
      elevation="2"
      class="post-item"
    >
      <div v-if="post.hiddenSpace && isPostOwner" class="hidden-post">
        <div class="alert-text">
          <v-icon color="#EFB041">
            mdi-alert-circle
          </v-icon>{{ $t('generalMessages.hiddenPostBySpace') }}
        </div>
        <div class="unhidden-btn">
          <span class="make-visible">
            <ToggleVisibilityButton :space="{struct: {id: post.spaceId, hidden: post.hiddenSpace}}" :toggle-type="'space'" />
          </span>
        </div>
      </div>

      <div v-if="post.hidden && isPostOwner" class="hidden-post">
        <div class="alert-text">
          <v-icon color="#EFB041">
            mdi-alert-circle
          </v-icon>{{ $t('generalMessages.hiddenPost') }}
        </div>
        <div class="unhidden-btn">
          <span class="make-visible">
            <ToggleVisibilityButton :post="post" :toggle-type="'post'" />
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
              <OptionButton :post-id="post.id" :account-id="post.ownerId" :post="post" :can-edit="isPostOwner" :toggle-type="'post'" />
            </div>
          </div>
          <Title size="large" :link="post.postLink" :name="post.title" />
          <Youtube v-if="post.link" :link="post.link" />
          <Paragraph
            v-if="post.summary.length"
            :text="post.summary"
            :is-show-more="post.isShowMore"
            :link="post.postLink"
            margin-top="10"
          />
        </div>

        <PostImage :image-src="post.imageUrl" :link="post.postLink" />
      </div>
      <v-divider
        v-if="!isSharedPost"
        class="mx-4"
      />
      <div v-if="!isSharedPost" class="action-panel-wp">
        <ActionPanel :id="post.id" :is-show-label="false" :handle="post.ownerId" :post="post" />
      </div>
    </v-card>
  </div>
</template>

<style lang="scss">
.post-item-wp {
  width: 100%;
  margin-top: $space_normal;

  .hidden-post {
    margin: (-$space_normal) (-$space_normal) $space_normal;
    height: 40px;
    background: #FEFBE8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 $space_normal;
    color: $color_font_normal;
    font-size: $font_small;
    border-bottom: 1px solid $color_warning_border;

    .v-icon {
      margin-right: 10px;
    }

    .make-visible {
      border: 1px solid #D9D9D9;
      box-sizing: border-box;
      border-radius: $border_small;
      color: $color_font_normal;
      font-weight: 500;
      line-height: 125%;
      padding: 3px 5px;
      transition: all .2s ease;

      &:hover {
        cursor: pointer;
        color: $color_primary;
      }
    }
  }

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
