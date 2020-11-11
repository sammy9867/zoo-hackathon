import React, { createContext, useContext, useReducer } from 'react';

export const ReportContext = createContext();

const initialState = {
    reports: []
};

const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_REPORT":
          return addReport(state, action.payload.favImage);
      default:  
          return state;
    }
};

function addReport(state, report) {

    return { 
        reports: [...state.favList, report]
    };
}

export const ReportContextProvider = ({ children }) => {
    const [globalState, dispatch] = useReducer(reducer, initialState);

    return (
        <ReportContextProvider.Provider value={{ globalState, dispatch}}>
            {children}
        </ReportContextProvider.Provider>
    );
};

export const useReportValue = () => useContext(ReportContext);