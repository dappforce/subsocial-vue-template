<template>
  <div class="edit-btn" @click="onClick">
    <v-icon size="15" class="btn-color">
      mdi-pencil-outline
    </v-icon>
  </div>
</template>

<style lang="scss">
.edit-btn {
  border: 1px solid $button_outline_gray;
  box-sizing: border-box;
  border-radius: 44px;
  width: $buttons_width;
  height: $buttons_height;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .btn-color {
    color: $text_color_primary
  }

  a {
    text-decoration: none;
  }

  &:hover {
    background: $button_bg_primary;
    i {
      color: $text_color_white !important;
    }
  }
}

</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class EditButton extends Vue {
  @Prop({
    type: String
  }) link!: string

  onClick () {
    if (this.$store.state.profiles.currentUser) {
      this.$router.push(this.$nuxt.localePath(this.link))
    }
  }
}
</script>
