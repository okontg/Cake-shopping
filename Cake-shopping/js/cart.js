import { product } from "./product.js";
import { moneyFormate } from "./money.js";
import {basket} from "./main.js";

export async function runsCart(){
  const sectionWraperEl = document.querySelector('.cart__container');
  const totalBil = document.querySelector('.sumProduct');
  const emptyCart = document.querySelector('.empty__cart');

  async function loadCartPage(){
    if(basket.length < 0){
      emptyCart.innerHTML = `<h3>Your Orfer Item Will Appear Here</h3>`;
    }
    else if(basket.length !== 0){
      let cart = '';
      basket.map((basketId)=>{
        let newProduct = product.find((productId)=> productId.id === basketId.id);
        let {id, firstName, secondName, priceCents, image} = newProduct;

        cart += `  
        <div class="container-for-order js-delete__container-${id}" id=${id}>
          <div class="order__item-cart flex">
            <div class="wrap-order">
              <h4 class="item__name-order">${secondName}</h4>
              <div class="cart-order-wrap">
                <span class="order-orders"> ${basketId.quantity}</span>
                <span class="item__price">$${moneyFormate(priceCents)}</span>
                <span class="total__order-price">$${moneyFormate(priceCents * basketId.quantity)}</span>
              </div>
              
            </div>
            <button class="delete-from-cart  js-delete__item" id="${id}"><i class='bx bx-x'></i></button>
          </div>
        </div>        
        `;   
        sectionWraperEl.innerHTML = cart;
        totalBil.innerHTML = billsTotal();
      })
    }
  }
  await loadCartPage();

  function billsTotal(){
    let totalBills = 0;
    basket.map((basketItem)=>{
      let bills = product.find((productItem)=>productItem.id === basketItem.id);
      totalBills += bills.priceCents * basketItem.quantity;
    })
    return `
      <div class="total-order-amount">
        <p class="orders">Orders Total</p>
        <h3 class="total__amount">$${moneyFormate(totalBills)}</h3>
      </div>
      <footer>
        <p>This is a <span>carbon-neutral</span> delivery</p>
          
        <button class="confirm__order-bottom">Confirm Order</button>
      </footer> 
    `;
  }
}





