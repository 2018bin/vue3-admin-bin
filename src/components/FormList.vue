<template>
  <div class="form-warrper w-full">
    <a-form
      ref="formRef"
      :model="formData"
      size="small"
      :layout="config.layout"
      :auto-label-width="config.autoLabelWidth"
      :label-align="config.labelAlign"
      :disabled="disabled"
      @submit.prevent
    >
      <a-row :gutter="showAllForm ? 0 : 20">
        <a-col :span="showAllForm ? 24 : 23">
          <a-row :gutter="36">
            <transition-group mode="out-in">
              <a-col
                v-for="item of spliceFormlist"
                :key="item.value"
                :span="item.setLength ? item.setLength : 6"
                :offset="item.offset"
                :push="item.push"
                :class="item.class"
                :style="{
                  height: item.height
                    ? item.height
                    : item.type === 'checkbox'
                    ? 'auto'
                    : '60px',
                }"
              >
                <template
                  v-if="['input', 'text', 'textarea'].includes(item.type)"
                >
                  <a-form-item
                    :label="item.label"
                    :field="item.value"
                    :rules="item.rules"
                    label-col-flex="100px"
                  >
                    <a-input
                      :key="item.value"
                      v-model:model-value="formData[item.value]"
                      class="w-full"
                      :disabled="
                        item.alwaysDisabled || item.disabled || disabled
                      "
                      :max-length="item.config && item.config.maxLength"
                      allow-clear
                      @change="Emit(item.value, item, $event)"
                      @enter="Emit(`enter-${item.value}`, item, $event)"
                    />
                    <template #extra>
                      <div>{{ item.extra }}</div>
                    </template>
                  </a-form-item>
                </template>
                <template v-if="['number'].includes(item.type)">
                  <a-form-item
                    :label="item.label"
                    :field="item.value"
                    :rules="item.rules"
                    label-col-flex="100px"
                  >
                    <a-input-number
                      :key="item.value"
                      v-model="formData[item.value]"
                      class="w-full"
                      :disabled="
                        item.alwaysDisabled || item.disabled || disabled
                      "
                      allow-clear
                      @change="Emit(item.value, item, $event)"
                      @enter="Emit(`enter-${item.value}`, item, $event)"
                    />
                  </a-form-item>
                </template>
                <template v-else-if="item.type === 'monthPick'">
                  <a-form-item
                    :label="item.label"
                    :field="item.value"
                    :rules="item.rules"
                    label-col-flex="100px"
                  >
                    <a-month-picker
                      v-model="formData[item.value]"
                      class="w-full"
                      :disabled="
                        item.alwaysDisabled || item.disabled || disabled
                      "
                      :value-format="item.config && item.config.valueFormat"
                      @change="Emit(item.value, item, $event)"
                    />
                  </a-form-item>
                </template>
                <template v-else-if="item.type === 'datePick'">
                  <a-form-item
                    :label="item.label"
                    :field="item.value"
                    :rules="item.rules"
                    label-col-flex="100px"
                  >
                    <a-date-picker
                      v-model="formData[item.value]"
                      class="w-full"
                      :disabled="
                        item.alwaysDisabled || item.disabled || disabled
                      "
                      :value-format="item.config && item.config.valueFormat"
                      @change="Emit(item.value, item, $event)"
                    />
                  </a-form-item>
                </template>
                <template v-else-if="item.type === 'rangeDate'">
                  <a-form-item
                    :label="item.label"
                    :field="item.value"
                    :rules="item.rules"
                    label-col-flex="100px"
                  >
                    <a-range-picker
                      v-model="formData[item.value]"
                      class="w-full"
                      :disabled="
                        item.alwaysDisabled || item.disabled || disabled
                      "
                      :value-format="item.config && item.config.valueFormat"
                      @change="Emit(item.value, item, $event)"
                    />
                  </a-form-item>
                </template>
                <template v-else-if="item.type === 'select'">
                  <a-form-item
                    :label="item.label"
                    :field="item.value"
                    :rules="item.rules"
                    label-col-flex="100px"
                  >
                    <a-select
                      v-model="formData[item.value]"
                      class="w-full"
                      :disabled="
                        item.alwaysDisabled || item.disabled || disabled
                      "
                      :options="item.options"
                      allow-clear
                      allow-search
                      :multiple="!!(item.config && item.config.multiple)"
                      :max-tag-count="1"
                    />
                  </a-form-item>
                </template>
                <template v-else-if="item.type === 'switch'">
                  <a-form-item
                    :label="item.label"
                    :field="item.value"
                    :rules="item.rules"
                    label-col-flex="100px"
                  >
                    <a-switch
                      v-model="formData[item.value]"
                      :disabled="
                        item.alwaysDisabled || item.disabled || disabled
                      "
                      :checked-value="item.config.checkedValue"
                      :unchecked-value="item.config.uncheckedValue"
                    >
                      <template #checked>
                        {{ item.config.checkedTitle }}
                      </template>
                      <template #unchecked>
                        {{ item.config.uncheckedTitle }}
                      </template>
                    </a-switch>
                  </a-form-item>
                </template>
                <template v-else-if="item.type === 'other'">
                  <a-form-item
                    :label="item.label"
                    :field="item.value"
                    :rules="item.rules"
                    label-col-flex="100px"
                  >
                    <slot
                      :name="`Form-${item.value}`"
                      :item="item"
                      :form-data="formData"
                    />
                  </a-form-item>
                </template>
                <template v-else>
                  <slot :name="item.value" :item="item" :form-data="formData" />
                </template>
              </a-col>
            </transition-group>
          </a-row>
        </a-col>
        <a-col v-if="!showAllForm" :span="1">
          <div class="toggle-box color-info f12 hover" @click="toggle">
            <i :class="[toggleFlag ? 'icon-up  ' : 'icon-down']" />
          </div>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import {
    computed,
    onMounted,
    reactive,
    ref,
    toRaw,
    watch,
    toRefs,
    nextTick,
  } from 'vue';

  const props = defineProps({
    config: {
      default: () => {
        return {
          layout: 'horizontal',
          autoLabelWidth: false,
          labelAlign: 'right',
        };
      },
      type: Object,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    formList: {
      default: () => [],
      type: Array,
    },
    formData: {
      default: () => {
        return {};
      },
      type: Object,
    },
    showAllForm: {
      default: true,
      type: Boolean,
    },
    columnLine: {
      default: 4,
      type: Number,
    },
  });
  const { config, formData, showAllForm } = toRefs(props);
  const toggleFlag = ref(true);
  const spliceFormlist :any= computed(() => {
    if (showAllForm.value || toggleFlag.value) {
      return props.formList;
    }
    return props.formList.slice(0, props.columnLine);
  });
  const Emits = defineEmits(['fieldChange', 'toggle']);
  // 展开/收起
  const toggle = () => {
    Emits('toggle', !toggleFlag.value);
    toggleFlag.value = !toggleFlag.value;
  };

  const Emit = (name:string, itemObj:any, val:any) => {
    if (!name) return;

    const obj = {
      val,
      linkField: name,
      itemObj,
      formList: props.formList,
    };
    Emits('fieldChange', name, obj);
  };
  const formRef = ref();
  // 校验
  const validate = async () => {
    // eslint-disable-next-line no-return-await
    return await formRef.value.validate().then((e:any) => {
      if (e) {
        return Promise.reject(e);
      }
      return false;
    });
  };
  // 清除匹配规则
  const resetRules = () => {
    nextTick(() => {
      formRef.value.clearValidate();
    });
  };

  // 重置匹配规则
  const resetFields = () => {
    nextTick(() => {
      formRef.value.resetFields();
    });
  };
  defineExpose({
    validate,
    resetRules,
    resetFields,
  });
</script>

<style scoped>
  .arco-switch {
    background-color: var(--color-fill-4);
  }
  .arco-switch-checked {
    background-color: rgb(var(--primary-6));
  }
</style>
