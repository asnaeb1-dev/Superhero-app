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
export const getSuperheroList = async(startIndex = 1, count = 20) => {
    const superheroEndpoints = [];
    for(let i = startIndex;i<startIndex + count;i++) {
        superheroEndpoints.push(`https://superheroapi.com/api.php/2827483254201187/${i}`)
    }
    const responses = await Promise.all(superheroEndpoints.map(link => fetch(link)));
    const results = await Promise.all(responses.map(resp => resp.json()))
    return results;
}

export const getSuperHero = async(id = 1) => {
    const response = await fetch(`https://superheroapi.com/api.php/2827483254201187/${id}`);
    const result = await response.json();
    return result;
}