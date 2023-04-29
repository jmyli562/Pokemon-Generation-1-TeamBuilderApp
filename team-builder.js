
const pkmTeam1 = {};
const pkmTeam2 = {};
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

fetchPokemonNames()

function displayPokemonImage(){

    const pokemonName = slctDropDown.value; //grabbing the pokemon that the user selected
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(resp=>resp.json())
    .then((mons)=>{
        const learnedMoves = mons.moves;
        img.src = mons.sprites.front_default;
        img.style = "width:300px;height:300px;";
        p.textContent = `Name: ${pokemonName}\n`;
        p1.textContent = `Type 1: ${mons.types[0].type.name}`;

        if(mons.types.length === 1){ //checking if the pokemon has only 1 type. if so set type 2 as `NONE`
            p2.textContent = `Type 2: None`;
        }else{ 
            p2.textContent = `Type 2: ${mons.types[1].type.name}`;
        }

        p3.textContent = `Ability: ${mons.abilities[0].ability.name}`;

        //displayMoves(learnedMoves);
    })
}

function displayMoves(moves){
    
    const div = document.getElementById("pokemon-move-list");
    const move1 = document.getElementById("move1");
    move1.style = "";
    const move2 = document.getElementById("move2");
    move2.style = "";
    const move3 = document.getElementById("move3");
    move3.style = "";
    const move4 = document.getElementById("move4");
    move4.style = "";

    div.appendChild(move1);
    div.appendChild(move2);
    div.appendChild(move3);
    div.appendChild(move4);

    moves.forEach((move)=>{
        const option = document.createElement("option");
        option.value = move.move.name;
        option.textContent = move.move.name;
        
        move1.appendChild(option);
        move2.appendChild(option);
        move3.appendChild(option);
        move4.appendChild(option);
    })
}

function addPokemonToTeam(){
    //each team can have a maximum of only 6 pokemon. do not let the user add more than 6 
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