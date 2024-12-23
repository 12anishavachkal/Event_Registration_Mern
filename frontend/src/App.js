// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import EventForm from "./EventForm";
// import "./App.css";

// const App = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   const [signupUsername, setSignupUsername] = useState("");
//   const [signupEmail, setSignupEmail] = useState("");
//   const [signupPassword, setSignupPassword] = useState("");
//   const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

//   const [events, setEvents] = useState([]);

//   // Fetch events when the user is logged in
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/read");
//         setEvents(response.data.events);
//       } catch (err) {
//         console.error("Error fetching events:", err);
//         alert("Failed to fetch events.");
//       }
//     };

//     if (isLoggedIn) {
//       fetchEvents();
//     }
//   }, [isLoggedIn]);

//   // Handle the "Delete" button click
//   const handleDelete = async (eventId) => {
//     try {
//       const response = await axios.delete(`http://localhost:3000/events/${eventId}`);
//       if (response.status === 200) {
//         setEvents(events.filter((event) => event._id !== eventId)); // Remove the deleted event from state
//         alert("Event deleted successfully.");
//       }
//     } catch (err) {
//       console.error("Error deleting event:", err);
//       alert("Failed to delete the event.");
//     }
//   };

//   // Handle updating an event
//   const handleUpdateEvent = async (updatedEvent) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:3000/events/${updatedEvent._id}`,
//         updatedEvent
//       );
//       setEvents(
//         events.map((event) =>
//           event._id === updatedEvent._id ? response.data.event : event
//         )
//       );
      
//       alert("Event updated successfully.");
//     } catch (err) {
//       console.error("Error updating event:", err);
//       alert("Failed to update the event.");
//     }
//   };

//   // Handle login form submission
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:3000/login", {
//         email: loginEmail,
//         password: loginPassword,
//       });
//       alert("Login successful!");
//       setIsLoggedIn(true);
//     } catch (err) {
//       console.error("Error during login:", err);
//       alert(err.response?.data?.message || "An error occurred while logging in.");
//     }
//   };

//   // Handle signup form submission
//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     if (signupPassword !== signupConfirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     try {
//       await axios.post("http://localhost:3000/register", {
//         username: signupUsername,
//         email: signupEmail,
//         password: signupPassword,
//         confirm_password: signupConfirmPassword,
//       });
//       alert("Signup successful!");
//       setIsLogin(true);
//     } catch (err) {
//       console.error("Error during signup:", err);
//       alert(err.response?.data?.message || "An error occurred while signing up.");
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setIsLogin(true);
//   };

//   return (
//     <div className="container">
//       {isLoggedIn ? (
//         <div className="contentContainer">
//           <div className="header">
//             <h2>All Events</h2>
//             <button onClick={handleLogout} className="logoutButton">
//               Log Out
//             </button>
//           </div>
//           <EventForm
//             onSaveEvent={(event) => {
//               setEvents([...events, event]);
//             }}
//             onUpdateEvent={handleUpdateEvent}
//           />
//           {events.length > 0 ? (
//             <ul className="eventList">
//               {events.map((event) => (
//                 <li key={event._id} className="eventItem">
//                   <h3>{event.name}</h3>
//                   <p>{event.description}</p>
//                   <p>
//                     Start: {new Date(event.start_date_time).toLocaleString()} <br />
//                     End: {new Date(event.end_date_time).toLocaleString()}
//                   </p>
//                   <p>Type: {event.type}</p>
//                   <button
//                     onClick={() => handleDelete(event._id)}
//                     className="deleteButton"
//                   >
//                     Delete
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No events available.</p>
//           )}
//         </div>
//       ) : (
//         <div className="formContainer">
//           <h2>Event Registration</h2>
//           {isLogin ? (
//             <form onSubmit={handleLoginSubmit} className="form">
//               <div className="formGroup">
//                 <label htmlFor="loginEmail">Email</label>
//                 <input
//                   type="email"
//                   id="loginEmail"
//                   value={loginEmail}
//                   onChange={(e) => setLoginEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//               <div className="formGroup">
//                 <label htmlFor="loginPassword">Password</label>
//                 <input
//                   type="password"
//                   id="loginPassword"
//                   value={loginPassword}
//                   onChange={(e) => setLoginPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   required
//                 />
//               </div>
//               <button type="submit" className="button">
//                 Log In
//               </button>
//             </form>
//           ) : (
//             <form onSubmit={handleSignupSubmit} className="form">
//               <div className="formGroup">
//                 <label htmlFor="signupUsername">Username</label>
//                 <input
//                   type="text"
//                   id="signupUsername"
//                   value={signupUsername}
//                   onChange={(e) => setSignupUsername(e.target.value)}
//                   placeholder="Enter your username"
//                   required
//                 />
//               </div>
//               <div className="formGroup">
//                 <label htmlFor="signupEmail">Email</label>
//                 <input
//                   type="email"
//                   id="signupEmail"
//                   value={signupEmail}
//                   onChange={(e) => setSignupEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//               <div className="formGroup">
//                 <label htmlFor="signupPassword">Password</label>
//                 <input
//                   type="password"
//                   id="signupPassword"
//                   value={signupPassword}
//                   onChange={(e) => setSignupPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   required
//                 />
//               </div>
//               <div className="formGroup">
//                 <label htmlFor="signupConfirmPassword">Confirm Password</label>
//                 <input
//                   type="password"
//                   id="signupConfirmPassword"
//                   value={signupConfirmPassword}
//                   onChange={(e) => setSignupConfirmPassword(e.target.value)}
//                   placeholder="Confirm your password"
//                   required
//                 />
//               </div>
//               <button type="submit" className="button">
//                 Sign Up
//               </button>
//             </form>
//           )}
//           <div className="toggle">
//             {isLogin ? (
//               <button onClick={() => setIsLogin(false)} className="toggleButton">
//                 Don't have an account? Sign Up
//               </button>
//             ) : (
//               <button onClick={() => setIsLogin(true)} className="toggleButton">
//                 Already have an account? Log In
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;


// 

import React, { useState, useEffect } from "react";
import axios from "axios";
import EventForm from "./EventForm";
import "./App.css";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("Comedy");

  const navData = {
    Comedy: {
      image: "https://www.eventbrite.com/creator/onboarding/_next/static/media/Comedy.8f31fa54.svg",
      text: "Eventbrite helped 16K comedy organizers sell over 5M tickets in 2023.",
    },
    "Food & Drink": {
      image: "https://www.eventbrite.com/creator/onboarding/_next/static/media/FoodAndDrink.09ff45bd.svg",
      text: "Eventbrite connects food lovers to thousands of amazing experiences each year.",
    },
    Music: {
      image: "https://www.eventbrite.com/creator/onboarding/_next/static/media/Music.36b84d7e.svg",
      text: "Over 10M tickets sold for live music events in 2023 on Eventbrite.",
    },
    "Community & Culture": {
      image: "https://www.eventbrite.com/creator/onboarding/_next/static/media/CommunityAndCulture.b56f3f50.svg",
      text: "Building connections through events for community and culture.",
    },
    "Hobbies & Special Interest": {
      image: "https://www.eventbrite.com/creator/onboarding/_next/static/media/HobbiesAndInterests.c9d48b77.svg",
      text: "Discover unique hobby workshops and special interest events.",
    },
    "Performing & Visual Arts": {
      image: "https://www.eventbrite.com/creator/onboarding/_next/static/media/PerformingArts.3810158c.svg",
      text: "Engage with thousands of performing and visual art events.",
    },
    Parties: {
      image: "https://www.eventbrite.com/creator/onboarding/_next/static/media/Party.c0ebc8d8.svg",
      text: "Host and join the best parties with Eventbrite.",
    },
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/read");
        setEvents(response.data.events);
      } catch (err) {
        console.error("Error fetching events:", err);
        alert("Failed to fetch events.");
      }
    };

    if (isLoggedIn) {
      fetchEvents();
    }
  }, [isLoggedIn]);

  const handleDelete = async (eventId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/events/${eventId}`);
      if (response.status === 200) {
        setEvents(events.filter((event) => event._id !== eventId));
        alert("Event deleted successfully.");
      }
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete the event.");
    }
  };

  const handleUpdateEvent = async (updatedEvent) => {
    try {
      const response = await axios.put(`http://localhost:3000/events/${updatedEvent._id}, updatedEvent`);
      setEvents(events.map((event) => (event._id === updatedEvent._id ? response.data.event : event)));
      alert("Event updated successfully.");
    } catch (err) {
      console.error("Error updating event:", err);
      alert("Failed to update the event.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: loginEmail,
        password: loginPassword,
      });
      alert("Login successful!");
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Error during login:", err);
      alert(err.response?.data?.message || "An error occurred while logging in.");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await axios.post("http://localhost:3000/register", {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
        confirm_password: signupConfirmPassword,
      });
      alert("Signup successful!");
      setIsLogin(true);
    } catch (err) {
      console.error("Error during signup:", err);
      alert(err.response?.data?.message || "An error occurred while signing up.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsLogin(true);
  };

  return (
    <div className="container">
      {/* Navbar */}
      <header className="header">
        <h1>Event Registration</h1>
        <nav className="navbar">
          {Object.keys(navData).map((item) => (
            <button
              key={item}
              className={`navItem ${activeTab === item ? "activeNavItem" : ""}`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      {isLoggedIn ? (
        <div className="contentContainer">
          <div className="header">
            <h2>All Events</h2>
            <button onClick={handleLogout} className="logoutButton">
              Log Out
            </button>
          </div>
          <EventForm onSaveEvent={(event) => setEvents([...events, event])} onUpdateEvent={handleUpdateEvent} />
          {events.length > 0 ? (
            <ul className="eventList">
              {events.map((event) => (
                <li key={event._id} className="eventItem">
                  <h3>{event.name}</h3>
                  <p>{event.description}</p>
                  <p>
                    Start: {new Date(event.start_date_time).toLocaleString()} <br />
                    End: {new Date(event.end_date_time).toLocaleString()}
                  </p>
                  <p>Type: {event.type}</p>
                  <button onClick={() => handleDelete(event._id)} className="deleteButton">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No events available.</p>
          )}
        </div>
      ) : 
        (
          <div className="formImageRow">
            {/* Form Section */}
            <div className="formContainer">
              <h2>Event Registration</h2>
              {isLogin ? (
                <form onSubmit={handleLoginSubmit} className="form">
                  <div className="formGroup">
                    <label htmlFor="loginEmail">Email</label>
                    <input
                      type="email"
                      id="loginEmail"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="loginPassword">Password</label>
                    <input
                      type="password"
                      id="loginPassword"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <button type="submit" className="button">
                    Log In
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignupSubmit} className="form">
                  <div className="formGroup">
                    <label htmlFor="signupUsername">Username</label>
                    <input
                      type="text"
                      id="signupUsername"
                      value={signupUsername}
                      onChange={(e) => setSignupUsername(e.target.value)}
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="signupEmail">Email</label>
                    <input
                      type="email"
                      id="signupEmail"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="signupPassword">Password</label>
                    <input
                      type="password"
                      id="signupPassword"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="signupConfirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="signupConfirmPassword"
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  <button type="submit" className="button">
                    Sign Up
                  </button>
                </form>
              )}
              <div className="toggle">
                {isLogin ? (
                  <button onClick={() => setIsLogin(false)} className="toggleButton">
                    Don't have an account? Sign Up
                  </button>
                ) : (
                  <button onClick={() => setIsLogin(true)} className="toggleButton">
                    Already have an account? Log In
                  </button>
                )}
              </div>
            </div>
        
            {/* Image Section */}
            <div className="imageSection">
              <img
                src={navData[activeTab].image}
                alt={activeTab}
                className="image"
              />
              <p>{navData[activeTab].text}</p>
            </div>
          </div>
        )}
        
    </div>
  );
};

export default App;
