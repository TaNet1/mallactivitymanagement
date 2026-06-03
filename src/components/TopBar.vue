<template>
  <header class="topbar">
    <div class="left">
      <el-icon class="collapse"><Fold /></el-icon>
      <span class="title">商场活动管理</span>
    </div>
    <div class="right">
      <el-icon class="globe"><Place /></el-icon>
      <div class="user">
        <img
          class="avatar"
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=momo"
          alt="avatar"
        />
        <span class="uname">momo.zxy</span>
      </div>
    </div>
  </header>
</template>

<script setup>
// 顶栏：静态展示
</script>

<style scoped>
.topbar {
  height: var(--topbar-h);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: #fff;
  border-bottom: 1px solid #ebedf0;
}
.left {
  display: flex;
  align-items: center;
  gap: 14px;
}
.collapse {
  font-size: 18px;
  color: #5b6470;
  cursor: pointer;
}
.title {
  font-size: 15px;
  color: #c8ccd2;
}
.right {
  display: flex;
  align-items: center;
  gap: 18px;
}
.globe {
  font-size: 18px;
  color: #5b6470;
  cursor: pointer;
}
.user {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #eee;
}
.uname {
  font-size: 14px;
  color: #1f2329;
}
</style>
