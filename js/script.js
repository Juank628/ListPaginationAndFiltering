/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const listItems = document.querySelector("ul.student-list").children;
let itemsPerPage = 10;

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

const showPage = (list, page) => {
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = page * itemsPerPage;

   for(let i=0; i<list.length; i++){
      if(i >= startIndex && i < endIndex){
         list[i].style.display = "block";
      } else {
         list[i].style.display = "none";
      }
   }
}

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const appendPageLinks = list => {
   let numberOfPages = Math.ceil(list.length/itemsPerPage);
   const divPage = document.querySelector("div.page");
   const divLinks = document.createElement("div");
   divLinks.className = "pagination";
   const ulLinks = document.createElement("ul");

   for(let i=1; i<=numberOfPages; i++){
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = i;
      a.href = "#";
      a.addEventListener('click',(e)=>{
         e.preventDefault();
         for(let i=0; i<numberOfPages; i++){
            document.querySelectorAll(".pagination ul li a")[i].className = "";
         }
         e.target.className = "active"
         showPage(listItems,e.target.textContent);
      })
      li.appendChild(a);
      ulLinks.appendChild(li);
   }

   ulLinks.firstChild.firstChild.className = "active";
   divLinks.appendChild(ulLinks);
   divPage.appendChild(divLinks);
}

document.addEventListener('DOMContentLoaded', ()=>{
   showPage(listItems, 1);
   appendPageLinks(listItems);
})

// Remember to delete the comments that came with this file, and replace them with your own code comments.