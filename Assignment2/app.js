let allCatagory = async (category_id) => {
    try {

        let response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`)
        var info = await response.json();
        showAll(info);
    }
    catch {
        console.log("No data found");
    }

}


let showAll = (info) => {
    console.log(info);
    let contents = document.getElementById("contents");
    let noData= document.getElementById("noData");

    contents.innerHTML="";
    noData.innerHTML="";
    console.log(info.status);

    if(info.status==true){
        info["data"].forEach((data) => {
            let card = document.createElement("div");
            card.classList.add("box");
            card.innerHTML = `
            <div class= "thumbnail">
            <img class="box-img" src=${data.thumbnail} alt="Thumbnail">
            </div>
            <div class="caption">
    
            <div class="dp">
                <img style="
                object-fit: cover;
                height: 30px;
                width: 30px;
                margin-left: 20px;
                border-radius: 30px;
                " src=${data.authors[0]?.profile_picture} alt="profile_picture">
                <div>
                </div>
            </div>
    
            <div class="video_details" style="text-align: center; margin-bottom: 30px;">
                <div>
                <h6>${  data.title}</h6>
                <span>${data.authors[0]?.profile_name}</span>
                ${data.authors[0]?.verified ? '<i class="fa-solid fa-circle-check fa-xs"></i>' : ''}
                <br>
                <span>${data.others.views} views</span>
                </div>
                
        
            </div>
            
            </div>  
           
            `
            contents.appendChild(card);     
        })
    }
    else{
        
        let msg= document.createElement("div");
        // let errormsg= document.createElement("div");

        msg.innerHTML=`
        <img src="./Icon.png" alt="error"><br><br>
        <h3> OOPS!! Sorry, There is no content here</h3>
        `
        noData.appendChild(msg);

    }
   
}

allCatagory("1000");


let sortview=async()=>{

    let response= await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`)
    let mainInfo= await (response).json();
    let info= mainInfo;

    console.log(Array.isArray(info));

    function conversion(num){
        if(num.includes('K')){
            return parseFloat(num) * 1000;
        }
        else
        return parseFloat(num);

    }

   
    for (let i = 0; i < info.data.length - 1; i++) {
        for (let j = i + 1; j < info.data.length; j++) {
            if (parseInt(conversion((info.data[i].others.views))) < parseInt(conversion((info.data[j].others.views)))) {
                let temp = info.data[i];
                info.data[i] = info.data[j];
                info.data[j] = temp;
            }
        }
    }
    console.log(info);
    showAll(info);


}



