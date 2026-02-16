let projectBody = document.getElementById('project-body');
let highlight = document.getElementById('project-highlight');
let closeBtn = document.getElementById('close-btn');


/**
 * Project class to hold project information
 */
class Project {
    // Project ID static counter
    static pId = 1;
    /**
     * 
     * @param {HTMLImageElement} img the image associated with the given project
     * @param {HTMLDivElement} name the name of the project
     * @param {HTMLDivElement} description the description of the project
     * @param {HTMLDivElement} dot1 the first dot indicator representing the first slide
     * @param {HTMLDivElement} dot2 the second dot indicator representing the second slide
     * @param {HTMLDivElement} dot3 the third dot indicator representing the third slide
     * @param {number} pId the project ID
     */
    constructor(img, name, description, dot1, dot2, dot3, pId = Project.pId) {
        this.img = img;
        this.name = name;
        this.description = description;
        this.dot1 = dot1;
        this.dot2 = dot2;
        this.dot3 = dot3;
        this.pId = pId;
        Project.pId++; // auto increment with each new project
    }
    
}

const projectNum = document.getElementsByClassName('project-item').length;
let projects = []; 
for(let i = 1; i < projectNum + 1; i++) 
{ 
    let proj = new Project(document.getElementById(`p${i}`), document.getElementById(`p${i}name`), document.getElementById(`p${i}description`), document.getElementById(`p${i}dot1`), document.getElementById(`p${i}dot2`), document.getElementById(`p${i}dot3`)); 
    projects.push(proj); 
}

/**
 * Handles mouse hover over project images
 * @param {HTMLImageElement} proj the project image
 * @param {HTMLDivElement} name the name of the project
 */
function mouseHover(proj, name){
    proj.addEventListener('mouseover', () => {
        name.style.display = 'block';
        proj.style.cursor = 'pointer';
    });
    proj.addEventListener('mouseout', () => {
        name.style.display = 'none';
    });
}

/**
 * Changes the slide to new desired slide
 * @param {number} i the index of the slide
 * @param {HTMLImageElement} proj the project image
 * @param {HTMLDivElement} projdot1 the first dot indicator representing the first slide
 * @param {HTMLDivElement} projdot2 the second dot indicator representing the second slide
 * @param {HTMLDivElement} projdot3 the third dot indicator representing the third slide
 * @param {number} num the project number
 */
function setSlide(i, proj, projdot1, projdot2, projdot3, num) {
    // Replace image
    proj.src = `../../assets/images/proj/proj${num}_${i % 3}.png`;
    // Adjust dot
    switch(i % 3) {
        case 0:
            projdot1.classList.add('active');
            projdot2.classList.remove('active');
            projdot3.classList.remove('active');
            break;
        case 1:
            projdot1.classList.remove('active');
            projdot2.classList.add('active');
            projdot3.classList.remove('active');
            break;
        case 2:
            projdot1.classList.remove('active');
            projdot2.classList.remove('active');
            projdot3.classList.add('active');
            break;
        }
}
/**
 * Cycles through project images
 * @param {HTMLImageElement} proj the project image to be cycled
 * @param {HTMLDivElement} projdot1 the first dot indicator representing the first slide
 * @param {HTMLDivElement} projdot2 the second dot indicator representing the second slide
 * @param {HTMLDivElement} projdot3 the third dot indicator representing the third slide
 * @param {number} num the project number
 */
function cycleSlides(proj, projdot1, projdot2, projdot3, num){


    // cycle through project images
    if (proj) {
        let i = 0;

        // For manual toggling
        projdot1.addEventListener('click', ()=> {
            i = 0;
            setSlide(i, proj, projdot1, projdot2, projdot3, num);
        });
        projdot2.addEventListener('click', ()=> {
            i = 1;
            setSlide(i, proj, projdot1, projdot2, projdot3, num);
        });
        projdot3.addEventListener('click', ()=> {
            i = 2;
            setSlide(i, proj, projdot1, projdot2, projdot3, num);
        });

        setInterval(() => {
            // Set the transition effect
            proj.style.transition = 'opacity 0.1s ease-in-out';
            // Fade out
            proj.style.opacity = 0;

            setTimeout(() => {
                // Change the image source after fade out
                setSlide(i, proj, projdot1, projdot2, projdot3, num);
                // Fade in
                proj.style.opacity = 1;
            }, 100); // Wait for fade out to complete before changing image
            i++;
        }, 10000);
    }
}
/**
 * Highlights the clicked project and gives more info about it
 * @param {HTMLElement} proj the project element that was clicked on
 */
function clickedProject(proj) {
    let description = document.getElementById(`proj-description`);
    let img = document.getElementById(`proj-image`);
    let title = document.getElementById(`proj-title`);

    proj.img.addEventListener('click', () => {
        // Hide other elements
        projectBody.style.display = 'none';
        // Show highlight section
        highlight.style.display = 'inline-block';
        // Set highlight content
        title.innerText = proj.name.innerText;
        img.src = proj.img.src;
        // Set description based on project
        description.innerText = proj.description.innerText;


    });
}

window.addEventListener('load', () => {
    

    projects.forEach((project) => {

        mouseHover(project.img, project.name);
        cycleSlides(project.img, project.dot1, project.dot2, project.dot3, project.pId);
        clickedProject(project);
        
    });
});

closeBtn.addEventListener('click', () => {
    // Hide highlight section
    highlight.style.display = 'none';
    // Show other elements
    projectBody.style.display = 'block';
});