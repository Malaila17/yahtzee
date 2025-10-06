<script setup>
const dice = defineModel();

const rollDice = () => {
    dice.value.length = 0;
    for (let i = 0; i < 5; i++) {
        const thrownDie = Math.ceil(Math.random() * 6);
        dice.value.push(thrownDie);
    }
};
</script>

<template>
    <div>
        <button @click="rollDice">Gooi!</button>
        <table>
            <tr>
                <td v-for="(die, index) in dice" :key="index">{{ die }}</td>
            </tr>
        </table>
    </div>
</template>

<style scoped></style>
