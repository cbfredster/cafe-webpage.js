const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express(); 


app.use(express.static('public'));
app.use(express.json());




//FEEDBACK  STUFF

const feedbackFile = path.join("./feedback.json");

//path for where the feedback.json file is within the main file (same level as server.js)


app.post('/submit-feedback', (req, res) => {
    // creates post route for submitting feedback (https://expressjs.com/en/starter/basic-routing)
        
    const feedback = req.body;
   // assigns 'feedback' to the body of the request from the user (or I) when form submitted
 
    fs.readFile(feedbackFile, (err, data) => {

        //reads the prexisitng feedback.json file (https://nodejs.org/dist/latest-v16.x/docs/api/fs)
        // two arguments (data and error)

        let feedbackList = [];

        // array to hold feedback data (block-scope so can be reassigned)

        if (!err) {

            //if no errors then parse the form data as normal
            feedbackList = JSON.parse(data);
        }

        feedbackList.push(feedback);
        //pushes feedbacklist (data from form) to body of request 

        fs.writeFile(feedbackFile, JSON.stringify(feedbackList), (err) => {

            //writes the feedbackList (stringified first ) onto the json file 
            if (err) {
                return res.status(400).json({ message: 'feedback has not been saved' });

                //error 400 is just internal server error 
                //message types found in res.json([body]) section in (https://expressjs.com/en/api)
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ message: "submission has worked" });

            //not necessrailu needed but 200 is succesfulL request
        });
    });
});




// FEEDBACK GET STUFF
app.get('/feedback', (req, res) => {

    //same as before creates route for recieving feedback details

    fs.readFile(feedbackFile, (err, data) => {

        //reads the feedback.json file (feedbackfile intiated at the beginning of this js file)

        //if any error occurs then if statement returns message in developer tools (network then response section as json text)
        if (err) {
            return res.status(400).json({ message: "error with reading the file" });
        }

        // status 200 (successful ), so reponse is feedback.json 
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(JSON.parse(data));
    });
});



//FILTER BY YORK AND DURHAM (GET)

app.get('/cafes', (req, res) => {
//initiates route for recieving cafe details 

    const filter = req.query.filter;
//initialsed filter variable as an object of all queries of matching location (either y or d)
//https://www.geeksforgeeks.org/express-js-req-query-property/ 

    try {
       
        const cafes = JSON.parse(fs.readFileSync(path.join('./public', './cafes.json')));
        // 'cafe' is parsed from json file and is js object

        let filteredCafes = cafes;
        // filteredCafes is assigned cafe to later be filtered

        // filter based on the chosen option
        if (filter) {
            switch (filter) {
                case 'york':
                    filteredCafes = cafes.filter(cafe => cafe.location == 'York');

                    //const result = words.filter((word) => word.length > 6); MDN WEB DOCS EXAMPLE
                    //(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
                    break;
                case 'durham':
                    filteredCafes = cafes.filter(cafe => cafe.location == 'Durham');

                    // same here but with different location name (durham)
                    break;
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(filteredCafes);

        //response is filtered cafe (parts of) json file that match the name property (d or y)
    } catch (err) {
        res.status(400).json({ message: 'error reading file' });

        //same error code as before (i.e 400 internal server error)
    }
});







//CAFE id RETREIVAL (GET)

app.get('/cafe/:id', (req, res) => {

//initiated route for getting cafe by its ID property
//https://expressjs.com/en/guide/routing (:id allows for multiple cafe id's using a single route)

    const cafeId = req.params.id;
// variable cafeId = to be used as request to fetch the parameter (cafe id) through fetch() call in script.js
    
    try {
        const cafes = JSON.parse(fs.readFileSync(path.join('./public', './cafes.json')));
          // (like before) cafe defined as js object parsed and read from the cafe.json file (in folder 1 deeper than server.js)
        const cafe = cafes.find(cafe => cafe.id == cafeId);
        // cafe = cafes request with matching id , as in case any cafes share same name (id is unique)


        if (!cafe) {
            return res.status(404).json({ message: 'cafe cannot be found' });
        }

        //if cafe does not exist return classic 404 error via json to developer tools response
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cafe); 
        //expected response of cafe being matched then returns cafe as json
    } catch (err) {
        res.status(400).json({ message: 'error with reading cafes.json file' });
        //again like before error reading file (give the response of 400)
    }
});
;






//SEARCH BAR (GET METHOD)

app.get('/search', (req, res) => {
    //same again defines route for /search

    const searchtext = req.query.names.toLowerCase();
    // searchtext is defined as an object that contains all the queries of names (the searched word) and lowercases them 

    if (!searchtext) 
     return res.json([]); 
    //if no queries then just returns blank array (no results)

    try {
        const cafes = JSON.parse(fs.readFileSync(path.join('./public', './cafes.json')));
              //defined cafes like before in block-scope

        const results = cafes.filter(cafe => cafe.name.toLowerCase().includes(searchtext));
         //results are 
         //(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
         //https://www.reddit.com/r/learnjavascript/comments/qa5ur6/how_do_i_use_includes_and_tolowerccase_in_same_if/?rdt=37754
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(results);  

        //returns the json of successful results (an object of name matching the searched text)
    } catch (err) {
        res.status(400).json({ message: 'Error reading cafes data' });
// yet again the same copy and pasted error message
    }
});





//ADD CAFE SECTION (POST)

app.post('/addCafe', (req, res) => {
//defined route for adding cafes
    
    const { name, location, coffeetypes, reviews, comments } = req.body;
       //req.body holds form data which is assigned to this constant and its properties respectively

    if (!name || !location || !coffeetypes || !reviews || !comments) {

        return res.status(400).json({ message: 'form is not fully filled out' });
        // error 400 for 'user not providing necessary data'
    }

    try {
        const cafes = JSON.parse(fs.readFileSync(path.join('./public', './cafes.json')));

    //cafes defined  again 

        // as cafe names can be repeated, identifiable property would be simple numerical id
        const newId = cafes.length ? (parseInt(cafes[cafes.length - 1].id, 10) + 1).toString() : '1';
          //// the id of cafes.json array element at length(cafe)[the last id] in base 10 +1 for new id incerase 

        //new cafe variable needs new id as well as rest of details
        const newCafe = { id: newId, name, location, coffeetypes, reviews, comments};

        cafes.push(newCafe);  //pushes new cafe to cafe array
        
        fs.writeFileSync(path.join('./public', './cafes.json'), JSON.stringify(cafes, null, 2));
        //writes json file like before asycnhronously and stringifies, with null, 2 to make it pretty-print in cafes.json file (so can be more easily read)

        res.json({ message: 'new cafe added', cafe: newCafe });
    } catch (err) {
        res.status(400).json({ message: 'writing to cafe.json error' });
    }
});












app.listen(8000, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:8000/`);
});
