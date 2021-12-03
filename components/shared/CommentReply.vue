<template>
  <div class="reply-container">
    <Avatar :id="id" :size="36" :src="avatarSrc" />
    <div class="text-area-wp">
      <v-textarea
        ref="reply-input"
        v-model="comment"
        auto-grow
        outlined
        rows="1"
        row-height="15"
        @focus="showButton"
        @focusout="hideButton"
      />
      <span v-if="!showBtn" class="placeholder">Add a reply...</span>
      <v-btn v-if="showBtn" :disabled="!comment.length" class="send-button">
        Send
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss">
.reply-container {
  display: flex;
  margin: 10px 0 0 8px;

  .text-area-wp {
    width: 100%;
    margin-left: 8px;
  }

  .send-button {
    background-color: #EB2F96 !important;
    border-radius: 4px;
    width: 78px;
    height: 36px;
    color: #fff;
    text-align: center;
    font-weight: normal;

    &.v-btn.v-btn--disabled:disabled {
      background-color: #F597CA!important;
      color: #fff !important;
    }
  }
}
</style>

<script>
export default {
  name: 'CommentReply',

  props: {
    id: {
      type: String
    },
    avatarSrc: {
      type: String
    },
    handle: {
      type: String
    }
  },

  data () {
    return {
      comment: '',
      showBtn: false
    }
  },

  mounted () {
    this.$refs['reply-input'].focus()
  },

  methods: {
    showButton () {
      if (!this.comment.length) {
        this.showBtn = true
      }
    },
    hideButton () {
      if (!this.comment.length) {
        this.showBtn = true
      }
    }
  }

}
</script>
