<script setup>
import {ref, computed} from 'vue';
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

const numerals = ['enen', 'tweeën', 'drieën', 'vieren', 'vijven', 'zessen'];
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
            <td>{{ count[index + 1] * (index + 1) }}</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2">Totaal aantal punten</td>
            <td class="score ptVoorBonus spel1"></td>
            <td class="score ptVoorBonus spel2"></td>
        </tr>
        <tr>
            <td>
                Bonus
                <br />
                <i>bij 63 of meer</i>
            </td>
            <td class="puntentelling">35 pt</td>
            <td class="score bonus spel1"></td>
            <td class="score bonus spel2"></td>
        </tr>
        <tr>
            <td colspan="2">Totaal bovenste helft</td>
            <td class="score ptDeel1 spel1"></td>
            <td class="score ptDeel1 spel2"></td>
        </tr>
        <tr>
            <th colspan="2">Deel 2</th>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td class="deel2 worp">
                Three of a kind
                <br />
                <i>3 dezelfde</i>
            </td>
            <td class="deel2 puntentelling">Totaal v.d 5 stenen</td>
            <td class="deel2 score spel1"></td>
            <td class="deel2 score spel2"></td>
        </tr>
        <tr>
            <td class="deel2 worp">
                Carré
                <br />
                <i>4 dezelfde</i>
            </td>
            <td class="deel2 puntentelling">Totaal v.d 5 stenen</td>
            <td class="deel2 score spel1"></td>
            <td class="deel2 score spel2"></td>
        </tr>
        <tr>
            <td class="deel2 worp">
                Full house
                <br />
                <i>3+2 dezelfde</i>
            </td>
            <td class="deel2 puntentelling">25 pt</td>
            <td class="deel2 score spel1"></td>
            <td class="deel2 score spel2"></td>
        </tr>
        <tr>
            <td class="deel2 worp">
                Kleine straat
                <br />
                <i>4 opeenvolgend</i>
            </td>
            <td class="deel2 puntentelling">30 pt</td>
            <td class="deel2 score spel1"></td>
            <td class="deel2 score spel2"></td>
        </tr>
        <tr>
            <td class="deel2 worp">
                Grote straat
                <br />
                <i>5 opeenvolgend</i>
            </td>
            <td class="deel2 puntentelling">40 pt</td>
            <td class="deel2 score spel1"></td>
            <td class="deel2 score spel2"></td>
        </tr>
        <tr>
            <td class="deel2 worp">
                Yahtzee
                <br />
                <i>5 dezelfde</i>
            </td>
            <td class="deel2 puntentelling">50 pt</td>
            <td class="deel2 score spel1"></td>
            <td class="deel2 score spel2"></td>
        </tr>
        <tr>
            <td class="deel2 worp">
                Chance
                <br />
                <i>vrije keus</i>
            </td>
            <td class="deel2 puntentelling">Totaal v.d 5 stenen</td>
            <td class="deel2 score spel1"></td>
            <td class="deel2 score spel2"></td>
        </tr>
        <tr>
            <td colspan="2">Totaal onderste helft</td>
            <td class="score ptDeel2 spel1"></td>
            <td class="score ptDeel2 spel2"></td>
        </tr>
        <tr>
            <td colspan="2">Totaal bovenste helft</td>
            <td class="score ptDeel1 spel1"></td>
            <td class="score ptDeel1 spel2"></td>
        </tr>
        <tr>
            <th colspan="2">Totaal generaal</th>
            <td class="score ptTotaal spel1"></td>
            <td class="score ptTotaal spel2"></td>
        </tr>
    </table>
</template>

<style scoped></style>
