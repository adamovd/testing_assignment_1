/**
*@jest-environment jsdom
*/
import {expect, jest, test} from '@jest/globals';
import { Todo } from "../ts/models/Todo";
import * as mainfunctions from "./../ts/main";
import * as functions from "./../ts/functions";

describe("createHTML", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
      });

    test("should create HTML elements", () => {
        //Arrange
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`
        let todos: Todo[] = [new Todo("Laga mat", false)];
        //Act
        mainfunctions.createHtml(todos);
        //Assert
        expect(document.querySelector("li")?.innerHTML).toBe("Laga mat");
    });

    test("should fill localStorage", () => {
        //Arrange
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`
        let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
        todos.splice(0, todos.length);
        //Act
        todos.push(new Todo("Spela spel", false));
        mainfunctions.createHtml(todos);
        console.log(todos);
        //Assert
        expect(todos.length).toBe(1);
    });

    test("should add class to listitem", () => {
        //Arrange
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`
        let todos: Todo[] = [new Todo("Laga mat", true)];
        //Act
        mainfunctions.createHtml(todos);
        //Assert
        expect(document.querySelector("li")?.classList.length).toBe(2);
        expect(document.querySelector("li")?.className).toBe("todo__text--done todo__text");
    });

    test("should run function toggleTodo on click", () => {
        //Arrange
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`
        let spy = jest.spyOn(mainfunctions, "toggleTodo").mockReturnValue();
        let todos: Todo[] = [new Todo("Laga mat", false)];
        mainfunctions.createHtml(todos);
        console.log(document.body.innerHTML);
        //Act
        document.querySelector("li")?.click();
        //Assert
        expect(spy).toBeCalled();
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
    beforeEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
      });

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

describe("clearTodos", () => {
    test("should run function removeAllTodos", () => {
        //Arrange
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`
        let spy = jest.spyOn(functions, "removeAllTodos").mockReturnValue();
        let todos: Todo[] = [new Todo("Laga mat", false)];
        //Act
        mainfunctions.clearTodos(todos);
        //Assert
        expect(spy).toHaveBeenCalled();
    });

});

describe("sort", () => {
    test("should run function sortTodos", () => {
        //Arrange
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`
        let spy = jest.spyOn(functions, "sortTodos").mockReturnValue();
        let todos: Todo[] = [new Todo("Laga mat", false), new Todo("Diska", false)];
        //Act
        mainfunctions.sort(todos);
        //Assert
        expect(spy).toHaveBeenCalled();
    });
});

  describe("toggleTodo", () => {
      test("should run function changeTodo", () => {
          //Arrange
          let todos: Todo[] = [new Todo("Laga mat", false)];
          let i:number = 0;
          let spy = jest.spyOn(functions, "changeTodo").mockReturnValue();
          //Act
          mainfunctions.toggleTodo(todos[i]);
          //Assert
          expect(spy).toHaveBeenCalled();
          });
   });

describe("init", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
      });

    test("should run function clearTodos on click", () => {
        //Arrange
        document.body.innerHTML = `<button type="button" id="clearTodos">Rensa lista</button>`
        let spy = jest.spyOn(mainfunctions, "clearTodos").mockReturnValue();
        mainfunctions.init();
        //Act
        document.getElementById("clearTodos")?.click();
        //Assert
        expect(spy).toHaveBeenCalled();
    });

     test("should run sort on click", () => {
         //Arrange
         document.body.innerHTML = `<button type="button" id="sortTodos">Sortera lista</button>`;
         let spy = jest.spyOn(mainfunctions, "sort").mockReturnValue();
         mainfunctions.init();
         //Act
         document.getElementById("sortTodos")?.click();
         //Assert
         expect(spy).toHaveBeenCalled();
     });

    test("should run function createNewTodo on click", () => {
        //Arrange
        document.body.innerHTML = `<form id="newTodoForm">
        <input type="text" id="newTodoText" />
        <button>Skapa</button>
        </form>`;
        let spy = jest.spyOn(mainfunctions, "createNewTodo").mockReturnValue();
        mainfunctions.init();
        //Act
        (document.getElementById("newTodoText") as HTMLInputElement).value = "Plugga";
        document.querySelector("button")?.click();
        //Assert
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith("Plugga", []);
    });
    });
