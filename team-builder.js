let changedPokemon = false;
let chosenTeam;
const pkmTeam1 = []; ////am arrau that will hold the team that the user saved to slot 1
const pkmTeam2 = []; //am arrau that will hold the team that the user saved to slot 2
const currTeam = []; //an array that will hold pokemon objects of the users selected team of pokemon
let currPokemon = {};
const membersToUpdate = [];
let wasEdited = false;
let addToTeamOne; //boolean which will hold the value of true if the currPokemon needs to be added to team 1 or false which means the pokemon will be added to team 2

const modal = document.getElementById("pkmModal");
const close = document.querySelector(".close");
const teamPreview = document.getElementById("team-viewer");
const editTeamBtn1 = document.getElementById("edit-team1");
const editTeamBtn2 = document.getElementById("edit-team2");
const saveTeamBtn1 = document.getElementById("add-team1");
const saveTeamBtn2 = document.getElementById("add-team2");
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
const pkmImages1 = document.getElementById("team1");
const pkmImages2 = document.getElementById("team2");
const p2 = document.getElementById("type2");
const p3 = document.getElementById("ability");

const slctDropDown = document.getElementById("pokemon-list");
const addPkmBtn = document.getElementById("add-pokemon");

slctDropDown.addEventListener("change", displayPokemonImage);
addPkmBtn.addEventListener("click", addPokemonToTeam);
saveTeamBtn1.addEventListener("click", saveCurrTeamToOne);
saveTeamBtn2.addEventListener("click", saveCurrTeamToTwo);
close.addEventListener("click", () => {
  showModal();
  removeModalContent();
});
editTeamBtn1.addEventListener("click", (e) => {
  e.stopPropagation();
  if (editTeamBtn2.disabled === true) {
    //check needed because if the user presses edit team 1 after viewing team 2 the button for edit team 1 was not disabled
    deletePokemonImageTeam2();
    displayTeamOne();
    window.alert("Please click on a Pokemon to edit its moves or replace it.");
    editTeamBtn1.disabled = true;
    editTeamBtn2.disabled = false;
  } else {
    displayTeamOne();
    window.alert("Please click on a Pokemon to edit its moves or replace it.");
    editTeamBtn1.disabled = true;
  }
});
editTeamBtn2.addEventListener("click", (e) => {
  e.stopPropagation();
  if (editTeamBtn1.disabled === true) {
    deletePokemonImageTeam1();
    displayTeamTwo();
    window.alert("Please click on a Pokemon to edit its moves or replace it.");
    editTeamBtn2.disabled = true;
    editTeamBtn1.disabled = false;
  } else {
    displayTeamTwo();
    window.alert("Please click on a Pokemon to edit its moves or replace it.");
    editTeamBtn2.disabled = true;
  }
});
clearTeamBtn1.addEventListener("click", (e) => {
  e.stopPropagation();

  deleteTeamOneFromServer();

  deletePokemonImageTeam1();

  const table = document.getElementById("team-analysis-table");

  table.hidden = true;

  window.alert("Team One Cleared!");
});
clearTeamBtn2.addEventListener("click", (e) => {
  e.stopPropagation();

  deleteTeamTwoFromServer();

  deletePokemonImageTeam2();

  const table = document.getElementById("team-analysis-table");

  table.hidden = true;

  window.alert("Team Two Cleared!");
});

zoomPageOut(); //will set the zoom of the page automatically to to 65% to make the page look nice
fetchPokemonNames();

function zoomPageOut() {
  document.body.style.zoom = "65%";
}

function displayTeamOne() {
  chosenTeam = 1;
  displayTeam(chosenTeam);
}

function displayTeamTwo() {
  chosenTeam = 2;
  displayTeam(chosenTeam);
}

function deletePokemonImageTeam2() {
  while (pkmImages2.firstChild) {
    //this function will loop through the images under the div and remove the images
    pkmImages2.removeChild(pkmImages2.firstChild);
  }
}

function createTeamCard(member, team) {
  if (team === 1) {
    const grabDiv = document.getElementById("team1");
    const containerDiv = document.createElement("div");
    const infoDiv = document.createElement("div");
    infoDiv.setAttribute("class", "info-container");
    containerDiv.setAttribute("class", "slot-container");
    const img = document.createElement("img");
    const span = document.createElement("span");
    span.setAttribute("class", "slot-name");
    span.textContent = member.name;
    img.src = member.image;
    img.style.width = "200px";
    img.style.height = "200px";
    img.addEventListener("click", viewClickedPokemonTeam1);
    grabDiv.appendChild(containerDiv);
    containerDiv.appendChild(img);
    containerDiv.appendChild(infoDiv);
    infoDiv.appendChild(span);
  } else {
    const grabDiv = document.getElementById("team2");
    const containerDiv = document.createElement("div");
    const infoDiv = document.createElement("div");
    infoDiv.setAttribute("class", "info-container");
    containerDiv.setAttribute("class", "slot-container");
    const img = document.createElement("img");
    const span = document.createElement("span");
    span.setAttribute("class", "slot-name");
    span.textContent = member.name;
    img.src = member.image;
    img.style.width = "200px";
    img.style.height = "200px";
    img.addEventListener("click", viewClickedPokemonTeam2);
    grabDiv.appendChild(containerDiv);
    containerDiv.appendChild(img);
    containerDiv.appendChild(infoDiv);
    infoDiv.appendChild(span);
  }
}

function displayTeam(team) {
  if (team === 1) {
    fetch("https://pokemon-team-builder-ycg5.onrender.com/Team1")
      .then((resp) => resp.json())
      .then((data) =>
        data.forEach((member, index) => {
          createTeamCard(member, team);
          fillTeamTable(member, index + 1);
        })
      );
  } else if (team === 2) {
    const grabDiv = document.getElementById("team2");
    fetch("https://pokemon-team-builder-ycg5.onrender.com/Team2")
      .then((resp) => resp.json())
      .then((data) =>
        data.forEach((member, index) => {
          createTeamCard(member, team);
          fillTeamTable(member, index + 1);
        })
      );
  }
}

async function fillTeamTable(member, index) {
  //this function will fill the heading of the table with the members of the team as well as their icons
  const table = document.getElementById("team-analysis-table");
  table.hidden = false;

  const imgSlot = document.getElementsByClassName(`slot-${index}-pokemon`)[0]
    .children[0].children[0];

  imgSlot.src = member.image;

  const nameSlot = document.getElementsByClassName(`slot-${index}-pokemon`)[0]
    .children[0].children[1];

  nameSlot.textContent = member.name;

  getResistances(member);
  getWeaknesses(member);
}

function getResistances(pokemon) {
  //this function will make a fetch request to the PokeAPI type endpoint and push the half damage data to an array
  //and call a separate function to fill that data in a table
  const arrOfTypes = [];
  const resist = [];
  const type1 = pokemon.type1;
  const type2 = pokemon.type2;

  arrOfTypes.push(type1);
  arrOfTypes.push(type2);

  arrOfTypes.forEach((type) => {
    if (type !== null) {
      return fetch(`https://pokeapi.co/api/v2/type/${type}`)
        .then((resp) => {
          return resp.json();
        })
        .then((resistances) => {
          for (let types of resistances.damage_relations.half_damage_from) {
            resist.push(types.name);
            updateTableWithResistances(resist, pokemon.id);
            resist.length = 0;
          }
          //resist.length = 0;
        })
        .catch((err) => console.log("failed", err));
    }
  });
}

function getWeaknesses(pokemon) {
  const arrOfTypes = [];
  const weakness = [];
  const type1 = pokemon.type1;
  const type2 = pokemon.type2;

  arrOfTypes.push(type1);
  arrOfTypes.push(type2);

  arrOfTypes.forEach((type) => {
    if (type !== null) {
      return fetch(`https://pokeapi.co/api/v2/type/${type}`)
        .then((resp) => {
          return resp.json();
        })
        .then((resistances) => {
          for (let types of resistances.damage_relations.double_damage_from) {
            weakness.push(types.name);
            updateTableWithWeaknesses(weakness, pokemon.id);
            weakness.length = 0;
          }
          //resist.length = 0;
        })
        .catch((err) => console.log("failed", err));
    }
  });
}

function updateTableWithResistances(resistArr, id) {
  const table = document.getElementById("team-analysis-table");
  for (let h = 0; h < resistArr.length; h++) {
    for (let i = 0; (row = table.rows[i]); i++) {
      for (var j = 0, col; (col = row.cells[j]); j++) {
        if (row.getAttribute("data-tb-type") === resistArr[h]) {
          row.children[id].textContent = "Resist";
        }
      }
    }
  }
}

function updateTableWithWeaknesses(weaknessArr, id) {
  const table = document.getElementById("team-analysis-table");
  //console.table(resistArr);
  for (let h = 0; h < weaknessArr.length; h++) {
    for (let i = 0; (row = table.rows[i]); i++) {
      for (var j = 0, col; (col = row.cells[j]); j++) {
        if (row.getAttribute("data-tb-type") === weaknessArr[h]) {
          row.children[id].textContent = "Weak";
        }
      }
    }
  }
}

function writeTeamOneToServer() {
  pkmTeam1.forEach((member) => {
    fetch("https://pokemon-team-builder-ycg5.onrender.com/Team1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(member),
    });
  });
}

function writeTeamTwoToServer() {
  pkmTeam2.forEach((member) => {
    fetch("https://pokemon-team-builder-ycg5.onrender.com/Team2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(member),
    });
  });
}

function deleteTeamOneFromServer() {
  fetch("https://pokemon-team-builder-ycg5.onrender.com/Team1")
    .then((resp) => resp.json())
    .then((team) =>
      team.forEach((member) => {
        let id = member.id;
        fetch(`https://pokemon-team-builder-ycg5.onrender.com/Team1/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
      })
    )
    .catch((error) => {
      throw error;
    });
}

function deleteTeamTwoFromServer() {
  fetch("https://pokemon-team-builder-ycg5.onrender.com/Team2")
    .then((resp) => resp.json())
    .then((team) =>
      team.forEach((member) => {
        let id = member.id;
        fetch(`https://pokemon-team-builder-ycg5.onrender.com/Team2/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
      })
    )
    .catch((error) => {
      throw error;
    });
}

async function checkIfTeamOneIsFull() {
  let isFull;

  return fetch("https://pokemon-team-builder-ycg5.onrender.com/Team1").then(
    (resp) => {
      return resp.json().then((data) => {
        if (data.length >= 6) {
          isFull = true;
        } else {
          isFull = false;
        }

        return isFull;
      });
    }
  );
}

async function checkIfTeamTwoIsFull() {
  let isFull;

  return fetch("https://pokemon-team-builder-ycg5.onrender.com/Team2").then(
    (resp) => {
      return resp.json().then((data) => {
        if (data.length >= 6) {
          isFull = true;
        } else {
          isFull = false;
        }

        return isFull;
      });
    }
  );
}

function updateTeam1Member() {
  membersToUpdate.forEach((member, index) => {
    fetch(`https://pokemon-team-builder-ycg5.onrender.com/Team1/${member.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(currTeam[index]),
    })
      .then((resp) => resp.json())
      .then((pokemon) => console.log(pokemon));
  });
}

function updateTeam2Member() {
  membersToUpdate.forEach((member, index) => {
    fetch(`https://pokemon-team-builder-ycg5.onrender.com/Team2/${member.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(currTeam[index]),
    })
      .then((resp) => resp.json())
      .then((pokemon) => console.log(pokemon));
  });
}

function saveCurrTeamToOne() {
  if (wasEdited) {
    //isEdited is a boolean which keeps track of if a pokemon from either team 1 or team 2 was deleted
    const table = document.getElementById("team-analysis-table");
    createTeamCard(currPokemon, 1); //create a new team card for that newly added Pokemon
    updateTeam1Member();
    table.hidden = true;
    window.alert("Team 1 was updated with the new pokemon.");
    membersToUpdate.length = 0;
    currTeam.length = 0;
    deletePokemonImageTeam1();
    wasEdited = false;
    editTeamBtn1.disabled = false;
  } else if (currTeam.length < 6) {
    window.alert(
      "Can't save a team with less than 6 pokemon. Please add more pokemon."
    );
  } else {
    checkIfTeamOneIsFull().then((isFull) => {
      if (isFull) {
        //checking if team 1 already has something saved to it
        if (
          window.confirm(
            "There is already a team saved to Team 1. Do you want to overwrite this team to Team 1?"
          )
        ) {
          deleteTeamOneFromServer();

          pkmTeam1.length = 0;

          for (let i = 0; i < currTeam.length; i++) {
            pkmTeam1.push(currTeam[i]);
          }

          writeTeamOneToServer();

          pkmTeam1.length = 0;

          window.alert("Team saved to slot 1");

          currTeam.length = 0; //clearing the currentTeam

          deletePokemonImageTeam2();
        } else {
          window.alert("Team is full. Please clear team 1 to save your team");
        }
      } else {
        for (let i = 0; i < currTeam.length; i++) {
          pkmTeam1.push(currTeam[i]);
        }

        writeTeamOneToServer();

        pkmTeam1.length = 0;

        window.alert("Team saved to slot 1");

        editTeamBtn1.disabled = false;

        currTeam.length = 0; //clearing the currentTeam

        deletePokemonImageTeam2();
      }
    });
  }
}

function saveCurrTeamToTwo() {
  if (wasEdited) {
    const table = document.getElementById("team-analysis-table");
    createTeamCard(currPokemon, 2);
    updateTeam2Member();
    table.hidden = true;
    window.alert("Team 2 was updated with the new pokemon.");
    membersToUpdate.length = 0;
    currTeam.length = 0;
    deletePokemonImageTeam2();
    wasEdited = false;
    editTeamBtn2.disabled = false;
  } else if (currTeam.length < 6) {
    window.alert(
      "Can't save a team with less than 6 pokemon. Please add more pokemon."
    );
  } else {
    checkIfTeamTwoIsFull().then((isFull) => {
      if (isFull) {
        //checking if team 2 already has something saved to it
        if (
          window.confirm(
            "There is already a team saved to Team 2. Do you want to overwrite this team to Team 2?"
          )
        ) {
          deleteTeamTwoFromServer();

          pkmTeam2.length = 0;

          for (let i = 0; i < currTeam.length; i++) {
            pkmTeam2.push(currTeam[i]);
          }

          writeTeamTwoToServer();

          pkmTeam2.length = 0;

          window.alert("Team saved to slot 2");

          currTeam.length = 0; //clearing the currentTeam

          deletePokemonImageTeam2();
        } else {
          window.alert("Team is full. Please clear team 2 to save your team");
        }
      } else {
        for (let i = 0; i < currTeam.length; i++) {
          pkmTeam2.push(currTeam[i]);
        }

        writeTeamTwoToServer();

        pkmTeam2.length = 0;

        window.alert("Team saved to slot 2");

        editTeamBtn1.disabled = false;

        currTeam.length = 0; //clearing the currentTeam

        deletePokemonImageTeam2();
      }
    });
  }
}

function deletePokemonImageTeam1() {
  while (pkmImages1.firstChild) {
    pkmImages1.removeChild(pkmImages1.firstChild);
  }
}

function displayPokemonImage() {
  if (changedPokemon === true) {
    //if the user decides to switch the pokemon clear the options because they contain the moves of the previous pokemon
    move1.length = 0;
    move2.length = 0;
    move3.length = 0;
    move4.length = 0;

    changedPokemon = false;
  }

  const pokemonName = slctDropDown.value; //grabbing the pokemon that the user selected
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((resp) => resp.json())
    .then((mons) => {
      currPokemon.name = pokemonName;
      currPokemon.type1 = mons.types[0].type.name;
      const learnedMoves = mons.moves;
      currPokemon.image = mons.sprites.front_default;
      img.src = mons.sprites.front_default;
      img.style = "width:250px;height:250px;";
      p.textContent = `Name: ${pokemonName}\n`;
      p1.textContent = `Type 1: ${mons.types[0].type.name}`;

      if (mons.types.length === 1) {
        //checking if the pokemon has only 1 type. if so set type 2 as `NONE`
        currPokemon.type2 = null;
        p2.textContent = `Type 2: None`;
      } else {
        currPokemon.type2 = mons.types[1].type.name;
        p2.textContent = `Type 2: ${mons.types[1].type.name}`;
      }

      currPokemon.ability = mons.abilities[0].ability.name;
      p3.textContent = `Ability: ${mons.abilities[0].ability.name}`;

      displayMoves(learnedMoves);
    });
}

function displayMoves(moves) {
  moves.forEach((move) => {
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
  });
}

function addPokemonToTeam() {
  //each team can have a maximum of only 6 pokemon. do not let the user add more than 6
  //ask user if they want to save the current team
  //add the pokemon to a new team
  //clear the current team to make room for a new team
  //ask the user if they would like to save their team

  if (checkIfMaxReached(currTeam)) {
    window.alert(
      "You are not allowed to add more than 6 members to a team. Please delete an pokemon from the current team or add this pokemon to a new team."
    );
  } else {
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

function removeModalContent() {
  const modalContent = document.querySelector(".modal-content");

  while (modalContent.lastChild) {
    modalContent.removeChild(modalContent.lastChild);
  }
}

function previewTeam(arr) {
  if (addToTeamOne) {
    for (let i = 0; i < arr.length; i++) {
      i = arr.length - 1;
      createTeamCard(arr[i], 1);
      addToTeamOne = false;
    }
  } else {
    for (let i = 0; i < arr.length; i++) {
      i = arr.length - 1;
      createTeamCard(arr[i], 2);
      addToTeamOne = false;
    }
  }
}

function showModal() {
  modal.classList.toggle("show-modal");
}

function setModalContent(member, team) {
  const modalContent = document.getElementsByClassName("modal-content")[0];
  const deleteBtn = document.createElement("button");
  const newMoveBtn = document.createElement("button");
  const pokemonInfo = document.createElement("p");
  const breakTag = document.createElement("br");

  pokemonInfo.setAttribute("style", "white-space: pre;");
  pokemonInfo.textContent = `Name: ${member.name} \r\n`;
  pokemonInfo.textContent += `Type1: ${member.type1} \r\n`;
  pokemonInfo.textContent += `Type2: ${member.type2} \r\n`;
  pokemonInfo.textContent += `Ability: ${member.ability} \r\n`;
  pokemonInfo.textContent += `Move 1: ${member.move1} \r\n`;
  pokemonInfo.textContent += `Move 2: ${member.move2} \r\n`;
  pokemonInfo.textContent += `Move 3: ${member.move3} \r\n`;
  pokemonInfo.textContent += `Move 4: ${member.move4} \r\n`;

  deleteBtn.textContent = "Delete Pokemon";
  newMoveBtn.textContent = "Choose new moves";
  const updateBtn = document.createElement("button");
  updateBtn.textContent = "Update Moves";
  const pkmImage = document.createElement("img");
  pkmImage.style.width = "300px";
  pkmImage.style.height = "300px";
  pkmImage.src = member.image;
  const modalText = document.createElement("p");

  modalText.textContent = `What would you like to do with ${member.name}?`;
  modalContent.appendChild(close);
  modalContent.appendChild(modalText);
  modalContent.appendChild(pkmImage);
  modalContent.appendChild(newMoveBtn);
  modalContent.appendChild(pokemonInfo);
  modalContent.appendChild(deleteBtn);
  modalContent.appendChild(breakTag);
  modalContent.appendChild(updateBtn);

  if (team === 1) {
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deletePokemonFromTeam1(member);
    });

    newMoveBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      displayLearnedMoves(member);
    });

    updateBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      updateMovesTeam1(member);
    });
  } else {
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deletePokemonFromTeam2(member);
    });

    newMoveBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      displayLearnedMoves(member);
    });

    updateBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      updateMovesTeam2(member);
    });
  }
}

function viewClickedPokemonTeam1(e) {
  let team = 1;
  e.stopPropagation();
  let slctedPokemon = e.target.src;
  const modal = document.getElementById("pkmModal");
  showModal();

  fetch("https://pokemon-team-builder-ycg5.onrender.com/Team1")
    .then((resp) => resp.json())
    .then((data) => {
      const foundMember = data.find((member) =>
        findPokemonImage(member, slctedPokemon)
      );
      setModalContent(foundMember, team);
    });
}

function viewClickedPokemonTeam2(e) {
  let team = 2;
  e.stopPropagation();
  let slctedPokemon = e.target.src;
  const modal = document.getElementById("pkmModal");
  showModal();

  fetch("https://pokemon-team-builder-ycg5.onrender.com/Team2")
    .then((resp) => resp.json())
    .then((data) => {
      const foundMember = data.find((member) =>
        findPokemonImage(member, slctedPokemon)
      );
      setModalContent(foundMember, team);
    });
}

function findPokemonImage(member, slctedImage) {
  return member.image === slctedImage;
}

function displayLearnedMoves(pokemon) {
  const move1 = document.createElement("select");
  const move2 = document.createElement("select");
  const move3 = document.createElement("select");
  const move4 = document.createElement("select");

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
    .then((resp) => resp.json())
    .then((pkm) => {
      pkm.moves.forEach((move) => {
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
      });
    });

  const modalContent = document.querySelector(".modal-content").children[4];

  modalContent.appendChild(move1);
  modalContent.appendChild(move2);
  modalContent.appendChild(move3);
  modalContent.appendChild(move4);
}

function updateMovesTeam2(pkm) {
  const newMove1 = document.querySelectorAll("select")[5].value;
  const newMove2 = document.querySelectorAll("select")[6].value;
  const newMove3 = document.querySelectorAll("select")[7].value;
  const newMove4 = document.querySelectorAll("select")[8].value;

  pkm.move1 = newMove1;
  pkm.move2 = newMove2;
  pkm.move3 = newMove3;
  pkm.move4 = newMove4;

  fetch(`https://pokemon-team-builder-ycg5.onrender.com/Team2/${pkm.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(pkm),
  })
    .then((resp) => resp.json())
    .then((pokemon) => console.log(pokemon));

  window.alert(
    `${
      pkm.name.charAt(0).toUpperCase() + pkm.name.slice(1)
    }'s moves have been updated!`
  );
  showModal();
  removeModalContent();
}

function updateMovesTeam1(pkm) {
  const newMove1 = document.querySelectorAll("select")[5].value;
  const newMove2 = document.querySelectorAll("select")[6].value;
  const newMove3 = document.querySelectorAll("select")[7].value;
  const newMove4 = document.querySelectorAll("select")[8].value;

  pkm.move1 = newMove1;
  pkm.move2 = newMove2;
  pkm.move3 = newMove3;
  pkm.move4 = newMove4;

  fetch(`https://pokemon-team-builder-ycg5.onrender.com/Team1/${pkm.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(pkm),
  })
    .then((resp) => resp.json())
    .then((pokemon) => console.log(pokemon));

  window.alert(
    `${
      pkm.name.charAt(0).toUpperCase() + pkm.name.slice(1)
    }'s moves have been updated!`
  );
  showModal();
  removeModalContent();
}

function deletePokemonFromTeam1(pkm) {
  //should delete the pokemon on the webpage as well as on the backend
  //console.log(e.target.parentNode);
  membersToUpdate.push(pkm);

  const pkmToDelete = document.getElementById("team1").children;

  for (let images of pkmToDelete) {
    if (images.children[0].src === pkm.image) {
      images.remove();
    }
  }

  currTeam.forEach((member, index) => {
    if (member.name === pkm.name) {
      currTeam.splice(currTeam[index], 1);
    }
  });

  window.alert("Pokemon Deleted");
  window.alert(
    "Please add a new member(s) using the build team section until the team is full then click save to team 1 or 2"
  );
  showModal();
  removeModalContent();
  addToTeamOne = true;
  wasEdited = true;
}

function deletePokemonFromTeam2(pkm) {
  membersToUpdate.push(pkm);
  const pkmToDelete = document.getElementById("team2").children;

  for (let images of pkmToDelete) {
    if (images.children[0].src === pkm.image) {
      images.remove();
    }
  }

  currTeam.forEach((member, index) => {
    if (member.name === pkm.name) {
      currTeam.splice(currTeam[index], 1);
    }
  });

  window.alert("Pokemon Deleted");
  window.alert(
    "Please add a new member(s) using the build team section until the team is full then click save to team 1 or 2"
  );
  showModal();
  removeModalContent();

  wasEdited = true;
}

function checkIfMaxReached(arr) {
  let full;
  if (arr.length === 6) {
    full = true;
  } else {
    full = false;
  }

  return full;
}

function fetchPokemonNames() {
  let pokemonNames = [];
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151%27") //limit the search to 151 pokemon
    .then((resp) => resp.json())
    .then((mons) => {
      mons.results.forEach((pokemon) => {
        pokemonNames.push(pokemon.name);
      });
      addPokemonNamesToSelection(pokemonNames);
    });
}

//this function will take the array of pokemon names and append options in the select dropdown to the DOM
function addPokemonNamesToSelection(pkmArr) {
  const dropdown = document.getElementById("pokemon-list");

  pkmArr.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;

    dropdown.appendChild(option);
  });
}
