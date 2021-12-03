<template>
  <div class="edit-btn">
    <NuxtLink :to="link">
      <v-icon size="15" color="#EB2F96">
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
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  cursor: pointer;

  a {
    text-decoration: none;
  }

  &:hover {
    background: #EB2F96;
    i {
      color: #fff !important;
    }
  }
}

</style>

<script>
export default {
  name: 'EditButton',

  props: {
    link: {
      type: String
    }
  }
}
</script>
