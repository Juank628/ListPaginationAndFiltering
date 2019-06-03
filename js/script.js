/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*Global variables*/

const listItems = document.querySelector("ul.student-list").children;
let itemsPerPage = 10;

/***
showPage function:
Show every item included in the page number
Hide any other item
***/

const showPage = (list, page, isSearch, searchName = "") => {
  let startIndex = page * itemsPerPage - itemsPerPage;
  let endIndex = page * itemsPerPage;

  if (isSearch) {
    let itemName = "";
    let index = 0;
    let searchArray = [];

    for (let i = 0; i < list.length; i++) {
      itemName = document.querySelectorAll("ul.student-list h3")[i].textContent;
      if (itemName.indexOf(searchName) !== -1) {
        if (index >= startIndex && index < endIndex) {
          list[i].style.display = "block";
        } else {
          list[i].style.display = "none";
        }
        searchArray.push(searchName);
        index++;
      } else {
        list[i].style.display = "none";
      }
    }
    if (searchArray.length === 0) {
      console.log("no items");
    }
    return searchArray;
  } else {
    for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
        list[i].style.display = "block";
      } else {
        list[i].style.display = "none";
      }
    }
    return false;
  }
};

/*** 
appendPageLinks function: 
Create the pages links
Add events to each page link
***/

const appendPageLinks = (list, isSearch) => {
  const divPage = document.querySelector("div.page");

  if (document.querySelector(".pagination")) {
    divPage.removeChild(document.querySelector(".pagination"));
  }

  const divLinks = document.createElement("div");
  divLinks.className = "pagination";

  if (list.length > 0) {
    let numberOfPages = Math.ceil(list.length / itemsPerPage);
    const ulLinks = document.createElement("ul");

    for (let i = 1; i <= numberOfPages; i++) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = i;
      a.href = "#";
      a.addEventListener("click", e => {
        e.preventDefault();
        for (let i = 0; i < numberOfPages; i++) {
          document.querySelectorAll(".pagination ul li a")[i].className = "";
        }
        e.target.className = "active";
        showPage(listItems, e.target.textContent, isSearch);
      });
      li.appendChild(a);
      ulLinks.appendChild(li);
    }

    ulLinks.firstChild.firstChild.className = "active";
    divLinks.appendChild(ulLinks);
    divPage.appendChild(divLinks);
  } else {
    noItemsMessage = document.createElement("p");
    noItemsMessage.textContent = "No items found";
    divLinks.appendChild(noItemsMessage);
    divPage.appendChild(divLinks);
  }
};

/*** 
appendSearchBar function:
Create the search bar
***/
const appendSearchBar = () => {
  const appendLinks = () => {
    appendPageLinks(showPage(listItems, 1, true, searchInput.value), true);
  };

  const searchDiv = document.createElement("div");
  const searchInput = document.createElement("input");
  const searchBotton = document.createElement("button");

  searchDiv.className = "student-search";
  searchInput.placeholder = "Search for students...";
  searchBotton.textContent = "Search";

  searchBotton.addEventListener("click", () => appendLinks());
  searchInput.addEventListener("keyup", () => appendLinks());

  searchDiv.appendChild(searchInput);
  searchDiv.appendChild(searchBotton);

  document.getElementsByClassName("page-header")[0].appendChild(searchDiv);
};

/***
When the page is loaded the first time:
call the first page
create the page links
create the search bar
***/

document.addEventListener("DOMContentLoaded", () => {
  showPage(listItems, 1, false);
  appendSearchBar();
  appendPageLinks(listItems, false);
});
