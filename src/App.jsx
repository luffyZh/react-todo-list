import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Swal from 'sweetalert2';

import TODOSVG from './assets/todo.svg';
import EmptySVG from './assets/empty.svg';
import DeleteSVG from './assets/delete.svg';
import FinishSVG from './assets/finish.svg';

const Container = styled.div`
  position: relative;
  width: 640px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
`;

const LogoContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;

  img {
    width: 100%;
    max-width: 300px;
  }

  .pendulums {
    margin-left: 20px;
    width: 50px;
    height: 72px;
    right: -56px;
    bottom: -2px;
    -webkit-perspective: 640px;
    perspective: 640px
  }

  .pendulum {
    position: absolute;
    width: 50px;
    height: 70px;
    right: 44%;
    bottom: 0;
    left: 50%;
    -webkit-transform: translateZ(-300px) translateX(-50%);
    transform: translateZ(-300px) translateX(-50%)
  }

  .pendulum:after {
    content: "";
    width: 8px;
    height: 8px;
    background-color: #ffd6e9;
    position: absolute;
    top: 2px;
    left: 0;
    right: 0;
    margin: 0 auto;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    border: 3px solid #33322E;
  }

  .pendulum.shadow {
    display: none;
    top: 263%;
    left: -65%;
    bottom: 0;
    -webkit-transform-origin: 50% 0;
    -ms-transform-origin: 50% 0;
    transform-origin: 50% 0;
    -webkit-transform: translateX(-50%) scaleY(-1) scaleZ(2) rotateY(-30deg) rotateX(-75deg) translateZ(300px);
    transform: translateX(-50%) scaleY(-1) scaleZ(2) rotateY(-30deg) rotateX(-75deg) translateZ(300px)
  }

  .pendulum .bar {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    top: -5px;
    display: block;
    width: 26px;
    height: 30px;
    background: #d0f4f0;
    border: 3px solid #33322e;
    border-radius: 15px;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px
  }

  .pendulum .string {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 3px;
    height: 72px;
    background: #33322E;
  }

  .pendulum .weight {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: 14px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #f8d966;
    border: 3px solid #33322e;
  }

  .pendulum .motion {
    position: absolute;
    height: 90px;
    width: 50px;
    -webkit-transform-origin: 50% 10px;
    -ms-transform-origin: 50% 10px;
    transform-origin: 50% 10px;
    -webkit-animation: swing 1.8s infinite ease-in-out;
    animation: swing 1.8s infinite ease-in-out;
  }

  .pendulum.shadow .bar,.pendulum.shadow .string,.pendulum.shadow .weight {
     background: #3d3a34;
  }

  @-webkit-keyframes swing {
    0% {
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg)
    }

    50% {
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg)
    }

    100% {
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg)
    }
  }

  @keyframes swing {
    0% {
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg)
    }

    50% {
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg)
    }

    100% {
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg)
    }
  }

  .ani-vector {
    position: relative;
    left: -18px;
    top: -26px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center
  }

  .ani-vector span {
    -webkit-transform: rotateZ(45deg);
    -ms-transform: rotate(45deg);
    transform: rotateZ(45deg);
    margin: 0 7px;
    width: 12px;
    height: 12px;
    border: 2px solid #33322e;
    background-color: #ffd6e9;
    display: inline-block;
    border-radius: 1px;
    -webkit-animation: zooming 6s ease-in-out infinite;
    animation: zooming 6s ease-in-out infinite
  }

  .ani-vector span:nth-child(2) {
    -webkit-animation-delay: 2s;
    animation-delay: 2s
  }

  .zooming {
    -webkit-animation: zooming 1s ease-in-out infinite;
    animation: zooming 1s ease-in-out infinite
  }

  @-webkit-keyframes zooming {
    0% {
      -webkit-transform: scale(1) rotateZ(45deg);
      transform: scale(1) rotateZ(45deg)
    }

    20% {
      -webkit-transform: scale(1) rotateZ(45deg);
      transform: scale(1) rotateZ(45deg)
    }

    30% {
      -webkit-transform: scale(1) rotateZ(135deg);
      transform: scale(1) rotateZ(135deg)
    }

    70% {
      -webkit-transform: scale(1) rotateZ(135deg);
      transform: scale(1) rotateZ(135deg)
    }

    80% {
      -webkit-transform: scale(1) rotateZ(45deg);
      transform: scale(1) rotateZ(45deg)
    }

    100% {
      -webkit-transform: scale(1) rotateZ(45deg);
      transform: scale(1) rotateZ(45deg)
    }
  }

  @keyframes zooming {
    0% {
      -webkit-transform: scale(1) rotateZ(45deg);
      transform: scale(1) rotateZ(45deg)
    }

    20% {
      -webkit-transform: scale(1) rotateZ(45deg);
      transform: scale(1) rotateZ(45deg)
    }

    30% {
      -webkit-transform: scale(1) rotateZ(135deg);
      transform: scale(1) rotateZ(135deg)
    }

    70% {
      -webkit-transform: scale(1) rotateZ(135deg);
      transform: scale(1) rotateZ(135deg)
    }

    80% {
      -webkit-transform: scale(1) rotateZ(45deg);
      transform: scale(1) rotateZ(45deg)
    }

    100% {
      -webkit-transform: scale(1) rotateZ(45deg);
      transform: scale(1) rotateZ(45deg)
    }
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0;
  font-size: 18px;
  cursor: text;
  border: 2px solid #33322e;
  border-radius: 12px;
  height: 64px;
  line-height: 64px;
  text-indent: 12px;
  padding-right: 118px;
  box-shadow: 4px 4px 0px #33322e;

  &:focus {
    box-shadow: none;
  }

  &:hover {
    box-shadow: none;
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 2px;
  top: 2px;
  box-sizing: border-box;
  height: 60px;
  line-height: 60px;
  width: 96px;
  padding: 0;
  text-align: center;
  border: 0;
  border-left: 2px solid #33322e;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  cursor: pointer;
  background: #ffd6e9;
  transition: all .25s;
  font-size: 18px;
`;

const MainContainer = styled.div`
  position: relative;
  background: #fff;
  box-shadow: 4px 4px 0px #33322e;
  border: 2px solid #33322e;
  border-radius: 12px;
  margin: 0;
  padding: 0;
  transition: all .5s ease;
  max-width: 100%;
  width: 100%;
  overflow: hidden;

  .bar-message {
    position: relative;
    display: block;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-self: flex-start;
    border-bottom: 2px solid #33322e;
    width: 100%;
    height: 44px;
    line-height: 44px;
    overflow: hidden;
  }

  .bar-message:hover {
    background: #f9f3e5;
  }

  .bar-message > div {
    width: 100%;
    height: 100%
  }

  .bar-message-text {
    display: inline-block;
    text-align: center;
    font-weight: 600;
    padding: 0;
    padding-left: 12px;
    padding-right: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 44px;
    width: 100%;
    text-align: left;
    cursor: pointer;
  }
`;

const ItemTitle = styled.span`
  padding: 20px 24px;
  background: ${(props) => props.$isCompleted? '#d0f4f0;' : '#f9f3e5'};
  border-radius: 12px;
  width: 100%;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  line-height: 1.5;
  overflow-wrap: break-word;
  padding-left: 56px;
  padding-right: 56px;
  cursor: pointer;
  min-height: 60px;
  color: ${(props) => props.$isCompleted? 'rgba(51, 50, 46, 0.535)' : '#33322e'};
  text-decoration: ${(props) => props.$isCompleted ? 'line-through' : 'none'};
`;

const EmptyContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 20px;
`;

const TodoListContainer = styled.ul`
  padding: 32px 36px 36px;
  min-height: 381px;
  max-height: 480px;
  transition: all .5s ease;
  overflow: scroll;

  li {
    position: relative;
    border: 2px solid #33322e;
    border-radius: 12px;
    box-shadow: 4px 4px 0px #33322e;
    width: 100%;
    transition: all .5s ease;
    display: block;
    margin-bottom: 16px
  }

  li:last-child {
    margin-bottom: 0
  }

  li:hover {
    -webkit-box-shadow: none;
    box-shadow: none
  }

  .todo-btn {
    position: absolute;
    background: 0 0;
    display: block;
    cursor: pointer;
    border: 2px solid #33322e;
    transition: all .2s;
    background: #fff;
    z-index: 3;
  }

  .todo-btn:hover {
    box-shadow: 4px 4px 0px #33322E;
    -webkit-transform: translate(-2px,-2px);
    -ms-transform: translate(-2px,-2px);
    transform: translate(-2px,-2px)
  }

  .btn-finish {
    left: 14px;
    top: 16px;
    width: 30px;
    height: 30px;
    border-radius: 20px;
  }

  .btn-finish:hover {
    background: #8cd4cb;
    box-shadow: -4px 4px 0px #33322E;
    transform: translate(2px,-2px)
  }

  .btn-unfinish {
    left: 14px;
    top: 16px;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    background: #8cd4cb;
  }

  .btn-unfinish:hover {
    box-shadow: -4px 4px 0px #33322E;
    -webkit-transform: translate(2px,-2px);
    -ms-transform: translate(2px,-2px);
    transform: translate(2px,-2px)
  }

  .btn-unfinish img {
    position: relative;
    left: 4px;
    top: 2px;
    width: 26px;
    height: auto;
  }

  .btn-delete {
    background: #fff;
    right: 12px;
    top: 16px;
    height: 30px;
    width: 30px;
    border-radius: var(--border-radius);
    font-size: 13px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .btn-delete:hover {
    background: #F6A89E;
  }
`;

const BtnGroup = styled.div`
  position: relative;
  display: flex;
  margin: 12px 0;
  padding-left: 2px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 40px;
    border: 2px solid #33322e;
    background: #fff;
    cursor: pointer;
    transition: all.25s;
    font-size: 16px;
    border-radius: 0;
    margin-left: -2px;
  }

  button:hover {
    background-color: #f9f3e5;
  }

  button.active {
    background-color: #8cd4cb;
  }
  
  button:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  button:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const STATUS_MAP = {
  全部: 'ALL',
  进行中: 'ACTIVE',
  已完成: 'COMPLETED',
}

export default function App() {
  /**
   * todo item
   * 文案：text
   * 状态：isCompleted
   */
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(STATUS_MAP.全部);

  useEffect(() => {
    const cacheTodos = JSON.parse(localStorage.getItem('CACHE_TODOS'));
    console.log(cacheTodos, 11111);
    setTodos(cacheTodos || []);
  }, []);

  useEffect(() => {
    todos.length && localStorage.setItem('CACHE_TODOS', JSON.stringify(todos));
  }, [todos]);

  // 根据状态过滤
  const filteredTodos = useMemo(() => {
    if (status === STATUS_MAP.全部) {
      return todos;
    } else if (status === STATUS_MAP.进行中) {
      return todos.filter(item => !item.isCompleted);
    } else {
      return todos.filter(item => item.isCompleted);
    }
  }, [status, todos]);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  } 

  const handleAddItem = (value) => {
    // 2 - 构造 todo item
    const item = {
      id: Date.now(),
      text: value || title,
      isCompleted: false,
    }
    // 3 - 更新到 todos
    setTodos([item, ...todos]);
    // 4 - 清空 input
    setTitle("");
  }

  const onTitleKeydown = (e) => {
    if (e.key === 'Enter') {
      // 1 - 拿到输入框的值
      const value = e.target.value;
      handleAddItem(value);
    }
  }

  const handleFinish = (item) => {
    const newItem = {
      ...item,
      isCompleted: !item.isCompleted,
    };
    const newTodos = todos.map(item => {
      if (item.id === newItem.id) {
        return newItem
      }
      return item;
    })
    setTodos(newTodos);
  }

  const handleDelete = (item) => {
    setTodos(todos.filter(todo => todo.id !== item.id));
  }

  const handleAllFinish = () => {
    const hasAllFinished = todos.every(item => item.isCompleted);
    if (hasAllFinished) {
      Swal.fire({
        title: "你已经完成了所有的任务!",
        button: "确定",
        icon: "success"
      });
      return;
    }
    Swal.fire({
      title: "确认全部完成所有事项?",
      showCancelButton: true,
      confirmButtonText: "确定",
      cancelButtonText: `取消`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const newTodos = todos.map(item => ({
        ...item,
          isCompleted: true
        }));
        setTodos(newTodos);
        Swal.fire("你已经完成了所有的任务!", "", "success");
      }
    });
  }

  return (
    <Container>
      <LogoContainer>
        <div className="ani-vector">
          <span></span>
          <span></span>
        </div>
        <img src={TODOSVG} alt="TODO" />
        <div className="pendulums">
          <div className="pendulum">
            <div className="bar"></div>
            <div className="motion">
              <div className="string"></div>
              <div className="weight"></div>
            </div>
          </div>
          <div className="pendulum shadow">
            <div className="bar"></div>
            <div className="motion">
              <div className="string"></div>
              <div className="weight"></div>
            </div>
          </div>
        </div>
      </LogoContainer>
      <InputContainer>
        <StyledInput
          value={title}
          onChange={onTitleChange}
          onKeyDown={onTitleKeydown}
          placeholder="新增待办事项..."
        />
        <SubmitButton onClick={() => handleAddItem()}>提交</SubmitButton>
      </InputContainer>
      <BtnGroup>
        <button onClick={() => setStatus(STATUS_MAP.全部)} className={status === STATUS_MAP.全部 ? 'active' : ''}>全部</button>
        <button onClick={() => setStatus(STATUS_MAP.进行中)} className={status === STATUS_MAP.进行中 ? 'active' : ''}>进行中</button>
        <button onClick={() => setStatus(STATUS_MAP.已完成)} className={status === STATUS_MAP.已完成 ? 'active' : ''}>已完成</button>
      </BtnGroup>
      <MainContainer>
        <div className="bar-message">
          <button onClick={handleAllFinish} className="btn btn-label btn-allFinish">全部标记为完成</button>
          <div>
            <div className="bar-message-text">
              今日事今日毕，勿将今事待明日!☕
            </div>
          </div>
        </div>
        {
          filteredTodos?.length === 0 ? (
            <EmptyContainer>
              <img src={EmptySVG} alt="empty" />
            </EmptyContainer>
          ) : (
            <TodoListContainer>
              {
                 filteredTodos.map((item) => (
                  <li key={item.id}>
                    <ItemTitle onClick={() => handleFinish(item)} $isCompleted={item.isCompleted}>{item.text}</ItemTitle>
                    <div
                      onClick={() => handleFinish(item)}
                      className={item.isCompleted ? "todo-btn btn-unfinish" : "todo-btn btn-finish"}
                    >
                      {item.isCompleted && <img src={FinishSVG} alt="finish" />}
                    </div>
                    <div onClick={() => handleDelete(item)} className="todo-btn btn-delete">
                      <img src={DeleteSVG} alt="delete" />
                    </div>
                  </li>
                ))
              }
            </TodoListContainer>
          )
        }
      </MainContainer>
    </Container>
  )
}