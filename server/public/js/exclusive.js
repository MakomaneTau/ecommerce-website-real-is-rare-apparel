const row = document.getElementById("exclusive-row");
const projectsHTML = document.querySelector(".projects");

let rowItems = [];
let listProducts = [];


const addDataToHTML = (listItems) => {
    projectsHTML.innerHTML ='';
    if(listItems.length > 0){
        listItems.forEach(item =>{
            console.log(item);
            let img_row = document.createElement("div");
            img_row.classList.add('exclusive-row'); 
            let heading = document.createElement("h2");
            heading.classList.add('heading');
            let line = document.createElement("hr");
            
            heading.innerHTML = `${item.name}`;

            item.images.forEach(img =>{
                let link = document.createElement("a");
                link.href = img;
                link.setAttribute("data-lightbox", "models");

                let newImage = document.createElement("img");
                newImage.src = img;

                link.appendChild(newImage);

                img_row.appendChild(link);
            });

            projectsHTML.appendChild(heading);
            projectsHTML.appendChild(line);
            projectsHTML.appendChild(img_row);

        });
    }
}


const fetchData = () => {
    fetch('js/json/exclusive.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            addDataToHTML(listProducts);
        })
        .catch(error => console.error("Error fetching data:", error));
};

fetchData();
