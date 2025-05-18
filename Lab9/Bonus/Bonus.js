document.addEventListener("DOMContentLoaded", () => {
  let map, marker;

  // Initialize Google Maps
  const initializeMap = () => {
    const defaultLocation = { lat: 31.5204, lng: 74.3587 }; // Example: Lahore, Pakistan
    map = new google.maps.Map(document.getElementById("map"), {
      center: defaultLocation,
      zoom: 8,
    });

    map.addListener("click", (event) => {
      const clickedLocation = event.latLng;

      if (marker) {
        marker.setPosition(clickedLocation);
      } else {
        marker = new google.maps.Marker({
          position: clickedLocation,
          map: map,
        });
      }

      document.getElementById("latitude").value = clickedLocation.lat();
      document.getElementById("longitude").value = clickedLocation.lng();
    });
  };

  initializeMap();

  // Handle Form Submission
  const eventForm = document.getElementById("eventForm");
  eventForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const eventData = {
      eventName: document.getElementById("eventName").value.trim(),
      organizerName: document.getElementById("organizerName").value.trim(),
      date: document.getElementById("eventDate").value,
      latitude: document.getElementById("latitude").value,
      longitude: document.getElementById("longitude").value,
    };

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) throw new Error("Failed to submit event");
      const result = await response.json();
      alert(`Event successfully registered! Event ID: ${result.eventId}`);
      eventForm.reset();
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  });
});
