<template>
  <div class="flex items-center h-screen justify-center">
    <a :href="url">
      <button
        class="bg-blue-400 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-semibold py-2 px-4"
      >
        Login
      </button>
    </a>
  </div>
</template>

<script>
export default {
  name: "Login",

  data: function() {
    return {
      url: process.env.VUE_APP_BASE_URL + "/auth/fortytwo",
    };
  },
};
</script>
