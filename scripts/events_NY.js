document.addEventListener("DOMContentLoaded", () => {
  const logoImage = document.querySelector(".logoImage");

  if (logoImage) {
    logoImage.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
});

import { eventsStore } from "./eventsStore.js";

document.addEventListener("DOMContentLoaded", () => {
  const filterType = document.getElementById("filterType");
  const filterDistance = document.getElementById("filterDistance");
  const filterCategory = document.getElementById("filterCategory");
  const eventsList = document.getElementById("eventsList");

  let activeFilter = null;

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
            <img src="${event.image}" alt="${event.title}" />
          </div>
          <div class="info_card">
            <p class="date">${event.date.toDateString()} ${event.date.toLocaleTimeString()}</p>
            <h3>${event.title}</h3>
            <p class="description">${event.description}</p>
            <p>${event.category} (${event.distance} km)</p>
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
    let filteredEvents = eventsStore;

    if (activeFilter === filterType && filterType.value !== "any") {
      filteredEvents = filteredEvents.filter(
        (event) => event.type === filterType.value
      );
    } else if (
      activeFilter === filterDistance &&
      filterDistance.value !== "any"
    ) {
      const maxDistance = parseInt(filterDistance.value, 10);
      filteredEvents = filteredEvents.filter(
        (event) => event.distance <= maxDistance
      );
    } else if (
      activeFilter === filterCategory &&
      filterCategory.value !== "any"
    ) {
      filteredEvents = filteredEvents.filter(
        (event) => event.category === filterCategory.value
      );
    }

    renderEvents(filteredEvents);
  }

  function resetFilters(exceptFilter) {
    [filterType, filterDistance, filterCategory].forEach((filter) => {
      if (filter !== exceptFilter) {
        filter.value = "any";
      }
    });
  }

  function handleFilterChange(filter) {
    activeFilter = filter;
    resetFilters(filter);
    filterEvents();
  }

  filterType.addEventListener("change", () => handleFilterChange(filterType));
  filterDistance.addEventListener("change", () =>
    handleFilterChange(filterDistance)
  );
  filterCategory.addEventListener("change", () =>
    handleFilterChange(filterCategory)
  );

  renderEvents(eventsStore);
});
