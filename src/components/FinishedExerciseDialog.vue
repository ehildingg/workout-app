<template>
  <div v-show="show" class="overlay">
    <div class="dialog">
      <div class="dialog__content">
        <h2 v-text="title" />
        <p v-text="description" />
      </div>

      <hr />

      <div class="dialog__footer">
        <button @click="stay">Stay here</button>
        <button @click="go">Go back to Routines</button>
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
  button {
    background-color: transparent;
    background-image: none;
    color: black;
    cursor: pointer;
  }

  *,
  ::before,
  ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    font-size: inherit;
    font-weight: inherit;
    color: black;
  }

  .overlay {
    --tw-bg-opacity: 1;
    background-color: rgba(0, 0, 0, var(--tw-bg-opacity));
    --tw-bg-opacity: 0.5;
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
    --tw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
    border-radius: 0.75rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50%;
    max-width: 80%;
    width: 24rem;
  }
  .dialog__content {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .dialog__title {
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1.75rem;
    margin-bottom: 0.5rem;
    --tw-text-opacity: 1;
    color: rgba(17, 24, 39, var(--tw-text-opacity));
  }
  .dialog__description {
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin-bottom: 1rem;
    --tw-text-opacity: 1;
    color: rgba(107, 114, 128, var(--tw-text-opacity));
  }
  .dialog__footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  @media (min-width: 640px) {
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 1024px) {
  }
  @media (min-width: 1280px) {
  }
  @media (min-width: 1536px) {
  }
</style>
