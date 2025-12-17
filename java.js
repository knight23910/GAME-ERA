
// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    } else {
      entry.target.classList.remove('animate');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});


//navbar 
 const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('open');
  });


//horizontel scroll
  const container = document.getElementById('scrollContainer');

    container.addEventListener('wheel', function(e) {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    });


     const shareContainer = document.querySelector('.share-container');
  const shareButton = document.querySelector('.share-button');

  function toggleShareMenu() {
    shareContainer.classList.toggle('active');
  }

  // Close share menu when clicking outside of it
  document.addEventListener('click', function (e) {
    if (!shareContainer.contains(e.target)) {
      shareContainer.classList.remove('active');
    }
  });
// java.js

// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to fetch JSON data
async function fetchGameData() {
    try {
        const response = await fetch('data/game.json'); // Replace with your JSON file path
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching game data:', error);
        return null;
    }
}

// Function to populate page with game data
function populatePage(gameData) {
    // Set page title
    document.getElementById('pageTitle').textContent = `${gameData.title} - Game Download`;
    
    // Set game title
    document.getElementById('gameTitle').textContent = gameData.title;
    
    // Set download title
    document.getElementById('downloadTitle').textContent = gameData.title;
    
    // Set game description
    document.getElementById('gameDescription').textContent = gameData.description;
    
    // Populate slider images
    const sliderContainer = document.getElementById('sliderImages');
    gameData.sliderImages.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `${gameData.title} screenshot`;
        sliderContainer.appendChild(img);
    });
    
    // Populate system requirements
    const sysReqList = document.getElementById('sysReq');
    for (const [key, value] of Object.entries(gameData.systemRequirements)) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${key}:</strong> ${value}`;
        sysReqList.appendChild(li);
    }
    
    // Populate game info
    const gameInfoList = document.getElementById('gameInfo');
    for (const [key, value] of Object.entries(gameData.gameInfo)) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${key}:</strong> ${value}`;
        gameInfoList.appendChild(li);
    }
    
    // Populate application details
    const appDetailsList = document.getElementById('appDetails');
    for (const [key, value] of Object.entries(gameData.applicationDetails)) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${key}:</strong> ${value}`;
        appDetailsList.appendChild(li);
    }
    
    // Set download link
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = gameData.downloadLink;
    downloadLink.textContent = `Download ${gameData.title}`;
}

// Function to initialize slider functionality
function initSlider() {
    const slider = document.querySelector('.slider');
    const images = slider.querySelectorAll('img');
    let currentIndex = 0;
    
    // Set initial active image
    if (images.length > 0) {
        images[0].classList.add('active');
    }
    
    // Auto-advance slider
    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 5000); // Change image every 5 seconds
}

// Function to handle scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Main initialization function
async function init() {
    // Get game ID from URL parameter or default to 'gtav'
    const gameId = getUrlParameter('game') || 'gtav';
    
    // Fetch game data
    const gameData = await fetchGameData();
    
    if (gameData && gameData[gameId]) {
        // Populate page with specific game data
        populatePage(gameData[gameId]);
        
        // Initialize slider
        initSlider();
        
        // Initialize scroll animations
        initScrollAnimations();
    } else {
        // Handle case where game data is not found
        document.getElementById('gameTitle').textContent = 'Game Not Found';
        console.error('Game data not found for ID:', gameId);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);