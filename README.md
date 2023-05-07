# Welcome to my Pokemon-Generation-1-Team-Builder App!
![Screenshot 2023-05-07 130237](https://user-images.githubusercontent.com/60550632/236700183-02655dae-7c25-46e8-aeb5-adb6a66a3c53.png)
# Description
This app allows the user to build a team of 6 Pokemon from the original 151 Pokemon present in Generation 1 using information pulled from PokeAPI (https://pokeapi.co/). Under the 'Build your team here section' of my app, you can select from a dropdown, a list of names of Pokemon and selecting a Pokemon will display information about it such as it's name, type, ability, and moves. The user is allowed to manually select moves that they would like their Pokemon to have, and pressing the add Pokemon to team button will display a preview of the unsaved team that the user currently has. Once you have built a team of 6, you can use the Save to Team 1 or Team 2 buttons to save your team to the backend to have your team persist. There are also show, edit, and clear Team 1 & Team 2 that will allow you to view your team, edit your team's Pokemon or moves, as well as clear the Team from the backend so you can save a new team. 

## Getting Started

### How to Use

In order to use this application, you'll need Git (https://git-scm.com/) and JSON server (https://www.npmjs.com/package/json-server) installed on your computer. 
Once you have installed these applications

Open up a command-line window and type the following:
```bash
# Clone this repository
$ git clone https://github.com/jmyli562/Pokemon-Generation-1-TeamBuilderApp.git

# Go into the repository
$ cd Pokemon-Generation-1-TeamBuilderApp

# Run JSON Server
$ json-server --watch json.db

# Open the webpage
$ explorer.exe index.html

# Or visit the site directly via the link
pokemon-gen1-team-builder-app.netlify.app
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
