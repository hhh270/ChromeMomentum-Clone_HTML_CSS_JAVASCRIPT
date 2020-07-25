const form = document.querySelector(".js-form"),
  input = form.querySelector("input");
// querySelector는 원하는 셀렉터는 다 가져옴. 클래스, CSS, 태그 등등.
// querySelector는 찾은 첫번째 것을 가져온다.

// querySelectorAll은 모든 것을 다 가져옴. 클래스명에 따른 엘리먼트들을 가져오는데.
// 이 경우, array를 준다.

//----------------------------------------------------------------------------------------

//localStorage 설명.
/*local storage는 유저 컴퓨터에 작은 정보를 저장하는 방법.
검사(inspect) -> 응용프로그램(application) -> 로컬 저장소(local storage) */

/*localStorage에 아무 값도 없는 상태에서 테스트.
localStorage.setItem("arthur",true) --> localStorage에 "arthur"와 true 저장
--> 출력값. undefined
localStorage.getItem("arthur") --> "true"

localStorage.getItem("username") --> null(존재하지 않음) 
 -> 해당 정보를 활용해서 프로그래밍. */

const greeting = document.querySelector(".js-greetings");
const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
  //currentUser에 기입 텍스트값 저장.
}

function handleSubmit(event) {
  event.preventDefault();
  /*보통 event가 발생하면 root에서 일어나고 form에서 일어남.
    event가 올라가게 되면 다른 모든 것들이 event에 반응하게 됨.
      form을 submit하는 event가 발생하면 event는 document까지 계속 위로 올라감.
      document는 프로그래밍되어진 곳으로 보내지게 됨. 페이지가 새로고침됨 */
  //event의 preventDefault는 이 event의 기본동작(기본값)을 막는 기능.
  const currentValue = input.value;
  // user의 기입값을 currentValue에 저장.
  //console.log(currentValue); 로 정상작동 테스트.
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  //user이름이 없을 때.
  form.classList.add(SHOWING_CN);
  //class를 추가(여기서는 form을 나타내기 위해 사용)
  //user이름을 물어보기 위해 나타냄.
  form.addEventListener("submit", handleSubmit);
  //form에 내용을 입력 후, 제출 했을 때, 반응하기 위함.
}

function paintGreeting(text) {
  //user이름이 있을 때.
  form.classList.remove(SHOWING_CN);
  //class를 제거(여기서는 form을 숨기기 위해 사용)
  //이미 user이름을 아니까 물어볼 필요가 없음.
  greeting.classList.add(SHOWING_CN);
  //class를 추가.(greeting이 화면에 출력되게 해줌.)
  greeting.innerText = `Hope you have a great day, ${text}!`;
  // greeting에 해당 문자열 추가.
}
//만약 유저가 있으면 Hello 유저 네임 출력.

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    // localStorage에 user가 없을 때.
    askForName();
  } else {
    // localStorage에 user가 있을 때.
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();

//여담. localStorage는 URLs를 기초로 동작.
