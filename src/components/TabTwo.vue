<template>
  <div>Đây là tab 2</div>
  <div>{{ $store.state.user }}</div>
  <button @click="$store.state.user = 'tao la hung'">edit</button>
</template>
