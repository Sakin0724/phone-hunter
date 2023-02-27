const loadPhones = async (searchText,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data,dataLimit);

}

const displayPhones = (phones, dataLimit)=> {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    // show only 10 phone at a time
    const showAll = document.getElementById('show-all');
    if( dataLimit && phones.length >10 ){
    phones= phones.slice(0,10);
 
   showAll.classList.remove('d-none') ; 
}
else{
    showAll.classList.add('d-none') ; 
}


// display no phones found
const noPhone = document.getElementById('no-phone-found')
if(phones.length ===0){
    noPhone.classList.remove('d-none');

}
else(
    noPhone.classList.add('d-none')
)
// display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        
                    <div class="card p-4">
                        <img src="${phone.image}" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a phone i can't afford right now</p>
                            <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#phoneDetailModal">>Details</button> 
                            
                        </div>

                    </div>
               
        `
        phonesContainer.appendChild(phoneDiv);
    });
    // stop spinner
    toggleSpinner(false);
}

const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
  loadPhones(searchText,dataLimit);
}


// handle-search btn click
document.getElementById('btn-search').addEventListener('click',function(){

    // start loader
  processSearch(10)


})

// press enter to process
document.getElementById('search-field').addEventListener("keypress",  (e) =>{
    if(e.key == "Enter"){
    //  alert("Enter Key is Pressed")
     processSearch(10);
   }
   })


const toggleSpinner =isLoading => {
const loaderSection = document.getElementById('loader');
if(isLoading){
    loaderSection.classList.remove('d-none')
}
else(
   loaderSection.classList.add('d-none')
)
}

document.getElementById('show-all').addEventListener('click',function(){
    processSearch()
})

const loadPhoneDetails= async id =>{
    const url= `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch (url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone => {
    const modalTitle = document.getElementById('phoneDetailModalLabel')
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.innerHTML = `
    <p>Release Date : ${phone.releaseDate ? phone.releaseDate: 'release date not fixed yet'}</p>
    <p> Others : ${phone.others ? phone.others.Bluetooth:" No Bluetooth Information"}</p>
    <p> Storage : ${phone.others ? phone.others.Storage:" No Storage Information"}</p>
    `

}

loadPhones('apple')