<script setup>
import {ref} from 'vue';
import ThrownDice from './ThrownDice.vue';
import ScoreTable from './ScoreTable.vue';

const dice = ref([]);
</script>

<template>
    <h1>Yahtzee!</h1>
    <ThrownDice v-model="dice" />
    <ScoreTable v-model="dice" />
</template>

<style scoped></style>
