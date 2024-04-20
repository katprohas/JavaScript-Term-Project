--------------------------
	OVERVIEW
--------------------------
This site is the showcase for the CIT 190 term project. It features three interactive games themed mostly around cats and things that I like. 
1 - jigsaw puzzles
2 - cat pong
3 - cat wrangling

--------------------------
	GAME 1 - PUZZLES
--------------------------
Game 1 is a classic puzzle game using basically jquery to make the pieces drag and droppable. Select the image you want to load, and drag and drop the pieces to form the puzzle. 

-----|| Current Issues ||-----
- I would like to figure out how to randomize the puzzle pieces using javascript. However, because I have created "puzzle" shapes, it seems quite difficult to implement at this time. 
- a long term goal would be to figure out how to make the pieces "snap" into place, but that also seems really difficult if the pieces are uniquely shaped. 

-----|| Future release plans ||-----
If I had more time, I would have liked to add in puzzle options for cat pictures, but I only was able to use what I had on had at the time, which were nature pictures.

--------------------------
	GAME 2 - CAT PONG
--------------------------
Game 2 is a version of Pong, but with cats! It uses html canvas and javascript. There are options for 1-player and 2-player mode. 1-Player mode will play against the computer using the keyboard arrow keys; 2-player mode uses two "real" people, using both the WASD keys and the arrow keys to control the players. In either mode, the first to 5 points wins. 

-----|| Current Issues ||-----
- I was able to figure out how to import the images in place of the paddles and ball. The only "issue" is more of a nice to have; I would like to figure out at some point how to set a condition so the ball randomly spawns, or spawns in the direction of whoever lost the last point, but I do not have the capacity to look into that more at this time.

-----|| Plans for future release ||-----
See above regarding the random ball spawn. 

--------------------------
	GAME 3 - CAT WRANGLING
--------------------------
Game 3 is a javascript, text-based adventure for cat wrangling! The player can click through the button options to guide them through a story, and depending on what actions they choose, they have the potential to find cats and lose/gain health points! If you can find all 10 cats, you win. 

-----|| Current Issues ||-----
No real issues at this point, though there is plenty of room for refinement in the code.

-----|| Plans for future release||-----
There are many, many more things I could do to improve this game. I would like to figure out a way to have just "one" cat inventory item, and every time the player finds one, it increases a cat counter, rather than coding out a cat object as "cat1", "cat2",..."catN". 

I'd also like to find a way to make a flag so that when a user searches an area, it is set to "true" and they don't get duplicated cats - that is why I have the cats coded uniquely above, because as an individual single "cat", it was either the user could find the same one over and oevr again, or they find it once and then it wouldn't count cats in any other rooms because it was "already found". 

It would also be fun to color code the button options so if it was directional, it was green, or if it was giving up, red, or if it was a decision, set it to look different altogether as a visual aid to the player. 

If I was feeling adventurous, I might even look at a way to increase the options and add in more casualities/choices for the user. Rather than broadly saying "search the area", I could add in specific options like " investigate the tree grove" or "search in the burrow" etc. to allow more freedom of options for the player.

--------------------------
     FILE DIRECTORY
--------------------------
//home page//
finalProject/finalProject.html
finalProject/js/finalProject.js
finalProject/css/finalProject.css
finalProject/media/cat1.png 

//game 1//
finalProject/puzzles.html
- finalProject/northernLights.html
- finalProject/sunrise.html
- finalProject/leaves.html
finalProject/js/puzzles.js
finalProject/js/dragPuzzles.js
finalProject/css/puzzles.css
finalProject/media/puzzles/northernLights (1-25 pngs)
finalProject/media/puzzles/leaves (1-25 pngs)
finalProject/media/puzzles/puzzle_easy/sunrise (1-20 pngs)

//game 2//
finalProject/catPong.html
finalProject/js/catPong.js
finalProject/css/catPong.css
finalProject/media/catOne.png
finalProject/media/catTwo.png
finalProject/media/yarn.png

//game 3//
finalProject/catWrangling.html
finalProject/js/catWrangling.js
finalProject/css/catWrangling.css
finalProject/media/avenue-815297_1280.jpg

IMAGE SOURCES
- catOne.png and catTwo.png: "https://pixabay.com/vectors/cats-pets-animals-flower-domestic-7122943/", - yarn: "https://pixabay.com/vectors/ball-of-yarn-yarn-brown-knit-ball-297769/"

- text-adventure background: https://pixabay.com/photos/avenue-trees-path-sunbeams-sunrays-815297/

- puzzle images: sourced and taken by author.
--------------------------
   CONTACT INFORMATION
--------------------------
author: Katrina Prohaszka
email: kprohaszka@nmc.edu

--------------------------
	COPYRIGHT
--------------------------
All rights reserved, (c) Katrina Prohaszka 2024
Use allowed for educational purposes only.