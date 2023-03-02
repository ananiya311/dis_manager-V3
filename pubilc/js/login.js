const email = document.getElementById('staticEmail')
const password = document.getElementById('inputPassword')
const test = document.getElementById('cancle')
const t = document.getElementById('err')

const submit = document.getElementById('submit')
const anima = document.getElementById("test")
test.addEventListener('click', async ()=>{
    password.value = null
    email.value = null 
})

submit.addEventListener("click", async()=>{
    anima.hidden = false
    const {data} = await axios.post("/login-var",{
        email:email.value,
        password:password.value
    })
    if(data.error){
        anima.hidden = true
        alert("the password or the email you enter is incorrect")
    }else{
        anima.hidden = true
        location.replace('http://localhost:1000/')
    }
    
    
})

