const fetch = require('node-fetch');
const fs = require('fs').promises;

const fetchPersonInfo = async nameUrl => {
    const response = await fetch(nameUrl);
    const personInfo = await response.json();
    return personInfo;
}

const fetchHomeWorld = async homeWorldUrl => {
    const response = await fetch(homeWorldUrl);
    const homeWorld = await response.json();
    return homeWorld;
}

const fetchFilmsData = async (characterData) => {
    const filmsResponses = await Promise.all(characterData.films.map(filmURL => fetch(filmURL)));
    const filmsData = await Promise.all(filmsResponses.map(response => response.json()));
    return filmsData
}

const makeParagraph = (filmArray, personInfo, homeWorld) => {
    const filmTitles = filmArray.map(film => film.title);
    let paragraph = `My name is ${personInfo.name}, I am from ${homeWorld.name}.\n`;
    paragraph += `I starred in the following films: ${filmTitles.join(', ')}.\n\n`;
    return paragraph
}

const writePersonInfo = async nameUrl => {
    try {
        const personInfo = await fetchPersonInfo(nameUrl);
        const homeWorld = await fetchHomeWorld(personInfo.homeworld);
        const filmsData = await fetchFilmsData(personInfo);
        const paragraph = makeParagraph(filmsData, personInfo, homeWorld);
        await fs.appendFile('characters.txt', paragraph, 'utf8');
        console.log('The file is finished being written')
    }
    catch { 
        console.error('Something went wrong when writing the file')
    }   
}

const lukeURL = 'https://swapi.dev/api/people/2';
writePersonInfo(lukeURL)