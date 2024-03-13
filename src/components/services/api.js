// https://www.superheroapi.com/api.php/2827483254201187/search/batman
export const searchSuperHero = async (superheroName) => {
    try{
        const response = await fetch(`https://www.superheroapi.com/api.php/2827483254201187/search/${superheroName}`);
        const result = await response.json();
        return result;
    } catch(e) {
        console.log("error", e.message());
    }
}

//https://superheroapi.com/api/access-token/character-id
export const getSuperheroList = async(startIndex = 1, count = 20, alphabet = "a") => {
    const superheroEndpoints = [];
    startIndex = alphabet === "A" || alphabet === "a" ? startIndex : getAlphabetIndex(alphabet);
    for(let i = startIndex;i<startIndex + count;i++) {
        superheroEndpoints.push(`https://superheroapi.com/api.php/2827483254201187/${i}`)
    }
    const responses = await Promise.all(superheroEndpoints.map(link => fetch(link)));
    const results = await Promise.all(responses.map(resp => resp.json()))
    console.log("res", results);
    return results;
}

export const getSuperheroListBasedOnIDS = async(idList = []) => {
    if(idList.length === 0) return;
    console.log(idList);
    const superheroEndpoints = [];
    for(let id of idList) {
        superheroEndpoints.push(`https://superheroapi.com/api.php/2827483254201187/${id}`)
    }
    const responses = await Promise.all(superheroEndpoints.map(link => fetch(link)));
    const results = await Promise.all(responses.map(resp => resp.json()))
    console.log("res", results);
    return results;
}

const getAlphabetIndex = alphabet => {
    switch (alphabet) {
        case "b":
        case "B":
            return 60;
        case "c":
        case "C":
            return 145
        case "d":
        case "D":
            return 198;
        case "E":
        case "e":
            return 235;
        case "F":
        case "f":
            return 250;
        case "g":
        case "G":
            return 274;
        case "h":
        case "H":
            return 306;
        case "i":
        case "I":
            return 339;
        case "j":
        case "J":
            return 349;
        case "k":
        case "K":
            return 278;
        case "l":
        case "K":
            return 379;
        case "l":
        case "L":
            return 399;
        case "m":
        case "M":
            return 421;
        case "n":
        case "N":
            return 481;
        case "o":
        case "O":
            return 498;
        case "p":
        case "P":
            return 509;
        case "q":
        case "Q":
            return 533;
        case "R":
        case "r":
            return 538;
        case "s":
        case "S":
            return 570;
        case "t":
        case "T":
            return 649;
        case "u":
        case "U":
            return 679;
        case "v":
        case "V":
            return 682;
        case "w":
        case "W":
            return 702;
        case "x":
        case "X":
            return 723;
        case "y":
        case "Y":
            return 725;
        case "z":
        case "Z":
            return 730;
        default:
            return 1;
    }
}

export const getSuperHero = async(id = 1) => {
    const response = await fetch(`https://superheroapi.com/api.php/2827483254201187/${id}`);
    const result = await response.json();
    return result;
}