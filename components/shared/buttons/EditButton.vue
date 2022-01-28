<template>
  <div class="edit-btn">
    <NuxtLink :to="localePath(link)">
      <v-icon size="15" class="btn-color">
        mdi-pencil-outline
      </v-icon>
    </NuxtLink>
  </div>
</template>

<style lang="scss">
.edit-btn {
  border: 1px solid #EDEDED;
  box-sizing: border-box;
  border-radius: 44px;
  width: $buttons_width;
  height: $buttons_height;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .btn-color {
    color: $color_primary
  }

  a {
    text-decoration: none;
  }

  &:hover {
    background: $color_primary;
    i {
      color: $color_white !important;
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
}
</script>
