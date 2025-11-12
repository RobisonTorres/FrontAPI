async function getAllCharacters() {

    // This function fetches all characters from the Rick and Morty API and displays them on the page.
    const resultsContainer = document.getElementById('results-container');
    const url = 'https://rickandmortyapi.com/api/character';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        data.results.forEach(character => {
            const template = document.getElementById('card-template');
            const clone = template.content.cloneNode(true);
            clone.querySelector('.character-id').value = character.id;
            clone.querySelector('.character-image').src = character.image;
            clone.querySelector('.character-image').alt = character.name;
            clone.querySelector('.character-name').textContent = character.name;
            clone.querySelector('.know-more').setAttribute('onclick', `knowMore(${character.id})`);
            resultsContainer.appendChild(clone);
        });
    } catch(error) {
        console.error('Error fetching superhero data:', error);
    }
}

async function knowMore(characterId) {

    // This function fetches detailed information about a specific character and displays it in a modal.
    const knowMoreModal = document.getElementById('know-more');
    knowMoreModal.style.display = 'block';
    characterId = parseInt(characterId);
    const urlCharacter = `https://rickandmortyapi.com/api/character/${characterId}`;
    try {
        const response = await fetch(urlCharacter, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const characterInfo = await response.json();
        document.querySelector('.know-more-image').src = characterInfo.image;
        document.querySelector('.know-more-image').alt = characterInfo.name;
        document.querySelector('.know-more-name').textContent = characterInfo.name;
        document.querySelector('.character-status').textContent = `Status: ${characterInfo.status}`;
        document.querySelector('.character-species').textContent = `Species: ${characterInfo.species}`;
        document.querySelector('.character-gender').textContent = `Gender: ${characterInfo.gender}`;
        document.querySelector('.character-location').textContent = `Location: ${characterInfo.location.name}`;
    } catch(error) {
        console.error('Error fetching character details:', error);
    }
}

document.getElementById('close-know-more').addEventListener('click', hideCharacterDetails);
function hideCharacterDetails() {
    
    // This function hides the character details modal and clears its content.
    document.querySelector('.know-more-image').src = '';
    document.querySelector('.know-more-image').alt = '';
    document.querySelector('.know-more-name').textContent = '';
    document.querySelector('.character-status').textContent = '';
    document.querySelector('.character-species').textContent = '';
    document.querySelector('.character-gender').textContent = '';
    document.querySelector('.character-location').textContent = '';
    const form = document.getElementById('know-more');
    return form.style.display = 'none';
}

const search = document.querySelector('#search-input');
const resultsContainer = document.querySelector('#results-container');
search.addEventListener('input', () => {

    // This function filters the displayed character cards based on the search input.
    const searchValue = search.value.toLowerCase().trim();
    const cards = resultsContainer.querySelectorAll('.character-card');
    cards.forEach(card => {
        const nameElement = card.querySelector('.character-name');

        if (nameElement) {
            const characterName = nameElement.textContent.toLowerCase();
            if (!characterName.includes(searchValue)) {
                card.style.display = 'none';
            } else {
                card.style.display = '';
            }
        }
    });
});

getAllCharacters();