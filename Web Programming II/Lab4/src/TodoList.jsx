/** 
 * this component will map through the todos that were passed in a prop
 * and will render JSX for each todo item
 * ONLY render todos that are not flagged as completed
*/

function ToDoList(props) {

    const delClick = (todoId) => {
        props.handleDel(todoId);
    }

    const togClick = (todo) => {
        props.handleTog(todo);
    }

    return (
        <div>
            {props.todos.map((todo) => {
                let today = new Date();
                let dueDate = new Date(todo.due);
                let overDue = '';
                if (dueDate < today) {
                    overDue = 'overdue';
                }
                return (
                    <div>
                        <h1 className={overDue}>{todo.title}</h1>
                        <p>{todo.description}</p>
                        <p className={overDue}>Due Date: {todo.due}</p>
                        <p>Completed: No</p>
                        <button onClick={() => delClick(todo.id)}>Delete</button>
                        <button onClick={() => togClick(todo)}>Complete</button>
                    </div>
                );
            })}
        </div>
    )
}

export default ToDoList;