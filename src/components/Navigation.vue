<template>
  <!-- Element hosting the component -->
  <nav
    class="navigation"
    :class="{ 'menu--active': navigationActive }"
  >
    <!-- Toggle navigation button -->
    <button
      :key="'button'"
      class="navigation__button btn-hamburger"
      @click="toggleNavigation"
    >
      <span
        v-for="n in 3"
        :key="n"
        class="btn-hamburger__line"
      />
    </button>

    <!-- Element hosting the navigation content -->
    <div
      :key="'content'"
      class="navigation__content"
    >
      <!-- Menu list -->
      <Menu
        ref="menu"
        :state="navigationMenu"
      />

      <!-- Navigation footer -->
      <div class="navigation__footer">
        <p class="site__title site__title--navigation">
          Palo Alto
        </p>
        <p>
          Designed & Developed by
          <a
            href="https://pixelbuddha.net/"
            target="_blank"
          >
            PixelBuddha Team
          </a>
        </p>
      </div>
      <!-- END - Menu footer -->
    </div>
    <!-- END - Element hosting the navigation content -->

    <!-- Page overlay displayed if menu is active (mobile view) -->
    <div
      v-if="navigationActive"
      :key="'overlay'"
      class="navigation__overlay"
      @click="toggleNavigation"
    />
  </nav>
  <!-- END - Element hosting the component -->
</template>

<script>
import { mapMutations } from 'vuex'
import store from '../store/index'
import Menu from './Menu.vue'

export default {
  store,

  components: { Menu },

  props: {
    navigationMenu: {
      type: Array,
      required: true
    }
  },

  computed: {
    navigationActive () {
      return this.$store.state.master.navigationActive
    }
  },

  watch: {
    $route () {
      this.$refs.menu.closeSubmenu()
      this.toggleNavigation(false)
    }
  },

  methods: {
    ...mapMutations([
      'toggleNavigation'
    ])
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
@import '../assets/scss/helperMixins';

// Hamburger button
.btn-hamburger {
  background: transparent;
  cursor: pointer;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  height: 26px;
}
.btn-hamburger__line {
  background: $c_accent;
  display: block;
  height: 2px;
  transition: $a_transition;
  width: 32px;
  &:last-child {
    align-self: flex-end;
    width: 22px;
  }
}

// Hide navigation button for large screens
.navigation__button {
  @include breakpoint(L) {
    display: none;
  }
}

.navigation__content {
  display: flex;
  @include breakpoint(min-L) {
    background: $c_menu-bg;
    color: $c_text--inverse;
    height: 100vh;
    flex-flow: column;
    overflow: auto;
    padding-right: $s_nav-offset;
    position: absolute;
    right: calc(-75vw - #{$s_nav-offset});
    top: 0;
    width: calc(75vw + #{$s_nav-offset});
    z-index: 12;
  }
}

.navigation__footer {
  @include breakpoint(min-L) {
    color: rgba($c_menu-txt, 0.4);
    font-size: 0.8em;
    line-height: 1.5;
    margin-top: auto;
    padding: $s_nav-offset;
    a {
      color: rgba($c_menu-txt, 0.4);
      text-decoration: none;
      &:hover, :active {
        color: $c_menu-txt;
        text-decoration: underline;
      }
    }
  }
  @include breakpoint(L) {
    display: none;
  }
}

.site__title--navigation {
  color: $c_menu-txt;
  font-size: 21px;
  margin-bottom: 1.25rem;
}

.navigation__overlay {
  background: transparent;
  height: 100vh;
  position: absolute;
  right: 0;
  top: 0;
  width: 100vw;
  z-index: 11;
}

// Animation
.menu--active {
  .btn-hamburger__line {
    &:first-child {
      width: 16px;
      transform: rotate(45deg) translate(17px, -8px);
    }
    &:last-child {
      width: 16px;
      transform: rotate(-45deg) translate(6px, -3px);
    }
  }
}
</style>
