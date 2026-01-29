const swiper = new Swiper(".swiper", {
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  effect: "fade",
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

let menu = document.querySelector(".menu");
let nums = document.querySelectorAll(".num");
let start = false;

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("sticky", window.scrollY > 0);

  if (window.scrollY >= menu.offsetTop) {
    if (!start) {
      nums.forEach((num) => {
        startCount(num);
      });
    }
    start = true;
  }
});

const startCount = (el) => {
  let max = el.dataset.val;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent === max) {
      clearInterval(count);
    }
  }, 2000 / nums);
};

// Navigation Links
const navLinks = document.querySelectorAll(".navigation a");
let cartCount = 0;

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    
    // Check if it's a section link (starts with #)
    if (href && href.startsWith("#")) {
      e.preventDefault();
      
      // Handle Cart link
      if (href === "#cart") {
        if (cartCount === 0) {
          alert("Your cart is empty. Browse our shop to add items!");
        } else {
          alert(`You have ${cartCount} item(s) in your cart.`);
        }
      }
      // Handle Home link
      else if (href === "#home" || link.textContent.trim() === "Home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } 
      // Handle other section links
      else {
        const section = document.querySelector(href);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  });
});

// Add to Cart functionality
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cartCount++;
    const cartBadge = document.querySelector(".navigation a:last-child::after");
    alert("Item added to cart!");
    // Update cart badge if it exists
    const badge = document.querySelector(".navigation a[href='#cart'] i");
    if (badge && badge.parentElement) {
      badge.parentElement.setAttribute("data-count", cartCount);
    }
  });
});

// Button Event Listeners
const bannerBtn1 = document.querySelector(".banner-btn-1");
const bannerBtn2 = document.querySelector(".banner-btn-2");
const menuBtn = document.querySelector(".menu-btn");
const contactBtn = document.querySelector(".contact-btn");

// Order Now button - scroll to contact section
if (bannerBtn1) {
  bannerBtn1.addEventListener("click", () => {
    document.querySelector(".contact").scrollIntoView({ behavior: "smooth" });
  });
}

// View Menu button - scroll to menu section
if (bannerBtn2) {
  bannerBtn2.addEventListener("click", () => {
    document.querySelector(".menu").scrollIntoView({ behavior: "smooth" });
  });
}

// View Full Menu button - scroll to menu section
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    document.querySelector(".menu").scrollIntoView({ behavior: "smooth" });
  });
}

// Appointment button - submit form
if (contactBtn) {
  contactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Thank you for your reservation! We will contact you shortly.");
  });
}