// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
// import router from '../router'
import { apolloProvider } from '@/assets/js/apollo'

export function registerPlugins(app) {
  loadFonts()
  app
    .use(vuetify)
    .use(apolloProvider)
    .use(pinia)
}
