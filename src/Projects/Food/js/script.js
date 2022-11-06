window.addEventListener('DOMContentLoaded', () => {
  //Tabs:______________________________________________________________________________________________
  const tabs = document.querySelectorAll('.tabheader__item'); //get each tab separately
  const tabsContent = document.querySelectorAll('.tabcontent'); //get the whole page
  const tabsParent = document.querySelector('.tabheader__items'); //get the parent of the tabs

  // 1__function: I hide all the content of our tabs
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
      //item.style.display = 'none'; //alternative with style
    });
    tabs.forEach((item) => {
      item.classList.remove('tabheader__item_active');
    }); //I remove the activity class of all tabs (on the right)
  }

  // 2__function: I show specific tab
  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active'); // add the activity class
    //tabsContent[i].style.display = 'block'; //alternative option
  }

  hideTabContent();
  showTabContent(); //the number of the tab that will initially open

  // 3__set the tab switch:
  tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //Timer:____________________________________________________________________________________________________________

  const deadLine = '2022-10-25'; //time until end of countdown

  //1__First we will write a function for calculating all time intervals from the current to the final date:
  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());
    //difference in milliseconds between end time and current time
    //as a result, we get into the variable "T" - the number of milliseconds
    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)); //get the difference of the day in milliseconds
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((t / 1000 / 60) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  //2__Second function, put the timer elements from the page into variables:
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000); //repeat function every second

    updateClock();

    //3__Third function, assign a timer update:
    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval); //if the total number of hours is over --- stop the function
      }
    }
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`; //the function will add "0" in front of the number if it is less than "10"
    } else {
      return num;
    }
  }

  setClock('.timer', deadLine);

  //Modal:_______________________________________________________________________________________________________________

  const modalTrigger = document.querySelectorAll('[data-modal]'), //assign a variable to the call button
    modal = document.querySelector('.modal'), //pull out modal window
    modalCloseBtn = document.querySelector('[data-close]'); //assign a variable to the window close button

  // 1__Function, opening a modal window:
  function openModal() {
    modal.classList.add('show'); //add the "show" class to the modal window
    modal.classList.remove('hide'); //remove class "hide" modal window
    document.body.style.overflow = 'hidden'; //block scrolling of the rest of the page
    clearInterval(modalTimerId); //cancel automatic opening of modal window
    window.removeEventListener('scroll', showModalByScroll); //disable automatic opening modal window on scroll down
  }
  modalTrigger.forEach((btn) => {
    btn.addEventListener('click', openModal);
  }); // using iteration, we assign an event handler to several buttons

  // 2__Function, close modal window:
  function closeModal() {
    modal.classList.add('hide'); //add the "hide" class to the modal window
    modal.classList.remove('show'); //remove class "show" modal window
    document.body.style.overflow = ''; //unblock scroll, return to default behavior
  }
  modalCloseBtn.addEventListener('click', closeModal); //assigning an event handler to close the window with a cross

  // 3_Close the window by clicking anywhere in the window:
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // 4__Close modal window by button - "Escape":
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 30000); //modal window will be called after 30 seconds

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(); //showing a modal window when scrolling to the bottom of the page
      window.removeEventListener('scroll', showModalByScroll); //canceling the second display of the modal window
    }
  }
  window.addEventListener('scroll', showModalByScroll);
});
