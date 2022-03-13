import { testAdd } from '../actions'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';

function Main() {
  const state = useSelector((state) => state.testReducer);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const handleTestBtn = () => {
    dispatch(testAdd());
    setCount(state.count);
  }
  return <div>main page
    <div>
      <button onClick={() => handleTestBtn()}>
        테스트 버튼 count 1증가
      </button>
      {` ${count}`}
    </div>

  </div>;
}
export default Main;
