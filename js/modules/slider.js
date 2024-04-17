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

export default slider;