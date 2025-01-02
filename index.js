const todosContainer = document.getElementById("todos-container")

async function loadTodos() {
  const { data } = await db
    .from("todos")
    .select()
    .eq("is_archive", false)
    .order("created_at", { ascending: false })

  todosContainer.innerHTML = ""

  data.forEach((item) => {
    todosContainer.insertAdjacentHTML(
      "beforeend",
      `<li class="todo ${item.is_complete ? "todo-complete" : ""}">
        <p>${item.content}</p>
        <button class="btn" onclick="handleCompleteTodo('${item.id}', ${item.is_complete})">${
        item.is_complete ? "Undo" : "To complete"
      }</button>
        <button class="btn btn-warning" onclick="handleArchiveTodo('${
          item.id
        }')">Add to archive</button>
        <button class="btn btn-danger" onclick="handleDeleteTodo('${item.id}')">Delete</button>
      </li>`
    )
  })
}

window.handleDeleteTodo = async (id) => {
  const { error } = await db.from("todos").delete().eq("id", id)
  if (error) {
    alert("Unknown error on supabase")
  } else {
    loadTodos()
  }
}

window.handleCompleteTodo = async (id, state) => {
  const { error } = await db.from("todos").update({ is_complete: !state }).eq("id", id)
  if (error) {
    alert("Unknown error on supabase")
  } else {
    loadTodos()
  }
}

window.handleArchiveTodo = async (id) => {
  const { error } = await db.from("todos").update({ is_archive: true }).eq("id", id)
  if (error) {
    alert("Unknown error on supabase")
  } else {
    loadTodos()
  }
}

window.addEventListener("load", loadTodos)
