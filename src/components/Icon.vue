<script setup lang="ts">
import { computed } from "vue";
import icon from "./../icons";

interface iconMap {
    [name: string]: string
}

const props = defineProps({
  name: {
    type: String,
    required: true
  }
});

const data = computed(() => (icon as iconMap)[props.name]);
</script>

<template>
  <svg
    v-if="data"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
    v-html="data"
  ></svg>
</template>

<style lang="scss">
.icon {
  @apply flex items-center justify-center w-6 h-6 text-black;
}
</style>