import "bootstrap/dist/css/bootstrap.css"
import "@fortawesome/fontawesome-free/css/all.css"

const tbody = document.querySelector("tbody")
const cardbody = document.querySelectorAll(".card-body")
const cat = ['老大', '貝貝', '老虎', '胖胖', '小花', '黑臉']
const price = [20, 15, 10, 8.5, 9.99, 12.5]
const sum = [20, 15, 10, 8.5, 9.99, 12.5]
const cleancartbtn = document.querySelector(".empty-cart") // 清空購物車按鈕
const totalPriceSpan = document.querySelector('.total-price') // 總價


/* 購物車增加按鈕 */
for(let i = 0;i < cardbody.length;i++){
    cardbody[i].addEventListener("click",(e)=>{
        const catItem =
            `<tr class="item">
                <td>${cat[i]}</td>
                <td><input type="number" class="quantity" value="1" min="1"/></td>
                <td class='p'>$${price[i]}</td>
                <td class="sum">$${sum[i]}</td>
                <td>
                    <button class="remove-item-btn btn btn-danger btn-sm">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>`
    tbody.insertAdjacentHTML('afterbegin',catItem);
    updatePrice();
    })
};


/* 購物車刪除 */
tbody.addEventListener("click",(e)=>{
    if (e.target.nodeName === "BUTTON") {
        e.target.parentElement.parentElement.remove();
    }
    if(e.target.nodeName === "I") {
        e.target.parentElement.parentElement.parentElement.remove();
    }
});


/* 清空購物車 */
cleancartbtn.addEventListener("click",(e)=>{
    tbody.textContent = "";
    totalPriceSpan.textContent = "$0";  // 按下清空購物車按鈕時，總價欄位也歸零
    if (e.target.nodeName === "I") {
        tbody.textContent = "";
        totalPriceSpan.textContent = "$0"; // 按下清空購物車按鈕時，總價欄位也歸零
    }
});


/* 修改input數量，小計金額變動 */
function updatePrice() {
    const quantityInputs = document.querySelectorAll(".quantity");
    let singlePrice = document.querySelectorAll(".p"); // 單價
    const subtotalPrice = document.querySelectorAll(".sum"); // 小計
    let totalPrice = 0; // 宣告總價起始值為 0
    for (let i = 0; i < quantityInputs.length; i++) {
        const quantity = Number(quantityInputs[i].value);
        const price = Number((singlePrice[i].textContent).slice(1));
        let sum = quantity * price;  // 小計金額為數量 * 單價
 
        quantityInputs[i].addEventListener("input", (e)=>{
            subtotalPrice[i].textContent = "$" + Number(e.target.value) * sum; //對應的input更新內容每按下一次，小計也會更新
            totalPrice += sum;  // 把對應input欄位的總價金額更新(type為Number)
            totalPriceSpan.textContent = "$" + totalPrice.toFixed(2); // 更新對應input欄位的總價的金額顯示(type為String)
        })
        totalPrice += sum; // 把購物車內的所有個小貓小計加總成為購物車總價
    }
    totalPriceSpan.textContent = "$" + totalPrice.toFixed(2); // 總價的金額顯示(type為String)
};