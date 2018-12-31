<template>
  <article class="post">
    <header class="post__header">
      <a
        class="post__category"
        href="#"
      >
        {{ state.category }}
      </a>

      <p class="post__date">
        {{ state.date }}
      </p>

      <h2 class="post__title">
        {{ state.title }}
      </h2>
    </header>
    <div class="post__image">
      <img
        :src="state.image.src"
        :alt="state.image.decoration"
      >
    </div>

    <div
      class="post__content"
      v-html="state.content"
    />

    <footer class="post__footer">
      <ul class="tags">
        <li
          v-for="tag in state.tags"
          :key="tag"
          class="tags__item"
        >
          #{{ tag }}
        </li>
      </ul>
    </footer>

    <Comments />
  </article>
</template>

<script>
import { mapState } from 'vuex'
import store from '../store/index'
import Comments from '../components/Comments.vue'

export default {
  store,

  components: { Comments },

  computed: {
    ...mapState({
      state: state => state.post
    })
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
@import '../assets/scss/helperMixins';

.post__category, .post__date {
  font-size: 0.6em;
  @include breakpoint(XS) {
    font-size: 15px;
  }
  @include breakpoint(S) {
    font-size: 18px;
  }
  @include breakpoint(L) {
    font-size: 14px;
  }
}
.post__category {
  color: $c_text--inverse;
  position: absolute;
  text-decoration: none;
  @include breakpoint(min-L) {
    padding: 12px 14px;
    right: 0;
    top: 0;
  }
  @include breakpoint(L) {
    padding: 10px;
    right: -12px;
    top: 20px;
  }
  &:link, :visited {
    background: $c_accent;
  }
  &:hover {
    background: $c_accent--light;
  }
  &:active {
    background: $c_accent--dark;
  }
}
.post__date {
  color: $c_text--light;
  font-weight: 700;
  @include breakpoint(XS) {
    margin-top: 40px;
  }
  @include breakpoint(S) {
    margin-top: 50px;
  }
  @include breakpoint(L) {
    margin-top: 60px;
  }
}
.post__title {
  border-bottom: 2px solid $c_separator;
  color: $c_text--dark;
  font-weight: 700;
  line-height: 1.3;
  @include breakpoint(XS) {
    font-size: 24px;
  }
  @include breakpoint(S) {
    font-size: 32px;
  }
  @include breakpoint(min-L) {
    padding: 1em 0 1.3em;
  }
  @include breakpoint(L) {
    font-size: 40px;
    margin-bottom: 48px;
    padding: 24px 0 48px;
  }
}
.post__image {
  margin: 2rem 0 3rem;
  text-align: center;
  @include breakpoint(XS) {
    margin: 32px 0 50px;
  }
  @include breakpoint(S) {
    margin: 50px 0 56px;
  }
  @include breakpoint(L) {
    float: left;
    margin: 0 24px 24px 0;
  }
}
.post__content {
  line-height: 1.75;
  p, blockquote {
    margin-bottom: 1.25em;
  }
  blockquote {
    border-left: 2px solid $c_separator;
    color: rgba($c_text--dark, 0.4);
    font-size: 1.1em;
    padding-left: 1.25em;
  }
}
.tags {
  color: rgba($c_text--dark, 0.3);
  display: flex;
  margin-bottom: 50px;
  @include breakpoint(L) {
    font-size: 15px;
    justify-content: flex-end;
  }
}
.tags__item:not(:last-child) {
  margin-right: 0.75em;
}
</style>
