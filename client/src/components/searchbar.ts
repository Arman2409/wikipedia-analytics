import { debounce } from "../utils/helpers";
import RequestHandler from '../services/request';
import store from "../state/store"

const { getSelectedPage, updateSelectedPage } = {...store }

const pageSearch = document.getElementById('pageSearch') as HTMLInputElement;
const suggestionsList = document.getElementById('suggestions') as HTMLUListElement;
let selectedPage: string = '';

const updateSuggestions = debounce(async (query: string) => {
    if (query.length < 2) {
        suggestionsList.innerHTML = '';
        suggestionsList.classList.add('hidden');
        return;
    }

    const suggestions = await RequestHandler.getPageSuggestions(query);
    suggestionsList.innerHTML = '';
    if (suggestions.length === 0) {
        suggestionsList.classList.add('hidden');
        return;
    }

    suggestions.forEach((suggestion) => {
        const li = document.createElement('li');
        li.className = 'px-4 py-2 hover:bg-gray-100 cursor-pointer';
        li.textContent = suggestion;
        li.addEventListener('click', () => {
            selectedPage = suggestion;
            pageSearch.value = suggestion;
            updateSelectedPage(suggestion)
            suggestionsList.innerHTML = '';
            suggestionsList.classList.add('hidden');
        });

        suggestionsList.appendChild(li);
    });
    suggestionsList.classList.remove('hidden');
}, 300);

pageSearch.addEventListener('input', (e: Event) => {
    updateSuggestions((e.target as HTMLInputElement).value);
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e: MouseEvent) => {
    if (!pageSearch.contains(e.target as Node) && !suggestionsList.contains(e.target as Node)) {
        suggestionsList.classList.add('hidden');
    }
});

// Initial state
pageSearch.focus();