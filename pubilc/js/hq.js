const proName = document.getElementById('proName')
const pcsCase = document.getElementById('pcsCase')
const pricePerpice = document.getElementById('price')
const pricePercase = document.getElementById('pricePercase')

const serchcon = document.getElementById('serchcon')
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('button-addon2')
const autocompleteList = document.getElementById('autocomplete-list');

const Radio1 = document.getElementById('customRadio1')
const Radio2 = document.getElementById('customRadio2')
const header = document.getElementById('header')

const add = document.getElementById("Add")
const cancel = document.getElementById("Cancel")

var stat = "Add"

var searchTerms = [];

Radio1.addEventListener('click', ()=>{
    stat = "Add"
    header.innerText = "Add to Product Reference"
    autocompleteList.innerHTML = ""
    autocompleteList.hidden = true
    add.innerText = "Add"
    searchTerms = []
    serchcon.hidden = true
})
Radio2.addEventListener('click', async()=>{
    stat = "Edit"
    header.innerText = "Edit Product Referece"
    add.innerText = "Edit"
    await Update()
    serchcon.hidden = false
    
})

const Update = async()=>{
    await axios.post('HQ/getRef').then((Sdata)=>{
        const {data:{data}} = Sdata
        data.forEach(proName=>{
            searchTerms.push(proName.ProductName)
        })
    })
}
pcsCase.addEventListener('keyup', ()=>{
    if(pricePerpice.value && parseInt(pricePerpice.value) && parseInt(pcsCase.value)){
        pricePercase.value = Math.floor(parseFloat(pricePerpice.value) * parseInt(pcsCase.value))
    }
})
pricePerpice.addEventListener('keyup', ()=>{
    if(pricePerpice.value && parseInt(pricePerpice.value) && parseInt(pcsCase.value)){
        pricePercase.value = Math.floor(parseFloat(pricePerpice.value) * parseInt(pcsCase.value))
    }
})
add.addEventListener('click', async()=>{
    if(stat == "Add"){
        if(inputValidator()){
            await axios.post('HQ/getproRef',{
                ProductName:proName.value
            }).then(async (data)=>{
                if (data.data.data.length <= 0) {
                    await axios.post("HQ/addRef",{
                        ProductName:proName.value,
                        picPerCase:parseInt(pcsCase.value),
                        pricePerCase:parseFloat(pricePercase.value),
                        pricePerpices:parseFloat(pricePerpice.value)
        
                    }).then(()=>{
                        alert("added");
                    }).catch(()=>{
                        alert("err");
                    })
                   
                }else{
                    alert("exisist")
                }
            })
        }

    }else{
        if(inputValidator()){
            await axios.patch('HQ/editRef',{
                newdata:{
                    ProductName:proName.value,
                    picPerCase:parseInt(pcsCase.value),
                    pricePerCase:parseFloat(pricePercase.value),
                    pricePerpices:parseFloat(pricePerpice.value)
                },
                oldname:{
                    proname: searchInput.value
                }
            }).then(async ()=>{
                searchTerms=[]
                await Update()
                alert("edited")
                
            })
        }
    }
})

const inputValidator = () =>{
    if (proName.value == "" || pcsCase.value == "" || pricePerpice.value == "") {
        alert("an input value can not be empty")
        return false
    }else{
        if(parseInt(proName.value)){
            alert("invalid product name")
            return false
        }else if (!parseInt(pcsCase.value)) {
            alert("invalid input for pcs/case")
            return false
        }else if(!parseInt(pricePerpice.value)){
            alert("invalid input for prices perpice")
            return false
        }
    }
    return true
}



// Function to update the autocomplete list
function updateAutocompleteList() {
  
  autocompleteList.innerHTML = '';

  
  const inputValue = searchInput.value.toLowerCase();

  const filteredSearchTerms = searchTerms.filter(term => {
    return term.toLowerCase().startsWith(inputValue);
  });

  
  filteredSearchTerms.forEach(term => {
    const li = document.createElement('li');
    li.textContent = term;
    autocompleteList.appendChild(li);
  });
}


searchInput.addEventListener('keyup', () => {
  if(stat == "Edit"){
    if(searchInput.value != ""){
        autocompleteList.hidden = false
        updateAutocompleteList();
      }else{
        autocompleteList.hidden = true
      }
  }
});


autocompleteList.addEventListener('click', event => {
  if (event.target.nodeName === 'LI') {
    searchInput.value = event.target.textContent;
    autocompleteList.hidden = true
    autocompleteList.innerHTML = '';
  }
});

searchButton.addEventListener('click', async()=>{
    if(searchInput.value){
        await axios.post('HQ/getRef',{
            ProductName: searchInput.value
        }).then((Sdata)=>{
            const {data:{data}} = Sdata
            console.log(data);
            proName.value = data[0].ProductName
            pricePerpice.value = data[0].pricePerpices
            pcsCase.value = data[0].picPerCase
            pricePercase.value = data[0].pricePerCase
        }).catch(err=>{
            console.log(err);
        })
    }else{
        alert("You need to enter in a product name to search")
    }
})

