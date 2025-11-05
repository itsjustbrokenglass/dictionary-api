

async function fetchWordData(entry) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${entry}`
    const response = await fetch(url)

    if (!response.ok) {
        document.getElementById("results").innerText = 'Word not found'

    }

    return await response.json()

}

function displayWordData(data, container) {
    const header = document.createElement('h2')
    header.innerText = data.word
    container.appendChild(header)

    const phonetic = document.createElement('p')
    phonetic.innerText = data.phonetic
    container.appendChild(phonetic)

    for (const meaning of data.meanings) {
        const pos = document.createElement('p')
        pos.textContent = meaning.partOfSpeech
        container.appendChild(pos)
        const orderedList = document.createElement('ol')
        container.appendChild(orderedList)

        for (let i = 0; i < meaning.definitions.length; i++) {
            const listItem = document.createElement('li')
            listItem.textContent = meaning.definitions[i].definition
            orderedList.appendChild(listItem)

        }

    }



}



async function fetchApi() {
    const resultsContainer = document.getElementById("results")
    resultsContainer.innerHTML = ""
    const entry = document.getElementById("word").value
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${entry}`
    try {
        const data = await fetchWordData(entry) // parses json just as JSON.parse() does
        displayWordData(data[0], resultsContainer)

    }
    catch {
        document.getElementById("results").textContent = "Error. Please try again."

    }



}
