import { config } from '~/config/config'

export default {
  imageShouldBeLessThanTwoMB: 'Image should be less than 2 MB',
  general: {
    title: `${config.appName}`,
    post: 'post',
    space: 'space',
    comment: 'comment',
    edit: 'Edit',
    new: 'New',
    follower: 'Follower',
    followers: 'Followers'
  },
  tabs: {
    following: 'FOLLOWING',
    followers: 'FOLLOWERS',
    upvotes: 'upvotes',
    downvotes: 'downvotes',
    posts: 'posts',
    spaces: 'spaces',
    feed: 'feed'
  },
  buttons: {
    cancel: 'Cancel',
    save: 'Save',
    close: 'Close',
    copy: 'Copy',
    newPost: 'New post',
    createAPost: 'Create a post',
    sendTips: 'Send tips',
    following: 'Following',
    follow: 'Follow',
    editComment: 'Edit comment',
    viewReactions: 'View reactions',
    viewOnIPFS: 'View on IPFS',
    reply: 'Reply',
    send: 'Send',
    update: 'Update',
    share: 'Share',
    signIn: 'Sign In',
    hide: 'Hide',
    makeVisible: 'Make visible',
    upvote: 'Upvote',
    downvote: 'Downvote',
    writePost: 'Write post',
    editSpace: 'Edit space',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
    resetForm: 'Reset form',
    createPost: 'Create post'
  },
  modals: {
    tips: {
      title: 'Send tips to',
      availableBalance: 'Available Balance',
      inputPlaceholder: 'Enter amount'
    },
    infinityScroll: {
      noReactionsYet: 'No reactions yet',
      noDataYet: 'No data yet'
    },
    adblock: {
      title: 'Uh oh, it looks like you are using an ad blocker.',
      subtitle: 'This may affect the display of content on our site. We recommend turning it off to use the entire functionality of the site.',
      button: 'Done! Reload page'
    },
    connections: {
      connections: 'Connections'
    },
    likes: {
      reactions: 'Reactions',
      reaction: 'Reaction'
    },
    qrCode: {
      title: 'Account address'
    },
    login: {
      title: 'Sign In',
      accountScreen: {
        message: 'Click on your account to sign in:'
      },
      noAccountScreen: {
        message: 'No accounts found. Please open your <b>Polkadot extension</b> and create a new account or import existing. Then reload this page.'
      },
      noExtension: {
        message: '<span>Polkadot Extension</span> was not found or disabled. Install the extension with the button below.',
        installForChrome: 'Install for Chrome',
        installForFirefox: 'Install for Firefox',
        needHelp: 'Need help? Read our',
        signInGuide: 'Sign In Guide'
      }
    }
  },
  snackbars: {
    addressCopied: 'Address copied!',
    cannotCopy: 'Cannot copy'
  },
  post: {
    sharePost: 'Share post',
    addComment: 'Add a comment...'
  },
  forms: {
    validations: {
      required: 'This field is required',
      numeric: 'The field may only contain numeric characters'
    },
    fieldName: {
      description: 'Description',
      tags: 'Tags'
    },
    placeholder: {
      postBody: 'Post body',
      tags: 'Press \'Enter\' or \'Tab\' key to add tags'
    },
    permissions: {
      whoCanPost: {
        space_owner: 'Only you can post',
        follower: 'Followers can post',
        everyone: 'Everyone can post'
      }
    }
  },
  generalMessages: {
    hiddenPostBySpace: 'This post is not visible because its space is hidden',
    hiddenPost: 'This post is unlisted and only you can see it',
    emptyFeed: 'Your feed is empty. Try to follow more spaces ;)'
  },

  formHints: {
    whoCanPost: {
      space_owner: 'Only you can create and edit posts in this space.',
      follower: 'You and followers of this space can create and edit own posts.',
      everyone: 'Everyone can create and edit their own posts in this space.',
      none: 'None can create or edit posts in this space.'
    },
    embedded: 'You can embed links from YouTube, Vimeo and SoundCloud.'
  },

  notifications: {
    AccountFollowed: 'followed your account',
    SpaceFollowed: 'followed your space',
    SpaceCreated: 'created a new space',
    CommentCreated: 'commented on your post',
    CommentReplyCreated: 'replied to your comment on',
    PostShared: 'shared your post',
    CommentShared: 'shared your comment on',
    PostReactionCreated: 'reacted to your post',
    CommentReactionCreated: 'reacted to your comment on'
  },
  activities: {
    AccountFollowed: 'followed the account',
    SpaceFollowed: 'followed the space',
    SpaceCreated: 'created the space',
    PostCreated: 'created the post',
    PostSharing: 'shared the post',
    PostShared: 'shared the post',
    CommentCreated: 'commented on the post',
    CommentShared: 'shared a comment on',
    CommentReplyCreated: 'replied to a comment on',
    PostReactionCreated: 'reacted to the post',
    CommentReactionCreated: 'reacted to a comment on'
  },
  statistics: {
    AccountFollowed: 'Accounts followed',
    SpaceFollowed: 'Spaces followed',
    SpaceCreated: 'Spaces created',
    PostCreated: 'Posts created',
    PostSharing: 'Posts shared',
    'PostShared,CommentShared': 'Posts shared',
    // TODO: change keys
    'CommentCreated,CommentReplyCreated': 'Comments created',
    'PostReactionCreated,CommentReactionCreated': 'Upvotes + downvotes'
  },
  connectingToNetwork: 'Connecting to the network...',
  waitingForTx: 'Waiting for transaction to complete.',
  faucet: {
    button: {
      request: 'Request tokens',
      topUp: 'Top up balance'
    }
  },
  supportedAccounts: 'We support addresses of any Substrate-based chain: Polkadot, Kusama, Acala, Plasm, Edgeware, etc.',
  kusama: {
    verifiedIdentity: 'Verified Kusama identity',
    unverifiedIdetity: 'Kusama identity'
  },
  postPage: {
    originalPost: 'Original post:'
  },
  spaces: {
    offical: {
      officialSpace: 'Official space',
      unclaimedSpace: 'Claim ownership is pending'
    }
  },
  errors: {
    maintenance: `${config.appName} is currently offline for maintenance, but will be back soon.`
  }
}
