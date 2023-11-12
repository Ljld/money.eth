<script setup lang='ts'>
import { ref } from 'vue'

defineProps<{
  msg: string
}>()

const userBalance = ref(7)
const contractBalance = ref(122)
</script>

<template>
  <h1>money.eth</h1>
  <div class="container">
    <div class="form send-form">
      <div class="input-group send-input-group">
        <input type="number" class="money-input" name="send-input" id="send-input">
        <span>ETH</span>
      </div>
      <button>Send money</button>
    </div>
    <div class="form withdraw-form">
      <div class="input-group withdraw-input-group">
        <input type="number" class="money-input" name="withdraw-input" id="withdraw-input">
        <span>ETH</span>
      </div>
      <button>Withdraw</button>
    </div>
  </div>
  <div class="balance-container">
    <span>My balance : {{ userBalance }} ETH</span>
    <span>Contract balance : {{ contractBalance }} ETH</span>
  </div>
</template>

<style scoped>
h1 {
  font-family: 'Zilla Slab', serif;
}

.container {
  display: flex;
  margin-bottom: 3em;
}

.balance-container {
  display: flex;
  flex-direction: column;
}

.form {
  display: flex;
  flex-direction: column;
}

.money-input {
  margin-right: 1em;
}

.input-group {
  padding: 3em;
}

button {
  margin: auto;
}
</style>
