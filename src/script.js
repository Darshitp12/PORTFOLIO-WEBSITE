// Toggle sidebar
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const body = document.body;

// Function to open sidebar
function openSidebar() {
  sidebar.classList.add('open');
  body.classList.remove('sidebar-closed');
  
  // Update menu button icon
  const menuIcon = menuBtn.querySelector('i');
  menuIcon.classList.remove('fa-bars');
  menuIcon.classList.add('fa-times');
}

// Function to close sidebar
function closeSidebar() {
  sidebar.classList.remove('open');
  body.classList.add('sidebar-closed');
  
  // Update menu button icon
  const menuIcon = menuBtn.querySelector('i');
  menuIcon.classList.remove('fa-times');
  menuIcon.classList.add('fa-bars');
}

// Toggle sidebar function
function toggleSidebar() {
  if (sidebar.classList.contains('open')) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

// Event listeners for sidebar toggle
menuBtn.addEventListener('click', toggleSidebar);
closeBtn.addEventListener('click', closeSidebar);

// Toggle theme
const themeBtn = document.getElementById('themeBtn');

function toggleTheme() {
  body.classList.toggle('dark-theme');
  
  // Update theme button icon
  const themeIcon = themeBtn.querySelector('i');
  if (body.classList.contains('dark-theme')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
}

themeBtn.addEventListener('click', toggleTheme);

// Active navigation link
const navLinks = document.querySelectorAll('.sidebar ul li a');

function setActiveLink() {
  let currentSection = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= (sectionTop - 300)) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);

// Form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Normally, you would send form data to server here
  alert('Your message has been sent. Thank you!');
  contactForm.reset();
});

// Animate skill bars on scroll
function animateSkills() {
  const skillSection = document.querySelector('.skills');
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const sectionPos = skillSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.3;
  
  if (sectionPos < screenPos) {
    skillBars.forEach(skill => {
      const width = skill.style.width;
      skill.style.width = "0";
      setTimeout(() => {
        skill.style.width = width;
      }, 300);
    });
    
    // Remove event listener after animation
    window.removeEventListener('scroll', animateSkills);
  }
}

// Initialize the page correctly
window.addEventListener('DOMContentLoaded', function() {
  // Set initial state - sidebar closed on mobile, open on desktop
  if (window.innerWidth <= 1200) {
    body.classList.add('sidebar-closed');
    sidebar.classList.remove('open');
  } else {
    body.classList.remove('sidebar-closed');
    sidebar.classList.add('open');
  }
  
  setActiveLink();
});

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', setActiveLink);