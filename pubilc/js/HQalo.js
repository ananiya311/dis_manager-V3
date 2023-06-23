const urlParams = new URLSearchParams(window.location.search);
const quary = urlParams.get('stat');
var order_id 

const proALLList = document.getElementById('proALL')

const ALprodcutName = document.getElementById('ALNamepro')
const ALautoComList = document.getElementById('autocomplete-list4')

const ALnumberOfcaces = document.getElementById('ALnumberOfCaces')

const ALLadd = document.getElementById('ALadd')
const ALLcancel = document.getElementById('ALcan')

const ALtableBody = document.getElementById('Allbody')
const ALtable = document.querySelector('.ALtable')

const ALlist = document.getElementById('customRadio91')
const ALid = document.getElementById('customRadio92')

const ALsearchcon = document.getElementById('ALconSearch')
const ALidSelect = document.getElementById('ALidSelect')
const AlsearchButton = document.getElementById('AlsearchButton')

const ALDriverNamecon = document.getElementById('DriverListContainer')
const ALDriverName = document.getElementById('ALDriverName')

const ALsedriverNamecon = document.getElementById('DriverNameBySearchContainer')
const ALsedriverName = document.getElementById('ALseDriverName')

const ALdriverId = document.getElementById('ALdriverId')
const ALplateNumber = document.getElementById('ALplateNumber')

const ALcom = document.getElementById('ALcom')
const ALcan2 = document.getElementById('ALcan2')

var tempid
var dalivaryList = []
var ALsearchTerms = []
var tlistp
var didc


const ALUpdate = async()=>{
    await axios.post('HQ/getInv').then((Sdata)=>{
        const {data:{data}} = Sdata
        ALsearchTerms.length = 0
        data.forEach(proName=>{
            if(ALsearchTerms.indexOf(proName.ProductName) === -1){

                ALsearchTerms.push(`${proName.ProductName} / ${proName.inStock}-${proName._id}`)
            }
        })
    })
}

// proALLList.addEventListener('click', async()=>{
//     await ALUpdate()
//     await ALpopulatelist()
// })


window.onload = async ()=>{
    await ALUpdate()
    await ALpopulatelist()
    await ALUpdate()   
}  



const ALupdateAutocompleteList = async () => {
    await ALUpdate()
    ALautoComList.innerHTML = '';
  
    
    const inputValue = ALprodcutName.value.toLowerCase();
  
    const filteredSearchTerms = ALsearchTerms.filter(term => {
      return term.split('/')[0].toLowerCase().startsWith(inputValue);
    });
  
    
    filteredSearchTerms.forEach(term => {
    //   const li = document.createElement('li');
    //   li.textContent = term.split('-')[0];
      ALautoComList.innerHTML += `<li data-id="${term.split('/')[1]}">${term.split('-')[0]}</li>`
    });
  }

ALprodcutName.addEventListener('keyup', () => {
    console.log("asdfasdf");
    if(ALprodcutName.value != ""){
        ALautoComList.hidden = false
        ALupdateAutocompleteList();
    }else{
        ALautoComList.hidden = true
    }
});

ALautoComList.addEventListener('click', event => {
    tempid = ""
    if (event.target.nodeName === 'LI') {
        ALprodcutName.value = event.target.textContent.split('/')[0];
        tempid = event.target.dataset.id
        ALautoComList.hidden = true
        ALautoComList.innerHTML = '';
    }
    console.log(tempid);
});

const ALpopulateTable = async(ob)=>{
    var html = ""
    tlistp = ""
    await axios.post('HQ/getInv').then(({data:{data}})=>{
        for (let index = 0; index < data.length; index++) {
            const e = data[index];
            for (let x = 0; x < ob.length; x++) {
                const d = ob[x];
                if(e._id === d.id){
                    html += `<tr>
                    <th scope="row">${e._id}</th>
                    <td>${e.ProductName}</td>
                    <td>${e.proDate.split("T")[0]}</td>
                    <td>${e.expDAte.split("T")[0]}</td>
                    <td>${d.NumerOfCece}</td>
                    <td data-index='${x}' class="remove" >Remove</td>
                    </tr>`

                    tlistp += `<tr>
                    <th scope="row" style="border: 1px solid black;  height: 40px;">${e._id}</th>
                    <td style="border: 1px solid black; text-align: center;  height: 40px;">${e.ProductName}</td>
                    <td style="border: 1px solid black; text-align: center;  height: 40px;">${d.NumerOfCece}</td>
                    </tr>`
                }
                
            }
            
        }
        console.log(ob);
        ALtableBody.innerHTML = html
    })
}

ALLadd.addEventListener('click', async()=>{
    if(parseInt(ALnumberOfcaces.value)){
        if(parseInt(ALnumberOfcaces.value) <= tempid.split('-')[0]){
            await axios.post('HQ/getInv', {_id:tempid.split('-')[1]}).then(({data})=>{
                const {_id,proDate, expDAte} = data.data[0]
                const ob = {
                    productName : ALprodcutName.value,
                    id:tempid.split('-')[1],
                    NumerOfCece:ALnumberOfcaces.value,
                    expDate:expDAte.split('T')[0],
                    proDate:proDate.split('T')[0]
                }
                console.log(dalivaryList);
                dalivaryList.push(ob)
            })
            await ALpopulateTable(dalivaryList)
            ALprodcutName.value = ""
            ALnumberOfcaces.value = ""
        }else{
            console.log(false);
        }
    }
})



ALtable.addEventListener('click', async (e)=>{
    const el = e.target
    if (el.classList.contains('remove')) {
        const conferm = confirm("remove?")
        if(conferm){
            const index = el.dataset.index
            console.log(dalivaryList.splice(index,1))
            await ALpopulateTable(dalivaryList)
        }
        
    }else{
        console.log(false);
    }
})

var ALstat = "List"

ALlist.addEventListener('click', async()=>{
    ALsedriverNamecon.hidden = true
    ALsearchcon.hidden = true
    ALDriverNamecon.hidden = false
    ALidSelect.value = ""
    await ALIP()
    ALstat = "List"
   
})

ALid.addEventListener('click', async()=>{
    ALsearchcon.hidden = false
    ALsedriverNamecon.hidden = false
    ALDriverNamecon.hidden = true
    ALdriverId.value = ""
    ALplateNumber.value = ""
    ALstat = "ID"
    
})

const ALIP = async()=>{
    await axios.post("/HQgetDriv",{
        firstName: ALDriverName.value.split(' ')[0],
        lastName: ALDriverName.value.split(' ')[1]
    }).then((D)=>{
        const {data} = D
        ALdriverId.value = data[0]._id
        ALplateNumber.value = data[0].carAs
    })
}

const ALpopulatelist = async()=>{
    await axios.post('/HQgetDriv',{
        avilavile:true
    }).then(async(D)=>{
        const {data} = D
        const html = data.map((s)=>{
           const {firstName, lastName} = s
           return `<option>${firstName} ${lastName}</option>` 
        }).join('')
        ALDriverName.innerHTML = html
        console.log(html);
        await ALIP()
    })
}
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
window.onload = async()=>{
    var errmes = ''
    var iserr = false
    await ALpopulatelist()
    if(quary == 'order'){
        order_id = urlParams.get('id');
        axios.post('/getOrder', {_id: order_id}).then(async({data})=>{
            const {items} = data[0]
            console.log(items);
            var value = []
            for (let index = 0; index < items.length; index++) {
                const {ProductName: Por, NumberOfcases: Pon} = items[index];
                console.log(items[index]);
                console.log(Pon);
                await axios.post('/HQ/getInv',{$and:[{ProductName: Por}, {inStock:{$gte: Pon}}]}).then(({data})=>{
                    if(data.data.length > 0){
                        const {_id, ProductName, proDate, expDAte} = data.data[0]
                        const ob = {
                            productName:ProductName,
                            id:_id,
                            NumerOfCece:Pon,
                            expDate:expDAte.split('T')[0],
                            proDate:proDate.split('T')[0],
                        }
                        dalivaryList.push(ob)
                    }else{
                        errmes += ` ${Por}`
                        iserr = true
                    }
                }) 
            }
            if(iserr){
                alert(`you dont have enough items int the inventory for the following item ${errmes}, to response to an order you have to wait till these items are available.`)
                window.location.href="/HQ"
            }else{
                await ALpopulateTable(dalivaryList)
            }
        })
    }else{
        console.log("false");
    }
}

ALDriverName.addEventListener('change', async()=>{
    await ALIP()
})

AlsearchButton.addEventListener('click', async()=>{
    if(ALidSelect.value){
        await axios.post('/HQgetDriv',{
            _id:ALidSelect.value
        }).then((Data)=>{
            const{data} = Data
            ALsedriverName.value = `${data[0].firstName} ${data[0].lastName}`
            ALdriverId.value = data[0]._id
            ALplateNumber.value = data[0].carAs
        })
    }else{
        console.log("asdfasdf");
    }
})

ALcom.addEventListener('click', async()=>{
    if(dalivaryList.length > 0){
        if(ALstat === "List"){
            await axios.post('/HQdelver',{
                driverID:ALdriverId.value,
                productList:dalivaryList
            }).then(async(data)=>{
                didc = data.data._id
                exportHTML()
                await ALpopulatelist()
                await ALIP()
                dalivaryList.length = 0
                ALtableBody.innerHTML = ""
                if(quary == 'order'){

                }
            })
        }else{
            if (ALsedriverName.value, ALdriverId.value, ALplateNumber.value) {
                await axios.post('/HQdelver',{
                    driverID:ALdriverId.value,
                    productList:dalivaryList
                }).then(async(data)=>{
                    didc = data.data._id
                    exportHTML()
                    await ALpopulatelist()
                    await ALIP()
                    dalivaryList.length = 0
                    ALtableBody.innerHTML = ""
                    console.log("soumting");
                })
            }
        }
    }else{
        alert("select a product to be deliverd")
    }
})


function exportHTML(){
    var current_date = new Date();
    current_date =  current_date.toISOString();
    const cle = `  <h1>
    <h3>
      <center>Exit Clearance</center>
    </h3>
  </h1>
  <center>Delivery from Headquarters of Unilever</center>
  <br>
    <h4>
      <b>Date: <u>${current_date.split('T')[0].split('-').join('/')}</u></b>
      <br>
      <br>
      <b>Time: <u>${current_date.split('T')[1].split('.')[0]}</u></b>
    </h4>
    <b>Delivery ID: <u>${didc}</u></b>
  <p>
     <ul>
      <li>This form must be presented to the guards when leaving the compound carrying delivery items</li>
      <li>Your ID must be with you presenting this form</li>
      <li>This form is only valid to the person that the name is registerd under and can only be accepted if said person is present</li>
      <li>if you Lose this form you have to report to head office before getting a new one</li>
    </ul>
    <h3><u>Driveres information</u></h3>
    <b>Driver ID: </b><u>${ALdriverId.value}</u><br><br>
    <b>First Name: </b><u>${ALDriverName.value.split(' ')[0]}</u> &nbsp; &nbsp; <b>Last Name: </b><u>${ALDriverName.value.split(' ')[1]}</u><br><br>
    <b>Car plate Number: </b><u>${ ALplateNumber.value}</u>
    <b></b><br>
    <h3>
      <u>List of Products</u>
    </h3>
  </p>`
  const otable = `<table style="border: 1px solid black;  width: 500px;"> 
                    <thead>
                        <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Prodcut Name</th>
                            <th scope="col">Number Caces</th>
                        </tr>
                    </thead>
                    <tbody>`
    
    const tbodyc = '</tbody>'
    const ctable = '</table>'
    const final = cle + otable + tlistp + tbodyc + ctable
    var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
         "xmlns:w='urn:schemas-microsoft-com:office:word' "+
         "xmlns='http://www.w3.org/TR/REC-html40'>"+
         "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    var footer = "</body></html>";
    var sourceHTML = header+final+footer;
    
    var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'document.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
 }
