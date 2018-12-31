<template>
  <header
    ref="header"
    class="sticky-header"
    :class="headerClass"
  >
    <div class="content sticky-header__content">
      <h1 class="site__title site__title--header">
        Palo Alto
      </h1>

      <Menu class="sticky-header__menu" />
    </div>
  </header>
</template>

<script>
import Menu from './Menu.vue'

export default {
  components: { Menu },
  data: () => ({
    currentY: 0,
    headerClass: 'sticky-header--hidden'
  }),
  created () {
    this.handleScroll()
  },
  methods: {
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
.sticky-header--max {
  height: $s_header-height;
  top: 0;
}
.sticky-header--hidden {
  height: 70px;
  opacity: 0;
  top: -70px;
  .site__title--header {
    font-size: 2em;
  }
}
.sticky-header--pinned {
  background: $c_body-bg;
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
  height: 70px;
  top: 0;
  .site__title--header {
    font-size: 2em;
  }
}
.sticky-header__content {
  align-items: center;
  display: flex;
}
.sticky-header__menu {
  margin-left: auto;
}

</style>
