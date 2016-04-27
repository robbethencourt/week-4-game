// Javascript function that wraps everything
$(document).ready(function(){

	var starWarsGame = {
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
			ch_number: 0
		}, {
			name: "Vader",
			base_health_points: 460,
			health_points: 460,
			base_attack_power: 50,
			attack_power: 50,
			counter_attack_power: 50,
			ch_number: 1
		}, {
			name: "Ghost Obi-Wan",
			base_health_points: 999,
			health_points: 999,
			base_attack_power: 1,
			attack_power: 1,
			counter_attack_power: 1,
			ch_number: 2
		}, {
			name: "Lando",
			base_health_points: 300,
			health_points: 300,
			base_attack_power: 20,
			attack_power: 20,
			counter_attack_power: 20,
			ch_number: 3
		}],
		characters_length: 4,
		swg_theme_song: new Audio("assets/sounds/star-wars-game-imp-march-8bit.mp3"),

		// starts the game on load and can be called once the Restart button is pressed
		startGame: function () {

			// restart the theme song
			this.swg_theme_song.pause();
    		this.swg_theme_song.currentTime = 0;
			this.swg_theme_song.play();

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

		//
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

				// display text asking the player to chose an enemy to attack
				$(this.text_box).html("ATTACK!!!!!");
			}
		},

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
					$(this.text_box).html("You have killed " + this.active_enemy.name + "<br />Select another character to fight.");

				} else {

					// you have won the game so display a congratulatory message
					$(this.text_box).html("You have killed " + this.active_enemy.name + "<br />Congratulations! You are the ruler of the galaxy.");

					// activate the Restart button
					$(this.restart_button).prop('disabled', false);

				} // end if else

				// set the health points to 0 so no negative numbers show
				$(this.health_points_span[this.active_enemy.ch_number]).html("0");

				// move the active enemy to the right of the screen and add the .dead-chaaracter class to the image
				$(this.ch_divs[this.active_enemy.ch_number]).animate({right: "0%"}, 200);
				$(this.ch_divs[this.active_enemy.ch_number]).find("img").addClass("dead-character");

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