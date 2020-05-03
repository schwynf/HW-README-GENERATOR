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
    // const queryUrl = `https://api.github.com/users/${data.username}/repos?per_page=100`;
    const queryUrl = `https://api.github.com/users/${data.username}/events/public`;
    console.log(queryUrl);
    console.log(data.username);
    console.log(data.repoTitle);
    axios.get(queryUrl).then((obj) => {
      // if user name is  not found
      if (obj.data[0].payload.action === "started") {
        console.log("Sorry I cant find your info using your Git Hub User Name");
        inquirer.prompt({
          message: "Enter your name",
          name: "username2"
        }).then(function(data){
          console.log(data.username2);
          header = "## Head" + "\n" + "\n" + data.username2;
          fs.writeFile("schwyn.md", header, function (error) {
            if (error) {
              return console.log(error);
            }
            console.log("perfect");
          });
        })
      } else {
        console.log("User name found in database");
        console.log(JSON.stringify(obj.data[0].payload.commits[0].author.email));
        console.log(obj.data[0].payload.commits[0].author.name);
        console.log(obj.data[0].actor.avatar_url);
        header = "# "+ data.repoTitle + "\n" + "\n";
        title(header);
        setTimeout(function(){
          summary("## Description " + "<span id=\"d\"></span> \n" + data.repoDescript+ "\n \n");
        },40);
        setTimeout(function(){
          links("## Table of Contents \n <ul><li><a href=\"#i\">Installation</a></li><li><a href=\"#u\">Usage</a></li><li><a href=\"#l\">License</a></li><li><a href=\"#c\">Contributing</a></li><li><a href=\"#t\">Tests</a></li></ul> \n \n");
        },50);
        setTimeout(function(){
          section1("## Author Info \n Email: "+ obj.data[0].payload.commits[0].author.email + "<br>" + "\n Name: " + obj.data[0].payload.commits[0].author.name + "<br>" + "\n Profile Picture: <br> ![]("+obj.data[0].actor.avatar_url + ") \n \n");
        },60);
        setTimeout(function(){
          license("## License " + "<span id=\"l\"></span> \n <br>"+ data.stack + " \n \n");
        },70);
      }
    }).catch((error) => {
      console.log(error)
    })
  });

  // title
  let title =  (header) => {
    fs.appendFile("schwyn.md", header, function (error) {
      if (error) {
        return console.log(error);
      }
      console.log("title works");
    });
  }
  // section1
  let section1 =  (e) => {
    fs.appendFile("schwyn.md", e, function (error) {
      if (error) {
        return console.log(error);
      }
      console.log("section1 works");
    });
  }
  // summary
  let summary =  (e) => {
    fs.appendFile("schwyn.md", e, function (error) {
      if (error) {
        return console.log(error);
      }
      console.log("summary works");
    });
  }
  // links
  let links =  (e) => {
    fs.appendFile("schwyn.md", e, function (error) {
      if (error) {
        return console.log(error);
      }
      console.log("summary works");
    });
  }

  let license =  (e) => {
    fs.appendFile("schwyn.md", e, function (error) {
      if (error) {
        return console.log(error);
      }
      console.log("summary works");
    });
  }



