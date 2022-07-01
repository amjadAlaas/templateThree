//Is there any color set on local storage ? 
let mainColor = localStorage.getItem('color_option');

if (mainColor !== null) {
    // console.log("local storage is not empty");
    // console.log(mainColor);

    document.documentElement.style.setProperty('--main-color', mainColor);

    //remove active class from all list colors
    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");

        //add active class to local storage when user click on it 
        if (element.dataset.color === mainColor) {

            //add active class
            element.classList.add("active");
            
        }

    });

}

//Random Background Option
let backgroundOption = true;

// Variable To Control The Background Interval
let backgrounInterval;

//Is There random Background In Local Storage 
let backgroundLocalItem = localStorage.getItem("background_option");

//Check If Random Background In Local Storage Is Not Empty
if (backgroundLocalItem !== null) {

    //Loop On Every Span And Remove Active Class
    document.querySelectorAll(".random-background span").forEach(element => {

        element.classList.remove("active");

    });

    if (backgroundLocalItem === 'true') {

        //Set True Value To Background Option From Local Storage
        backgroundOption = true;

        //Add Active Class To Target Span
        document.querySelector(".yes").classList.add("active");

    } else {
        
        //Set False Value To Background Option From Local Storage
        backgroundOption = false;

        //Add Active Class To Target Span
        document.querySelector(".no").classList.add("active");

    }

}

//click on icon
document.querySelector(".icon i").onclick = function () {
    
    //toogle class (fa-spin) for rotation on self
    this.classList.toggle("fa-spin");

    //toggle class (open) on main setting box
    document.querySelector(".setting-box").classList.toggle("open");

};

//Switch Color
const colorList = document.querySelectorAll(".colors-list li");

//loop list item
colorList.forEach(li => {

    //click on every list item
    li.addEventListener("click", (e) => {

        //set color on root (main-color)
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        //set color on local storage
        localStorage.setItem('color_option', e.target.dataset.color);

        // remove active class from all children And Add It To Click Button
        handleActive(e);

    });

});
//Switch Random Backgrounds
const randomBackgrounds = document.querySelectorAll(".random-background span");

//loop list item
randomBackgrounds.forEach(span => {

    //click on every span
    span.addEventListener("click", (e) => {

        // remove active class from all children And Add It To Click Button
        handleActive(e);

        if (e.target.dataset.background === 'yes') {

            backgroundOption = true;

            randomizeImages();

            localStorage.setItem("background_option", true);

        } else {

            backgroundOption = false;

            clearInterval(backgrounInterval);

            localStorage.setItem("background_option", false);

        }

    });

});

// function to randomize Images
function randomizeImages() {

    if (backgroundOption === true) {

        backgrounInterval = setInterval(() => {

            // Create Random Number
            let randomNumber = Math.floor(Math.random() * 5);
            // Change Background Url
            document.querySelector('.landing-page').style.backgroundImage = 'url("images/landing' + randomNumber + '.jpg")';
        
        }, 7000);

    }

}

randomizeImages();



//select skills Sellector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    //Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills outerHeight
    let skillsOuterHeight = ourSkills.offsetHeight;

    //Window Height
    let windowHeight = this.innerHeight;

    //Window ScrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            
            skill.style.width = skill.dataset.progress;
            
        });

    }

};

//create PopUp With Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener("click", (e) => {

        //create overlay Element
        let overlay = document.createElement("div");

        //Add Class To Overlay
        overlay.className = "popup-overlay";

        //Append Overlay To Body
        document.body.appendChild(overlay);

        //Create Popup Box
        let popupBox = document.createElement("div");

        //Add Class To Popup Box
        popupBox.className = "popup-box";

        if (img.alt !== null) {

            //Create Heading
            let imgHeading = document.createElement("h3");

            //Create Text For Heading
            let imgText = document.createTextNode(img.alt);

            //Append Text To Heading
            imgHeading.appendChild(imgText);

            //Apend Heading To Popup Box
            popupBox.appendChild(imgHeading);

        }

        //craete Image
        let popupImge = document.createElement("img");

        //Set Src Image
        popupImge.src = img.src;

        //Add Image To Popup Box
        popupBox.appendChild(popupImge);

        //append Popup Box To Body
        document.body.appendChild(popupBox);

        // Create Close Span
        let closeButton = document.createElement("span");

        //Create X
        let xText = document.createTextNode("x");

        //Append x To Span
        closeButton.appendChild(xText);

        //Add Class To Close Button
        closeButton.className = "close-button";

        //Append Span To Popup Box
        popupBox.appendChild(closeButton);

    });

});

//Close Popup
document.addEventListener("click", function (e) {

    if (e.target.className === "close-button") {

        //Remove Current Popup
        e.target.parentNode.remove();

        //Remove Overlay
        document.querySelector(".popup-overlay").remove();

    }

});

//Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

//Select All Links
const allLinks = document.querySelectorAll(".links a");

function scrollToSections(elements) {

    elements.forEach(element => {


        element.addEventListener("click", (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: "smooth"

            });

        });

    });
}
//run Scroll Function At Bullets
scrollToSections(allBullets);

//run Scroll Function At Links
scrollToSections(allLinks);

//Handle Active State
function handleActive(ev) {
            // remove active class from all children
            ev.target.parentElement.querySelectorAll(".active").forEach(element => {

                element.classList.remove("active");
    
            });
    
            //add active class to target 
            ev.target.classList.add("active");
}

//Select Bullets Span
let bulletSpan = document.querySelectorAll(".show-bullets span");

//Select Bullets Container
let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("show_bullets");

if (bulletLocalItem !== null) {

    bulletSpan.forEach(span => {

        span.classList.remove("active");

    });

    if (bulletLocalItem === 'block') {

        bulletsContainer.style.display = 'block';

        document.querySelector(".show-bullets .yes").classList.add("active");
        
    } else {
        
        bulletsContainer.style.display = 'none';
        
        document.querySelector(".show-bullets .no").classList.add("active");

    }

}

bulletSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if (span.dataset.bullets === 'show') {

            bulletsContainer.style.display = 'block';

            localStorage.setItem("show_bullets", 'block');

        } else {
            bulletsContainer.style.display = 'none';

            localStorage.setItem("show_bullets", 'none');
        }

        handleActive(e);

    });

});

// Reset Button
document.querySelector(".reset-option").onclick = function () {

    //Reset Option
    localStorage.removeItem("show_bullets");
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    //Reload Page
    window.location.reload();

};

//Toggle Menu 
let toggleBottun = document.querySelector(".toggle-menu");

let links = document.querySelector(".links");

toggleBottun.onclick = function (e) {

    //Stop Propagation At Button
    e.stopPropagation();

    //Toggle Class menu-active On Button
    this.classList.toggle("menu-active");

    //Toggle Class open On links
    links.classList.toggle("open");

};

//Click Anywhere Outside Menu To Close Menu
document.addEventListener("click", (e) => {

    if (e.target !== toggleBottun && e.target !== links) {

        //Check If Menu Is Open
        if (links.classList.contains("open")) {

            //Toggle Class menu-active On Button
            toggleBottun.classList.toggle("menu-active");

            //Toggle Class open On links
            links.classList.toggle("open");

        }

    }

});
links.onclick = function (e) {

    //Stop Propagation At Menu
    e.stopPropagation();

}