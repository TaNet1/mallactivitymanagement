<template>
  <div class="left-panel">
    <!-- 模块 Tab 管理 -->
    <div class="tab-head">
      <span class="tab-head-label">模块 Tab</span>
      <span class="add-btn" @click="$emit('add-tab')">
        <el-icon><Plus /></el-icon>添加
      </span>
    </div>

    <div class="tab-list">
      <div
        v-for="(tab, index) in tabs"
        :key="tab.id"
        class="tab-item"
        :class="{ active: tab.id === currentTabId, dragging: dragIndex === index }"
        draggable="true"
        @click="$emit('select-tab', tab.id)"
        @dragstart="onDragStart(index)"
        @dragover.prevent="onDragOver(index)"
        @drop="onDrop(index)"
        @dragend="onDragEnd"
      >
        <el-icon class="handle"><Rank /></el-icon>
        <span class="tab-name">{{ tabName(tab) }}</span>
        <el-icon class="close" title="删除" @click.stop="$emit('delete-tab', tab)">
          <Close />
        </el-icon>
      </div>

      <div v-if="!tabs.length" class="empty-tip">
        暂无标签页，点击「+ 添加」创建
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  tabs: { type: Array, default: () => [] },
  currentTabId: { type: String, default: '' },
  lang: { type: String, default: 'zh-CN' }
})

const emit = defineEmits(['add-tab', 'delete-tab', 'select-tab', 'reorder'])

// 左侧列表展示当前语言下的「传参值」作为 Tab 名称
function tabName(tab) {
  return tab.i18n[props.lang]?.passValue || '未命名'
}

// ----- 原生拖拽排序 -----
const dragIndex = ref(-1)

function onDragStart(i) {
  dragIndex.value = i
}
function onDragOver(i) {
  // 允许放置
}
function onDrop(i) {
  if (dragIndex.value === -1 || dragIndex.value === i) return
  emit('reorder', { from: dragIndex.value, to: i })
  dragIndex.value = -1
}
function onDragEnd() {
  dragIndex.value = -1
}
</script>

<style scoped>
.tab-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid #eef0f2;
}
.tab-head-label {
  font-size: 13px;
  color: #6b7280;
}
.add-btn {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 13px;
  color: var(--el-color-primary);
  cursor: pointer;
}

.tab-list {
  flex: 1;
  overflow-y: auto;
  margin-top: 12px;
}

.tab-item {
  display: flex;
  align-items: center;
  height: 38px;
  padding: 0 8px;
  margin-bottom: 8px;
  border: 1px solid #e6e8eb;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.tab-item:hover {
  border-color: var(--el-color-primary);
}
.tab-item.active {
  border-color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
}
.tab-item.dragging {
  opacity: 0.5;
}
.handle {
  color: #b8bdc6;
  cursor: grab;
  margin-right: 6px;
  font-size: 14px;
}
.tab-name {
  flex: 1;
  font-size: 13px;
  color: #1f2329;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.close {
  color: #f25b5b;
  font-size: 14px;
  visibility: hidden;
}
.tab-item:hover .close,
.tab-item.active .close {
  visibility: visible;
}

.empty-tip {
  text-align: center;
  color: #b8bdc6;
  font-size: 13px;
  padding-top: 40px;
}
</style>
