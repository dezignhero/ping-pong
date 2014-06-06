var players = {
	'alexlea' : {
		name : 'Alex Lea',
		group : 'A'
	},
	'anaik' : {
		name : 'Alankar Naik',
		group : 'B'
	},
	'agarcia' : {
		name : 'Allan Garcia',
		group : 'B'
	},
	'achan' : {
		name : 'Andrew Chan',
		group : 'A'
	},
	'bli' : {
		name : 'Bowen Li',
		group : 'B'
	},
	'bmeltzer' : {
		name : 'Brock Meltzer',
		group : 'A'
	},
	'bhuber' : {
		name : 'Brooks Huber',
		group : 'A'
	},
	'cyeung' : {
		name : 'Chin Yeung',
		group : 'A'
	},
	'cpaul' : {
		name : 'Chris Paul',
		group : 'A'
	},
	'csilva' : {
		name : 'Cody Silva',
		group : 'A'
	},
	'cly' : {
		name : 'Cindy Ly',
		group : 'B'
	},
	'dchoi' : {
		name : 'Damond Choi',
		group : 'B'
	},
	'eclark' : {
		name : 'Erin Clark',
		group : 'B'
	},
	'fcontreas' : {
		name : 'Frank Contreas',
		group : 'B'
	},
	'gseparovich' : {
		name : 'George Separovich',
		group : 'A'
	},
	'gshabanov' : {
		name : 'Greg Shabanov',
		group : 'B'
	},
	'hpacheco' : {
		name : 'Horacio Pacheco',
		group : 'B'
	},
	'jnguyen' : {
		name : 'James Nguyen',
		group : 'B'
	},
	'jstammnitz' : {
		name : 'Jan Stammnitz',
		group : 'B'
	},
	'jramos' : {
		name : 'Joe Ramos',
		group : 'B'
	},
	'jekiz' : {
		name : 'Jon Ekiz',
		group : 'B'
	},
	'jcordoso' : {
		name : 'Juan Cardoso',
		group : 'A'
	},
	'kkawaguchi' : {
		name : 'Kevin Kawaguchi',
		group : 'A'
	},
	'kluu' : {
		name : 'Kevin Luu',
		group : 'B'
	},
	'mzhang' : {
		name : 'Mia Zhang',
		group : 'B'
	},
	'npurcell' : {
		name : 'Nichole Purcell',
		group : 'B'
	},
	'pschwartz' : {
		name : 'Patrick Schwartz',
		group : 'B'
	},
	'pgurerrero' : {
		name : 'Paul Gurerrero',
		group : 'B'
	},
	'rbulai' : {
		name : 'Radu Bulai',
		group : 'A'
	},
	'rvillarreal' : {
		name : 'Raquel Villarreal',
		group : 'B'
	},
	'ssecord' : {
		name : 'Scott Secord',
		group : 'A'
	},
	'sphomsopha' : {
		name : 'Sam Phomsopha',
		group : 'B'
	},
	'snayak' : {
		name : 'Shweta Nayak',
		group : 'B'
	},
	'sjia' : {
		name : 'Simon Jia',
		group : 'A'
	},
	'tedmundson' : {
		name : 'Tim Edmundson',
		group : 'B'
	},
	'tkidambi' : {
		name : 'Tridi Kidambi',
		group : 'B'
	},
	'xniega' : {
		name : 'Xander Niega',
		group : 'B'
	}
};

var generateGroups = function () {
	// Storage
	var groups = {
		A : [],
		B : []
	};

	// Generate
	for (var key in players) {
		var player = players[key];
		player.matches = {
			A : [],
			B : []
		}

		if ( player.group === 'A' ) {
			groups.A.push(key);
		} else {
			groups.B.push(key);
		}
	}

	return groups;
};

var generateMatches = function (players) {
	var groups = generateGroups(players),
		format = {
			'A' : 2,
			'B' : 3
 		};

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
};

var randomNumber = function (limit) {
	return Math.floor( Math.random()*limit );
};

var inArray = function (needle, haystack) {
	for (var i=0, e=haystack.length; i<e; i++){
		if ( haystack[i] == needle ) {
			return true;
		}
	}
	return false;
};