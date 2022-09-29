<template>
  <div class="error__container">
    <h2>{{ message }}</h2>
    <button class="error_button" @click="buttonAction">Попробовать еще раз</button>
  </div>
</template>
<script>
export default {
  props: ['message', 'buttonAction'],
};
</script>
<style scoped>
.error__container {
  display: flex;
  margin: 30px;
  flex-direction: column;
  align-items: center;
}

.error_button {
  padding: 20px;
  width: fit-content;
  background-color: #9eff00;
  border: 1px solid #222;
  color: #222;
  font-size: 20px;
}
</style>
