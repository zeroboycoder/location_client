
import App from './App.vue'
import { createApp, provide, h } from 'vue'
import eventBus from './assets/js/eventBus'
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './assets/js/apollo';

// Plugins
import { registerPlugins } from '@/plugins'


const app = createApp({
    setup() {
      provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App)
  })

registerPlugins(app)

app.config.globalProperties.$eventBus = eventBus;

app.mount('#app')
