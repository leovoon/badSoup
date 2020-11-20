<template>
  <div>
    <Navigation/>
    <Nuxt />
  </div>
</template>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

.jackInTheBox-enter-active, .jackInTheBox-leave-active { animation: jackInTheBox .8s; }
  .jackInTheBox-enter, .jackInTheBox-leave-active { animation: jackInTheBox .5s; }

.button--green {
  font-size: 1rem;
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
    color: #fff;
  background-color: #3b8070;
  text-decoration: none;
  padding: 1rem 3rem;
  margin: 3rem 1rem;
  cursor: pointer;
}

.button--green:hover {
  color: #fff;
  background-color: #62998c;
  
}

</style>
