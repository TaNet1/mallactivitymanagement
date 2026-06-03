<template>
  <div class="page">
    <!-- 左侧 Tab 操作栏 -->
    <LeftPanel
      :tabs="config?.tabs ?? []"
      :current-tab-id="currentTabId"
      :lang="currentLang"
      @add-tab="addTab"
      @delete-tab="deleteTab"
      @select-tab="selectTab"
      @reorder="reorderTabs"
    />

    <!-- 右侧内容区 -->
    <div class="content">
      <div class="content-header">
        <!-- 顶部语言切换 -->
        <div class="lang-seg">
          <div
            v-for="l in LANGS"
            :key="l.key"
            class="seg-item"
            :class="{ active: currentLang === l.key }"
            @click="currentLang = l.key"
          >
            {{ l.label }}
          </div>
        </div>

        <div class="header-right">
          <span class="save-status">
            <template v-if="saveStatus === 'saving'">自动保存中…</template>
            <template v-else-if="saveStatus === 'saved'">已自动保存草稿</template>
          </span>
          <el-button type="primary" :loading="publishing" @click="publish">
            保存并生效
          </el-button>
        </div>
      </div>

      <div class="content-body">
        <!-- 无 Tab -->
        <div v-if="!currentContent" class="no-tab">
          <p>当前暂无标签页，请点击左侧「+ 添加」创建一个 Tab。</p>
        </div>

        <!-- 编辑区 -->
        <ContentEditor
          v-else
          :key="currentTabId + '_' + currentLang"
          :content="currentContent"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import LeftPanel from '../components/LeftPanel.vue'
import ContentEditor from '../components/ContentEditor.vue'
import * as api from '../api/event.js'
import { LANGS, createTab } from '../mock/data.js'

const config = ref(null) // { tabs }
const currentLang = ref('zh-CN')
const currentTabId = ref('')
const publishing = ref(false)
const saveStatus = ref('') // '' | 'saving' | 'saved'

const currentTab = computed(
  () => config.value?.tabs.find((t) => t.id === currentTabId.value) || null
)
const currentContent = computed(() =>
  currentTab.value ? currentTab.value.i18n[currentLang.value] : null
)

// ----------------- 数据加载 -----------------
let suppressAutoSave = false

async function loadConfig() {
  suppressAutoSave = true
  config.value = await api.getEventConfig()
  currentTabId.value = config.value.tabs[0]?.id || ''
  // 等本轮响应式更新后再放开自动保存，避免加载即触发暂存
  setTimeout(() => {
    suppressAutoSave = false
  }, 0)
}

onMounted(loadConfig)

// ----------------- Tab 管理 -----------------
function addTab() {
  const tab = createTab()
  config.value.tabs.push(tab)
  currentTabId.value = tab.id
}

async function deleteTab(tab) {
  const name = tab.i18n[currentLang.value]?.passValue || '该标签页'
  try {
    await ElMessageBox.confirm(`确认删除「${name}」吗？删除后不可恢复。`, '删除确认', {
      type: 'warning',
      confirmButtonText: '确认删除',
      cancelButtonText: '取消'
    })
  } catch {
    return
  }
  const idx = config.value.tabs.findIndex((t) => t.id === tab.id)
  if (idx === -1) return
  config.value.tabs.splice(idx, 1)
  if (currentTabId.value === tab.id) {
    currentTabId.value = config.value.tabs[Math.max(0, idx - 1)]?.id || ''
  }
}

function selectTab(id) {
  currentTabId.value = id
}

function reorderTabs({ from, to }) {
  const arr = config.value.tabs
  const [moved] = arr.splice(from, 1)
  arr.splice(to, 0, moved)
}

// ----------------- 自动暂存（草稿） -----------------
let timer = null
watch(
  config,
  () => {
    if (!config.value || suppressAutoSave) return
    saveStatus.value = 'saving'
    clearTimeout(timer)
    timer = setTimeout(async () => {
      await api.saveDraft(config.value)
      saveStatus.value = 'saved'
    }, 800)
  },
  { deep: true }
)

// ----------------- 保存并生效 -----------------
async function publish() {
  if (!config.value?.tabs.length) {
    ElMessage.warning('请先添加至少一个标签页')
    return
  }
  // 校验：所有 Tab、所有语言的「传参值」「标题」必填
  for (const tab of config.value.tabs) {
    for (const l of LANGS) {
      const c = tab.i18n[l.key]
      if (!c.passValue?.trim()) {
        currentTabId.value = tab.id
        currentLang.value = l.key
        ElMessage.error(`请填写「${l.label}」下的传参值`)
        return
      }
      // 校验：必须上传封面
      if (!c.cover) {
        currentTabId.value = tab.id
        currentLang.value = l.key
        ElMessage.error(`请上传「${l.label}」下的封面`)
        return
      }
    }
  }
  publishing.value = true
  try {
    await api.publishEventConfig(config.value)
    ElMessage.success('已保存并生效')
  } finally {
    publishing.value = false
  }
}
</script>

<style scoped>
/* 语言切换分段控件 */
.lang-seg {
  display: inline-flex;
  background: #f2f3f5;
  border-radius: 6px;
  padding: 3px;
}
.seg-item {
  padding: 5px 16px;
  font-size: 13px;
  color: #5b6470;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: all 0.15s;
}
.seg-item.active {
  background: #fff;
  color: #1f2329;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 14px;
}
.save-status {
  font-size: 12px;
  color: #9aa1ab;
  min-width: 84px;
  text-align: right;
}

.no-tab {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9aa1ab;
  font-size: 14px;
}

.editor {
  max-width: 920px;
}
</style>
