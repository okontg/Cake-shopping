import { product } from "./product.js";
import { moneyFormate } from "./money.js";
import {runsCart} from "./cart.js";

export let basket = JSON.parse(localStorage.getItem('item')) || [];

export const reRunPage = ()=>{
  let productElement = '';
  product.forEach((productItem)=>{
    const {id, firstName, secondName, image, priceCents} = productItem;

    productElement += `
      <div class="product__to-shop" id="${id}" data-product-id="${id}">
          <div class="relative">
            <img src=${image} alt="product image" width="120">
          </div>

          <div class="product__shopping">
            <div class="absolute">
              <div class="button-1 js__button-display-1-${id}" data-product-id="${id}">
                <button class="add__to-cart" id="${id}">
                  <i class='bx bx-cart-add'></i> Add to cart
                </button>
              </div>
              <div class="button-2 js__button-display-2-${id}">
                <button class="add__to-cart decrement js-decrement-button" id="${id}">–</button>
                <span class="item__quantity-order js-order-item-${id}">0</span>
                <button class="add__to-cart increment js-increment-button" id="${id}">+</button>
              </div>
            </div>
          
            <div class="product__details">
              <h5 class="name-1">${firstName}</h5>
              <h4 class="name-2">${secondName}</h4>
              <h3 class="product__price">$${moneyFormate(priceCents)}</h3>
            </div>
          </div>
          
        </div>
    
      `;
    document.querySelector('.product__container').innerHTML = productElement;
  });
}

reRunPage();

//------------------ADD CLASS AND REMOVE CLASS
basket.forEach((x)=>{
  const display__1 = document.querySelector(`.js__button-display-1-${x.id}`);
  const display__2 = document.querySelector(`.js__button-display-2-${x.id}`);

  if(x.quantity >= 1){
    display__1.classList.add('display-1');
    display__2.classList.add('display-2');
  }
}) 

//---------------ADD CLICK EVENT TO THE BUTTON OF DISPLAY__1
product.map((click)=>{
  const display__1 = document.querySelector(`.js__button-display-1-${click.id}`);
  const display__2 = document.querySelector(`.js__button-display-2-${click.id}`);

  display__1.addEventListener('click',()=>{
    const findId = basket.find((bas)=>{bas.id === click.id});
  
    if(findId === undefined){
      basket.push({
        id: click.id,
        quantity: 1
      })
    }
    updateQuantity(basket);
    saveToStorage();
    
    display__1.classList.add('display-1');
    display__2.classList.add('display-2');
  })
})

//------------------INCREMENT BUTTON
document.querySelectorAll('.js-increment-button')
.forEach((button)=>{

  button.addEventListener('click',()=>{
    const getIds = basket.find((id)=> id.id === button.id);
    getIds.quantity ++;

    updateQuantity(basket);
  });
})

//----------------DECREMENT BUTTON
document.querySelectorAll('.js-decrement-button')
.forEach((button)=>{

  button.addEventListener('click',()=>{
    const display__1 = document.querySelector(`.js__button-display-1-${button.id}`);
    const display__2 = document.querySelector(`.js__button-display-2-${button.id}`);

    const getIds = basket.find((id)=> id.id === button.id);
    if(!getIds || getIds.quantity < 0){
      
      return;
    }else{
      getIds.quantity --;
    }

    if(getIds.quantity <= 0){
      display__1.classList.remove('display-1');
      display__2.classList.remove('display-2');
    } 
    
    basket = basket.filter(item => item.quantity !== 0);
    updateQuantity(basket);
  });
})

//------------UPDATE THE QUANTITY AND DISPLAY ON THE PAGE
async function updateQuantity(baskets){
  baskets.forEach((basket)=>{
    const {id, quantity} = basket;
    document.querySelector(`.js-order-item-${id}`).innerHTML = quantity;  
    saveToStorage(basket);
  });
}

//----------SAVE TO LOCAL STORAGE
async function saveToStorage(){
  return new Promise((resolve)=>{
    localStorage.setItem('item',JSON.stringify(basket));
    runsCart(basket);
    resolve()
  });
}

//----------WAIT FOR THE updateQuantity function
async function pageLoad(){
  try{
    await updateQuantity(basket);
    
  }
  catch(error){
    console.log('Please try again later')
  }
  saveToStorage();
}

pageLoad();



