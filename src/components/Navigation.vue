<template>
  <!-- Element hosting the component -->
  <nav
    class="menu"
    :class="{ 'menu--active': state.navigationActive && !isFooter, 'footer__menu': isFooter }"
  >
    <!-- Toggle menu button -->
    <button
      v-if="!isFooter"
      :key="'button'"
      class="menu__button btn-hamburger"
      @click="toggleNavigation"
    >
      <span
        v-for="n in 3"
        :key="n"
        class="btn-hamburger__line"
      />
    </button>

    <!-- Element hosting the menu content -->
    <div
      :key="'content'"
      class="menu__content"
    >
      <!-- Search -->
      <div class="menu__search search-bar">
        <input
          type="search"
          class="search-bar__input"
          :class="{ 'search-bar__input--hidden': !showSearch }"
          placeholder="SEARCH"
        >
        <button
          class="search-bar__button"
          @click="toggleSearch"
        >
          <span class="fa fa-search" />
        </button>
      </div>
      <!-- END - Search -->

      <!-- Menu list -->
      <ul class="menu-list">
        <RouterLink
          v-for="item in state.navigation"
          :key="item.id"
          :ref="item.id"
          :to="item.route"
          tag="li"
          class="menu-list__item"
        >
          <a>
            {{ item.text }}
          </a>
          <button
            v-if="item.submenu && !isFooter"
            class="caret"
            @click="toggleSubmenu(item.id)"
          >
            <span class="fa fa-caret-down" />
          </button>
          <ul
            v-if="item.submenu && !isFooter"
            class="submenu-list"
          >
            <RouterLink
              v-for="subitem in item.submenu"
              :key="subitem.id"
              :to="subitem.route"
              tag="li"
              class="submenu-list__item"
            >
              <a>{{ subitem.text }}</a>
            </RouterLink>
          </ul>
        </RouterLink>
      </ul>
      <!-- END - Menu list -->

      <!-- Menu footer -->
      <div
        v-if="!isFooter"
        class="menu__footer"
      >
        <p class="site__title site__title--menu">
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
    <!-- END - Element hosting the menu content -->

    <!-- Page overlay displayed if menu is active (mobile view) -->
    <div
      v-if="state.navigationActive && !isFooter"
      :key="'overlay'"
      class="menu__overlay"
      @click="toggleNavigation"
    />
  </nav>
  <!-- END - Element hosting the component -->
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import store from '../store/index'

export default {
  store,

  props: {
    isFooter: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data: () => ({
    showSearch: false
  }),

  computed: {
    ...mapState({
      state: state => state.master
    })
  },

  watch: {
    $route () {
      this.closeSubmenu()
      this.toggleNavigation(false)
    }
  },

  methods: {
    ...mapMutations([
      'toggleNavigation'
    ]),

    toggleSearch () {
      this.showSearch = !this.showSearch
    },

    toggleSubmenu (item) {
      const menuItem = this.$refs[item][0].$el
      if (menuItem.classList.contains('menu-list__item--show-submenu')) {
        this.closeSubmenu()
        return
      }
      this.openSubmenu(menuItem)
    },

    openSubmenu (menuItem) {
      menuItem.classList.add('menu-list__item--show-submenu')
      document.addEventListener('click', this.listener, true)
    },

    closeSubmenu () {
      const menuItem = document.getElementsByClassName('menu-list__item--show-submenu')[0]
      if (menuItem) {
        menuItem.classList.remove('menu-list__item--show-submenu')
        document.removeEventListener('click', this.listener, true)
      }
    },

    listener (event) {
      if (!event.target.closest('.menu-list__item--show-submenu')) this.closeSubmenu()
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
@import '../assets/scss/helperMixins';

$_offset: 30px;
$_padding--LR: 0 (40px + $_offset) 0 40px;
$_padding--full: 40px (40px + $_offset) 40px 40px;

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

// Hide menu button for large screens
.menu__button {
  @include breakpoint(L) {
    display: none;
  }
}

.menu__content {
  display: flex;
  @include breakpoint(min-L) {
    background: $c_menu-bg;
    color: $c_text--inverse;
    height: 100vh;
    flex-flow: column;
    overflow: auto;
    position: absolute;
    right: calc(-75vw - #{$_offset});
    top: 0;
    width: calc(75vw + #{$_offset});
    z-index: 12;
  }
}

// Move search to the end for lagre screens
.menu__search {
  @include breakpoint(L) {
    order: 2;
  }
}

// ========================================= //
// Search bar
.search-bar {
  display: flex;
  flex-shrink: 0;
  @include breakpoint(min-L) {
    border-bottom: 1px solid rgba($c_text--inverse, 0.1);
    padding: $_padding--LR;
  }
}

// Search input
.search-bar__input {
  background: transparent;
  @include breakpoint(min-L) {
    color: $c_text--inverse;
    height: 4.25rem;
    width: 100%;
  }
  @include breakpoint(L) {
    border-bottom: 3px solid $c_accent;
    margin: 0 16px;
    transition: $a_transition;
    width: 150px;
  }
}

// Search input placeholder
.search-bar__input::placeholder {
  font-weight: 300;
  @include breakpoint(min-L) {
    color: rgba($c_text--inverse, 0.4);
  }
  @include breakpoint(L) {
    color: $c_text--light;
  }
}

// Shrink input in hidden state
.search-bar__input--hidden {
  @include breakpoint(L) {
    margin-left: 0;
    width: 0;
  }
}

// Search button
.search-bar__button {
  background: transparent;
  @include breakpoint(min-L) {
    color: $c_text--inverse;
  }
}
// Search bar
// ========================================= //

// ========================================= //
// Menu list
.menu-list {
  @include breakpoint(min-L) {
    padding: $_padding--full;
  }
  @include breakpoint(L) {
    align-items: center;
    display: flex;
  }
}

// Menu item
.menu-list__item {
  font-size: 16px;
  position: relative;
  @include breakpoint(min-L) {
    align-items: center;
    color: $c_menu-txt;
    display: flex;
    flex-wrap: wrap;
  }
  @include breakpoint(L) {
    color: $c_text;
    padding: 0 16px;
  }

  // Menu item link
  > a {
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
    @include breakpoint(min-L) {
      align-items: center;
      color: $c_menu-txt;
      display: flex;
      height: 3rem;
    }
    @include breakpoint(L) {
      color: $c_text;
      padding: 8px 0;
      &:hover {
        border-bottom: 3px solid $c_accent;
      }
    }
  }

  // Active state
  &.router-link-exact-active {
    a {
      @include breakpoint(min-L) {
        color: $c_menu-txt--active;
      }
      @include breakpoint(L) {
        color: $c_text--light;
      }
    }
  }
}

.caret {
  background: transparent;
  @include breakpoint(min-L) {
    align-items: center;
    color: $c_menu-txt;
    display: flex;
    flex: 1;
    height: 3rem;
    justify-content: flex-end;
  }
  @include breakpoint(L) {
    margin-left: 8px;
  }
}
// END - Menu list
// ========================================= //

// ========================================= //
// Submenu list
.submenu-list {
  display: none;
  flex-flow: column;
  @include breakpoint(min-L) {
    flex: 1 0 100%;
    padding: 0 0 8px;
  }
  @include breakpoint(L) {
    background: $c_main-bg;
    box-shadow: 0 0 $s_main-shadow-blur rgba(0,0,0,0.1);
    left: 0;
    padding: 8px 0;
    position: absolute;
    top: 28px;
    width: 150px;
  }
}
.submenu-list__item {
  padding: 8px 16px;
  a {
    text-decoration: none;
    @include breakpoint(min-L) {
      color: $c_menu-txt;
    }
    @include breakpoint(L) {
      &:hover {
        color: $c_accent;
      }
    }
  }
}

// Show submenu
.menu-list__item--show-submenu {
  .submenu-list {
    display: flex;
  }
  .caret {
    transform: rotate(180deg);
    @include breakpoint(min-L) {
      justify-content: unset
    }
  }
}
@include breakpoint(L) {
  .menu-list__item:hover {
    .submenu-list {
      display: flex;
    }
  }
}
// END - Submenu list
// ========================================= //

.menu__footer {
  @include breakpoint(min-L) {
    color: rgba($c_menu-txt, 0.4);
    font-size: 0.8em;
    line-height: 1.5;
    margin-top: auto;
    padding: $_padding--full;
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

.site__title--menu {
  color: $c_menu-txt;
  font-size: 21px;
  margin-bottom: 1.25rem;
}

.menu__overlay {
  background: transparent;
  height: 100vh;
  position: absolute;
  right: 0;
  top: 0;
  width: 100vw;
  z-index: 11;
}

// ========================================= //
// Overrides for footer implementation
.footer__menu {
  padding: 40px 0;

  .menu__content {
    align-items: center;
    background: transparent;
    height: auto;
    position: relative;
    right: auto;
    width: 100%;
    z-index: 1;
    @include breakpoint(L) {
      justify-content: center;
    }
  }

  .search-bar__button {
    @include breakpoint(L) {
      color: $c_text--inverse;
    }
  }

  .menu-list {
    padding: 0;
    width: 100%;
    @include breakpoint(S) {
      display: flex;
      justify-content: center;
    }
    @include breakpoint(L) {
      flex: 0;
    }
  }
  .menu-list__item {
    justify-content: center;
    @include breakpoint(S) {
      padding: 0 16px;
    }
    @include breakpoint(L) {
      a {
        color: $c_text--inverse;
      }
    }
  }
  @include breakpoint(min-L) {
    .menu__search {
      display: none;
    }
  }
}
// END - Overrides for footer implementation
// ========================================= //

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
