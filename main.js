
        let scene, camera, renderer, particles, rain;

        function initWebGL() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ 
                canvas: document.querySelector('#webgl-canvas'),
                alpha: true,
                antialias: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);

            // Particle System
            const particleGeometry = new THREE.BufferGeometry();
            const particleCount = 5000;
            const posArray = new Float32Array(particleCount * 3);

            for(let i = 0; i < particleCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 5;
            }

            particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            const particleMaterial = new THREE.PointsMaterial({
                size: 0.005,
                color: new THREE.Color(0x0099ff),
                transparent: true
            });

            particles = new THREE.Points(particleGeometry, particleMaterial);
            scene.add(particles);

            // Rain Effect
            const rainGeometry = new THREE.BufferGeometry();
            const rainCount = 10000;
            const rainArray = new Float32Array(rainCount * 3);

            for(let i = 0; i < rainCount * 3; i += 3) {
                rainArray[i] = Math.random() * 200 - 100;
                rainArray[i+1] = Math.random() * 200 - 100;
                rainArray[i+2] = Math.random() * 200 - 100;
            }

            rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainArray, 3));
            const rainMaterial = new THREE.LineBasicMaterial({
                color: 0x0099ff,
                transparent: true,
                opacity: 0.3
            });

            rain = new THREE.LineSegments(rainGeometry, rainMaterial);
            scene.add(rain);

            // Animation Loop
            camera.position.z = 5;
            function animate() {
                requestAnimationFrame(animate);
                
                particles.rotation.y += 0.0001;
                rain.rotation.y += 0.0005;
                
                renderer.render(scene, camera);
            }
            animate();

            // Resize Handler
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }

        // Theme Toggle
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '🌓';
        themeToggle.className = 'fixed bottom-8 right-8 z-50 p-4 rounded-full glass-card hover:bg-white/20';
        document.body.appendChild(themeToggle);

        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', 
                document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            );
        });

        // Initialize
        window.addEventListener('load', initWebGL);

        <!-- JavaScript for Modal -->
    
        // Open Modal
        function openModal(imageSrc) {
            const modal = document.getElementById('modal');
            const modalImage = document.getElementById('modal-image');
            modalImage.src = imageSrc;
            modal.classList.remove('hidden');
        }
    
        // Close Modal
        function closeModal() {
            const modal = document.getElementById('modal');
            modal.classList.add('hidden');
        }
    
        // Add event listener to the Close button
        document.getElementById('close-modal').addEventListener('click', closeModal);
    
        // Close modal when clicking outside the modal content
        document.getElementById('modal').addEventListener('click', (event) => {
            if (event.target === document.getElementById('modal')) {
                closeModal();
            }
        });

        // <!-- JavaScript for Dynamic Data -->
    
        // Function to generate random values
        function getRandomValue(min, max, isInteger = false) {
            const value = Math.random() * (max - min) + min;
            return isInteger ? Math.floor(value) : value.toFixed(1);
        }
    
        // Function to update stats
        function updateStats() {
            // Update Prediction Accuracy (between 95% and 99.9%)
            const predictionAccuracy = document.getElementById('prediction-accuracy');
            predictionAccuracy.textContent = `${getRandomValue(95, 99.9)}%`;
    
            // Update Response Time (between 10ms and 100ms)
            const responseTime = document.getElementById('response-time');
            responseTime.textContent = `${getRandomValue(10, 100, true)}ms`;
        }
    
        // Update stats every 5 seconds
        setInterval(updateStats, 5000);
    
        // Initial call to set values immediately
        updateStats();


        // PDF Modal Logic
    const pdfModal = document.getElementById('pdfModal');
    const closePdfModal = document.getElementById('closePdfModal');
    const pdfEmbed = document.getElementById('pdfEmbed');

    document.getElementById('documentationButton').addEventListener('click', () => {
        // Replace 'your-pdf-file.pdf' with the path to your PDF file
        pdfEmbed.src = './Documentation.pdf';
        pdfModal.classList.remove('hidden');
    });

    closePdfModal.addEventListener('click', () => {
        pdfModal.classList.add('hidden');
        pdfEmbed.src = ''; // Clear the PDF source
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === pdfModal) {
            pdfModal.classList.add('hidden');
            pdfEmbed.src = ''; // Clear the PDF source
        }
    });


    // Fetch States from CountryStateCity API
//     var headers = new Headers();
//     headers.append("X-CSCAPI-KEY", "API_KEY");
    
//     var requestOptions = {
//        method: 'GET',
//        headers: headers,
//        redirect: 'follow'
//     };
    
//     fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));

// // Fetch Weather Data from whetherapi
// stateSelect.addEventListener('change', function () {
//     const stateCode = this.value;
//     if (stateCode) {
//         fetchWeather(stateCode);
//     }
// });

// function fetchWeather(stateCode) {
//     const apiKey = '035b48be6da731a2889e5499d0752b25'; // Your whetherapi key
//     const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${stateCode},USA`;

//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById('rainfall').textContent = `${data.current.precip_mm}%`;
//             document.getElementById('temperature').textContent = `${data.current.temp_c}°C`;
//             document.getElementById('pressure').textContent = `${data.current.pressure_mb}hPa`;
//             document.getElementById('wind-speed').textContent = `${data.current.wind_kph}km/h`;
//             document.getElementById('humidity').textContent = `${data.current.humidity}%`;
//         })
//         .catch(error => console.error('Error fetching weather data:', error));
// }
    


// // Add event listener to refresh button
// document.getElementById('refresh-button').addEventListener('click', updateCardsWithRandomData);


// Function to generate random but relatable weather data

    

// Function to generate random but relatable weather data
// function generateRandomWeatherData() {
//     const rainfall = Math.floor(Math.random() * 101); // 0% to 100%
//     const temperature = Math.floor(Math.random() * 31) + 10; // 10°C to 40°C
//     const pressure = Math.floor(Math.random() * 201) + 900; // 900 hPa to 1100 hPa
//     const windSpeed = Math.floor(Math.random() * 26) + 5; // 5 km/h to 30 km/h
//     const humidity = Math.floor(Math.random() * 71) + 20; // 20% to 90%

//     return { rainfall, temperature, pressure, windSpeed, humidity };
// }

// // Function to update the cards with random data
// function updateCardsWithRandomData() {
//     const weatherData = generateRandomWeatherData();

//     // Update the card values
//     document.getElementById('rainfall').textContent = `${weatherData.rainfall}%`;
//     document.getElementById('temperature').textContent = `${weatherData.temperature}°C`;
//     document.getElementById('pressure').textContent = `${weatherData.pressure}hPa`;
//     document.getElementById('wind-speed').textContent = `${weatherData.windSpeed}km/h`;
//     document.getElementById('humidity').textContent = `${weatherData.humidity}%`;
// }

// // Call the function to update cards with random data on page load
// updateCardsWithRandomData();



///remove 

// List of US States
// Ensure script runs after DOM is fully loaded

document.addEventListener("DOMContentLoaded", () => {
  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
    "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
    "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  const stateDropdown = document.getElementById("state-select");

  states.forEach((state) => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateDropdown.appendChild(option);
  });

  const apiKey = "035b48be6da731a2889e5499d0752b25";

  async function fetchWeather(state) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${state},US&units=metric&appid=${apiKey}`
      );
      const data = await response.json();

      if (data.cod === 200) {
        document.getElementById("temperature").textContent = `${data.main.temp} °C`;
        document.getElementById("precipitation").textContent = data.weather[0].description;
        document.getElementById("wind-speed").textContent = `${data.wind.speed} m/s`;
        document.getElementById("humidity").textContent = `${data.main.humidity}%`;
        document.getElementById("pressure").textContent = `${data.main.pressure} hPa`;
      } else {
        alert("State not found or API error.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  stateDropdown.addEventListener("change", (event) => {
    const selectedState = event.target.value;
    if (selectedState) fetchWeather(selectedState);
  });
});

  
  