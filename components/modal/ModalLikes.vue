<template>
  <div data-app>
    <v-dialog
      v-model="openModal"
      max-width="500px"
      @click:outside="clickOutside"
    >
      <v-card class="v-modal-container">
        <v-card-title>
          {{reactions.length | numeral('0,0a')}} {{$tc('plural.'+i18nextKey(reactions.length, 'reaction'))}}

          <v-icon class="close-icon" @click="onClick">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card>
          <v-tabs
            v-if="upvote && downvote"
            v-model="activeTab"
            grow
            centered
          >
            <v-tabs-slider class="slider-color" />
            <v-tab
              v-for="(i, index) in tabs"
              :key="i"
              :href="`#tab-${i}`"
            >
              {{ i }} <span class="votes-count">{{ index === 0 ? upvote.length : downvote.length }}</span>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="activeTab">
            <v-tab-item
              v-for="(i, index) in tabs"
              :key="i"
              :value="`tab-${i}`"
            >
              <v-card flat>
                <v-card-text>
                  <ModalInfinityScrollContainer :user-ids="index === 0 ? upvote : downvote" />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss">
.v-modal-container {
  .v-card__title {
    display: flex;
    justify-content: space-between;
  }

  .v-sheet.v-card {
    box-shadow: none;
  }

  .votes-count {
    font-weight: 400;
    padding-left: 10px;
  }

  .v-tab--active {
    color: $text_color_primary;
  }

  .v-tabs {
    box-shadow: $box_shadow_for_tabs;
    position: relative;
    z-index: 1;
  }

  .slider-color {
    color: $slider_color;
  }

  .v-tabs-items {
    padding-bottom: 0;
    .v-card {
      overflow: hidden;
      min-height: 200px;
      max-height: 500px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        box-shadow: none;
      }

      &::-webkit-scrollbar-thumb {
        background-color: $scroll_outline_gray;
        width: 6px;
      }
    }
  }
}

</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { toI18next } from '~/utils/utils'

@Component
export default class ModalLikes extends Vue {
  @Prop({
    type: Boolean,
    default: false
  }) isModal!: boolean

  @Prop({
    type: String
  }) postId!: string

  @Prop({
    type: String
  }) accountId!: string

  openModal: boolean = false
  users: undefined
  tabs: string[] = [this.$t('tabs.upvotes') as string, this.$t('tabs.downvotes') as string]
  activeTab: string = ''
  currentUser: undefined
  reactions: any = []
  upvote: string[] = []
  downvote: string[] = []

  @Watch('isModal')
  isModalHandler () {
    this.openModal = !this.openModal
  }

  created (): void {
    this.users = this.$store.state.profiles.list
    this.currentUser = this.$store.state.profiles.currentUser
    this.activeTab = this.tabs[0]
    this.$store.dispatch('reaction/getPostReactionIdsByAccount', { postId: this.postId }).then((data) => {
      this.reactions = data
      data.forEach((reaction: any) =>
        reaction.isUpvote
          ? this.upvote.push(reaction.profileId)
          : this.downvote.push(reaction.profileId)
      )
    })
  }

  onClick (): void {
    this.$nuxt.$emit('isModalClose-' + this.postId)
  }

  isUpvote (reaction: any): void {
    return reaction && reaction.kind.toString() === 'Upvote'
  }

  clickOutside (): void {
    this.$nuxt.$emit('isModalClose-' + this.postId)
  }

  i18nextKey (count: number, key: string): string {
    return toI18next(count, key, this.$i18n.locale)
  }
}
</script>
