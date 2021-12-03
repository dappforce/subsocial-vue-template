import { Commit, Dispatch } from 'vuex'
import CommentService from '~/services/comment.service'
import { ReplyIdStruct } from '~/types/reply-id.type'
const SET_REPLY_IDS = 'SET_REPLY_IDS'

const commentService = new CommentService()

export interface CommentModel {
  replies: ReplyIdStruct[],
}

export const state = (): CommentModel => ({
  replies: []
})

export const mutations = {
  [SET_REPLY_IDS] (state: any, reply: {}) {
    state.replies = [...new Map(state.replies.concat(reply).map((item: ReplyIdStruct) =>
      [item.id, item])).values()]
  }
}

export const actions = {
  async getPostReplyId ({ dispatch, commit }: {dispatch: Dispatch, commit: Commit}, payload: string) {
    await commentService.getPostReplyId(payload).then((res) => {
      commit(SET_REPLY_IDS, { id: res.id, replyIds: res.replyIds, postId: payload })
      return res.replyIds
    })
  }
}
