const Scooter = require('../src/Scooter')
const User = require('../src/User')

const user = new User("Joe Bloggs", "test123", 21);



//typeof scooter === object
describe('scooter object', () => {
  test('Scooter class should create Scooter instance', () => {
    const scooter = new Scooter();
    expect(scooter).toBeInstanceOf(Scooter);
  });
})

//Method tests
describe('scooter methods', () => {
  // tests here!

  //rent method
  test("Rent method should change Scooter's user and station", () => {
    const scooter = new Scooter(user);
    scooter.rent(user);
    expect(scooter.user).toEqual("Joe Bloggs");
    expect(scooter.station).toBe(null);
  })

  test("rent method should throw exception if scooter is broken or not charged enough", () => {
    const scooter = new Scooter(user);
    scooter.isBroken = true;
    expect(() => {
      scooter.rent()}).toThrow();
  })

 
  //dock method
  test("dock method should change Scooter's user to null and station to docked station", () => {
    const scooter = new Scooter(user);
    scooter.dock("sodo");
    expect(scooter.station).toEqual("sodo");
    expect(scooter.user).toBe(null);
  })

  //requestRepair method

  //charge method

})
