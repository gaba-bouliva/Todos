<template>
  <div class="wrapper absolute-top z-top">
    <div class="newTodoInput" style="min-width: 350px">
      <q-input
        :dark="background === 'dark'"
        :class="background === 'dark' ? 'bg-dark' : 'light'"
        @keypress.enter="addTodo"
        id="newTodoInput"
        outlined
        v-model="title"
        placeholder="Create a new todo"
      >
        <template v-slot:prepend>
          <div class="">
            <q-checkbox
              left-label
              v-model="completed"
              checked-icon="check_circle"
              unchecked-icon="panorama_fish_eye"
            />
          </div>
        </template>
        <template v-slot:append
          ><span class="deleteTodo" @click="resetnewTodo">x</span></template
        >
      </q-input>
    </div>

    <div :class="background === 'dark' ? 'bg-grey-10 text-white' : ''">
      <q-list :class="background" bordered separator style="max-width: 450px">
        <q-item
          clickable
          v-ripple
          v-for="todo in todoList"
          :key="todo.id"
          @click="updateTodo(todo)"
        >
          <div class="">
            <q-checkbox
              left-label
              v-model="todo.completed"
              checked-icon="check_circle"
              unchecked-icon="panorama_fish_eye"
            />
          </div>
          <q-item-section :class="{ completed: todo.completed }"
            >{{ todo.title }}
          </q-item-section>
          <q-icon name="delete" @click="deleteTodo(todo)"></q-icon>
        </q-item>
        <q-item class="list_footer">
          <div class="todosLeft">{{ todosLeft }} items left</div>
          <div class="filters">
            <span
              id="filter_all"
              :class="{ active: filter_all }"
              @click="getAllTodos"
              >All</span
            >
            <span
              id="filter_active"
              :class="{ active: filter_active }"
              @click="getActiveTodos"
              >Active</span
            >
            <span
              id="filter_completed"
              :class="{ active: filter_completed }"
              @click="getCompletedTodos"
              >Completed</span
            >
          </div>
          <div class="clearTodos">
            <span id="clear_completed_todos" @click="clearCompletedTodos"
              >Clear Completed</span
            >
          </div>
        </q-item>
      </q-list>
    </div>
    <div class="info"><b>Drag and drop functionality coming soon...</b></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      completed: false,
      filter_all: true,
      filter_active: false,
      filter_completed: false,
    };
  },
  methods: {
    resetnewTodo() {
      this.title = "";
      this.completed = false;
    },

    addTodo() {
      const newTodo = {
        id: this.todoList.length + 1,
        title: this.title,
        completed: this.completed,
      };
      this.$store.dispatch("todos/addTodo", newTodo);
      this.resetnewTodo();
    },

    updateTodo(todo) {
      this.$store.dispatch("todos/updateTodo", todo);
    },

    clearCompletedTodos() {
      this.$store.dispatch("todos/clearCompletedTodos");
    },

    deleteTodo(todo) {
      this.$store.dispatch("todos/deleteTodo", todo);
    },

    getActiveTodos() {
      this.todoList = this.$store.getters["todos/getActiveTodos"];
      this.filter_completed = false;
      this.filter_all = false;
      this.filter_active = true;
    },

    getCompletedTodos() {
      this.todoList = this.$store.getters["todos/getCompletedTodos"];
      this.filter_all = false;
      this.filter_active = false;
      this.filter_completed = true;
    },

    getAllTodos() {
      this.todoList = this.$store.getters["todos/getTodos"];
      this.filter_active = false;
      this.filter_completed = false;
      this.filter_all = true;
    },
  },
  computed: {
    background() {
      if (this.$store.getters["darkMode/getDarkMode"]) {
        return "dark";
      } else {
        return "light";
      }
    },

    todosLeft() {
      const unCompletedTodos = this.$store.getters["todos/getActiveTodos"];
      return unCompletedTodos.length;
    },

    todoList: {
      get: function () {
        if (this.filter_active) {
          return this.$store.getters["todos/getActiveTodos"];
        } else if (this.filter_completed) {
          return this.$store.getters["todos/getCompletedTodos"];
        }
        return this.$store.getters["todos/getTodos"];
      },
      set: function (newValue) {
        this.todos = newValue;
        return newValue;
      },
    },
  },

  mounted() {
    this.todo = this.$store.getters["todos/getTodos"];
  },
};
</script>

<style scoped>
.newTodoInput {
  margin-top: -100px;
  margin-bottom: 20px;
}
.wrapper {
  max-width: 450px;
  margin: auto;
  padding: 10px;
}
.list_footer {
  display: flex;
  justify-content: space-between;
  color: gray;
}
#filter_active {
  margin: 5px;
}

.deleteTodo,
.filters,
.clearTodos > span {
  cursor: pointer;
}

.filters > span:hover {
  color: rgb(77, 77, 248);
}
.filters > .active {
  color: rgb(77, 77, 248);
}
.info {
  color: gray;
  text-align: center;
  margin-top: 50px;
  font-family: "https://fonts.google.com/specimen/Josefin+Sans";
  font-weight: 400, 700;
}
.light {
  background-color: #fff;
}
.completed {
  text-decoration: line-through;
}

.q-list {
  display: flex;
  flex-direction: column;
}
.q-icon {
  align-self: center;
}
</style>
