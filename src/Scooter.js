const User = require('./User');

class Scooter{
  // scooter code here
  static nextSerial = 1;

  constructor(station){
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial;
    this.charge = 100;
    this.isBroken = false;
    Scooter.nextSerial++;
  }

  rent(renter){
    if(this.charge <= 20 || this.isBroken === true)
      throw new Error("scooter needs to charge or needs repairr")
    else {
      this.user = renter.username;
      this.station = null;
    }
  }

  dock(station){
    this.station = station;
    this.user = null;
  }
};


module.exports = Scooter
