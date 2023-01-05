"use strict";

import {
  Walk,
  Run,
  Cycle,
  Swim,
  Skate,
  Ski,
  Football,
  Basketball,
  Rugby,
  Golf,
  Cricket,
  Waterpolo,
  Boxing,
  Sailing,
  Kayak,
  Row,
  Hockey,
  Tennis,
  Gym,
  Other,
} from "./activities.js";

export class App {
  #map;
  #mapZoom = 13;
  #gridEvent;
  #mapEvent;
  #formOptions = new Map();
  #activities = [];
  #htmlRecord = new Map();
  #curPage = 1;
  #numPages;

  _activityIcons = document.querySelector(".icon__grid");
  _step1 = document.querySelector(".step1");
  _step2 = document.querySelector(".step2");
  _step3 = document.querySelector(".step3");
  _form = document.querySelector(".form");
  _activityType = document.querySelector(".form__input--type");
  _activityDistance = document.querySelector(".form__input--distance");
  _activityHr = document.querySelector(".form__input--heartRate");
  _activityDuration = document.querySelector(".form__input--duration");
  _activitySteps = document.querySelector(".form__input--steps");
  _activityElevation = document.querySelector(".form__input--elevation");
  _activityStrokeRate = document.querySelector(".form__input--strokeRate");
  _activitySpeedKnots = document.querySelector(".form__input--speed-1");
  _activitySpeed = document.querySelector(".form__input--speed-2");
  // _activitySpeedKm = document.querySelector(".form__input--speed-3");
  _formSubmit = document.querySelector(".btn--submit");
  _activityLog = document.querySelector(".activity__log");
  _activityRenders = document.querySelector(".activity__renders");
  _btnUp = document.querySelector(".btn--up");
  _btnDown = document.querySelector(".btn--down");

  constructor() {
    // Get User's location
    this._getLocation();

    // Get data from localStorage
    this._getLocalStorage();

    // Event Handlers
    this._activityIcons.addEventListener("click", this._showForm.bind(this));
    this._formSubmit.addEventListener("click", this._newWorkout.bind(this));
    this._btnUp.addEventListener("click", this._prevSlide.bind(this));
    this._btnDown.addEventListener("click", this._nextSlide.bind(this));
    this._activityRenders.addEventListener(
      "click",
      this._moveToActivity.bind(this)
    );

    // Create activity form options array
    this._createMap();

    // Option to reset Local Storage
    // this._reset();
  }

  _createMap() {
    this.#formOptions.set("walk", [
      this._activityDistance,
      this._activityDuration,
      this._activityElevation,
      this._activityHr,
      this._activitySpeed,
      this._activitySteps,
    ]);

    this.#formOptions.set("run", [
      this._activityDistance,
      this._activityDuration,
      this._activityElevation,
      this._activityHr,
      this._activitySpeed,
      this._activitySteps,
    ]);

    this.#formOptions.set("cycle", [
      this._activityDistance,
      this._activityDuration,
      this._activityElevation,
      this._activityHr,
      this._activitySpeed,
    ]);

    this.#formOptions.set("swim", [
      this._activityDistance,
      this._activityDuration,
      this._activityHr,
      this._activitySpeed,
    ]);

    this.#formOptions.set("ski", [
      this._activityDistance,
      this._activityDuration,
      this._activityHr,
      this._activitySpeed,
    ]);

    this.#formOptions.set("skate", [
      this._activityDistance,
      this._activityDuration,
      this._activityHr,
      this._activitySpeed,
    ]);

    this.#formOptions.set("kayak", [
      this._activityDistance,
      this._activityDuration,
      this._activityHr,
      this._activitySpeed,
      this._activityStrokeRate,
    ]);

    this.#formOptions.set("row", [
      this._activityDistance,
      this._activityDuration,
      this._activityHr,
      this._activitySpeed,
      this._activityStrokeRate,
    ]);

    this.#formOptions.set("gym", [
      this._activityDuration,
      this._activityHr,
      this._activitySteps,
    ]);

    this.#formOptions.set("football", [
      this._activityDistance,
      this._activityDuration,
      this._activityHr,
      this._activitySteps,
    ]);

    this.#formOptions.set("rugby", [
      this._activityDistance,
      this._activityDuration,
      this._activityHr,
      this._activitySteps,
    ]);

    this.#formOptions.set("basketball", [
      this._activityDistance,
      this._activityDuration,
      this._activityHr,
      this._activitySteps,
    ]);

    this.#formOptions.set("hockey", [
      this._activityDistance,
      this._activityDuration,
      this._activityHr,
      this._activitySteps,
    ]);

    this.#formOptions.set("golf", [
      this._activityDistance,
      this._activityDuration,
      this._activityHr,
      this._activitySteps,
    ]);

    this.#formOptions.set("cricket", [
      this._activityDistance,
      this._activityDuration,
      this._activityHr,
      this._activitySteps,
    ]);

    this.#formOptions.set("waterpolo", [
      this._activityDistance,
      this._activityDuration,
      this._activityHr,
    ]);

    this.#formOptions.set("tennis", [
      this._activityDistance,
      this._activityDuration,
      this._activityHr,
      this._activitySteps,
    ]);

    this.#formOptions.set("boxing", [
      this._activityDistance,
      this._activityDuration,
      this._activityHr,
      this._activitySteps,
    ]);

    this.#formOptions.set("sailing", [
      this._activityDistance,
      this._activityDuration,
      this._activityHr,
      this._activitySpeedKnots,
    ]);

    this.#formOptions.set("other", [
      this._activityType,
      this._activityDistance,
      this._activityDuration,
      this._activityElevation,
      this._activityHr,
      this._activitySpeedKnots,
      this._activitySpeed,
      this._activitySteps,
      this._activityStrokeRate,
    ]);
  }

  _getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not find your location!");
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map("map").setView(coords, this.#mapZoom);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Map clicks
    this.#map.on("click", this._showActivities.bind(this));

    // Render map activity markers
    this.#activities.forEach((work) => this._renderWorkoutMarker(work));
  }

  _showActivities(mapE) {
    this._step1.classList.add("hidden");
    this.#mapEvent = mapE;
    // Show activity icons
    this._step2.classList.remove("hidden");
    this._activityIcons.classList.remove("hidden");
    // Handle activity icon clicks
    this._activityIcons.addEventListener("click", this._showForm.bind(this));
  }

  _hideActivities() {
    this._activityIcons.classList.add("remove");
    this._step2.classList.add("hidden");
  }

  _showForm(gridE) {
    const icon = gridE.target.closest(".icon");
    if (!icon) return;
    const value = icon.id;
    this._activityType.value = value;
    this._toggleForm();
    this._step3.classList.remove("hidden");
    this._form.classList.remove("hidden");
  }

  _hideForm() {
    // reset form input fields
    this._activityType.value =
      this._activityDistance.value =
      this._activityDuration.value =
      this._activitySteps.value =
      this._activityElevation.value =
      this._activityHr.value =
      this._activitySpeedKnots.value =
      this._activitySpeed.value =
      this._activityStrokeRate.value =
        "";

    // hide form and title
    this._form.classList.add("hidden");
    this._step3.classList.add("hidden");
  }

  _toggleForm() {
    [...document.querySelectorAll(".form__row")].forEach((icon) => {
      icon.classList.add("hidden");
    });
    const icon = this._activityType.value;
    const data = this.#formOptions.get(icon);
    data.forEach((el) => {
      const parent = el.parentNode;
      parent.classList.remove("hidden");
    });
  }

  _newWorkout(e) {
    // Check valid inputs
    const validInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));

    const allPositive = (...inputs) => {
      inputs.every((inp) => {
        console.log(inp);
        inp >= 0;
      });
    };
    e.preventDefault();

    let type = this._activityType.value;
    const distance = +this._activityDistance.value;
    const duration = +this._activityDuration.value;
    const heartRate = +this._activityHr.value;
    const { lat, lng } = this.#mapEvent.latlng;

    let workout, steps, elevation, strokeRate, speedKnots, speed;

    switch (type) {
      case "walk":
        steps = +this._activitySteps.value;
        speed = +this._activitySpeed.value;
        elevation = +this._activityElevation.value;
        if (
          !validInputs(distance, duration, heartRate, steps, speed, elevation)
          // !allPositive(distance, duration, heartRate, steps, speed)
        ) {
          return alert("Inputs must be positive numbers");
        }

        workout = new Walk(
          [lat, lng],
          distance,
          duration,
          heartRate,
          steps,
          speed,
          elevation
        );
        break;
      case "run":
        steps = +this._activitySteps.value;
        speed = +this._activitySpeed.value;
        elevation = +this._activityElevation.value;

        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Run(
          [lat, lng],
          distance,
          duration,
          heartRate,
          steps,
          speed,
          elevation
        );
        break;
      case "cycle":
        elevation = +this._activityElevation.value;
        speed = +this._activitySpeed.value;
        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Cycle(
          [lat, lng],
          distance,
          duration,
          heartRate,
          speed,
          elevation
        );
        break;
      case "swim":
        speed = +this._activitySpeed.value;

        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Swim([lat, lng], distance, duration, heartRate, speed);
        break;
      case "kayak":
        strokeRate = +this._activityStrokeRate.value;
        speed = +this._activitySpeed.value;

        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Kayak(
          [lat, lng],
          distance,
          duration,
          heartRate,
          strokeRate,
          speed
        );
        break;
      case "row":
        strokeRate = +this._activityStrokeRate.value;
        speed = +this._activitySpeed.value;
        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Row(
          [lat, lng],
          distance,
          duration,
          heartRate,
          strokeRate,
          speed
        );
        break;
      case "ski":
        speed = +this._activitySpeed.value;
        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Ski([lat, lng], distance, duration, heartRate, speed);
        break;
      case "skate":
        speed = +this._activitySpeed.value;
        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Skate([lat, lng], distance, duration, heartRate, speed);
        break;
      case "football":
        steps = +this._activitySteps.value;
        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Football(
          [lat, lng],
          distance,
          duration,
          heartRate,
          steps
        );
        break;
      case "gym":
        steps = +this._activitySteps.value;
        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Gym([lat, lng], distance, duration, heartRate, steps);
        break;
      case "rugby":
        steps = +this._activitySteps.value;
        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Rugby([lat, lng], distance, duration, heartRate, steps);
        break;
      case "tennis":
        steps = +this._activitySteps.value;
        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Tennis([lat, lng], distance, duration, heartRate, steps);
        break;
      case "basketball":
        steps = +this._activitySteps.value;
        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Basketball(
          [lat, lng],
          distance,
          duration,
          heartRate,
          steps
        );
        break;
      case "boxing":
        steps = +this._activitySteps.value;
        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Boxing([lat, lng], distance, duration, heartRate, steps);
        break;
      case "hockey":
        steps = +this._activitySteps.value;
        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Hockey([lat, lng], distance, duration, heartRate, steps);
        break;
      case "golf":
        steps = +this._activitySteps.value;
        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Golf([lat, lng], distance, duration, heartRate, steps);
        break;
      case "waterpolo":
        steps = +this._activitySteps.value;
        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Waterpolo(
          [lat, lng],
          distance,
          duration,
          heartRate,
          steps
        );
        break;
      case "cricket":
        steps = +this._activitySteps.value;
        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Cricket([lat, lng], distance, duration, heartRate, steps);
        break;
      case "sailing":
        speedKnots = +this._activitySpeedKnots.value;
        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Sailing(
          [lat, lng],
          distance,
          duration,
          heartRate,
          speedKnots
        );
        break;
      default:
        steps = +this._activitySteps.value;
        elevation = +this._activityElevation.value;
        strokeRate = +this._activityStrokeRate.value;
        speedKnots = +this._activitySpeedKnots.value;
        if (
          !validInputs(distance, duration, heartRate)
          // !allPositive(distance, duration, heartRate)
        ) {
          return alert("Inputs must be positive numbers");
        }
        workout = new Other(
          [lat, lng],
          distance,
          duration,
          heartRate,
          type,
          steps,
          elevation,
          strokeRate,
          speedKnots,
          speed
        );
    }
    // Add activity to array
    this.#activities.push(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    this._renderWorkout(workout);

    // set local storage to all activities
    this._setLocalStorage();

    this._hideForm();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(`${workout.html} ${workout.description}`)
      .openPopup();
  }

  _renderWorkout(workout) {
    let markerIcon = workout.html;

    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details workout__details--${workout.type}">
        <span class="workout__icon">📏</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details workout__details--${workout.type}">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
      <div class="workout__details workout__details--${workout.type}">
        <span class="workout__icon">❤️</span>
        <span class="workout__value">${workout.heartRate}</span>
        <span class="workout__unit">bpm</span>
      </div>
    `;
    if (
      (typeof workout.speed != "undefined" && workout.speed != "") ||
      !isNaN(workout.speed)
    )
      html += `
      <div class="workout__details workout__details--${workout.type}">
        <span class="workout__icon">⚡️</span>
         <span class="workout__value">${workout.speed.toFixed(2)}</span>
        <span class="workout__unit">km/hr</span></span>
      </div>
    
    `;
    if (
      (typeof workout.pace != "undefined" && workout.pace != "") ||
      !isNaN(workout.pace)
    )
      html += `
        <div class="workout__details workout__details--${workout.type}">
          <span class="workout__icon">⚡️</span>
           <span class="workout__value">${workout.pace.toFixed(2)}</span>
          <span class="workout__unit">min/km</span>
        </div>
      
      `;
    if (typeof workout.elevation != "undefined" && workout.elevation != "")
      html += `
        <div class="workout__details workout__details--${workout.type}">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevation}</span>
          <span class="workout__unit">m</span>
        </div>
      
    `;
    if (typeof workout.steps != "undefined" && workout.steps != "")
      html += `
        <div class="workout__details workout__details--${workout.type}">
          <span class="workout__icon">👟</span>
          <span class="workout__value">${workout.steps}</span>
          <span class="workout__unit">steps</span>
        </div>      
    `;
    if (typeof workout.speedKnots != "undefined" && workout.speedKnots != "")
      html += `
        <div class="workout__details workout__details--${workout.type}">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speedKnots.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>      
    `;
    if (typeof workout.strokeRate != "undefined" && workout.strokeRate != "")
      html += `
        <div class="workout__details workout__details--${workout.type}">
          <span class="workout__icon">🚣</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">s/min</span>
        </div>     
    `;
    html += `</li>`;
    const size = this.#htmlRecord.size;
    this.#htmlRecord.set(size, html);
    this.#numPages = Math.ceil(this.#htmlRecord.size / 3);
    // // Insert HTML as sibling element at the end of the FORM
    this._activityRenders.insertAdjacentHTML("afterbegin", html);

    this._screenRender(this.#htmlRecord);
  }

  _screenRender(htmlRecord) {
    const classChange = document.querySelectorAll(".workout");
    const classArr = [...classChange];
    console.log(classArr);

    classArr.forEach((el, index) => {
      index > 2 ? (el.style.display = "none") : null;
    });
  }

  _clear() {
    this._activityRenders.innerHTML = "";
  }

  _nextSlide() {
    const classChange = document.querySelectorAll(".workout");
    const classArr = [...classChange];
    console.log(classArr);

    console.log("num pages: ", this.#numPages);
    if (this.#curPage === this.#numPages) return;

    classArr.forEach((record, index) => {
      const idx = index + 1;
      const elPage = Math.ceil(idx / 3);

      if (elPage != this.#curPage + 1) {
        record.style.display = "none";
        console.log("out: ", idx, this.#curPage, elPage, record);
      } else {
        record.style.display = "grid";
        console.log("in: ", idx, this.#curPage, elPage, record);
      }
    });
    this.#curPage += 1;
  }

  _prevSlide() {
    const classChange = document.querySelectorAll(".workout");
    const classArr = [...classChange];
    console.log(classArr);
    console.log("current page: ", this.#curPage);

    if (this.#curPage === 1) return;

    classArr.forEach((record, index) => {
      const idx = index + 1;
      const elPage = Math.ceil(idx / 3);

      if (elPage != this.#curPage - 1) {
        record.style.display = "none";
        console.log("out: ", idx, record);
      } else {
        record.style.display = "grid";
        console.log("in: ", idx, this.#curPage, record);
      }
    });
    this.#curPage -= 1;
  }

  _moveToActivity(e) {
    const activityEl = e.target.closest(".workout");
    console.log(activityEl);
    if (!activityEl) return;

    const activity = this.#activities.find(
      (work) => work.id === activityEl.dataset.id
    );

    this.#map.setView(activity.coords, this.#mapZoom, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _setLocalStorage() {
    localStorage.setItem("workouts", JSON.stringify(this.#activities));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("workouts"));
    if (!data) return;
    this.#activities = data;
    this.#activities.forEach((work) => this._renderWorkout(work));
  }

  _reset() {
    localStorage.removeItem("workouts");
    // location.reload();
  }
}
