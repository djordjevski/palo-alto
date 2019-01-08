<template>
  <div class="search-bar">
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
</template>

<script>
export default {
  data: () => ({
    showSearch: false
  }),

  methods: {
    toggleSearch () {
      this.showSearch = !this.showSearch
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
@import '../assets/scss/helperMixins';

.search-bar {
  display: flex;
  flex-shrink: 0;
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
</style>
