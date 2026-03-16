<template>
  <div class="settings-page">
    <!-- 顶部选项卡 -->
    <div class="settings-tabs">
      <div 
        class="tab-item" 
        :class="{ active: activeTab === 'general' }"
        @click="activeTab = 'general'"
      >
        {{ t('settings.tabs.general') }}
      </div>
      <div 
        class="tab-item" 
        :class="{ active: activeTab === 'model' }"
        @click="activeTab = 'model'"
      >
        {{ t('settings.tabs.model') }}
      </div>
    </div>

    <!-- 设置内容区 -->
    <div class="settings-content" v-if="activeTab === 'general'">
      <!-- 语言选择 -->
      <div class="setting-row">
        <label class="setting-label">{{ t('settings.general.language') }}</label>
        <div class="setting-control">
          <select v-model="settings.language" class="styled-select" @change="changeLanguage">
            <option value="zh">{{ t('common.zh') }}</option>
            <option value="en">{{ t('common.en') }}</option>
          </select>
        </div>
      </div>

      <!-- 主题选择 -->
      <div class="setting-row">
        <label class="setting-label">{{ t('settings.general.theme') }}</label>
        <div class="setting-control">
          <div class="theme-selector">
            <div 
              v-for="theme in themeOptions" 
              :key="theme.value"
              class="theme-option"
              :class="{ active: settings.theme === theme.value }"
              @click="settings.theme = theme.value"
            >
              {{ t(`settings.general.themes.${theme.value}`) }}
            </div>
          </div>
        </div>
      </div>

      <!-- 主题色选择 -->
      <div class="setting-row">
        <label class="setting-label">{{ t('settings.general.themeColor') }}</label>
        <div class="setting-control">
          <div class="color-palette">
            <div 
              v-for="color in colorOptions" 
              :key="color.value"
              class="color-circle"
              :class="{ active: settings.themeColor === color.value }"
              :style="{ backgroundColor: color.bg, border: `2px solid ${color.border}` }"
              @click="settings.themeColor = color.value"
            ></div>
          </div>
        </div>
      </div>

      <!-- 默认模型选择 -->
      <div class="setting-row">
        <label class="setting-label">{{ t('settings.general.defaultModel') }}</label>
        <div class="setting-control">
          <select v-model="settings.defaultModel" class="styled-select">
            <option value="ernie-4.0-8k">ERNIE-4.0-8K</option>
            <option value="qwen-plus">Qwen-Plus</option>
            <option value="gpt-4o">GPT-4o</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 模型设置面板 -->
    <div class="settings-content" v-else>
      <div class="model-list">
        <div 
          v-for="provider in modelProviders" 
          :key="provider.id"
          class="model-card"
          :class="{ expanded: expandedProvider === provider.id }"
        >
          <!-- 卡片头部 -->
          <div class="model-card-header" @click="toggleProvider(provider.id)">
            <div class="provider-info">
              <Icon :icon="provider.icon" class="provider-icon" />
              <span class="provider-name">{{ provider.name }}</span>
            </div>
            <Icon 
              icon="radix-icons:chevron-down" 
              class="arrow-icon" 
              :class="{ rotated: expandedProvider === provider.id }"
            />
          </div>

          <!-- 卡片内容表单 -->
          <div class="model-card-body" v-if="expandedProvider === provider.id">
            <div class="form-row">
              <label>{{ t('settings.model.accessKey') }}</label>
              <el-input 
                type="password" 
                v-model="provider.config.accessKey" 
                placeholder="abcd"
                show-password
                class="form-input-el"
              />
            </div>
            <div class="form-row">
              <label>{{ t('settings.model.secretKey') }}</label>
              <el-input 
                type="password" 
                v-model="provider.config.secretKey" 
                placeholder="abcd"
                show-password
                class="form-input-el"
              />
            </div>
            <div class="form-row">
              <label>{{ t('settings.model.baseUrl') }}</label>
              <el-input 
                type="text" 
                v-model="provider.config.baseUrl" 
                placeholder="abcd"
                class="form-input-el"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部按钮区 -->
    <div class="settings-footer">
      <button class="btn btn-save" @click="handleSave">{{ t('common.save') }}</button>
      <button class="btn btn-cancel" @click="handleCancel">{{ t('common.cancel') }}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const router = useRouter()
const activeTab = ref('general')

const expandedProvider = ref<string | null>('baidu') // 默认展开第一个

// 语言切换
const changeLanguage = () => {
  locale.value = settings.language
  localStorage.setItem('language', settings.language)
  // 通知主进程更新菜单语言
  if ((window as any).app?.updateMenuLocale) {
    (window as any).app.updateMenuLocale(settings.language)
  }
}

onMounted(async () => {
  // 从主进程加载保存的配置
  if ((window as any).app?.getConfig) {
    const savedConfig = await (window as any).app.getConfig();
    if (savedConfig.modelProviders) {
      // 合并保存的配置到当前列表
      savedConfig.modelProviders.forEach((saved: any) => {
        const provider = modelProviders.find(p => p.id === saved.id);
        if (provider) {
          Object.assign(provider.config, saved.config);
        }
      });
    }
    if (savedConfig.general) {
      Object.assign(settings, savedConfig.general);
     
    }
  }
});

// 模型服务商数据
const modelProviders = reactive([
  {
    id: 'baidu',
    name: '百度千帆',
    icon: 'simple-icons:baidu',
    config: { accessKey: '', secretKey: '', baseUrl: '' }
  },
  {
    id: 'aliyun',
    name: '阿里千问',
    icon: 'ant-design:aliyun-outlined',
    config: { accessKey: '', secretKey: '', baseUrl: '' }
  },
  {
    id: 'openai',
    name: 'OpenAI',
    icon: 'simple-icons:openai',
    config: { accessKey: '', secretKey: '', baseUrl: '' }
  },
  {
    id: 'anthropic',
    name: 'Claude',
    icon: 'simple-icons:anthropic',
    config: { accessKey: '', secretKey: '', baseUrl: '' }
  }
])

const toggleProvider = (id: string) => {
  expandedProvider.value = expandedProvider.value === id ? null : id
}

// 主题选项
const themeOptions = [
  { label: '深色', value: 'dark' },
  { label: '浅色', value: 'light' },
  { label: '系统自动', value: 'auto' }
]

// 主题色选项
const colorOptions = [
  { label: '黄色', value: 'yellow', bg: '#fff9db', border: '#fcc419' },
  { label: '紫色', value: 'purple', bg: '#f3f0ff', border: '#7950f2' },
  { label: '绿色', value: 'green', bg: '#ebfbee', border: '#40c057' },
  { label: '蓝色', value: 'blue', bg: '#e7f5ff', border: '#339af0' }
]

// 设置项数据
const settings = reactive({
  language: locale.value,
  theme: 'dark',
  themeColor: 'purple',
  defaultModel: 'ernie-4.0-8k'
})

// 保存设置
const handleSave = async () => {
  
  const fullConfig = {
    general: { ...settings },
    modelProviders: JSON.parse(JSON.stringify(modelProviders))
  };

  if ((window as any).app?.saveConfig) {
    const result = await (window as any).app.saveConfig(fullConfig);
    if (result.success) {
      console.log('配置保存成功');
      router.push('/');
    } else {
      alert('保存失败: ' + result.error);
    }
  } else {
    router.push('/');
  }
}

// 取消设置
const handleCancel = () => {
  router.push('/')
}
</script>

<style scoped lang="scss">
.settings-page {
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  color: #333;
}

/* 顶部选项卡 */
.settings-tabs {
  display: flex;
  gap: 30px;
  padding: 20px 0;
  border-bottom: 1px solid #f1f3f5;
  margin-bottom: 40px;

  .tab-item {
    font-size: 16px;
    font-weight: 500;
    color: #495057;
    cursor: pointer;
    position: relative;
    padding-bottom: 8px;
    transition: all 0.2s;

    &:hover {
      color: #7950f2;
    }

    &.active {
      color: #7950f2;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: #7950f2;
        border-radius: 2px;
      }
    }
  }
}

/* 设置内容区 */
.settings-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 600px;
}

.setting-row {
  display: flex;
  align-items: center;
}

.setting-label {
  width: 120px;
  font-size: 15px;
  color: #343a40;
  font-weight: 500;
}

.setting-control {
  flex: 1;
}

/* 下拉框 */
.styled-select {
  width: 260px;
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 14px;
  color: #495057;
  outline: none;
  background-color: #fff;
  cursor: pointer;

  &:focus {
    border-color: #7950f2;
  }
}

/* 主题选择器 */
.theme-selector {
  display: flex;
  gap: 24px;

  .theme-option {
    font-size: 15px;
    color: #868e96;
    cursor: pointer;
    position: relative;
    padding-bottom: 4px;
    transition: all 0.2s;

    &.active {
      color: #7950f2;
      font-weight: 600;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #7950f2;
      }
    }

    &:hover:not(.active) {
      color: #495057;
    }
  }
}

/* 调色板 */
.color-palette {
  display: flex;
  gap: 20px;

  .color-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: scale(1.1);
    }

    &.active {
      transform: scale(1.15);
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px #7950f2;
    }
  }
}

/* 底部按钮 */
.settings-footer {
  margin-top: auto;
  padding: 30px 0;
  border-top: 1px solid #f1f3f5;
  display: flex;
  justify-content: flex-end;
  gap: 16px;

  .btn {
    padding: 10px 24px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: none;

    &.btn-save {
      background-color: #7950f2;
      color: #fff;

      &:hover {
        background-color: #6741d9;
      }
    }

    &.btn-cancel {
      background-color: #f1f3f5;
      color: #495057;

      &:hover {
        background-color: #e9ecef;
      }
    }
  }
}

/* 模型设置列表 */
.model-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.model-card {
  border: 1px solid #dee2e6;
  border-radius: 4px;
  overflow: hidden;
  background-color: #fff;
  transition: all 0.2s;

  &.expanded {
    border-color: #7950f2;
    box-shadow: 0 2px 12px rgba(121, 80, 242, 0.08);
  }
}

.model-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  cursor: pointer;
  background-color: #f8fafc;

  &:hover {
    background-color: #f1f5f9;
  }

  .provider-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .provider-icon {
      font-size: 20px;
      color: #495057;
    }

    .provider-name {
      font-size: 15px;
      font-weight: 500;
      color: #343a40;
    }
  }

  .arrow-icon {
    font-size: 18px;
    color: #adb5bd;
    transition: transform 0.2s;

    &.rotated {
      transform: rotate(180deg);
      color: #7950f2;
    }
  }
}

.model-card-body {
  padding: 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  border-top: 1px solid #f1f3f5;

  .form-row {
    display: flex;
    align-items: center;
    gap: 20px;

    label {
      width: 100px;
      font-size: 14px;
      color: #495057;
      font-weight: 500;
    }

    .form-input-el {
      flex: 1;
      max-width: 360px;
    }
  }
}

.empty-state {
  text-align: center;
  color: #adb5bd;
  margin-top: 100px;
}
</style>