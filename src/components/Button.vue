<template>
  <button
    class="base-btn"
    :class="[variantClass, colorClass, sizeClass, { 'is-disabled': isDisabled, 'is-loading': loading }]"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <span v-if="loading" class="btn-spinner"></span>
    <span class="btn-content">
      <slot />
    </span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

type ButtonVariant = 'normal' | 'plain'
type ButtonSize = 'normal' | 'large' | 'small'
type ButtonColor = 'green' | 'blue' | 'gray' | 'red' | 'yellow'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    color?: ButtonColor
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    variant: 'normal',
    size: 'normal',
    color: 'green',
    disabled: false,
    loading: false,
  }
)

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const isDisabled = computed(() => props.disabled || props.loading)

const variantClass = computed(() =>
  props.variant === 'plain' ? 'btn-plain' : 'btn-normal'
)

const sizeClass = computed(() => {
  switch (props.size) {
    case 'large':
      return 'btn-lg'
    case 'small':
      return 'btn-sm'
    default:
      return 'btn-md'
  }
})

const colorClass = computed(() => {
  const prefix = props.variant === 'plain' ? 'btn-plain-' : 'btn-'
  return `${prefix}${props.color}`
})

const handleClick = (event: MouseEvent) => {
  if (isDisabled.value) return
  emit('click', event)
}
</script>

<style scoped lang="scss">
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid transparent;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  padding-inline: 14px;
  padding-block: 7px;
  gap: 6px;
  white-space: nowrap;

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.is-loading {
    cursor: wait;
  }
}

/* 尺寸 */
.btn-lg {
  padding-inline: 18px;
  padding-block: 9px;
  font-size: 15px;
}

.btn-md {
  /* 默认尺寸，已在 base 中设置 */
}

.btn-sm {
  padding-inline: 10px;
  padding-block: 5px;
  font-size: 13px;
}

/* 普通按钮色系 */
.btn-green {
  background-color: #16a34a;
  border-color: #16a34a;
  color: #fff;

  &:hover:not(.is-disabled) {
    background-color: #15803d;
    border-color: #15803d;
  }
}

.btn-blue {
  background-color: #2563eb;
  border-color: #2563eb;
  color: #fff;

  &:hover:not(.is-disabled) {
    background-color: #1d4ed8;
    border-color: #1d4ed8;
  }
}

.btn-gray {
  background-color: #e5e7eb;
  border-color: #e5e7eb;
  color: #111827;

  &:hover:not(.is-disabled) {
    background-color: #d1d5db;
    border-color: #d1d5db;
  }
}

.btn-red {
  background-color: #dc2626;
  border-color: #dc2626;
  color: #fff;

  &:hover:not(.is-disabled) {
    background-color: #b91c1c;
    border-color: #b91c1c;
  }
}

.btn-yellow {
  background-color: #facc15;
  border-color: #facc15;
  color: #854d0e;

  &:hover:not(.is-disabled) {
    background-color: #eab308;
    border-color: #eab308;
  }
}

/* plain 按钮（朴素、线框风格） */
.btn-plain {
  background-color: transparent;
}

.btn-plain-green {
  border-color: #16a34a;
  color: #16a34a;

  &:hover:not(.is-disabled) {
    background-color: rgba(22, 163, 74, 0.08);
  }
}

.btn-plain-blue {
  border-color: #2563eb;
  color: #2563eb;

  &:hover:not(.is-disabled) {
    background-color: rgba(37, 99, 235, 0.08);
  }
}

.btn-plain-gray {
  border-color: #9ca3af;
  color: #4b5563;

  &:hover:not(.is-disabled) {
    background-color: rgba(156, 163, 175, 0.12);
  }
}

.btn-plain-red {
  border-color: #dc2626;
  color: #dc2626;

  &:hover:not(.is-disabled) {
    background-color: rgba(220, 38, 38, 0.08);
  }
}

.btn-plain-yellow {
  border-color: #facc15;
  color: #854d0e;

  &:hover:not(.is-disabled) {
    background-color: rgba(250, 204, 21, 0.12);
  }
}

/* 加载中小菊花 */
.btn-spinner {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  border-width: 2px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.6);
  border-top-color: rgba(255, 255, 255, 1);
  animation: button-spin 0.7s linear infinite;
}

.btn-plain-green .btn-spinner,
.btn-plain-blue .btn-spinner,
.btn-plain-gray .btn-spinner,
.btn-plain-red .btn-spinner,
.btn-plain-yellow .btn-spinner {
  border-color: rgba(148, 163, 184, 0.6);
  border-top-color: rgba(148, 163, 184, 1);
}

.btn-content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

@keyframes button-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
