<template>
  <div class="spinner"></div>
</template>
<style>
.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: var(--primary);
  animation: spin 1s linear infinite;
  -webkit-animation: spin 1s linear infinite;
  align-self: center;
  justify-self: center;
}
@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>

<script>
export default {
  name: "Spinner",
};
</script>
