import { addTodo, changeTodo, removeAllTodos } from "./functions";
import { Todo } from "./models/Todo";

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

test("should remove all todos", () => {
    //Arrange
    let todos: Todo[] = [];
    let newTodo = new Todo("Arbeta", true);
    todos.push(newTodo);
    //Act
    removeAllTodos(todos)
    //Assert
    expect(todos.length).toBe(0);
});