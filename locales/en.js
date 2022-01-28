import { config } from '~/config/config'

export default {
  imageShouldBeLessThanTwoMB: 'Image should be less than 2 MB',
  general: {
    title: `${config.appName}`,
    post: 'post',
    posts: 'posts',
    space: 'space',
    profile: 'profile',
    comment: 'comment',
    comments: 'comments',
    edit: 'Edit',
    new: 'New',
    follower: 'Follower',
    followers: 'Followers',
    following: 'Following',
    seeMore: 'See more',
    seeLess: 'See less',
    person: 'person',
    people: 'people',
    upload: 'Upload'
  },
  tabs: {
    following: 'following',
    followers: 'followers',
    upvotes: 'upvotes',
    downvotes: 'downvotes',
    posts: 'posts',
    spaces: 'spaces',
    feed: 'feed',
    article: 'article',
    video: 'video'
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
    replies: 'replies',
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
      waitSec: 'Wait a sec...',
      accountScreen: {
        message: 'Click on your account to sign in:',
        notLoginMessage: 'You need to sign in to access this functionality. Click on your account below:'
      },
      noAccountScreen: {
        message: 'No accounts found. Please open your <b>Polkadot extension</b> and create a new account or import existing. Then reload this page.',
        notLoginMessage: 'You need to sign in to access this functionality.'
      },
      noExtension: {
        message: '<span>Polkadot Extension</span> was not found or disabled. Install the extension with the button below.',
        notLoginMessage: 'To continue connect with <span>Polkadot Extension</span>. </br>Enable extension with the button below.',
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
    addComment: 'Add a comment...',
    addReply: 'Add a reply...'
  },
  forms: {
    validations: {
      required: 'This field is required',
      numeric: 'The field may only contain numeric characters'
    },
    fieldName: {
      description: 'Description',
      postTitle: 'Post title',
      tags: 'Tags',
      videoUrl: 'Video URL',
      spaceProfileName: '{type} name'
    },
    placeholder: {
      postBody: 'Post body',
      tags: 'Press \'Enter\' or \'Tab\' key to add tags',
      postInSpace: 'Post in a space'
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
    hiddenSpace: 'This space is unlisted and only you can see it',
    emptyFeed: 'Your feed is empty. Try to follow more spaces ;)',
    uploadCoverImage: 'Upload cover image',
    dontHavePermissionToEditPost: 'You do not have permission to edit this post',
    dontHavePermissionToEditProfile: 'You do not have permission to edit this profile',
    dontHavePermissionToEditSpace: 'You do not have permission to edit this space',
    noPostYet: 'No posts yet',
    noSpaceYet: 'No spaces yet'

  },
  notificationItem: {
    message: 'and {count} other {message}',
    title: 'Notifications'
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
  drawer: {
    myProfile: 'My profile',
    editMyProfile: 'Edit my profile',
    settings: 'Settings',
    signOut: 'Sign Out',
    reactApp: 'React app',
    angularApp: 'Angular app',
    subsocialApp: 'Subsocial app',
    landingPage: 'Landing page',
    legalDocuments: 'Legal Documents',
    github: 'Github',
    whatIsSubsocial: 'What is Subsocial?',
    ourSocialLinks: 'Our social links:',
    language: 'Language'
  },

  // unused

  formHints: {
    whoCanPost: {
      space_owner: 'Only you can create and edit posts in this space.',
      follower: 'You and followers of this space can create and edit own posts.',
      everyone: 'Everyone can create and edit their own posts in this space.',
      none: 'None can create or edit posts in this space.'
    },
    embedded: 'You can embed links from YouTube, Vimeo and SoundCloud.'
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
