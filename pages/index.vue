<template>
  <div class="container">
    <h1 class="title">每日一句毒鸡汤</h1>
    <transition-fade>
      <article v-if="show && data">
        <h2 class="subtitle">{{ data.title }}</h2>
      </article>
    </transition-fade>
    <button @click="handleClick" class="button--green">来一个</button>
  </div>
</template>

<script setup>
import { TransitionFade } from "@morev/vue-transitions";
const show = ref(false);
const { data, execute } = await useFetch("/api/soup", { pick: ["title"] });

const handleClick = () => {
  show.value = true;
  execute();
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
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
