/**
*@jest-environment jsdom
*/
import { Todo } from "../ts/models/Todo";
import * as mainfunctions from "./../ts/main";
import * as functions from "./../ts/functions";

let todos: Todo [] = [new Todo("Laga mat", false), new Todo("Äta mat", false)];


describe("createHTML", () => {
    test("should fill localStorage", () => {
        //Arrange
        let todos: Todo[] = [new Todo("Laga mat", false), new Todo("Äta mat", false)];
        localStorage.setItem("todos", JSON.stringify(todos));
        //Act
        mainfunctions.createHtml(todos);
        let todoLS: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
        //Assert
        expect(todos.length).toBe(todoLS?.length);
    });

    // test("should empty todosContainer", () => {
    //     //Assert
    //     let todos: Todo[] = [];
    //     document.body.innerHTML = `<ul id="todos" class="todo"><li>Äta</li></ul>`;
    //     let todosContainer: HTMLUListElement = document.getElementById(
    //         "todos"
    //       ) as HTMLUListElement;
    //     //Act
    //     mainfunctions.createHtml(todos);
    //     //Arrange
    //     expect(todosContainer.innerHTML).toBe("");
    // });

    test("should create HTML elements", () => {
        //Arrange
        let todos: Todo[] = [new Todo("Laga mat", false), new Todo("Äta mat", false)];
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`
        let todosContainer: HTMLUListElement = document.getElementById(
            "todos"
          ) as HTMLUListElement;
        //Act
        mainfunctions.createHtml(todos);
        console.log(mainfunctions.createHtml.prototype);

        //Assert
        expect(todosContainer.innerHTML).toBe("");
    });
});

describe("displayError", () => {
test("should add HTML to div", () => {
    //Arrange
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    let error: string = "Error";
    let show: boolean = true;
    //Act
    mainfunctions.displayError(error, show)
    //Assert
    expect((document.getElementById("error")as HTMLDivElement).innerHTML).toBe("Error");
});

test("should add class to div", () => {
   //Arrange
   document.body.innerHTML = `<div id="error" class="error"></div>`;
   let error: string = "Error";
   let show: boolean = true;
   //Act
   mainfunctions.displayError(error, show)
   //Assert
   expect((document.getElementById("error")as HTMLDivElement).classList.length).toBe(2);
});

test("should not add class to div", () => {
    //Arrange
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    let error: string = "Error";
    let show: boolean = false;
    //Act
    mainfunctions.displayError(error, show)
    //Assert
    expect((document.getElementById("error")as HTMLDivElement).classList.length).toBe(1);
 });
});

describe("createNewTodo", () => {
test("should create html", () => {
     //Arrange
     let spy =jest.spyOn(mainfunctions, "createHtml").mockReturnValue();
     let todoText: string = "Äta mat";
     let todos: Todo[] = [new Todo("Laga mat", false), new Todo("Diska", false)];
     //Act
     mainfunctions.createNewTodo(todoText,todos);
     //Assert
     expect(spy).toBeCalledTimes(1);
 });

test("should not create html", () => {
    //Arrange
    let spy =jest.spyOn(mainfunctions, "displayError").mockReturnValue();
    let todoText: string = "Ät";
    let todos: Todo[] = [new Todo("Laga mat", false)];
    //Act
    mainfunctions.createNewTodo(todoText,todos);
    //Assert
    expect(spy).toBeCalledTimes(1);
});
});


describe("toggleTodo", () => {
    test("should run function changeTodo", () => {
        //Arrange
        let spy = jest.spyOn(functions, "changeTodo").mockReturnValue();
        let todo: Todo = new Todo("Städa", false);
        //Act
        mainfunctions.toggleTodo(todo);
        //Assert
        expect(spy).toHaveBeenCalled();
        });
 });

describe("clearTodos", () => {
    test("should run function removeAllTodos", () => {
        //Arrange
        let spy = jest.spyOn(functions, "removeAllTodos").mockReturnValue();
        let todos: Todo[] = [new Todo("Laga mat", false)];


        //Act
        mainfunctions.clearTodos(todos);


        //Assert
        expect(spy).toHaveBeenCalled();
    });

});

describe("init", () => {
    test("should run function clearTodos on click", () => {
        //Arrange
        let spy = jest.spyOn(mainfunctions, "clearTodos").mockReturnValue();
        document.body.innerHTML = `<button type="button" id="clearTodos">Rensa lista</button>`
        mainfunctions.init();
        //Act
        document.getElementById("clearTodos")?.click();
        //Assert
        expect(spy).toHaveBeenCalled();
    });

    test("should run function createNewTodo on click", () => {
        //Arrange
        let spy = jest.spyOn(mainfunctions, "createNewTodo").mockReturnValue();
        document.body.innerHTML = `<form id="newTodoForm">
        <input type="text" id="newTodoText" />
        <button>Skapa</button>
        </form>`;
        mainfunctions.init();
        //Act
        (document.getElementById("newTodoText") as HTMLInputElement).value = "Plugga";
        document.querySelector("button")?.click();
        //Assert
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith("Plugga", []);
    });
    });
