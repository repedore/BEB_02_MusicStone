const initialAccount = {
  account: "지갑을 연결하세요.",
  isConnect: false,
};

const ON_CONNECT = "ON_CONNECT";
function accountReducer(state = initialAccount, action) {
  switch (action.type) {
    case ON_CONNECT:
      const newState = {
        ...state,
        account: String(action.account),
        isConnect: true,
      };
      // state.concat(action.account);
      // state.account = action.account;
      console.log("accountreducer" + newState.account);
      return newState;
    default:
      return state;
  }
}

export default accountReducer;
