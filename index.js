const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

// blank file
let header = "";
fs.writeFile("schwyn.md", header, function (error) {
  if (error) {
    return console.log(error);
  }
});

inquirer
  .prompt([{
    message: "Enter your GitHub username",
    name: "username"
  }, {
    message: "Repo Title",
    name: "repoTitle"
  },
  {
    message: "Description of Repo",
    name: "repoDescript"
  },
  {
    message: "Usage",
    name: "use"
  },
  {
    message: "Installation",
    name: "install"
  },
  {
    message: "Contributers?",
    name: "contributer"
  },
  {
    message: "Test?",
    name: "test"
  },
  {
    type: "checkbox",
    message: "What kind of License should your project have?",
    name: "stack",
    choices: [
      "MIT",
      "Apache 2.0",
      "GPL 3.0",
      "BSD 3.0",
      "None"
    ]
  }
  ])
  .then(function (data) {
    const queryUrl = `https://api.github.com/users/${data.username}/events/public`;
    // console.log(queryUrl);
    // console.log(data.username);
    // console.log(data.repoTitle);
    axios.get(queryUrl).then((obj) => {
      let email;
      let username2;
      // if user name is  not found
      if (obj.data[0].payload.action === "started") {
        console.log("Sorry I can't find your name and email using your Git Hub User Name");
        inquirer.prompt([{
          message: "Full Name?",
          name: "username2"
        }, {
          message: "email?",
          name: "email"
        }]).then((data2) => {
          username2 = data2.username2;
          email = data2.email;
          start();
        })
      } else {
        start();
      }
      // console.log("User name found in database");
      // console.log(JSON.stringify(obj.data[0].payload.commits[0].author.email));
      // console.log(obj.data[0].payload.commits[0].author.name);
      // console.log(obj.data[0].actor.avatar_url);
      function start() {
        header = "# " + data.repoTitle + "\n" + "\n";
        title(header);
        setTimeout(() => {
          title("## Description " + "<span id=\"d\"></span> \n" + data.repoDescript + "\n \n");
        }, 40);
        setTimeout(() => {
          title("## Table of Contents \n <ul><li><a href=\"#i\">Installation</a></li><li><a href=\"#u\">Usage</a></li><li><a href=\"#l\">License</a></li><li><a href=\"#c\">Contributing</a></li><li><a href=\"#t\">Tests</a></li></ul> \n \n");
        }, 50);
        setTimeout(() => {
          title("## Installation " + "<span id=\"i\"></span> \n" + data.install + " \n \n");
        }, 60);
        setTimeout(() => {
          title("## Usage " + "<span id=\"u\"></span> \n" + data.use + " \n \n");
        }, 70);
        setTimeout(() => {
          title("## License " + "<span id=\"l\"></span> \n" + data.stack + " \n \n");
        }, 80);
        setTimeout(() => {
          title("## Contributing " + "<span id=\"c\"></span> \n" + data.contributer + " \n \n");
        }, 90);
        setTimeout(() => {
          title("## Tests " + "<span id=\"t\"></span> \n" + data.test + " \n \n");
        }, 100);
        if (obj.data[0].payload.action === "started") {
          setTimeout(() => {
            title("## Author Info \n Email: " + email + "<br>" + "\n Name: " + username2 + "<br>" + "\n Profile Picture: <br> ![](" + obj.data[0].actor.avatar_url + ") \n \n");
          }, 110);
        } else {
          setTimeout(() => {
            title("## Author Info \n Email: " + obj.data[0].payload.commits[0].author.email + "<br>" + "\n Name: " + obj.data[0].payload.commits[0].author.name + "<br>" + "\n Profile Picture: <br> ![](" + obj.data[0].actor.avatar_url + ") \n \n");
          }, 110);
        }
      };

    }).catch((error) => {
      console.log(error)
    })
  });

// title
let a= 0;
let title = (header) => {
  fs.appendFile("schwyn.md", header, function (error) {
    if (error) {
      return console.log(error);
    }
    if(a === 0){
      console.log("READ.ME FILE HAS BEEN SUCCESSFULLY GENERATED!");
      a++;
    }
  });
}



