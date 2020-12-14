<template>
  <div class="flex h-screen">
    <div class="m-auto">
      <h1 class="m-auto w-min text-3xl my-10">Cursus</h1>
      <div
        class="flex flex-wrap w-4/6 self-center flex-row justify-center m-auto"
      >
        <router-link
          v-for="k in cursus"
          :key="k.name"
          :to="{ name: 'Cursus', params: { cursus_id: k.id } }"
        >
          <button
            class="bg-blue-400 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-semibold p-2 m-5"
          >
            {{ k.name }}
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import client from "@/client";
export default {
  name: "Home",
  data() {
    return {
      cursus: [],
    };
  },
  mounted() {
    client.get("/cursus").then((response) => (this.cursus = response.data));
  },
};
</script>
