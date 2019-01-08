<template>
  <!-- Element hosting the component -->
  <header
    class="sticky-header"
    :class="headerClass"
  >
    <!-- Element hosting the component content -->
    <div class="content sticky-header__content">
      <h1 class="site__title site__title--header">
        Palo Alto
      </h1>

      <!-- Navigation menu -->
      <Navigation
        :navigation-menu="navigationMenu"
        class="sticky-header__menu"
      />
    </div>
    <!-- END - Element hosting the component content -->
  </header>
  <!-- END - Element hosting the component -->
</template>

<script>
import Navigation from './Navigation.vue'

export default {
  components: { Navigation },

  props: {
    navigationMenu: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    currentY: 0,
    headerClass: 'sticky-header--hidden'
  }),

  created () {
    this.handleScroll()
  },

  methods: {
    // Handle behavior of the component
    // when page does scroll
    handleScroll () {
      this.setHeaderClass(window.pageYOffset)
      let scrolling
      window.addEventListener('scroll', () => {
        if (scrolling !== null) {
          window.clearTimeout(scrolling)
        }
        scrolling = setTimeout(() => {
          this.setHeaderClass(window.pageYOffset)
        }, 100)
      })
    },

    // Set component class depending on
    // the page Y scroll position
    setHeaderClass (pageY) {
      if (pageY === 0) {
        this.headerClass = 'sticky-header--max'
        this.currentY = pageY
        return
      }
      this.headerClass = pageY > this.currentY ? 'sticky-header--pinned' : 'sticky-header--hidden'
      this.currentY = pageY
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
@import '../assets/scss/helperMixins';

.sticky-header {
  align-items: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 10;
}

// Large header - when page is scrollet to the top
.sticky-header--max {
  height: $s_header-height;
  top: 0;
}

// Hide header
.sticky-header--hidden {
  height: 70px;
  opacity: 0;
  top: -70px;
  .site__title--header {
    font-size: 2em;
  }
}

// Pin header to the top
.sticky-header--pinned {
  background: $c_body-bg;
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
  height: 70px;
  top: 0;
  .site__title--header {
    font-size: 2em;
  }
}

// Center header content verticaly
.sticky-header__content {
  align-items: center;
  display: flex;
}

// Push menu to the right
.sticky-header__menu {
  margin-left: auto;
}

</style>
