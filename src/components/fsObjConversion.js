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
