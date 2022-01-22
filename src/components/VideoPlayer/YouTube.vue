<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false,
    default: "YouTube video player"
  },
  startAt: {
    type: String,
    required: false
  },
});

const emit = defineEmits(["started"])

const started = ref(false);

const thumbnail = computed(() => `https://img.youtube.com/vi/${props.id}/maxresdefault.jpg`);
const source = computed(() => {
  let source = `https://www.youtube-nocookie.com/embed/${props.id}?autoplay=1`;
  return source;
});

const play = () => {
  started.value = true;
  emit("started");
}
</script>

<template>
  <div
    @click="play"
    :class="[
      'video-player__youtube',
      {'video-player__youtube--started': started}
    ]"
  >
    <img
      class="video-player__youtube-thumbnail"
      :src="thumbnail"
    />
    <iframe
      v-if="started"
      class="video-player__youtube-video"
      :src="source"
      :title="title"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style lang="scss">
.video-player__youtube {
  @apply absolute h-full w-full;

  &--started {
    .video-player__youtube-thumbnail {
      @apply opacity-0;
    }
  }
}

.video-player__youtube-thumbnail {
  @apply h-full w-full absolute left-0 top-0 z-10 duration-1000 transition-all delay-700 opacity-95 pointer-events-none;
}

.video-player__youtube-video {
  @apply h-full w-full absolute left-0 top-0;
}
</style>