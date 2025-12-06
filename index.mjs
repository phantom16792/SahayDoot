let emergency_btn = document.getElementById("emer_btn");

// These will be updated when location is obtained
let lat = null;
let long = null;
let locationData = null;

function getLocation(location) {
  // Update the variables
  lat = location.coords.latitude;
  long = location.coords.longitude;
  locationData = location;
  
  console.log(
    `latitude: ${location.coords.latitude}\nlongitude: ${location.coords.longitude}\n`
  );
  
  // Get address from coordinates
  getLocationFromCoords(
    location.coords.latitude,
    location.coords.longitude
  ).then((data) => {
    if (data) {
      console.log("Address:", data.display_name);
      console.log("Full data:", data);
    }
  });
}

function nolocation() {
  console.log("Error getting location");
  alert("Please enable location access");
}

emergency_btn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(getLocation, nolocation);
});

async function getLocationFromCoords(lat, lon) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json
`,
      {
        headers: {
          'User-Agent': 'EmergencyApp/1.0 (aryanmhaiskar51@gmail.com)',
          "Accept-Language": "en" 
        }
      }
    )
    
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    
    // const data = await response.json();
    // return data;
    .then(response => {
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    console.log("Address:", data.display_name);
    console.log("Details:", data.address);
  })
  .catch(err => console.error("Error:", err));


  } catch (error) {
    console.error("Geocoding Error:", error);
    
    // Fallback: Show coordinates if geocoding fails
    alert(`Could not get address. Location: ${lat}, ${lon}`);
    return null;
  }
}

// Export the variables and function
export { lat, long, locationData, getLocationFromCoords };

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Location state management
// const locationState = {
//   lat: null,
//   long: null,
//   locationData: null,
//   address: null
// };

// // Get location button
// const emergency_btn = document.getElementById("emer_btn");

// // Configuration
// const GEOCODING_CONFIG = {
//   userAgent: 'EmergencyApp/1.0 (aryanmhaiskar51@gmail.com)',
//   language: 'en',
//   retryDelay: 1000, // 1 second delay between retries
//   maxRetries: 3
// };

/**
 * Success callback for geolocation
 */
// function getLocation(location) {
//   // Update the state object
//   locationState.lat = location.coords.latitude;
//   locationState.long = location.coords.longitude;
//   locationState.locationData = location;
  
//   console.log(
//     `Latitude: ${location.coords.latitude}\nLongitude: ${location.coords.longitude}`
//   );
  
//   // Get address from coordinates
//   getLocationFromCoords(
//     location.coords.latitude,
//     location.coords.longitude
//   ).then((data) => {
//     if (data) {
//       locationState.address = data;
//       console.log("Address:", data.display_name);
//       console.log("Full data:", data);
//     }
//   }).catch((error) => {
//     console.error("Failed to get address:", error);
//   });
// }

// /**
//  * Error callback for geolocation
//  */
// function nolocation(error) {
//   console.error("Error getting location:", error);
  
//   let errorMessage = "Please enable location access";
  
//   switch(error.code) {
//     case error.PERMISSION_DENIED:
//       errorMessage = "Location access denied. Please enable location permissions.";
//       break;
//     case error.POSITION_UNAVAILABLE:
//       errorMessage = "Location information unavailable.";
//       break;
//     case error.TIMEOUT:
//       errorMessage = "Location request timed out.";
//       break;
//   }
  
//   alert(errorMessage);
// }

// /**
//  * Request user's current location
//  */
// function requestLocation() {
//   if (!navigator.geolocation) {
//     alert("Geolocation is not supported by your browser");
//     return;
//   }
  
//   navigator.geolocation.getCurrentPosition(getLocation, nolocation, {
//     enableHighAccuracy: true,
//     timeout: 10000,
//     maximumAge: 0
//   });
// }

// /**
//  * Get address from coordinates using Nominatim API
//  * Includes retry logic and proper error handling
//  */
// async function getLocationFromCoords(lat, lon, retryCount = 0) {
//   try {
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
//       {
//         headers: {
//           'User-Agent': GEOCODING_CONFIG.userAgent,
//           'Accept-Language': GEOCODING_CONFIG.language
//         }
//       }
//     );
    
//     if (!response.ok) {
//       // Handle rate limiting (429) with retry
//       if (response.status === 429 && retryCount < GEOCODING_CONFIG.maxRetries) {
//         console.warn(`Rate limited. Retrying in ${GEOCODING_CONFIG.retryDelay}ms... (Attempt ${retryCount + 1}/${GEOCODING_CONFIG.maxRetries})`);
        
//         await new Promise(resolve => setTimeout(resolve, GEOCODING_CONFIG.retryDelay * (retryCount + 1)));
//         return getLocationFromCoords(lat, lon, retryCount + 1);
//       }
      
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
    
//     const data = await response.json();
    
//     // Check if we got valid data
//     if (!data || data.error) {
//       throw new Error(data?.error || "Invalid response from geocoding service");
//     }
    
//     return data;
    
//   } catch (error) {
//     console.error("Geocoding Error:", error);
    
//     // Fallback: Show coordinates if geocoding fails
//     if (retryCount >= GEOCODING_CONFIG.maxRetries - 1) {
//       alert(`Could not get address. Location: ${lat.toFixed(6)}, ${lon.toFixed(6)}`);
//     }
    
//     return null;
//   }
// }

// /**
//  * Get formatted address string from location data
//  */
// function getFormattedAddress(data) {
//   if (!data || !data.address) return null;
  
//   const addr = data.address;
//   const parts = [
//     addr.road || addr.pedestrian,
//     addr.suburb || addr.neighbourhood,
//     addr.city || addr.town || addr.village,
//     addr.state,
//     addr.postcode,
//     addr.country
//   ].filter(Boolean);
  
//   return parts.join(', ');
// }

// /**
//  * Get current location state
//  */
// function getLocationState() {
//   return { ...locationState };
// }

// /**
//  * Check if location has been obtained
//  */
// function hasLocation() {
//   return locationState.lat !== null && locationState.long !== null;
// }

// // Event listener for emergency button
// if (emergency_btn) {
//   emergency_btn.addEventListener("click", requestLocation);
// }

// // Export everything needed
// export { 
//   // Current state getters
//   getLocationState,
//   hasLocation,
  
//   // Direct access to state (use getters instead when possible)
//   locationState,
  
//   // Functions
//   requestLocation,
//   getLocationFromCoords,
//   getFormattedAddress,
  
//   // Individual coordinates (deprecated - use getLocationState instead)
//   // get lat()=> { return locationState.lat; },
//   // get long() { return locationState.long; },
//   // get locationData() { return locationState.locationData; },
//   // get address() { return locationState.address; }
// };