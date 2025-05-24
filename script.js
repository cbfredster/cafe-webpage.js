document.getElementById("homeButton").addEventListener("click", () => { location.reload(); 
}); //once homeButton clicked the page refreshes (to starting screen)
    //https://developer.mozilla.org/en-US/docs/Web/API/Location/reload


    function displayCafes(filteredCafes) {
        cafeGrid.innerHTML = "";
        //empty div in index.html
        filteredCafes.forEach((cafe) => {
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
        //iterates through each element in the cafe function
            let cafeBox = document.createElement("div");
            //each element in the cafe array is inserted with a  div
           //document.createElement("div") ( MDN example)
            cafeBox.className = "cafe-box";
            //to apply css properties to all caf boxes
            cafeBox.innerHTML = `
                <div class="cafe-info">
                    <h3>${cafe.name}</h3>
                    <p>${cafe.location}</p>
                </div>
            `;
            //cafebox html element contains data from each cafe (as iterated) and using template literals
            cafeBox.onclick = () => showDetails(cafe.id);
            //defines click to show details for all cafe boxes
            cafeGrid.appendChild(cafeBox);
            // appends so cafegrid contains all cafeboxes
        });
    }


document.addEventListener('DOMContentLoaded', () => {
    const modals = {
        addCafe: document.getElementById("addCafeModal"),
        cafeDetails: document.getElementById("cafeDetailsModal")  
    };

    const buttons = {
        openAddCafe: document.getElementById("toggleFormButton"),
        closeAddCafe: document.getElementById("closeModal"),
        closeDetails: document.getElementById("closeDetails")
    };

    buttons.openAddCafe.addEventListener('click', () => modals.addCafe.style.display = "block");
    buttons.closeAddCafe.addEventListener('click', () => modals.addCafe.style.display = "none");
    buttons.closeDetails.addEventListener('click', () => modals.cafeDetails.style.display = "none");



});
//modal definitions and assignments for clicking buttons

window.addEventListener("DOMContentLoaded", async function () {
    //waits for dom content to load
     seeFeedbackBtn.addEventListener("click", async function () {
        //waits for click
            openPopup("feedbackPopup"); 
            await fetchAllFeedback(); 
        });
    //opens popup and waits for html content
});
//viewing feedback button


async function fetchAllFeedback() {

        const response = await fetch('/feedback');  //awaits for fetch to complete
        const feedbackList = await response.json();  // waits for the feedbacklist array from /submit-feedback (under ) path and parses it

        const feedbackdiv = document.getElementById("feedbackList");
        //feedback defined by feedbacklist div in index.html file within the feedbackPopup div
        feedbackdiv.innerHTML = "";  
        //intially cleared to then hold html content

        feedbackList.forEach(feedback => {
            //same as iterating through array for (displaycafes)
            let feedbackItem = document.createElement("div");
            feedbackItem.classList.add("feedback-box");
            feedbackItem.innerHTML = `
                Cafe Name: ${feedback.name} <br> 
                Feedback: ${feedback.feedback}
            `; //<br> for break in the line 
            feedbackdiv.appendChild(feedbackItem);
            //BASICALLY COPY AND PASTE FROM DISPLAY CAFE FUNCTION BUT ALTERED ELEMENT NAMES, AND HTML CONTENT
        });
    
}


function openPopup(id) {
    const popup = document.getElementById(id);
    if (popup) {
        popup.classList.remove("hidden");
        popup.style.display = "block";
    }
}

function closePopup(id) {
    const popup = document.getElementById(id);
    if (popup) {
        popup.classList.add("hidden");
        popup.style.display = "none";
    }
}
//element classes are added/removed so different css properties will apply


window.addEventListener("DOMContentLoaded", function () {
filterYork.onclick = () => fetchCafes("york");
filterDurham.onclick = () => fetchCafes("durham");
});
//click eventhandler for york and durham


async function fetchCafes(filter) {
    let url = "/cafes";
    if (filter) {
        url += `?filter=${filter}`;
        //template literal used for GET request for either durham or york, filter defined by button clicked and activated by eventhandler
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayCafes(data);
        //display funtion for cafes specified under data (the repsonse dependent on filter)
    } catch {
        console.log("cannot fetch cafes");
    }
}

const openModalButton = document.getElementById("toggleFormButton");
const closeModalButton = document.getElementById("closeModal");

 openModalButton.onclick = function () {
    addCafeModal.style.display = "block";
 }; //addcafe modal visible as set to = block

closeModalButton.onclick = function () {
    addCafeModal.style.display = "none";
    //opposite addcafe modal set to none, therefore becomes non-visible
};

    const addCafeModal = document.getElementById("addCafeModal");
    const cafeForm = document.getElementById("cafeForm");





    async function showDetails(cafeId) {
        try {
            const response = await fetch(`/cafe/${cafeId}`);
            const cafe = await response.json();
    
            document.getElementById("detailsTitle").textContent = cafe.name;
            document.getElementById("detailsLocation").textContent = `Location: ${cafe.location}`;
            document.getElementById("detailsCoffeeTypes").textContent = `Coffee Types: ${cafe.coffeetypes}`;
            document.getElementById("detailsRating").textContent = `Rating: ${cafe.reviews}`;
            document.getElementById("detailsComments").textContent = `Description: ${cafe.comments}`;
            document.getElementById("cafeDetailsModal").style.display = "block";
        } catch (error) {
            console.error("Error fetching cafe details:", error);
        }
    }
    


    searchButton.onclick = async function () {
        let searchtext = searchBox.value;
        if (!searchtext) { //if searchtext is empty therefore falsy and returned empty array
            displayCafes();
            return;
            //special case
        }

        try {
            const response = await fetch(`/search?names=${searchtext}`);
            //template literal and fetching names that include the value of searchtext
            const data = await response.json();
            displayCafes(data);
            //display grid function of cafe boxes
        } catch (err) {
            console.error("search error:", err);
        }
    };
    







    const openFormBtn = document.getElementById('openFormBtn');
    const closeFormBtn = document.getElementById('closeFormBtn');
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackFormContent = document.getElementById('feedbackFormContent');

    
    openFormBtn.addEventListener('click', () => {
        feedbackForm.style.display = 'block';  
    });

    closeFormBtn.addEventListener('click', () => {
        feedbackForm.style.display = 'none';  
    });
    //changing style property of the modal


    
 
feedbackFormContent.addEventListener('submit', function(event) {
    event.preventDefault(); 
     //form refreshes page (so preventdefault prevents this)

    //for object properties later get name and feedback from form
    let name = document.getElementById('name').value;
    let feedback = document.getElementById('feedback').value;

    //object to store feedback properties in
    let feedbackData = {
        name: name,
        feedback: feedback
    };

    console.log(feedbackData); // displays feedback data in developer tools before POST fetch request
    //to view if data being submitted is correct 



        //sending feedback form data back to server to be submitted to feedback.json via POST /submit-feedback
        fetch('/submit-feedback', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(feedbackData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('feedback submitted:', data);
            feedbackForm.style.display = 'none';  //modal non-visible when feedback submitted (disappears)
        })
        .catch(error => {
            console.error('submission error :', error);
        });
    });



    cafeForm.onsubmit = function (event) {
        event.preventDefault();

        let newCafe = {
            //name,location...etc = to form submittted values 
            name: document.getElementById("cafeName").value,
            location: document.getElementById("cafeLocation").value,
            coffeetypes: document.getElementById("cafeCoffeeTypes").value,
            reviews: document.getElementById("cafeRating").value,
            comments: document.getElementById("cafeComments").value
        };


        fetch('/addCafe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCafe)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Cafe added:", data);
            cafes.push(data.cafe);
            displayCafes(cafes);
            addCafeModal.style.display = "none";
            location.reload()
        })
        .catch(err => console.error("cafe adding error:", err));
    };



    async function loadCafes() {
        try {
            const response = await fetch('/cafes');
            const data = await response.json();
            cafes = data;
            displayCafes(cafes);
        } catch (error) {
            console.error("cafe loading error:", error);
        }
    }
    
    loadCafes();
    