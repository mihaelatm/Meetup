const eventsStore = [
  {
    title: "INFJ Personality Type - Coffee Shop Meet & Greet",
    description: "Being an INFJ",
    date: new Date(2024, 2, 23, 15),
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w ",
    type: "offline",
    attendees: 99,
    category: "Hobbies and Passions",
    distance: 50,
  },
  {
    title:
      "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
    description: "New York AI Users",
    date: new Date(2024, 2, 23, 11, 30),
    image:
      "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
    type: "offline",
    attendees: 43,
    category: "Technology",
    distance: 25,
  },
  {
    title: "Book 40+ Appointments Per Month Using AI and Automation",
    description: "New Jersey Business Network",
    date: new Date(2024, 2, 16, 14),
    image:
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    category: "Technology",
    distance: 10,
  },
  {
    title: "Dump writing group weekly meetup",
    description: "Dump writing group",
    date: new Date(2024, 2, 13, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 77,
    category: "Business",
    distance: 100,
  },
  {
    title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
    description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 140,
    category: "Social Activities",
    distance: 74,
  },
  {
    title: "All Nations - Manhattan Missions Church Bible Study",
    description: "Manhattan Bible Study Meetup Group",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "offline",
    category: "Health and Wellbeing",
    distance: 15,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const filterType = document.getElementById("filterType");
  const filterDistance = document.getElementById("filterDistance");
  const filterCategory = document.getElementById("filterCategory");
  const eventsList = document.getElementById("eventsList");

  function renderEvents(events) {
    eventsList.innerHTML = "";
    if (events.length === 0) {
      eventsList.innerHTML = "<p>No events found</p>";
      return;
    }

    events.forEach((event) => {
      const eventCard = `
        <div class="event_card">
          <div class="image_card">
            <img src="${event.image}" alt="event" />
          </div>
          <div class="info_card">
            <p class="date">${event.date.toDateString()} ${event.date.toLocaleTimeString()}</p>
            <h3>${event.title}</h3>
            <p class="description">${event.category} (${event.distance} km)</p>
            ${
              event.attendees ? `<span>${event.attendees} attendees</span>` : ""
            }
          </div>
        </div>
      `;
      eventsList.innerHTML += eventCard;
    });
  }

  function filterEvents() {
    const type = filterType.value;
    const distance =
      filterDistance.value === "any"
        ? Infinity
        : parseInt(filterDistance.value, 10);
    const category = filterCategory.value;

    let filteredEvents = eventsStore;

    if (type !== "any") {
      filteredEvents = filteredEvents.filter((event) => event.type === type);
    }

    if (distance !== Infinity) {
      filteredEvents = filteredEvents.filter(
        (event) => event.distance <= distance
      );
    }

    if (category !== "any") {
      filteredEvents = filteredEvents.filter(
        (event) => event.category === category
      );
    }

    // Log pentru debugging
    console.log("Filtered Events:", filteredEvents);

    renderEvents(filteredEvents);
  }

  filterType.addEventListener("change", filterEvents);
  filterDistance.addEventListener("change", filterEvents);
  filterCategory.addEventListener("change", filterEvents);

  // Render all events on initial load
  renderEvents(eventsStore);
});
