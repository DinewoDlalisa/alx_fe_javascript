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
    const randomIndex = Math.floor(Math.floor()* qoutes.length);
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

    function addQoute() {
        const newQouteText = document.getElementById('newQouteText').value;
        const newQouteCategory = document.getElementById('newQouteCategory');
        if (newQouteText & newQouteCategory){
            qoute.push({text: newQouteText, category: newQouteCategory});
            document.getElementById('newQouteText').value = '';
            document.getElementById('newQouteCategory').value = '';

            saveQoutes();
            alert('New qoute added.');
        }
        else{
            alert('Please enter qoute and category.');
        }

        newQouteButton.addEventListener('click', showRandomQuote);

        addQuoteButton.addEventListener('click', addQoute);


        loadQoutes();
        showRandomQuote();
    }

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
