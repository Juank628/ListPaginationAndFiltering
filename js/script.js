/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*Global variables*/

const listItems = document.querySelector("ul.student-list").children;
let itemsPerPage = 10;

/***
showPage function:
Show every item included in the page number.
In case of search only shows the search results in its according page.
Hide any other item.
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
        searchArray.push(itemName);
        index++;
      } else {
        list[i].style.display = "none";
      }
    }
    return searchArray;    //return all the names found

  } else {
    for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
        list[i].style.display = "block";
      } else {
        list[i].style.display = "none";
      }
    }
    return false;          //return false when not perform search operation
  }
};

/*** 
appendPageLinks function: 
Delete the pages links if exists and create it again.
Create no items found message if the list is empty.
***/

const appendPageLinks = (list, isSearch, searchName = "") => {
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
        showPage(listItems, e.target.textContent, isSearch, searchName);
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
    noItemsMessage.style.color = "red";
    divLinks.appendChild(noItemsMessage);
    divPage.appendChild(divLinks);
  }
};

/*** 
appendSearchBar function:
Create the search bar and its events.
A search is performed when click the search button and when type in the search input.
Every time a search is performed, the page links are updated.
***/
const appendSearchBar = () => {
  const appendLinks = () => {
    appendPageLinks(
      showPage(listItems, 1, true, searchInput.value),
      true,
      searchInput.value
    );
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
create the search bar
create the page links
***/

document.addEventListener("DOMContentLoaded", () => {
  showPage(listItems, 1, false);
  appendSearchBar();
  appendPageLinks(listItems, false);
});
