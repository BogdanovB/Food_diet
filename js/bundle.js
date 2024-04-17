/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
    
        //calculator

        const result = document.querySelector('.calculating__result span');

        let sex, height, weight, age, ratio;
    
        //если у нас в localStorage уже есть какая то информация то эту инфу мы бырем от туда и помещаем ее в SEX переменную и RATIO. 
        //а если ее нет то мы устанавоваем ее по умолчанию.
    
        if(localStorage.getItem('sex')){
            sex = localStorage.getItem('sex');
        } else {
            sex = 'female';
            localStorage.setItem('sex', 'female');
        }
    
        if(localStorage.getItem('ratio')){
            ratio = localStorage.getItem('ratio');
        } else {
            ratio = 1.375;
            localStorage.setItem('ratio', 1.375);
        }
    
    
        function calcTotal(){
            if (!sex || !height || !weight || !age || !ratio){
                result.textContent = '____';
                return;
            }
    
            if(sex === 'female'){
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age))* ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age))* ratio);
            }
        }
    
        calcTotal();
    
    
        //идет проверка по localstorage. если я уже выбирал какие то пункты, то мне выдаст их из созраненных при обновлении.
        function initLocalSettings(selector, activeClass) {
            const elements = document.querySelectorAll(selector);
    
            elements.forEach(elem => {
                
                elem.classList.remove(activeClass);
    
                if (elem.getAttribute('id') === localStorage.getItem('sex')){//берем элемент который перебирается данный момент и обращаемся к его атрибуту. если атрибут его хгачения будет равно то что внутри стореджа/ там будет либо female либо male 
                    elem.classList.add(activeClass);
                }
                if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) { //коэф физическая активность тоже самое что и сверху
                    elem.classList.add(activeClass);
                }
            });
        }
    
        initLocalSettings('#gender div', 'calculating__choose-item_active');
        initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    
        function getStaticInformation(selector, activeClass) {
            const elements = document.querySelectorAll(selector);
    
            elements.forEach(elem => {//прохожу по всем кнопка куда нужно кликать. а так же тут рещение бага. что если мима тыкнешь. сейчас уже норм 
                elem.addEventListener('click', (e) => {
                    if (e.target.getAttribute('data-ratio')){
                        ratio = +e.target.getAttribute('data-ratio');//коэфициент активноти 
                        localStorage.setItem('ratio',  +e.target.getAttribute('data-ratio'));//теперь когда я кликаю на эти эдементы у меня запоминатеся значение в локал сторедже 
                    } else {
                        sex = e.target.getAttribute('id');
                        localStorage.setItem('sex', e.target.getAttribute('id'));//тоже самое делаем для Пола
    
                    }
        
                    elements.forEach(elem => {
                        elem.classList.remove(activeClass);
                    });
        
                    e.target.classList.add(activeClass);
                    calcTotal();
                });
            });
        }
    
        getStaticInformation('#gender div', 'calculating__choose-item_active');//div поставил так как я обращаюсь к блокам внутри селектора
        getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');//div поставил так как я обращаюсь к блокам внутри селектора
    
    
        function getDynamicInformation(selector) {
            const input = document.querySelector(selector);
    
            input.addEventListener('input', () => {//когда пользователь начинает что то вводить в тексотвое поле
    
                if (input.value.match(/\D/g)){//если пользователь ввел НЕ число
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = 'none';
                }
    
    
                switch(input.getAttribute('id')){
                    case "height":
                        height = + input.value;
                        break;
                    case "weight":
                        weight = + input.value;
                        break;
                    case "age":
                        age = + input.value;
                        break;   
                }
                calcTotal();
            });
            
        }
    
        getDynamicInformation("#height");
        getDynamicInformation("#weight");
        getDynamicInformation("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {


    //используем классы для карточек

    class MenuCard {
        constructor(src, alt , title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {//method курс преобразовываю
            this.price = this.price * this.transfer;
        }
    

        render() { // главный метод где все описано.
            const element = document.createElement('div');
            if (this.classes.length === 0) {//если длина элементов этого массива равно нулю то тогда ставим дефолтный класс
                this.element = 'menu__item' //ставлю дефолтный класс который записывается в это свойство 
                element.classList.add(this.element); // если не были переданны ни один класс то я ставлю в ручную
            } else { 
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }


    

    const getResource = async (url, data) => { //я делаю запрос. дожидаюсь окончания. и трансформирую в норм JS обьект который сможеи использовать
        const res = await fetch(url);

        if (!res.ok){// если в моем запросе что то не так пошло 
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);//выкидываю ошибку в ручную
        }
        return await res.json();
    };

    // getResource('http://localhost:3000/menu')//при помощи сервера запроса я получаю массив который содержит меню. это массив с обьектами
    //     .then(data => {//так как это массив я могу иеребрать его через FOREACH. и тот обьект который внутри я деструктуризирую 
            // data.forEach(({img, altimg, title, descr, price}) => { //делаем деструктаризацию
            //     new MenuCard(img, altimg, title, descr, price, '.menu .container').render();// этот конструкто будет создаваться столько раз сколько у меня буддет обьектов внутри масива "menu" в db.json.  '.menu .container' это родитель куда пушим все
            // });//эти же части я передаю в констркор класа который создает новую карточку на странице.
    //     }); // data данные которые придут из сервера в трансформированном виде

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => { //делаем деструктаризацию
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();// этот конструкто будет создаваться столько раз сколько у меня буддет обьектов внутри масива "menu" в db.json.  '.menu .container' это родитель куда пушим все
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function forms() {
    //FORMS 84 урок

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'спасибо!',
        failure: 'что то не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });


    const postData = async (url, data) => {
        const res = await fetch(url, {
            method:"POST",
            headers: {
                'Content-type' : 'application/json'//заголовки 
            },
            body: data
        });

        return await res.json();
    };


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // ОТМЕНИТЬ стандартное поведение браузера. всегда идет в НАЧАЛЕ ! 
            
            const statusMessage = document.createElement('img');//куда отправлять MESSAGE. выше его инициал.
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            
            form.insertAdjacentElement('afterend', statusMessage);

            

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);//выведем в консоль то что нам вернул сервер
                showThanksModal(message.success); // 
                statusMessage.remove();//удаляем спинер.
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();//отчистить валуе когда все норм. отчистка формы
            });
        });
    }


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div'); // создание нового контента. блок обертка.
        thanksModal.classList.add('modal__dialog');// этому ДИВУ мы назначаем классы чтобы ноормально выглядил.
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        },4000);
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal() { 
   //Modal 

   const modalTrigger = document.querySelectorAll('[data-modal]'),
   modal = document.querySelector('.modal');
   modalCloseBtn = document.querySelector('[data-close]');


    function openModal(){
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // когда нажимаю на конпку СВЯЗАТЬСЯ С НАМИ я не могу крутить колесико. фон не двигается
    clearInterval(modalTimerId);//если я открывал уже модалное окно то оно не будет вываливаться каждые 3 секунды

    }

    modalTrigger.forEach(btn => { // это псевдомассив поэтому иду в форич 
    btn.addEventListener('click', openModal);
    });


    function closeModal(){
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';// когда нажимаю на конпку СВЯЗАТЬСЯ С НАМИ я не могу крутить колесико. фон не двигается ОБРАТНО
    }

    //modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
    if(e.target === modal || e.target.getAttribute('data-close') == '') { //если кликаем на подложеу или кликаем на крестик то закрывается можальное окно.  если будет соввпадать с модальным окном на которое и был повещан обработчик событий 
        closeModal();  
    }
    });


    document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) { // если нажимаю на ESCAPE и модалка открыта то тогда закрывает ее
        closeModal();
    }

    });

    const modalTimerId = setTimeout(openModal, 35000);

    function showModalByScroll(){
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        openModal();//когда докрутил до низу выводил модальное окно 
        window.removeEventListener('scroll', showModalByScroll);// и потом удаляем этот обработчик событий.
    }
    }
    window.addEventListener('scroll', showModalByScroll);



}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {

    //SLIDER

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),//срклочка previous
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;//индекс который определяяет текущее положение слайдера 
    let offset = 0; //отступ

    
    if (slides.length < 10) {//если колличесство слайдов меньше 10 то подставляем 0. иначе НЕ подставляем 
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    //устанавливаю блоку ширину
    slidesField.style.width = 100 * slides.length + '%';

    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all'; 

    slidesWrapper.style.overflow = 'hidden';


    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';// когда создаю точки снизу сделал так 


    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators); //помещаем обертку во внутрь слайдера 

    for(let i = 0; i<slides.length; i++){//основываясь на кол-ве слайдов создаем столько же точек 
        const dot = document.createElement('li'); //создаем точки 
        dot.setAttribute('data-slide-to', i+1);//я к кажой точке устанавлваю атрибут data-slide-to и буду выстраивать нумирацию порядка
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if(i==0) {
            dot.style.opacity = 1;// насколько затемно эти маленькие точки-тире под слайдером
        }
        indicators.append(dot); //когда цикл отработет то будет определенное количество ДОТСов 
        dots.push(dot);
    }

    
    function noLetters(str){//создаю регулярное выражение чтобы дальше его быстро использовать. ЭТО удаляю все буквы
        return +str.replace(/\D/g, '');
    }


    next.addEventListener('click', () => {//кнопка вперед кликаем на нее и иидет колбек функция.
        //опередляю чемк будет равна переменная offset и в IF я пишу что делать когда дошел до конца 
        if (offset == noLetters(width) * (slides.length - 1)) {//так как у меня в width значение что то типа '500px' мне нужно избавиться от PX и сделать из строки в значение
            offset = 0;
        } else {
            offset += noLetters(width); //это когда я нажимаю вперед то у меня добавляетмся ширина след слайда. так и происзодит карусель 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;   //когда мы надимаем кнопку вперед, у меня двигается весь слайд

        if(slideIndex == slides.length){
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10){
            current.textContent = `0${slideIndex}`;
        } else  {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5'); // все точки полупрозрачные
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {//кнопка назад кликаем на нее и иидет колбек функция.
        
        if (offset == 0) {
            offset = noLetters(width) * (slides.length - 1);// записываю такой слад которыый вычисляется по такой формуле 
        } else { //а если это не первый слайд то
            offset -= noLetters(width); //это когда я нажимаю вперед то у меня добавляетмся ширина след слайда. так и происзодит карусель 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;   //когда мы надимаем кнопку вперед, у меня двигается весь слайд


        if(slideIndex == 1){
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        
        if (slides.length < 10){
            current.textContent = `0${slideIndex}`;
        } else  {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5'); // все точки полупрозрачные
        dots[slideIndex - 1].style.opacity = 1; // активную делаю темннее

    });
        dots.forEach(dot => {
            dot.addEventListener('click', (e) =>{
                const slideTo = e.target.getAttribute('data-slide-to');

                slideIndex = slideTo; //кликнули на 4 точку. и выводит 4
                offset = noLetters(width) * (slideTo - 1);//отступы повторяем опять
                slidesField.style.transform = `translateX(-${offset}px)`; //смещение нащего слайдера 
                
                if (slides.length < 10){
                    current.textContent = `0${slideIndex}`;
                } else  {
                    current.textContent = slideIndex;
                }

                dots.forEach(dot => dot.style.opacity = '.5'); // все точки полупрозрачные
                dots[slideIndex - 1].style.opacity = 1; 

                
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(){

    // TABS

    let tabs = document.querySelectorAll('.tabheader__item'), // те табы на которые мы кликаем
    tabsContent = document.querySelectorAll('.tabcontent'),//текст 
    tabsParent = document.querySelector('.tabheader__items');//родитель который содержит вссе верхние табы


    function hideTabContent(){//СКРЫВАЕТ все не нужные табы
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');// делаем табы активности. подсветка на какую кнопку нажал. а на какую нет.
        });

    }
    // функция которая ПОКАЗЫВЕТ табы
    function showTabContent(i = 0) { //i=0 это когда если вызываешь функцию но без аргумента то по умолчпнию выпустится первый жлемент
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {//обработчик события КЛИКА  
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
    //если жлемент в который мы только что кликнули будет совпадать с элементом которым мы сейчас перебираем. если тыкнул 3й элемент то все закрывает и показывает только 3 элемент
                if (target == item) { 
                    hideTabContent();
                    showTabContent(i);
                }

            });

        }
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {

    //TIMER

    const deadline = '2024-02-10';

    function getTimeRemaining(endtime) {

        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t<=0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) %24)),
              minutes = Math.floor((t / 1000 / 60)%60),
              seconds = Math.floor((t / 1000) % 60);

        }
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds 
        };
    }
    
    function getZero(num){
        if(num >= 0 && num< 10){
            return `0${num}`;
        } else{
            return num;
        }
    }
         
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);


        updateClock();

        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }   

    setClock('.timer' , deadline);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");








window.addEventListener('DOMContentLoaded', ()   => { //создаю обработчик событий 
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map