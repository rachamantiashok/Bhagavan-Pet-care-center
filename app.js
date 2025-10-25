// Application Data
const appData = {
  website_name: "Bhagavan Pet Care Center",
  contact_email: "info@bhagavanpetcare.org",
  contact_phone: "+91-9876543210",
  address: "123 Pet Care Street, Animal Welfare Colony, City - 123456",
  sample_pets: [
    {
      name: "Buddy",
      type: "Dog",
      breed: "Golden Retriever Mix",
      age: "2 years",
      description: "Friendly and energetic, loves children and playing fetch",
      vaccinated: true,
      neutered: true
    },
    {
      name: "Whiskers",
      type: "Cat",
      breed: "Indian Domestic",
      age: "1 year",
      description: "Calm and affectionate, perfect for apartments",
      vaccinated: true,
      neutered: false
    },
    {
      name: "Luna",
      type: "Dog",
      breed: "Indian Pariah",
      age: "3 years",
      description: "Loyal guard dog, great with families",
      vaccinated: true,
      neutered: true
    }
  ],
  services: [
    {
      name: "Free Veterinary Checkups",
      description: "Monthly free health checkups for street animals and adopted pets",
      schedule: "Every Saturday 10 AM - 2 PM"
    },
    {
      name: "Vaccination Drives",
      description: "Regular vaccination camps in various localities",
      schedule: "First Sunday of every month"
    },
    {
      name: "Emergency Medical Care",
      description: "24/7 emergency medical assistance for injured street animals",
      schedule: "24x7 Emergency Helpline: 9876543211"
    },
    {
      name: "Pet Food Distribution",
      description: "Free pet food distribution for street animal feeders",
      schedule: "Mondays and Thursdays 5 PM - 7 PM"
    },
    {
      name: "Spaying/Neutering Programs",
      description: "Free sterilization programs to control street animal population",
      schedule: "By appointment - Call for scheduling"
    }
  ],
  donation_purposes: [
    "Emergency Medical Treatment",
    "Daily Food for Street Animals",
    "Shelter Maintenance",
    "Rescue Operations",
    "Vaccination Programs",
    "General Animal Welfare"
  ],
  volunteer_activities: [
    "Pet Walking and Exercise",
    "Feeding Street Animals",
    "Medical Transport Assistance",
    "Adoption Event Support",
    "Educational Outreach",
    "Fundraising Activities",
    "Social Media Management",
    "Photography for Adoptions"
  ]
};

// User data storage
let currentUser = {};
let selectedDonationAmount = 0;
let selectedDonationPurpose = '';

// Page Navigation
function showPage(pageId) {
  console.log('Navigating to page:', pageId);
  
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.classList.remove('active');
  });
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    console.log('Successfully navigated to:', pageId);
  } else {
    console.error('Page not found:', pageId);
  }
  
  // Scroll to top when changing pages
  window.scrollTo(0, 0);
}

// Modal functions
function hideModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.add('hidden');
  }
}

function showSuccessModal(title, message) {
  const modal = document.getElementById('successModal');
  const titleEl = document.getElementById('successTitle');
  const messageEl = document.getElementById('successMessage');
  
  if (!modal || !titleEl || !messageEl) return;
  
  titleEl.textContent = title;
  messageEl.textContent = message;
  modal.style.display = 'flex';
  modal.classList.remove('hidden');
}

// Login handler - FIXED VERSION
function handleLogin(e) {
  console.log('Login form submitted');
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const userData = {
    username: formData.get('username'),
    mobile: formData.get('mobile'),
    address: formData.get('address'),
    location: formData.get('location')
  };
  
  console.log('Form data:', userData);
  
  // Basic validation
  if (!userData.username || !userData.mobile || !userData.address || !userData.location) {
    showError('loginError', 'Please fill in all required fields');
    console.log('Validation failed - missing fields');
    return;
  }
  
  // Validate mobile number
  if (!/^[0-9]{10}$/.test(userData.mobile)) {
    showError('loginError', 'Please enter a valid 10-digit mobile number');
    console.log('Validation failed - invalid mobile number');
    return;
  }
  
  console.log('Validation passed');
  
  // Store user data
  currentUser = userData;
  
  // Update welcome message
  const welcomeMessage = document.getElementById('welcomeMessage');
  if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome, ${userData.username}! Thank you for joining our mission to help street animals.`;
  }
  
  // Pre-fill forms with user data
  prefillForms();
  
  console.log('Navigating to home page...');
  // Navigate to home page
  showPage('homePage');
}

// Pre-fill forms with user data
function prefillForms() {
  // Adoption form
  const adoptionName = document.getElementById('adoptionName');
  if (adoptionName) adoptionName.value = currentUser.username || '';
  
  // Volunteer form
  const volunteerName = document.getElementById('volunteerName');
  if (volunteerName) volunteerName.value = currentUser.username || '';
  
  // Service request form
  const requesterName = document.getElementById('requesterName');
  if (requesterName) requesterName.value = currentUser.username || '';
  
  // Donation form
  const donorName = document.getElementById('donorName');
  if (donorName) donorName.value = currentUser.username || '';
}

// Error display
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    setTimeout(() => {
      errorElement.classList.add('hidden');
    }, 5000);
  }
}

// Generate pets grid
function generatePetsGrid() {
  const petsGrid = document.getElementById('petsGrid');
  if (!petsGrid) return;
  
  petsGrid.innerHTML = '';
  
  appData.sample_pets.forEach(pet => {
    const petCard = document.createElement('div');
    petCard.className = 'pet-card';
    
    const petEmoji = pet.type === 'Dog' ? '🐕' : pet.type === 'Cat' ? '🐱' : '🐾';
    
    petCard.innerHTML = `
      <div class="pet-photo">${petEmoji}</div>
      <div class="pet-info">
        <h4>${pet.name}</h4>
        <div class="pet-details">
          <p><strong>Type:</strong> ${pet.type}</p>
          <p><strong>Breed:</strong> ${pet.breed}</p>
          <p><strong>Age:</strong> ${pet.age}</p>
        </div>
        <p class="pet-description">${pet.description}</p>
        <div class="pet-status">
          <span class="status-badge ${pet.vaccinated ? 'vaccinated' : 'not-vaccinated'}">
            ${pet.vaccinated ? '✅ Vaccinated' : '⏳ Vaccination Pending'}
          </span>
          <span class="status-badge ${pet.neutered ? 'vaccinated' : 'not-vaccinated'}">
            ${pet.neutered ? '✅ Neutered' : '⏳ Neutering Pending'}
          </span>
        </div>
      </div>
    `;
    
    petsGrid.appendChild(petCard);
  });
}

// Generate services grid
function generateServicesGrid() {
  const servicesGrid = document.getElementById('servicesGrid');
  if (!servicesGrid) return;
  
  servicesGrid.innerHTML = '';
  
  appData.services.forEach(service => {
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card';
    
    serviceCard.innerHTML = `
      <h4>${service.name}</h4>
      <p>${service.description}</p>
      <div class="service-schedule">
        <strong>Schedule:</strong> ${service.schedule}
      </div>
    `;
    
    servicesGrid.appendChild(serviceCard);
  });
}

// Generate donation purposes
function generateDonationPurposes() {
  const purposeOptions = document.getElementById('purposeOptions');
  if (!purposeOptions) return;
  
  purposeOptions.innerHTML = '';
  
  appData.donation_purposes.forEach((purpose, index) => {
    const purposeOption = document.createElement('div');
    purposeOption.className = 'purpose-option';
    
    purposeOption.innerHTML = `
      <input type="radio" id="purpose${index}" name="donationPurpose" value="${purpose}">
      <label for="purpose${index}">${purpose}</label>
    `;
    
    purposeOption.addEventListener('click', () => {
      const radioInput = document.getElementById(`purpose${index}`);
      if (radioInput) {
        radioInput.checked = true;
        selectedDonationPurpose = purpose;
        document.querySelectorAll('.purpose-option').forEach(opt => opt.classList.remove('selected'));
        purposeOption.classList.add('selected');
      }
    });
    
    purposeOptions.appendChild(purposeOption);
  });
}

// Generate volunteer activities
function generateVolunteerActivities() {
  const activitiesGrid = document.getElementById('activitiesGrid');
  const activitiesCheckbox = document.getElementById('activitiesCheckbox');
  
  // Activities grid for display
  if (activitiesGrid) {
    activitiesGrid.innerHTML = '';
    appData.volunteer_activities.forEach(activity => {
      const activityCard = document.createElement('div');
      activityCard.className = 'activity-card';
      activityCard.innerHTML = `
        <h4>${activity}</h4>
        <p>Help make a difference through ${activity.toLowerCase()}</p>
      `;
      activitiesGrid.appendChild(activityCard);
    });
  }
  
  // Checkbox group for form
  if (activitiesCheckbox) {
    activitiesCheckbox.innerHTML = '';
    appData.volunteer_activities.forEach((activity, index) => {
      const checkboxLabel = document.createElement('label');
      checkboxLabel.className = 'checkbox-label';
      checkboxLabel.innerHTML = `
        <input type="checkbox" id="activity${index}" name="activities" value="${activity}">
        <span>${activity}</span>
      `;
      activitiesCheckbox.appendChild(checkboxLabel);
    });
  }
}

// Donation amount selection
function selectDonationAmount(button) {
  const amount = button.getAttribute('data-amount');
  if (amount) {
    selectedDonationAmount = parseInt(amount);
    document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    
    const customAmount = document.getElementById('customAmount');
    if (customAmount) {
      customAmount.value = '';
    }
  }
}

// Form submission handlers
function handleAdoptionSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const adoptionData = {
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    petType: formData.get('petType'),
    homeType: formData.get('homeType'),
    experience: formData.get('experience'),
    familyMembers: formData.get('familyMembers'),
    additionalInfo: formData.get('additionalInfo'),
    userInfo: currentUser
  };
  
  console.log('Adoption Application:', adoptionData);
  showSuccessModal('Adoption Application Submitted!', 'Thank you for your adoption application. Our team will contact you within 2-3 business days to proceed with the adoption process.');
  e.target.reset();
}

function handleDonationSubmit(e) {
  e.preventDefault();
  
  if (!selectedDonationAmount) {
    alert('Please select or enter a donation amount');
    return;
  }
  
  if (!selectedDonationPurpose) {
    alert('Please select how you would like to help');
    return;
  }
  
  const formData = new FormData(e.target);
  const monthlyDonation = document.getElementById('monthlyDonation');
  const donationData = {
    amount: selectedDonationAmount,
    purpose: selectedDonationPurpose,
    donorName: formData.get('donorName'),
    donorEmail: formData.get('donorEmail'),
    donorPhone: formData.get('donorPhone'),
    isMonthly: monthlyDonation ? monthlyDonation.checked : false,
    userInfo: currentUser
  };
  
  console.log('Donation Data:', donationData);
  showSuccessModal('Thank You for Your Donation!', `Your donation of ₹${selectedDonationAmount} for ${selectedDonationPurpose} will help us continue our mission. This is a simulated payment - in a real application, you would be redirected to a payment gateway.`);
  e.target.reset();
  resetDonationSelection();
}

function handleVolunteerSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const selectedActivities = Array.from(document.querySelectorAll('input[name="activities"]:checked')).map(cb => cb.value);
  
  const volunteerData = {
    volunteerName: formData.get('volunteerName'),
    volunteerEmail: formData.get('volunteerEmail'),
    volunteerPhone: formData.get('volunteerPhone'),
    volunteerAge: formData.get('volunteerAge'),
    availability: formData.get('availability'),
    selectedActivities: selectedActivities,
    volunteerExperience: formData.get('volunteerExperience'),
    userInfo: currentUser
  };
  
  console.log('Volunteer Registration:', volunteerData);
  showSuccessModal('Volunteer Registration Successful!', 'Welcome to our volunteer team! We will contact you soon with information about upcoming volunteer opportunities and orientation sessions.');
  e.target.reset();
}

function handleServiceRequestSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const serviceRequestData = {
    requesterName: formData.get('requesterName'),
    requesterPhone: formData.get('requesterPhone'),
    serviceType: formData.get('serviceType'),
    urgency: formData.get('urgency'),
    animalDetails: formData.get('animalDetails'),
    requestLocation: formData.get('requestLocation'),
    userInfo: currentUser
  };
  
  console.log('Service Request:', serviceRequestData);
  
  let responseMessage = 'Your service request has been submitted successfully. ';
  if (serviceRequestData.urgency === 'emergency') {
    responseMessage += 'Since this is an emergency, please also call our 24/7 helpline at +91-9876543211.';
  } else if (serviceRequestData.urgency === 'urgent') {
    responseMessage += 'We will respond within 24 hours.';
  } else {
    responseMessage += 'We will respond within a week.';
  }
  
  showSuccessModal('Service Request Submitted!', responseMessage);
  e.target.reset();
}

function handleSuggestionSubmit() {
  const suggestionText = document.getElementById('suggestionText');
  if (!suggestionText) return;
  
  const suggestionValue = suggestionText.value.trim();
  
  if (!suggestionValue) {
    alert('Please enter your suggestion or feedback');
    return;
  }
  
  const suggestionData = {
    suggestion: suggestionValue,
    userInfo: currentUser,
    timestamp: new Date().toISOString()
  };
  
  console.log('Suggestion submitted:', suggestionData);
  showSuccessModal('Thank You for Your Feedback!', 'Your suggestion has been recorded and will be reviewed by our team. We appreciate your input in helping us improve our services.');
  suggestionText.value = '';
}

// Reset donation selection
function resetDonationSelection() {
  selectedDonationAmount = 0;
  selectedDonationPurpose = '';
  document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('selected'));
  document.querySelectorAll('.purpose-option').forEach(opt => opt.classList.remove('selected'));
  const customAmount = document.getElementById('customAmount');
  if (customAmount) {
    customAmount.value = '';
  }
}

// Modal setup and handling
function setupModal() {
  const modal = document.getElementById('successModal');
  const closeBtn = document.getElementById('closeModal');
  
  if (!modal || !closeBtn) return;
  
  // Force hide modal
  modal.style.display = 'none';
  modal.classList.add('hidden');
  
  // Remove any existing event listeners and add new ones
  const newCloseBtn = closeBtn.cloneNode(true);
  closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
  
  newCloseBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    hideModal();
  });
  
  // Close modal when clicking overlay
  modal.addEventListener('click', function(e) {
    if (e.target === modal || e.target.classList.contains('modal-overlay')) {
      hideModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display !== 'none') {
      hideModal();
    }
  });
}

// Navigation setup
function setupNavigation() {
  // Home page option cards
  document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', () => {
      const targetPage = card.getAttribute('data-page');
      if (targetPage) {
        console.log('Option card clicked:', targetPage);
        showPage(targetPage);
      }
    });
  });
  
  // Back buttons
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = btn.getAttribute('data-page');
      if (targetPage) {
        console.log('Back button clicked:', targetPage);
        showPage(targetPage);
      }
    });
  });
}

// Initialize the application
function initializeApp() {
  console.log('Initializing application...');
  
  // CRITICAL: Ensure modal is completely hidden on load
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.add('hidden');
  }
  
  // Set up modal handlers FIRST
  setupModal();
  
  // Set up login form handler
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    console.log('Setting up login form handler');
    loginForm.addEventListener('submit', handleLogin);
  } else {
    console.error('Login form not found');
  }
  
  // Set up other forms
  const adoptionForm = document.getElementById('adoptionForm');
  if (adoptionForm) {
    adoptionForm.addEventListener('submit', handleAdoptionSubmit);
  }
  
  const donationForm = document.getElementById('donationForm');
  if (donationForm) {
    donationForm.addEventListener('submit', handleDonationSubmit);
  }
  
  const volunteerForm = document.getElementById('volunteerForm');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', handleVolunteerSubmit);
  }
  
  const serviceRequestForm = document.getElementById('serviceRequestForm');
  if (serviceRequestForm) {
    serviceRequestForm.addEventListener('submit', handleServiceRequestSubmit);
  }
  
  const submitSuggestion = document.getElementById('submitSuggestion');
  if (submitSuggestion) {
    submitSuggestion.addEventListener('click', handleSuggestionSubmit);
  }
  
  // Set up donation amount buttons
  document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      selectDonationAmount(btn);
    });
  });
  
  // Set up custom amount input
  const customAmount = document.getElementById('customAmount');
  if (customAmount) {
    customAmount.addEventListener('input', (e) => {
      if (e.target.value) {
        selectedDonationAmount = parseInt(e.target.value);
        document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('selected'));
      }
    });
  }
  
  // Set up navigation event listeners
  setupNavigation();
  
  // Generate dynamic content
  generatePetsGrid();
  generateServicesGrid();
  generateDonationPurposes();
  generateVolunteerActivities();
  
  console.log('Application initialized successfully');
}

// Phone number validation
function validatePhoneNumber(phone) {
  return /^[0-9]{10}$/.test(phone);
}

// Email validation
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - Starting initialization');
  
  // Initialize main app
  initializeApp();
  
  // Add real-time validation to phone inputs
  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', (e) => {
      const phone = e.target.value.replace(/\D/g, '');
      e.target.value = phone;
      
      if (phone.length === 10) {
        e.target.style.borderColor = 'var(--color-success)';
      } else if (phone.length > 0) {
        e.target.style.borderColor = 'var(--color-warning)';
      } else {
        e.target.style.borderColor = 'var(--color-border)';
      }
    });
  });
  
  // Add real-time validation to email inputs
  document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', (e) => {
      if (e.target.value && validateEmail(e.target.value)) {
        e.target.style.borderColor = 'var(--color-success)';
      } else if (e.target.value) {
        e.target.style.borderColor = 'var(--color-error)';
      } else {
        e.target.style.borderColor = 'var(--color-border)';
      }
    });
  });
});

// Add some helpful console messages
console.log('🐾 Bhagavan Pet Care Center - Web Application Loaded');
console.log('This is a demo application for pet adoption and care services.');
console.log('All form submissions are logged to the console and no real data is transmitted.');