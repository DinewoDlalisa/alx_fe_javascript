document.addEventListener('DOMContentLoaded', () => {
    const quotes = [];

    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.getElementById('addQuote');
    const addQuoteFormContainer = document.getElementById('addQuoteFormContainer');
    const importFileInput = document.getElementById('importFile');
    const exportQuotesButton = document.getElementById('exportQuotes');
    const categoryFilter = document.getElementById('categoryFilter');

    function showRandomQuote() {
        const filteredQuotes = getFilterQoutes();
        if (quotes.length = 0){
            quoteDisplay.innerHTML = 'Add quote here.';
            return;
        }
    }
    const randomIndex = Math.floor(Math.random()* quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerText = '${quote.text}' - '${quote.category}';


    function loadQuotes () {
        const storedQuotes = localStorage.getItem('quotes');
        if (storedQuotes){
            quotes = JSON.parse(storedQuotes);
        }

        populateCategories();

    }

    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    function createAddQuoteForm() {
        addQuoteFormContainer.innerHTML = `
            <div>
                <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
                <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
                <button id="addQuote">Add Quote</button>
            </div>
        `;
        document.getElementById('addQuote').addEventListener('click', addQuote);
    }

    function addQuote() {
        const newQuoteText = document.getElementById('newQuoteText').value = '';
        const newQuoteCategory = document.getElementById('newQuoteCategory').value = '';

        if (newQuoteText & newQuoteCategory) {
            quotes.push({ text: newQuoteText, category: newQuoteCategory});
            document.getElementById('newQuoteText').value= '';
            document.getElementById('newQuoteCategory').value ='';
            saveQuotes();
            populateCategories();
            alert('New quote added.');
        } else{
            alert('Please enter quote and catergory!');
        }
    }
    function filterQoutes() {
        const selectedCategory = categoryFilter.value;
        localStorage.setItem('selectedCategory', selectedCategory);
        showRandomQuote();

    }

    function getFilterQoutes(){
        const selectedCategory = localStorage.getItem('selectedCategory') || 'all';

        if (selectedCategory = 'all'){
            return quotes;
        }
        return quotes.filter(quote => quote.category = selectedCategory);

    }
    function populateCategories(){
      const categories = new  Set(quotes.map(quote.category));
      categoryFilter.innerHTML = '<option value="all">All Categories</option>';
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent =category;
        categoryFilter.appendChild(option);
      });

      const savedCategory = localStorage.getItem('selectedCategory');
      if (savedCategory) {
        categoryFilter.value = savedCategory;
      }
    }
    function updateQuoteList(text, category){
        const quoteList =document.getElementById('quoteList');
        const newQuoteElement =document.getElementById('div');
        newQuoteElement.innerHTML = `<p>${text}</p><p><em>${category}</em>$</p>`
        quoteList.appendChild(newQuoteElement);
    }
    newQouteButton.addEventListener('click', displayRandomQuote);

    loadQuotes();
    displayRandomQuote();
    createAddQuoteForm();
        
    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload =function(event){
            const importQuptes = JSON.parse(event.target.result);
            quotes.push(...importQuotes);
            saveQuotes();
            populateCategories();
            alert('Quotes import was successful!');

        };
        fileReader.readAsText(event.target.files[0]);

    };
    function exportToJSONFile() {
        const dataStr =JSON.stringify(quotes, null, 2);
        const blob = new Blob([dataStr], {type: 'application/json'});
        const dataUri = URL.createObjectURL(blob);

        const exportFileDefaultName = 'quotes.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        document.body.appendChild(linkElement);
        linkElement.click();
        document.body.removeChild(linkElement);

    }
    function displayQuotes()  {
        quoteList.innerHTML = '';
        quotes.forEach(quote => {
            const quoteElement = document.createElement('div');
            quoteElement.innerHTML = `<p>${quote.text}</p><p><em>${quote.category}</em></p>`
            quoteList.appendChild(quoteElement);
        });
    }

    newQuoteButton.addEventListener('click', displayRandomQuote);

    loadQuotes();
    displayRandomQuote();


    document.getElementById('exportQuotes').addEventListener('click', exportToJSONFile);
    importFileInput.addEventListener('change', importFromJsonFile);
});
