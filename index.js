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
      if (obj.data[3] === undefined) {
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
        console.log(JSON.stringify(obj.data[2].payload.commits[0].author.email));
        console.log(obj.data[2].payload.commits[0].author.name);
        console.log(obj.data[0].actor.avatar_url);
        header = "## "+ data.repoTitle + "\n" + "\n";
        title(header);
        setTimeout(function(){
          section1("# Author info \n Email: "+ obj.data[2].payload.commits[0].author.email + "\n Name: " + obj.data[2].payload.commits[0].author.name + "\n Profile Picture: "+ obj.data[0].actor.avatar_url + "\n \n");
        },50);
        setTimeout(function(){
          summary("# Description \n" + data.repoDescript);
        },60);
      }
    }).catch((error) => {
      console.log(error)
    })
  });
  let title =  (header) => {
    fs.appendFile("schwyn.md", header, function (error) {
      if (error) {
        return console.log(error);
      }
      console.log("title works");
    });
  }
  let section1 =  (e) => {
    fs.appendFile("schwyn.md", e, function (error) {
      if (error) {
        return console.log(error);
      }
      console.log("section1 works");
    });
  }
  let summary =  (e) => {
    fs.appendFile("schwyn.md", e, function (error) {
      if (error) {
        return console.log(error);
      }
      console.log("summary works");
    });
  }


