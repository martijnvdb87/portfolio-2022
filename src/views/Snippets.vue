<script setup lang="ts">
import { ref, computed } from "vue";
import snippets, { Snippet } from "./../snippets";
import fuzzysort from "fuzzysort";

import CodeBlock from "../components/CodeBlock.vue";

const allSnippets = snippets.map(snippet => ({
  search: snippet.data.map(part => Object.values(part).join(" ")).join(" "),
  snippet
}));

const search = ref("");

const filteredSnippets = computed(() => search.value == "" ? allSnippets.map(snippet => snippet.snippet) : fuzzysort.go(search.value, allSnippets, {key: "search"}).map(result => result.obj.snippet));

</script>

<template>
<div>
  <input type="text" v-model="search">
  <article v-for="(snippet, snippetIndex) in filteredSnippets" :v-key="`snippet-${snippetIndex}`">
    {{snippet.id}}
    <div v-for="(part, partindex) in snippet.data" :v-key="`part-${partindex}`">
      {{part.title}}
      {{part.content}}
      <CodeBlock v-if="part.code">
        <textarea>{{part.code}}</textarea>
      </CodeBlock>
    </div>
  </article>
</div>
</template>

<style scoped lang="scss">
</style>