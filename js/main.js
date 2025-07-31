/**
 * PixelFrames Studios - Main JavaScript
 * Enhanced with smooth animations and robust form handling
 */

class PixelFramesStudio {
  constructor() {
    this.init();
  }

  init() {
    // Initialize all components
    this.handleForms();
    this.setupMobileNav();
    this.initPortfolioFilter();
    this.setupAnimations();
    this.addStudioBranding(); // New branding method
  }

  // 1. Enhanced Form Handling
  handleForms() {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Visual feedback
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spinner" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
          </svg> Sending...
        `;

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            this.showSuccessMessage(form);
            setTimeout(() => {
              window.location.href = form.querySelector('[name="_next"]').value;
            }, 1500);
          } else {
            throw new Error('Submission failed');
          }
        } catch (error) {
          this.showErrorMessage(form);
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      });
    });
  }

  // 2. Dynamic Mobile Navigation
  setupMobileNav() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const mobileBtn = document.createElement('button');
    mobileBtn.className = 'mobile-menu-btn';
    mobileBtn.setAttribute('aria-label', 'Toggle menu');
    mobileBtn.innerHTML = '☰';
    nav.prepend(mobileBtn);

    mobileBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      document.body.classList.toggle('nav-active');
    });
  }

  // 3. Portfolio Filter System
  initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.filter;
        document.querySelectorAll('.portfolio-item').forEach(item => {
          item.style.display = (category === 'all' || item.dataset.category === category) 
            ? 'block' : 'none';
        });
        
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  // 4. Animation System
  setupAnimations() {
    const animateOnScroll = () => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.75) {
          el.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
  }

  // 5. New: Dynamic Branding
  addStudioBranding() {
    // Update copyright text dynamically
    const copyright = document.querySelector('.copyright');
    if (copyright) {
      copyright.innerHTML = `&copy; ${new Date().getFullYear()} PixelFrames Studios. All rights reserved.`;
    }

    // Console branding (for debugging)
    console.log('%cPixelFrames Studios', 'color: #6a11cb; font-size: 16px; font-weight: bold;');
    console.log('%cProfessional Video Editing Services', 'color: #2575fc;');
  }

  // Helper Methods
  showSuccessMessage(form) {
    const successMsg = document.createElement('div');
    successMsg.className = 'alert success';
    successMsg.innerHTML = `
      <svg viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
      <span>Message sent successfully!</span>
    `;
    form.parentNode.insertBefore(successMsg, form.nextSibling);
    setTimeout(() => successMsg.remove(), 3000);
  }

  showErrorMessage(form) {
    const errorMsg = document.createElement('div');
    errorMsg.className = 'alert error';
    errorMsg.textContent = 'Error sending message. Please try again.';
    form.appendChild(errorMsg);
    setTimeout(() => errorMsg.remove(), 5000);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PixelFramesStudio();
});
