// Javascript function that wraps everything
$(document).ready(function(){

	var starWarsGame = {
		text_box: $("#text"),
		attack_button: $("#attack"),
		restart_button: $("#restart"),
		enemies_remaining: 3,
		health_points_span: $(".health-points"),
		health_bar: $(".progress-bar"),
		ch_divs: $(".characters"),
		characters: [{
			name: "Padme",
			base_health_points: 200,
			health_points: this.base_health_points,
			base_attack_power: 20,
			attack_power: this.base_attack_power,
			counter_attack_power: this.base_attack_power
		}, {
			name: "Vader",
			base_health_points: 500,
			health_points: this.base_health_points,
			base_attack_power: 50,
			attack_power: this.base_attack_power,
			counter_attack_power: this.base_attack_power
		}, {
			name: "Ghost Obi-Wan",
			base_health_points: 999,
			health_points: this.base_health_points,
			base_attack_power: 20,
			attack_power: this.base_attack_power,
			counter_attack_power: this.base_attack_power
		}, {
			name: "Lando",
			base_health_points: 300,
			health_points: this.base_health_points,
			base_attack_power: 20,
			attack_power: this.base_attack_power,
			counter_attack_power: this.base_attack_power
		}],

		// starts the game on load and can be called once the Restart button is pressed
		startGame: function () {

			$(this.text_box).html("Choose one of the character above as your character.");
			$(this.attack_button).prop('disabled', true);
			$(this.restart_button).hide();

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

			} // end for loop

			// reset position of character divs
			$(this.ch_divs[0]).css({
				"top": "0",
				"right": "810px"
			});
			$(this.ch_divs[1]).css({
				"top": "0",
				"right": "540px"
			});
			$(this.ch_divs[2]).css({
				"top": "0",
				"right": "270px"
			});
			$(this.ch_divs[3]).css({
				"top": "0",
				"right": "0px"
			});

			// reset enemies remaining to 3
			this.enemies_remaining = 3;
		},

		// player choses a character function. This repoisitons the selected character on the gameboard and displays text asking the player to select the first enemy to engage.
		chosenPlayer: function (chosen_player) {
			console.log(chosen_player);
		}
	}

	// starter functions and event handlers
	starWarsGame.startGame();

	$(starWarsGame.ch_divs).on("click", function (e) {
		starWarsGame.chosenPlayer($(this));
	});

	console.log(starWarsGame.ch_divs);



});