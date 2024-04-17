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

export default calc;