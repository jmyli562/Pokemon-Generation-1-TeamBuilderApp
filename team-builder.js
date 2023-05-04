let changedPokemon = false;
let chosenTeam;
const pkmTeam1 = []; 
const pkmTeam2 = []; 
const currTeam = []; //an array that will hold pokemon objects of the users selected team of pokemon
let currPokemon = {};

const teamPreview = document.getElementById("team-viewer");
const editTeamBtn1 = document.getElementById("edit-team1");
const editTeamBtn2 = document.getElementById("edit-team2");
const saveTeamBtn1 = document.getElementById("add-team1");
const saveTeamBtn2 = document.getElementById("add-team2");
const showTeamBtn1 = document.getElementById("show-team1");
const showTeamBtn2 = document.getElementById("show-team2");
const clearTeamBtn1 = document.getElementById("clear-team1");
const clearTeamBtn2 = document.getElementById("clear-team2");

const move1 = document.getElementById("move1");
const move2 = document.getElementById("move2");
const move3 = document.getElementById("move3");
const move4 = document.getElementById("move4");

const div = document.getElementById("pokemon-image");
const img = document.getElementById("image");
const p = document.getElementById("name");
const p1 = document.getElementById("type1");
const pkmImages = document.getElementById("team1");
const pkmImages2 = document.getElementById("team2");
const p2 = document.getElementById("type2");
const p3 = document.getElementById("ability");

const slctDropDown = document.getElementById("pokemon-list"); //getting the dropdown menu
const addPkmBtn = document.getElementById("add-pokemon"); //getting the add pokemon button

slctDropDown.addEventListener("change", displayPokemonImage)
addPkmBtn.addEventListener("click", addPokemonToTeam);
saveTeamBtn1.addEventListener("click", saveCurrTeamToOne);
saveTeamBtn2.addEventListener("click", saveCurrTeamToTwo);
editTeamBtn1.addEventListener("click", ()=>{
    displayTeamOne();
    window.alert("Please click on a Pokemon to edit its moves or replace it.");
});
editTeamBtn2.addEventListener("click", ()=>{
    displayTeamTwo();
});
clearTeamBtn1.addEventListener("click", ()=>{
    deleteTeamOneFromServer();
    
    deletePokemonImage();

    window.alert("Team One Cleared!");
});
clearTeamBtn2.addEventListener("click", ()=>{
    deleteTeamTwoFromServer();

    deletePokemonImageTeam2();

    window.alert("Team Two Cleared!");
});

showTeamBtn1.addEventListener("click", displayTeamOne);
showTeamBtn2.addEventListener("click", displayTeamTwo);

//zoomPageOut(); //will set the zoom of the page automaticallyo to 75% to make the page look nice
fetchPokemonNames();
//deleteTeamOneFromServer();
/*
function zoomPageOut(){
    document.body.style.zoom = "80%";
}

*/

function displayTeamOne(){
    chosenTeam = 1;
    displayTeam(chosenTeam);
}

function displayTeamTwo(){
    chosenTeam = 2;
    displayTeam(chosenTeam);
}

function deletePokemonImageTeam2(){
    while(pkmImages2.firstChild){
        pkmImages2.removeChild(pkmImages2.firstChild);
    }
}

function displayTeam(team){
    if(team === 1){     
        fetch("http://localhost:3000/Team1")
        .then(resp=>resp.json())
        .then(data=>data.forEach((member)=>{
            const grabDiv = document.getElementById("team1");
            const img = document.createElement("img");
            img.src = member.image;
            img.addEventListener("click", viewClickedPokemonTeam1);
            grabDiv.appendChild(img);
        }))

    }else{
        fetch("http://localhost:3000/Team2")
        .then(resp=>resp.json())
        .then(data=>data.forEach((member)=>{
            const grabDiv = document.getElementById("team2");
            const img = document.createElement("img");
            img.src = member.image;
            img.addEventListener("click", viewClickedPokemonTeam2);
            grabDiv.appendChild(img);
        }))
    }
}

function writeTeamOneToServer(){

    pkmTeam1.forEach((member)=>{
        fetch("http://localhost:3000/Team1", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(member),
        });
    });
}

function writeTeamTwoToServer(){ //we need to make a POST request
    pkmTeam2.forEach((member)=>{
        fetch("http://localhost:3000/Team2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(member),
        })
    });
}

function deleteTeamOneFromServer(){

    fetch("http://localhost:3000/Team1")
    .then(resp=>resp.json())
    .then(team => team.forEach((member)=>{
        let id = member.id;
        fetch(`http://localhost:3000/Team1/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
    }))
    .catch(error=>{
        throw(error);
    });
}

function deleteTeamTwoFromServer(){

    fetch("http://localhost:3000/Team2")
    .then(resp=>resp.json())
    .then(team => team.forEach((member)=>{
        let id = member.id;
        fetch(`http://localhost:3000/Team2/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
    }))
    .catch(error=>{
        throw(error);
    });
}

async function checkIfTeamOneIsFull(){

    let isFull;

    return fetch("http://localhost:3000/Team1")
    .then((resp)=>{
        return resp.json().then((data)=>{
            if(data.length >= 6){
                isFull = true;
            }else{
                isFull = false;
            }

            return isFull;
        })
    })
}

async function checkIfTeamTwoIsFull(){

    let isFull;

    return fetch("http://localhost:3000/Team2")
    .then((resp)=>{
        return resp.json().then((data)=>{
            if(data.length >= 6){
                isFull = true;
            }else{
                isFull = false;
            }

            return isFull;
        })
    })
}

function saveCurrTeamToOne(){

    if(currTeam.length < 6){
        window.alert("Can't save a team with less than 6 pokemon. Please add more pokemon.");
    }else{
        checkIfTeamOneIsFull().then((isFull)=>{
            if(isFull){ //checking if team 1 already has something saved to it
                if(window.confirm("There is already a team saved to Team 1. Do you want to overwrite this team to Team 1?")){
    
                    deleteTeamOneFromServer();
                    
                    pkmTeam1.length = 0;
    
                    for(let i = 0; i < currTeam.length; i++){
                        pkmTeam1.push(currTeam[i]);
                    }
    
                    writeTeamOneToServer();

                    pkmTeam1.length = 0;
            
                    window.alert("Team saved to slot 1");
            
                    currTeam.length = 0; //clearing the currentTeam
                    
                    deletePokemonImage();
    
                }else{
                    window.alert("Team is full. Please clear team 1 to save your team");
                }
            }else{
                for(let i = 0; i < currTeam.length; i++){
                    pkmTeam1.push(currTeam[i]);
                }
    
                writeTeamOneToServer();

                pkmTeam1.length = 0;
        
                window.alert("Team saved to slot 1");
        
                currTeam.length = 0; //clearing the currentTeam
                
                deletePokemonImage();
            }
        })
    }
}

function saveCurrTeamToTwo(){
    if(currTeam.length < 6){
        window.alert("Can't save a team with less than 6 pokemon. Please add more pokemon.");
    }else{
        checkIfTeamTwoIsFull().then((isFull)=>{
            if(isFull){ //checking if team 2 already has something saved to it
                if(window.confirm("There is already a team saved to Team 2. Do you want to overwrite this team to Team 2?")){
    
                    deleteTeamTwoFromServer();
                    
                    pkmTeam2.length = 0;
    
                    for(let i = 0; i < currTeam.length; i++){
                        pkmTeam2.push(currTeam[i]);
                    }
    
                    writeTeamTwoToServer();

                    pkmTeam2.length = 0;
            
                    window.alert("Team saved to slot 2");
            
                    currTeam.length = 0; //clearing the currentTeam
                    
                    deletePokemonImage();
    
                }else{
                    window.alert("Team is full. Please clear team 2 to save your team");
                }
            }else{
                for(let i = 0; i < currTeam.length; i++){
                    pkmTeam2.push(currTeam[i]);
                }
    
                writeTeamTwoToServer();

                pkmTeam2.length = 0;
        
                window.alert("Team saved to slot 2");
        
                currTeam.length = 0; //clearing the currentTeam
                
                deletePokemonImage();
            }
        })
    }
}

function deletePokemonImage(){

    while(pkmImages.firstChild){
        pkmImages.removeChild(pkmImages.firstChild);
    }
}

function displayPokemonImage(){

    if(changedPokemon === true){ //if the user decides to switch the pokemon clear the options because they contain the moves of the previous pokemon
        move1.length = 0;
        move2.length = 0;
        move3.length = 0;
        move4.length = 0;

        changedPokemon = false;
    }

    const pokemonName = slctDropDown.value; //grabbing the pokemon that the user selected
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(resp=>resp.json())
    .then((mons)=>{
        currPokemon.name = pokemonName;
        currPokemon.type1 = mons.types[0].type.name;
        const learnedMoves = mons.moves;
        currPokemon.image = mons.sprites.front_default;
        img.src = mons.sprites.front_default;
        img.style = "width:250px;height:250px;";
        p.textContent = `Name: ${pokemonName}\n`;
        p1.textContent = `Type 1: ${mons.types[0].type.name}`;

        if(mons.types.length === 1){ //checking if the pokemon has only 1 type. if so set type 2 as `NONE`
            currPokemon.type2 = null;
            p2.textContent = `Type 2: None`;
        }else{ 
            currPokemon.type2 = mons.types[1].type.name;
            p2.textContent = `Type 2: ${mons.types[1].type.name}`;
        }

        currPokemon.ability = mons.abilities[0].ability.name;
        p3.textContent = `Ability: ${mons.abilities[0].ability.name}`;

        displayMoves(learnedMoves);
    })
}

function displayMoves(moves){

    moves.forEach((move)=>{
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        const option3 = document.createElement("option");
        const option4 = document.createElement("option");

        option1.value = move.move.name;
        option1.textContent = move.move.name;
        option2.value = move.move.name;
        option2.textContent = move.move.name;
        option3.value = move.move.name;
        option3.textContent = move.move.name;
        option4.value = move.move.name;
        option4.textContent = move.move.name;
        
        move1.appendChild(option1);
        move2.appendChild(option2);
        move3.appendChild(option3);
        move4.appendChild(option4);

        changedPokemon = true;
    })
}

function addPokemonToTeam(){
    //each team can have a maximum of only 6 pokemon. do not let the user add more than 6 
        //ask user if they want to save the current team
        //add the pokemon to a new team
        //clear the current team to make room for a new team
        //ask the user if they would like to save their team 

        if(checkIfMaxReached(currTeam)){

            window.alert("You are not allowed to add more than 6 members to a team. Please delete an pokemon from the current team or add this pokemon to a new team.");

        }else{
            //we only want to set the moves to the pokemon when the user presses the add pokemon button because they can change their mind!
            currPokemon.move1 = move1.value;
            currPokemon.move2 = move2.value;
            currPokemon.move3 = move3.value;
            currPokemon.move4 = move4.value;

            currTeam.push(currPokemon);
            previewTeam(currTeam);
            currPokemon = {};

            displayPokemonImage();
        }
}

function previewTeam(arr){
    for(let i = 0; i < arr.length; i++){

            i = arr.length - 1;
            const grabDiv = document.getElementById("team1");
            const img = document.createElement("img");
            img.src = arr[i].image;
            //img.addEventListener("click", viewPokemonStats);
            //img.addEventListener("dblclick", deletePokemonFromTeam);
            grabDiv.appendChild(img);
    }
}

function viewClickedPokemonTeam1(e){

    e.stopPropagation();
    let slctedPokemon = e.target.src;
    console.log(slctedPokemon);
    const modal = document.getElementById("pkmModal");
    modal.classList.toggle("show-modal");

    fetch("http://localhost:3000/Team1")
    .then(resp=>resp.json())
    .then((data)=>{
        data.forEach((member)=>{
            if(slctedPokemon === member.image){
                const modalContent = document.getElementsByClassName("modal-content")[0];
                const pkmImage = document.createElement("img");
                pkmImage.src = member.image;
                const modalText = document.createElement("p");
                modalText.textContent = `What would you like to do with ${member.name}?`
                modalContent.appendChild(modalText);
                modalContent.appendChild(pkmImage);
            }
        })
    })
}

function viewClickedPokemonTeam2(e){
    console.log(e.target.src);
    const modal = document.getElementById("pkmModal");
    modal.classList.toggle("show-modal");
}

function deletePokemonFromTeam(e){ //should delete the pokemon on the webpage as well as on the backend
    //console.log(e.target.parentNode);
    if(window.confirm("Are you sure you want to delete this Pokemon from your team?")){
        for(let i = 0; i < currTeam.length; i++){
            if(e.target.src === currTeam[i].image){
                const index = currTeam.indexOf(currTeam[i]);
                currTeam.splice(index, 1);
                e.target.remove();
            }
        }
    }
}

function checkIfMaxReached(arr){
    let full;
    if(arr.length === 6){
        full = true;
    }else{
        full = false;
    }

    return full;
}

function fetchPokemonNames(){
    let pokemonNames = [];
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151%27") //limit the search to 151 pokemon
    .then(resp=>resp.json())
    .then((mons)=>{
        mons.results.forEach((pokemon)=>{
            pokemonNames.push(pokemon.name);
        })
        addPokemonNamesToSelection(pokemonNames); 
    })
}

//this function will take the array of pokemon names and append options in the select dropdown to the DOM
function addPokemonNamesToSelection(pkmArr){ 
    const dropdown = document.getElementById("pokemon-list");
    
    pkmArr.forEach((name)=>{
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;

        dropdown.appendChild(option);
    })
}