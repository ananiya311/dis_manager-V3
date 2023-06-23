// reg emp js///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

const Fname = document.getElementById('Fname')
const Lname = document.getElementById('Lname')
const Sex = document.getElementById('sex')

const Dob = document.getElementById('DOB')
const dateErr = document.getElementById('dateErr')

const filePhate = document.getElementById('filePhate')

const HomeNo = document.getElementById('Homeno')
const homenErr = document.getElementById('homenErr')

const kebela = document.getElementById('kebela')
const kabErr = document.getElementById('kabErr')

const city = document.getElementById('city')
const Subcity = document.getElementById('subCity')

const phoneNumber1 = document.getElementById('phone')
const phoneNumber2 = document.getElementById('phone2')
const phErr = document.getElementById('phErr')

const email = document.getElementById('email')
const Emloder = document.getElementById('Emloder')

const password = document.getElementById('password')
const Cpassword = document.getElementById('passwordC')
const errmP = document.getElementById('errmP')

const edu = document.getElementById('edu')
const workeST = document.getElementById('workeST')

const Register = document.getElementById('reg')
const cancel = document.getElementById('can')
const regsuss = document.getElementById('regsuss')
const reglod = document.getElementById('reglod')

const proPic = document.getElementById('proPic')
const proann = document.getElementById('proann')
const errmIm = document.getElementById('errmIm')

const populateFilds = async ()=>{
     proPic.hidden = true
     proann.hidden = false
     const {data}= await axios.get('get/pro')
     proPic.src = `${data.ImgUrl}`
     proann.hidden = true
     proPic.hidden = false
}
populateFilds()
const varinput = (arry, Idob, IhomeNo, Ikebela, IphoneNumber1, IphoneNumber2, IfilePhate)=>{
     for (let index = 0; index < arry.length; index++) {
          const element = arry[index];
          if(element == undefined || element == ""){
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
     if(fileP == 'jfif' || fileP == 'jpeg' || fileP == 'PNG'){
          
     }else{
          alert('invalid data type it must have .jfif, .jpeg or .png as an extintion')
          return false
          
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
          Emloder.hidden = true
          if(data1.length != 0 || data2.length != 0){
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
Register.addEventListener('click', async ()=>{
     const info = [Fname.value, Lname.value, filePhate.value, kebela.value, phoneNumber1.value, phoneNumber2.value, email.value, password.value, Cpassword.value, edu.value, Dob.value]
     const vari = varinput(info, Dob, HomeNo, kebela, phoneNumber1, phoneNumber2, filePhate)
     if(vari){
          const vare = await Varemail()
          if(vare){
               reglod.hidden = false 
               const returnData = await axios.post('/Register/staff',{
                    data:{
                         firstName:Fname.value,
                         lastName:Lname.value,
                         Sex:Sex.value,
                         DOB:Dob.value.split('T')[0],
                         City:city.value,
                         Kabala:kebela.value,
                         HomeNumber:HomeNo.value,
                         Education:edu.value,
                         phoneNumber1:phoneNumber1.value,
                         phoneNumber2:phoneNumber2.value,
                         SubCity:Subcity.value,
                         Email:email.value,
                         PassWorde:password.value,
                         Status:workeST.value
                    },
                    imgname:filePhate.value.split('fakepath')[1]
               }).then(()=>{
                    regsuss.hidden = false
                    regsuss.innerHTML = "Emplloyee registered"
                    setTimeout(() => {
                         regsuss.hidden = true
                    }, 3000);
               }).catch(()=>{
                    alert("Error")
               })
               reglod.hidden = true
          }
     }
})


// reg Driver js///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

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

const car = document.getElementById('car')
const Dmodel = document.getElementById('Dmodel')
const Mloder = document.getElementById('Mloder')

const Dplate = document.getElementById('plate')

const DRegister = document.getElementById('Dreg')
const Dcancel = document.getElementById('Dcan')
const Dreglod = document.getElementById('Dreglod')
const Dregsuss = document.getElementById('Dregsuss')

const regD = document.getElementById('regD')

regD.addEventListener('click', async()=>{
     await carNameP()
})

console.log("asdf");
const carNameP = async ()=>{
     const{data} = await axios.post('/get/car',{
          available:true
     })
     if (data.length > 0) {
          console.log(data);
          var html = ''
          var temp = []
          console.log(temp);
          for (let index = 0; index < data.length; index++) {
               console.log(temp.indexOf(data[index].name) === -1);
               if(temp.indexOf(data[index].name) == -1){
                    temp.push(data[index].name)
               }
               
          }
          console.log(temp);
          for (let index = 0; index < temp.length; index++) {
               html += `<option>${temp[index]}</option>`;
          }
          car.innerHTML = html
          await modelNameP()
     }else{
          car.innerHTML = '<option>no car found</option>'
     }

} 
window.onload = async()=>{
     await carNameP()
}

const modelNameP = async()=>{

     if(car.value != ''){
          Mloder.hidden = false
          const {data} = await axios.post('/get/car',{
               name: car.value,
               available: true
          })
          var temp = []
          for (let index = 0; index < data.length; index++) {
               if(temp.indexOf(data[index].model) == -1){
                    temp.push(data[index].model)
               }
               
          }
          Mloder.hidden = true
          var html2 = ''
          for (let index = 0; index < temp.length; index++) {
               html2 += `<option>${temp[index]}</option>`;
               console.log(data[index].model);
          }
          Dmodel.innerHTML = html2
          await platemap()
     }else{
          Dmodel.innerHTML = "no models"
     }
     
     
}
const platemap = async()=>{
     if(Dmodel.value){
         await axios.post('/get/car',{
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

car.addEventListener('change', async ()=>{
     await modelNameP()
     await platemap()
})

Dmodel.addEventListener('change', async()=>{
     await platemap()
})
DRegister.addEventListener('click', async()=>{
     const Dusers = [DFname.value, DLname.value, DfilePhate.value, DHomeNo.value, Dkebela.value, DphoneNumber1.value, DphoneNumber2.value, DDob.value]
     const Empty = varinput(Dusers, DDob, DHomeNo, Dkebela, DphoneNumber1, DphoneNumber2, DfilePhate)
     if (Empty) {
          const evar = await Varemail("D")
          Dreglod.hidden = false
          if(evar){
               const filename = DfilePhate.value
               const reg = await axios.post('/Register/driver',{
               data:{ 
                    firstName:DFname.value,
                    lastName:DLname.value,
                    Sex:DSex.value,
                    DOB:DDob.value,
                    City:city.value,
                    Kabala:Dkebela.value,
                    HomeNumber:DHomeNo.value,
                    phoneNumber1:DphoneNumber1.value,
                    phoneNumber2:DphoneNumber2.value,
                    Email:Demail.value,
                    SubCity:DSubcity.value,
                    PassWorde:Dpassword.value
                    },
                    carpro:{
                         PlatNumber:Dplate.value
                    },
                    imgname:filename.split('fakepath')[1]
               }).then(()=>{
                    Dregsuss.hidden = false
                    Dregsuss.innerHTML = "Driver registered"
                    setTimeout(() => {
                         Dregsuss.hidden = true
                    }, 3000);
               }).catch(()=>{
                    alert("Error")
               })
               Dreglod.hidden = true
          }
     }
})


// car reg js/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

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


const Cregister = document.getElementById('Creg')
const Ccancel = document.getElementById('Ccan')
const Creglod = document.getElementById('Creglod')
const Cregsuss = document.getElementById('Cregsuss')

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
               await axios.post('/Register/car',{
                    name:Cname.value.toUpperCase(),
                    model:parseInt(model.value),
                    MaxPaylodeLimt:parseInt(max.value),
                    minPaylodeLimt:parseInt(min.value),
                    PlatNumber:quan.value.toUpperCase()
               }).then(()=>{
                    Cregsuss.hidden = false
                    Cregister.innerHTML = "Edited"
                    setTimeout(() => {
                         Cregsuss.hidden = true
                    }, 3000);
               }).catch(()=>{
                    alert("Error")
               })
               Creglod.hidden = true
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



// edit form ////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
const searchValue = document.getElementById('serchinput')
const statusS = document.getElementById('status')
const search = document.getElementById('button-addon2')

const EFname = document.getElementById('EFname')
const ELname = document.getElementById('ELname')

const ESex = document.getElementById('Esex')
const EDob = document.getElementById('EDOB')

const EHomeNo = document.getElementById('EHomeno')
const Ekebela = document.getElementById('Ekebela')
const EsubCity = document.getElementById('EsubCity')

const EphoneNumber1 = document.getElementById('Ephone')
const EphoneNumber2 = document.getElementById('Ephone2')

const carass = document.getElementById('carass')

const header = document.getElementById('header')

const userpic = document.getElementById('userpic')

const Ecar = document.getElementById('Ecar')
const Emodel = document.getElementById('Emodel')
const Eplate = document.getElementById('Eplate')

const oldcarcon = document.getElementById('oldcarcon')
const PDcar = document.getElementById('PDcar')
const PDmodel = document.getElementById('PDmodel')
const PDplat = document.getElementById('PDplat')

const deva = document.getElementById('deva')
const DEinfocom = document.getElementById('DEinfocom')

const Eregister = document.getElementById('Ereg')
const Ecancel = document.getElementById('Ecan')
const Ereglod = document.getElementById('Ereglod')
const Eregsuss = document.getElementById('Eregsuss')

const Estaff = document.getElementById('Estaff')

const carNameP2 = async ()=>{
     
     const{data} = await axios.post('/get/car',{
          available:true
     })
     console.log(data);
     if (data.length > 0) {
          var html = ''
          var temp = []
          for (let index = 0; index < data.length; index++) {
               if(temp.indexOf(data[index].name) == -1){
                    temp.push(data[index].name)
                    console.log(temp);
               }
               
          }
          for (let index = 0; index < temp.length; index++) {
               html += `<option>${temp[index]}</option>`;
          }
          Ecar.innerHTML = html
          modelNameP2()
          await platemap2()
     }else{
          Ecar.innerHTML = '<option>no car found</option>'
     }

}
const platemap2 = async()=>{
     if(Dmodel.value){
         await axios.post('/get/car',{
             model: Emodel.value,
             name: Ecar.value,
             available:true
         }).then((data)=>{

               const list = data.data.map((data)=>{
                    return `<option>${data.PlatNumber}</option>`
               })
               Eplate.innerHTML = list
         })
     }else{
         console.log("teset");
     }
 }

Estaff.addEventListener('click', async()=>{
     await carNameP2()
})

Ecar.addEventListener('change',async ()=>{
     await modelNameP2()
     await platemap2()
})
Emodel.addEventListener('change', async()=>{
     await platemap2()
})
const modelNameP2 = async()=>{

     if(car.value != ''){
          const {data} = await axios.post('/get/car',{
               name: Ecar.value,
               available:true
          })
          var temp = []
          for (let index = 0; index < data.length; index++) {
               if(temp.indexOf(data[index].model) == -1){
                    temp.push(data[index].model)
                    console.log(temp);
               }
               
          }
          var html2 = ''
          for (let index = 0; index < temp.length; index++) {
               html2 += `<option>${temp[index]}</option>`;
          }
          Emodel.innerHTML = html2
     }else{
          Emodel.innerHTML = "no models"
     }
     
     
}

const inputCeck = (IhomeNo, Ikebela ,IphoneNumber1, IphoneNumber2, Idob)=>{
     if(IhomeNo.value != "new"){
          var homen = IhomeNo.value.split('-')
          if(homen.length == 2){
               if (parseInt(homen[0]) || parseInt(homen[0]) == homen[0] || !parseInt(homen[1]) || parseInt(homen[1]) != homen[1]) {
                    alert('Home number is invalid')
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

     var date = Idob.value.split('-')[0]
     if (date > 2000) {
          alert('the date you entered is invalid')
          dateErr.innerHTML = "the date you enter is invalid"
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
     return true
}

const isempty = (arry)=>{
     for (let index = 0; index < arry.length; index++) {
          const element = arry[index];
          if(element == undefined || element == ""){
               alert("Enter in all the fields provided")
               return false
          }else{
               continue
          }  
     }
     return true
}

const populat = async()=>{
    if(statusS.value == "Staff member"){
          await axios.post('get/staff', {
               _id:searchValue.value
          }).then(async (data)=>{
               
               if(data.data.length > 0){
                    EFname.value = data.data[0].firstName
                    ELname.value = data.data[0].lastName
                    ESex.value = data.data[0].Sex
                    EDob.value = data.data[0].DOB.split('T')[0]
                    EHomeNo.value = data.data[0].HomeNumber
                    Ekebela.value = data.data[0].Kabala
                    EsubCity.value = data.data[0].SubCity
                    EphoneNumber1.value = data.data[0].phoneNumber1
                    EphoneNumber2.value = data.data[0].phoneNumber2
                    userpic.src = `${data.data[0].ImgUrl}`
                    userpic.hidden = false
               }else{
                    alert("user not found")
               }
             
          }).catch((err)=>{console.log(err);})
    }else{
          await axios.post('get/driver', {
               _id: searchValue.value
          }).then(async (data)=>{
               if(data.data.length > 0){
               EFname.value = data.data[0].firstName
               ELname.value = data.data[0].lastName
               ESex.value = data.data[0].Sex
               EDob.value = data.data[0].DOB.split('T')[0]
               EHomeNo.value = data.data[0].HomeNumber
               Ekebela.value = data.data[0].Kabala
               EsubCity.value = data.data[0].SubCity
               EphoneNumber1.value = data.data[0].phoneNumber1
               EphoneNumber2.value = data.data[0].phoneNumber2
               userpic.src = `${data.data[0].ImgUrl}`
               userpic.hidden = false
               await axios.post('get/car', {
                    PlatNumber: data.data[0].carAs
               }).then(async (data)=>{
                    console.log(data.data);
                    PDcar.value = data.data[0].name
                    PDmodel.value = data.data[0].model
                    PDplat.value = data.data[0].PlatNumber
               })
          }else{
               alert("driver not found")
          }
             
          }).catch((err)=>{console.log(err);})
          
    }
}

search.addEventListener('click', ()=>{
     if(searchValue.value){
          populat()
     }else{
          alert("Enter in search propt")
     }
})

statusS.addEventListener('change', ()=>{
     if(statusS.value == "Driver"){
          carNameP2()
          header.innerHTML = "<h3>Driver edit form</h3>"
          carass.hidden = false
          EFname.value = null
               ELname.value = null
               ESex.value = "Male"
               EDob.value = null
               EHomeNo.value = "new"
               Ekebela.value = null
               EsubCity.value = "Bole"
               EphoneNumber1.value = null
               EphoneNumber2.value = null
               deva.hidden = false
               DEinfocom.checked = false
               oldcarcon.hidden = false
     }else{
          header.innerHTML = "<h3>Staff edit form</h3>"
          carass.hidden = true
          ELname.value = null
               ESex.value = "Male"
               EDob.value = null
               EHomeNo.value = "new"
               Ekebela.value = null
               EsubCity.value = "Bole"
               EphoneNumber1.value = null
               EphoneNumber2.value = null
               Ecar.value = null
               Emodel.value = null
               deva.hidden = true
               DEinfocom.checked = false
               oldcarcon.hidden = true
     }
})

Eregister.addEventListener('click', async ()=>{
     const data = [EFname.value, ELname.value, EHomeNo.value, Ekebela.value, EsubCity.value, EphoneNumber1.value, EphoneNumber2.value]

     if(isempty(data)){
          if(inputCeck(EHomeNo, Ekebela, EphoneNumber1, EphoneNumber2, EDob)){
               if(statusS.value == "Staff member"){
                    console.log(EsubCity.value);
                    Ereglod.hidden = false
                    await axios.patch('/edit/staff',{
                        data:{
                              firstName: EFname.value,
                              lastName: ELname.value,
                              Sex: ESex.value,
                              DOB: EDob.value,
                              SubCity: EsubCity.value,
                              Kabala: Ekebela.value,
                              HomeNumber:EHomeNo.value,
                              phoneNumber1: EphoneNumber1.value,
                              phoneNumber2: EphoneNumber2.value
                         },AddInfo:{
                              _id: searchValue.value
                         }
                    }).then(()=>{
                         Eregsuss.hidden = false
                         Eregsuss.innerHTML = "Edited"
                         setTimeout(() => {
                              Eregsuss.hidden = true
                         }, 3000);
                    }).catch((err)=>{
                         alert("Error")
                    })
                    Ereglod.hidden = true
               }else{
                    Ereglod.hidden = false
                    await axios.patch('/edit/dirver',{
                         data:{
                              firstName: EFname.value,
                              lastName: ELname.value,
                              Sex: ESex.value,
                              DOB: EDob.value,
                              SubCity: EsubCity.value,
                              Kabala: Ekebela.value,
                              HomeNumber:EHomeNo.value,
                              phoneNumber1: EphoneNumber1.value,
                              phoneNumber2: EphoneNumber2.value
                         },
                         AddInfo:{
                              _id: searchValue.value,
                              newPlatNumber:Eplate.value,
                              oldPlateNumber:PDplat.value,
                              commt:DEinfocom.value
                         }

                    }).then(()=>{
                         Eregsuss.hidden = false
                         Eregsuss.innerHTML = "Edited"
                         setTimeout(() => {
                              Eregsuss.hidden = true
                         }, 3000);
                    }).catch((err)=>{
                         alert('Error')
                    })
                    Ereglod.hidden = true
               }
          }
     }
})



//////////////////////////////////////////////////////////////////////////////////////
//edit car/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
const CEserchinput = document.getElementById('CEserchinput')
const CEbutton = document.getElementById('CEbutton-addon2')

const CEname = document.getElementById('CEname')
const CEmodel = document.getElementById('CEmodel')
const CEmax = document.getElementById('CEmax')
const CEmin = document.getElementById('CEmin')

const CEquan = document.getElementById('CEquan')

const CEEMmodel = document.getElementById('CEEMmodel')
const CEEMIVmodel = document.getElementById('CEEMIVmodel')

const CEEMmin = document.getElementById('CEEMmin')
const CEEMmax = document.getElementById('CEEMmax')
const CEMAloder = document.getElementById('CEMAloder')
const CEEMquan = document.getElementById('CEEMquan')
const CEgErr = document.getElementById('CEgErr')

const CECregister = document.getElementById('CECreg')
const CECcancel = document.getElementById('CECcan')
const ECreglod = document.getElementById('ECreglod')
const ECregsuss = document.getElementById('ECregsuss')

const CEtypeCastCheck = (arry, Imodel, Imax, Imin)=>{
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
          CEEMmodel.hidden = false
          setTimeout(() => {
               CEEMmodel.hidden = true
          }, 2000);
          return false
     }else{
          if (Imodel.value.length != 4 || Imodel.value[0] == 0) {
               CEEMIVmodel.hidden = false
               setTimeout(() => {
                    CEEMIVmodel.hidden = true
               }, 3000);
          }else{

               if(parseInt(Imax.value) != Imax.value){
                    CEEMmax.hidden = false
                    setTimeout(() => {
                         CEEMmax.hidden = true
                    }, 2000);
                    return false
               }else{
     
                    if(parseInt(Imin.value) != Imin.value){
                         CEEMmin.hidden = false
                         setTimeout(() => {
                              CEEMmin.hidden = true
                         }, 2000);
                         return false
                    }else{
                         return true
                    }
               }
          }
     }
}

const populat2 = async()=>{
     await axios.post('get/car',{
          _id:CEserchinput.value
     }).then((data)=>{
          CEname.value = data.data[0].name
          CEmodel.value = data.data[0].model 
          CEmax.value = data.data[0].MaxPaylodeLimt
          CEmin.value = data.data[0].minPaylodeLimt 
          CEquan.value = data.data[0].PlatNumber
     })
}

CEbutton.addEventListener('click', async()=>{
    await populat2()
})

CECregister.addEventListener('click', async()=>{
     const CEcardata = [CEname.value, CEmodel.value, CEmax.value, CEmin.value, CEquan.value]
     const typecast = CEtypeCastCheck(CEcardata, CEmodel, CEmax, CEmin)
     if(typecast){
          const fpu = parseInt(CEmax.value) * 0.5
          if(CEmax.value != CEmin.value && parseInt(CEmin.value) < parseInt(CEmax.value) && parseInt(CEmin.value) >= fpu){
               ECreglod.hidden = false
               await axios.patch('/edit/car',{
                    data:{
                         name:CEname.value,
                         model:parseInt(CEmodel.value),
                         MaxPaylodeLimt:parseInt(CEmax.value),
                         minPaylodeLimt:parseInt(CEmin.value),
                         PlatNumber:CEquan.value
                    },AddInfo:{
                         _id:CEserchinput.value
                    }
               }).then(()=>{
                    ECregsuss.hidden = false
                    ECregsuss.innerHTML = "Edited"
                    setTimeout(() => {
                         ECregsuss.hidden = true
                    }, 3000);
               }).catch(()=>{
                    alert("error")
               })
               ECreglod.hidden = true 
          }else{
               if(CEmax.value == CEmin.value){
                    CEgErr.innerHTML = "The max and min value can not be the same"
                    CEgErr.hidden = false
                    setTimeout(() => {
                         CEgErr.hidden = true
                    }, 3000);
               }else if (parseInt(min.value) > parseInt(max.value)) {
                    CEgErr.innerHTML = "The min value cannot be grater than the max"
                    CEgErr.hidden = false
                    setTimeout(() => {
                         CEgErr.hidden = true
                    }, 3000);
               } else {
                    CEgErr.innerHTML = "The min value cannot be less than 50% of max value"
                    CEgErr.hidden = false
                    setTimeout(() => {
                         CEgErr.hidden = true
                    }, 3000);
               }
          }
     }else{

     }

})

//////////////////////////////////////////////////////////////////////////
///////////// pro filr ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

const serchinputid = document.getElementById('serchinputid')
const searchButton = document.getElementById('PObutton-addon2')
const Wstatus =  document.getElementById('Wstatus')
const Dsort = document.getElementById('sort')
const procon = document.getElementById('sebody')
const proconDOM = document.querySelector('.sebody')
const SearchLoder = document.getElementById('SearchLoder')
const formatData = (data)=>{
     if(data.length > 0){
          var alldata = data.map((data)=>{
                    const  {_id,firstName, lastName, Sex, DOB, SubCity, Kabala, HomeNumber, Status, ImgUrl, Imgpublicid} = data
                    
                    if(Status == "Receptionist"){
                         return `<div class="row  bodyRE mt-4 mb-4" style="padding: 10px 10px; border-radius: 10px; color: rgb(0,0,0);">
                         <div class="col-2" style="text-align: center;">
                              <img src="${ImgUrl}" alt="img not found" width="90px" height="90px" style="border-radius:50px;">
                         </div>
                         <div class="col-3 ">
                              <div class="mt-1"><B>First Name:</B> ${firstName}</div>
                              <div class="mt-1"><B>Last Name:</B> ${lastName}</div>
                              <div class="mt-1"><B>Sex:</B> ${Sex}</div>
                         </div>
                              <div class="col">
                              <div class="mt-1"><B>DOB:</B> ${DOB.split("T")[0]} </div>
                              <div class="mt-1"><B>Sub-City:</B> ${SubCity} &nbsp; <B>Status:</B> ${Status}</div>
                              <div class="mt-1"><B>Home Number:</B> ${HomeNumber} &nbsp; <B>Kabala:</B> ${Kabala}
                                   &nbsp; &nbsp; <button class="DeleteData" data-id="${_id}/${Imgpublicid}" data-stat = "${Status}"style = "border: 0px;  color:red;">Delete <i class="fa-solid fa-trash-can"></i></button>
                                   <span hidden>&nbsp; &nbsp; <a href="#" hidden>More <i class="fa-solid fa-circle-info"></i></a></span>
                              </div>
                         </div>
                         </div>`
                    }else{
                         return `<div class="row  bodyRE mt-4 mb-4" style="padding: 10px 10px; border-radius: 10px; background-color: rgb(243 243 243); color: rgb(0,0,0);">
                         <div class="col-2" style="text-align: center;">
                           <img src="${ImgUrl}" alt="img not found" width="90px" height="90px" style="border-radius:50px;">
                         </div>
                         <div class="col-3 ">
                           <div class="mt-1"><B>First Name:</B> ${firstName}</div>
                           <div class="mt-1"><B>Last Name:</B> ${lastName}</div>
                           <div class="mt-1"><B>Sex:</B> ${Sex}</div>
                         </div>
                         <div class="col">
                           <div class="mt-1"><B>DOB:</B> ${DOB.split("T")[0]} </div>
                           <div class="mt-1"><B>Sub-City:</B> ${SubCity} &nbsp; <B>Status:</B> ${Status}</div>
                           <div class="mt-1"><B>Home Number:</B> ${HomeNumber} &nbsp; <B>Kabala:</B> ${Kabala}
                             &nbsp; &nbsp; <button class="DeleteData" data-id="${_id}/${Imgpublicid}"  data-stat = "${Status}" style = "border: 0px;  color:red;">Delete <i class="fa-solid fa-trash-can"></i></button>
                             &nbsp; &nbsp; <a href="">More <i class="fa-solid fa-circle-info"></i></a>
                           </div>
                         </div>
                       </div>`
                    }
               }).join('')    
               
          return alldata
     }else{
          return ` <div class="alert alert-warning" role="alert" id="CEEMquan">
          there are no ${Wstatus.value} with this particular ID
        </div>`
     }
     // &nbsp; &nbsp; <a href="" style="color: red;" class="DeleteData">Delete <i class="fa-solid fa-trash-can"></i></a>
}
const propile = async () =>{

     if(Wstatus.value == 'All'){
          SearchLoder.hidden = false
          procon.innerHTML = ""
          await axios.get(`/quarySearch?id=${serchinputid.value}&status=${Wstatus.value}&sort=${Dsort.value}`).then(({data:{staff, driver}})=>{
               if(staff.length > 0 && driver.length > 0){
                    procon.innerHTML = formatData(staff) + `<small class="text-muted ml-4">Drivers</small><hr>` + formatData(driver)
               }else{
                    procon.innerHTML = formatData(staff)
               }
               SearchLoder.hidden = true
          }).catch((err)=>{
               SearchLoder.hidden = true
               alert(err)
          })
     }else{ 
          SearchLoder.hidden = false
          procon.innerHTML = ""
          await axios.get(`/quarySearch?id=${serchinputid.value}&status=${Wstatus.value}&sort=${Dsort.value}`).then(({data:{data}})=>{
               procon.innerHTML = formatData(data)
               console.log(data);
               SearchLoder.hidden = true
          }).catch((err)=>{
               SearchLoder.hidden = true
               alert("invalid id")
          })
     }
}


propile()

searchButton.addEventListener('click',()=>{
     if(serchinputid.value && Wstatus.value != "All"){
          propile()
     }else if(!serchinputid.value){
          alert("search input can not be null")
     }else{
          alert("worck status can not bee all")
     }

})


Dsort.addEventListener("change", async()=>{
     await propile()
})

Wstatus.addEventListener('change', async()=>{
     await propile()
})


proconDOM.addEventListener('click', async (e) => {
     const el = e.target
     if(el.classList.contains('DeleteData')){
          const conferm = confirm("test")
          if(conferm){
               await axios.delete(`/delete?id=${el.dataset.id}&status=${el.dataset.stat}`).then(()=>{
                    console.log("dleleted");
                    propile()
               }).catch((err)=>{
                    console.log(err);
               })
          }

          
     }
 })



// const test = document.querySelectorAll('.header2')




// const observer = new IntersectionObserver((ob)=>{
//     ob.forEach(en=>{
//         if(en.isIntersecting){
//             en.target.style.animationName = "tra"
//         }else{
//             en.target.classList.remove('test')
//         }
//     })
// })

// test.forEach((re)=>observer.observe(re))


// const testScroll = ()=>{
//     window.scrollTo(0,0)
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// invantory manager //////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const itemList = document.getElementById('itemList')
const Searchinput = document.getElementById('search-input2')
const searchButton2 = document.getElementById('button-addon3')
const report = document.querySelector('.itemList')
const Addinve = document.getElementById('Addinve')
const Caninve = document.getElementById('Caninve')

var list = []
var Did = ""
var DEid = ""

searchButton2.addEventListener('click', async()=>{
     list.length = 0
     await axios.post('/HQgetdelver', {Drivarid: Searchinput.value}).then(async({data})=>{
          const {_id, ProductList, Drivarid} = data[0];
          Did = _id
          DEid = Drivarid
          for (let index = 0; index < ProductList.length; index++) {
                list.push(ProductList[index]);
          }
          const html = list.map((data)=>{
               const {id, productName, NumerOfCece, proDate, expDate} = data
               return `
               <tr>
                    <th scope="row"> ${id} </th>
                    <td>${productName}</td>
                    <td>${proDate}</td>
                    <td>${expDate}</td>
                    <td>${NumerOfCece}</td>
                    <td class = "report" data-id=${id}>Reprot as Damage</td>
               </tr>`
          }).join('')
          itemList.innerHTML = html
         
     })
})

const repopulate = (list)=>{
     const html = list.map((data)=>{
          const {id, productName, NumerOfCece, proDate, expDate} = data
          return `
          <tr>
               <th scope="row"> ${id} </th>
               <td>${productName}</td>
               <td>${proDate}</td>
               <td>${expDate}</td>
               <td>${NumerOfCece}</td>
               <td class = "report" data-id=${id}>Reprot as Damage</td>
          </tr>`
     }).join('')
     itemList.innerHTML = html 
}

report.addEventListener('click', async(e)=>{
     const E = e.target
     const con = confirm("are you sure you want to report this item")
     if(con){
          if(E.classList.contains('report')){
               const pid = E.dataset.id
               for (let index = 0; index < list.length; index++) {
                    const {id} = list[index]
                    if(id === pid){
                         console.log(list[index]);
                         await axios.post('/homepage/report',{
                              Data: list[index]
                         }).then(()=>{
                              console.log("reported");
                         })
                         list.splice(index,1)
                         repopulate(list)
                    }   
               }
          }else{
               console.log(false);
          }
     }
})


Addinve.addEventListener('click', async()=>{
     if(list.length > 0 ){
          await axios.post('homePage/AddToInv',{
               list: list,
               Did: Did,
               DEid: DEid
          }).then(()=>{
               clear()
               alert("products add to inventory")
          }).catch((Err)=>{
               console.log(Err);
          })
          list.length = 0
          console.log("asdfasdf");
     }else{
          console.log("asdfaffffffffffffffffffffffffffffff");
     }
})



const clear = ()=>{
     itemList.innerHTML = ""
     Searchinput.value = ""
}

Caninve.addEventListener('click', ()=>{
     clear()
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//alocate
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const urlParams = new URLSearchParams(window.location.search);
const quary = urlParams.get('stat');

const proALLList = document.getElementById('homeaolo')

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
    await axios.post('/homepage/getinv').then((Sdata)=>{
        const {data:{data}} = Sdata
        ALsearchTerms.length = 0
        data.forEach(proName=>{
            if(ALsearchTerms.indexOf(proName.ProductName) === -1){

                ALsearchTerms.push(`${proName.ProductName} / ${proName.inStock}-${proName._id}`)
            }
        })
    })
}

proALLList.addEventListener('click', async()=>{
    await ALUpdate()
    await ALpopulatelist()
})

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
    await axios.post('/homepage/getinv').then(({data:{data}})=>{
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
            await axios.post('/homepage/getinv', {_id:tempid.split('-')[1]}).then(({data})=>{
                const {_id,proDate, expDAte, pricePerCase} = data.data[0]
                const ob = {
                    productName : ALprodcutName.value,
                    id:tempid.split('-')[1],
                    NumerOfCece:ALnumberOfcaces.value,
                    expDate:expDAte.split('T')[0],
                    proDate:proDate.split('T')[0],
                    pricePerCase:pricePerCase
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
    await axios.post("/get/driver",{
        firstName: ALDriverName.value.split(' ')[0],
        lastName: ALDriverName.value.split(' ')[1]
    }).then((D)=>{
        const {data} = D
        console.log(data);
        ALdriverId.value = data[0]._id
        ALplateNumber.value = data[0].carAs
    })
}

const ALpopulatelist = async()=>{
    await axios.post('/get/driver',{
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

window.onload = async()=>{
    await ALpopulatelist()
    console.log("asdf");
}

ALDriverName.addEventListener('change', async()=>{
    await ALIP()
})

AlsearchButton.addEventListener('click', async()=>{
    if(ALidSelect.value){
        await axios.post('/get/driver',{
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
            await axios.post('/homepage/alo',{
                driverID:ALdriverId.value,
                productList:dalivaryList
            }).then(async(data)=>{
                didc = data.data._id
                exportHTML()
                await ALpopulatelist()
                await ALIP()
                dalivaryList.length = 0
                ALtableBody.innerHTML = ""
            })
        }else{
            if (ALsedriverName.value, ALdriverId.value, ALplateNumber.value) {
                await axios.post('/homepage/alo',{
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


///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
 // Clearance and cashin
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

const CCdid = document.getElementById('CCdid')
const CCsearchB = document.getElementById('CCsearchB')

const CCitemList = document.getElementById('CCitemList')

const cashal = document.getElementById('cashal')
const CCgenerate = document.getElementById('CCgenerate')

var tlistp2
var Dlist = []

const getReturnItems = async()=>{
     if(CCdid.value){
          await axios.post('/home/getDlist',{Drivarid:CCdid.value}).then(({data})=>{
               const {ProductList} = data[0]
               Dlist = ProductList
               CCitemList.innerHTML = ''
               tlistp2 = ''
               if(ProductList.length > 0){
                    const html = ProductList.map((data)=>{
                         const{id, productName, proDate, expDate, NumerOfCece} = data
                         return `
                         <tr>
                              <th scope="row"> ${id} </th>
                              <td>${productName}</td>
                              <td>${proDate}</td>
                              <td>${expDate}</td>
                              <td>${NumerOfCece}</td>
                         </tr>`
                    }).join('')
                    CCitemList.innerHTML = html
                    tlistp2 = html
               }
          })
          await cashinGenerator()
     }
}

const cashinGenerator = async()=>{
     await axios.post('/get/driver',{_id: CCdid.value}).then(({data})=>{
          const{paylode} = data[0]
          console.log(paylode, Dlist);
          var totalPrice = 0
          for (let i = 0; i < paylode.length; i++) {
               for (let j = 0; j < Dlist.length; j++) {
                    if(paylode[i].productName == Dlist[j].productName){
                         const casesSold = Math.abs(parseInt(paylode[i].NumerOfCece) - parseInt(Dlist[j].NumerOfCece))
                         totalPrice += casesSold * paylode[i].pricePerCase
                    } 
               }
               
          }
          console.log(totalPrice);
          cashal.hidden = false
          cashal.innerText = `Cash that should be deposited is ${totalPrice} Birr`
     })
}

CCsearchB.addEventListener('click', async()=>{
     await getReturnItems()
})

CCgenerate.addEventListener('click', async()=>{
     if(CCdid.value){
          await axios.post('/DRS/returnes',{Drivarid: CCdid.value}).then(async()=>{
               await exportHTML2()
               CCdid.value = ''
               cashal.innerText = ""
               cashal.hidden = true
               CCitemList.innerHTML = ''
          })
     }
})

const exportHTML2 = async()=>{
     var current_date = new Date();
     current_date =  current_date.toISOString();
     const cle = `  <h1>
     <h3>
       <center>Returned itemes Clearance</center>
     </h3>
   </h1>
   <center>From inbentory management for returning items validation</center>
   <br>
     <h4>
       <b>Date: <u>${current_date.split('T')[0].split('-').join('/')}</u></b>
       <br>
       <br>
       <b>Time: <u>${current_date.split('T')[1].split('.')[0]}</u></b>
     </h4>
     <b>Delivery ID: <u>${CCdid.value}</u></b>
   `
     const {data} = await axios.post('/get/driver',{_id: CCdid.value})
     const p = data.map((data)=>{
          const {_id, firstName, lastName, carAs} = data
          return `
          <p>
      <ul>
       <li>This form must be presented to the inventory workers when returing unsold items</li>
       <li>Your ID must be with you presenting this form</li>
       <li>This form is only valid to the person that the name is registerd under and can only be accepted if said person is present</li>
       <li>if you Lose this form you have to report to head office before getting a new one</li>
     </ul>
     <h3><u>Driveres information</u></h3>
     <b>Driver ID: </b><u>${_id}</u><br><br>
     <b>First Name: </b><u>${firstName}</u> &nbsp; &nbsp; <b>Last Name: </b><u>${lastName}</u><br><br>
     <b>Car plate Number: </b><u>${carAs}</u>
     <b></b><br>
     <h3>
       <u>List of Products to be returned</u>
     </h3>
   </p>
          `
     }).join('')
     const otable = `<table style="border: 1px solid black;  width: 645px;"> 
                     <thead>
                         <tr>
                         <th scope="col">#ID</th>
                         <th scope="col">Name</th>
                         <th scope="col">Prodcution</th>
                         <th scope="col">Experation</th>
                         <th scope="col">ceses</th>
                         </tr>
                     </thead>
                     <tbody>`
     
     const tbodyc = '</tbody>'
     const ctable = '</table>'
     const final = cle + p + otable + tlistp2 + tbodyc + ctable
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

  //////////////////////////////////////////////////////////////////
// product listing
//////////////////////////////////////////////////////////////////
const searchCon = document.getElementById('searchCon')

const Lisearch = document.getElementById('Lisearchinput')
const Lisearchbutton = document.getElementById('LIsearchBu')

const Liselect = document.getElementById('Select')

const tbody = document.getElementById('table')
const link = document.getElementById('v-pills-lis-tab')


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
    await axios.post('homepage/getinv',{}).then(({data:{data}})=>{
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
        await axios.post('/home/getDlist').then((Data)=>{
            const {data} = Data
            const html = data.map((D)=>{
                const {_id, Drivarid} = D
                return` <tr>
                            <th scope="row">${_id}</th>
                            <td>${Drivarid}</td>
                        </tr>
              `
            }).join('')
            tbody.innerHTML = delivary+headerO+html+headerC
        })
    }else{
        await axios.post('/home/getDlist',{_id: Lisearch.value}).then((Data)=>{
            const {data} = Data
            const html = data.map((D)=>{
                const {_id, Drivarid} = D
                return` <tr>
                            <th scope="row">${_id}</th>
                            <td>${Drivarid}</td>
                        </tr>
              `
            }).join('')
            tbody.innerHTML = delivary+headerO+html+headerC
        })
    }
}

const PODriver = async(s = "none")=>{
    if(s == 'none'){
        await axios.post('/get/driver').then((Data)=>{
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
        await axios.post('/get/driver',{_id:Lisearch.value}).then((Data)=>{
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

///////////////////////////////////////////////////////////////////////////////
// request fomr//
////////////////////////////////////////////////////////////////////////

const reqProductName = document.getElementById('productName')
const reqNumberOfcases = document.getElementById('numberOfCases')
const reqAdd = document.getElementById('reqAdd')

const reqQtable = document.querySelector('.reqTable')
const reqTable = document.getElementById('tbody')

const reqSend = document.getElementById('reqSend')
const reqCancel = document.getElementById('reqCancel')

const reqAutoCom = document.getElementById('autocomplete-list-req')

var req_aout_list = []
var req_list = []

const populat_req_aout_list = async()=>{
     req_aout_list.length = 0
     await axios.post('HQ/getRef').then(({data})=>{
          for (let index = 0; index < data.data.length; index++) {
               req_aout_list.push(data.data[index].ProductName)
          }
     })
}
populat_req_aout_list()


function updateAutocompleteList2() {
  
     reqAutoCom.innerHTML = '';
   
     
     const inputValue = reqProductName.value.toLowerCase();
     
     const filteredSearchTerms = req_aout_list.filter(term => {
         return term.toLowerCase().startsWith(inputValue);
     });
   
     
     filteredSearchTerms.forEach(term => {
       const li = document.createElement('li');
       li.textContent = term;
       reqAutoCom.appendChild(li);
     });
}
   
   
reqProductName.addEventListener('keyup', () => {

if(reqProductName.value != ""){
     
     reqAutoCom.hidden = false
     updateAutocompleteList2();
}else{
     reqAutoCom.hidden = true
}

});


reqAutoCom.addEventListener('click', event => {
if (event.target.nodeName === 'LI') {
     reqProductName.value = event.target.textContent;
     reqAutoCom.hidden = true
     reqAutoCom.innerHTML = '';
}
});

const req_populate_table = (Object)=>{
     var html = ``
     for (let index = 0; index < Object.length; index++) {
          const {ProductName, NumberOfcases} = Object[index];
          html+= `
               <tr>
                    <td>${ProductName}</td>
                    <td>${NumberOfcases}</td>
                    <td style="color: red;  cursor: pointer;" data-index = '${index}' class='remove'>Remove</td>
               </tr>
          `
     }
     reqTable.innerHTML = html
}

reqAdd.addEventListener('click', async()=>{
     if(reqProductName.value && reqNumberOfcases.value){
          await axios.post('HQ/getRef',{ProductName: reqProductName.value.toUpperCase()}).then(({data})=>{
               if(data.data.length > 0){
                    var temp_object = {
                         ProductName: reqProductName.value,
                         NumberOfcases: parseInt(reqNumberOfcases.value)
                    }
                    req_list.push(temp_object)
                    req_populate_table(req_list)
                    req_clear_input("input")
               }else{
                    alert('This item does not exist in the product reference')
               }
          })

     }else{
          alert("Enter in all the fields provided")
     }
})

reqQtable.addEventListener('click', (e)=>{
     const el = e.target
     if(el.classList.contains('remove')){
          const con = confirm(`Are you sure you want to remove ${req_list[el.dataset.index].ProductName} from the request list`)
          if(con){
               console.log(req_list.splice(el.dataset.index, 1));
               req_populate_table(req_list)
          }
     }
})

const req_clear_input = (stat = "table")=>{
     if(stat == "table"){
          req_populate_table(req_list.length = 0)
     }else{
          reqProductName.value='';
          reqNumberOfcases.value= ''
     }
}

reqCancel.addEventListener('click', ()=>{
    const con = confirm("Are you sure you want to clear the request list")
    if(con){
          req_clear_input()
    }
})

reqSend.addEventListener('click', async()=>{
     if(req_list.length > 0){
          await axios.post('send/request',{items:req_list}).then(()=>{
               req_clear_input()
               alert("items Requested Successful.")
          }).catch(()=>{
               alert('Somethin went wrong with the connection')
          })
     }else{
          alert('Currently there are no items selected make sure you select an item before sending requests')
     }
})
