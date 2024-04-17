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


export default modal;

