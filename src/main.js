import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import './styles/global.css'

const app = createApp(App)

// 全局注册 Element Plus 图标（侧边栏静态导航按名称引用）
for (const [name, comp] of Object.entries(ElementPlusIconsVue)) {
  app.component(name, comp)
}

app.use(ElementPlus)
app.mount('#app')
