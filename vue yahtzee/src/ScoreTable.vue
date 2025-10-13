<script setup>
import {computed} from 'vue';
const dice = defineModel();

const count = computed(() => {
    const count_ = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
    };

    for (let i = 0; i < dice.value.length; i++) {
        count_[dice.value[i]]++;
    }
    return count_;
});

const sumOfDice = computed(() => {
    return dice.value.reduce((sum, die) => sum + die, 0);
});

const checkSame = numSame => {
    for (let num in count.value) {
        if (count.value[num] >= numSame) {
            return true;
        }
    }
    return false;
};

const checkStreet = streetLength => {
    let street = [];
    for (let num in count.value) {
        if (count.value[num] != 0) {
            street.push(num);
        } else {
            if (street.length < streetLength) {
                street = [];
            }
        }
    }
    if (street.length >= streetLength) {
        return true;
    }
    return false;
};

const threeOfAKind = computed(() => (checkSame(3) ? sumOfDice.value : 0));
const carre = computed(() => (checkSame(4) ? sumOfDice.value : 0));
const yahtzee = computed(() => (checkSame(5) ? 50 : 0));
const kleineStraat = computed(() => (checkStreet(4) ? 30 : 0));
const groteStraat = computed(() => (checkStreet(5) ? 40 : 0));
const fullHouse = computed(() => {
    for (let num in count.value) {
        if (count.value[num] == 1 || count.value[num] == 4 || count.value[num == 5]) {
            return 0;
        }
    }
    return 25;
});

const scoresPart1 = computed(() => {
    const scores = [];
    for (let num in count.value) {
        scores.push(count.value[num] * num);
    }
    return scores;
});
const scoresPart2 = [threeOfAKind, carre, fullHouse, kleineStraat, groteStraat, yahtzee, sumOfDice];

const totalTopNoBonus = computed(() => {
    return scoresPart1.value.reduce((sum, die) => sum + die, 0);
});
const bonus = computed(() => (totalTopNoBonus.value >= 63 ? 35 : 0));
const totalTop = computed(() => totalTopNoBonus.value + bonus.value);
const totalBottom = computed(
    () =>
        threeOfAKind.value +
        carre.value +
        fullHouse.value +
        kleineStraat.value +
        groteStraat.value +
        yahtzee.value +
        sumOfDice.value,
);
const totalGeneral = computed(() => totalBottom.value + totalTop.value);

const numerals = ['enen', 'tweeën', 'drieën', 'vieren', 'vijven', 'zessen'];
const namesPart2 = ['Three of a kind', 'Carré ', 'Full house ', 'Kleine straat', 'Grote straat', 'Yahtzee ', 'Chance '];
const explanationsPart2 = [
    '3 dezelfde',
    '4 dezelfde',
    '3+2 dezelfde',
    '4 opeenvolgend',
    '5 opeenvolgend',
    '5 dezelfde',
    'vrije keus',
];
const scoreGuidePart2 = [
    'Totaal v.d 5 stenen',
    'Totaal v.d 5 stenen',
    '25 pt',
    '30 pt',
    '40 pt',
    '50 pt',
    'Totaal v.d 5 stenen',
];
</script>

<template>
    <h2>Scoreblok</h2>
    <table id="scoreblok">
        <tr>
            <th>Deel 1</th>
            <th>Puntentelling</th>
            <th>Spel 1</th>
            <th>Spel 2</th>
        </tr>
        <tr v-for="(numeral, index) in numerals" :key="index">
            <td>{{ numeral[0].toUpperCase() }}{{ numeral.slice(1) }}</td>
            <td>Tel alle {{ numeral }}</td>
            <td>{{ scoresPart1[index] }}</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2">Totaal aantal punten</td>
            <td>{{ totalTopNoBonus }}</td>
            <td></td>
        </tr>
        <tr>
            <td>
                Bonus
                <br />
                <i>bij 63 of meer</i>
            </td>
            <td>35 pt</td>
            <td>{{ bonus }}</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2">Totaal bovenste helft</td>
            <td>{{ totalTop }}</td>
            <td></td>
        </tr>
        <tr>
            <th>Deel 2</th>
            <th>Puntentelling</th>
            <td></td>
            <td></td>
        </tr>
        <tr v-for="(score, index) in scoresPart2" :key="index">
            <td>
                {{ namesPart2[index] }}
                <br />
                <i>{{ explanationsPart2[index] }}</i>
            </td>
            <td>{{ scoreGuidePart2[index] }}</td>
            <td>{{ scoresPart2[index] }}</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2">Totaal onderste helft</td>
            <td>{{ totalBottom }}</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2">Totaal bovenste helft</td>
            <td>{{ totalTop }}</td>
            <td></td>
        </tr>
        <tr>
            <th colspan="2">Totaal generaal</th>
            <td>{{ totalGeneral }}</td>
            <td></td>
        </tr>
    </table>
</template>

<style scoped></style>
