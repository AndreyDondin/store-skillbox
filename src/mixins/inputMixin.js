import BaseFormInput from '@/components/BaseFormInput.vue';

export default {
  props: ['title', 'error', 'placeholder', 'value'],
  components: { BaseFormInput },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
