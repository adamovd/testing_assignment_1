import { addTodo, changeTodo, removeAllTodos } from "../ts/functions";
import { Todo } from "../ts/models/Todo";
 
describe("addTodo", () => {
test("should add todo", () => {
    //Arrange
    let todoText:string = "Vakna";
    let todos: Todo[] = [];
    //Act
    addTodo(todoText, todos);
    //Assert
    expect(todos.length).toBe(1);
});

test("should not add short todo", () => {
        //Arrange
        let todoText:string = "Ej";
        let todos: Todo[] = [];
        //Act
        addTodo(todoText, todos);
        console.log(todos);
        
        //Assert
        expect(todos.length).toBe(0);
});
});

describe("changeTodo", () => {
test("should change todo", () => {
    //Arrange
    let todo = new Todo("Äta", false);
    console.log(todo);
    
    //Act
    changeTodo(todo);
    console.log(todo);
    
    //Assert
    expect(todo.done).toBe(true);
});
});

describe("removeAllTodos", () => {
test("should remove all todos", () => {
    //Arrange
    let todos: Todo[] = [];
    let newTodoFirst = new Todo("Arbeta", true);
    let newTodoSecond = new Todo("Träna", false);
    let newTodoThird = new Todo("Kolla på TV", true);
    todos.push(newTodoFirst);
    todos.push(newTodoSecond);
    todos.push(newTodoThird);
    //Act
    removeAllTodos(todos)
    //Assert
    expect(todos.length).toBe(0);
});
});