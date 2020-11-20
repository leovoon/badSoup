<template>
  <div class="container">
    <h1 class="title">每日一句毒鸡汤</h1>
    <transition name="jackInTheBox">
      <article v-if="show">
        <keep-alive>
          <h2 class="subtitle">{{ msg }}</h2>
        </keep-alive>
      </article>
    </transition>
    <button @click="fetchSoup" class="button--green">来一个</button>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
export default {
  components: { Navigation },

  data() {
    return {
      msg: "按下面",
      show: false,
    };
  },

  methods: {
    async fetchSoup() {
      const res = await this.$axios.$get(
        "https://cors-anywhere.herokuapp.com/https://soul-soup.fe.workers.dev/"
      );
      this.msg = res.title;
      this.show = true;
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title,
.subtitle {
  display: block;
  letter-spacing: 1px;
}

.title {
  font-size: 2rem;
  color: #35495e;
  font-weight: 300;
}

article {
  background-color: rgba(0, 197, 142, 0.1);
  padding: 1.5rem 3rem;
  border-radius: 0.25rem;
  margin: 2rem 1rem;
}

.subtitle {
  font-weight: 300;
  font-size: 26px;
  color: #526488;
  word-spacing: 5px;
}
</style>
