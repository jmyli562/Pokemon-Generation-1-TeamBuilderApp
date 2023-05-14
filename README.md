# Welcome to my Pokemon-Generation-1-Team-Builder App!
![Screenshot 2023-05-07 130237](https://github.com/jmyli562/Pokemon-Generation-1-TeamBuilderApp/assets/60550632/941776ba-93ff-4d29-ab74-34724f28924f)

# Table of Contents  
1. [Description](#description)  
2. [Installation](#installation) 
3. [Instructions for Use](#instructions)
4. [Demo Video](#video)
5. [Links to files used in project](#links)
6. [Contributing to my project](#contributing)
7. [License](#license)


# Description <a name = "description"></a>
This app allows the user to build a team of 6 Pokemon from the original 151 Pokemon present in Generation 1 using information pulled from PokeAPI (https://pokeapi.co/). My app currently supports saving up to 2 teams as well as the ability to edit, update, and remove team members as well as their moves. In future iterations of my app I plan to add support for saving more than 2 teams, as well as expanding the amount of Pokemon that the user can choose from to include Generation 2 Pokemon.

## Getting Started

### Installation Guide <a name = "installation"></a>

There is currently no need to install Git and JSON server as I have deployed my website. Just click on the following link: https://pokemon-gen1-team-builder-app.netlify.app/

If the website is down though please do continue to follow the instructions below.

In order to use this application, you'll need Git (https://git-scm.com/) and JSON server (https://www.npmjs.com/package/json-server) installed on your computer. 
Once you have installed these applications

Open up a command-line window and type the following:
```bash
# Clone this repository
$ git clone https://github.com/jmyli562/Pokemon-Generation-1-TeamBuilderApp.git

# Go into the repository
$ cd Pokemon-Generation-1-TeamBuilderApp

# Run JSON Server
$ json-server --watch db.json

# Open the webpage
$ explorer.exe index.html
```
## Quick Use Guide <a name = "instructions"></a>
Under the 'Build your team here section' of my app, you can select from a dropdown, a list of names of Pokemon and selecting a Pokemon will display information about it such as it's name, type, ability, and moves. The user is allowed to manually select moves that they would like their Pokemon to have, and pressing the add Pokemon to team button will display a preview of the unsaved team that the user currently has. Once you have built a team of 6, you can use the Save to Team 1 or Team 2 buttons to save your team to the backend to have your team persist. To view your saved team, click on Edit Team 1 or Team Team 2 depending on which slot you saved your team to, and you should see a preview of the team you just saved as well as a table showing the types your team is resistant or weak too for each member. If you want to edit your team, simply click on member you want to edit and a pop-up box should appear giving you the option to either edit the current moves of the Pokemon or delete the Pokemon from the team. To edit the moves of your Pokemon first click the "Choose new moves button" and a new dropdown should appear allowing you to select new moves for that member. Once you have selected your moves, click the the "Update Moves" button to save the new moves. If you want to delete a team member, click on the member you would like to delete and click "Delete Pokemon". Once the pokemon has been deleted, you can add a new member using the 'Build your team here section' and save that new member to the team by clicking on the save to team buton.

## Demo Video <a name = "video"></a>

https://github.com/jmyli562/Pokemon-Generation-1-TeamBuilderApp/assets/60550632/7128f5d6-4f57-4c36-927e-934f1fdf8e10

## Links to Resources used in Project <a name = "links"></a>
The following are links to resources and images used in this project:

* Pokemon Font taken from: https://www.cdnfonts.com/pokemon-solid.font
* Poke-ball image: https://wallpaperaccess.com/full/45635.jpg
* API Used: https://pokeapi.co/
* How to build a modal box: https://www.w3schools.com/howto/howto_css_modals.asp

## Contributing <a name = "contributing"></a>

Pull requests are welcome. If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
1) Fork the Project
2) Create your Feature Branch (git checkout -b feature/NewFeature)
3) Commit your Changes (git commit -m 'Add some NewFeature')
4) Push to the Branch (git push origin feature/NewFeature)
5) Open a Pull Request

For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License <a name = "license"></a>

[MIT](https://choosealicense.com/licenses/mit/)
