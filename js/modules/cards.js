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

export default cards;