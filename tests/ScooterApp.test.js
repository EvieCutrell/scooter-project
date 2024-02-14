const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')


// ScooterApp tests here

// register user
describe("registerUser method tests", () => {
  test("Should return instance of User", () => {
    const scooterApp = new ScooterApp();
    let response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    expect(response).toBeInstanceOf(User);
  })
    test("should return error of too young", () => {
      const scooterApp = new ScooterApp();
      expect(() => {
        scooterApp.registerUser("Joe Bloggs", "test123", 15)}).toThrow();
    });

    test("should return error if already registered", () => {
      const scooterApp = new ScooterApp();
      scooterApp.registerUser("Joe Bloggs", "test123", 21);
      expect(() => {
        scooterApp.registerUser("Joe Bloggs", "test123", 21)}).toThrow();
 
      });
  });
 
  // log in  
  
  describe("login method tests", () => {
    test("user should be logged in if username and password are correct", () => {
      const scooterApp = new ScooterApp();
      scooterApp.registerUser("Joe Bloggs", "test123", 21);
      const username = scooterApp.registeredUsers["Joe Bloggs"].username;
      const password = scooterApp.registeredUsers["Joe Bloggs"].password;
      scooterApp.loginUser(username, password);
      expect(scooterApp.registeredUsers["Joe Bloggs"].loggedIn).toBe(true);
  }) 

    test("loginUser should throw an error if password is wrong", () => {
      const scooterApp = new ScooterApp();
      scooterApp.registerUser("Joe Bloggs", "test123", 21);
      const username = scooterApp.registeredUsers["Joe Bloggs"].username;
      const password = "wr0ng";
      expect(() => scooterApp.loginUser(username, password)).toThrow();
    })

     test("loginUser should throw an error if username is not found", () => {
      const scooterApp = new ScooterApp();
      scooterApp.registerUser("Joe Bloggs", "test123", 21);
      const username = "Billy Floggs";
      const password = scooterApp.registeredUsers["Joe Bloggs"].password;
      expect(() => scooterApp.loginUser(username, password)).toThrow();
    })
});

// log out
describe("logout method tests", () => {
  test("logoutUser should logout the user", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registerUser("Joe Bloggs", "test123", 21);
    const username = scooterApp.registeredUsers["Joe Bloggs"].username;
    const password = scooterApp.registeredUsers["Joe Bloggs"].password;
    scooterApp.loginUser(username, password);
    scooterApp.logoutUser(username);
    expect(scooterApp.registeredUsers["Joe Bloggs"].loggedIn === false);
  })

  test("logoutUser should throw is user isn't found", () => {
    const scooterApp = new ScooterApp();
    scooterApp.registerUser("Joe Bloggs", "test123", 21);
    const username = scooterApp.registeredUsers["Joe Bloggs"].username;
    const password = scooterApp.registeredUsers["Joe Bloggs"].password;
    scooterApp.loginUser(username, password);
  
    expect(() => {
      scooterApp.logoutUser("Billy Floggs")
    }).toThrow();
  })
});

//create scooter
describe("createScooter tests", () => {
  test("createScooter should return a scooter object", () => {
    const scooterApp = new ScooterApp();
    const newScooter = scooterApp.createScooter("sodo");
    expect(newScooter).toBeInstanceOf(Scooter);
  })

  test("createScooter should throw error if station doesn't exist", () => {
    const scooterApp = new ScooterApp();
    expect(() => {
      scooterApp.createScooter("southhill")
    }).toThrow();
  })
});

// rent scooter
describe("rentScooter tests", () => {
  test("rentScooter should update the instance of scooter with the username", () => {
    const scooterApp = new ScooterApp();
    const newUser = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    scooterApp.loginUser("Joe Bloggs", "test123");
    const newScooter = scooterApp.createScooter("sodo");
    scooterApp.rentScooter(newScooter, newUser);
    expect(newScooter.user).toEqual("Joe Bloggs");
  })
  test("rentScooter should throw an error if the scooter is already assigned", () => {
    const scooterApp = new ScooterApp();
    const newUser = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    const newUser2 = scooterApp.registerUser("Billy Floggs", "test123", 21);
    scooterApp.loginUser("Joe Bloggs", "test123");
    scooterApp.loginUser("Billy Floggs", "test123");
    const newScooter = scooterApp.createScooter("sodo");
    scooterApp.rentScooter(newScooter, newUser);
    expect(() => {
      scooterApp.rentScooter(newScooter, newUser2)
    }).toThrow();
  })
});

// dock scooter
describe("dockScooter method tests", () => {
  test("dockScooter method should change instance of scooter to null user and update station", () => {
    const scooterApp = new ScooterApp();
    const newUser = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    scooterApp.loginUser("Joe Bloggs", "test123");
    const newScooter = scooterApp.createScooter("sodo");
    scooterApp.rentScooter(newScooter, newUser);
    scooterApp.dockScooter(newScooter, "southLakeUnion");
    expect(newScooter.station).toEqual("southLakeUnion");
  })

  test("dockScooter should throw an error if given invalid station", () => {
    const scooterApp = new ScooterApp();
    const newUser = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    scooterApp.loginUser("Joe Bloggs", "test123");
    const newScooter = scooterApp.createScooter("sodo");
    scooterApp.rentScooter(newScooter, newUser);
    expect(() => {
      scooterApp.dockScooter(newScooter, "ballard")
  }).toThrow();
  })

  test("dockScooter should throw an error if scooter is already docked there", () => {
    const scooterApp = new ScooterApp();
    const newUser = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    scooterApp.loginUser("Joe Bloggs", "test123");
    const newScooter = scooterApp.createScooter("sodo");
    expect(() => {
      scooterApp.dockScooter(newScooter, "sodo")
    }).toThrow();
  })
})

//print function
describe("print method test", () => {
  test("method should exist and return null, for testing", () => {
  const scooterApp = new ScooterApp();
  const response = scooterApp.print();
  expect(response).toBe(null);
  })
});