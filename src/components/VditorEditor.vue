<template>
  <div ref="elRef" class="vditor-wrap"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { uploadImage } from '../api/event.js'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '这个区域是 Markdown 编辑区域' }
})
const emit = defineEmits(['update:modelValue'])

const elRef = ref(null)
let vditor = null
let ready = false

onMounted(() => {
  vditor = new Vditor(elRef.value, {
    height: 380,
    mode: 'ir',
    placeholder: props.placeholder,
    cache: { enable: false },
    toolbarConfig: { pin: true },
    toolbar: [
      'emoji',
      'headings',
      'bold',
      'italic',
      'strike',
      'link',
      '|',
      'list',
      'ordered-list',
      'check',
      'outdent',
      'indent',
      '|',
      'quote',
      'line',
      'code',
      'inline-code',
      'insert-before',
      'insert-after',
      '|',
      'upload',
      'table',
      '|',
      'undo',
      'redo',
      '|',
      'fullscreen',
      'edit-mode',
      {
        name: 'more',
        toolbar: ['both', 'code-theme', 'content-theme', 'export', 'outline', 'preview', 'devtools', 'info', 'help']
      }
    ],
    // 正文内插入图片：走统一的上传接口
    upload: {
      accept: 'image/jpeg,image/png,image/jpg',
      async handler(files) {
        for (const f of files) {
          const { url, name } = await uploadImage(f)
          vditor.insertValue(`![${name}](${url})\n`)
        }
        return null
      }
    },
    after() {
      ready = true
      vditor.setValue(props.modelValue || '')
    },
    input(value) {
      emit('update:modelValue', value)
    }
  })
})

// 切换 Tab / 语言时，外部 modelValue 变化 -> 同步到编辑器；
// 用户输入引起的变化（val === 当前值）不会触发 setValue，避免光标跳动。
watch(
  () => props.modelValue,
  (val) => {
    if (ready && vditor && val !== vditor.getValue()) {
      vditor.setValue(val || '')
    }
  }
)

onBeforeUnmount(() => {
  if (vditor) {
    vditor.destroy()
    vditor = null
  }
})
</script>

<style scoped>
.vditor-wrap {
  border-radius: 6px;
}
</style>
