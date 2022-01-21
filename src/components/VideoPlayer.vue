<script setup lang="ts">
import { computed, defineProps } from "vue";
import Icon from "./Icon.vue";

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false,
    default: "Video player"
  },
  width: {
    type: String,
    required: false,
    default: "512",
    validator: (value: number) => !isNaN(value)
  },
  height: {
    type: String,
    required: false,
    default: "288",
    validator: (value: number) => !isNaN(value)
  },
});

const source = computed(() => {
  let source = "";

  // YouTube URL match
  let match = props.src.match(/\:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([a-zA-Z0-9-_]+)(?:(?:\&t=|\?t=|\?start=)(\d+))?/);
  if(match?.length == 3) {
    source = `https://www.youtube-nocookie.com/embed/${match[1]}`;

    if(match[2]) source += `?start=${match[2]}`;

    return source;
  }

  return source;
});

const paddingBottom = computed(() => (parseInt(props.height) / parseInt(props.width)) * 100);
</script>

<template>
  <div
    :style="`width: ${width}px;`"
    class="video-player__container"
  >
    <div
      :style="`padding-bottom: ${paddingBottom}%;`"
      class="video-player__player"
    >
    <span class="video-player__play">
      <Icon />
    </span>
      <iframe
        class="video-player__iframe"
        :width="width"
        :height="height"
        :src="source"
        :title="title"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<style scoped lang="scss">
.video-player__container {
  @apply m-auto mb-6;
}

.video-player__player {
  @apply relative rounded-lg overflow-hidden;
}

.video-player__play {
  @apply absolute inset-1/2 z-10 w-20 h-20 bg-red-500 text-white rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none;
}

.video-player__iframe {
  @apply absolute top-0 left-0 h-full w-full border-0;
}
</style>