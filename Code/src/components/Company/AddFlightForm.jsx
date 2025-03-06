import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addFlight, updateFlight, viewFlight } from '../../Actions/Company';
import { useParams } from 'react-router-dom';

const AddFlightForm = () => {
  const [flightDetails, setFlightDetails] = useState({
    flight_name: '',
    flight_no: '',
    from_location: '',
    to_location: '',
    start_time: '',
    end_time: '',
    date: '',
    seat_type: '',
    seat_capacity: '',
    price: '',
    discountPrice: ''
  });

  const handleChange = (e) => {
    setFlightDetails({ ...flightDetails, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const company = JSON.parse(sessionStorage.getItem('company'));

  const { id } = useParams();

  useEffect(() => {
    dispatch(viewFlight(company._id));
  }, [dispatch]);

  const flight = useSelector((state) => state.company.flight);
  console.log(flight)

  useEffect(() => {
    if (flight && flight.length > 0) {
      const selectedFlight = flight.find(flight => flight._id === id);
      if (selectedFlight) {
        setFlightDetails({
          flight_name: selectedFlight.flight_name,
          flight_no: selectedFlight.flight_no,
          from_location: selectedFlight.from_location,
          to_location: selectedFlight.to_location,
          start_time: selectedFlight.start_time,
          end_time: selectedFlight.end_time,
          date: selectedFlight.date,
          seat_type: selectedFlight.seat_type,
          seat_capacity: selectedFlight.seat_capacity,
          price: selectedFlight.price,
          discountPrice: selectedFlight.discountPrice
        });
      }
    }
  }, [flight, id]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateFlight(id, flightDetails));
    } else {
      dispatch(addFlight(flightDetails, company._id));
    }

    setFlightDetails({
      flight_name: '',
      flight_no: '',
      from_location: '',
      to_location: '',
      start_time: '',
      end_time: '',
      date: '',
      seat_type: '',
      seat_capacity: '',
      price: ''
    });


  };

  const title = id ? 'Update Flight' : 'Add Flight';

  const isRequired = id ? false : true;

  return (
    <div className="bg-gray-300 p-4 gray-800 border shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Flight Name</label>
          <input
            type="text"
            name="flight_name"
            value={flightDetails.flight_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={isRequired}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Flight No</label>
          <input
            type="text"
            name="flight_no"
            value={flightDetails.flight_no}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={isRequired}
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="w-full">
            <label className="block text-sm font-medium">From Location</label>
            <input
              type="text"
              name="from_location"
              value={flightDetails.from_location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={isRequired}
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium">To Location</label>
            <input
              type="text"
              name="to_location"
              value={flightDetails.to_location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={isRequired}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="w-full">
            <label className="block text-sm font-medium">Start Time</label>
            <input
              type="time"
              name="start_time"
              value={flightDetails.start_time}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={isRequired}
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium">End Time</label>
            <input
              type="time"
              name="end_time"
              value={flightDetails.end_time}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={isRequired}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={flightDetails.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={isRequired}
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="w-full">
            <label className="block text-sm font-medium">Seat Type</label>
            <input
              type="text"
              name="seat_type"
              value={flightDetails.seat_type}
              min={130}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={isRequired}
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium">Seat Capacity</label>
            <input
              type="number"
              name="seat_capacity"
              value={flightDetails.seat_capacity}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={isRequired}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={flightDetails.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={isRequired}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {title}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFlightForm;
