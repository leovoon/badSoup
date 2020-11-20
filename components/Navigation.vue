<template>
    <nav transition="fade" mode="out-in">
          <NuxtLink to="/">鸡汤</NuxtLink>
          <span class="separator">|</span>
  <NuxtLink to="/about">关于</NuxtLink>

    </nav>
</template>

<style scoped>



nav {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50px;
}

nav > a {
    font-size: 1.8rem;
    padding: 1rem;
    text-decoration: none;
    color: #0BAB64;
    cursor: pointer;

}

.separator {
    color: lightgray;
}

.nuxt-link-exact-active {
    font-weight: bold;

}


</style>