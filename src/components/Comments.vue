<template>
  <!-- Element hosting the component -->
  <section class="comments">
    <!-- Component title -->
    <h3 class="comments__title">
      Comments
    </h3>

    <!-- Comments items -->
    <div
      v-for="comment in state.comments"
      :key="comment.date"
      class="comment"
    >
      <!-- User avatar -->
      <div class="comment__avatar">
        <img
          v-if="comment.avatar"
          :src="comment.avatar"
          :alt="comment.name"
          class="comment__avatar-img"
        >
        <span
          v-else
          class="comment__avatar-placeholder fa fa-user"
        />
      </div>

      <!-- Comment title -->
      <div class="comment__title">
        <span class="comment__author">
          {{ comment.user.name }}
        </span>
        <span class="comment__date">
          {{ comment.date }}
        </span>
      </div>

      <!-- Comment content -->
      <div class="comment__text">
        {{ comment.text }}
      </div>
    </div>
    <!-- END - Comments items -->
  </section>
  <!-- END - Element hosting the component -->
</template>

<script>
import { mapState } from 'vuex'
import store from '../store/index'

export default {
  store,

  computed: {
    ...mapState({
      state: state => state.comments
    })
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
@import '../assets/scss/helperMixins';

// Element hosting the component
.comments {
  padding: 40px 0;
  position: relative;

  // Top separator
  &::before {
    background: $c_separator;
    content: '';
    display: block;
    height: 1px;
    position: absolute;
    top: 0;
    width: 100%;
    @include breakpoint(XS) {
      width: calc(100% + 50px);
      left: -25px;
    }
    @include breakpoint(S) {
      width: calc(100% + 100px);
      left: -50px;
    }
    @include breakpoint(L) {
      width: calc(100% + 196px);
      left: -98px;
    }
  }
}

// Component title
.comments__title {
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 24px;
}

// Comments items
.comment {
  display: grid;
  @include breakpoint(XS) {
    grid-template:
      [row1-start] "avatar title" 20px [row1-end]
      [row2-start] "avatar title" 20px [row2-end]
      [row3-start] "text text" [row3-end]
      / 40px auto;
    font-size: 16px;
  }
  @include breakpoint(S) {
    grid-template:
      [row1-start] "avatar title" [row1-end]
      [row2-start] "avatar text" [row2-end]
      / 50px auto;
    font-size: 18px;
  }
  margin-bottom: 2rem;
}

// User avatar
.comment__avatar {
  align-items: center;
  background: $c_menu-txt--active;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  grid-area: avatar;
  overflow: hidden;
  @include breakpoint(XS) {
    height: 40px;
    width: 40px;
  }
  @include breakpoint(S) {
    height: 50px;
    width: 50px;
  }
}
.comment__avatar-placeholder {
  color: $c_accent--dark;
  font-size: 3rem;
  margin-bottom: -1rem;
}

// Comment title
.comment__title {
  grid-area: title;
  margin-left: 1rem;
  @include breakpoint(XS) {
    align-self: center;
  }
  @include breakpoint(S) {
    padding: 0 1rem 0.5rem;
  }
}
.comment__author {
  color: $c_accent--dark;
  font-weight: 700;
}
.comment__date {
  color: $c_text--light;
  font-size: 0.75rem;
  @include breakpoint(XS) {
    margin-top: 0.25rem;
    display: block;
  }
  @include breakpoint(S) {
    margin-left: 1rem;
  }
}

// Comment content
.comment__text {
  background: $c_separator;
  grid-area: text;
  line-height: 1.4;
  padding: 0.75rem 1rem;
  @include breakpoint(XS) {
    margin-top: 0.7rem;
  }
  @include breakpoint(S) {
    margin-left: 1rem;
  }
}
</style>
