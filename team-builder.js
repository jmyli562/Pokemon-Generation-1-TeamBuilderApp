let changedPokemon = false;
const pkmTeam1 = []; //this will hold the array of teams created by the user
const pkmTeam2 = []; 
const currTeam = []; //an array that will hold pokemon objects of the users selected team of pokemon
let currPokemon = {};
let numTeamsCreated = 0;

const teamPreview = document.getElementById("team-viewer");
const saveTeamBtn1 = document.getElementById("add-team1");
const saveTeamBtn2 = document.getElementById("add-team2");
const showTeamBtn1 = document.getElementById("show-team1");
const showTeamBtn2 = document.getElementById("show-team2");

const move1 = document.getElementById("move1");
const move2 = document.getElementById("move2");
const move3 = document.getElementById("move3");
const move4 = document.getElementById("move4");

const div = document.getElementById("pokemon-image");
const img = document.getElementById("image");
const p = document.getElementById("name");
const p1 = document.getElementById("type1");
const p2 = document.getElementById("type2");
const p3 = document.getElementById("ability");

const slctDropDown = document.getElementById("pokemon-list"); //getting the dropdown menu
const addPkmBtn = document.getElementById("add-pokemon"); //getting the add pokemon button

slctDropDown.addEventListener("change", displayPokemonImage)
addPkmBtn.addEventListener("click", addPokemonToTeam);
saveTeamBtn1.addEventListener("click", saveCurrTeamToOne);
saveTeamBtn2.addEventListener("click", saveCurrTeamToTwo);

fetchPokemonNames();

function saveCurrTeamToOne(){
    if(currTeam.length < 6){
        window.alert("Can't save a team with less than 6 pokemon. Please add more pokemon.");
    }else{
        for(let i = 0; i < currTeam.length; i++){
            pkmTeam1.push(currTeam[i]);
        }

        currTeam.length = 0; //clearing the currentTeam
        const pkmImages = document.getElementById("team1");
        
        while(pkmImages.firstChild){
            pkmImages.removeChild(pkmImages.firstChild);
        }
    }
}

function saveCurrTeamToTwo(){
    if(currTeam.length < 6){
        window.alert("Can't save a team with less than 6 pokemon. Please add more pokemon.");
    }else{
        for(let i = 0; i < currTeam.length; i++){
            pkmTeam2.push(currTeam[i]);
        }

        currTeam.length = 0; //clearing the currentTeam
        const pkmImages = document.getElementById("team1");
        
        while(pkmImages.firstChild){
            pkmImages.removeChild(pkmImages.firstChild);
        }
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

            //pkmTeams.push(currTeam);
            //numTeamsCreated+=1;
            //currTeam.length = 0;

            //currTeam.push(currPokemon);
            //displayTeam(currTeam);
            //currPokemon = {};

        }else{
            //we only want to set the moves to the pokemon when the user presses the add pokemon button because they can change their mind!
            currPokemon.move1 = move1.value;
            currPokemon.move2 = move2.value;
            currPokemon.move3 = move3.value;
            currPokemon.move4 = move4.value;

            currTeam.push(currPokemon);
            displayTeam(currTeam);
            currPokemon = {};

            displayPokemonImage();
        }
}

function displayTeam(arr){
    for(let i = 0; i < arr.length; i++){
        if(numTeamsCreated > 0){
            i = arr.length - 1;
            const grabDiv = document.getElementById("team2");
            const img = document.createElement("img");
            img.src = arr[i].image;
            img.addEventListener("click", viewPokemonStats);
            img.addEventListener("dblclick", deletePokemonFromTeam);
            grabDiv.appendChild(img);
        }else{
            i = arr.length - 1;
            const grabDiv = document.getElementById("team1");
            const img = document.createElement("img");
            img.src = arr[i].image;
            img.addEventListener("click", viewPokemonStats);
            img.addEventListener("dblclick", deletePokemonFromTeam);
            grabDiv.appendChild(img);
        }
    }
}

function viewPokemonStats(){

    console.log("Entered viewPokemonStats");
}

function deletePokemonFromTeam(e){ //should delete the pokemon on the webpage as well as on the backend

    if(window.confirm("Are you sure you want to delete this Pokemon from your team?")){
        for(let i = 0; i < currTeam.length; i++){
            if(e.target.src === currTeam[i].image){
                const index = currTeam.indexOf(currTeam[i]);
                currTeam.splice(index, 1);
                e.target.remove();
            }
        }
    }else{

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