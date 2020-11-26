// Assignment Code
var generateBtn = document.querySelector("#generate");

var codes = {
  "numeric" : [48, 57],
  "uppercase" : [65, 90],
  "lowercase" : [97, 122],
  "special" : [33, 126]
}

// Generate and return a password
function generatePassword() {
  // Initialises the password length
  var passLength = 0;

  // Ensures the password length is between the limits
  while (passLength < 8 || passLength > 128)
  {
    passLength = prompt("Password length: (Between 8 and 128 characters)");
  }

  // Sets the user preferences
  var uppercase = confirm("Include UPPERCASE characters?");
  var lowercase = confirm("Include lowercase characters?");
  var special = confirm("Include special characters?");
  var numeric = confirm("Include numeric characters?");

  // Initialises the pool of characters
  var characterPool = [];

  // Add uppercase characters to the potential character pool
  if (uppercase) {
    characterPool.push(...getStandardCharacters(codes.uppercase));
  }

  // Add lowercase characters to the potential character pool
  if (lowercase) {
    characterPool.push(...getStandardCharacters(codes.lowercase));
  }

  // Add numeric characters to the potential character pool
  if (numeric) {
    characterPool.push(...getStandardCharacters(codes.numeric));
  }
  
  // Add special characters to the potential character pool
  if (special) {
    var specialChars = getSpecialCharacters();
    
    characterPool.push(...specialChars);
  }

  var password = "";

  if (characterPool.length > 0)
  {
    for (var i = 0; i < passLength; i++) {
      password += characterPool[Math.floor(Math.random() * characterPool.length)];
    }
  } else {
    password = "I can't make a password without any characters";
  }

  return password;
}

// Get a list of characters by passing an array that defines a range of codes
function getStandardCharacters (charCodes) {
  var charArray = [];
  for (var i = charCodes[0]; i <= charCodes[1]; i++) {
    charArray.push(String.fromCharCode(i));
  }
  return charArray;
}

// Returns a list of special characters
function getSpecialCharacters() {
  var specialChars = [];

  // Checks to see if the character is either lowercase, uppercase or numeric, if not then it is special and it is added to the list
  for (var i = codes.special[0]; i <= codes.special[1]; i++) {
    if (!(i >= codes.lowercase[0] && i <= codes.lowercase[1]) &&
    !(i >= codes.uppercase[0] && i <= codes.uppercase[1]) &&
    !(i >= codes.numeric[0] && i <= codes.numeric[1])) {
      specialChars.push(String.fromCharCode(i));
    }
  }

  return specialChars;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
