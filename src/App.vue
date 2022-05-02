<script>
  import CitiesList from './components/CitiesList.vue'
  import CounterButton from './components/CounterButton.vue'
  import HelloWorld from './components/HelloWorld.vue'

  export default {
    components: {
      CitiesList,
      CounterButton,
      HelloWorld
    }
  }
</script>

<template>
  <nav>
    <p>hannes was here</p>
    <p>Tobias was not here</p>
    <p>Erik was here</p>
    <p>Helené was here</p>
    <ul>
      <li>
        <RouterLink to="/">Hem</RouterLink>
      </li>
      <li>
        <RouterLink to="/about">Om</RouterLink>
      </li>
      <li>
        <RouterLink to="/contact">Kontakt</RouterLink>
      </li>
    </ul>
  </nav>
  <HelloWorld msg="Hello World!" />
  <CitiesList />
  <CounterButton />
  <main>
    <RouterView />
  </main>
</template>
