<script setup lang="ts">
import { computed, watchEffect, ref } from "vue";
import Icon from "./../Icon.vue";
import YouTube from "./YouTube.vue";

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

const videoProvider = ref(null);
const videoKey = ref(null);
const videoStartAt = ref(null);

const started = ref(false);

watchEffect(() => {
  // YouTube URL match
  let match = props.src.match(/\:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([a-zA-Z0-9-_]+)(?:(?:\&t=|\?t=|\?start=)(\d+))?/);
  if(match?.length == 3) {
    videoProvider.value = 'youtube';
    videoKey.value = match[1];
    videoStartAt.value = match[2];
    return;
  }
});

const paddingBottom = computed(() => (parseInt(props.height) / parseInt(props.width)) * 100);

const play = () => {
  started.value = true;
}
</script>

<template>
  <div
    :style="`width: ${width}px;`"
    :class="[
      'video-player',
      {'video-player--started': started}
      ]"
  >
    <div
      :style="`padding-bottom: ${paddingBottom}%;`"
      class="video-player__player"
    >
    <div
      class="video-player__play-overlay"
    >
      <span class="video-player__play-button">
        <Icon name="play" class="text-white w-12 h-12" />
      </span>
    </div>
    <YouTube
      v-if="videoProvider == 'youtube'"
      :id="videoKey"
      :startAt="videoStartAt"
      @started="play"
    />
    </div>
  </div>
</template>

<style scoped lang="scss">
.video-player {
  @apply m-auto mb-6;

  &--started {
    .video-player__play-overlay {
      @apply opacity-0 scale-150;
    }
  }
}

.video-player__player {
  @apply relative rounded-lg overflow-hidden bg-black cursor-pointer;
}

.video-player__play-overlay {
  @apply flex items-center justify-center absolute z-20 top-0 left-0 w-full h-full ease-in-out duration-1000 transition-all pointer-events-none;
}

.video-player__play-button {
  @apply flex items-center justify-center w-20 h-20 bg-red-500 text-white rounded-full transition-all shadow-xl;
}

.video-player__player:hover {
  .video-player__play-button {
    @apply scale-110;
  }
}

.video-player__iframe {
  @apply absolute top-0 left-0 h-full w-full border-0;
}
</style>