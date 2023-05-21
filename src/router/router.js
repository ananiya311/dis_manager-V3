const experss = require('express')
const route = experss.Router()
const jwt = require('jsonwebtoken')
const date = require('date-and-time')


const img = require('../db/cloudinary')
const users = require('../module/usersModule')
const cars = require('../module/carModule')
const driveres = require('../module/driverModule')
const product  = require('../module/productsModule')
const homeInv = require('../module/homeinv')
const prodcutRef = require('../module/ProductRef')
const ProductRef = require('../module/ProductRef')
const HQinv = require('../module/HQinv')
const HQdriver = require('../module/HQdriver')
const HQcar = require('../module/HQcar')
const HQdalivarL = require('../module/HQdealivarylist')


const baceimgUri = "C:/Users/ananiya muluken/Pictures"

require('dotenv').config()

// home router
route.get('/homePage', async(req, res)=>{
    res.render("home.ejs")
})
route.get('/', async(req, res)=>{
    if(req.cookies.Token != "null"){
        res.redirect('/homePage')
    }else{
        res.render('loginform.ejs')
    }
    // if(cookie === 'undefined'){
    // }else{
    //     try {
    //         res.render('home.ejs')
    //     } catch (error) {
    //         console.log(error);
    //     }
    // } 
    
})

// log in and lgo out  router

route.get('/logout', async (req, res)=>{
    console.log(req.cookies);
    res.cookie(`Token`,"null",{
        expires: new Date('5 11 2055'),
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    res.redirect('/')
})

route.get('/get/pro', async(req, res)=>{
    await users.findOne({_id: req.cookies.Token}).then((data)=>{
        res.status(200).json(data);
    })
})

route.post('/login-var', async (req, res)=>{
    try{
        const user = req.body
        const file = await users.findOne({PassWorde: user.password, Email: user.email})
        if (file != null) {
            const id = file._id
            res.cookie(`Token`,`${id}`,{
                expires: new Date('5 11 2050'),
                secure: true,
                httpOnly: true,
                sameSite: 'lax'
            });
            res.send({error:false})
        }else{
            res.send({error:true})
        }
    }catch(error){
        console.log(error);
    }
})


// user get and set routers
route.post('/get/:key', async(req, res)=>{
    
    const key = req.params.key
    try {
        console.log("testssssssssssssssssssssssssss");
        if (key) {
            if(key === "pro"){
                const id = req.cookies.Token
                const data= await users.findOne({_id:id})
                console.log(data);
                res.status(200).json(data)
                
    
            }else if (key === "staff") {
                const data = await users.find(req.body)
                res.status(200).json(data)
                
    
            }else if(key === "car"){
                const data = await cars.find(req.body)
                res.status(200).json(data)
                
                
            }else if(key === "driver"){
                const data = await driveres.find(req.body)
                res.status(200).json(data)
            }
        }
    } catch (error) {
        res.status(404).send("erro");
    }
})
route.post('/Register/:key', async(req, res)=>{
        const key = req.params.key
        if (key === "staff"){
            const {data, imgname}= req.body
            const imguplod = await img.uplodImage(baceimgUri+imgname)
            const {url} = await img.getimg(imguplod)
            data.ImgUrl = url
            data.Imgpublicid = imguplod
            await users.create(data)
            res.status(200).send("Ok")
        
        }else if (key === "driver") {
            
            const {data, carpro, imgname} = req.body
            console.log(data);
            const car = await cars.findOne(carpro)
            const imguplod = await img.uplodImage(baceimgUri+imgname)
            const {url} = await img.getimg(imguplod)
            data.carAs = carpro.PlatNumber
            data.ImgUrl = url
            data.Imgpublicid = imguplod
            const test = await driveres.create(data)
            await cars.updateOne({_id: car._id}, {available: false})
            console.log(test);
            res.status(200).send("Ok")
        
        }else if(key === "car"){
            await cars.create(req.body)
            res.status(200).send("Ok")
        } 
        return
})

route.patch('/edit/:key', async(req, res)=>{
    const  key = req.params.key
    try {
        if(key){
            if(key == "staff"){
                const {data, AddInfo} = req.body
                await users.updateOne(AddInfo, data)
                res.status(200).send("seccess")
            }else if (key == "dirver") {
                const {data, AddInfo} = req.body
                if(AddInfo.commt){
                    data.carAs = AddInfo.newPlatNumber
                    await driveres.updateOne({_id: AddInfo._id}, data).then(async()=>{
                        await cars.updateOne({PlatNumber:AddInfo.oldPlateNumber},{available:true})
                        await cars.updateOne({PlatNumber:AddInfo.newPlatNumber}, {available: false})
                    })
                }else{
                    await driveres.updateOne({_id: AddInfo._id}, data)
                }
                res.status(200).send("seccess")
                console.log(data);
                
            }else if(key == "car"){
                console.log(req.body);
                const {data, AddInfo} = req.body
                await cars.updateOne(AddInfo, data)
                res.status(200).send("seccess")
            }
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("err")
    }
})

route.get('/quarySearch', async(req, res)=>{
    try {
        var {status, sort, id} = req.query
        if (status == "All") {
            console.log(sort);
            if(sort == "Name"){
                console.log("test");
                console.log("test");
                await users.find().sort({Status:0}).then(
                    async(staff)=>{
                        await driveres.find().sort({firstName:0, lastName:0}).then(
                            async(driver)=>{
                                res.status(200).json({staff, driver}) 
                            })
                            .catch((err)=>{
                                res.status(404).send("Canceld")
                            })
                    
                    }).catch((err)=>{
                        res.status(404).send("Canceld")
                    })
            }else{
                await users.find().sort(sort).then(
                    async(staff)=>{
                        await driveres.find().sort(sort).then(
                            async(driver)=>{
                                res.status(200).json({staff, driver}) 
                            })
                            .catch((err)=>{
                                res.status(404).send("Canceld")
                            })
                    
                    }).catch((err)=>{
                        res.status(404).send("Canceld")
                    })
            }
        }else{
            if(id){
                if(status == "Driver"){
                    console.log("ddddddd");
                    await driveres.find({_id: id}).then((data)=>{
                        res.status(200).json({data})
                    }).catch((err)=>{
                        res.status(404).send("Canceld")
                    })
                }else{
                    await users.find({_id: id, Status:status}).then((data)=>{
                        res.status(200).json({data})
                    }).catch((err)=>{
                        res.status(404).send("Canceld")
                    })
                }
            }else{
                console.log("no id");
                if(status == "Driver"){
                    if(sort=="Name"){
                        await driveres.find().sort({firstName:0, lastName:0}).then((data)=>{
                            res.status(200).json({data})
                        }).catch((err)=>{
                            res.status(404).send("Canceld")
                        })
                    }else{
                        await driveres.find().sort(sort).then((data)=>{
                            res.status(200).json({data})
                        }).catch((err)=>{
                            res.status(404).send("Canceld")
                        })
                    }
                    
                }else{
                    if(status == "Name"){
                        await users.find({Status: status}).sort({firstName:0, lastName:0}).then((data)=>{
                            res.status(200).json({data})
                        }).catch((err)=>{
                            res.status(404).send("Canceld")
                        })
                    }else{
                        await users.find({Status: status}).sort(sort).then((data)=>{
                            res.status(200).json({data})
                        }).catch((err)=>{
                            res.status(404).send("Canceld")
                        })
                    }
                }
            }
        }
    } catch (error) {
        res.status(404).send("no connection")
    }
})

route.delete('/delete', async(req, res)=>{
    const {id, status} = req.query
    console.log("test");
    if(status == "Driver"){
        await driveres.findOne({_id:id.split('/')[0]}).then(async(data)=>{
            await cars.updateOne({PlatNumber:data.carAs}, {available: true})
        })
        await driveres.deleteOne({_id:id.split('/')[0]}).then(async()=>{
            await img.cloud.uploader.destroy(id.split('/')[1]).then(()=>{
                res.status(200).send("OK")
            }).catch((err)=>{
                res.status(404).send("canceld")
            })
        }).catch((err)=>{
            res.status(404).send("canceld")
        })
    }else{
        await users.deleteOne({_id:id.split('/')[0]}).then(async()=>{
            await img.cloud.uploader.destroy(id.split('/')[1]).then(()=>{
                res.status(200).send("OK")
            }).catch((err)=>{
                res.status(404).send("canceld")
            })
        }).catch((err)=>{
            res.status(404).send("canceld")
        })
    }
})

/// home page invantory manger
route.post('/homePage/AddToInv', async(req, res)=>{
    try {
        const list = req.body.list
        for (let index = 0; index < list.length; index++) {
            const {id} = list[index];
            await HQinv.findOne({_id: id}).then((data)=>{
                const {ProductName, picPerCase, pricePerCase,pricePerpices, proDate, expDAte} = data
                
            })
        }
    } catch (error) {
     res.status(404).send("error")
    }
 })


// HQ
route.get('/HQ', async(req, res)=>{
    res.render('HQ.ejs')
})
route.get('/Allocate', async(req, res)=>{
    res.render("HQalo.ejs")
})

route.post('/HQ/addRef', async(req, res)=>{
    try {
        await ProductRef.create(req.body,{$caseSensitive :false})
        res.status(200).send("OK")
    } catch (error) {
        res.status(404).send(error)
    }
})

route.post('/HQ/getRef', async(req, res)=>{
    try{
        console.log(req.body);
        const data = await prodcutRef.find(req.body)
        res.status(200).json({data})
    }catch(err){
        res.status(404).send("not found")
    }
})

route.patch('/HQ/editRef', async(req, res)=>{
    try{
        const {newdata,oldname:{proname}} = req.body
        const {_id} = await prodcutRef.findOne({ProductName:proname})
        await prodcutRef.updateOne({_id:_id}, newdata)
        res.status(200).send('edited')
    }catch(err){
        res.status(404).sedn('not edited')
    }
})

route.post('/HQ/AddToInv', async(req, res)=>{
   try {
    await HQinv.create(req.body)   
    res.status(200).send("ok")
   } catch (error) {
    res.status(404).send("error")
   }
})

route.post('/HQ/getInv', async(req, res)=>{
    try{
        const data = await HQinv.find(req.body)
        res.status(200).json({data})
    }catch(error){
        res.status(404).send('error')
    }
})

route.patch('/HQ/editInv', async(req, res)=>{
    try {
        const {id, newdata} = req.body
        await HQinv.updateOne(id, newdata)
        res.status(200).send('ok')
    } catch (error) {
        res.status(404).send('error')
    }
})

route.delete('/HQ/DeleteInv', async(req, res)=>{
    console.log("testestst");
    try {
        const id = req.body
        await HQinv.deleteOne(id)
        res.status(200).send('ok')
    } catch (error) {
        res.status(404).send('error')
    }
})

route.post('/HQRegister/dirvers', async(req, res)=>{
   try {
    const {data, carpro, imgname} = req.body
    console.log(data);
    const car = await HQcar.findOne(carpro)
    console.log(car);
    const imguplod = await img.uplodImage(baceimgUri+imgname)
    const {url} = await img.getimg(imguplod)
    data.carAs = car.PlatNumber
    data.ImgUrl = url
    data.Imgpublicid = imguplod
    const test = await HQdriver.create(data)
    await HQcar.updateOne({_id: car._id}, {available: false})
    console.log(test);
    res.status(200).send("Ok")
   } catch (error) {
    console.log(error);
    res.status(404).json(error)
   }
})

route.post('/HQgetDriv', async(req, res)=>{
    try {
        const data = await HQdriver.find(req.body)
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
})

route.patch('/HQedidtDriver',async(req, res)=>{
    try {
        
        const {data, AddInfo:{userid:{_id:uid}, oldplate:{PlatNumber:oPlate}, newplate:{PlatNumber:nPlate}, allterStat:{stat}}} = req.body
        
        await HQdriver.updateOne({_id:uid}, data)
        

        if(stat){
            await HQcar.updateOne({PlatNumber:oPlate},{available:true})
            await HQcar.updateOne({PlatNumber:nPlate}, {available: false})
            await HQdriver.updateOne({_id:uid}, {carAs:nPlate})
            res.status(200).send("ok")
        }else{
            res.status(200).send("ok")
        }
    
        // const {_id: Ncar, instock:Nst} = await cars.findOne({name:AddInfo.carname, model:AddInfo.carmodel})
        // await cars.updateOne({_id:Ncar}, {instock: Nst-1})
    
        // const{instock} = await cars.findOne({_id: Ocar})
        // await cars.updateOne({_id: Ocar}, {instock:instock+1})
        // data.carAs = Ncar
        // const test = await driveres.updateOne({_id:AddInfo.user_id},data)
        // res.status(200).send("seccess")
    //     console.log(data);
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
})
route.delete('/HQdeleteDriver', async(req, res)=>{
    console.log("error");
    
    try {
        await HQdriver.findOne(req.body).then(async(data)=>{
            const {carAs} = data
            await HQcar.updateOne({PlatNumber:carAs}, {available:true}).then(async()=>{
                await HQdriver.deleteOne(req.body)
            })
        })
        res.status(200).send("ok")
        console.log("error");
    } catch (error) {
        console.log(error);
        res.status(404).send("Canceled")
    }
})
route.post('/HQGetcar', async(req, res)=>{
    try {
        console.log("asdfasdf");
        console.log(req.body);
        const data = await HQcar.find(req.body)
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
})

route.post('/HQCarreg', async(req, res)=>{
    try {
        await HQcar.create(req.body)
        res.status(200).json("OK")
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
})

route.patch('/HQcarEdit', async(req, res)=>{
    try {
        const {newdata, _id} = req.body
        console.log(newdata, _id);
        await HQcar.updateOne(_id, newdata)
        res.status(200).send("ok")
    } catch (error) {
        console.log(error);

        
        res.status(404).json(error)
    }
})

route.delete('/HQcarDelete', async(req, res)=>{
    try{
        console.log("testsdadsf");
        const data = req.body
        await HQcar.deleteOne(data)
        res.status(200).send("ok")
    }catch(err){
        res.status(404).send("canceld")
    }
})

route.post('/HQdelver', async(req, res)=>{
    try{
        const {driverID, productList} = req.body
        
        const file = await HQdalivarL.create({
            Drivarid:driverID,
            ProductList:productList
        }).then( async (file)=>{
            for (let i = 0; i < productList.length; i++) {
                const {id, NumerOfCece} = productList[i];
                await HQinv.findOne({_id: id}).then(async(data)=>{
                    const {inStock} = data
                    if(inStock === NumerOfCece){
                        await HQinv.deleteOne({_id:id})
                    }else{
                        await HQinv.updateOne({_id:id}, {inStock: inStock - NumerOfCece})
                    }
                })
            }
            await HQdriver.updateOne({_id:driverID}, {avilavile: false}).then(async(data)=>{
                console.log(data);
            })
            res.json(file).status(200)
        })


    }catch(err){
        console.log(err);
        res.status(404).send('Cancel')
    }
})

route.post('/HQgetdelver', async(req, res)=>{
    try{
        const data = await HQdalivarL.find(req.body)
        res.status(200).json(data)
    }catch(err){
        res.status(404).json(err)
    }
})

route.post('/HQdelvercancel', async(req, res)=>{
    try{
        const {_id} = req.body
        console.log(req.body);
        await HQdalivarL.findOne({_id:_id}).then(async(data)=>{
            const {Drivarid, _id, ProductList} = data
            console.log(data);
            await HQdriver.updateOne({_id: Drivarid}, {avilavile:true})
            
            for (let i = 0; i < ProductList.length; i++) {
                const element = ProductList[i];
                const Ufile = await HQinv.findOne({_id:element.id})
                await HQinv.updateOne({_id: Ufile._id}, {inStock: parseInt(element.NumerOfCece) + parseInt(Ufile.inStock)})
            }

            await HQdalivarL.deleteOne({_id: _id})
        })
        res.status(200).send('ok')
    }catch(err){
        console.log(err);
        res.status(404).json(err)
    }
})

module.exports = route