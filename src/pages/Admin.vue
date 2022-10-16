<template>
  <div>Admin Page</div>
  <router-link :to="{ name: 'Profile' }">Profile</router-link> |
  <router-link :to="{ name: 'Home' }">Home</router-link> |
  <router-link :to="{ name: 'SuperAdmin' }">SuperAdmin</router-link> |
  <router-link :to="{ name: 'Admin' }">Admin</router-link>
</template>
