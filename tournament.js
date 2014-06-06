var Tournament = function() {
	// Properties
	var format = {
		'A' : 2,
		'B' : 3
	};

	// Methods
	var generateMatches = function(players) {
		var groups = generateGroups(players);

		// Format player data object
		for (var key in players) {
			players[key].matches = { A : [], B : [] };
		}

		// Generate matchups
		for (var key in players) {
			var player = players[key],
				matchList = player.name+' | ';

			// Generate group matches
			for ( var g in format ) {			
				while ( player.matches[g].length < format[g] ) {
					var candidate = groups[g][randomNumber(groups[g].length)],
						candidateMatches = players[candidate].matches[player.group];
					// Ensure not yourself and not pre-existing somewhere
					if ( candidate != key && !inArray(candidate, player.matches[g]) && !inArray(key, candidateMatches) ) {
						player.matches[g].push(candidate);
						if ( candidateMatches.length < format[player.group] ) {
							candidateMatches.push(key);
						}
					}
				}

				matchList += player.matches[g]+' ';
			}

			console.log(matchList);
		}

		return players;
	},

	generateGroups = function(players) {
		// Storage
		var groups = { A : [], B : [] };

		// Generate
		for (var key in players) {
			var player = players[key];
			if ( player.group === 'A' ) {
				groups.A.push(key);
			} else {
				groups.B.push(key);
			}
		}

		return groups;
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
		matchup : generateMatches
	}
};

var T = new Tournament();
T.matchup(PLAYERS);