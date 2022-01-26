<script setup lang="ts">
//import Prism from 'prismjs';


// PrismJS
import './../scripts/prism.js';
import './../styles/prism.scss';

import { ref, onMounted } from 'vue';
import { Languages } from 'prismjs';

window.Prism.plugins.customClass.prefix('code-block__');

const html = ref("");
const input = ref(null);

const props = defineProps({
  lang: {
    type: String,
    required: false,
    default: 'html'
  }
});


onMounted(() => {
  if(input.value) {
    let inputHtml: string = ((input.value as HTMLElement).children[0] as HTMLTextAreaElement).value;

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

    html.value = window.Prism.highlight(inputHtml, window.Prism.languages[(props.lang as keyof Languages)], (props.lang as string));
  }
});

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
  />
</div>
</template>

<style lang="scss" scoped>
.code-block {
    @apply text-gray-300 mb-6;
}
.code-block__input {
}
.code-block__output {
  @apply bg-slate-700 px-10 py-8 rounded-lg overflow-auto;
}
</style>