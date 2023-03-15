const searchInput = document.getElementById('search-input');
const autocompleteList = document.getElementById('autocomplete-list');

// Array of sample search terms
const searchTerms = [
  'Apple',
  'Apples',
  'Banana',
  'Cherry',
  'Durian',
  'Elderberry',
  'Fig',
  'Grapefruit',
  'Honeydew',
  'Jackfruit',
  'Kiwi',
  'Lemon',
  'Mango',
  'Nectarine',
  'Orange',
  'Papaya',
  'Quince',
  'Raspberry',
  'Strawberry',
  'Tangerine',
  'Ugli fruit',
  'Vanilla bean',
  'Watermelon',
  'Xigua (Chinese watermelon)',
  'Yellow passionfruit',
  'Zucchini'
];

// Function to update the autocomplete list
function updateAutocompleteList() {
  // Clear the current list items
  autocompleteList.innerHTML = '';

  // Get the current input value
  const inputValue = searchInput.value.toLowerCase();

  // Filter the search terms array by the input value
  const filteredSearchTerms = searchTerms.filter(term => {
    return term.toLowerCase().startsWith(inputValue);
  });

  // Add a list item for each filtered search term
  filteredSearchTerms.forEach(term => {
    const li = document.createElement('li');
    li.textContent = term;
    autocompleteList.appendChild(li);
  });
}

// Event listener for input changes
searchInput.addEventListener('keyup', () => {
  if(searchInput.value != ""){
    updateAutocompleteList();
  }else{
    autocompleteList.innerHTML = '';
  }
});

// Event listener for list item clicks
autocompleteList.addEventListener('click', event => {
  if (event.target.nodeName === 'LI') {
    searchInput.value = event.target.textContent;
    autocompleteList.innerHTML = '';
  }
});
