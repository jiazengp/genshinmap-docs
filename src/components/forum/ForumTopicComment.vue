<template>
  <div
    class="topic-comment-item rounded-md flex mt-.5"
    :class="style[size].container"
  >
    <div :class="style[size].leftWidth">
      <Avatar
        :src="author.avatar"
        :alt="author.username"
        :size="style[size].avatarSize"
      />
    </div>
    <div
      class="flex flex-col w-[calc(100%-40px)]"
      :class="style[size].contentContainer"
    >
      <div class="title flex" :class="style[size].header">
        <p class="font-size-3.5">{{ author.username }}</p>

        <ForumRoleBadge :type="role" />
      </div>

      <article
        class="content mt-3 font-size-3.5"
        :class="style[size].content"
        v-html="body.text"
      ></article>

      <div class="topic-content-img flex mt-4" v-if="body?.images">
        <Image
          v-for="img in body.images"
          :key="img.src"
          :src="img.src"
          :alt="img.alt"
          class="max-h-24 mr-4 rounded-sm"
        />
      </div>

      <div class="comment-info mt-2">
        <ForumCommentMeta
          :repo="repo"
          :created-at="createdAt"
          :comment-id="commentId"
          :author-id="author.id"
          :comment-click-handler="commentClickHandler"
        />
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type ForumAPI from '@/apis/forum/api'
import { computed } from 'vue'
import ForumRoleBadge from './ForumRoleBadge.vue'
import { Image } from '@/components/ui/image'
import ForumCommentMeta from './ForumCommentMeta.vue'
import { useRuleChecks } from '~/composables/useRuleChecks'

const {
  size = 'normal',
  repo = 'Feedback',
  topicAuthorId,
  author,
  ...props
} = defineProps<{
  repo: string
  body: ForumAPI.Content
  topicId: string | number
  topicAuthorId: string | number
  createdAt: string
  commentId: string | number
  author: ForumAPI.User
  tags?: ForumAPI.TopicTags
  size?: 'small' | 'normal'
  commentClickHandler: Function
}>()

const { isOfficial } = useRuleChecks()

const role = computed(() => {
  if (topicAuthorId === author.id) return 'author'
  if (isOfficial(author.id).value) return 'official'
  return null
})

const style = {
  small: {
    container: 'py-3',
    avatarSize: 'sm',
    leftWidth: 'w-[40px] mr-4',
    header: 'mt-1',
    contentContainer: '',
    content: 'line-clamp-3 overflow-hidden pr-4',
  },
  normal: {
    container: '',
    contentContainer: 'border-b-1 border-[var(--vp-c-divider)] pb-3',
    avatarSize: 'md',
    leftWidth: 'w-[64px] mr-2',
    header: 'mt-2',
    content: 'break-words font-size-3.75 line-height-[24px] break-all',
  },
}
</script>

<style>
.topic-comment-item:hover
  > div
  > .comment-info
  > div
  > .topic-info-list
  > .topic-btn-more {
  opacity: 1 !important;
  word-break: break-word;
}
</style>
