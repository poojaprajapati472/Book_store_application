import axios from 'axios';
let success_counter =0;
let failure_counter=0;
async function localApi(data:any){
 try{
    
    const response = await axios.post('http://localhost:3000/app/purchase',data);

    console.log('Success',response.data)
    success_counter++;

 }  
 catch(error){
    console.error("failed")
    failure_counter++;
 } 
}
async function runloop(){
    
    let arr=[]
    for (let i=0;i<=100;i++)
    {
      arr.push(localApi({
        "bookId": "6603cc2d299c4c8d6a78a976",
        "userId": "65ff32bbc6d354b3c351c409",
        "purchaseDate": "2024-03-26T12:00:00Z",
        "price": 700
    }))
}
await Promise.allSettled(arr);
console.log("succes",success_counter)
console.log("failue" ,failure_counter)
}
runloop()




