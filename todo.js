const toDoform = document.querySelector(".js-toDoForm"),
  toDoInput = toDoform.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
//기입받은 할일 목록은 array가 되어야 함.

let toDos = [];
// toDos를 비어있는 array로 생성.
// 해야할 일을 생성할 때마다 'toDos'의 array에 항목 추가.
// let으로 바꾼 이유. toDos = cleanToDos;

function deleteToDo(event) {
  //console.dir(event.target); --> del버튼을 click하면 이벤트 정보 호출.
  //console.dir(event.target.parentNode); --> del버튼의 부모가 누구인지 알기 위해.(parentNode)

  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  //html에서 li 삭제.

  const cleanToDos = toDos.filter(function (toDo) {
    //console.log(toDo.id, li.id);
    //string 여부 확인.
    return toDo.id !== parseInt(li.id);
    //모든 toDos가 li의 id와 같지 않을 때
  });
  //cleanToDos와 filter가 하는 것은 function filterFn가 체크가 된 아이템들의 array를 주는 것.

  toDos = cleanToDos;
  //toDos를 cleanToDos로 대체.
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  //자바스크립트는 localStorage에 있는 모든 데이터를 string으로 저장하려고 한다.
  //그러기에 우리는 입력한 object들이 string으로 되게 해야함.
  //JSON.stringify는 자바스크립트 object를 string으로 바꿔줌.
}

function paintToDo(text) {
  const li = document.createElement("li");
  // li 엘리먼트 생성. toDoList에 한줄씩 생성되는 역할.
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  //id를 통해 array의 길이(몇개)가 어느 정도인지 알 수 있음.
  //위와 같은 경우는 +1이므로 아무것도 없을 때에는 1이 출력.

  delBtn.innerText = "Del";
  //만약 Del이 아닌 이모지를 넣을 경우,
  //charset이 지정이 안되어 있을 경우, 제대로 출력이 안됨.
  delBtn.addEventListener("click", deleteToDo);
  //click했을 때, 삭제되게.

  span.innerText = text;
  // ToDoList User 추가 내용.

  li.id = newId;
  li.appendChild(span);
  li.appendChild(delBtn);
  //appendChild는 자식 노드의 마지막에 노드가 삽입.
  // li에도 id를 주어야 됨 -> 나중에 버튼을 클릭했을 때, 어떤 li를 지워야하는지 구분용도.

  toDoList.appendChild(li);
  //toDoList 안에 생성한 span과 delBtn 추가.
  //<ul class="js-toDoList"></ul>안에 li가 추가된다고 보면 됨.

  const toDoObj = {
    id: newId,
    text: text,
    //text라는 key에 이 text가 value로 옴. 즉 할 일 내용이 들어감.
  };
  toDos.push(toDoObj);
  //push를 써서, toDos의 array 안에 element를 넣어줄 수 있음.
  saveToDos();
  //toDos.push 이전에 saveToDos를 입력하면 입력되기 전 내용이 출력.
  //localStorage에는 자바스크립트의 데이터를 저장할 수 없다. string만 저장가능.
  //자바스크립트는 localStorage에 있는 모든 데이터를 string으로 저장하려고 한다.
  //그러기에 우리는 입력한 object들이 string으로 되게 해야함.(JSON.stringify 사용)
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);

  toDoInput.value = "";
  //내용을 기입하고 엔터를 눌렀을 때, todo를 생성하고 입력된 값은 입력란에서 삭제.
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  //console.log(loadedToDos);
  //위에서 출력을 해보면 JSON.stringify 때문에 string으로 나옴.
  //JSON - JavaScript Object Notation.
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    //JSON.parse는 string을 object로 변환해줌.
    //console.log(parsedToDos); --> object로 변한 것 확인.
    parsedToDos.forEach(function (toDo) {
      //  console.log(toDo.text); --> parsedToDos에 들어있는 각자의 text들이 console.log된 것을 확인.
      paintToDo(toDo.text);
    });
    //forEach는 기본적으로 함수를 실행해주는데,
    //array에 담겨있는 것들 각각 한번씩 함수를 실행시켜 주는 것.
  }
}

function init() {
  loadToDos();
  toDoform.addEventListener("submit", handleSubmit);
}
init();
