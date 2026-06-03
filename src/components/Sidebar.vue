<template>
  <aside class="sidebar">
    <div class="logo">
      <span class="logo-main">2077</span><span class="logo-dot">.</span
      ><span class="logo-ai">Λi</span>
    </div>
    <nav class="nav">
      <div
        v-for="item in navItems"
        :key="item.key"
        class="nav-item"
        :class="{ active: item.key === 'event' }"
      >
        <span class="nav-ico">
          <el-icon><component :is="item.icon" /></el-icon>
        </span>
        <span class="nav-label">{{ item.label }}</span>
        <el-icon v-if="item.children" class="nav-arrow"><ArrowDown /></el-icon>
      </div>
    </nav>
  </aside>
</template>

<script setup>
// 左侧导航：静态展示（写死），仅「商场活动管理」为当前激活项
const navItems = [
  { key: 'home', label: '首页', icon: 'Odometer' },
  { key: 'common', label: '通用配置', icon: 'Setting' },
  { key: 'shop', label: '商铺管理', icon: 'Shop' },
  { key: 'food', label: '美食管理', icon: 'KnifeFork', children: true },
  { key: 'facility', label: '商场设施管理', icon: 'OfficeBuilding', children: true },
  { key: 'service', label: '商场服务管理', icon: 'Service', children: true },
  { key: 'promotion', label: '宣传推广管理', icon: 'Promotion' },
  { key: 'traffic', label: '周边交通管理', icon: 'Van' },
  { key: 'company', label: '船务公司管理', icon: 'Ship' },
  { key: 'spot', label: '景点管理', icon: 'LocationInformation' },
  { key: 'social', label: '社交媒体管理', icon: 'Share' },
  { key: 'event', label: '商场活动管理', icon: 'Calendar' }
]
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-w);
  flex-shrink: 0;
  background: var(--sidebar-bg);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.logo {
  height: var(--topbar-h);
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: var(--sidebar-header-bg);
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 1px;
  font-style: italic;
}
.logo-main {
  color: #fff;
}
.logo-dot {
  color: #2f6bff;
}
.logo-ai {
  color: #34d6e0;
}

.nav {
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  color: var(--sidebar-text);
  font-size: 14px;
  cursor: pointer;
  user-select: none;
}
.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
}
.nav-item.active {
  background: var(--sidebar-active);
  color: #fff;
}

.nav-ico {
  width: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 16px;
}
.nav-label {
  flex: 1;
  white-space: nowrap;
}
.nav-arrow {
  font-size: 12px;
  opacity: 0.7;
}
</style>
