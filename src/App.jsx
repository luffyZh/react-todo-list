import { useState } from "react";
import styled from "styled-components";

const Container = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: 18px;
  height: 48px;
  padding: 10px 20px;
`;

const TodoListContainer = styled.ul`
  width: 960px;
  position: relative;
  margin-top: 16px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const FinishButton = styled.button`
  margin: 0 10px;
  padding: 0.2rem 1.2rem;
`;

const ItemTitle = styled.span`
  text-decoration: ${(props) => props.isCompleted ? 'line-through' : 'none'};
`;

// const MOCKDATA = [{
//   id: Date.now(),
//   text: '这是要做的第一件事',
//   isCompleted: false,
// }, {
//   id: Date.now() + 1,
//   text: '这是要做的第二件事',
//   isCompleted: true,
// }]

export default function App() {
  /**
   * todo item
   * 文案：text
   * 状态：isCompleted
   */
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState();

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  } 

  const onTitleKeydown = (e) => {
    if (e.key === 'Enter') {
      // 1 - 拿到输入框的值
      const value = e.target.value;
      // 2 - 构造 todo item
      const item = {
        id: Date.now(),
        text: value,
        isCompleted: false,
      }
      // 3 - 更新到 todos
      setTodos([...todos, item]);
      // 4 - 清空 input
      setTitle("")
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

  return (
    <Container>
      <h1>TODO List</h1>
      <StyledInput
        value={title}
        onChange={onTitleChange}
        onKeyDown={onTitleKeydown}
        placeholder="Input TODO Item"
      />
      <TodoListContainer>
        {
          todos?.length === 0 ? (
            <span>no items</span>
          ) : todos.map((item, index) => (
            <li key={index}>
              <ItemTitle isCompleted={item.isCompleted}>{item.text}</ItemTitle>
              <FinishButton onClick={() => handleFinish(item)}>{item.isCompleted ? 'Unfinish' : 'Finish'}</FinishButton>
              <button onClick={() => handleDelete(item)}>Delete</button>
            </li>
          ))
        }
      </TodoListContainer>
    </Container>
  )
}