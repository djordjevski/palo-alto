<template>
  <!-- Element hosting the page content -->
  <div
    class="site"
    :class="{ 'site--show-menu': state.navigationActive }"
  >
    <!-- Site header -->
    <StickyHeader
      :navigation-menu="state.navigationMenu"
      class="site__header"
    />

    <!-- Site main content -->
    <main class="site__main">
      <div class="content content--main">
        <RouterView />
      </div>
    </main>
    <!-- END - Site main content -->

    <!-- Site footer -->
    <footer class="site__footer footer">
      <div class="content">
        <!-- Site title -->
        <h1 class="site__title site__title--footer">
          Palo Alto
        </h1>

        <!-- Footer navigation -->
        <nav class="footer__navigation">
          <Menu
            :state="state.navigationMenu"
            :is-multilevel="false"
          />
        </nav>

        <!-- Impresum -->
        <p class="footer__impresum">
          Nunc placerat dolor at lectus hendrerit dignissim. Ut tortor sem, consectetur nec hendrerit ut, ullamcorper ac odio. Donec viverra ligula at quam tincidunt imperdiet. Nulla mattis tincidunt auctor.
        </p>

        <!-- Copyrights -->
        <p class="footer__copyrights">
          © 2015 - Palo Alto. All Rights Reserved. Designed & Developed by
          <a
            href="https://pixelbuddha.net/"
            target="_blank"
            class="footer__author"
          >
            PixelBuddha Team
          </a>
        </p>

        <!-- Social media links -->
        <IconMenu
          :state="state.socialMedia"
          class="footer__social-media"
        />
      </div>
    </footer>
    <!-- END - Site footer -->
  </div>
  <!-- END - Element hosting the page content -->
</template>

<script>
import { mapState } from 'vuex'
import store from './store/index'
import StickyHeader from './components/StickyHeader.vue'
import Menu from './components/Menu.vue'
import IconMenu from './components/IconMenu.vue'

export default {
  store,

  components: { StickyHeader, Menu, IconMenu },

  computed: {
    ...mapState({
      state: state => state.master
    })
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato');
@import './assets/scss/resetCSS';
@import './assets/scss/variables';
@import './assets/scss/helperMixins';

// Basic styles
html, body {
  color: $c_text;
  background: $c_body-bg;
  font-family: 'Lato', sans-serif;
  @include breakpoint(XS) {
    font-size: 16px;
  }
  @include breakpoint(S) {
    font-size: 18px;;
  }
}

// Content host for page header, main and footer
.content {
  @include breakpoint(min-L) {
    margin: 0 20px;
    width: 100%;
  }
  @include breakpoint(L) {
    width: 952px;
  }
}

// ========================================= //
// Page layout
.site {
  max-width: 100vw;
  transition: margin-left 0.5s ease-in;
}

// Move entire content to show menu
.site--show-menu {
  margin-left: calc(-75vw);
  .site__header {
    left: calc(-75vw);
  }
}

.site__header, .site__main, .site__footer {
  display: flex;
  justify-content: center;
}

.site__header {
  transition: left 0.5s ease-in, top 0.3s ease-in, opacity 0.3s ease-in;
}

.site__main {
  margin-top: $s_header-height;
  @include breakpoint(XS) {
    margin-bottom: 80px;
  }
  @include breakpoint(S) {
    margin-bottom: 120px;
  }
}

.content--main {
  background: $c_main-bg;
  box-shadow: 0 0 $s_main-shadow-blur rgba(0,0,0,0.1);
  position: relative;
  @include breakpoint(XS) {
    padding: 0 25px;
  }
  @include breakpoint(S) {
    padding: 0 50px;
  }
  @include breakpoint(L) {
    padding: 0 98px;
  }
}

.site__footer {
  background: $c_accent;
  justify-content: center;
}
// END - Page layout
// ========================================= //

// Site title and its modifiers
.site__title {
  font-style: italic;
  font-weight: 700;
}
.site__title--header {
  font-size: 2.5em;
}
.site__title--footer {
  color: rgba($c_text--dark, 0.2);
  font-size: 2.25em;
  padding: 4.5rem 0 0;
}

// Site footer
.footer {
  text-align: center;
}
.footer__navigation {
  padding: $s_nav-offset 0;

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
  .menu-list__search {
    @include breakpoint(min-L) {
      display: none;
    }
  }
  .search-bar__input, .search-bar__button {
    color: $c_text--inverse;
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
    // Active state
    &.router-link-exact-active {
      a {
        color: rgba($c_text--inverse, 0.4);
      }
    }
  }
}
.footer__impresum, .footer__copyrights {
  color: rgba($c_text--inverse, 0.4);
  line-height: 1.75;
  padding: 2rem 1.25rem;
}
.footer__impresum {
  border-bottom: 2px solid rgba($c_text--dark, 0.06);
  border-top: 2px solid rgba($c_text--dark, 0.06);
  font-size: 0.8em;
}
.footer__copyrights {
  font-size: 0.9em;
}
.footer__author {
  color: $c_text--inverse;
  font-weight: 700;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
.footer__social-media {
  margin-bottom: 80px;
}
</style>
