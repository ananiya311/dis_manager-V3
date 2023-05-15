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
    clear()
})
Radio2.addEventListener('click', async()=>{
    stat = "Edit"
    header.innerText = "Edit Product Referece"
    add.innerText = "Edit"
    await Update()
    serchcon.hidden = false
    clear()
    
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
            await axios.post('HQ/getRef',{
                ProductName:proName.value
            }).then(async (data)=>{
                console.log(data);
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
            ProductName: searchInput.value.toUpperCase()
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

const clear = ()=>{
    searchInput.value = '';
    proName.value = '';
    pricePerpice.value = '';
    pcsCase.value = '';
    pricePercase.value = '';
}
cancel.addEventListener('click', ()=>{
    clear()
})

////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//add to in inventory 
////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

const hqinlb = document.getElementById('hqinlb')

const bodyo = document.getElementsByTagName('body')

const AddRadd = document.getElementById('customRadioInline1')
const AddRedit = document.getElementById('customRadioInline2')

const SEcon = document.getElementById('conSearch')
const SEhinput = document.getElementById('search-input2')
const SEbutton = document.getElementById('button-addon3')
const SElist = document.getElementById('autocomplete-list2')

const addProName = document.getElementById('Namepro')
const addproNameList = document.getElementById('autocomplete-list3')
const addPordDate = document.getElementById('proDate')
const addExpDate = document.getElementById('ExpDate')
const hqinv = document.getElementById('Hqiv')


const addAdd = document.getElementById('Add2')
const addCancel = document.getElementById('Cancel3')
const addDelete = document.getElementById('Delete3')

const searchList = []
const proNameList = []

var stat2 = "Add"

const updateSearchList = async()=>{
    await axios.post('HQ/getRef').then((Sdata)=>{
        const {data:{data}} = Sdata
        data.forEach(proName=>{
            proNameList.push(proName.ProductName)
        })
    })
}

window.onload = async()=>{
    await updateSearchList()
}

const valinput = (par="A")=>{
    if(par = "A"){
        if(addProName.value, addPordDate.value, addExpDate.value){
            return true
        }else{
            alert("Enter in all of the fields")
            return false
        }
    }else{
        if(addProName.value, addPordDate.value, addExpDate.value, SEhinput.value){
            return true
        }else if(SEhinput.value){
            alert("The search input value can not be empty")
            return false
        }else{
            alert("Enter in all of the fields")
            return false
        }
    }
}

const valDates = (exp, pro)=>{
    if (exp.value < pro.value) {
        alert("the expration date can not bee less than the production date")
        return false
    }else{
        return true
    }
}

const typecatstin = ()=>{
    if(!parseInt(hqinv.value)){
        alert("instock can only be a number")
        return false
    }
    return true
}



// aouto complite list for the product name

function updateAutocompleteList2() {
  
    addproNameList.innerHTML = '';
  
    
    const inputValue = addProName.value.toLowerCase();
    
    const filteredSearchTerms = proNameList.filter(term => {
        return term.toLowerCase().startsWith(inputValue);
    });
  
    
    filteredSearchTerms.forEach(term => {
      const li = document.createElement('li');
      li.textContent = term;
      addproNameList.appendChild(li);
    });
  }
  
  
  addProName.addEventListener('keyup', () => {
    
    if(addProName.value != ""){
        
        addproNameList.hidden = false
        updateAutocompleteList2();
    }else{
        addproNameList.hidden = true
    }
    
  });
  
  
  addproNameList.addEventListener('click', event => {
    if (event.target.nodeName === 'LI') {
        addProName.value = event.target.textContent;
        addproNameList.hidden = true
        addproNameList.innerHTML = '';
    }
  });
  



AddRadd.addEventListener('click', async()=>{
    SEcon.hidden = true
    addDelete.hidden = true
    stat2 = "Add"
    addProName.disabled = false
    hqinlb.innerHTML = "<h3>Add inventory</h3>"
    addAdd.innerText = "Add"
    clear2()
})
AddRedit.addEventListener('click', async()=>{
    SEcon.hidden = false
    addDelete.hidden = false
    stat2 = "Edit"
    hqinlb.innerHTML = "<h3>Edit inventory</h3>"
    addAdd.innerText = "Edit"
    addProName.disabled = true
    clear2()
})

const allinputs = ()=>{
   console.log(valDates(addExpDate, addPordDate));
}

addAdd.addEventListener('click', async()=>{
    if(stat2 === "Add"){
        if(valDates(addExpDate, addPordDate) && valinput() && typecatstin()){
            await axios.post('HQ/getRef',{
                ProductName:addProName.value.toUpperCase()
            }).then(async(sdata)=>{
                const {data:{data:data}} = sdata
                console.log(data);
                if(data.length > 0){
                    await axios.post('HQ/AddToInv',{
                        ProductName:data[0].ProductName,
                        picPerCase:data[0].picPerCase,
                        pricePerCase:data[0].pricePerCase,
                        pricePerpices:data[0].pricePerpices,
                        proDate:addPordDate.value,
                        expDAte:addExpDate.value,
                        inStock:parseInt(hqinv.value)
                    }).then(()=>{
                        alert("added")
                    })
                }else{
                    alert("pro not found in ref")
                }
            })
        }
    }else{
        if(valDates(addExpDate, addPordDate) && valinput() && typecatstin()){
            await axios.post('HQ/getInv', {_id:SEhinput.value}).then(async (datas)=>{
                const {data:data} = datas
                if(data.data.length > 0){
                    await axios.patch('HQ/editInv',{
                        id:{_id: SEhinput.value},
                        newdata:{
                            proDate:addPordDate.value,
                            expDAte:addExpDate.value,
                            inStock:parseInt(hqinv.value)
                        }
                       }).then(()=>{
                        alert("Edited")
                       })
                }else{
                    alert("id not found")
                }
            })
           
        }
    }
})
addCancel.addEventListener('click', ()=>{
    allinputs()
})

SEbutton.addEventListener('click', async ()=>{
    if(SEhinput.value){
        await axios.post('HQ/getInv', {_id:SEhinput.value}).then((datas)=>{
            const {data:data} = datas
            const test = data.data[0].proDate
            console.log(test);
            if(data.data.length > 0){
                const file = data.data[0]
                addProName.value  = file.ProductName
                addPordDate.value = file.proDate.split('T')[0]
                addExpDate.value = file.expDAte.split('T')[0]
                hqinv.value = file.inStock
                
            }
        })
    }else{
        alert("Enter in the search input")
    }
})

addDelete.addEventListener('click', async()=>{
    const vali = confirm("are you sure you whant to delete this data")
    if(vali){
        await axios.delete('HQ/DeleteInv',{_id:SEhinput.value})
    }
})

const clear2 = ()=>{
    addExpDate.value = ""
    addProName.value = ""
    addPordDate.value = ""
    SEhinput.value = ""
    hqinv.value = ""
}

//////////////////////////////////////////////////////////////////
// product listing
//////////////////////////////////////////////////////////////////
const searchCon = document.getElementById('searchCon')

const Lisearch = document.getElementById('Lisearchinput')
const Lisearchbutton = document.getElementById('LIsearchBu')

const Liselect = document.getElementById('Select')

const tbody = document.getElementById('table')
const selecttt = document.querySelector('.table')
const link = document.getElementById('poliing')
const headerO = `<tbody>`
const headerC = `</tbody>`
const invo = `
                    <thead>
                      <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Prodcut Name</th>
                        <th scope="col">Prodcution Date</th>
                        <th scope="col">Experation Date</th>
                        <th scope="col">InStock</th>
                      </tr>
                    </thead>

`

const delivary = `
                    <thead>
                      <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Driver ID</th>
                        <th scope="col">##</th>
                      </tr>
                    </thead>
`

const driver = `
                    <thead>
                      <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Sex</th>
                        <th scope="col">Car Plate Number</th>
                        <th scope="col">Is avilavile</th>
                      </tr>
                    </thead>

`
const POproduct = async()=>{
    await axios.post('HQ/getInv',{}).then(({data:{data}})=>{
        const html = data.map((test)=>{
            const {_id, ProductName, proDate, expDAte, inStock} = test
            return` <tr>
                        <th scope="row">${_id}</th>
                        <td>${ProductName}</td>
                        <td>${proDate.split("T")[0]}</td>
                        <td>${expDAte.split("T")[0]}</td>
                        <td>${inStock}</td>
                    </tr>
          `
        }).join('')

        tbody.innerHTML = invo+headerO+html+headerC
    })
    
}

const POdealivery = async(s = "none")=>{
    if(s == "none"){
        await axios.post('/HQgetdelver').then((Data)=>{
            const {data} = Data
            const html = data.map((D)=>{
                const {_id, Drivarid} = D
                return` <tr>
                            <th scope="row">${_id}</th>
                            <td>${Drivarid}</td>
                            <td data-cancel=${_id} class='cancel'>Cancel</td>
                        </tr>
              `
            }).join('')
            tbody.innerHTML = delivary+headerO+html+headerC
        })
    }else{
        await axios.post('/HQgetdelver',{_id: Lisearch.value}).then((Data)=>{
            const {data} = Data
            const html = data.map((D)=>{
                const {_id, Drivarid} = D
                return` <tr>
                            <th scope="row">${_id}</th>
                            <td>${Drivarid}</td>
                            <td data-cancel=${_id} class='cancel'>Cancel</td>
                        </tr>
              `
            }).join('')
            tbody.innerHTML = delivary+headerO+html+headerC
        })
    }
}

const PODriver = async(s = "none")=>{
    if(s == 'none'){
        await axios.post('/HQgetDriv').then((Data)=>{
            const {data} = Data
            console.log(data);
            const html = data.map((D)=>{
                const {_id, firstName, lastName, Sex, carAs, avilavile} = D
                return` <tr>
                            <th scope="row">${_id}</th>
                            <td>${firstName}</td>
                            <td>${lastName}</td>
                            <td>${Sex}</td>
                            <td>${carAs}</td>
                            <td>${avilavile}</td>                    
                        </tr>
              `
            })
            tbody.innerHTML = driver+headerO+html+headerC
        })
    }else{
        await axios.post('/HQgetDriv',{_id:Lisearch.value}).then((Data)=>{
            const {data} = Data
            console.log(data);
            const html = data.map((D)=>{
                const {_id, firstName, lastName, Sex, carAs, avilavile} = D
                return` <tr>
                            <th scope="row">${_id}</th>
                            <td>${firstName}</td>
                            <td>${lastName}</td>
                            <td>${Sex}</td>
                            <td>${carAs}</td>
                            <td>${avilavile}</td>                    
                        </tr>
              `
            })
            tbody.innerHTML = driver+headerO+html+headerC
        })
    }
}

Lisearchbutton.addEventListener('click', async()=>{
    if(Lisearch.value){
        if(Liselect.value == "Deliveryes"){
            await POdealivery("search")
        }else if(Liselect.value == "Driver"){
            await PODriver('search')
        }
    }else{
        if(Liselect.value == "Deliveryes"){
            await POdealivery()
        }else if(Liselect.value == "Driver"){
            await PODriver()
        }
    }
})

link.addEventListener('click', async()=>{
    await POproduct()
    Liselect.value = "Inventory"
})

Liselect.addEventListener('change', async()=>{
    if(Liselect.value == "Inventory"){
        searchCon.hidden = true
        await POproduct()
    }else if (Liselect.value == 'Deliveryes') {
        Lisearch.value = ""
        searchCon.hidden = false
        await POdealivery()
    } else if(Liselect.value == 'Driver'){
        Lisearch.value = ""
        searchCon.hidden = false
        console.log("asdfasdf");
        await PODriver()   
    }
})

selecttt.addEventListener('click',async(e)=>{
    const el = e.target
    if(el.classList.contains('cancel')){
       const conferm = confirm("are you sure you whant to cancel this order")
       if (conferm) {
        const id = el.dataset.cancel
        console.log(id);
        await axios.post('/HQdelvercancel',{
            _id:id 
        })
        await POdealivery()
       }
    }
})

////////////////////////////////////////////////////////////////
//Driver
///////////////////////////////////////////////////////////////
const DFname = document.getElementById('DFname')
const DLname = document.getElementById('DLname')
const DSex = document.getElementById('Dsex')
const DDob = document.getElementById('DDOB')

const DfilePhate = document.getElementById('DfilePhate')

const DHomeNo = document.getElementById('DHomeno')
const Dkebela = document.getElementById('Dkebela')

const Dcity = document.getElementById('Dcity')
const DSubcity = document.getElementById('DsubCity')

const DphoneNumber1 = document.getElementById('Dphone')
const DphoneNumber2 = document.getElementById('Dphone2')

const Demail = document.getElementById('Demail')
const DEmloder = document.getElementById('DEmloder')
const Dpassword = document.getElementById('Dpassword')
const DCpassword = document.getElementById('DpasswordC')

const car = document.getElementById('car')
const Dmodel = document.getElementById('Dmodel')
const Dplate = document.getElementById('plate')
const Mloder = document.getElementById('Mloder')


const DRegister = document.getElementById('Dregs')
const Dcancel = document.getElementById('Dcan')
const Dreglod = document.getElementById('Dreglod')
const Ddele = document.getElementById('Ddele')
const Dregsuss = document.getElementById('Dregsuss')

const DconSearch = document.getElementById('DconSearch')
const searchButtonD = document.getElementById('button-addon20')
const searcnInputDriver = document.getElementById('searcnInputDriver')

const emcon = document.getElementById('emcon')

const dreg = document.getElementById('es')

const DaddR = document.getElementById('customRadio5')
const DeditR = document.getElementById('customRadio6')

const oldcarcon = document.getElementById('oldcarcon')
const hrl = document.getElementById('hrl')
const olla = document.getElementById('olla')

const PDcar = document.getElementById('PDcar')
const PDmodel = document.getElementById('PDmodel')
const PDplat = document.getElementById('PDplat')

const Dinfocom = document.getElementById("Dinfocom")

const comit = document.getElementById('comit')

var Dstat = "Add"
console.log(Dinfocom.checked);
DaddR.addEventListener('click', ()=>{
    Dstat = "add"
    oldcarcon.hidden = true
    DRegister.innerHTML = "Register"
    DconSearch.hidden = true
    emcon.hidden = false
    hrl.hidden = true
    olla.hidden = true
    comit.hidden = true
    Ddele.hidden = true
})
DeditR.addEventListener('click', ()=>{
    Dstat = "Edit"
    oldcarcon.hidden = false
    DRegister.innerHTML = "Edit"
    DconSearch.hidden = false
    emcon.hidden = true
    hrl.hidden = false
    olla.hidden = false
    comit.hidden = false
    Ddele.hidden = false
})

const carNameP = async ()=>{
     
     const{data} = await axios.post('/HQGetcar',{
        available:true
     })
     console.log(data);
     if (data.length > 0) {
          var html = ''
          var temp = []
          for (let index = 0; index < data.length; index++) {
               if(temp.indexOf(data[index].name) == -1){
                    temp.push(data[index].name)
               }  
          }
          for (let index = 0; index < temp.length; index++) {
               html += `<option>${temp[index]}</option>`;
          }
          car.innerHTML = html
          await modelNameP()
     }else{
          car.innerHTML = '<option>no car found</option>'
     }

} 
dreg.addEventListener('click', async()=>{
    await carNameP() 
})


const modelNameP = async()=>{

     if(car.value != ''){
          Mloder.hidden = false
          const {data} = await axios.post('/HQGetcar',{
               name: car.value,
               available: true
          })
     
          Mloder.hidden = true
          var html2 = ''
          var temp = []
          for (let index = 0; index < data.length; index++) {
               if(temp.indexOf(data[index].model) == -1){
                    temp.push(data[index].model)
               }
          }
    

          for (let index = 0; index < temp.length; index++) {
               html2 += `<option>${temp[index]}</option>`;
          }
          Dmodel.innerHTML = html2
          await platemap()
     }else{
          Dmodel.innerHTML = "no models"
     }
     
     
}

const platemap = async()=>{
    if(Dmodel.value){
        await axios.post('HQGetcar',{
            model: Dmodel.value,
            name: car.value,
            available:true
        }).then((data)=>{
            const list = data.data.map((data)=>{
                return `<option>${data.PlatNumber}</option>`
            })
            Dplate.innerHTML = list
        })
    }else{
        console.log("teset");
    }
}

Dmodel.addEventListener('change', async()=>{
    await platemap()
})

car.addEventListener('change', async()=>{
    await modelNameP()
})



DRegister.addEventListener('click', async()=>{
     const Dusers = [DFname.value, DLname.value, DfilePhate.value, DHomeNo.value, Dkebela.value, DphoneNumber1.value, DphoneNumber2.value, DDob.value]
     var Empty
     if(Dstat == "Add"){
        Empty = varinput(Dusers, DDob, DHomeNo, Dkebela, DphoneNumber1, DphoneNumber2, DfilePhate)
     }else{
        Empty = varinput(Dusers, DDob, DHomeNo, Dkebela, DphoneNumber1, DphoneNumber2, DfilePhate, "D")
     }
     if (Empty) {
          const evar = await Varemail("D")
          Dreglod.hidden = false
          if(evar){
               if (Dstat == "Add") {
                    const filename = DfilePhate.value
                    const reg = await axios.post('/HQRegister/dirvers',{
                    data:{ 
                        firstName:DFname.value,
                        lastName:DLname.value,
                        Sex:DSex.value,
                        DOB:DDob.value,
                        City:Dcity.value,
                        Kabala:Dkebela.value,
                        HomeNumber:DHomeNo.value,
                        phoneNumber1:DphoneNumber1.value,
                        phoneNumber2:DphoneNumber2.value,
                        Email:Demail.value,
                        SubCity:DSubcity.value,
                        },
                        carpro:{
                            PlatNumber: Dplate.value
                        },
                        imgname:filename.split('fakepath')[1]
                    }).then(()=>{
                        Dregsuss.hidden = false
                        Dreglod.hidden = true
                        Dregsuss.innerHTML = "Driver registered"
                        setTimeout(() => {
                            Dregsuss.hidden = true
                        }, 3000);
                    }).catch((err)=>{
                        alert(err)
                        Dreglod.hidden = true
                    })
                }else{
                   
                console.log("asdf");
                    await axios.patch('/HQedidtDriver',{
                        data:{
                            firstName: DFname.value,
                            lastName: DLname.value,
                            Sex: DSex.value,
                            DOB: DDob.value,
                            SubCity: DsubCity.value,
                            Kabala: Dkebela.value,
                            HomeNumber:DHomeNo.value,
                            phoneNumber1: DphoneNumber1.value,
                            phoneNumber2: DphoneNumber2.value
                        },AddInfo:{
                            userid:{
                                _id: searcnInputDriver.value
                            },
                            oldplate:{
                                PlatNumber:PDplat.value
                            },
                            newplate:{
                                PlatNumber:Dplate.value
                            },
                            allterStat:{
                                stat:Dinfocom.checked
                            }
                        }
                    }).then(async()=>{
                        await carNameP() 
                        alert("edited")
                        Dreglod.hidden = true
                    }).catch((err)=>{
                        console.log(err);
                        Dreglod.hidden = true
                    })
               }
               
          }
     }
})
const varinput = (arry, Idob, IhomeNo, Ikebela, IphoneNumber1, IphoneNumber2, IfilePhate,st="a")=>{
    for (let index = 0; index < arry.length; index++) {
         const element = arry[index];
         if(element == undefined || element == "" && st === "a"){
              alert("Enter in all the fields provided")
              return false
         }else{
              continue
         }  
    }

    var date = Idob.value.split('-')[0]
    if (date > 2000) {
         alert('the date you entered is invalid')
         dateErr.innerHTML = "the date you enter is invalid"
         return false
    }
    
    if(IhomeNo.value != "new"){
         var homen = IhomeNo.value.split('-')
         if(homen.length == 2){
              if (parseInt(homen[0]) || parseInt(homen[0]) == homen[0] || !parseInt(homen[1]) || parseInt(homen[1]) != homen[1]) {
                   alert('Home number is invalid')
                   homenErr.innerHTML = "Home number is invalid"
                   return false
              }
              
         }else{
              alert('Home number is invalid')
              return false  
         }
    }

    const kab = Ikebela.value.split('-')
    if(kab.length == 2){
         if(parseInt(kab[0]) == '0'){
              if(!parseInt(kab[0]) && parseInt(kab[0]) != kab[0] || !parseInt(kab[1]) && parseInt(kab[1]) != kab[1]){
                   alert('kabela is nvalid')
                   kabErr.innerHTML = "invalid value"
                   return false
              }
         }else{
              alert('kabela is invalid')
              return false
         }
    }else{
         alert('kabela is invalid')
         return false
    }

    if(IphoneNumber1.value != IphoneNumber2.value){
         const ph1 = IphoneNumber1.value.split('')
         const ph2 = IphoneNumber2.value.split('')
    
         if(ph1.length == 10 && ph2.length == 10){
              if(ph1[0] != 0 && ph1[0] != 9){
                   alert('invalid phone number')
                   return false
              }
              if(ph2[0] != 0 && ph2[0] != 9){
                   alert('invalid phone number')
                   return false
    
              }
         }else{
              alert('invalid phone number')
              return false
         }

    }else{
         alert('the phone numbers can not be semillar')
         return false
    }

    const fileP = IfilePhate.value.split('//')[0].split('.')[1]
    if(fileP == 'jfif' || fileP == 'jpeg' || fileP == 'PNG' &&  st == "a"){
         return true
    }else{
        if(st === "D"){
            return true
        }else{

            alert('invalid data type it must have .jfif, .jpeg or .png as an extintion')
            return false
        }
         
    }
    return true
}

const Varemail = async (to = "S") =>{
    if (to == "S") {

         Emloder.hidden = false
         const {data: data1} = await axios.post('get/staff', {
              Email: email.value
         })
         const {data: data2} = await axios.post('get/driver',{
              Email: email.value
         })
         const {data: data3} = await axios.post('/HQgetDriv',{
            Email: email.value
       })
       console.log(data3.length);
         Emloder.hidden = true
         if(data1.length != 0 || data2.length != 0 || data3.data.length != 0){
              alert('Email is already in use')
              console.log(data1, data2, "innn");
              return false
         }
    
         if(password.value == Cpassword.value){
              const pp = password.value.split('')
              if(pp.length < 12 && pp.length < 12){
                   alert('the password is to short')
                   return false
              }
    
              if(pp.length > 20 && pp.length > 20){
                   alert('the epassword is to long')
                   return false
              }
    
    
         }else{
              alert('the password dose not match')
              return false
         }
    }else{
         DEmloder.hidden = false
         const {data: data1} = await axios.post('get/staff', {
              Email: Demail.value
         })
         
         const {data: data2} = await axios.post('get/driver',{
              Email: Demail.value
         })
         DEmloder.hidden = true
         if(data1.length != 0 || data2.length != 0){
              console.log(data2);
              alert('Email is already in use')
              DEmloder.hidden = true
              return false
         }
    }

    return true
    
}


searchButtonD.addEventListener('click', async()=>{
    if(searcnInputDriver.value){
        await axios.post('/HQgetDriv',{
            _id: searcnInputDriver.value
        }).then(async(Data)=>{
           const {data} = Data
           console.log(data);
           DFname.value = data[0].firstName
           DLname.value = data[0].lastName
           DSex.value = data[0].Sex
           DDob.value = data[0].DOB.split('T')[0]
           DHomeNo.value = data[0].HomeNumber
           Dkebela.value = data[0].Kabala
           DsubCity.value = data[0].SubCity
           DphoneNumber1.value = data[0].phoneNumber1
           DphoneNumber2.value = data[0].phoneNumber2
           await axios.post('HQGetcar', {
            PlatNumber: data[0].carAs
            }).then(async (data)=>{
                    console.log(data.data);
                    PDcar.value = data.data[0].name
                    PDmodel.value = data.data[0].model
                    PDplat.value = data.data[0].PlatNumber
            }).catch((err)=>{
                console.log(err);
            })
        }).catch((err)=>{
            console.log(err);
        })
    }else{
        alert('in all of the fildes provaded')
    }
})

Ddele.addEventListener('click', async()=>{
    const conferm = confirm("delete driver")
    if (conferm) {
        await axios.delete('/HQdeleteDriver',{
            _id:searcnInputDriver.value
        }).then(()=>{
            alert("Deleted")
        }).catch((err)=>{
            console.log(err);
        })
    }
})

////////////////////////////////////////////
//car
////////////////////////////////////////////

const Cname = document.getElementById('name')
const model = document.getElementById('model')
const max = document.getElementById('max')
const min = document.getElementById('min')

const quan = document.getElementById('quan')

const EMmodel = document.getElementById('EMmodel')
const EMIVmodel = document.getElementById('EMIVmodel')

const EMmin = document.getElementById('EMmin')
const EMmax = document.getElementById('EMmax')
const MAloder = document.getElementById('MAloder')
const EMquan = document.getElementById('EMquan')
const gErr = document.getElementById('gErr')

const Crado10 = document.getElementById('customRadio10')
const Crado11 = document.getElementById('customRadio11')

const Csearchcon = document.getElementById('CconSearch')
const Csearchinput = document.getElementById('searcnInputCar')
const CSebutton = document.getElementById('button-addon10')

const Cregister = document.getElementById('Cregs')
const Ccancel = document.getElementById('Ccan')
const Creglod = document.getElementById('Creglod')
const Cdelete = document.getElementById('Cdle')
const Cregsuss = document.getElementById('Cregsuss')

var Cstat = "Add"
Crado10.addEventListener('click', async()=>{
    Cstat = "Add"
    Csearchcon.hidden = true
    Cregister.innerText = "Register"
    Cdelete.hidden = true
})

Crado11.addEventListener('click', async()=>{
    Cstat = "Edit"
    console.log(Cstat);
    Cregister.innerText = "Edit"
    Csearchcon.hidden = false
    Cdelete.hidden = false
})
const typeCastCheck = (arry, Imodel, Imax, Imin)=>{
     for (let index = 0; index < arry.length; index++) {
          const element = arry[index];
          if(element == undefined || element == ""){
               alert("Enter in all the fields provided")
               return false
          }else{
               continue
          }  
     }
     if(parseInt(Imodel.value) != Imodel.value){
          EMmodel.hidden = false
          setTimeout(() => {
               EMmodel.hidden = true
          }, 2000);
          return false
     }else{
          if (Imodel.value.length != 4 || Imodel.value[0] == 0) {
               EMIVmodel.hidden = false
               setTimeout(() => {
                    EMIVmodel.hidden = true
               }, 3000);
          }else{

               if(parseInt(Imax.value) != Imax.value){
                    EMmax.hidden = false
                    setTimeout(() => {
                         EMmax.hidden = true
                    }, 2000);
                    return false
               }else{
     
                    if(parseInt(Imin.value) != Imin.value){
                         EMmin.hidden = false
                         setTimeout(() => {
                              EMmin.hidden = true
                         }, 2000);
                         return false
                    }else{
                        return true
                    }
               }
          }
     }
}


Cregister.addEventListener('click', async()=>{
     const test = await axios.post('/get/car')
     const cardata = [Cname.value, model.value, max.value, min.value, quan.value]
     const typecast = typeCastCheck(cardata, model, max, min)
     if(typecast){
          const fpu = parseInt(max.value) * 0.5
          if(max.value != min.value && parseInt(min.value) < parseInt(max.value) && parseInt(min.value) >= fpu){
               Creglod.hidden = false
               if (Cstat === "Add") {
                await axios.post('/HQGetcar',{PlatNumber: quan.value}).then(async(data)=>{
                    if(data.data.length <= 0){
                        await axios.post('/HQCarreg',{
                                name:Cname.value.toUpperCase(),
                                model:parseInt(model.value),
                                MaxPaylodeLimt:parseInt(max.value),
                                minPaylodeLimt:parseInt(min.value),
                                PlatNumber:quan.value,
                                available: true
                        }).then(()=>{
                                Cregsuss.hidden = false
                                Cregister.innerHTML = "Edited"
                                setTimeout(() => {
                                    Cregsuss.hidden = true
                                }, 3000);
                        }).catch((err)=>{
                            alert(err)
                        })
                        Creglod.hidden = true

                    }else{
                        alert("the car plate is taken")
                        Creglod.hidden = true
                    }

               })
               }else{
                await axios.patch('HQcarEdit',{
                    newdata:{
                        name:Cname.value.toUpperCase(),
                        model:parseInt(model.value),
                        MaxPaylodeLimt:parseInt(max.value),
                        minPaylodeLimt:parseInt(min.value),
                        PlatNumber:quan.value,
                    },
                    _id:{_id:Csearchinput.value}
                }).then(()=>{
                    console.log("Edited");
                    Creglod.hidden = true
                }).catch((Err)=>{
                    alert(Err)
                    Creglod.hidden = true
                })
               }
          }else{
               if(max.value == min.value){
                    gErr.innerHTML = "The max and min value can not be the same"
                    gErr.hidden = false
                    setTimeout(() => {
                         gErr.hidden = true
                    }, 3000);
               }else if (parseInt(min.value) > parseInt(max.value)) {
                    gErr.innerHTML = "The min value cannot be grater than the max"
                    gErr.hidden = false
                    setTimeout(() => {
                         gErr.hidden = true
                    }, 3000);
               } else {
                    gErr.innerHTML = "The min value cannot be less than 50% of max value"
                    gErr.hidden = false
                    setTimeout(() => {
                         gErr.hidden = true
                    }, 3000);
               }
          }
     }

          
})
Cdelete.addEventListener('click', async()=>{
    console.log("asdf");
    await axios.delete('/HQcarDelete',{
        _id:Csearchinput.value
    }).then(()=>{
        console.log("Deleted");
    })
})

CSebutton.addEventListener('click', async()=>{
    console.log("test");
    if(Csearchinput.value){
        
        await axios.post('/HQGetcar',{
            _id:Csearchinput.value
        }).then((data)=>{
            const {name, model:cmodel, minPaylodeLimt, available, PlatNumber, MaxPaylodeLimt} = data.data[0]
            Cname.value = name
            model.value = cmodel
            max.value = MaxPaylodeLimt
            min.value = minPaylodeLimt
            quan.value = PlatNumber
        })
    }else{
        alert("Enter in all the filds provaded")
    }
})

/////////////////////////////////////////////////////////
// product alocation
/////////////////////////////////////////////////////////

const proALLList = document.getElementById('proALL')

proALLList.addEventListener('click', async()=>{
    const test = document.getElementById('allink').click()
})

