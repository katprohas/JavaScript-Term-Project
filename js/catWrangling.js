const text = document.getElementById("catWrangling-text");
const btnOptions = document.getElementById("option-btns");
const playerHealthElement = document.getElementById("player-health"); //when this one is "on", the health and inventory count stats show correctly, but the end game textNode 100 does not get pulled.
//const healthElement = document.getElementById("player-health"); //when this is "on", the end game textNode100 shows but health and inventory count stats do not
const playerInventoryElement = document.getElementById("player-inventory");
const inventoryCountElement = document.getElementById("inventory-count");

let state = {};
var health = 5;

function startGame() {
    state = {};
    health = 5;
    // displayGameState();
    showText(0.0);
}

function showText(textIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textIndex);
    text.innerText = textNode.text;

    // Clear the options
    while (btnOptions.firstChild) {
        btnOptions.removeChild(btnOptions.firstChild);
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement("button");
            button.innerText = option.text;
            button.classList.add("btn");
            button.addEventListener("click", () => chooseOption(option));
            btnOptions.appendChild(button);
        }
    });

    displayGameState();
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function chooseOption(option) {
    const nextTextId = option.nextText;
    if (nextTextId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState);
    if (option.healthChange) {
        state.health = (state.health || health) + option.healthChange;
        displayGameState();
    }
    if (option.objectsFound) {
        option.objectsFound.forEach(object => {
            if (state.inventory && state.inventory.includes(object)) {
                alert(`You've already found this cat!`);
            } else {
                state.inventory = state.inventory || [];
                state.inventory.push(object);
            }
        });
        state.inventoryCount = state.inventory.length;
        if (state.inventoryCount === 10) {
            // If the player has found all 10 items, show the game over message
            console.log("end game requirement met");
            showText(100);
            return;
        }
        if (nextTextId === 0.0) {
            startGame(); // Call startGame() if "Play again" option is selected
            return;
        }
        // else {
        //     showText(nextTextId);
        // }
    }

    // Check if the next node has an objectFound trigger
    const nextTextNode = textNodes.find(textNode => textNode.id === nextTextId);
    if (nextTextNode.options.some(opt => opt.objectsFound)) {
        // If the next node has an objectFound trigger, show the text
        showText(nextTextId);
    } else {
        // Otherwise, check if all objects are found
        if (state.inventoryCount === 10) {
            // If all objects are found, end the game
            console.log("end game requirement met");
            showText(100);
        } else {
            // Otherwise, show the text for the next node
            showText(nextTextId);
        }
    }
}

function displayGameState() {
    playerHealthElement.textContent = state.health || health;
    playerInventoryElement.textContent = state.inventory ? state.inventory.join(", ") : "";
    inventoryCountElement.textContent = state.inventory ? state.inventory.length : 0;
    if (state.health <= 0) {
        // If the player's health reaches zero or below, go to text node 101
        showText(101);
    }
}
const textNodes = [
    {
        id: 0.0,
        text: "You've gotten a call that several cats have been spotted in the area, about 10 of them. It is your job to search for and wrangle these cats! But beware! - there are many dangers afoot. Should you complete this task successfully, you shall be heralded as the greatest cat wrangler of all time.",
        options: [
            { text: "Start the adventure", nextText: 1.0 }
        ]
    },
    {
        id: 101,
        text: "Womp womp! I guess this task proved too tough even for you. You failed to wrangle all of the cats. Better luck next time!",
        options: [
            { text: "Play again", nextText: 0.0 }
        ]
    },
    {
        id: 100,
        text: "Congratulations, you've successfully wrangled the cats and beat the game!",
        options: [
            { text: "Play again", nextText: 0.0 }
        ]
    },
    {
        id: 1.0,
        text: "As you survey your surroundings, you see three paths: to the West (left) is a lightly worn trail leading off to a distant clearing. Straight ahead (North) is a path that leads toward what looks like a field. Off to the East (right), a path leads into a dark woods.",
        options: [
            { text: "Go west", nextText: 2.0 },
            { text: "Go north", nextText: 3.0 },
            { text: "Go east", nextText: 4.0 },
            { text: "Give up", nextText: 101 }
        ]
    },
    {
        id: 2.0,
        text: "You walk west, and come across a clearing that appears to be a dead end.",
        options: [
            { text: "Go east", nextText: 1.0 },
            { text: "Listen", nextText: 2.1 },
            { text: "Search the area", nextText: 2.2 },
            { text: "Give up", nextText: 101 }
        ]
    },
    {
        id: 2.1,
        text: "You stand still and hear a soft meow somewhere beyond the bushes.",
        options: [
            { text: "Go east.", nextText: 1.0 },
            { text: "Search the area", nextText: 2.2 },
            { text: "Give up", nextText: 101 }
        ]
    },
    {
        id: 2.2,
        text: "You crouch down and peer into the bushes, and find one cat! There is nothing else here.",

        options: [
            { text: "Continue", nextText: 2.0, objectsFound: ["Cat1"] }
        ]
    },
    {
        id: 3.0,
        text: "You head toward a large, expansive field. The grass is tall, making it difficult to see, but it is rather serene as you watch the grass sway gently in the wind. You don't find anything at a glance, except for the clear signs of the trail that runs north and south.",
        options: [
            { text: "Go south", nextText: 1.0 },
            { text: "Head north", nextText: 5.0 },
            { text: "Listen", nextText: 3.1 },
            { text: "Search the area", nextText: 3.2 },
            { text: "Give up", nextText: 101 }
        ]
    },
    {
        id: 3.1,
        text: "You pause and take a moment to listen to the sounds around you. You can hear the quiet humming of bees and the soft chirping of birds and crickets. The sounds of nature soothe your soul.",
        options: [
            { text: "Go south", nextText: 1.0 },
            { text: "Head north", nextText: 5.0 },
            { text: "Search the area", nextText: 3.2 },
            { text: "Give up", nextText: 101 }
        ]
    },
    {
        id: 3.2,
        text: "Glancing around reveals nothing of interest except for the path ahead and behind you.",
        options: [
            { text: "Continue", nextText: 3.0 },
        ]
    },
    {
        id: 4.0,
        text: "You head toward the dark, eery woods. Dead leaves crunch below your feet as you walk carefully to avoid roots and trawling weeds that scatter across the trail. You notice the trail is winding in a kind of L shape, revealing a path that leads only to the north and the west; otherwise, you are surrounded by trees and bushes.",
        options: [
            { text: "Go west", nextText: 1.0 },
            { text: "Head north", nextText: 6.0 },
            { text: "Listen", nextText: 4.1 },
            { text: "Search the area", nextText: 4.2 },
            { text: "Give up", nextText: 101 }
        ]
    },
    {
        id: 4.1,
        text: "You hold your breath and listen carefully; you hear the quiet snickering of squirrels and what perhaps might be the soft tread of some forest-dwelling creature.",
        options: [
            { text: "Go west", nextText: 1.0 },
            { text: "Head north", nextText: 6.0 },
            { text: "Search the area", nextText: 4.2 },
            { text: "Give up", nextText: 101 }
        ]
    },
    {
        id: 4.2,
        text: "You glance around carefully, and catch sight of two cats! You make a mad dash for them and successfully catch one, watching as the other cat darts north along the trail. Unfortunately, some of those weeds by your feet are actually poison ivy. Lose 1 health.",
        options: [
            { text: "Continue", nextText: 4.0, objectsFound: ["Cat2"], healthChange: -1 },

        ]
    },
    {
        id: 5.0,
        text: "You meander into a peaceful meadow scattered with wildflowers of all colors. You see the trail continues ahead to the north, but there is another path to the east that you can take as well.",
        options: [
            { text: "Go south", nextText: 3.0 },
            { text: "Head north", nextText: 9.0 },
            { text: "Listen", nextText: 5.1 },
            { text: "Search the area", nextText: 5.2 },
            { text: "Give up", nextText: 101 }
        ]
    },
    {
        id: 5.1,
        text: "You close your eyes and listen intently. You can hear the soft buzz of bumblebess and hummingbirds flit by, but what's that?...do I hear purring?",
        options: [
            { text: "Go back", nextText: 5.0 },
            { text: "Search the area", nextText: 5.2 },
            { text: "Give up", nextText: 101 }
        ]
    },
    {
        id: 5.2,
        text: "As you glance around, you see a small indentation in the middle of the meadow. You creep closer, and see that it is a sleepy cat! It's napping so soundly that you sneak up and wrangle it without any problems.",
        options: [
            { text: "Continue", nextText: 5.0, objectsFound: ["Cat3"] }
        ]
    },
    {
        id: 6.0,
        text: "You continue along the wooded trail, noticing that it gets much darker and quieter the further you go. As you continue on, you eventually reach a junction of trails. There is a trail in the north, and there is the trail in the south. To the west is a trail that seems to lead out of the woods as it looks lighter and much less sinister, and to the east is a trail that leads into the darkest part of the woods.",
        options: [
            { text: "Go south", nextText: 4.0 },
            { text: "Head north", nextText: 10.0 },
            { text: "Go west", nextText: 5.0 },
            { text: "Go east", nextText: 7.0 },
            { text: "Listen", nextText: 6.1 },
            { text: "Search the area", nextText: 6.2 },
            { text: "Give up", nextText: 101 }
        ]
    },
    {
        id: 6.1,
        text: "You squat down low to the ground and strain your ears for any signs of life. There is scuttling off to the side of you.",
        options: [
            { text: "Go south", nextText: 4.0 },
            { text: "Head north", nextText: 10.0 },
            { text: "Go west", nextText: 5.0 },
            { text: "Go east", nextText: 7.0 },
            { text: "Search the area", nextText: 6.2 },
            { text: "Give up", nextText: 101 }
        ]
    },
    {
        id: 6.2,
        text: "You spin around slowly, looking near the base of the trees for holes and tracks. Your vigilance pays off - not only do you find the cat from before, but you find another one hiding near some mushrooms! Those mushrooms do look awfully tasty...",
        options: [
            { text: "Continue", nextText: 6.3, objectsFound: ["Cat4", "Cat5"] }
        ]
    },
    {
        id: 6.3,
        text: "The mushrooms DO look like normal mushrooms, though you can't quite remember if these are the kind with the similar poisonous cousin....but you are starting to get kinda hungry...",
        options: [
            { text: "Eat a mushroom", nextText: 6.4 },
            { text: "Don't risk it", nextText: 6.0 }
        ]
    },
    {
        id: 6.4,
        text: "Your stomach wins the battle over logic, and you decide to nibble on a mushroom anyway. You're in luck! They are the nutritious kind of mushroom, and you gain 1 health.",
        options: [
            { text: "Continue", nextText: 6.0, healthChange: +1 },
        ]
    },

    {
        id: 7.0,
        text: "As you head into the deepest part of the woods, you come across a small cave hidden under an old pine grove. There are several clusters of bushes and undergrowth in this section of the woods, giving the impression that there are many places that a creature could hide. There don't appear to be any other paths besides the one you just came from.",
        options: [
            { text: "Go west", nextText: 6.0 },
            { text: "Listen", nextText: 7.1 },
            { text: "Search the area", nextText: 7.2 },
            { text: "Give up", nextText: 101 }
        ]
    },

    {
        id: 7.1,
        text: "You have a bad feeling about this place, but you strain your ears to catch any hints of life. You hear some rustling in the bushes near the cave entrance, and some deeper grumbling sound that almost sounds like snoring.",
        options: [
            { text: "Go west", nextText: 6.0 },
            { text: "Search the area", nextText: 7.2 },
            { text: "Give up", nextText: 101 }
        ]
    },

    {
        id: 7.2,
        text: "In your haste to leave the area as quickly as possible, you lunge into the bushes and manage to snag the tail of a cat! Unfortunately, the cave was occupied by a sleeping bear and all of your noise woke it up. Needless to say, the bear was not pleased. Lose 2 health.",
        options: [
            { text: "Continue", nextText: 7.0, objectsFound: ["Cat6"], healthChange: -2 },
        ]
    },
    {
        id: 8.0,
        text: "As you enter the area, you can see that there is a wide, curving river that seems to encompass a bank full of sand and reeds, almost like a private beachfront, cutting off any other points of access except that which you just arrived from. A breeze gently caresses you, and you can smell salt in the air, suggesting that there may be a larger body of water not far off.",
        options: [
            { text: "Go east", nextText: 9.0 },
            { text: "Listen", nextText: 8.1 },
            { text: "Search the area", nextText: 8.2 },
            { text: "Give up", nextText: 101 }
        ]
    },
    {
        id: 8.1,
        text: "As you quietly approach the river bank, you hear not just the murmuring of the water, but splashing! Is there something playing in the water...?",
        options: [
            { text: "Go east", nextText: 9.0 },
            { text: "Search the area", nextText: 8.2 },
            { text: "Give up", nextText: 101 }
        ]
    },
    {
        id: 8.2,
        text: "Making your final approach, you see 3 cats! One appears to be attempting to catch fish, while the other 2 are sunbathing peacefully on the bank. They pay you no mind, and you decide to do some fishing and cook some up over a small fire. The smells of the cooked fish lure the cats to you, and you quickly wrangle them all with out any hassle. Gain 2 health.",
        options: [
            { text: "Continue", nextText: 8.0, objectsFound: ["Cat7", "Cat8", "Cat9"], healthChange: +2 },
        ]
    },
    {
        id: 9.0,
        text: "As you continue walking, you come across a sparse area. You see a bridge toward the north, how exciting!...Oh, but this bridge isn't functional. I guess there's no crossing the river at this time. But you do see more paths! There are three in total: one in the east, the west, and the south.",
        options: [
            { text: "Go south", nextText: 5.0 },
            { text: "Go west", nextText: 8.0 },
            { text: "Go east", nextText: 10.0 },
            { text: "Listen", nextText: 9.1 },
            { text: "Search the area", nextText: 9.2 },
            { text: "Give up", nextText: 101 }
        ]
    },
    {
        id: 9.1,
        text: "You listen carefully, but besides the river, you don't hear anything of interest.",
        options: [
            { text: "Go south", nextText: 5.0 },
            { text: "Go west", nextText: 8.0 },
            { text: "Go east", nextText: 10.0 },
            { text: "Search the area", nextText: 9.2 },
            { text: "Give up", nextText: 101 }
        ]
    },
    {
        id: 9.2,
        text: "You look closely at and around the bridge for clues, but there's nary a track nor a whisker to be found. Guess you'd better continue on your way.",
        options: [
            { text: "Continue", nextText: 9.0 },
        ]
    },
    {
        id: 10.0,
        text: "Getting weary from your travels, you trudge out of the woods and discover an abandoned shack! It is looking pretty worn down, and it's clear it's been undisturbed by people for some time. Beyond the shack, there appears to be a cliff and some kind of moving water down below. You wander up to the shack, peering inside a window, but it's too dirty to see clearly. Glancing around the rest of the area, you notice that there is a path to the west in addition to one in the south.",
        options: [
            { text: "Go south", nextText: 6.0 },
            { text: "Go west", nextText: 9.0 },
            { text: "Listen", nextText: 10.1 },
            { text: "Search the area", nextText: 10.2 },
            { text: "Give up", nextText: 101 }
        ]
    },
    {
        id: 10.1,
        text: "You take a moment to catch your breath, and take in the sounds around you. The rushing of the river sounds distant from where you are high upon the cliff. As you walk nearer to the shack, you think you can hear something scritching inside.",
        options: [
            { text: "Go south", nextText: 6.0 },
            { text: "Go west", nextText: 9.0 },
            { text: "Search the area", nextText: 10.2 },
            { text: "Give up", nextText: 101 }
        ]
    },
    {
        id: 10.2,
        text: "Not noticing anything of interest in the outer surroundings, you throw caution to the wind and march up to the shack. You notice the door seems to be slightly ajar, and you push it open forcefully. The good news is you found a cat. The bad news is you startle it badly, and while you attempt to wrangle it, you receive some nasty scratches. Lose 1 health.",
        options: [
            { text: "Continue", nextText: 10.0, objectsFound: ["Cat11"], healthChange: -1 },
        ]
    },
]

startGame();