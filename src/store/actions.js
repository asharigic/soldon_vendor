

// Authentication module

export * from "./auth/login/actions";
export * from "./auth/register/actions";
export const changeLayoutMode = (layoutModeType) => {
    return {
      type: 'CHANGE_LAYOUT_MODE',
      payload: layoutModeType,
    };
  };
  export default changeLayoutMode;