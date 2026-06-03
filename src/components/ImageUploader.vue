<template>
  <div class="uploader">
    <div class="grid">
      <div v-for="(img, i) in list" :key="i" class="thumb">
        <img :src="img.url" :alt="img.name" />
        <span class="del" title="删除" @click="remove(i)">
          <el-icon><Close /></el-icon>
        </span>
      </div>

      <!-- 单张模式下：已有图片则隐藏上传框 -->
      <div v-if="!(single && list.length)" class="box" @click="pick">
        <el-icon class="plus"><Plus /></el-icon>
        <span class="txt">上传</span>
      </div>
    </div>

    <input
      ref="fileRef"
      type="file"
      accept="image/jpeg,image/png"
      :multiple="!single"
      hidden
      @change="onChange"
    />

    <p class="hint" v-html="hint"></p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { uploadImage } from '../api/event.js'

const props = defineProps({
  // single=true 时 modelValue 为 { url, name } | null；否则为数组
  modelValue: { type: [Array, Object], default: null },
  single: { type: Boolean, default: false },
  hint: {
    type: String,
    default: '支持扩展名：jpg / jpeg / png，不超过 5MB，可上传多张。'
  }
})
const emit = defineEmits(['update:modelValue'])

const fileRef = ref(null)
const ALLOW = ['image/jpeg', 'image/png']
const MAX = 5 * 1024 * 1024

// 统一以数组形式渲染
const list = computed(() => {
  if (props.single) return props.modelValue ? [props.modelValue] : []
  return props.modelValue || []
})

function pick() {
  fileRef.value.click()
}

async function onChange(e) {
  const files = Array.from(e.target.files || [])

  if (props.single) {
    const f = files[0]
    if (f && validate(f)) {
      const img = await uploadImage(f)
      emit('update:modelValue', img)
    }
    e.target.value = ''
    return
  }

  const next = [...(props.modelValue || [])]
  for (const f of files) {
    if (!validate(f)) continue
    const img = await uploadImage(f)
    next.push(img)
  }
  emit('update:modelValue', next)
  e.target.value = ''
}

function validate(f) {
  if (!ALLOW.includes(f.type)) {
    ElMessage.error(`「${f.name}」格式不支持，仅支持 jpg / jpeg / png`)
    return false
  }
  if (f.size > MAX) {
    ElMessage.error(`「${f.name}」超过 5MB`)
    return false
  }
  return true
}

function remove(i) {
  if (props.single) {
    emit('update:modelValue', null)
    return
  }
  const next = props.modelValue.slice()
  next.splice(i, 1)
  emit('update:modelValue', next)
}
</script>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.thumb,
.box {
  width: 104px;
  height: 104px;
  border-radius: 6px;
}
.thumb {
  position: relative;
  border: 1px solid #ebedf0;
  overflow: hidden;
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumb .del {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
}
.thumb:hover .del {
  display: inline-flex;
}
.box {
  border: 1px dashed #d4d7dd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9aa1ab;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.box:hover {
  border-color: var(--el-color-primary);
  color: var(--el-color-primary);
}
.box .plus {
  font-size: 22px;
  margin-bottom: 6px;
}
.box .txt {
  font-size: 13px;
}
.hint {
  margin: 10px 0 0;
  font-size: 12px;
  color: #9aa1ab;
  line-height: 1.7;
}
</style>
