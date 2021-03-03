let pageCounter = 1;
const btn = document.querySelector('#btn');
const animalContainer = document.querySelector('#animal-info');

btn.addEventListener('click', () => {
    const ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', `https://learnwebcode.github.io/json-example/animals-${pageCounter}.json`);
    ourRequest.onload = () => {
        if(ourRequest.status >= 200 && ourRequest.status < 400) {
            const ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);
        } else {
            console.log("We connected to the server, but it returned an error.")
        }
    };

    ourRequest.onerror = function() {
        console.log('Connection error');
    };

    ourRequest.send();
    pageCounter++;
    if (pageCounter > 3) {
        btn.classList.add("hide-me");
    }
})

const renderHTML = (data) => {
    let htmlString = ""

    for (i=0; i<data.length; i++) {
        htmlString += "<p>" + data[i].name + " is a " + data[i].species + "that likes to eat ";

        for (ii = 0; ii<data[i].foods.likes.length; ii++) {
            if (ii == 0) {
                htmlString += data[i].foods.likes[ii]
            } else {
                htmlString += " and " + data[i].foods.likes[ii]
            }
        }

        htmlString += " and dislikes ";

        for (ii = 0; ii<data[i].foods.dislikes.length; ii++) {
            if (ii == 0) {
                htmlString += data[i].foods.dislikes[ii]
            } else {
                htmlString += " and " + data[i].foods.dislikes[ii]
            }
        }

        htmlString += ".</p>"
    }

    animalContainer.insertAdjacentHTML('beforeend', htmlString)
}