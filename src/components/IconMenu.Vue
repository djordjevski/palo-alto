<template>
  <nav class="footer__social-media icon-menu">
    <ul class="icon-menu--list">
      <li
        v-for="media in state"
        :key="media.url"
        class="icon-menu--item"
      >
        <a
          :href="media.url"
          target="_blank"
        >
          <span :class="media.icon" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    state: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

.icon-menu--list {
  display: flex;
  justify-content: center;
}
.icon-menu--item {
  font-size: 22px;
  padding: 0 12px;
  a {
    color: $c_text--inverse;
  }
}

</style>
