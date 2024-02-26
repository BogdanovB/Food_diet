window.addEventListener('DOMContentLoaded', ()   => { //создаю обработчик событий 

        // TABS

    const tabs = document.querySelectorAll('.tabheader__item'), // те табы на которые мы кликаем
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

    //Modal 

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
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

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if(e.target === modal) { // если будет соввпадать с модальным окном на которое и был повещан обработчик событий 
            closeModal();  
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) { // если нажимаю на ESCAPE и модалка открыта то тогда закрывает ее
            closeModal();
        }

    });

    //const modalTimerId = setTimeout(openModal, 3000);

    function showModalByScroll(){
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();//когда докрутил до низу выводил модальное окно 
            window.removeEventListener('scroll', showModalByScroll);// и потом удаляем этот обработчик событий.
        }
    }
    window.addEventListener('scroll', showModalByScroll);


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

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,//price bucks
        '.menu .container', //структура родительского селектора. в HTML можно проверить. главный родтель и что внутри него
    ).render();


    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,//price bucks
        '.menu .container', //структура родительского селектора. в HTML можно проверить. главный родтель и что внутри него
    ).render();


    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,//price bucks
        '.menu .container', //структура родительского селектора. в HTML можно проверить. главный родтель и что внутри него
    ).render();

});



