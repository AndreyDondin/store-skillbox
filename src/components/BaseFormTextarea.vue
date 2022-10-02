<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <BaseFormInput :title="title" :error="error">
    <textarea
      class="form__input form__input--area"
      v-model="dataValue"
      :placeholder="placeholder"
    />
  </BaseFormInput>
</template>
<script>
import inputMixin from '@/mixins/inputMixin';

export default {
  mixins: [inputMixin],
};
</script>
