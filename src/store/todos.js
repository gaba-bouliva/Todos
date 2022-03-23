

export const todos = {
    namespaced: true,
    state :{
        todoList: [
           
        ]
    },
    mutations: {
        addTodo(state, todo){
            state.todoList.map((xTodo) => {
                if(todo.id === xTodo.id){
                    todo.id  = todo.id + 1
                }
            })
            state.todoList.push(todo)
        },
        updateTodo(state, todo){
            state.todoList.find((xTodo) =>{
                if( todo.id === xTodo.id){
                    xTodo.completed = !xTodo.completed
                }
            })
        },
        clearCompletedTodos(state){
            state.todoList = state.todoList.filter((todo) => todo.completed === false)
        },
        deleteTodo(state, todo){
            state.todoList = state.todoList.filter((xTodo) => xTodo.id !== todo.id  )
        }
    },

    actions: {
        addTodo(ctx, todo){
            ctx.commit('addTodo', todo)
        },
        updateTodo(ctx, todo){
            ctx.commit('updateTodo', todo)
          
        },
        clearCompletedTodos(ctx){
            ctx.commit('clearCompletedTodos')
        },
        deleteTodo(ctx, todo){
            ctx.commit('deleteTodo', todo)
        }
    },

    getters: {
        getTodos(state){
            return state.todoList
        },
        getActiveTodos(state){
            return state.todoList.filter((todo) => todo.completed === false)
        },

        getCompletedTodos(state){
            return state.todoList.filter((todo) => todo.completed === true)
        }
    }
}


