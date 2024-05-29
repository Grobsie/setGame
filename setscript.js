document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.getElementById('startGameButton');
    const shuffleButton = document.getElementById('shuffleButton');
    const buttonContainer = document.getElementById('handPane');

    const deck = [];
    const hand = [[],[],[],[],[],[],[],[],[],[],[],[]];
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
        console.log("running fill hand");
        let container = document.getElementById("handPane");
        container.innerHTML = "";
        for (let i in hand){
            if (hand[i].length === 0){
                let x = Math.floor(Math.random() * deck.length);
                hand[i] = deck[x];
                deck.splice(x, 1);

                var cardContainer = document.createElement("div");
                for (let val = 0; val < hand[i][0];val++){
                    var shape = document.createElement("img");
                    shape.src = "img/"+hand[i][3]+"/"+hand[i][1] + hand[i][2]+".png"
                    shape.setAttribute("class", "shownCards");
                    shape.setAttribute("id", i);
                    cardContainer.appendChild(shape);
                }
                //cardContainer.innerHTML = hand[i];
                //cardContainer.setAttribute("class", "shownCards");
                //cardContainer.setAttribute("id", i);
                //cardContainer.setAttribute("onclick", "addSelection(" + i + ")");
                container.appendChild(cardContainer);
            }

        }	
    }

    function shuffle() {
        for (let cardInHand in hand){
            deck.push(hand[cardInHand]);
            hand[cardInHand] = [];
        }
        fillHand();
    }

    function waitForThreeSelections() {
        console.log("now waiting for presses");

        return new Promise((resolve) => {
            function buttonClickHandler(event) {
                if (event.target && event.target.classList.contains('shownCards')) {
                    const buttonId = event.target.getAttribute('id');
                    selection.push(buttonId);
                    console.log("adding " + buttonId);

                    if (selection.length >= 3) {
                        buttonContainer.removeEventListener('click', buttonClickHandler);
                        resolve(selection);
                    }
                }
            }

            buttonContainer.addEventListener('click', buttonClickHandler);
        });
    }

    //obsolete, use code for borders maybe later
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
                if (isSet(selection) == true) {
                    console.log("Yay it is a set");
                    removeSetFromHand(selection);
                } else {
                    console.log("Oh no it is not a set :(");
                }

                let selectedCardDivs = Array.from(document.getElementsByClassName("shownCards"));
                for (let indexOfElement in selectedCardDivs) {
                    selectedCardDivs[indexOfElement].style.border = "1px white solid";
                }
                selection.length = 0;
            }
        }
    }

    function removeSetFromHand(setArray) {
        for (let indexOfSetCard in setArray) {
            hand[hand.indexOf(setArray[indexOfSetCard])] = [];
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

    async function startGame() {
        deck.length = 0;
        selection.length = 0;
        console.log(hand);
        createDeck();
        //start while loop here
        while (true) {
            console.log("current hand is :");
            console.log(hand);
            fillHand();

            document.getElementById("deckSize").innerHTML = "decksize: " + deck.length;
            document.getElementById("log").innerHTML = "possible combinations: " + combinations(hand);
            await waitForThreeSelections();
            console.log("yay a selection has been made");
            if (isSet(selection) == true) {
                console.log("Yay it is a set");
                removeSetFromHand(selection);
            } else {
                console.log("Oh no it is not a set :(");
            }
            selection.length = 0;               
        }
         

    }
    console.log(hand);
    startGameButton.addEventListener('click', startGame);
    console.log(hand);
    startGameButton.addEventListener('click', shuffle);
});