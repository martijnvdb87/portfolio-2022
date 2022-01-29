<script setup lang="ts">
import Container from './../components/Container.vue';
import Header from './../components/Header.vue';
import VideoPlayer from '../components/VideoPlayer.vue';
import CodeBlock from '../components/CodeBlock.vue';
</script>

<template>
  <Container>
      <Header type="h1">Phasellus tincidunt molestie</Header>
    <p>Lorem ipsum dolor sit amet, <code>&lt;consectetur&gt;</code> adipiscing elit. Mauris volutpat venenatis tincidunt. Fusce purus sem, ornare sit amet sodales et, dictum at lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam pellentesque neque nec molestie bibendum. Nam convallis euismod ipsum, quis vestibulum ligula finibus porta. Aliquam ullamcorper sed ipsum nec pretium. Duis accumsan id turpis ut tempor. Sed ac est hendrerit, semper mauris a, luctus dolor. Proin facilisis sit amet sem in scelerisque. Etiam commodo scelerisque rutrum. Ut id enim rutrum, tincidunt nisi at, tempor tellus. Praesent posuere nisl turpis, ac viverra urna viverra in. Sed laoreet elit libero, non pharetra urna finibus commodo. Integer ut eros ligula. Donec quis finibus odio.</p>
    <VideoPlayer src="https://www.youtube.com/embed/Xg9ihH15Uto" />
    <VideoPlayer src="https://vimeo.com/666201451" />
    <VideoPlayer src="https://www.youtube.com/watch?v=uBY1AoiF5Vo" />
    <CodeBlock lang="html">
      <textarea>
<html>
  <head></head>
  <body>
    <div>
      xxx
    </div>
  </body>
</html>
      </textarea>
    </CodeBlock>

    <CodeBlock lang="css">
      <textarea>
.css {
  border: none;
}
      </textarea>
    </CodeBlock>

    <CodeBlock lang="javascript">
      <textarea>
const yay = 'test';
const x = () => {
  return `12345 ${yay}`;
}
      </textarea>
    </CodeBlock>
    <p>Vestibulum velit risus, semper sit amet pellentesque vel, condimentum sed risus. Curabitur rhoncus ante ut congue eleifend. Duis congue ultrices mi sed ullamcorper. Suspendisse potenti. Mauris non pulvinar erat. Aliquam erat volutpat. Fusce sodales metus at nunc tincidunt tempor. Vestibulum vestibulum massa lacus, vitae condimentum mi ultrices ac. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam pharetra ante tincidunt mollis pellentesque. Fusce imperdiet dictum felis a vulputate. Suspendisse non placerat ante. Suspendisse felis metus, faucibus a porta a, efficitur sit amet metus. Morbi non velit et arcu lacinia volutpat nec in nunc. Donec volutpat dolor at sem dictum consequat. Pellentesque eu mi porttitor, maximus ante non, pharetra lacus.</p>
  </Container>
</template>

<style lang="scss">

</style>