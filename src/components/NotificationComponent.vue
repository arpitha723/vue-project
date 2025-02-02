<template>
  <div v-if="show" class="alert" :class="alertClass" role="alert">
    <strong>{{ title }}</strong> {{ message }}
    <button type="button" class="btn-close" aria-label="Close" @click="hide"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: '',
      title: '',
      alertClass: 'alert-info', // Default alert class
    };
  },
  methods: {
    showNotification({ title, message, type }) {
      this.title = title;
      this.message = message;
      this.alertClass = `alert-${type}`; // Alert type based on the value (success, danger, etc.)
      this.show = true;

      // Hide the notification after 5 seconds
      setTimeout(() => {
        this.show = false;
      }, 5000);
    },
    hide() {
      this.show = false;
    }
  }
};
</script>

<style scoped>
.alert {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1050;
  width: 300px;
  margin: 0;
}
</style>
