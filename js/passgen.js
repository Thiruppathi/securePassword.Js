
// Make easy to remember
//  # short sequence of number
//  # one punctuation
//  # two sequences of alpha starting with uppercase and mixing voyels and consons
// In any order

// Make based on dictionnary

// Or make rough and complex

var availableCharsets={};
availableCharsets["alphaLower"]				='abcdefghijklnopqrstuvwxyz';
availableCharsets["alphaUpper"]				= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
availableCharsets["numeric"]				='0123456789';
availableCharsets["punctuation"]			='.,/;\':?"!';
availableCharsets["special"]				=' #@~`��|<>=+-_)(*&^%$��[]{}';
availableCharsets["accented"]				='���������������������������';
availableCharsets["accentedUppercase"]		='������������������������';
availableCharsets["accentedSpecial"]		='�����������';

var defaultEnabledCharsets=["alphaLower","alphaUpper","numeric","punctuation"];

var enabledCharsets={};
enableDefaultCharsets();

var allowCharacterRepetition=true;
var passwordSize=10;

var enableAlpha=true, enableNumeric=true, enableSpecial=true, enableAccented=true, enableAccentedSpecial=true;
var customChars="";
var ratings={};

ratings["passwordSize"]=0;
ratings["charsets"]=0;
ratings["characterVariety"]=0;

/**
 * Creates a custom charset names "custom" (or replace if already exists) with the provided characters
 * @param {string} The characters of the custom charset
 */
function setCustomCharset( charset ){
	if( charset.length==0 ){
		delete availableCharsets["custom"];
	}else{
		availableCharsets["custom"]=charset;
	}
}

/**
 * Enables all available charset
 */
function enableAllCharsets( ){
	for(var charsetName in availableCharsets){
		 enableCharset( charsetName );
	};
}

/**
 * Enables all default charsets
 */
function enableDefaultCharsets(){
	defaultEnabledCharsets.forEach(function(charsetName) {
		enableCharset( charsetName );
	});
}

/**
 * Enables one charset
 * @param {string} The name of the charset to enable
 */
function enableCharset( charsetName ){
	console.log("Charset " + charsetName  + " enabled");
	enabledCharsets[charsetName]=availableCharsets[charsetName];
}

/**
 * Disables one charset
 * @param {string} The name of the charset to disable
 */
function disableCharset( charsetName ){
	console.log("Charset " + charsetName  + " disabled");
	delete enabledCharsets[charsetName];
}

/**
 * Builds a bigger charset from all enabled charsets
 * @type {string} The complete charset
 */
function prepareCharset( ){
	var fullCharset="";
	var logStr="Enabled charsets:";
	for(var charset in enabledCharsets){
		logStr+=" "+charset;
		fullCharset+=enabledCharsets[charset];
	};
	console.log(logStr);
	console.log("Characters:"+fullCharset)
	return fullCharset;
}

/**
 * Provides any character (random) from the provided charset
 * @param {string} charset The set of characters to use
 * @type {string} The random character
 */
function nextChar( charset ){	
	return charset.charAt(Math.floor(Math.random() * charset.length));
}

/**
 * Checks, and ensures if possible, that the password has at least one character from all enabled charsets
 * @param {string} password the password to analyze
 * @type {string} The eventually modified (or not) version of the password
 */
function checkCompliance( password ){
	var isCompliant=false;
	
	// if length is lower than number of charsets there's no way to solve it
	if (Object.keys(enabledCharsets).length > password.length) return password;
	
	while ( isCompliant == false ){
		isCompliant = true;
		for(var charsetName in enabledCharsets){
			var charset=enabledCharsets[charsetName];
			if( !hasOneFromCharset(charset, password) ){
				var logStr="password \"" + password+ "\" was missing from " + charsetName ;
				password=addOneFromCharset(charset, password);
				console.log(logStr + ", now" + password);
				isCompliant=false;
			}		
		}
	}	
	return password;
}

function addOneFromCharset( charset, password ){	
	password = replaceCharAt( password, Math.floor(Math.random() * password.length), nextChar(charset))	;
	return password;
} 

function replaceCharAt(inputStr, index, newChar) {
    var strArray = inputStr.split("");
    strArray[index] = newChar;
    return strArray.join("");
}

function ratePassword( password ){
	ratings["passwordSize"]=ratePasswordSize(password);
	ratings["charsets"]=rateCharsets(password);
	ratings["characterVariety"]=rateCharacterVariety(password);
	
	var nbRatings=Object.keys(ratings).length;
	var sumOfRatings=0;
	var productOfRatings=1;
	for(var rating in ratings){
		var oneRating=ratings[rating];
		console.log("Rating "+rating+ " is :" + ratings[rating]);
		sumOfRatings+=oneRating;
		productOfRatings*=oneRating;
	}	
	//return (sumOfRatings/nbRatings+Math.pow(productOfRatings, 1/3))/2;
	return Math.pow(productOfRatings, 1.0/3.0);
	
}

// return a value between 0 and 1 related to the password size
function ratePasswordSize( password ){
	var len = password.length;
	// lower than 5 is far too low
	if ( len < 5 ) return 0.01*len;		
	if ( len < 11 ) return .1*(len-4);
	if ( len < 20 ) return .6+.03*(len-10);
	// more than 20 is pretty good
	if ( len < 30 ) return .90+.01*(len-20);
	// more than 30 characters = great enthropy
	if ( len < 50 ) return .99+.0005*(len-30);
	return 1.0;	
}


/**
 * Provides a subjective rating of a given password for the amount/size of character sequences inside
 * @param {string} password The set of characters to use
 * @type {number} The rating, floating point value between 0 and 1
 */
function rateSequences( password ){
	var seqLength = findSequences(password).reduce(function(previousValue, currentValue, index, array){
		return previousValue + currentValue;
	},"").length;	
	console.log("Seq length = "+seqLength);
	var ratio=seqLength/password.length;
	if( ratio <= .1) return 1.0;
	if( ratio <= .5) return 1.0-ratio;
	if( ratio <= .79) return .8-ratio;
	return 0.01;
	
	
}


function rateCharsets( password ){
	var charsetCount=0;
	for(var charsetName in availableCharsets){
		var charset=availableCharsets[charsetName];
		console.log("check charset " + charsetName + ": " + charset);
		if( hasOneFromCharset(charset, password) ){
			charsetCount++;
		}		
	}
	// less than 2 types of characters is not enough
	if( charsetCount < 2 ) return 0.01;
	// 2 types of characters is weak
	if( charsetCount == 2 ) return .2;
	// 3 types of characters is good enough
	if( charsetCount == 3 ) return .65;
	// More than 3 types of characters is pretty good
	if( charsetCount == 4 ) return .9;	
	// More than 4 types of characters is perfect
	return 1.0;
	
}


function rateCharacterVariety( password ){	
	var rate=rawRateCharacterVariety( password );
	if (rate >= 1.0 ) return 1.0; else return rate;
}


function rawRateCharacterVariety( password ){	
	var differentCharacters={};
	for (var i=0;i<password.length;i++) {  
		differentCharacters[password.charAt(i)]=true;
	}
	var nbDifferentCharacters=Object.keys(differentCharacters).length;	
	var variation=nbDifferentCharacters/password.length;
	
	
	// less than 10% variation is not enough
	if (variation<.1) return 0.01*nbDifferentCharacters/10.0;
	// less than 50% variation is weak
	if (variation<.5) return variation/2*nbDifferentCharacters/10.0;
	// 50-85% variation is good enough
	if (variation<.91) return variation*nbDifferentCharacters/10.0;
	// 91-95% variation is perfect
	if (variation<.99) return 1.0;
	// close to 100% variation is a little bit worse, a bit of repetition makes assessment harder
	return .95*nbDifferentCharacters/10.0;
}


/**
 * Checks if the password has at least one character from provided charset
 * @param {string} charset the related charset
 * @param {string} password the password to analyze
 * @type {boolean} true if the password has at least one character from provided charset, false either
 */
function hasOneFromCharset( charset, password){
	var hasFromCharset=false;
	for (var i=0;i<password.length;i++) {    
		if( charset.indexOf(password.charAt(i)) != -1 ) {
			hasFromCharset=true;
			break;
		}
	}
	return hasFromCharset;
}

/**
 * Build a password using global settings for passwordSize and charsets to use
 * @type {string} the generated password
 */
function makePassword(){
	return makePasswordWithSize(passwordSize);
}


/**
 * Find all sequences of characters like "ABCDEF" or "123456" in a given password
 * @param {string} password the password to analyze
 * @type {string[]}
 */
function findSequences( password ){
	var lastCode=-1;
	var lastChar="";
	var isInSequence=false;
	var currSequence="";
	var sequences= new Array();
	var lastDirection=0;
	
	for (var i=0;i<password.length;i++) {    
		var currCode=password.charCodeAt(i);
		var direction=0;
		var isSequence=false;
		
		// if this is not the first character, check for ordered sequence
		if( lastCode != -1 ) {
			// do we detect a sequence?
			isSequence=(Math.abs( currCode - lastCode) == 1);
			direction=currCode - lastCode;
			
			// check if sequential status detection status changed
			if( isSequence != isInSequence){
				if( isSequence == true ){
					currSequence+=lastChar;
					lastDirection=currCode - lastCode;
				}else{
					sequences.push(currSequence);
					currSequence="";
				}				
			}
			
			if( isSequence ){
				// check if direction changed, if yes there are 2 sequences
				if( direction != lastDirection){
					sequences.push(currSequence);
					currSequence=""+lastChar;
				}
				// keep information of current sequence
				currSequence=currSequence+password.charAt(i);
			}					
		}
		
		isInSequence=isSequence;
		
		// keep information foir checking next char
		lastCode=currCode;
		lastChar=password.charAt(i);
		lastDirection=direction;
	}
	if( currSequence.length != 0 ){
		sequences.push(currSequence);
	}
	
	return sequences;
}

function passwordStrengthDescFromRate(rate){
	if( rate < .5) return "Unsafe";
	if( rate < .6) return "Weak";
	if( rate < .7) return "Medium";
	if( rate < .8) return "Good";
	if( rate >= .8) return "Secure";
	return "N/A";
}


function makePasswordWithSize( passwdSize ){
	var passwd="";
	var charset=prepareCharset();
	for (var i=0;i<passwdSize;i++) {
		var newChar=nextChar( charset )
		passwd+=newChar;
		if( !allowCharacterRepetition ) {
			charset=charset.replace(newChar,'');
		}
	}
	return checkCompliance(passwd);
}


