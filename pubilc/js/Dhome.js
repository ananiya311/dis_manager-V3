const propic = document.getElementById('propic')
const img = document.getElementById('propic')

const tbody = document.getElementById('tbody')
const addproNameList = document.getElementById('autocomplete-list2')
const proName = document.getElementById('Dphone')

const proName2 = document.getElementById('search-input2')
const addproNameList2 = document.getElementById('autocomplete-list3')
const searchbutton = document.getElementById('button-addon3')

const NumberOfcaces = document.getElementById('Dphone2')

const totalPrice = document.getElementById('totalPrice')

const reg = document.getElementById('reg')
const can = document.getElementById('can')

var Did = ""
var delid = ""
var proNameList = []
var propriceList;

const populatpro = async()=>{
    await axios.get('/Drs/getpro').then(({data})=>{
        img.src = data.ImgUrl
        Did = data._id
        console.log(data);
    })
}

window.onload = async()=>{
    await populatpro();
    await updateSearchList()
    console.log(proNameList);
}

const updateSearchList = async()=>{
    proNameList.length = 0
    await axios.post('home/getDlist', {Drivarid: Did}).then(async(Sdata)=>{
        const {data} = Sdata
        if(data.length > 0){
            console.log(Sdata);
            delid = data[0]._id
            var temp = data[0].ProductList
            propriceList = temp
            console.log(propriceList, delid);
            console.log(temp); 
            for (let index = 0; index < temp.length; index++) {
                proNameList.push(temp[index].productName);
            }
            await populateTabel(data[0].ProductList)
        }else{
            await populateTabel(null)
        }
    })
}

const populateTabel = async(list = null)=>{
    tbody.innerHTML = ""
    if(list != null){
        const html = list.map((data)=>{
            const {productName, NumerOfCece, pricePerCase} = data
            return ` <tr>
                        <td>${productName} </td>
                        <td>${NumerOfCece}</td>
                        <td>${pricePerCase}</td>
                    </tr>`
        }).join(' ')
        tbody.innerHTML = html

    }else{
        tbody.innerHTML = "No item are assigned to you"
    }
}

searchbutton.addEventListener('click', async()=>{
    if (proName2.value) {
        await axios.post('home/getDlist', {Drivarid: Did}).then(async(Sdata)=>{
            const {data} = Sdata
            if(data.length > 0){
                console.log(Sdata);
                var temp = data[0].ProductList
               
                console.log(temp); 
                for (let index = 0; index < temp.length; index++) {
                    if (temp[index].productName == proName2.value) {
                        await populateTabel([temp[index]]);
                    }else{
                        console.log(false);
                    }
                }
            }else{
                await populateTabel(null)
            }
        })
    }else{
        await updateSearchList()
    }
    proName2.value = ""
})

console.log(propriceList, "asdf");
// aouto complite list for the product name

function updateAutocompleteList2() {
  
    addproNameList.innerHTML = '';
  
    
    const inputValue = proName.value.toLowerCase();
    
    const filteredSearchTerms = proNameList.filter(term => {
        return term.toLowerCase().startsWith(inputValue);
    });
  
    
    filteredSearchTerms.forEach(term => {
      const li = document.createElement('li');
      li.textContent = term;
      addproNameList.appendChild(li);
    });
  }
  
  
  proName.addEventListener('keyup', () => {
    
    if(proName.value != ""){
        
        addproNameList.hidden = false
        updateAutocompleteList2();
    }else{
        addproNameList.hidden = true
    }
    
  });
  
  
  addproNameList.addEventListener('click', event => {
    if (event.target.nodeName === 'LI') {
        proName.value = event.target.textContent;
        addproNameList.hidden = true
        addproNameList.innerHTML = '';
    }
  });
  

  // aouto complite list for the product name

function updateAutocompleteList3() {
  
    addproNameList2.innerHTML = '';
  
    
    const inputValue = proName2.value.toLowerCase();
    
    const filteredSearchTerms = proNameList.filter(term => {
        return term.toLowerCase().startsWith(inputValue);
    });
  
    
    filteredSearchTerms.forEach(term => {
      const li = document.createElement('li');
      li.textContent = term;
      addproNameList2.appendChild(li);
    });
  }
  
  
  proName2.addEventListener('keyup', () => {
    
    if(proName2.value != ""){
        
        addproNameList2.hidden = false
        updateAutocompleteList3();
    }else{
        addproNameList2.hidden = true
    }
    
  });
  
  
  addproNameList2.addEventListener('click', event => {
    if (event.target.nodeName === 'LI') {
        proName2.value = event.target.textContent;
        addproNameList2.hidden = true
        addproNameList2.innerHTML = '';
    }
  });
  
NumberOfcaces.addEventListener('keyup', async()=>{
    if(NumberOfcaces.value){
        var toprice

        for (let index = 0; index < propriceList.length; index++) {
            if (propriceList[index].productName == proName.value) {
                if (parseInt(NumberOfcaces.value) <= propriceList[index].NumerOfCece) {
                    toprice = propriceList[index].pricePerCase * parseInt(NumberOfcaces.value)
                    totalPrice.innerText = toprice
                    reg.disabled = false
                }else{
                    alert("Sorry , Only " + propriceList[index].NumerOfCece + " Cases Available")
                    totalPrice.innerText = 0
                    reg.disabled = true
                }
                
            }
        }
    }else{
        totalPrice.innerText = 0
        reg.disabled = false
    }
})

const productExist = (proname)=>{
    for (let index = 0; index < proNameList.length; index++) {
        if(proNameList[index] === proname.value){
            return true
        }
    }
    return false
}

reg.addEventListener('click', async()=>{
    if(proName.value && NumberOfcaces.value){
        if(productExist(proName)){
            await axios.post('/Drs/mkaeSell',{
                _id:delid,
                proName: proName.value,
                NumberOfcaces: parseInt(NumberOfcaces.value),
                Did:Did
            }).then(()=>{
                document.getElementById('test').click()
            })
        }else{
            alert("Sorry , Product Doesn't Exist")
        }
    }else{
        alert("Please Enter Product Name and Number of Cases")
    }
})