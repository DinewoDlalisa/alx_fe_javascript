document.addEventListener('DOMContentLoaded', () => {
    const qoutes = [];

    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQouteButton = document.getElementById('newQoute');
    const addQuoteButton = document.getElementById('addQoute');

    function displayRandomQuote () {
        if (qoutes.length = 0)
            quoteDisplay.innerHTML = 'Add qoute here.';
            return;

    }
    const randomIndex = Math.floor(Math.random()* qoutes.length);
    const qoute = qoutes[randomIndex];
    quoteDisplay.innerText = '${qoute.text}' - '${qoute.category}';


    function loadQoutes () {
        const storedQoutes = localStorage.getItem('qoutes');
        if (storedQoutes){
            qoutes = JSON.parse(storedQoutes);
        }

    }

    function saveQoutes() {
        localStorage.setItem('qoutes', JSON.stringify(qoutes));
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

    function addQoute() {
        const newQuoteText = document.getElementById('newQouteText').value = '';
        const newQuoteCategory = document.getElementById('newQouteCategory').value = '';

        if (newQuoteText & newQuoteCategory) {
            qoutes.push({ text: newQuoteText, category: newQuoteCategory});
            document.getElementById('newQouteText').value= '';
            document.getElementById('newQouteCategory').value ='';
            saveQoutes();
            alert('New qoute added.')
        } else{
            alert('Please enter qoute and catergory!')
        }
    }

    newQouteButton.addEventListener('click', displayRandomQuote);

    loadQoutes();
    displayRandomQuote();
    createAddQuoteForm();
        
    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload =function(event){
            const importQoutes = JSON.parse(event.target.result);
            qoutes.push(...importQoutes);
            saveQoutes();
            alert('Qoutes import was successful!');

        };
        fileReader.readAsText(event.target.files[0]);

    };
    function exportToJSONFile() {
        const dataStr =JSON.stringify(qoutes);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = 'qoutes.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
});
