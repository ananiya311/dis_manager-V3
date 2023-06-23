const email = document.getElementById('email')
const password = document.getElementById('password')

const login = document.getElementById('Login')

login.addEventListener('click',async()=>{
    const {data} = await axios.post('/Dlog-var',{
        email:email.value,
        password:password.value
    })

    if(data.var){
       document.getElementById('test').click()
    }
})