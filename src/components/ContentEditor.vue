<template>
  <div class="editor">
    <!-- 传参值（必填） -->
    <div class="field">
      <label class="lbl"><span class="req">*</span> 传参值</label>
      <el-input
        v-model="content.passValue"
        placeholder="请输入传参值"
        maxlength="30"
        show-word-limit
      />
    </div>

    <!-- 标题（必填） -->
    <div class="field">
      <label class="lbl">标题</label>
      <el-input
        v-model="content.title"
        placeholder="请输入标题"
        maxlength="100"
        show-word-limit
      />
    </div>

    <!-- 持续时间 -->
    <div class="field">
      <label class="lbl">持续时间</label>
      <el-input
        v-model="content.duration"
        placeholder="例如：2026.06.01-2026.06.22"
      />
    </div>

    <!-- 下架日期（选填，不填则不下架；Tab 级，三语言共享） -->
    <div class="field">
      <label class="lbl">下架日期</label>
      <el-date-picker
        v-model="tab.delistAt"
        type="datetime"
        placeholder="不填则不下架"
        value-format="YYYY-MM-DD HH:mm:ss"
        format="YYYY-MM-DD HH:mm:ss"
        clearable
        style="width: 320px"
      />
      <p class="tip">不填写则该活动不会自动下架；该日期三种语言共享。</p>
    </div>

    <!-- 封面 + 轮播区域图片（左右并排） -->
    <div class="img-row">
      <div class="img-col">
        <label class="lbl"><span class="req">*</span> 封面</label>
        <ImageUploader
          v-model="content.cover"
          single
          hint="支持扩展名：jpg / jpeg / png，不超过 5MB，仅可传单张。"
        />
      </div>
      <div class="img-col">
        <label class="lbl">轮播区域图片</label>
        <ImageUploader
          v-model="content.images"
          hint="支持扩展名：jpg / jpeg / png，不超过 5MB，可上传多张。<br />若不上传图片，则前台自动全部显示下方 Markdown 内容。"
        />
      </div>
    </div>

    <!-- Markdown 正文 -->
    <div class="field">
      <label class="lbl">Markdown 正文</label>
      <VditorEditor v-model="content.markdown" />
    </div>
  </div>
</template>

<script setup>
import ImageUploader from './ImageUploader.vue'
import VditorEditor from './VditorEditor.vue'

// content 为当前 Tab + 当前语言对应的内容对象（来自父级响应式状态）。
// v-model 直接绑定其嵌套字段，编辑即写回该语言版本，切换不丢失。
// tab 为当前 Tab 对象，承载「下架日期」等三语言共享的 Tab 级字段。
defineProps({
  content: { type: Object, required: true },
  tab: { type: Object, required: true }
})
</script>

<style scoped>
.field {
  margin-bottom: 22px;
}
.lbl {
  display: block;
  font-size: 14px;
  color: #1f2329;
  margin-bottom: 10px;
}
.req {
  color: #f25b5b;
  margin-right: 2px;
}
.tip {
  margin: 8px 0 0;
  font-size: 12px;
  color: #9aa1ab;
}

.img-row {
  display: flex;
  gap: 48px;
  margin-bottom: 22px;
}
.img-col {
  min-width: 0;
}
</style>
