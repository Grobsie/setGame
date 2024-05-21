const deck = [];
const hand = [];
const selection = [];

function createDeck() {
    const values = ["1","2","3"];
    const shapes = ["triangle", "circle", "diamond"];
    const shades = ["solid", "stripe", "open"];
    const colors = ["red", "blue", "green"];

    for (let value in values) {
        for (let shape in shapes){
            for (let shade in shades){
                for (let color in colors){
                    deck.push([values[value],shapes[shape],shades[shade],colors[color]]);
                }
            }
        }
    }
}

function fillHand() {
    let container = document.getElementById("handPane");
    container.innerHTML = "";
    for (let i = hand.length; i < 12; i++){
        let x = Math.floor(Math.random() * deck.length);
        hand.push(deck[x]);
        deck.splice(x, 1);

        var cardContainer = document.createElement("div");
        for (let val = 0; val < hand[i][0];val++){
            var shape = document.createElement("img");
            shape.src = "img/"+hand[i][3]+"/"+hand[i][1] + hand[i][2]+".png"
            shape.innerHTML = hand[i][1] + hand[i][2] + hand[i][3];
            cardContainer.appendChild(shape);
        }
        //cardContainer.innerHTML = hand[i];
        cardContainer.setAttribute("class", "shownCards");
        cardContainer.setAttribute("id", i);
        cardContainer.setAttribute("onclick", "addSelection(" + i + ")");
        container.appendChild(cardContainer);
    }	
}

function shuffle() {
    for (let cardInHand in hand){
        deck.push(hand[cardInHand]);
    }
    hand.length = 0;
    fillHand()
}

function addSelection(arrIndex) {
    let clickedCard = hand[arrIndex];
    let cardDiv = document.getElementById(arrIndex);
    if (selection.includes(clickedCard)) {
        cardDiv.style.border = "1px white solid";
        selection.splice(clickedCard, 1); 
    } else {
        cardDiv.style.border = "1px black solid";
        console.log(clickedCard);
        selection.push(clickedCard);
        if (selection.length === 3){
            console.log(isSet(selection));
            let selectedCardDivs = document.getElementsByClassName("shownCards");
            for (let indexOfElement in selectedCardDivs) {
                console.log(selectedCardDivs);
                selectedCardDivs[indexOfElement].style.border = "1px white solid";
            }
            if (isSet(selection) == true) {
                removeSetFromHand(selection)
            }

        }
    }
}

function removeSetFromHand(setArray) {
    for (let indexOfSetCard in setArray) {
        hand.splice(setArray[indexOfSetCard],1)
    }
}

function isSet(selectedArray) {
    let match = 0;
    for (i = 0; i < 4; i++) {
        if (selectedArray[0][i] == selectedArray[1][i] && selectedArray[0][i] == selectedArray[2][i]){
            match++;
        } else if (selectedArray[0][i] != selectedArray[1][i] && selectedArray[0][i] != selectedArray[2][i] && selectedArray[1][i] != selectedArray[2][i]) {
            match++;
        }
    }
    selection.length = 0;
    return (match === 4);
}

function combinations(cards) {
    const results = [];
    let possiblecombinations = 0;
    
    function combine(startIndex, combination) {
        if (combination.length === 3) {
            results.push([...combination]);
            return;
        }
        
        for (let i = startIndex; i < cards.length; i++) {
            combination.push(cards[i]);
            combine(i + 1, combination);
            combination.pop();
        }
    }
    
    combine(0, []);
    //check every entry if it is in fact a set
    for (let set in results){
        if (isSet(results[set]) == true) {
            possiblecombinations++;
        }
    }
    return possiblecombinations;
}

function startGame() {
    deck.length = 0;
    hand.length = 0;
    selection.length = 0;
    createDeck();
    fillHand();
    document.getElementById("deckSize").innerHTML = "decksize: " + deck.length;


    document.getElementById("log").innerHTML = "possible combinations: " + combinations(hand); 
    console.log(hand);
    
}


//create hasSet function which checks for amount of possible matches in Deck, hand and selection

//start game:createDeck
//while possible matches in deck != 0
    //while possible matches in hand != 0
        //while selection.length != 3
            //wait for adding cards
        //isset?
            //removecards from hand
    //shuffle


    