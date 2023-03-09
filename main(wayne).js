const cat = ['老大','貝貝','老虎','胖胖','小花','黑臉']
const price = [20,15,10,8.5,9.99,12.5]
const sum = [20,15,10,8.5,9.99,12.5]
const remove = document.querySelector('.remove-item-btn');//垃圾桶
const allremovebtn = document.querySelector('.allremovebtn');//清空購物車
const catbtn = document.querySelectorAll('.catbtn')//新增貓按鈕
const tbody = document.querySelector('.tbody');
const total = document.querySelector('.total-price')

 allremovebtn.onclick = (e) => {
    tbody.innerHTML = '';
    total.textContent = '$0';
 }

 tbody.onclick = (e) => {
    if(e.target.nodeName === "BUTTON"){
        e.target.parentElement.parentElement.remove()
        Count()
    }
    if(e.target.nodeName ===  "IMG"){
        e.target.parentElement.parentElement.parentElement.remove()
        Count()
    }
}
 
for(let i = 0 ; i < catbtn.length ; i++ ){
    catbtn[i].addEventListener("click", (e) => {
        const element =
         `<tr class="item">
                <td>${cat[i]}</td>
                <td><input type="number" class="quantity" value="1" /></td>
                <td class='p'>$${price[i]}</td>
                <td class="sum">$${sum[i]}</td>
                <td>
                    <button class="remove-item-btn btn btn-danger btn-sm">
                        <img src="images/delete.jpg" alt="">
                    </button>
                </td>
        </tr>`
        tbody.insertAdjacentHTML('afterbegin' , element)
        Count()
    });
}

function Count(){
    const item = document.querySelectorAll('.item')
    let price = document.querySelectorAll('.p')//單價
    let s = document.querySelectorAll('.sum')//小計
    let tot = 0
    for(let i = 0; i < item.length; i++) {
        let sum =  Number((price[i].textContent).slice(1))

        item[i].addEventListener('input',(e)=>{
            s[i].textContent = `$${sum * Number(e.target.value)}`
            tot += sum
            total.textContent = `$${tot.toFixed(2)}`
        })
        tot += sum
    }
    total.textContent = `$${tot.toFixed(2)}`
}