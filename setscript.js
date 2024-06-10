document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.getElementById('startGameButton');
    const shuffleButton = document.getElementById('shuffleButton');
    const buttonContainer = document.getElementById('handPane');

    const deck = [];
    let hand = [[],[],[],[],[],[],[],[],[],[],[],[]];
    const selection = [];

    function createDeck() {
        deck.length = 0;
        selection.length = 0;
        hand = [[],[],[],[],[],[],[],[],[],[],[],[]];

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
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        for (let i in hand){
            if (hand[i].length === 0){
                let x = Math.floor(Math.random() * deck.length);
                hand[i] = deck[x];
                deck.splice(x, 1);
            }
            var cardContainer = document.createElement("div");
            var shapeGroup = document.createElement("div");
            cardContainer.setAttribute("class", "shownCards");
            cardContainer.setAttribute("id", i);
            
            for (let val = 0; val < hand[i][0];val++){
                var shape = document.createElement("img");
                shape.src = "img/"+hand[i][3]+"/"+hand[i][1] + hand[i][2]+".png"
                shape.setAttribute("class", "shape");
                //shape.setAttribute("id", i);
                shapeGroup.appendChild(shape);
            }
            cardContainer.appendChild(shapeGroup)
            container.appendChild(cardContainer);
        }
        //console.log("finished fillHand");
        if (deck.length > 10){
            document.getElementById("log").innerHTML = "possible combinations in hand: " + combinations(hand);
        } else {
            document.getElementById("log").innerHTML = "possible combinations in hand: " + combinations(hand) + ", possibilities in deck: " + combinations(deck.concat(hand));
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
        return new Promise((resolve) => {
            function buttonClickHandler(event) {
                const shownCardsDiv = event.target.closest('.shownCards');
                console.log(shownCardsDiv);
                if (shownCardsDiv != null) {
                    const buttonId = shownCardsDiv.getAttribute('id');
                    if (selection.includes(hand[buttonId]) === false) {
                        shownCardsDiv.style.border = "1px red solid";
                        selection.push(hand[buttonId]);                      
                    } else {
                        shownCardsDiv.style.border = "1px solid #000000";
                        selection.splice(hand[buttonId], 1);
                    }
                    console.log(selection);
                    if (selection.length >= 3) {
                        buttonContainer.removeEventListener('click', buttonClickHandler); 
                        resolve(selection);
                    }
                }
            }
            buttonContainer.addEventListener('click', buttonClickHandler);
        });
    }

    function removeSetFromHand(setArray) {
        console.log("running removeSetFromHand");
        for (let indexOfSetCard in setArray) {
            hand[hand.indexOf(setArray[indexOfSetCard])] = [];
        }
    }

    function isSet(selectedArray) {
        //console.log("running isSet");
        let match = 0;
        //console.log(selectedArray);
        for (i = 0; i < 4; i++) {
            if (selectedArray[0][i] == selectedArray[1][i] && selectedArray[0][i] == selectedArray[2][i]){
                //console.log(selectedArray[0][i] + " is equal to " + selectedArray[1][i] + " and " + selectedArray[0][i] + " is equal to " + selectedArray[2][i]);
                match++;
            } else if (selectedArray[0][i] != selectedArray[1][i] && selectedArray[0][i] != selectedArray[2][i] && selectedArray[1][i] != selectedArray[2][i]) {
                //console.log(selectedArray[0][i] + " is not equal to " + selectedArray[1][i] +  " and " + selectedArray[0][i] + " is not equal to " + selectedArray[2][i] + " and " + selectedArray[1][i] + " is not equal to " + selectedArray[2][i]);
                match++;
            }
        }
        return (match === 4);
        //for testing purposes every selection is a match
        //return true;
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
        createDeck();
        fillHand(); 
        while (true) {  
            document.getElementById("deckSize").innerHTML = "decksize: " + deck.length;
            await waitForThreeSelections();
            if (isSet(selection) == true) {
                removeSetFromHand(selection);
            }
            let selectedCardDivs = Array.from(document.getElementsByClassName("shownCards"));
            for (let indexOfElement in selectedCardDivs) {
                selectedCardDivs[indexOfElement].style.border = "1px white solid";
            }
            //console.log("we have passed the get selection function");
            selection.length = 0;   
            fillHand();        
        }
         

    }

    startGameButton.addEventListener('click', startGame);
    shuffleButton.addEventListener('click', shuffle);
});