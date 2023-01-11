let myLibrary = [];

function Book(title, author, page, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
}

function addBookToLibrary(title, author, page, read) {
    let book = new Book(title, author, page, read);
    myLibrary.push(book);
    displayLibrary();
}

function displayLibrary() {
    const books = document.querySelector(".books"); //this is selecting book class

    const removeDiv = document.querySelectorAll(".card");
    console.log("count of current card div", removeDiv);
    for (let i = 0; i < removeDiv.length; i++) {
        removeDiv[i].remove();
    }
    //myLibrary, the empty array is being looped over 'forEach' element of the array,
    //it will create an element DIV 'forEach' element in the array and create a class
    //called 'card'.
    let index = 0; //this was added to track index links
    myLibrary.forEach(myLibraries => { //different paramter thats not same name as myLibrary
        const card = document.createElement("div");
        card.classList.add("card");
        books.appendChild(card);

        //start constant to create button(removeBookButton)
        //then set classlist to removebutton so you can use CSS against it
        //textContext is text that appears on the button
        const removeBookButton = document.createElement("button");
        removeBookButton.classList.add("removeButton");
        removeBookButton.textContent = "Remove from library"
        console.log("show me my current array of objects inside", myLibrary);

        //you set the data attribute to an index and then append button to card
        removeBookButton.dataset.linkedArray = index;
        console.log("show me dataset link back to array", removeBookButton.dataset.linkedArray);
        card.appendChild(removeBookButton);

        //add event listener for click and run removeBookLibrary
        removeBookButton.addEventListener("click", removeBookLibrary);

        function removeBookLibrary() {
            let getBookToRemove = removeBookButton.dataset.linkedArray;
            console.log("attempting to remove array item thru data attribute", parseInt(getBookToRemove));
            myLibrary.splice(parseInt(getBookToRemove), 1); //takes integer 1 and removes only 1
            card.remove();
            displayLibrary();
        }

        //this creates the read button and adds a class attribute for each array
        const readButton = document.createElement("button");
        readButton.classList.add("readButton");
        readButton.textContent = "Toggle Read Status";

        //This links the data attribute of toggle to the array card
        readButton.dataset.linkedArray = index;
        card.append(readButton);

        //this created the listener and toggle logic for the array object prototype
        readButton.addEventListener("click", readStatus);

        function readStatus() {
            let getBookToggle = readButton.dataset.linkedArray;
            Book.prototype = Object.create(Book.prototype);
            const toggleBook = new Book();
            console.log("Initial value", myLibrary[parseInt(getBookToggle)].read);

            //this runs a check to see what the toggle status is currently
            if ((myLibrary[parseInt(getBookToggle)].read) == "Yes") {
                toggleBook.read = "No";
                myLibrary[parseInt(getBookToggle)].read = toggleBook.read;
            }
            else if ((myLibrary[parseInt(getBookToggle)].read) == "No") {
                toggleBook.read = "Yes";
                myLibrary[parseInt(getBookToggle)].read = toggleBook.read;
            }
            displayLibrary();
        }

        //this loops over every key value pair in the library
        for (let key in myLibraries) { //loop over every key in the library. a key is title, etc.
            console.log(`${key}: ${myLibraries[key]}`); //when loop, console the string of key
            const para = document.createElement("p"); //creates paragraph, <p> element
            para.textContent = (`${key}: ${myLibraries[key]}`); //loop key and display key
            card.appendChild(para); //this says paragraph is child to card.
        }
        index++;
    })
}

const addBookButton = document.querySelector(".addBookButton")
addBookButton.addEventListener("click", displayForm);

function displayForm() {
    document.getElementById("addBookForm").style.display = "";
}

//This add the users input into the array and then run a new form
const submitButton = document.querySelector(".submitButton");
submitButton.addEventListener("click", formData);

//This turns the data to variables from the form.
function formData() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let page = document.getElementById("page").value;
    let read = document.getElementById("read").value;

    //if the user did not input information, then this breaks the form function and 
    //returns to the wait for another submission (submit button)
    if ((title == "") || (author == "") || (page == "") || (read == "")) {
        return;
    }

    addBookToLibrary(title, author, page, read);

    //resets after user successfully submits the info
    document.getElementById("addBook").reset();
}
