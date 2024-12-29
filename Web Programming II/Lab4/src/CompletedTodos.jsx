/** 
 * this component will map through the todos that were passed in a prop
 * and will render JSX for each todo item
 * ONLY render todos that are not flagged as completed
*/

function completedTodos(props) {

    const togClick = (todo) => {
        props.handleTog(todo);
    }

    return (
        <div>
            {props.todos.map((todo) => (
                <div>
                    <h1>{todo.title}</h1>
                    <p>{todo.description}</p>
                    <p>Due Date: {todo.due}</p>
                    <p>Completed: Yes</p>
                    <button onClick={() => togClick(todo)}>Mark Incomplete</button>
                </div>
            ))}
        </div>
    );
}

export default completedTodos;