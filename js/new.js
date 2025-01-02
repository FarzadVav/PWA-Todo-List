import db from "/db.js"

const newTodoBtn = document.getElementById("new-todo-btn")
const newTodoInput = document.getElementById("new-todo-input")
const todosContainer = document.getElementById("todos-container")

async function createTodo() {
  const content = newTodoInput.value
  if (content.trim()) {
    const { error } = await db
      .from("todos")
      .insert({ content, is_complete: false, is_archive: false })

    if (error) {
      alert("Unknown error on supabase")
    } else {
      const { data } = await db.from("todos").select().order("created_at", { ascending: false })

      todosContainer.innerHTML = ""

      data.slice(0, 3).forEach((item) => {
        todosContainer.insertAdjacentHTML(
          "beforeend",
          `<li class="todo ${item.is_complete ? "todo-complete" : ""}">
            <p>${item.content}</p>
          </li>`
        )
      })

      newTodoInput.value = ""
      newTodoInput.focus()
    }
  } else {
    alert("Please fill input...")
  }
}

newTodoBtn.addEventListener("click", async () => {
  createTodo()
})

newTodoInput.addEventListener("keydown", (ev) => {
  if (ev.code == "Enter") {
    ev.preventDefault()
    createTodo()
  }
})

window.addEventListener("load", async () => {
  const { data } = await db.from("todos").select().order("created_at", { ascending: false })
  data.slice(0, 3).forEach((item) => {
    todosContainer.insertAdjacentHTML(
      "beforeend",
      `<li class="todo ${item.is_complete ? "todo-complete" : ""}">
        <p>${item.content}</p>
      </li>`
    )
  })
})
