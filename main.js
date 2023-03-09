/*
/* Start Dark Mode */
    // check for saved 'darkMode' in localStorage
    let darkMode = localStorage.getItem('darkMode'); 
    let darkToggle = document.querySelector('.header__checkbox-item');
   
    const enableDarkMode = () => {
        // 1. Add the class to the body
        document.body.classList.add('body--dark');
        darkToggle.checked=true;
        // 2. Update darkMode in localStorage
        localStorage.setItem('darkMode', 'enabled');
      }
      
      const disableDarkMode = () => {
        // 1. Remove the class from the body
        document.body.classList.remove('body--dark');
        darkToggle.checked=false;
        // 2. Update darkMode in localStorage 
        localStorage.removeItem('darkMode');
      }
    
        // If the user already visited and enabled darkMode
        // start things off with it on
    if (darkMode === 'enabled') {
        enableDarkMode();
        darkToggle.checked=true;
      }
    
    darkToggle.addEventListener('change', ()=> {
        darkMode = localStorage.getItem('darkMode'); 
    
        // if it not current enabled, enable it
      if (darkMode !== 'enabled') {
        enableDarkMode();
        // if it has been enabled, turn it off  
      } else {  
        disableDarkMode(); 
      }
    });
    /* End Dark Mode */
    
    /* Start Nav Behavior On scroll */
    const header = document.querySelector('.header');

    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    // Scrolling Down
    if (prevScrollpos < currentScrollPos) {
      header.classList.add('header--look'); 
    // Scrolling Up  
    } else {
      header.classList.add('header--look');
    }
    prevScrollpos = currentScrollPos;
    // On the top
    if(currentScrollPos==0) {
      header.classList.remove('header--look');
    }
    }
    /* End Nav Behavior On scroll */
    
    /* Start Behavior On menu burger click */
    const burger = document.querySelector('.header__nav-burger'),
          list = document.querySelector('.header__list'),
          overlay = document.querySelector('.header__overlay');

    function toggleNav() {
      list.classList.toggle('header__list--show');
      burger.classList.toggle('header__nav-burger--change');
      overlay.classList.toggle('header__overlay--show');
    }

    overlay.addEventListener("click", toggleNav);
    burger.addEventListener("keypress", (e) => {
      if (e.key == "Enter") {
        burger.click();
      }
    });
    /* End Behavior On menu burger click */
  
    window.addEventListener("resize", function () {
      overlay.classList.remove('header__overlay--show');
      list.classList.remove('header__list--show');
      burger.classList.remove('header__nav-burger--change');
    })

    /* Start Indicator Behavior */

    var links =document.querySelectorAll('.header__link-item');
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", navHighlighter);
    
    // Change the active menu link on scroll position
    function navHighlighter() {
      let scrollY = window.pageYOffset;
      const MediaQuery1 = window.matchMedia('(min-width : 768px)');
    
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop-56;
        let sectionId = section.getAttribute("id");
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelector(".header__list-item a[href*=" + sectionId + "]").classList.add("header__link-item--active");
        } else {
          document.querySelector(".header__list-item a[href*=" + sectionId + "]").classList.remove("header__link-item--active");
        }
      })
    }
    
    /* End Indicator Behavior */
    
    /* Start Works Filter */
    let switchItems = document.querySelectorAll(".portfolio__switch-item");
    let boxes = document.querySelectorAll(".portfolio__box");
    
    switchItems.forEach((li) => {
      li.addEventListener("click", removeActive);
      li.addEventListener("click", manageBoxes);
    });
    
    // Remove Active Class From All Lis And Add To Current
    function removeActive() {
      switchItems.forEach((li) => {
        li.classList.remove("portfolio__switch-item--active");
        this.classList.add("portfolio__switch-item--active");
      });
    }
    
    // Manage Boxes
    function manageBoxes() {
      boxes.forEach((box) => {
        box.style.display = "none";
      });
      document.querySelectorAll(this.dataset.cat).forEach((el) => {
        el.style.display = "block";
      });
    }
    /* End Works Filter */
    
    // Reset 
    
    
    /* End Contact Form Validation */
    
    document.addEventListener("DOMContentLoaded", () => {
      // SELECTORS
      const nameForm = document.querySelector("#name");
      const emailForm = document.querySelector("#email");
      const messageForm = document.querySelector("#message");
      const submitButton = document.querySelector("#submit");
      if (!nameForm || !emailForm || !messageForm || !submitButton) {
          return;
      }
    
      // VARIABLES
      let nameIsValid = false;
      let emailIsValid = false;
      let messageIsValid = false;
      
    
      // HELPER FUNCTIONS
      const validateName = (value) => {
        const nameValidation = /^[a-zA-Z\u00C0-\u024F\u0027\u002E\u002D\u1E00-\u1EFF]+( [a-zA-Z\u00C0-\u024F\u0027\u002E\u002D\u1E00-\u1EFF\s]+)+$/;
        if (value.match(nameValidation)) {
            return true;
        }
        return false;
      };
      const validateEmail = (value) => {
          const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
          if (value.match(emailValidation)) {
              return true;
          }
          return false;
      };
      const validateMessage = (value) => {
          const messageValidation = /[\S\s]+[\S]+/;
          if (value.match(messageValidation)) {
              return true;
          }
          return false;
      };
      const applyInvalidStyles = (el) => {
          el.classList.remove("contact__form-input--valid");
          el.classList.add("contact__form-input--error");
      };
      const applyValidStyle = (el) => {
          el.classList.remove("contact__form-input--error");
          el.classList.add("contact__form-input--valid");
      };
      const disableSubmitButton = () => {
          submitButton.disabled = true;
          submitButton.classList.add("contact__submit--disabled");
      };
      const enableSubmitButton = () => {
          submitButton.disabled = false;
          submitButton.classList.remove("contact__submit--disabled");
      };
      const updateSubmitButton = () => {
          if (nameIsValid && emailIsValid && messageIsValid) {
              enableSubmitButton();
          }
          else {
              disableSubmitButton();
          }
      };
    
      // EVENT LISTENERS
      nameForm.addEventListener("input", (event) => {
        const nameFormValue = event.target.value;
        if (validateName(nameFormValue)) {
            nameIsValid = true;
            applyValidStyle(nameForm);
        }
        else {
            nameIsValid = false;
            applyInvalidStyles(nameForm);
        }
        updateSubmitButton();
      });
      emailForm.addEventListener("input", (event) => {
          const emailFormValue = event.target.value;
          if (validateEmail(emailFormValue)) {
              emailIsValid = true;
              applyValidStyle(emailForm);
          }
          else {
              emailIsValid = false;
              applyInvalidStyles(emailForm);
          }
          updateSubmitButton();
      });
      messageForm.addEventListener("input", (event) => {
          const messageFormValue = event.target.value;
          if (validateMessage(messageFormValue)) {
              messageIsValid = true;
              applyValidStyle(messageForm);
          }
          else {
              messageIsValid = false;
              applyInvalidStyles(messageForm);
          }
          updateSubmitButton();
      });
    
      //EXECUTION
      updateSubmitButton();
    });
    
    // Submit validation
**/
    