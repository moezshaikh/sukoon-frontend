import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/Expert.css";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const ExpertConsultation = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [expertiseFilter, setExpertiseFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace this with your actual API key
  });

  const containerStyle = {
    width: "100%",
    height: "350px",
    borderRadius: "12px",
  };

  const experts = [
  {
    name: "Dr. Ayesha Khan",
    title: "Clinical Psychologist",
    expertise: "Stress",
    gender: "Female",
    mode: "Online",
    image: "https://i.pravatar.cc/150?img=32",
    coords: { lat: 19.08, lng: 72.88 },
  },
  {
    name: "Dr. Samira A",
    title: "Counselor",
    expertise: "Self-esteem",
    gender: "Female",
    mode: "Online",
    image: "https://i.pravatar.cc/150?img=51",
    coords: { lat: 19.01, lng: 72.86 },
  },
  {
    name: "Dr. Nikhil Sharma",
    title: "Cognitive Therapist",
    expertise: "Anxiety",
    gender: "Male",
    mode: "Online",
    image: "https://i.pravatar.cc/150?img=15",
    coords: { lat: 19.05, lng: 72.83 },
  },
  {
    name: "Dr. Rohan Patil",
    title: "Mindfulness Coach",
    expertise: "Stress",
    gender: "Male",
    mode: "Online",
    image: "https://i.pravatar.cc/150?img=30",
    coords: { lat: 19.07, lng: 72.89 },
  },
  {
    name: "Dr. Isha Batra",
    title: "Mental Health Consultant",
    expertise: "Depression",
    gender: "Female",
    mode: "Offline",
    image: "https://i.pravatar.cc/150?img=36",
    coords: { lat: 19.11, lng: 72.87 },
    address: "Daily Healthcare, Vasai, Mumbai"
  },
  {
    name: "Dr. Tara Kapoor",
    title: "Life Coach",
    expertise: "Self-esteem",
    gender: "Female",
    mode: "Online",
    image: "https://i.pravatar.cc/150?img=53",
    coords: { lat: 19.09, lng: 72.84 },
  },
 {
  name: "Dr. Raj Mehta",
  title: "Psychiatrist",
  expertise: "Depression",
  gender: "Male",
  mode: "Offline",
  image: "https://i.pravatar.cc/150?img=12",
  coords: { lat: 19.1, lng: 72.85 },
  address: "Carter Road Clinic, Bandra West, Mumbai"
},
{
  name: "Dr. Farah Siddiqui",
  title: "Behavioral Therapist",
  expertise: "Anger",
  gender: "Female",
  mode: "Offline",
  image: "https://i.pravatar.cc/150?img=45",
  coords: { lat: 19.06, lng: 72.82 },
  address: "MindSpace Wellness Center, Andheri West, Mumbai"
},
{
  name: "Dr. Ahmed Noor",
  title: "Grief Counselor",
  expertise: "Loss",
  gender: "Male",
  mode: "Offline",
  image: "https://i.pravatar.cc/150?img=24",
  coords: { lat: 19.12, lng: 72.9 },
  address: "Serene Clinic, Byculla East, Mumbai"
},
{
  name: "Dr. Mehul Desai",
  title: "Therapist",
  expertise: "Anxiety",
  gender: "Male",
  mode: "Offline",
  image: "https://i.pravatar.cc/150?img=20",
  coords: { lat: 19.03, lng: 72.88 },
  address: "Inner Light Center, Dadar, Mumbai"
},
  {
    name: "Dr. Zoya Ansari",
    title: "Emotional Wellness Coach",
    expertise: "Stress",
    gender: "Female",
    mode: "Offline",
    image: "https://i.pravatar.cc/150?img=39",
    coords: { lat: 19.02, lng: 72.81 },
    address: "Lilavati Hospital & Research Centre A-791, Bandra (W), Mumbai"
  },
  {
    name: "Mx. Aryan Jain",
    title: "Gender Inclusive Counselor",
    expertise: "Identity",
    gender: "Others",
    mode: "Online",
    image: "https://i.pravatar.cc/150?img=60",
    coords: { lat: 19.04, lng: 72.86 },
  },
];


  const filteredExperts = experts.filter((expert) => {
    const matchesExpertise =
      expertiseFilter === "All" || expert.expertise === expertiseFilter;
    const matchesGender =
      genderFilter === "All" || expert.gender === genderFilter;
    const matchesMode = modeFilter === "All" || expert.mode === modeFilter;
    const matchesSearch = expert.name.toLowerCase().includes(searchName.toLowerCase());

    return matchesExpertise && matchesGender && matchesMode && matchesSearch;
  });

  const handleDateChange = (date) => setSelectedDate(date);

  const confirmBooking = (expert) => {
    setSelectedExpert(expert);
    setShowConfirmation(true);
  };

  const clearFilters = () => {
    setExpertiseFilter("All");
    setGenderFilter("All");
    setModeFilter("All");
    setSearchName("");
  };

  return (
    <div className={`consultation-container ${fadeIn ? "fade-in" : ""}`}>
      <div className="header-section">
        <h1>Expert Consultation</h1>
        <p>Book real-time therapy sessions and explore professionals near you.</p>
      </div>

      <div className="filter-section">
        <button className="filter-btn" onClick={() => setShowFilters(!showFilters)}>
          Filters {showFilters ? "▲" : "▼"}
        </button>

        {showFilters && (
          <div className="filter-panel">
            <div className="calendar-section">
              <label>📅 Select Date & Time:</label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="date-picker"
              />
            </div>

            <div className="dropdown-filters">
              <div className="filter-block">
                <label> Expertise:</label>
                <select value={expertiseFilter} onChange={(e) => setExpertiseFilter(e.target.value)}>
                  <option>All</option>
                  <option>Stress</option>
                  <option>Depression</option>
                  <option>Self-esteem</option>
                </select>
              </div>

              <div className="filter-block">
                <label>Gender:</label>
                <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
                  <option>All</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              </div>

              <div className="filter-block">
                <label>Mode:</label>
                <select value={modeFilter} onChange={(e) => setModeFilter(e.target.value)}>
                  <option>All</option>
                  <option>Online</option>
                  <option>Offline</option>
                </select>
              </div>

              <div className="filter-block search-section">
                <label>Search by Name:</label>
                <input
                  type="text"
                  placeholder="Enter expert's name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-actions">
              <button className="clear-btn" onClick={clearFilters}>
                 Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="experts-grid">
        {filteredExperts.length === 0 ? (
          <p>No experts match the selected filters.</p>
        ) : (
          filteredExperts.map((expert, index) => (
            <div className="expert-card" key={index}>
              <img src={expert.image} alt={expert.name} />
              <h3>{expert.name}</h3>
              <p className="title">{expert.title}</p>
              <p className="expertise">Expertise: {expert.expertise}</p>
              <button className="book-btn" onClick={() => confirmBooking(expert)}>
                Book Session
              </button>
            </div>
          ))
        )}
      </div>

      {showConfirmation && selectedExpert && (
  <div className="booking-modal-overlay">
    <div className="booking-modal">
      <div className="modal-content">
        <h3>Confirm Booking</h3>
        <p><strong>With:</strong> {selectedExpert.name}</p>
        <p><strong>Date & Time:</strong> {selectedDate.toLocaleString()}</p>

        {selectedExpert.mode === "Offline" && selectedExpert.address && (
  <div className="expert-address">
    <p><strong>📍 Address:</strong> {selectedExpert.address}</p>
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        selectedExpert.address
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="map-link-btn"
    >
      🌐 Open in Google Maps
    </a>
  </div>
)}
        <div className="modal-actions">
          <button className="confirm-btn" onClick={() => setShowConfirmation(false)}>
            Confirm
          </button>
          <button className="cancel-btn" onClick={() => setShowConfirmation(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}


      <div className="note">
        <p>💬 All sessions are confidential & privacy-protected.</p>
      </div>

      <div className="chat-icon" onClick={() => setShowChatBot(!showChatBot)}>
        💬 Need Help?
      </div>

      {showChatBot && (
        <div className="chat-bot">
          <p>Hi! I'm SukoonBot. How can I assist you today?</p>
        </div>
      )}
    </div>
  );
};

export default ExpertConsultation;
