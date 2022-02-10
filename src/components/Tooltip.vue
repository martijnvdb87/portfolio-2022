<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: String,
    default: "sdfsdf"
  },
  clicked: {
    type: String
  },
  position: {
    type: String,
    default: "bottom",
    validator(value: string) {
      return ["top", "right", "bottom", "left"].includes(value);
    }
  }
});

const badgeValue = computed(() => props.value);

const click = () => {
  alert()
}

</script>

<template>
  <span :class="['tooltip', `tooltip--${props.position}`]" @click="click">
    <slot />
    <div class="tooltip__badge">
      {{badgeValue}}
    </div>
  </span>
</template>

<style scoped lang="scss">
.tooltip {
  @apply relative h-full w-full;
  display: inherit;
  flex: inherit;
  align-items: inherit;
  justify-content: inherit;

  &__badge {
    @apply absolute whitespace-nowrap pointer-events-none px-3 py-2 rounded-md text-xs opacity-0 bg-slate-800 duration-200 delay-100 transition-all;
  }

  &:hover .tooltip__badge {
    @apply opacity-100 delay-300 transform-none;
  }

  &--top .tooltip__badge {
    @apply bottom-full translate-y-4 mb-2;
  }

  &--right .tooltip__badge {
    @apply left-full -translate-x-4 ml-2;
  }

  &--bottom .tooltip__badge {
    @apply top-full -translate-y-4 mt-2;
  }

  &--left .tooltip__badge {
    @apply right-full translate-x-4 mr-2;
  }
}
</style>