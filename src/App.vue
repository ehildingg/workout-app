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
<<<<<<< HEAD
    <p>Tobias was here wefwfe</p>
=======
    <p>Tobias was hereeeeeeee</p>
    <p>Tobias is in the houseee</p>
    <p>hannes is herejeaioujfnsio</p>
    <p>Erik was here</p>
    <p>Helené was hereeee</p>
>>>>>>> 8da39416a2904d1e746561fb042311a05058f22b
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
