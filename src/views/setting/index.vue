<template>
    <div class="settings-page">
      <!-- 顶部返回栏 -->
      <div class="header">
        <button class="back-btn" @click="goBack">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          回到首页
        </button>
      </div>
  
      <div class="settings-content">
        <!-- 语言选择 -->
        <div class="setting-item">
          <label class="setting-label">语言</label>
          <div class="select-wrapper">
            <select v-model="settings.language" class="custom-select">
              <option value="zh">中文</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
  
        <!-- 主题选择 -->
        <div class="setting-item">
          <label class="setting-label">主题</label>
          <div class="theme-tabs">
            <button
              v-for="theme in themeOptions"
              :key="theme.value"
              class="theme-tab"
              :class="{ active: settings.theme === theme.value }"
              @click="settings.theme = theme.value"
            >
              {{ theme.label }}
            </button>
          </div>
        </div>
  
        <!-- 主题色选择 -->
        <div class="setting-item">
          <label class="setting-label">主题色</label>
          <div class="color-options">
            <button
              v-for="color in colorOptions"
              :key="color.value"
              class="color-btn"
              :class="{ active: settings.themeColor === color.value }"
              :style="{ backgroundColor: color.bg, borderColor: color.border }"
              @click="settings.themeColor = color.value"
            >
              <span class="check-icon" v-if="settings.themeColor === color.value">✓</span>
            </button>
          </div>
        </div>
  
        <!-- 默认模型选择 -->
        <div class="setting-item">
          <label class="setting-label">默认模型</label>
          <div class="select-wrapper">
            <select v-model="settings.defaultModel" class="custom-select">
              <option value="ernie-3.5">ERNIE-3.5-8K</option>
              <option value="ernie-4">ERNIE-4.0-8K</option>
              <option value="wenxin">文心一言</option>
            </select>
          </div>
        </div>
  
        <!-- 模型管理入口 -->
        <div class="setting-item">
          <label class="setting-label">模型管理</label>
          <a href="#" class="link-btn" @click.prevent="goToModelManagement">点击进入</a>
        </div>
      </div>
  
      <!-- 底部操作按钮 -->
      <div class="footer">
        <button class="save-btn" @click="handleSave">保存</button>
        <button class="cancel-btn" @click="handleCancel">取消</button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  // 主题选项
  const themeOptions = [
    { label: '深色', value: 'dark' },
    { label: '浅色', value: 'light' },
    { label: '系统自动', value: 'auto' }
  ]
  
  // 主题色选项（对应截图中的四个颜色）
  const colorOptions = [
    { label: '黄色', value: 'yellow', bg: '#fff3cd', border: '#ffc107' },
    { label: '紫色', value: 'purple', bg: '#e2d9f3', border: '#9333ea' },
    { label: '绿色', value: 'green', bg: '#d1e7dd', border: '#0f5132' },
    { label: '蓝色', value: 'blue', bg: '#cfe2ff', border: '#084298' }
  ]
  
  // 设置项数据
  const settings = reactive({
    language: 'zh',
    theme: 'dark',
    themeColor: 'purple',
    defaultModel: 'ernie-3.5'
  })
  
  // 返回首页
  const goBack = () => {
    router.push('/')
  }
  
  // 进入模型管理
  const goToModelManagement = () => {
    router.push('/model-management')
  }
  
  // 保存设置
  const handleSave = () => {
    console.log('保存设置:', settings)
    // 这里可以添加保存到本地存储或后端的逻辑
    router.push('/')
  }
  
  // 取消设置
  const handleCancel = () => {
    router.push('/')
  }
  </script>
  
  <style scoped lang="scss">
  .settings-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  /* 顶部返回栏 */
  .header {
    padding-bottom: 16px;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 16px;
  }
  
  .back-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: #666;
    font-size: 16px;
    cursor: pointer;
    transition: color 0.2s;
  
    &:hover {
      color: #333;
    }
  
    svg {
      stroke: currentColor;
    }
  }
  
  /* 设置内容区 */
  .settings-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 16px 0;
  }
  
  .setting-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 40px;
  }
  
  .setting-label {
    font-size: 16px;
    color: #333;
    width: 80px;
  }
  
  /* 下拉选择器样式 */
  .select-wrapper {
    flex: 1;
    max-width: 300px;
  }
  
  .custom-select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    background-color: #fff;
    font-size: 14px;
    color: #333;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 8px center;
    background-size: 16px;
  
    &:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
    }
  }
  
  /* 主题选项卡 */
  .theme-tabs {
    display: flex;
    gap: 24px;
  }
  
  .theme-tab {
    background: none;
    border: none;
    font-size: 16px;
    color: #666;
    cursor: pointer;
    padding: 4px 0;
    position: relative;
    transition: color 0.2s;
  
    &.active {
      color: #6366f1;
      font-weight: 500;
  
      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #6366f1;
      }
    }
  
    &:hover:not(.active) {
      color: #333;
    }
  }
  
  /* 主题色选项 */
  .color-options {
    display: flex;
    gap: 16px;
  }
  
  .color-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
    position: relative;
    transition: transform 0.2s;
  
    &.active {
      border-color: #6366f1;
      transform: scale(1.1);
    }
  
    .check-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #333;
      font-size: 14px;
      font-weight: bold;
    }
  }
  
  /* 链接按钮 */
  .link-btn {
    color: #6366f1;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    transition: color 0.2s;
  
    &:hover {
      color: #4f46e5;
      text-decoration: underline;
    }
  }
  
  /* 底部按钮 */
  .footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid #e5e5e5;
  }
  
  .save-btn,
  .cancel-btn {
    padding: 8px 20px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .save-btn {
    background-color: #6366f1;
    color: #fff;
    border: none;
  
    &:hover {
      background-color: #4f46e5;
    }
  }
  
  .cancel-btn {
    background-color: #fff;
    color: #333;
    border: 1px solid #d1d5db;
  
    &:hover {
      background-color: #f9fafb;
    }
  }
  </style>