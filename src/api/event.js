/**
 * 商场活动管理 —— 接口预留层
 * ------------------------------------------------------------
 * 当前为前端原型：使用 mock 数据 + 浏览器内存模拟「服务端」与「草稿」。
 * 对接后端时：保留以下函数签名与返回结构，把函数体替换为真实 HTTP 请求即可。
 * 每个函数上方的 TODO 注明了建议的接口路径与语义。
 */

import { createMockConfig, deepClone } from '../mock/data.js'

// 模拟网络延迟
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

// 内存模拟：已生效数据
let serverStore = null
// 内存模拟：自动暂存草稿
let draftStore = null

/**
 * 获取活动配置
 * 优先返回草稿（自动暂存内容），其次已生效数据，最后初始化默认配置。
 * TODO: GET /api/mall/event/config  ->  EventConfig
 */
export async function getEventConfig() {
  await delay()
  if (draftStore) return deepClone(draftStore)
  if (serverStore) return deepClone(serverStore)
  const cfg = createMockConfig()
  serverStore = deepClone(cfg)
  return deepClone(cfg)
}

/**
 * 自动暂存草稿（编辑过程中防丢失，非正式发布）
 * TODO: POST /api/mall/event/draft  body: EventConfig  ->  { ok, savedAt }
 */
export async function saveDraft(config) {
  await delay(150)
  draftStore = deepClone(config)
  return { ok: true, savedAt: Date.now() }
}

/**
 * 保存并生效：所有 Tab、所有语言内容统一保存并对前端立即生效
 * TODO: POST /api/mall/event/publish  body: EventConfig  ->  { ok, publishedAt }
 */
export async function publishEventConfig(config) {
  await delay(400)
  serverStore = deepClone(config)
  draftStore = deepClone(config)
  return { ok: true, publishedAt: Date.now() }
}

/**
 * 上传图片（封面 / 轮播图 / 正文内插图共用）
 * 原型阶段返回本地 ObjectURL 作预览。
 * TODO: POST /api/upload  body: FormData(file)  ->  { url, name }
 */
export async function uploadImage(file) {
  await delay(200)
  return { url: URL.createObjectURL(file), name: file.name }
}
