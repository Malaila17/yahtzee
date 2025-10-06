const btnGooi = document.getElementById("btnGooi");
const dobbelstenen =  document.getElementsByClassName("dobbelsteen");
const scoresSpel1Deel1 = document.getElementsByClassName("deel1 score spel1");
const scoresSpel1Deel2 = document.getElementsByClassName("deel2 score spel1");

// Gooit numDice dobbelstenen
function rollDice(numDice) {                    
    let worp = [];
    for (let i = 0; i < numDice; i++) {
        const dice = Math.ceil(Math.random()*6);
        worp.push(dice);

        for (let i=0; i<worp.length; i++) {
            dobbelstenen[i].innerHTML = worp[i];
            }
        }
    return worp
}

// Telt hoe vaak elke waarde voorkomt in worp
function countDice(worp) {                      
    let count = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0};
    for (let i = 0; i < worp.length; i++) {
        count[worp[i]]++
    }
    return count;
}

// Berekent alle mogelijke scores voor deel 1 en schrijft ze
function calcDeel1(count) {                    
    const scores = []
    for (let i in count){
        scoresSpel1Deel1[i-1].innerHTML = count[i]*i;
        scores.push(count[i]*i)
    }
    return scores;
}

// Berekent alle mogelijke scores voor deel 2
function calcDeel2(worp, count) {               
    let sumOfDice = worp.reduce((sum, dice) => {
        return sum + dice
    })

    // Controleert of er een aantal gelijke dobbelstenen in de worp is
    function checkSame(aantal) {                
        for (let num in count) {
            if (count[num] >= aantal) {                    
                return true;
                }
        }
        return false;
    }

    // Controleert voor full house
    function checkFullHouse() {                 
        for (let num in count) {
            if (count[num] == 1 || count[num] == 4 || count[num ==5]) {
                return false;
            }
        }
        return true;
    }

    // Controleert of er een straatje met bepaalde lengte in de worp is
    function checkStreet(streetLength) {        
        let straat = [];
        for (let num in count) {
            if (count[num] != 0) {
                straat.push(num)
            } else {
                if (straat.length < streetLength) {
                    straat = [];
                }
            }
        }
        if (straat.length >= streetLength) {
            return true;
        }
        return false; 
    }

    let boolDeel2 = {
        "threeOfAKind":checkSame(3),
        "carre":checkSame(4),
        "fullHouse":checkFullHouse(),
        "kleineStraat":checkStreet(4),
        "groteStraat":checkStreet(5),
        "yahtzee":checkSame(5),
        "chance":true
    };
    let maxScores = {
        "threeOfAKind":sumOfDice,
        "carre":sumOfDice,
        "fullHouse":25,
        "kleineStraat":30,
        "groteStraat":40,
        "yahtzee":50,
        "chance":sumOfDice
    };
    
    // Bepaalt of er wel of geen score genoteerd moet worden voor elke optie
    let scores = []
    for (let elem in boolDeel2) {
        if (boolDeel2[elem] == true) {
            scores.push(maxScores[elem]);
        } else {
            scores.push(0);
        }
    }
    threeOfAKindElement.innerHTML = checkSame(3) ? sumOfDice() : 0
    // Noteert de scores in het HTML scoreblok
    for (let i in scores){
        scoresSpel1Deel2[i].innerHTML = scores[i];
    }
    return scores
}

// Berekent alle totaalscores in het scoreblok
function calcTotals(deel1, deel2){
    let sumDeel1GeenBonus = deel1.reduce((a,b) => {
        return a+b
        })
        let sumDeel2 = deel2.reduce((a,b) => {
        return a+b
        })
        
    let bonus = 0
    if (sumDeel1GeenBonus >= 63) {
        bonus = 35
    }

    document.getElementsByClassName("ptVoorBonus spel1")[0].innerHTML = sumDeel1GeenBonus;
    document.getElementsByClassName("bonus spel1")[0].innerHTML = bonus;
    document.getElementsByClassName("ptDeel1 spel1")[0].innerHTML = sumDeel1GeenBonus + bonus;
    document.getElementsByClassName("ptDeel1 spel1")[1].innerHTML = sumDeel1GeenBonus + bonus;
    document.getElementsByClassName("ptDeel2 spel1")[0].innerHTML = sumDeel2;
    document.getElementsByClassName("ptTotaal spel1")[0].innerHTML = sumDeel1GeenBonus + bonus + sumDeel2;
}

// Acties wanneer er op "Gooien!" wordt geklikt
btnGooi.addEventListener("click", function() {
    let rolledDice = rollDice(5);
    //rolledDice = [3,5,4,2,4];           // gebruik om verschillende worpen te testen ipv regel hierboven
    const countedDice = countDice(rolledDice);
    const scoresDeel1 = calcDeel1(countedDice);
    const scoresDeel2 = calcDeel2(rolledDice, countedDice);
    calcTotals(scoresDeel1, scoresDeel2);
})
