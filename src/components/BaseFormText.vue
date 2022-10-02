<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <BaseFormInput :title="title" :error="error">
    <input class="form__input" :type="type" v-model="dataValue" :placeholder="placeholder" />
  </BaseFormInput>
</template>
<script>
import inputMixin from '@/mixins/inputMixin';

export default {
  props: {
    type: { default: 'text' },
  },
  mixins: [inputMixin],
};
</script>
