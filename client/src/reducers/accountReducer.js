const initialAccount = {
  account: "지갑을 연결하세요.",
};

const ON_CONNECT = "ON_CONNECT";
function accountReducer(state = initialAccount, action) {
  switch (action.type) {
    case ON_CONNECT:
      const newState = { ...state, account: action.account };
      // state.concat(action.account);
      // state.account = action.account;
      console.log("accountreducer" + newState.account);
      return newState;
    default:
      return state;
  }
}

export default accountReducer;
