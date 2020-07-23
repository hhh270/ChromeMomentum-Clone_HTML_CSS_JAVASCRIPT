const toDoform = document.querySelector(".js-toDoForm"),
  toDoInput = toDoform.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

function paintToDo(text) {
  const li = document.createElement("li");
  // li 엘리먼트 생성. toDoList에 한줄씩 생성되는 역할.
  const delBtn = document.createElement("button");
  delBtn.innerText = "Del";
  //만약 Del이 아닌 이모지를 넣을 경우,
  //charset이 지정이 안되어 있을 경우, 제대로 출력이 안됨.

  const span = document.createElement("span");
  span.innerText = text;
  // ToDoList User 추가 내용.

  li.appendChild(span);
  li.appendChild(delBtn);
  //appendChild는 자식 노드의 마지막에 노드가 삽입.

  toDoList.appendChild(li);
  //toDoList 안에 생성한 span과 delBtn 추가.
  //<ul class="js-toDoList"></ul>안에 li가 추가된다고 보면 됨.
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);

  toDoInput.value = "";
  //내용을 기입하고 엔터를 눌렀을 때, todo를 생성하고 입력된 값은 입력란에서 삭제.
}

function loadToDos() {
  const toDos = localStorage.getItem(TODOS_LS);
  if (toDos !== null) {
  }
}

function init() {
  loadToDos();
  toDoform.addEventListener("submit", handleSubmit);
}
init();
