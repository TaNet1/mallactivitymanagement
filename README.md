# 商场活动管理 · 前端原型

基于 UI 原型与交互说明实现的「商场活动管理」页面前端原型。纯前端 + 接口预留，供前端工程师对接参考。

> 在 `parking_editor`（泊车资讯管理）原型基础上设计，复用整体布局、Tab 管理、多语言、自动暂存与 Vditor 编辑器等能力。

## 技术栈

- Vue 3 + Vite
- Element Plus（表单控件 / 弹窗 / 消息）
- [Vditor](https://github.com/vanessa219/vditor) Markdown 富文本编辑器

## 启动

```bash
npm install
npm run dev
```

默认运行在 http://localhost:5174 。

## 目录结构

```
src/
├─ main.js                 应用入口（注册 Element Plus 及图标）
├─ App.vue                 整体布局：侧边栏 + 顶栏 + 页面
├─ styles/global.css       全局样式与布局变量、主题色
├─ api/event.js            ★ 接口预留层（mock 实现，含 TODO 真实接口）
├─ mock/data.js            数据结构定义与 mock 数据
├─ views/
│  └─ EventManage.vue      页面主逻辑（状态、自动暂存、保存并生效）
└─ components/
   ├─ Sidebar.vue          左侧导航（静态写死，仅作框架展示）
   ├─ TopBar.vue           顶栏（静态）
   ├─ LeftPanel.vue        左侧操作栏：模块 Tab 管理（拖拽排序）
   ├─ ContentEditor.vue    内容编辑区：传参值 / 标题 / 持续时间 / 封面 / 轮播图 / 正文
   ├─ ImageUploader.vue    图片上传（单张封面 / 多张轮播复用，jpg/jpeg/png，≤5MB）
   └─ VditorEditor.vue     Vditor 封装组件
```

## 对接说明

所有数据交互集中在 `src/api/event.js`，每个函数保留签名与返回结构，仅需把函数体替换为真实 HTTP 请求（已用 `TODO` 标注建议的接口路径）：

| 函数 | 用途 | 建议接口 |
| --- | --- | --- |
| `getEventConfig()` | 读取活动配置（优先草稿） | `GET /api/mall/event/config` |
| `saveDraft(config)` | 自动暂存草稿 | `POST /api/mall/event/draft` |
| `publishEventConfig(config)` | 保存并生效 | `POST /api/mall/event/publish` |
| `uploadImage(file)` | 图片上传 | `POST /api/upload` |

### 数据模型

```ts
EventConfig {
  tabs: Tab[]                 // 数组顺序即前端展示顺序
}
Tab {
  id: string
  delistAt: string            // 下架日期（Tab 级，三语言共享；选填，YYYY-MM-DD HH:mm:ss；为空表示不下架）
  i18n: {                     // 三语言内容独立维护，Tab 结构在多语言间共享
    'zh-CN': LangContent
    'zh-TW': LangContent
    'en':    LangContent
  }
}
LangContent {
  passValue: string           // 传参值（必填，同时作为左侧 Tab 名称）
  title: string               // 标题（选填）
  duration: string            // 持续时间（自由文本，如 2026.06.01-2026.06.22）
  cover: { url, name } | null  // 封面（必填，仅单张）
  images: { url, name }[]     // 轮播区域图片（可多张）
  markdown: string            // Markdown 正文
}
```

## 与泊车原型的差异

- 去掉「场地选择」与「启用开关」，活动配置为一份全局配置。
- Tab 内容字段更丰富：新增「传参值、标题、持续时间、封面」。
- 封面为**单张**上传；轮播区域图片为**多张**上传，二者并排展示。
- 左侧 Tab 列表以「传参值」作为标签名展示。

## 已实现的交互要点

- **Tab 管理**：添加（默认名「新标签页 / 新標籤頁 / New Tab」）、拖拽排序、删除二次确认、选中高亮。
- **语言切换**：简体 / 繁体 / English，三语言内容独立维护，结构共享。
- **自动暂存**：编辑内容防抖暂存为草稿，切换 Tab / 语言不丢失。
- **保存并生效**：校验所有 Tab、所有语言的「传参值」「封面」必填后统一发布。
- **Markdown 正文**：Vditor 编辑器，正文内插图走统一上传接口。
