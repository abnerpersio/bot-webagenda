import React, { useEffect } from 'react';

import './App.css';

function ChatWidget(props) {
  useEffect(() => {
    if (props?.chat) {
      console.log('renderizando chat');
      const blipClient = new window.BlipChat();
      blipClient
        .withAppKey(props.chat)
        .withButton({ color: '#005ef4' })
        .withEventHandler(window.BlipChat.CREATE_ACCOUNT_EVENT, function () {
          blipClient.sendMessage({
            type: 'text/plain',
            content: 'ola, gostaria de agendar',
          });
        })
        .build();
    }
  }, [props.chat]);

  return (
    <span style={{ display: 'none' }} className="span-none">
      id do chat: {props.chat}
    </span>
  );
}

export default ChatWidget;
