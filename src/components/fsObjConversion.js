/*
file created in components folder so can be used by TripForm.js and uploadPhotos.js
*/

// create a trip class to store custom object in firestore
export default class Trip {
  constructor(country, startDate, endDate) {
    this.country = country;
    this.startDate = startDate;
    this.endDate = endDate;
  }
  // will transform data to an object for adding to array
  // and in mapping to trip list
  toObject() {
    return {
      country: this.country,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }
}
export class Setting {
  constructor(fullname, birthday, gender) {
    this.fullname = fullname;
    this.birthday = birthday;
    this.gender = gender;
    //this.email = email;
  }
  // will transform data to an object for adding to array
  // and in mapping to trip list
  toObject() {
    return {
      fullname: this.fullname,
      birthday: this.birthday,
      gender: this.gender,
      //email: this.email
    };
  }
}

// implenting firestore documentation code here for the
// transfer of custom objects
export const tripConverter = {
  toFirestore: function (trip) {
    return {
      country: trip.country,
      startDate: trip.startDate,
      endDate: trip.endDate,
    };
  },
  fromFirestore: function (snapshot, options) {
    const trip = snapshot.data(options);
    return new Trip(trip.country, trip.startDate, trip.endDate);
  },
};
export const settingsConverter = {
  toFirestore: function (setting) {
    return {
      fullname: setting.fullname,
      birthday: setting.birthday,
      gender: setting.gender,
      //email: setting.email
    };
  },
  fromFirestore: function (snapshot, options) {
    const setting = snapshot.data(options);
    return new Setting(setting.fullname, setting.birthday, setting.gender);
  },
};