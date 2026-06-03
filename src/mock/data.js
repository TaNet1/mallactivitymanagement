/**
 * Mock 数据 & 数据结构定义
 * ------------------------------------------------------------
 * 数据模型（一份全局活动配置）：
 *   EventConfig {
 *     tabs: Tab[]                       // 数组顺序即前端展示顺序
 *   }
 *   Tab {
 *     id: string,
 *     i18n: {                           // 三语言内容独立维护，结构在多语言间共享
 *       'zh-CN': LangContent,
 *       'zh-TW': LangContent,
 *       'en':    LangContent
 *     }
 *   }
 *   LangContent {
 *     passValue: string,                // 传参值（必填，同时作为左侧 Tab 名称）
 *     title: string,                    // 标题（必填）
 *     duration: string,                 // 持续时间（自由文本，如 2026.06.01-2026.06.22）
 *     delistAt: string,                 // 下架日期（选填，YYYY-MM-DD HH:mm:ss；为空表示不下架）
 *     cover: { url, name } | null,      // 封面（仅单张）
 *     images: { url, name }[],          // 轮播区域图片（可多张）
 *     markdown: string                  // Markdown 正文
 *   }
 */

export const LANGS = [
  { key: 'zh-CN', label: '简体中文' },
  { key: 'zh-TW', label: '繁體中文' },
  { key: 'en', label: 'English' }
]

// 默认「传参值 / Tab 名称」（与对应语言保持一致）
export const DEFAULT_PASS_VALUE = {
  'zh-CN': '新标签页',
  'zh-TW': '新標籤頁',
  en: 'New Tab'
}

let _uid = 0
export const genId = () => `tab_${Date.now()}_${++_uid}`

export const deepClone = (o) => JSON.parse(JSON.stringify(o))

function emptyLangContent(passValue) {
  return {
    passValue,
    title: '',
    duration: '',
    delistAt: '',
    cover: null,
    images: [],
    markdown: ''
  }
}

export function createTab() {
  return {
    id: genId(),
    i18n: {
      'zh-CN': emptyLangContent(DEFAULT_PASS_VALUE['zh-CN']),
      'zh-TW': emptyLangContent(DEFAULT_PASS_VALUE['zh-TW']),
      en: emptyLangContent(DEFAULT_PASS_VALUE.en)
    }
  }
}

// 生成初始配置（演示用，含两个 Tab）
export function createMockConfig() {
  const tabA = createTab()
  tabA.i18n['zh-CN'] = {
    passValue: '暑期狂欢',
    title: '暑期狂欢购物节',
    duration: '2026.06.01-2026.06.22',
    delistAt: '',
    cover: null,
    images: [],
    markdown: '## 暑期狂欢购物节\n\n这个区域是 Markdown 编辑区域。'
  }
  tabA.i18n['zh-TW'] = {
    passValue: '暑期狂歡',
    title: '暑期狂歡購物節',
    duration: '2026.06.01-2026.06.22',
    delistAt: '',
    cover: null,
    images: [],
    markdown: '## 暑期狂歡購物節\n\n這個區域是 Markdown 編輯區域。'
  }
  tabA.i18n.en = {
    passValue: 'Summer Carnival',
    title: 'Summer Carnival Shopping Festival',
    duration: '2026.06.01-2026.06.22',
    delistAt: '',
    cover: null,
    images: [],
    markdown: '## Summer Carnival\n\nThis is the Markdown editing area.'
  }

  const tabB = createTab()

  return {
    tabs: [tabA, tabB]
  }
}
