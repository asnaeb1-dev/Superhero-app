// https://www.superheroapi.com/api.php/2827483254201187/search/batman
export const searchSuperHero = async (superheroName) => {
    const response = await fetch(`https://www.superheroapi.com/api.php/2827483254201187/search/${superheroName}`);
    const result = await response.json();
    return result;
}