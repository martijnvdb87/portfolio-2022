<script setup lang="ts">
import { computed, watchEffect, ref } from "vue";
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

const videoProvider = ref("");
const videoSource = ref("");
const videoKey = ref("");
const videoStartAt = ref("");
const videoThumbnail = ref("");

const started = ref(false);

watchEffect(() => {
  let match;

  // YouTube URL match
  match = props.src.match(/\:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([a-zA-Z0-9-_]+)(?:(?:\&t=|\?t=|\?start=)(\d+))?/);
  if(match?.length == 3) {
    videoProvider.value = 'youtube';
    videoKey.value = match[1];
    videoStartAt.value = match[2];

    videoSource.value = `https://www.youtube-nocookie.com/embed/${videoKey.value}?autoplay=1`;
    videoThumbnail.value = `https://img.youtube.com/vi/${videoKey.value}/maxresdefault.jpg`;
    return;
  }

  // Vimeo URL match
  match = props.src.match(/:\/\/(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)(?:#t=(\d+?)s)?/);
  if(match?.length == 3) {
    videoProvider.value = 'vimeo';
    videoKey.value = match[1];
    videoStartAt.value = match[2];

    videoSource.value = `https://player.vimeo.com/video/${videoKey.value}?autoplay=1`;

    fetch(`https://vimeo.com/api/v2/video/${videoKey.value}.json`)
      .then(data => data.json())
      .then(data => {
        videoThumbnail.value = data[0].thumbnail_large;
      });

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
    @click="play"
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
    <img
      class="video-player__thumbnail"
      :src="videoThumbnail"
    />
    <iframe
      v-if="started"
      class="video-player__video"
      :src="videoSource"
      frameborder="0"
      allow="autoplay; fullscreen; picture-in-picture" allowfullscreen
    ></iframe>
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
    .video-player__thumbnail {
      @apply opacity-0;
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

.video-player__thumbnail {
  @apply h-full w-full absolute left-0 top-0 z-10 duration-1000 transition-all opacity-95 pointer-events-none object-contain;
}

.video-player__video {
  @apply h-full w-full absolute left-0 top-0;
}
</style>