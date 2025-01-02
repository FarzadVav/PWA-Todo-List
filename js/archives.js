import db from "/db.js"

const todosContainer = document.getElementById("todos-container")

async function loadTodos() {
  const { data } = await db
    .from("todos")
    .select()
    .eq("is_archive", true)
    .order("created_at", { ascending: false })

  todosContainer.innerHTML = ""

  data.forEach((item) => {
    todosContainer.insertAdjacentHTML(
      "beforeend",
      `<li class="todo ${item.is_complete ? "todo-complete" : ""}">
        <p>${item.content}</p>
        <button class="btn btn-warning" onclick="removeFromArchive('${
          item.id
        }')">Remove from archive</button>
      </li>`
    )
  })
}

window.removeFromArchive = async (id) => {
  const { error } = await db.from("todos").update({ is_archive: false }).eq("id", id)
  if (error) {
    alert("Unknown error on supabase")
  } else {
    loadTodos()
  }
}

window.addEventListener("load", loadTodos)
