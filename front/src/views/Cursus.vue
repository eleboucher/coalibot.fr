<template>
  <div class="flex">
    <div class="m-auto w-4/6 flex flex-col">
      <div class="flex flex-col">
        <router-link to="/" class="text-blue-400"
          >Back to the cursus list</router-link
        >
        <div>
          <label>Select the starting year:</label>
          <select
            v-model="selected_period"
            class="
              bg-white
              border border-gray-300
              rounded-md
              mx-4
              shadow-sm
              pl-3
              pr-4
              py-2
              text-left
              cursor-default
              focus:outline-none
              focus:ring-1
              focus:ring-indigo-500
              focus:border-indigo-500
              sm:text-sm
            "
          >
            <option v-for="k of starting_periods" :key="k">
              {{ k }}
            </option>
          </select>
        </div>
      </div>
      <spinner v-if="isLoading" />
      <div class="self-center justify-self-center flex flex-col">
        <p v-for="(item, index) in leaderboard" :key="item.id">
          {{ index + 1 }} - {{ item.login }}
          {{
            item.level.toLocaleString(undefined, {
              minimumIntegerDigits: 2,
              minimumFractionDigits: 2,
            })
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import client from "@/client"
import Spinner from "@/components/Spinner"
export default {
  name: "Cursus",
  components: {
    Spinner,
  },
  data() {
    return {
      starting_periods: [],
      selected_period: "",
      leaderboard: [],
      isLoading: false,
    }
  },
  watch: {
    selected_period: function (selected_period) {
      if (selected_period === "") return
      this.leaderboard = []
      this.isLoading = true
      client
        .get(`/cursus/${this.$route.params.cursus_id}/${selected_period}`)
        .then((response) => {
          this.leaderboard = response.data
          this.isLoading = false
        })
    },
  },
  mounted() {
    this.isLoading = true
    client.get(`/cursus/${this.$route.params.cursus_id}`).then((response) => {
      this.isLoading = false
      this.starting_periods = response.data.starting_periods
    })
  },
}
</script>
