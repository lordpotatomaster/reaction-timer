//all methods to talk to the API

// --------------------------------------
// Get Scores to display on leader board
// --------------------------------------
async function getScores() {
    
    const data = await callAPIgetScores()
    
    return data;    //returns an array of json object with scores
    
}    

// --------------------------------------
// Save score to leader board
// --------------------------------------
async function saveScore(score) {
    // format of the score expected
    // a json object : {"name" : "player X","reactiontime" : 0.10,"date": "21-Jun-2022"}

    const data = await callAPIaddScore(score)
    //ignore the return
}

function createScore(name,reactiontime)  {
    uname = (name == '')?'NoNamer':name;

    details =   {
        "name": uname,
        "reactiontime": reactiontime,
        "date": getDate()
    }
    console.log(details)
    saveScore(JSON.stringify(details));
}
function getDate()  {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    return today
}

//----------------- FUNCTIONS TO TALK TO THE API -------------------------------------

async function callAPIgetScores() {
    let response = await fetch("https://reactiontimerleaderboard.azurewebsites.net/api/ListScores?name=test")
    let data = await response.json()
    return data
}

async function callAPIaddScore(score) {
    let response = await fetch("https://reactiontimerleaderboard.azurewebsites.net/api/AddScore?score="+score)
    let data = await response.json()
    return data
}