 let scrollTriggered = false;
    let currentSection = 'hero';
    const sectionOrder = ['hero', 'square-plate', 'round-plate', 'deep-shape', 'tray', 'sustainable', 'sustainable2', 'core-values', 'featured-products', 'industries', 'business', 'events', 'testimonials', 'blog', 'footer'];

    // Initialize AOS
    document.addEventListener('DOMContentLoaded', () => {
      AOS.init({
        duration: 800,
        once: true
      });
    });

    // Load navbar
    document.addEventListener('DOMContentLoaded', () => {
      fetch('./navbar.html')
        .then(r => r.text())
        .then(html => {
          document.getElementById('navbar-container').innerHTML = html;
          setupDropdowns();
        });
    });

    // Handle hero section click to transition to square plate section

    // document.getElementById('hero-section').addEventListener('click', () => {
    //   navigateToSection('square-plate');
    // });

    // Navigation function to handle transitions between any sections
    function navigateToSection(targetSection) {
      if (currentSection === targetSection || scrollTriggered) return;

      scrollTriggered = true;

      // Get current section index and target section index
      const currentIndex = sectionOrder.indexOf(currentSection);
      const targetIndex = sectionOrder.indexOf(targetSection);

      // Determine if we're going forward or backward
      const isForward = targetIndex > currentIndex;

      // Update navigation dots
      updateNavigationDots(targetSection);

      if (isForward) {
        // Forward navigation with appropriate animations
        forwardTransition(currentSection, targetSection);
      } else {
        // Backward navigation
        backwardTransition(currentSection, targetSection);
      }
    }

    function forwardTransition(fromSection, toSection) {
      // Get the current section element
      const currentSectionEl = document.getElementById(`${fromSection}-section`);

      // Apply appropriate animation based on the current section
      if (fromSection !== 'hero' && fromSection !== 'core-values' && fromSection !== 'sustainable' &&
        fromSection !== 'sustainable2' && fromSection !== 'featured-products' && fromSection !== 'industries' &&
        fromSection !== 'business' && fromSection !== 'events' && fromSection !== 'testimonials' && fromSection !== 'blog' &&
        fromSection !== 'footer') {
        const currentWrapper = document.querySelector(`#${fromSection}-section .plate-wrapper`);

        // Different animation based on which section we're transitioning from
        if (fromSection === 'square-plate') {
          currentWrapper.classList.add('fall-animation');
        } else {
          currentWrapper.classList.add('dive-animation');
        }

        // Reset background text animation
        const currentBackgroundText = document.getElementById(`${fromSection}-background-text`);
        if (currentBackgroundText) {
          currentBackgroundText.style.animation = 'none';
          currentBackgroundText.style.opacity = '0';
        }
      } else {
        // For hero section or sustainable sections, just fade out
        currentSectionEl.style.transition = 'opacity 0.5s ease-out';
        currentSectionEl.style.opacity = '0';
      }

      // After animation completes, switch sections
      setTimeout(() => {
        // Hide current section
        currentSectionEl.style.display = 'none';

        // Reset animations if needed
        if (fromSection !== 'hero' && fromSection !== 'core-values' && fromSection !== 'sustainable' &&
          fromSection !== 'sustainable2' && fromSection !== 'featured-products' && fromSection !== 'industries' &&
          fromSection !== 'business' && fromSection !== 'events' && fromSection !== 'testimonials' && fromSection !== 'blog' &&
          fromSection !== 'footer') {
          const currentWrapper = document.querySelector(`#${fromSection}-section .plate-wrapper`);
          currentWrapper.classList.remove('fall-animation');
          currentWrapper.classList.remove('dive-animation');
        }

        // Show target section
        const targetSectionEl = document.getElementById(`${toSection}-section`);
        targetSectionEl.style.display = 'block';

        // For hero section or sustainable sections, we need to reset opacity
        if (fromSection === 'hero' || fromSection === 'core-values' || fromSection === 'sustainable' ||
          fromSection === 'sustainable2' || fromSection === 'featured-products' || fromSection === 'industries' ||
          fromSection === 'business' || fromSection === 'events' || fromSection === 'testimonials' || fromSection === 'blog' ||
          fromSection === 'footer') {
          currentSectionEl.style.opacity = '1';
        }

        // Trigger background text animation for product sections
        if (toSection !== 'hero' && toSection !== 'core-values' && toSection !== 'sustainable' &&
          toSection !== 'sustainable2' && toSection !== 'featured-products' && toSection === 'industries' &&
          toSection === 'business' || toSection === 'events' || toSection === 'testimonials' || toSection === 'blog' ||
          toSection === 'footer') {
          setTimeout(() => {
            const targetBackgroundText = document.getElementById(`${toSection}-background-text`);
            if (targetBackgroundText) {
              targetBackgroundText.style.animation = 'fadeInText 1.5s ease forwards';
              targetBackgroundText.style.opacity = '1';
            }
          }, 100);
        }

        // Reinitialize AOS for sustainable sections
        if (toSection === 'core-values' || toSection === 'sustainable' ||
          toSection === 'sustainable2' || toSection === 'featured-products' || toSection === 'industries' ||
          toSection === 'business' || toSection === 'events' || toSection === 'testimonials' || toSection === 'blog' ||
          toSection === 'footer') {
          AOS.refresh();
        }

        // Update current section and reset scroll trigger
        currentSection = toSection;
        scrollTriggered = false;
      }, (fromSection === 'hero' || fromSection === 'core-values' || fromSection === 'sustainable' ||
        fromSection === 'sustainable2' || fromSection === 'featured-products' || fromSection === 'industries' ||
        fromSection === 'business' || fromSection === 'events' || fromSection === 'testimonials' || fromSection === 'blog' ||
        fromSection === 'footer') ? 500 : 1200); // Different timing based on animation
    }

    function backwardTransition(fromSection, toSection) {
      // Reset background text animation for current section
      if (fromSection !== 'hero' && fromSection !== 'core-values' && fromSection !== 'sustainable' &&
        fromSection !== 'sustainable2' && fromSection !== 'featured-products' && fromSection !== 'industries' &&
        fromSection !== 'business' && fromSection !== 'events' && fromSection !== 'testimonials' && fromSection !== 'blog' &&
        fromSection !== 'footer') {
        const currentBackgroundText = document.getElementById(`${fromSection}-background-text`);
        if (currentBackgroundText) {
          currentBackgroundText.style.animation = 'none';
          currentBackgroundText.style.opacity = '0';
        }
      }

      // Fade out current section
      const currentSectionEl = document.getElementById(`${fromSection}-section`);
      currentSectionEl.style.transition = 'opacity 0.5s ease-out';
      currentSectionEl.style.opacity = '0';

      setTimeout(() => {
        // Hide current section
        currentSectionEl.style.display = 'none';
        currentSectionEl.style.opacity = '1';

        // Reset current section wrapper animation if it has one
        if (fromSection !== 'hero' && fromSection !== 'core-values' && fromSection !== 'sustainable' &&
          fromSection !== 'sustainable2' && fromSection !== 'featured-products' && fromSection !== 'industries' &&
          fromSection !== 'business' && fromSection !== 'events' && fromSection !== 'testimonials' && fromSection !== 'blog' &&
          fromSection !== 'footer') {
          const currentWrapper = document.querySelector(`#${fromSection}-section .plate-wrapper`);
          if (currentWrapper) {
            currentWrapper.classList.remove('dive-animation');
            currentWrapper.classList.remove('fall-animation');
          }
        }

        // Show target section
        const targetSectionEl = document.getElementById(`${toSection}-section`);
        targetSectionEl.style.display = 'block';

        if (toSection !== 'hero' && toSection !== 'core-values' && toSection !== 'sustainable' &&
          toSection !== 'sustainable2' && toSection !== 'featured-products' && toSection !== 'industries' &&
          toSection !== 'business' && toSection !== 'events' && toSection !== 'testimonials' && toSection !== 'blog' &&
          toSection !== 'footer') {
          // For product sections, trigger background text animation
          setTimeout(() => {
            const targetBackgroundText = document.getElementById(`${toSection}-background-text`);
            if (targetBackgroundText) {
              targetBackgroundText.style.animation = 'fadeInText 1.5s ease forwards';
              targetBackgroundText.style.opacity = '1';
            }
          }, 100);
        }

        // Reinitialize AOS for sustainable sections
        if (toSection === 'core-values' || toSection === 'sustainable' ||
          toSection === 'sustainable2' || toSection === 'featured-products' || toSection === 'industries' ||
          toSection === 'business' || toSection === 'events' || toSection === 'testimonials' || toSection === 'blog' ||
          toSection === 'footer') {
          AOS.refresh();
        }

        // Update current section and reset scroll trigger
        currentSection = toSection;
        scrollTriggered = false;
      }, 500);
    }

    function updateNavigationDots(activeSection) {
      // Remove active class from all dots
      document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.classList.remove('active');
      });

      // Add active class to the current section's dot
      const activeDot = document.querySelector(`.nav-dot[data-section="${activeSection}"]`);
      if (activeDot) {
        activeDot.classList.add('active');
      }
    }

    // Section click handlers
    // function handleSquarePlateClick() {
    //   if (scrollTriggered) return;
    //   navigateToSection('round-plate');
    // }

    // function handleRoundPlateClick() {
    //   if (scrollTriggered) return;
    //   navigateToSection('deep-shape');
    // }

    // function handleDeepShapeClick() {
    //   if (scrollTriggered) return;
    //   navigateToSection('tray');
    // }

    // function handleTrayClick() {
    //   if (scrollTriggered) return;
    //   navigateToSection('sustainable');
    // }

    // function handleSustainableClick() {
    //   if (scrollTriggered) return;
    //   navigateToSection('sustainable2');
    // }

    // function handleSustainable2Click() {
    //   if (scrollTriggered) return;
    //   navigateToSection('core-values');
    // }

    // function handleCoreValuesClick() {
    //   if (scrollTriggered) return;
    //   navigateToSection('featured-products');
    // }

    // function handleFeaturedProductsClick() {
    //   if (scrollTriggered) return;
    //   navigateToSection('industries');
    // }

    // function handleIndustriesClick() {
    //   if (scrollTriggered) return;
    //   navigateToSection('business');
    // }

    // function handleBusinessClick() {
    //   if (scrollTriggered) return;
    //   navigateToSection('events');
    // }

    // function handleEventsClick() {
    //   if (scrollTriggered) return;
    //   navigateToSection('testimonials');
    // }

    // function handleTestimonialsClick() {
    //   if (scrollTriggered) return;
    //   navigateToSection('blog');
    // }

    // function handleBlogClick() {
    //   if (scrollTriggered) return;
    //   navigateToSection('footer');
    // }

    // function handleFooterClick() {
    //   if (scrollTriggered) return;
    //   navigateToSection('hero');
    // }

    // Handle scroll events
    window.addEventListener('wheel', e => {
      if (scrollTriggered) return;

      const currentIndex = sectionOrder.indexOf(currentSection);

      if (e.deltaY > 10) {
        // Scroll down - go to next section
        const nextIndex = currentIndex + 1;
        if (nextIndex < sectionOrder.length) {
          navigateToSection(sectionOrder[nextIndex]);
        }
      } else if (e.deltaY < -10) {
        // Scroll up - go to previous section
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
          navigateToSection(sectionOrder[prevIndex]);
        }
      }
    }, { passive: true });

    // Cart functionality
    function closeCart() {
      document.getElementById('cart-sidebar').classList.remove('open');
    }

    // Setup dropdowns after navbar is loaded
    function setupDropdowns() {
      const productsDropdown = document.getElementById('products-dropdown-container');
      const aboutDropdown = document.getElementById('about-dropdown-container');
      const productsTrigger = document.getElementById('products-tab-trigger');
      const aboutTrigger = document.getElementById('about-tab-trigger');
      const cartIcon = document.querySelector('.bi-cart');

      if (!productsTrigger || !aboutTrigger) return;

      let isProductsOpen = false;
      let isAboutOpen = false;

      // PRODUCTS DROPDOWN
      productsTrigger.addEventListener('click', function (e) {
        e.preventDefault();

        if (isProductsOpen) {
          productsDropdown.innerHTML = '';
          productsDropdown.style.display = 'none';
          isProductsOpen = false;
          return;
        }

        // Close About dropdown if open
        if (isAboutOpen) {
          aboutDropdown.innerHTML = '';
          aboutDropdown.style.display = 'none';
          isAboutOpen = false;
        }

        const rect = this.getBoundingClientRect();
        productsDropdown.style.top = `${rect.bottom + window.scrollY}px`;
        productsDropdown.style.left = `${rect.left + window.scrollX}px`;
        productsDropdown.style.display = 'block';

        productsDropdown.innerHTML = `
          <div class="container">
            <div class="tab-bar" id="tabBar">
              <div class="tab-highlight" id="tabHighlight"></div>
              <div class="tab active" data-tab="0">Sustainable Materials</div>
              <div class="tab" data-tab="1">Everyday Use</div>
              <div class="tab" data-tab="2">Industrial Solutions</div>
              <div class="tab" data-tab="3">Handicrafts</div>
            </div>
            <div style="position: relative;">
              <div class="content-arrow"></div>
              <div class="content" id="content"></div>
            </div>
          </div>
        `;

        isProductsOpen = true;

        setTimeout(() => {
          const tabs = document.querySelectorAll('.tab');
          const highlight = document.getElementById('tabHighlight');
          const content = document.getElementById('content');

          const data = [
            {
              title: "Arreca Products",
              items: ["Compostable Cutlery", "Bamboo Products"],
              image: "./assets/Plate.png"
            },
            {
              title: "Drinkware",
              items: ["Tableware", "Flatware"],
              image: "./assets/round-plate.png"
            },
            {
              title: "Industrial Packing",
              items: ["Foodservice Packaging", "E-Commerce Packaging", "Cornstarch Bags"],
              image: "./assets/square-plate.png"
            },
            {
              title: "Tableware",
              items: ["Decor Items", "Gift Box"],
              image: "./assets/tray.png"
            }
          ];

          function updateHighlight(tab) {
            highlight.style.width = `${tab.offsetWidth}px`;
            highlight.style.left = `${tab.offsetLeft}px`;
          }

          function updateContent(index) {
            const d = data[index];
            content.innerHTML = `
              <div style="display: flex; align-items: center; justify-content: center; gap: 24px;">
                <img src="${d.image}" alt="Product" style="width: 80px; height: 80px; border-radius: 8px;">
                <div style="text-align: left;">
                  <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">${d.title}</div>
                  <ul style="list-style: none; padding: 0; margin: 0; font-size: 15px; color: #444;">
                    ${d.items.map(item => `<li style="margin-bottom: 6px;">${item}</li>`).join('')}
                  </ul>
                </div>
              </div>
            `;
          }

          tabs.forEach(tab => {
            tab.addEventListener('click', () => {
              tabs.forEach(t => t.classList.remove('active'));
              tab.classList.add('active');
              updateHighlight(tab);
              updateContent(parseInt(tab.dataset.tab));
            });
          });

          const activeTab = document.querySelector('.tab.active');
          updateHighlight(activeTab);
          updateContent(0);
        }, 0);
      });

      // ABOUT DROPDOWN
      aboutTrigger.addEventListener('click', function (e) {
        e.preventDefault();

        if (isAboutOpen) {
          aboutDropdown.innerHTML = '';
          aboutDropdown.style.display = 'none';
          isAboutOpen = false;
          return;
        }

        if (isProductsOpen) {
          productsDropdown.innerHTML = '';
          productsDropdown.style.display = 'none';
          isProductsOpen = false;
        }

        const rect = this.getBoundingClientRect();
        aboutDropdown.style.top = `${rect.bottom + window.scrollY}px`;
        aboutDropdown.style.left = `${rect.left + window.scrollX}px`;
        aboutDropdown.style.display = 'block';

        aboutDropdown.innerHTML = `
          <div class="custom-menu">
            <ul class="mb-0 p-0">
              <li>Who We Are</li>
              <li>Our Mission</li>
              <li>Sustainability Commitment</li>
            </ul>
          </div>
        `;

        isAboutOpen = true;
      });

      // Close dropdowns on outside click
      document.addEventListener('click', function (event) {
        const isClickInsideProducts = productsDropdown.contains(event.target) || productsTrigger.contains(event.target);
        const isClickInsideAbout = aboutDropdown.contains(event.target) || aboutTrigger.contains(event.target);

        if (!isClickInsideProducts && isProductsOpen) {
          productsDropdown.innerHTML = '';
          productsDropdown.style.display = 'none';
          isProductsOpen = false;
        }

        if (!isClickInsideAbout && isAboutOpen) {
          aboutDropdown.innerHTML = '';
          aboutDropdown.style.display = 'none';
          isAboutOpen = false;
        }
      });

      // Cart icon click handler
      if (cartIcon) {
        cartIcon.style.cursor = 'pointer';
        cartIcon.addEventListener('click', () => {
          document.getElementById('cart-sidebar').classList.toggle('open');
        });
      }
    }

    // Apply background text animation on page load
    document.addEventListener('DOMContentLoaded', () => {
      // Force apply the animation to all background texts
      setTimeout(() => {
        const backgroundTexts = document.querySelectorAll('.background-text');
        backgroundTexts.forEach(text => {
          text.style.animation = 'fadeInText 1.5s ease forwards';
          text.style.opacity = '1';
        });
      }, 500);
    });

    // Ensure background text is visible when navigating to a section
    function showBackgroundText(sectionId) {
      const backgroundText = document.getElementById(`${sectionId}-background-text`);
      if (backgroundText) {
        backgroundText.style.animation = 'fadeInText 1.5s ease forwards';
        backgroundText.style.opacity = '1';
      }
    }

    // Override the original navigateToSection function
    const originalNavigateToSection = navigateToSection;
    navigateToSection = function (targetSection) {
      originalNavigateToSection(targetSection);

      // Make sure background text is visible for the target section
      if (targetSection !== 'hero' && targetSection !== 'core-values' && targetSection !== 'sustainable' &&
        targetSection !== 'sustainable2' && targetSection !== 'featured-products' && targetSection !== 'industries' &&
        targetSection !== 'business' && targetSection !== 'events' && targetSection !== 'testimonials' && targetSection !== 'blog' &&
        targetSection !== 'footer') {
        setTimeout(() => {
          showBackgroundText(targetSection);
        }, 800);
      }
    };