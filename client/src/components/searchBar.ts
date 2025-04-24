import { debounce } from "../utils/helpers";
import RequestHandler from '../services/request';
import store from "../state/store";
import handleGetPageData from "../handlers/handlegetPageData";


const { updateSelectedPage } = {...store }

const pageSearch = document.getElementById('pageSearch') as HTMLInputElement;
const suggestionsList = document.getElementById('suggestions') as HTMLUListElement;

const updateSuggestions = debounce(async (query: string) => {
    if (query.length < 2) {
        suggestionsList.innerHTML = '';
        suggestionsList.classList.add('hidden');
        return;
    }

    // Retrieve the suggestions from the Wikipedia API 
    const suggestions = await RequestHandler.getPageSuggestions(query);

    if (!suggestions) {
      return;
    }

    suggestionsList.innerHTML = '';
    if (suggestions.length === 0) {
        suggestionsList.classList.add('hidden');
        return;
    }

    // Create the suggestions list  
    suggestions.forEach((suggestion) => {
        const li = document.createElement('li');
        
        li.className = 'px-4 py-2 hover:bg-gray-100 cursor-pointer';
        li.textContent = suggestion;
        li.addEventListener('click', () => {
            // Get data from API 
            handleGetPageData(undefined, suggestion);

            pageSearch.value = suggestion;
            updateSelectedPage(suggestion)
            suggestionsList.innerHTML = '';
            suggestionsList.classList.add('hidden');
        });

        suggestionsList.appendChild(li);
    });

    suggestionsList.classList.remove('hidden');
}, 300);


// Update suggestions when typing 
pageSearch.addEventListener('input', (e: Event) => {
    updateSuggestions((e.target as HTMLInputElement).value);
});


// Hide suggestions when clicking outside
document.addEventListener('click', (e: MouseEvent) => {
    if (!pageSearch.contains(e.target as Node) && !suggestionsList.contains(e.target as Node)) {
        suggestionsList.classList.add('hidden');
    }
});

// Initial input state
pageSearch.focus();