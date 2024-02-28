const minimizeBtn = document.getElementById('minimize');

const minimizeCard = function(e){
    const iconName = e.target.name;
    const parentCard = e.target.parentNode.parentNode.parentNode;
    const createdDateEl = parentCard.querySelector('.created-date');
    const mainContentEl = parentCard.querySelector('.main-content');

    createdDateEl.classList.toggle('hide-display');
    mainContentEl.classList.toggle('hide-display');
    parentCard.classList.toggle('fit-content');
    iconName === 'remove-outline' ? e.target.name = 'browsers-outline' : e.target.name = 'remove-outline'
    
    
}

minimizeBtn.addEventListener('click', minimizeCard)