<script setup lang="ts">
const props = defineProps({
  value: {
    type: String,
    default: "sdfsdf"
  },
  position: {
    type: String,
    default: "bottom",
    validator(value: string) {
      return ["top", "right", "bottom", "left"].includes(value);
    }
  }
});

</script>

<template>
  <span :class="['tooltip', `tooltip--${props.position}`]">
    <slot />
    <div class="tooltip__badge">
      {{props.value}}
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
    @apply absolute whitespace-nowrap pointer-events-none opacity-0 duration-100 transition-all;
  }

  &:hover .tooltip__badge {
    @apply opacity-100 transform-none;
  }

  &--top .tooltip__badge {
    @apply bottom-full;
  }

  &--right .tooltip__badge {
    @apply left-full;
  }

  &--bottom .tooltip__badge {
    @apply top-full;
  }

  &--left .tooltip__badge {
    @apply right-full;
  }
}
</style>