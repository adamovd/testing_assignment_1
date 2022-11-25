/**
*@jest-environment jsdom
*/
import { addTodo } from "../ts/functions";
import { Todo } from "../ts/models/Todo";
import * as mainfunctions from "./../ts/main";

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

// test("should create html", () => {
//     //Arrange
//     let spy =jest.spyOn(mainfunctions, "createHtml").mockReturnValue();
//     let todoText: string = "Laga mat";
//     let todos: Todo[] = [new Todo("Äta", false)];
//     //Act
//     mainfunctions.createNewTodo(todoText,todos);
//     //Assert
//     expect(spy).toBeCalledTimes(1);
// });

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

test("should not add HTML to div", () => {
    //Arrange
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    let errorContainer: HTMLDivElement = document.getElementById("error") as HTMLDivElement;
    errorContainer.classList.add("show");
    let error: string = "Error";
    let show: boolean = false;
    //Act
    mainfunctions.displayError(error, show);
    //Assert
    expect(errorContainer.innerHTML).toBe("");
});
});