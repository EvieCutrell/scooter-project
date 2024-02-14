const User = require('./User')
const Scooter = require('./Scooter')


class ScooterApp {
  // ScooterApp code here


  constructor(){
    this.stations = {
    'sodo': [],
    'southLakeUnion': [],
    'greenwood': []
    };
    this.registeredUsers = {};
  }

  registerUser(newUsername, password, age) {
    //if key 'newUsername' exists, throw error
    if (this.registeredUsers[newUsername])
      throw new Error("already registered");
    else if (age < 18)
    {
      throw new Error("too young to register");
    }
    else 
      {
        const newUser = new User(newUsername, password, age);
        this.registeredUsers[newUsername] = newUser;
        console.log("user has been registered");
        console.log(this.registeredUsers);
        return newUser;
      }
  }

  loginUser(username, password) {
    if (this.registeredUsers[username])
    {
      this.registeredUsers[username].login(password);
      
      if(this.registeredUsers[username].loggedIn)
        console.log("the user have been logged in");
      else
        throw new Error("Username or password is incorrect");
    }
    else
     throw new Error("Username or password is incorrect");
  }

  logoutUser(username) {
    if(this.registeredUsers[username])
    {
      this.registeredUsers[username].logout;
      console.log("user is logged out");
    }
    else
      throw new Error("no such user is logged in");
  }

  createScooter(station) {
    if(!this.stations[station])
      throw new Error("no such station error");
    else {
      const newScooter = new Scooter(station);
      this.stations[station].push(newScooter);
      console.log("created new scooter");
      return newScooter;
    }
  }

  
  rentScooter(scooter, user){
    if(!(scooter.user === null))
      throw new Error ("scooter already rented")
    else
    {
      const currStation = scooter.station;
      scooter.rent(user);
      this.stations[currStation].shift();
      console.log("scooter is rented");
    }
  } 

  
  dockScooter(scooter, station){
    if(!this.stations[station])
      throw new Error("no such station");
    else if(scooter.station == station)
      throw new Error ("scooter already at station");
    else
      {
        scooter.dock(station);
        this.stations[station].push(scooter);
        console.log("scooter is docked");
      }
  }

  print(){
    console.log(`List of registered user: \n${Object.keys(this.registeredUsers)}`);
    console.log(`Stations: ${Object.keys(this.stations)}`)
    console.log(`Scooters at station sodo: ${Object.keys(this.stations["sodo"])}`);
    console.log(`Scooters at station southLakeUnion: ${Object.keys(this.stations["southLakeUnion"])}`);
    console.log(`Scooters at station greenwood: ${Object.keys(this.stations["greenwood"])}`);
    return null;
  }
};
/*
const scooterApp = new ScooterApp();
scooterApp.print();
const newUser = scooterApp.registerUser("Joe Bloggs", "test123", 21);
const newScooter = scooterApp.createScooter("sodo");
const newScooter2 = scooterApp.createScooter("southLakeUnion");
const newScooter3 = scooterApp.createScooter("greenwood");
const newScooter4 = scooterApp.createScooter("sodo");
console.log(Object.values(scooterApp.stations["sodo"]));
scooterApp.rentScooter(newScooter, newUser);
scooterApp.dockScooter(newScooter, "greenwood");
scooterApp.print();
*/

module.exports = ScooterApp
