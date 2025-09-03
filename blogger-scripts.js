
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
    
    // Loading Screen
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
        document.body.classList.remove('loading');
      }, 500);
    });
    
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('overlay');
    const body = document.body;
    const mobileLinks = document.querySelectorAll('.nav-links-mobile a');
    
    hamburger.addEventListener('click', () => {
      body.classList.toggle('menu-open');
    });
    
    overlay.addEventListener('click', () => {
      body.classList.remove('menu-open');
    });
    
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        body.classList.remove('menu-open');
      });
    });
    
    // Header Scroll Effect
    const header = document.getElementById('main-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
    
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const mobileThemeSwitch = document.getElementById('mobile-theme-switch');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    function updateThemeIcons(theme) {
      if (theme === 'dark') {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        mobileThemeSwitch.classList.add('active');
        mobileThemeSwitch.querySelector('i').classList.remove('fa-sun');
        mobileThemeSwitch.querySelector('i').classList.add('fa-moon');
      } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        mobileThemeSwitch.classList.remove('active');
        mobileThemeSwitch.querySelector('i').classList.remove('fa-moon');
        mobileThemeSwitch.querySelector('i').classList.add('fa-sun');
      }
    }
    
    updateThemeIcons(currentTheme);
    
    themeToggle.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      updateThemeIcons(theme);
    });
    
    mobileThemeSwitch.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      updateThemeIcons(theme);
    });
    
    // Typing Effect
    const typingText = document.getElementById('typing-text');
    const words = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }
      
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
      } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
      }
    }
    
    // Start typing effect after page loads
    setTimeout(typeEffect, 1000);
    
    // Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const animateCounters = () => {
      counters.forEach(counter => {
        const animate = () => {
          const value = +counter.getAttribute('data-count');
          const data = +counter.innerText;
          const time = value / speed;
          
          if (data < value) {
            counter.innerText = Math.ceil(data + time);
            setTimeout(animate, 1);
          } else {
            counter.innerText = value;
          }
        };
        animate();
      });
    };
    
    // Trigger counter animation when section is visible
    const observerOptions = {
      threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          counterObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      counterObserver.observe(heroSection);
    }
    
    // FIXED Skill Progress Animation for Mobile
    const animateSkills = () => {
      const skillBars = document.querySelectorAll('.skill-progress-bar');
      skillBars.forEach(bar => {
        bar.classList.add('animate');
      });
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkills();
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
      skillObserver.observe(aboutSection);
    }
    
    // Active Link Highlighting
    function setActiveLink() {
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset;
      
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-links-desktop a, .nav-links-mobile a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
    
    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          const offset = 80;
          const targetPosition = target.offsetTop - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    