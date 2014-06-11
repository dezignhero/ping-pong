var Tournament = function() {
	// Properties
	var gameLimit = 10, // This is just a default value.  Too low and this will freeze the program
		groups = { A : [], B : [] },
		format = {
			'A' : 2,
			'B' : 2
		};

	// Methods
	var init = function(players) {
		// Format player data object
		for (var key in players) {
			players[key].matches = { A : [], B : [] };
			players[key].played = 0;
		}

		return players;
	},

	generateMatches = function(players) {
		var groups = generateGroups(players);

		players = init(players);

		// Generate matchups
		for (var key in players) {
			var player = players[key];

			// Generate group matches
			for ( var g in format ) {
				while ( player.matches[g].length < format[g] ) {
					var candidate = groups[g][randomNumber(groups[g].length)],
						candidateMatches = players[candidate].matches[player.group];

					// Ensure not yourself and not pre-existing somewhere
					if ( candidate != key && !inArray(candidate, player.matches[g]) && !inArray(key, candidateMatches) ) {
						// Ignore if already used too many times
						if ( players[candidate].played < gameLimit ) {
							player.matches[g].push(candidate);
							player.played++;
							players[candidate].played++;
							// Only push if limit not reached
							if ( candidateMatches.length < format[player.group] ) {
								candidateMatches.push(key);
							}
						}
					}
				}
			}
		}

		return players;
	},

	generateGroups = function(players) {
		// Generate
		for (var key in players) {
			var player = players[key];
			if ( player.group === 'A' ) {
				groups.A.push(key);
			} else {
				groups.B.push(key);
			}
		}
		// Calculate number of times user is used based on number of players
		gameLimit = Math.ceil( (groups.A.length + groups.B.length) * format.A / groups.A.length ) + Math.floor( groups.B.length / groups.A.length );

		return groups;
	},

	printMatchups = function(players) {
		var data = generateMatches(players),
			finalOutput = "";

		// Format player data object
		for (var key in data) {
			var player = data[key],
				htmlOutput = "<tr><td class='player' data-key='"+key+"'><strong>"+player.name+"</strong> ("+player.played+")</td>";

			for (var g in player.matches) {
				var group = player.matches[g];
				for (var i=0, e=group.length; i<e; i++) {
					htmlOutput += "<td data-key='"+group[i]+"'>"+players[group[i]].name+"</td>";
				}
			}
			htmlOutput += "</tr>"

			// Final output
			finalOutput += htmlOutput;
		}

		document.getElementById('Games').innerHTML += finalOutput;
	},

	randomNumber = function(limit) {
		return Math.floor( Math.random()*limit );
	},

	inArray = function(needle, haystack) {
		for (var i=0, e=haystack.length; i<e; i++){
			if ( haystack[i] == needle ) {
				return true;
			}
		}
		return false;
	};

	// Public
	return {
		matchup : printMatchups,
		groups : groups
	}
};

var T = new Tournament();
T.matchup(PLAYERS);
