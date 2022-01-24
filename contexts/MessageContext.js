import React, { useContext, useState, useEffect } from "react"

const MessageContext = React.createContext()
const MessageUpdateContext = React.createContext()

export function useMessage() {
  return useContext(MessageContext)
}

export function useMessageUpdate() {
  return useContext(MessageUpdateContext)
}


export function MessageProvider({ children }) {
 
  const [currentChat, setCurrentChat] = useState()

  function messageUpdate(e) {
    setCurrentChat(e)
  }

  return (
    <MessageContext.Provider value={currentChat}>
      <MessageUpdateContext.Provider value={messageUpdate}>
        {children}
      </MessageUpdateContext.Provider>
    </MessageContext.Provider>
  );
} 