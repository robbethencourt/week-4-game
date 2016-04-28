// Javascript function that wraps everything
$(document).ready(function(){

	var starWarsGame = {
		title_screen: $("#title-screen"),
		text_box: $("#text"),
		attack_button: $("#attack"),
		restart_button: $("#restart"),
		health_points_span: $(".health-points"),
		health_bar: $(".progress-bar"),
		ch_divs: $(".characters"),
		selected_characters: 4,
		active_enemies: 0,
		active_player: {},
		active_enemy: {},
		characters: [{
			name: "Padme",
			base_health_points: 200,
			health_points: 200,
			base_attack_power: 10,
			attack_power: 10,
			counter_attack_power: 10,
			ch_number: 0,
			dialogue_first: ["Ani, what have you done to yourself?", "Obi-Wan? Is that you? You've grown to be an old man. And now a ghost!", "Finally, a real man!"],
			dialogue_last: ["Time machines? I thought that was more of a James Cameron thing?", "WTF?! Have you lost your marbles old man? I signed a three picture deal and I'll be damned if I'm going to appear as a ghost and have to do more green screen work. It's demoralizing as an actor.", "No time for love, Lando. But that's the coolest cape in the galaxy. I want it!"]
		}, {
			name: "Vader",
			base_health_points: 460,
			health_points: 460,
			base_attack_power: 50,
			attack_power: 50,
			counter_attack_power: 50,
			ch_number: 1,
			dialogue_first: ["Padme, I've come back through time to eliminate the mother of the rebel alliance. Our love now means nothing to me.", "Wait wait wait. Is this what you thought would happen when I struck you down in Episode IV? (vader laughing, coughing, chocking on laughter) More powerful than I can imagine? (more laughing) Your a ghost! And your attack power is 1. What a joke. What are you going to creep around the corner and 'Boo' me to death? (more laughter)", "The Coruscant escorts sent to me last night were not up to the empire's standards. Did you not get the galactic memorandum on registered night workers? I'll need to thuroughly inspect each of your brothels. Hope I don't find any other violations."],
			dialogue_last: ["I've always hated the pet name 'Ani', feels like I should be in a musical. And don't even think of calling me Darthi. Prepare to die, my love.", "You smug old coot. No higher ground bs this time. I'm going to smash your midichlorians to smitherines. DIE!!!", "Honestly, Lando. I don't know what the hell you're ever yammering about. I'm tired of pretending to listen to you."]
		}, {
			name: "Ghost Obi-Wan",
			base_health_points: 999,
			health_points: 999,
			base_attack_power: 1,
			attack_power: 1,
			counter_attack_power: 1,
			ch_number: 2,
			dialogue_first: ["Padme, allow me to use my powers and save you as a force ghost. It does mean I have to strike you down though.", "You see, I did became stronger. My health is at a max 999 while yours is at a whimpy 460, my young padawan.", "Your mind is weak, Lando. And I need to build my attack power so I can finish off Vader once and for all. It'll be painless. I promise."],
			dialogue_last: ["Don't be scared. Anikan is with me now as well. He looked rather old in the original unremastered analog trilogy, but then got a Hollywood upgrade. Looks just as dashing as ever. Let me take you to him.", "You, are, so, OBNOQIOUS!!!", "Does everyone in the galaxy think that?"]
		}, {
			name: "Lando",
			base_health_points: 300,
			health_points: 300,
			base_attack_power: 20,
			attack_power: 20,
			counter_attack_power: 20,
			ch_number: 3,
			dialogue_first: ["Allow me to introduce myself, Lando: sex god of the galaxy.", "Take it easy, Vader. I've already given you Han and I can sweeten the deal further. I've got a suite full of cloud city escorts in my secluded wing that can bring your old tin can back to life. Know what I mean?", "You were in all 6 movies and were lucky Yoda was around to save your ass. You alienated Anikan and allowed the emperor to turn him into Vader. Luke was a whimp, and honestly, we can thank Vader for teaching him to grow a pair, and then when it was clear you were going to screw up the rest of Luke's training, Yoda convinced you to commit harikari so he could train Luke before you let another Jedi turn to the dark side. I'm surprised you didn't show up in The Force Awakens as the catalyst that unwittingly reintroduced the dark side back into the galaxy.", "So how did an obnoqious spolied white brat get that badass black outfit and a voice deeper than that pit Java tried to throw us in in part 3, no part 6, well, original part 3 actual part 6. Honeslty, it's a bit confusing. At least there aren't any part whatever part 2s, or subsection D of the 12th section of the seventh movie. These movies are beginning to read like legal documents."],
			dialogue_last: ["Like mother, like daughter. Wait, what year is it? If we, oh no. Leia could then be my...", "This deal is getting worse all the time.", "Your attack power is 1. You don't have a chance. And why are you blue? Is there a bug in the force ghost spells you perfromed that caused you to inherit Twi'lek genes?"]
		}],
		characters_length: 4,
		swg_theme_song: new Audio("assets/sounds/star-wars-game-imp-march-8bit.mp3"),

		// starts the game on load and can be called once the Restart button is pressed
		startGame: function () {

			// restart the theme song
			this.swg_theme_song.pause();
    		this.swg_theme_song.currentTime = 0;
			this.swg_theme_song.play();

			// fade in all the characters
			$(this.ch_divs).fadeIn(0);

			$(this.text_box).html("Choose one of the characters above as your character.");
			$(this.attack_button).prop('disabled', true);
			$(this.restart_button).prop('disabled', true);

			// health points
			// hard coding 4 as that is the max amount of players on screen at one time
			for (var i = 0; i < 4; i++) {

				// reseting the health points to the base health points and displaying on screen
				this.characters[i].health_points = this.characters[i].base_health_points;
				$(this.health_points_span[i]).html(this.characters[i].base_health_points);

				// reseting health bar
				$(this.health_bar[i]).css("width", "100%");

				// reseting attack power to base attack power
				this.characters[i].attack_power = this.characters[i].base_attack_power;

				// remove the .dead-character class from all the images
				$(this.ch_divs[i]).find("img").removeClass("dead-character");
				$(this.health_bar).removeClass("progress-bar-warning progress-bar-danger");

			} // end for loop

			// reset position of character divs
			$(this.ch_divs[0]).css({
				"top": "0",
				"right": "75%"
			});
			$(this.ch_divs[1]).css({
				"top": "0",
				"right": "50%"
			});
			$(this.ch_divs[2]).css({
				"top": "0",
				"right": "25%"
			});
			$(this.ch_divs[3]).css({
				"top": "0",
				"right": "0px"
			});

			// reset selected_characters to 4 so the initial character selected moves to the player's position
			this.selected_characters = 4;

			// reset active enemies to 0
			this.active_enemies = 0;

			// set the active player and active enemy to empty strings
			this.active_player = {};
			this.active_enemy = {};
		},

		// write the dialogue to the screen
		dialogueToScreen: function (ch1, ch2) {

			// passing in the spot in each array from the dialogueOptions function below
			$(this.text_box).html(this.active_player.name + ": " + this.active_player.dialogue_first[ch1]  + "<br /><br />" + this.active_enemy.name + ": " + this.active_enemy.dialogue_last[ch2]);
		},

		// Dialogue options based on which characters are facing off
		dialogueOptions: function () {

			// dialogue tree
			switch(this.active_player.ch_number) {

				// Padme is the active character
				case 0:
					switch(this.active_enemy.ch_number) {
						// Vader
						case 1:
							this.dialogueToScreen(0, 0);
							break;
						// Obi-Wan
						case 2:
							this.dialogueToScreen(1, 0);
							break;
						// Lando
						case 3:
							this.dialogueToScreen(2, 0);
							break;
						// default
							$(this.text_box).html("ATTACK!!!!!");
							break;
					} // end switch
				break;

				// Vader is the active character
				case 1:
					switch(this.active_enemy.ch_number) {
						// Padme is the active enemy
						case 0:
							this.dialogueToScreen(0, 0);
							break;
						// Obi-Wan is the active enemy
						case 2:
							this.dialogueToScreen(1, 1);
							break;
						// Lando is the active enemy
						case 3:
							this.dialogueToScreen(2, 1);
							break;
						// default
							$(this.text_box).html("ATTACK!!!!!");
							break;
					} // end switch
				break;

				// Obi-Wan is the active character
				case 2:
					switch(this.active_enemy.ch_number) {
						// Padme is the active enemy
						case 0:
							this.dialogueToScreen(0, 1);
							break;
						// Vader is the active enemy
						case 1:
							this.dialogueToScreen(1, 1);
							break;
						// Lando is the active enemy
						case 3:
							this.dialogueToScreen(2, 2);
							break;
						// default
							$(this.text_box).html("ATTACK!!!!!");
							break;
					} // end switch
				break;

				// Lando is the active character
				case 3:
					switch(this.active_enemy.ch_number) {
						// Padme is the active enemy
						case 0:
							this.dialogueToScreen(0, 2);
							break;
						// Vader is the active enemy
						case 1:
							this.dialogueToScreen(1, 2);
							break;
						// Obi-Wan is the active enemy
						case 2:
							this.dialogueToScreen(2, 2);
							break;
						// default
							$(this.text_box).html("ATTACK!!!!!");
							break;
					} // end switch
				break;
			} // end switch
		},

		// player choses a character function. This repoisitons the selected character on the gameboard and displays text asking the player to select the first enemy to engage.
		chosenPlayer: function (player) {

			// set the active_player to the character the player chose
			// loop through the characters array until the name of the character matches the one selected
			for (var i = 0; i < this.characters_length; i++) {
				
				// if there's a match
				if (this.characters[i].name === $(player).find(".name").text()) {

					// set the active player to the one selected
					this.active_player = this.characters[i];
				} // end if
			} // end for loop

			// reduce number of selected characters by 1
			this.selected_characters--;
			player.animate({
				top: "250px",
				right: "60%"
			}, 200);

			// display text asking the player to chose an enemy to attack
			$(this.text_box).html("Select an enemy to attack.");
		},

		// chose the enemy
		chosenEnemy: function (enemy) {

			// determine if there are active enemies so that only one enemy is positioned if the player mistakenly clicks a second enemy before the first enemy has been defeated
			if (this.active_enemies === 0) {

				// set the active_enemy to the character the enemy chose
				// loop through the characters array until the name of the character matches the one selected
				for (var i = 0; i < this.characters_length; i++) {
					
					// if there's a match
					if (this.characters[i].name === $(enemy).find(".name").text()) {

						// set the active enemy to the one selected
						this.active_enemy = this.characters[i];
					} // end if
				} // end for loop

				// reduce number of selected characters by 1
				this.selected_characters--;

				// move the enemy character to the left of the screen
				enemy.animate({
					top: "250px",
					right: "20%"
				}, 200);

				// set the active enemies to 1. This will be set to 0 once the enemy has been defeated.
				this.active_enemies = 1;

				// activate the attack button
				$(this.attack_button).prop('disabled', false);

				// add the dialogueOptions function
				this.dialogueOptions();
			}
		},

		// once the attackk button is pressed
		attack: function () {

			// Attack Section			
			// decrease the health points of the attacked enemy
			this.active_enemy.health_points = this.active_enemy.health_points - this.active_player.attack_power;

			// increase the attack power of the active player
			this.active_player.attack_power = this.active_player.attack_power + this.active_player.base_attack_power;

			// displays to the screen
			// update the active enemie's health points
			$(this.health_points_span[this.active_enemy.ch_number]).html(this.active_enemy.health_points);

			// store the percentage of the remaining healthbar in a variable
			var enemy_health_bar_percentage = (this.active_enemy.health_points / this.active_enemy.base_health_points) * 100;
			// if the health bar is below 50% add the bootstrap warning class to the progress bar
			if (enemy_health_bar_percentage < 50) {
				$(this.health_bar[this.active_enemy.ch_number]).addClass("progress-bar-warning");
			} // end if
			// if the health bar is below 20% add the bootstrap danger class to the progress bar
			if (enemy_health_bar_percentage < 20) {
				$(this.health_bar[this.active_enemy.ch_number]).addClass("progress-bar-danger");	
			} // end if
			// update the width of the progress bar
			$(this.health_bar[this.active_enemy.ch_number]).css("width", enemy_health_bar_percentage + "%");

			// Dead Enemy Character Section
			// if the active enemy's health points are 0 or below (meaning they're toast)
			if (this.active_enemy.health_points <= 0) {

				// if there are more enemie to fight
				if (this.selected_characters !== 0) {

					// display the name of the dead character to the screen with
					$(this.text_box).html("You have killed " + this.active_enemy.name + "<br /><br />Select another character to fight.");

				} else {

					// you have won the game so display a congratulatory message
					$(this.text_box).html("You have killed " + this.active_enemy.name + "<br /><br />Congratulations! You are the ruler of the galaxy.");

					// activate the Restart button
					$(this.restart_button).prop('disabled', false);

				} // end if else

				// set the health points to 0 so no negative numbers show
				$(this.health_points_span[this.active_enemy.ch_number]).html("0");

				// move the active enemy to the right of the screen, add the .dead-chaaracter class to the image and fade that character out
				$(this.ch_divs[this.active_enemy.ch_number]).animate({right: "0%"}, 200).fadeOut(1000 * 3);
				$(this.ch_divs[this.active_enemy.ch_number]).find("img").addClass("dead-character");
				//$(this.ch_divs[this.active_enemy.ch_number]).fadeOut(1000 * 5);

				// set the active enemy to an empty object and set the active number of enemies to 0
				this.active_enemy = {};
				this.active_enemies = 0;

				// deactivate the attack button
				$(this.attack_button).prop('disabled', true);

			} // end if


			// Counter Attack Section
			// if active enemy's character number is not undefined (meaning there is an active enemy)
			if (this.active_enemy.ch_number !== undefined) {

				// decrease the health points of the player by the counter attack power of the active enemy
				this.active_player.health_points = this.active_player.health_points - this.active_enemy.counter_attack_power;

				// displays to the screen
				// update the active player's health points
				$(this.health_points_span[this.active_player.ch_number]).html(this.active_player.health_points);

				// store the percentage of the remaining healthbar in a variable
				var player_health_bar_percentage = (this.active_player.health_points / this.active_player.base_health_points) * 100;
				// if the health bar is below 50% add the bootstrap warning class to the progress bar
				if (player_health_bar_percentage < 50) {
					$(this.health_bar[this.active_player.ch_number]).addClass("progress-bar-warning");
				} // end if
				// if the health bar is below 20% add the bootstrap danger class to the progress bar
				if (player_health_bar_percentage < 20) {
					$(this.health_bar[this.active_player.ch_number]).addClass("progress-bar-danger");	
				} // end if
				// update the width of the progress bar
				$(this.health_bar[this.active_player.ch_number]).css("width", player_health_bar_percentage + "%");

				// display the amount of damage done by each character on the screen
				$(this.text_box).html(this.active_enemy.name + " received " + this.active_player.attack_power + " points in damage. <br />" + this.active_player.name + " received " + this.active_enemy.counter_attack_power + " points in damage.");

			}

			// Dead Player Character Section
			if (this.active_player.health_points <= 0) {

				// set the health points to 0 so no negative numbers show
				$(this.health_points_span[this.active_player.ch_number]).html("0");

				// add the .dead-chaaracter class to the active player image
				$(this.ch_divs[this.active_player.ch_number]).find("img").addClass("dead-character");

				// display game over on the screen
				// you have won the game so display a congratulatory message
				$(this.text_box).html("You have been killed by " + this.active_enemy.name + "<br />GAME OVER");


				// deactivate the attack button
				$(this.attack_button).prop('disabled', true);

				// activate the Restart button
				$(this.restart_button).prop('disabled', false);

			}
		}
	}


	// starter functions and event handlers
	// removes title screen and will only display when the page is reloaded so the player can quickly play again
	$(starWarsGame.title_screen).on("click", function (e) {
		$(this).css("display", "none");
	})

	starWarsGame.startGame();

	$(starWarsGame.ch_divs).on("click", function (e) {

		if (starWarsGame.selected_characters === 4) {

			starWarsGame.chosenPlayer($(this));

		} else {

			starWarsGame.chosenEnemy($(this));

		} // end if else for chaaracter select

	}); // end character click event

	$(starWarsGame.attack_button).on("click", function (e) {

		starWarsGame.attack();

	});

	$(starWarsGame.restart_button).on("click", function (e) {

		starWarsGame.startGame();

	})

});