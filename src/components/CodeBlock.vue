<script setup lang="ts">
// PrismJS
import './../scripts/prism.js';
import './../styles/prism.scss';

import Icon from "./Icon.vue";
import Tooltip from './Tooltip.vue';

import { ref, onMounted, onUpdated } from 'vue';

window.Prism.plugins.customClass.prefix('code-block__');

const html = ref("");
const input = ref(null);

const props = defineProps({
  lang: {
    type: String,
    required: false,
    default: 'html'
  },

  code: {
    type: String,
    required: false
  }
});


onMounted(() => {
  renderCode();
});

onUpdated(() => {
  renderCode();
});

const renderCode = () => {
  let inputHtml: string = '';

  if(props.code) {
    inputHtml = props.code;

  } else if(input.value) {
    inputHtml = ((input.value as HTMLElement).children[0] as HTMLTextAreaElement).value;
  }

  if(inputHtml) {
    let contentFound = false;
    let filtered = inputHtml.split('\n').filter(line => {
      if(contentFound || line.trim() != '') {
        contentFound = true;
        return true;
      }
    });

    contentFound = false;
    filtered = filtered.reverse().filter(line => {
      if(contentFound || line.trim() != '') {
        contentFound = true;
        return true;
      }
    });

    inputHtml = filtered.reverse().join('\n');

    html.value = window.Prism.highlight(inputHtml, window.Prism.languages[(props.lang as keyof any)], (props.lang as string));
  }
}

const renderedCode = ref("");

const copyToClipboard = () => navigator.clipboard.writeText((renderedCode.value as unknown as HTMLElement).innerText);

</script>

<template>
<div
  :class="[
    'code-block',
    `code-block--${props.lang}`
  ]"
>
  <div
    v-if="!html"
    class="code-block__input"
    ref="input"
  >
    <slot />
  </div>
  <pre
    v-if="html"
    v-html="html"
    class="code-block__output"
    ref="renderedCode"
  />
  <button
    type="button"
    class="code-block__copy-to-clipboard"
    @click="copyToClipboard"
  >
    <Tooltip value="Copy to clipboard" clicked="Copied" position="left">
      <Icon name="copy" />
    </Tooltip>
  </button>
</div>
</template>

<style lang="scss" scoped>
.code-block {
  @apply text-gray-300 mb-6 relative;

  &__output {
    @apply bg-slate-700 px-8 py-6 rounded-lg overflow-auto;
  }

  .icon {
    @apply duration-100 text-slate-400 w-4 h-4;
  }

  &__copy-to-clipboard {
    @apply w-10 h-10 rounded-lg rounded-full flex items-center justify-center absolute right-2 top-2 duration-100 transition-all;

    &:hover {
      @apply bg-slate-600;

      .icon {
        @apply text-slate-200;
      }
    }
  }
}
</style>