const btn = document.querySelectorAll(".product-item button");
// console.log(btn)
btn.forEach(function(button, index) {
    button.addEventListener("click", function(event) {
        var btnItem = event.target;
        var product = btnItem.parentElement;
        var productImg = product.querySelector("img").src;
        var productName = product.querySelector("h3").innerText;
        var productPrice = product.querySelector("div").innerText;

        // console.log(productName)
        addcart(productImg, productName, productPrice);
    });
});

function addcart(productImg, productName, productPrice) {
    var cartItem = document.querySelectorAll("tbody tr");
    for (var i = 0; i < cartItem.length; i++) {
        var productT = cartItem[i].querySelector(".title1");
        if (productT && productT.innerHTML == productName) {
            alert("Sản phẩm đã có trong giỏ hàng");
            return;
        }
    }

    var addtr = document.createElement("tr");
    var trcontent = '<tr><td style="display: flex; align-items: center;"><img style="width: 50px;" src="' + productImg + '" alt="combo1"><span class="title1">' + productName + '</span></td><td><span class="product-price">' + productPrice + '<sup>đ</sup></span></td><td><input style="width: 30px; outline: none;" type="number" value="1" min="1"></td><td style="cursor: pointer;" class="delete-cart">Xóa</td></tr>';
    addtr.innerHTML = trcontent;
    var cartTable = document.querySelector("tbody");
    cartTable.append(addtr);

    cartTotal();
    deleteCart(); 
}


// ----------------------------tong tien-------------------------------------- 
function cartTotal() {
    var cartItem = document.querySelectorAll("tbody tr");
    var totalC = 0;
    // console.log(cartItem)
    for (var i = 0; i < cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector("input").value;
        // console.log(inputValue)
        var productPrice = cartItem[i].querySelector(".product-price").innerHTML.replace(/[^0-9.-]+/g,"");
        
        inputValue = parseInt(inputValue);
        productPrice = parseFloat(productPrice);
        // console.log(inputValue)
        if (!isNaN(inputValue) && !isNaN(productPrice)) {
            var totalA = inputValue * productPrice * 1000;
            totalC += totalA;
        }
    }

    var totalD = totalC.toLocaleString('de-DE');
    var cartTotalA = document.querySelector(".price-total span");
    cartTotalA.innerHTML = totalD;
}

// Event listener cho việc thay đổi số lượng
document.querySelector("tbody").addEventListener("change", function(event) {
    if (event.target.type === "number") {
        cartTotal();
    }
});

//--------------------------Xoa mon------------------------

function deleteCart() {
    var cartItem = document.querySelectorAll("tbody tr");
    for (var i = 0; i < cartItem.length; i++) {
        var deleteButton = cartItem[i].querySelector(".delete-cart");
        deleteButton.addEventListener("click", function(event) {
            var cartDelete = event.target;
            var cartRow = cartDelete.parentElement;
            cartRow.remove();
            cartTotal(); 
        });
    }
}

// click order

const cartbtn = document.querySelector(".cart .fa-times")
const cartshow = document.querySelector(".order-img")
cartshow.addEventListener("click",function(){
    document.querySelector(".cart").style.right = "0"
});

cartbtn.addEventListener("click",function(){
    document.querySelector(".cart").style.right = "-100%"
}); 


