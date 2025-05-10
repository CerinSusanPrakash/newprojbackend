const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://cerinsusanp:3Obd2NTfPRkojBDT@cluster0.3pugmjs.mongodb.net/productDB?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('DB connected')
    // createAdmin();
}).catch((error)=>{
    console.log('Error in connection')
})
