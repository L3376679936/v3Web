import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './api/mock'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import SvgIcon from '@/icons'
import '@/router/permission'
import * as ELIcons from '@element-plus/icons-vue'
import i18n from '@/i18n'

const app = createApp(App)
for (const iconName in ELIcons) {
  app.component(iconName, ELIcons[iconName])
}
SvgIcon(app)
app.use(store).use(router).use(i18n).mount('#app')
