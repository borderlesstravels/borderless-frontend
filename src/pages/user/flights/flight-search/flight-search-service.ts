
  export const getFlightToAndFrom = (flight: any) => {
    let from = flight.outbound[0]?.airport_from_details?.city || flight.outbound[0]?.airport_from
    let to = flight.outbound[flight.outbound.length - 1]?.airport_to_details?.city || flight.outbound[flight.outbound.length - 1]?.airport_to
    return {from, to}
  }
  
  export const formatTime = (time: string) => {
    // console.log({firstTime: time});
    // return '';
    if(!time || typeof(time) !== 'string') {
      return '';
    }
    console.log({time})
    const timeArray = time.includes('T') ? time?.split('T')[1]?.split(':') : time?.split(' ')[1]?.split(':');
    const section = parseFloat(timeArray[0]) > 11 ? 'pm' : 'am'
    let hour = parseFloat(timeArray[0]) > 12 ? (parseFloat(timeArray[0]) - 12) : parseFloat(timeArray[0]) === 0 ? 12 : timeArray[0]
    return `${hour} : ${timeArray[1]} ${section}`;
  }

  export const calculateMinors = (fData: any, digit = false) => {
    let count = 0;
    count +=  (fData?.toddlersInOwnSeatUnder2Count || 0)
    + (fData?.infantsOnLapUnder2Count || 0)
    + (fData?.children2_11Count || 0)
    let result = digit ? count : count + '';
    return result;
  }

  export const processPassengerPriceList = (price: any) => {
    const prices = [];
    for(const item in price) {
      if(item && price[item]) {
        prices.push({key: item, value: price[item]});
      }
    }
    return prices;
  }


export const sampleFlights = [
    {
        "id": "ama_d914d415-ea5f-4de8-ae05-4629172eca3e",
        "fare_basis": "QA0WAAFA",
        "amount": 1572382,
        "travelers_price": [
            {
                "adult": 1572382
            }
        ],
        "price_summary": [
            {
                "passenger_type": "adult",
                "total_price": 1572382,
                "quantity": 1
            }
        ],
        "currency": "NGN",
        "total_duration": 1530,
        "outbound": [
            {
                "flight_number": "554",
                "layover": 270,
                "airport_to": "CMN",
                "airport_from": "LOS",
                "booking_class": "Q",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-06-30T11:25:00",
                "refundable": true,
                "equipment_type": "73H",
                "marketing_airline": "AT",
                "duration": 275,
                "departure_time": "2024-06-30T06:50:00",
                "overnight": true,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/AT.png",
                    "name": "Royal Air Maroc",
                    "code": "AT"
                },
                "airport_to_details": {
                    "name": "Mohammed V International",
                    "city": "Casablanca",
                    "city_code": "CAS",
                    "iata_code": "CMN",
                    "country": "Morocco",
                    "country_code": "MA"
                },
                "operating_airline": "AT",
                "airport_from_details": {
                    "name": "Murtala Muhammed International",
                    "city": "Lagos",
                    "city_code": "LOS",
                    "iata_code": "LOS",
                    "country": "Nigeria",
                    "country_code": "NG"
                },
                "fare_rules": []
            },
            {
                "flight_number": "200",
                "layover": 135,
                "airport_to": "JFK",
                "airport_from": "CMN",
                "booking_class": "Q",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-06-30T18:45:00",
                "refundable": true,
                "equipment_type": "788",
                "marketing_airline": "AT",
                "duration": 470,
                "departure_time": "2024-06-30T15:55:00",
                "overnight": false,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/AT.png",
                    "name": "Royal Air Maroc",
                    "code": "AT"
                },
                "airport_to_details": {
                    "name": "John F. Kennedy International",
                    "city": "New York",
                    "city_code": "NYC",
                    "iata_code": "JFK",
                    "country": "United States",
                    "country_code": "US"
                },
                "operating_airline": "AT",
                "airport_from_details": {
                    "name": "Mohammed V International",
                    "city": "Casablanca",
                    "city_code": "CAS",
                    "iata_code": "CMN",
                    "country": "Morocco",
                    "country_code": "MA"
                },
                "fare_rules": []
            },
            {
                "flight_number": "5007",
                "layover": null,
                "airport_to": "LAX",
                "airport_from": "JFK",
                "booking_class": "Q",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-07-01T00:20:00",
                "refundable": true,
                "equipment_type": "32B",
                "marketing_airline": "AT",
                "duration": 380,
                "departure_time": "2024-06-30T21:00:00",
                "overnight": false,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/AT.png",
                    "name": "Royal Air Maroc",
                    "code": "AT"
                },
                "airport_to_details": {
                    "name": "Los Angeles International",
                    "city": "Los Angeles",
                    "city_code": "LAX",
                    "iata_code": "LAX",
                    "country": "United States",
                    "country_code": "US"
                },
                "operating_airline": "AA",
                "airport_from_details": {
                    "name": "John F. Kennedy International",
                    "city": "New York",
                    "city_code": "NYC",
                    "iata_code": "JFK",
                    "country": "United States",
                    "country_code": "US"
                },
                "fare_rules": []
            }
        ],
        "inbound": [],
        "total_outbound_duration": 1530,
        "total_inbound_duration": 0,
        "outbound_stops": 2,
        "inbound_stops": 0,
        "pricing": {
            "markup": {
                "markup_type": "percentage",
                "markup_value": 0
            },
            "payable": 1572382
        }
    },
    {
        "id": "ama_2d4c7a6c-9cc2-4df0-8d09-1fd342889c4d",
        "fare_basis": "QA0WAAFA",
        "amount": 1572382,
        "travelers_price": [
            {
                "adult": 1572382
            }
        ],
        "price_summary": [
            {
                "passenger_type": "adult",
                "total_price": 1572382,
                "quantity": 1
            }
        ],
        "currency": "NGN",
        "total_duration": 1559,
        "outbound": [
            {
                "flight_number": "554",
                "layover": 270,
                "airport_to": "CMN",
                "airport_from": "LOS",
                "booking_class": "Q",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-06-30T11:25:00",
                "refundable": true,
                "equipment_type": "73H",
                "marketing_airline": "AT",
                "duration": 275,
                "departure_time": "2024-06-30T06:50:00",
                "overnight": true,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/AT.png",
                    "name": "Royal Air Maroc",
                    "code": "AT"
                },
                "airport_to_details": {
                    "name": "Mohammed V International",
                    "city": "Casablanca",
                    "city_code": "CAS",
                    "iata_code": "CMN",
                    "country": "Morocco",
                    "country_code": "MA"
                },
                "operating_airline": "AT",
                "airport_from_details": {
                    "name": "Murtala Muhammed International",
                    "city": "Lagos",
                    "city_code": "LOS",
                    "iata_code": "LOS",
                    "country": "Nigeria",
                    "country_code": "NG"
                },
                "fare_rules": []
            },
            {
                "flight_number": "200",
                "layover": 175,
                "airport_to": "JFK",
                "airport_from": "CMN",
                "booking_class": "Q",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-06-30T18:45:00",
                "refundable": true,
                "equipment_type": "788",
                "marketing_airline": "AT",
                "duration": 470,
                "departure_time": "2024-06-30T15:55:00",
                "overnight": false,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/AT.png",
                    "name": "Royal Air Maroc",
                    "code": "AT"
                },
                "airport_to_details": {
                    "name": "John F. Kennedy International",
                    "city": "New York",
                    "city_code": "NYC",
                    "iata_code": "JFK",
                    "country": "United States",
                    "country_code": "US"
                },
                "operating_airline": "AT",
                "airport_from_details": {
                    "name": "Mohammed V International",
                    "city": "Casablanca",
                    "city_code": "CAS",
                    "iata_code": "CMN",
                    "country": "Morocco",
                    "country_code": "MA"
                },
                "fare_rules": []
            },
            {
                "flight_number": "9534",
                "layover": null,
                "airport_to": "LAX",
                "airport_from": "JFK",
                "booking_class": "Q",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-07-01T00:49:00",
                "refundable": true,
                "equipment_type": "32S",
                "marketing_airline": "AT",
                "duration": 369,
                "departure_time": "2024-06-30T21:40:00",
                "overnight": true,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/AT.png",
                    "name": "Royal Air Maroc",
                    "code": "AT"
                },
                "airport_to_details": {
                    "name": "Los Angeles International",
                    "city": "Los Angeles",
                    "city_code": "LAX",
                    "iata_code": "LAX",
                    "country": "United States",
                    "country_code": "US"
                },
                "operating_airline": "B6",
                "airport_from_details": {
                    "name": "John F. Kennedy International",
                    "city": "New York",
                    "city_code": "NYC",
                    "iata_code": "JFK",
                    "country": "United States",
                    "country_code": "US"
                },
                "fare_rules": []
            }
        ],
        "inbound": [],
        "total_outbound_duration": 1559,
        "total_inbound_duration": 0,
        "outbound_stops": 2,
        "inbound_stops": 0,
        "pricing": {
            "markup": {
                "markup_type": "percentage",
                "markup_value": 0
            },
            "payable": 1572382
        }
    },
    {
        "id": "ama_2c3371af-89b9-4bbb-9e77-65fbb4b9e752",
        "fare_basis": "QA0WAAFA",
        "amount": 1572382,
        "travelers_price": [
            {
                "adult": 1572382
            }
        ],
        "price_summary": [
            {
                "passenger_type": "adult",
                "total_price": 1572382,
                "quantity": 1
            }
        ],
        "currency": "NGN",
        "total_duration": 2049,
        "outbound": [
            {
                "flight_number": "554",
                "layover": 270,
                "airport_to": "CMN",
                "airport_from": "LOS",
                "booking_class": "Q",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-06-30T11:25:00",
                "refundable": true,
                "equipment_type": "73H",
                "marketing_airline": "AT",
                "duration": 275,
                "departure_time": "2024-06-30T06:50:00",
                "overnight": true,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/AT.png",
                    "name": "Royal Air Maroc",
                    "code": "AT"
                },
                "airport_to_details": {
                    "name": "Mohammed V International",
                    "city": "Casablanca",
                    "city_code": "CAS",
                    "iata_code": "CMN",
                    "country": "Morocco",
                    "country_code": "MA"
                },
                "operating_airline": "AT",
                "airport_from_details": {
                    "name": "Murtala Muhammed International",
                    "city": "Lagos",
                    "city_code": "LOS",
                    "iata_code": "LOS",
                    "country": "Nigeria",
                    "country_code": "NG"
                },
                "fare_rules": []
            },
            {
                "flight_number": "200",
                "layover": 675,
                "airport_to": "JFK",
                "airport_from": "CMN",
                "booking_class": "Q",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-06-30T18:45:00",
                "refundable": true,
                "equipment_type": "788",
                "marketing_airline": "AT",
                "duration": 470,
                "departure_time": "2024-06-30T15:55:00",
                "overnight": false,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/AT.png",
                    "name": "Royal Air Maroc",
                    "code": "AT"
                },
                "airport_to_details": {
                    "name": "John F. Kennedy International",
                    "city": "New York",
                    "city_code": "NYC",
                    "iata_code": "JFK",
                    "country": "United States",
                    "country_code": "US"
                },
                "operating_airline": "AT",
                "airport_from_details": {
                    "name": "Mohammed V International",
                    "city": "Casablanca",
                    "city_code": "CAS",
                    "iata_code": "CMN",
                    "country": "Morocco",
                    "country_code": "MA"
                },
                "fare_rules": []
            },
            {
                "flight_number": "5049",
                "layover": null,
                "airport_to": "LAX",
                "airport_from": "JFK",
                "booking_class": "Q",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-07-01T08:59:00",
                "refundable": true,
                "equipment_type": "32B",
                "marketing_airline": "AT",
                "duration": 359,
                "departure_time": "2024-07-01T06:00:00",
                "overnight": true,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/AT.png",
                    "name": "Royal Air Maroc",
                    "code": "AT"
                },
                "airport_to_details": {
                    "name": "Los Angeles International",
                    "city": "Los Angeles",
                    "city_code": "LAX",
                    "iata_code": "LAX",
                    "country": "United States",
                    "country_code": "US"
                },
                "operating_airline": "AA",
                "airport_from_details": {
                    "name": "John F. Kennedy International",
                    "city": "New York",
                    "city_code": "NYC",
                    "iata_code": "JFK",
                    "country": "United States",
                    "country_code": "US"
                },
                "fare_rules": []
            }
        ],
        "inbound": [],
        "total_outbound_duration": 2049,
        "total_inbound_duration": 0,
        "outbound_stops": 2,
        "inbound_stops": 0,
        "pricing": {
            "markup": {
                "markup_type": "percentage",
                "markup_value": 0
            },
            "payable": 1572382
        }
    },
    {
        "id": "ama_7a08f361-2b71-4aac-9cd6-a2bda4fe2945",
        "fare_basis": "QA0WAAFA",
        "amount": 1572382,
        "travelers_price": [
            {
                "adult": 1572382
            }
        ],
        "price_summary": [
            {
                "passenger_type": "adult",
                "total_price": 1572382,
                "quantity": 1
            }
        ],
        "currency": "NGN",
        "total_duration": 2108,
        "outbound": [
            {
                "flight_number": "554",
                "layover": 270,
                "airport_to": "CMN",
                "airport_from": "LOS",
                "booking_class": "Q",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-06-30T11:25:00",
                "refundable": true,
                "equipment_type": "73H",
                "marketing_airline": "AT",
                "duration": 275,
                "departure_time": "2024-06-30T06:50:00",
                "overnight": true,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/AT.png",
                    "name": "Royal Air Maroc",
                    "code": "AT"
                },
                "airport_to_details": {
                    "name": "Mohammed V International",
                    "city": "Casablanca",
                    "city_code": "CAS",
                    "iata_code": "CMN",
                    "country": "Morocco",
                    "country_code": "MA"
                },
                "operating_airline": "AT",
                "airport_from_details": {
                    "name": "Murtala Muhammed International",
                    "city": "Lagos",
                    "city_code": "LOS",
                    "iata_code": "LOS",
                    "country": "Nigeria",
                    "country_code": "NG"
                },
                "fare_rules": []
            },
            {
                "flight_number": "200",
                "layover": 734,
                "airport_to": "JFK",
                "airport_from": "CMN",
                "booking_class": "Q",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-06-30T18:45:00",
                "refundable": true,
                "equipment_type": "788",
                "marketing_airline": "AT",
                "duration": 470,
                "departure_time": "2024-06-30T15:55:00",
                "overnight": false,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/AT.png",
                    "name": "Royal Air Maroc",
                    "code": "AT"
                },
                "airport_to_details": {
                    "name": "John F. Kennedy International",
                    "city": "New York",
                    "city_code": "NYC",
                    "iata_code": "JFK",
                    "country": "United States",
                    "country_code": "US"
                },
                "operating_airline": "AT",
                "airport_from_details": {
                    "name": "Mohammed V International",
                    "city": "Casablanca",
                    "city_code": "CAS",
                    "iata_code": "CMN",
                    "country": "Morocco",
                    "country_code": "MA"
                },
                "fare_rules": []
            },
            {
                "flight_number": "5039",
                "layover": null,
                "airport_to": "LAX",
                "airport_from": "JFK",
                "booking_class": "Q",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-07-01T09:58:00",
                "refundable": true,
                "equipment_type": "32B",
                "marketing_airline": "AT",
                "duration": 359,
                "departure_time": "2024-07-01T06:59:00",
                "overnight": true,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/AT.png",
                    "name": "Royal Air Maroc",
                    "code": "AT"
                },
                "airport_to_details": {
                    "name": "Los Angeles International",
                    "city": "Los Angeles",
                    "city_code": "LAX",
                    "iata_code": "LAX",
                    "country": "United States",
                    "country_code": "US"
                },
                "operating_airline": "AA",
                "airport_from_details": {
                    "name": "John F. Kennedy International",
                    "city": "New York",
                    "city_code": "NYC",
                    "iata_code": "JFK",
                    "country": "United States",
                    "country_code": "US"
                },
                "fare_rules": []
            }
        ],
        "inbound": [],
        "total_outbound_duration": 2108,
        "total_inbound_duration": 0,
        "outbound_stops": 2,
        "inbound_stops": 0,
        "pricing": {
            "markup": {
                "markup_type": "percentage",
                "markup_value": 0
            },
            "payable": 1572382
        }
    },
    {
        "id": "ama_ac60177e-0f53-447d-8504-5f4c5aea6701",
        "fare_basis": "QLB4XPOW",
        "amount": 1641193.6,
        "travelers_price": [
            {
                "adult": 1641193.6
            }
        ],
        "price_summary": [
            {
                "passenger_type": "adult",
                "total_price": 1641193.6,
                "quantity": 1
            }
        ],
        "currency": "NGN",
        "total_duration": 1375,
        "outbound": [
            {
                "flight_number": "626",
                "layover": 145,
                "airport_to": "IST",
                "airport_from": "LOS",
                "booking_class": "Q",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-07-01T05:45:00",
                "refundable": true,
                "equipment_type": "333",
                "marketing_airline": "TK",
                "duration": 410,
                "departure_time": "2024-06-30T20:55:00",
                "overnight": false,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/TK.png",
                    "name": "Turkish Airlines",
                    "code": "TK"
                },
                "airport_to_details": {
                    "name": "Istanbul Airport",
                    "city": "Istanbul",
                    "city_code": "IST",
                    "iata_code": "IST",
                    "country": "Turkey",
                    "country_code": "TR"
                },
                "operating_airline": "TK",
                "airport_from_details": {
                    "name": "Murtala Muhammed International",
                    "city": "Lagos",
                    "city_code": "LOS",
                    "iata_code": "LOS",
                    "country": "Nigeria",
                    "country_code": "NG"
                },
                "fare_rules": []
            },
            {
                "flight_number": "179",
                "layover": null,
                "airport_to": "LAX",
                "airport_from": "IST",
                "booking_class": "Q",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-07-01T11:50:00",
                "refundable": true,
                "equipment_type": "789",
                "marketing_airline": "TK",
                "duration": 820,
                "departure_time": "2024-07-01T08:10:00",
                "overnight": false,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/TK.png",
                    "name": "Turkish Airlines",
                    "code": "TK"
                },
                "airport_to_details": {
                    "name": "Los Angeles International",
                    "city": "Los Angeles",
                    "city_code": "LAX",
                    "iata_code": "LAX",
                    "country": "United States",
                    "country_code": "US"
                },
                "operating_airline": "TK",
                "airport_from_details": {
                    "name": "Istanbul Airport",
                    "city": "Istanbul",
                    "city_code": "IST",
                    "iata_code": "IST",
                    "country": "Turkey",
                    "country_code": "TR"
                },
                "fare_rules": []
            }
        ],
        "inbound": [],
        "total_outbound_duration": 1375,
        "total_inbound_duration": 0,
        "outbound_stops": 1,
        "inbound_stops": 0,
        "pricing": {
            "markup": {
                "markup_type": "percentage",
                "markup_value": 0
            },
            "payable": 1641193.6
        }
    },
    {
        "id": "ama_b852a09f-4bf9-426b-99fc-7375c833c7a1",
        "fare_basis": "QLB4XPOW",
        "amount": 1641193.6,
        "travelers_price": [
            {
                "adult": 1641193.6
            }
        ],
        "price_summary": [
            {
                "passenger_type": "adult",
                "total_price": 1641193.6,
                "quantity": 1
            }
        ],
        "currency": "NGN",
        "total_duration": 1680,
        "outbound": [
            {
                "flight_number": "626",
                "layover": 450,
                "airport_to": "IST",
                "airport_from": "LOS",
                "booking_class": "Q",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-07-01T05:45:00",
                "refundable": true,
                "equipment_type": "333",
                "marketing_airline": "TK",
                "duration": 410,
                "departure_time": "2024-06-30T20:55:00",
                "overnight": false,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/TK.png",
                    "name": "Turkish Airlines",
                    "code": "TK"
                },
                "airport_to_details": {
                    "name": "Istanbul Airport",
                    "city": "Istanbul",
                    "city_code": "IST",
                    "iata_code": "IST",
                    "country": "Turkey",
                    "country_code": "TR"
                },
                "operating_airline": "TK",
                "airport_from_details": {
                    "name": "Murtala Muhammed International",
                    "city": "Lagos",
                    "city_code": "LOS",
                    "iata_code": "LOS",
                    "country": "Nigeria",
                    "country_code": "NG"
                },
                "fare_rules": []
            },
            {
                "flight_number": "9",
                "layover": null,
                "airport_to": "LAX",
                "airport_from": "IST",
                "booking_class": "Q",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-07-01T16:55:00",
                "refundable": true,
                "equipment_type": "77W",
                "marketing_airline": "TK",
                "duration": 820,
                "departure_time": "2024-07-01T13:15:00",
                "overnight": false,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/TK.png",
                    "name": "Turkish Airlines",
                    "code": "TK"
                },
                "airport_to_details": {
                    "name": "Los Angeles International",
                    "city": "Los Angeles",
                    "city_code": "LAX",
                    "iata_code": "LAX",
                    "country": "United States",
                    "country_code": "US"
                },
                "operating_airline": "TK",
                "airport_from_details": {
                    "name": "Istanbul Airport",
                    "city": "Istanbul",
                    "city_code": "IST",
                    "iata_code": "IST",
                    "country": "Turkey",
                    "country_code": "TR"
                },
                "fare_rules": []
            }
        ],
        "inbound": [],
        "total_outbound_duration": 1680,
        "total_inbound_duration": 0,
        "outbound_stops": 1,
        "inbound_stops": 0,
        "pricing": {
            "markup": {
                "markup_type": "percentage",
                "markup_value": 0
            },
            "payable": 1641193.6
        }
    },
    {
        "id": "ama_dba7987d-808a-41ab-b1ea-15303e757023",
        "fare_basis": "UH740NCA",
        "amount": 1947361,
        "travelers_price": [
            {
                "adult": 1947361
            }
        ],
        "price_summary": [
            {
                "passenger_type": "adult",
                "total_price": 1947361,
                "quantity": 1
            }
        ],
        "currency": "NGN",
        "total_duration": 1526,
        "outbound": [
            {
                "flight_number": "613",
                "layover": 150,
                "airport_to": "IAD",
                "airport_from": "LOS",
                "booking_class": "U",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-07-01T06:05:00",
                "refundable": true,
                "equipment_type": "788",
                "marketing_airline": "UA",
                "duration": 670,
                "departure_time": "2024-06-30T23:55:00",
                "overnight": true,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/UA.png",
                    "name": "United Airlines",
                    "code": "UA"
                },
                "airport_to_details": {
                    "name": "Washington Dulles International",
                    "city": "Washington, D.C.",
                    "city_code": "WAS",
                    "iata_code": "IAD",
                    "country": "United States",
                    "country_code": "US"
                },
                "operating_airline": "UA",
                "airport_from_details": {
                    "name": "Murtala Muhammed International",
                    "city": "Lagos",
                    "city_code": "LOS",
                    "iata_code": "LOS",
                    "country": "Nigeria",
                    "country_code": "NG"
                },
                "fare_rules": []
            },
            {
                "flight_number": "1366",
                "layover": 331,
                "airport_to": "DEN",
                "airport_from": "IAD",
                "booking_class": "U",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-07-01T10:19:00",
                "refundable": true,
                "equipment_type": "777",
                "marketing_airline": "UA",
                "duration": 224,
                "departure_time": "2024-07-01T08:35:00",
                "overnight": false,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/UA.png",
                    "name": "United Airlines",
                    "code": "UA"
                },
                "airport_to_details": {
                    "name": "Denver International",
                    "city": "Denver",
                    "city_code": "DEN",
                    "iata_code": "DEN",
                    "country": "United States",
                    "country_code": "US"
                },
                "operating_airline": "UA",
                "airport_from_details": {
                    "name": "Washington Dulles International",
                    "city": "Washington, D.C.",
                    "city_code": "WAS",
                    "iata_code": "IAD",
                    "country": "United States",
                    "country_code": "US"
                },
                "fare_rules": []
            },
            {
                "flight_number": "564",
                "layover": null,
                "airport_to": "LAX",
                "airport_from": "DEN",
                "booking_class": "U",
                "baggage": "2 checkin allowance",
                "cabin_type": "ECONOMY",
                "arrival_time": "2024-07-01T17:21:00",
                "refundable": true,
                "equipment_type": "753",
                "marketing_airline": "UA",
                "duration": 151,
                "departure_time": "2024-07-01T15:50:00",
                "overnight": false,
                "marriage_group": null,
                "airline_details": {
                    "logo": "https://image.tiqwa.com/airlines/UA.png",
                    "name": "United Airlines",
                    "code": "UA"
                },
                "airport_to_details": {
                    "name": "Los Angeles International",
                    "city": "Los Angeles",
                    "city_code": "LAX",
                    "iata_code": "LAX",
                    "country": "United States",
                    "country_code": "US"
                },
                "operating_airline": "UA",
                "airport_from_details": {
                    "name": "Denver International",
                    "city": "Denver",
                    "city_code": "DEN",
                    "iata_code": "DEN",
                    "country": "United States",
                    "country_code": "US"
                },
                "fare_rules": []
            }
        ],
        "inbound": [],
        "total_outbound_duration": 1526,
        "total_inbound_duration": 0,
        "outbound_stops": 2,
        "inbound_stops": 0,
        "pricing": {
            "markup": {
                "markup_type": "percentage",
                "markup_value": 0
            },
            "payable": 1947361
        }
    },
];