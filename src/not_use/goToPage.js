import eventBus from '@/not_use/eventBus';

export default function goToPage(pageName, pageParams) {
  eventBus.$emit('goToPage', pageName, pageParams);
}
