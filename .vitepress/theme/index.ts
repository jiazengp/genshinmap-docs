import { onMounted, watch, nextTick, h } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'
import Theme from 'vitepress/theme-without-fonts'
import Link from './components/Link.vue'
import Coins from './components/Coins.vue'
import MediaIntroduction from './components/MediaIntroduction.vue'
import googleAnalytics from '../plugins/googleAnalytics'

import 'uno.css'
import './styles/vars.css'
import './styles/main.css'

export default {
  ...Theme,

  Layout() {
    return h(Theme.Layout, null, {})
  },
  enhanceApp({ app }) {
    app.component('Link', Link)
    app.component('Coins', Coins)
    app.component('MediaIntroduction', MediaIntroduction)
    googleAnalytics({
      id: 'G-Q2K9DXZCEY',
      debug: false,
    })
  },
  setup() {
    const route = useRoute()
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' })
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  },
}
