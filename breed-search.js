document.addEventListener('DOMContentLoaded', () => {
    const breedSearchInput = document.getElementById('breedSearch');
    const suggestionsContainer = document.getElementById('suggestions');

    // Fetch the dog breed data (assumes this data is available in your JSON file)
    const breedData = [
        {
            "name": "Affenpinscher",
            "url": "Affenpinscher.html"
        },
        {
            "name": "Afghan Hound",
            "url": "AfghanHound.html"
        },
        {
            "name": "Airedale Terrier",
            "url": "AiredaleTerrier.html"
        },
        {
            "name": "Akita",
            "url": "Akita.html"
        },
        {
            "name": "Alaskan Klee Kai",
            "url": "AlaskanKleeKai.html"
        },
        {
            "name": "Alaskan Malamute",
            "url": "AlaskanMalamute.html"
        },
        {
            "name": "American Bulldog",
            "url": "AmericanBulldog.html"
        },
        {
            "name": "American English Coonhound",
            "url": "AmericanEnglishCoonhound.html"
        },
        {
            "name": "American Eskimo Dog",
            "url": "AmericanEskimoDog.html"
        },
        {
            "name": "American Foxhound",
            "url": "AmericanFoxHound.html"
        },
        {
            "name": "American Hairless Terrier",
            "url": "AmericanHairlessTerrier.html"
        },
        {
            "name": "American Leopard Hound",
            "url": "AmericanLeopardHound.html"
        },
        {
            "name": "American Staffordshire Terrier",
            "url": "AmericanStaffordshireTerrier.html"
        },
        {
            "name": "American Water Spaniel",
            "url": "AmericanWaterSpaniel.html"
        },
        {
            "name": "Anatolian Shepherd Dog",
            "url": "AnatolianShepherdDog.html"
        },
        {
            "name": "Appenzeller Sennenhund",
            "url": "AppenzellerSennenhund.html"
        },
        {
            "name": "Australian Cattle Dog",
            "url": "AustralianCattleDog.html"
        },
        {
            "name": "Australian Kelpie",
            "url": "AustralianKelpie.html"
        },
        {
            "name": "Australian Shepherd",
            "url": "AustralianShepherd.html"
        },
        {
            "name": "Australian Stumpy Tail Cattle Dog",
            "url": "AustralianStumpyTailCattleDog.html"
        },
        {
            "name": "Australian Terrier",
            "url": "AustralianTerrier.html"
        },
        {
            "name": "Azawakh",
            "url": "Azawakh.html"
        },
        {
            "name": "Barbado da Terceira",
            "url": "BarbadoDaTerceira.html"
        },
        {
            "name": "Beagle",
            "url": "Beagle.html"
        },
        {
            "name": "Bernese Mountain Dog",
            "url": "BerneseMountainDog.html"
        },
        {
            "name": "Bergamasco Sheepdog",
            "url": "BergamascoSheepDog.html"
        },
        {
            "name": "Biewer Terrier",
            "url": "BiewerTerrier.html"
        },
        {
            "name": "Bolognese",
            "url": "Bolognese.html"
        },
        {
            "name": "Boerboel",
            "url": "Boerboel.html"
        },
        {
            "name": "Chihuahua",
            "url": "Chihuahua.html"
        },
        {
            "name": "Cavalier King Charles Spaniel",
            "url": "CavalierKingCharlesSpaniel.html"
        },
        {
            "name": "Doberman Pinscher",
            "url": "DobermanPinscher.html"
        },
        {
            "name": "English Cocker Spaniel",
            "url": "EnglishCockerSpaniel.html"
        },
        {
            "name": "English Springer Spaniel",
            "url": "EnglishSpringerSpaniel.html"
        },
        {
            "name": "French Bulldog",
            "url": "FrenchBullDog.html"
        },
        {
            "name": "Flat-Coated Retriever",
            "url": "FlatCoatedRetriever.html"
        },
        {
            "name": "Golden Retriever",
            "url": "GoldenRetriever.html"
        },
        {
            "name": "Irish Red and White Setter",
            "url": "IrishRedAndWhiteSetter.html"
        },
        {
            "name": "Indie (Indian Pariah Dog)",
            "url": "Indie.html"
        },
        {
            "name": "Kai Ken",
            "url": "KaiKen.html"
        },
        {
            "name": "Keeshond",
            "url": "Keeshond.html"
        },
        {
            "name": "Newfoundland",
            "url": "Newfoundland.html"
        },
        {
            "name": "Pembroke Welsh Corgi",
            "url": "PembrokeWelshCorgi.html"
        },
        {
            "name": "Romanian Mioritic Shepherd",
            "url": "RomanianMioriticShepherd.html"
        },
        {
            "name": "Russian Tsvetnaya Bolonka",
            "url": "RussianTsvetnayaBolonka.html"
        },
        {
            "name": "Russian Toy",
            "url": "RussianToy.html"
        },
        {
            "name": "Rottweiler",
            "url": "Rotteiler.html"
        },
        {
            "name": "Shetland Sheepdog",
            "url": "ShetlandSheepdog.html"
        },
        {
            "name": "Working Kelpie",
            "url": "WorkingKelpie.html"
        },
        {
            "name": "Yorkshire Terrier",
            "url": "YorkshireTerrier.html"
        }
    ];

    // Function to filter and display breed suggestions
    function showSuggestions() {
        const query = breedSearchInput.value.toLowerCase();
        if (query === '') {
            suggestionsContainer.style.display = 'none'; // Hide suggestions if query is empty
            return;
        }

        // Filter the breedData based on the query
        const filteredBreeds = breedData.filter(breed =>
            breed.name.toLowerCase().includes(query)
        ).slice(0, 3); // Show only the first 3 results

        // Clear any existing suggestions
        suggestionsContainer.innerHTML = '';

        // If there are matching breeds, show them
        if (filteredBreeds.length > 0) {
            suggestionsContainer.style.display = 'block'; // Show suggestions container

            filteredBreeds.forEach(breed => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.textContent = breed.name;

                // Add click event to navigate to breed's page when clicked
                suggestionItem.addEventListener('click', () => {
                    window.location.href = breed.url; // Redirect to breed page
                });

                suggestionsContainer.appendChild(suggestionItem);
            });
        } else {
            suggestionsContainer.style.display = 'none'; // Hide if no results
        }
    }

    // Show suggestions when user clicks on the search bar
    breedSearchInput.addEventListener('focus', () => {
        showSuggestions();
    });

    // Show suggestions as user types
    breedSearchInput.addEventListener('input', () => {
        showSuggestions();
    });

    // Hide suggestions if user clicks outside the search input or suggestions box
    document.addEventListener('click', (event) => {
        if (!breedSearchInput.contains(event.target) && !suggestionsContainer.contains(event.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });
});
