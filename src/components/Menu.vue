<template>
  <ul class="menu-list">
    <li class="menu-list__search">
      <SearchBar />
    </li>
    <RouterLink
      v-for="item in state"
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
        v-if="item.submenu && isMultilevel"
        class="menu-list__caret"
        @click="toggleSubmenu(item.id)"
      >
        <span class="fa fa-caret-down" />
      </button>
      <ul
        v-if="item.submenu && isMultilevel"
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
</template>

<script>
import SearchBar from './SearchBar.vue'

export default {
  components: { SearchBar },

  props: {
    state: {
      type: Array,
      required: true
    },

    isMultilevel: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  methods: {
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
      document.addEventListener('click', this.closeSubmenu)
    },

    closeSubmenu (event) {
      // If method is called by click event and clicked element
      // is part of the dropdown item do not close submenu
      if (event && event.target.closest('.menu-list__item--show-submenu')) return

      const menuItem = document.getElementsByClassName('menu-list__item--show-submenu')[0]

      // This check is needed because
      // method is called when route is changed
      if (menuItem) {
        menuItem.classList.remove('menu-list__item--show-submenu')
        document.removeEventListener('click', this.closeSubmenu)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
@import '../assets/scss/helperMixins';

// ========================================= //
// Menu list
.menu-list {
  @include breakpoint(L) {
    align-items: center;
    display: flex;
  }
}

.menu-list__search {
  @include breakpoint(min-L) {
    border-bottom: 1px solid rgba($c_text--inverse, 0.1);
    margin-bottom: 1em;
    padding: 0 $s_nav-offset;
  }
  @include breakpoint(L) {
    order: 2;
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
    padding: 0 $s_nav-offset;
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

.menu-list__caret {
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
    right: 0;
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
  .menu-list__caret {
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
</style>
