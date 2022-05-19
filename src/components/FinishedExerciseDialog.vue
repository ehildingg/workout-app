<template>
  <div v-show="show" class="overlay">
    <div class="dialog scale-in-center">
      <div class="dialog__content">
        <h1 v-text="title" class="dialog__title" />
        <img
          class="jello-horizontal"
          src="/assets/timata-logo.svg"
          alt="timata logo"
        />
        <h2 v-text="description" />
        <div class="buttons">
          <button class="buttons" @click="go">Routines</button>
          <button class="buttons" @click="stay">Stay</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: 'Good job!..'
      },
      description: {
        type: String,
        default: 'Description missing'
      },
      stay: {
        type: Function,
        default: console.log('Something went wrong')
      },
      go: {
        type: Function,
        default: console.log('Something went wrong')
      }
    }
  }
</script>

<style scoped>
  .buttons {
    margin-left: 1em;
    margin-right: 1em;
  }

  button {
    border-radius: 8px;
    border-style: none;
    background-color: white;
    background-image: none;
    color: black;
    background: linear-gradient(17deg, #04b76b, #6bff9d);

    font-family: Quicksand;
    font-weight: bold;
    padding: 0.5em 1em 0.5em 1em;

    font-size: 16px;
  }

  *,
  ::before,
  ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
  }

  .overlay {
    background-color: rgba(0, 0, 0, 0.4);
    height: 100%;
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 10;
  }
  .dialog {
    background: linear-gradient(17deg, #0467ba, #4be8f2);
    opacity: 0.95;
    border-radius: 1rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15em;
    max-width: 80%;
    width: 24rem;
    font-family: Quicksand;
    text-align: center;
  }
  .dialog__content {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  h1 {
    font-weight: bold;
    font-size: 30px;
    line-height: 1.75rem;
    margin-bottom: 1rem;
    color: black;
  }
  h2 {
    font-size: 20px;
    line-height: 1.25rem;
    margin-bottom: 1rem;

    color: black;
  }

  img {
    height: 50px;
    width: 50px;
  }

  .jello-horizontal {
    -webkit-animation: jello-horizontal 0.9s 1.5s both;
    animation: jello-horizontal 0.9s 1.5s both;
  }

  @-webkit-keyframes jello-horizontal {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
      transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
      transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
      transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
      transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
      transform: scale3d(1.05, 0.95, 1);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }
  @keyframes jello-horizontal {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
      transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
      transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
      transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
      transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
      transform: scale3d(1.05, 0.95, 1);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }

  .scale-in-center {
    -webkit-animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
    animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  @-webkit-keyframes scale-in-center {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }
  @keyframes scale-in-center {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
