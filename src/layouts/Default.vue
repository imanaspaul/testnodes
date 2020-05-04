<template>
  <div id="app">
    <Menu/>
    <header class="header" v-if="showNavbar">
      <div class="header__left">
        <Logo v-if="showLogo" /> 
      </div>
      
      <div class="header__right">        
        <ToggleTheme />
      </div>
    </header>

    <main class="main">
      <slot/>
    </main>

    <footer class="footer">
      <div><span class="footer__copyright">Copyright © {{ new Date().getFullYear() }}. </span>
      </div>
      <div class='links'>
        <g-link to='/privacy-policy'>Privacy Policy</g-link>
        <g-link to='/terms-and-conditions'>Terms and Conditions</g-link>
        <g-link class="menu-link" to="/contact">
        Contact
      </g-link>
      </div>
    </footer>

  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Menu from '~/components/Menu.vue'
import ToggleTheme from '~/components/ToggleTheme.vue'

const OFFSET = 60
export default {
  props: {
    showLogo: { default: true }
  },
  components: {
    Logo,
    Menu,
    ToggleTheme
  },
  data() {
    return{
      showNavbar: false,
      lastScrollPosition: 0,
      scrollValue: 0
    }
  },
  mounted () {
  window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll () {
      if (window.pageYOffset < 0) {
        return
      }
      if (Math.abs(window.pageYOffset - this.lastScrollPosition) < OFFSET) {
        return
      }
      this.showNavbar = window.pageYOffset > this.lastScrollPosition
      this.lastScrollPosition = window.pageYOffset
    }
  }
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--header-height);
  padding: 0 calc(var(--space) / 2);
  top:0;
  z-index: 10;

  &__left,
  &__right {
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 1300px) {
    //Make header sticky for large screens
    position: sticky;
    width: 100%;
  }
}

.main {
  margin: 0 auto;
  padding: 1.5vw 15px 0;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--space) / 2);
  text-align: center;
  font-size: .8em;
  

  > span {
    margin: 0 .35em;
  }

  a {
    color: var(--link-color);
    padding-left: 1rem;
  }
}
</style>
