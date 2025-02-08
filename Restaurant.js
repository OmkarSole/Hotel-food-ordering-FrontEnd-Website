
const orderbtn = document.querySelectorAll('.orderbtn');


const dishes = document.querySelectorAll('.Dishdiv'); 
const cartList = document.querySelector('.cart-list'); 
const orderItemsContainer = document.querySelector('.items'); 

let cartItems = []; 

dishes.forEach(dish => {
  const orderButton = dish.querySelector('.orderbtn'); 
  orderButton.addEventListener('click', function() {
    const dishImg = this.closest('.Dishdiv').querySelector('.dishimg').src; 
    const dishName = this.closest('.Dishdiv').querySelector('.dishname').textContent;
    const dishPrice = parseFloat(this.closest('.Dishdiv').querySelector('.dishprice').textContent); 

    const existingItem = cartItems.find(item => item.name === dishName);

    if (existingItem) {
      existingItem.quantity++; 
    } else {
      
      cartItems.push({ name: dishName, price: dishPrice, quantity: 1, img: dishImg });
    }

    updateCartList(); 
    calculateTotalPrice();
  });
});

function updateCartList() {
  orderItemsContainer.innerHTML = ''; 
  cartItems.forEach(item => {
    const itemContent = document.createElement('li'); 
    itemContent.classList.add('ordereditems'); 

    
    const itemImg = document.createElement('img');
    itemImg.src = item.img;
    itemImg.classList.add('orderedimg'); 

    const itemName = document.createElement('p');
    itemName.classList.add('orderedtxt');
    itemName.textContent = item.name;

    const itemPrice = document.createElement('p');
    itemPrice.classList.add('orderedtxt');
    itemPrice.textContent = item.price + " Rs.";

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('orderdelete'); 
    deleteBtn.textContent = 'cancel'; 

    deleteBtn.addEventListener('click', function() {
      const itemIndex = cartItems.indexOf(item); 
      cartItems.splice(itemIndex, 1); 
      updateCartList(); 
      calculateTotalPrice(); 
    });

    itemContent.appendChild(itemImg); 
    itemContent.appendChild(itemName); 
    itemContent.appendChild(itemPrice); 
    itemContent.appendChild(deleteBtn); 

    orderItemsContainer.appendChild(itemContent); 
  });
}

orderbtn.forEach(button => {
  button.addEventListener('click', order);
});

const billbtn = document.querySelector(".calcbill");



function calculateTotalPrice() {
  let totalbill = document.querySelector(".totalbill");
  
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
 
  totalbill.innerHTML = "Your total bill is : " + totalPrice;
}



