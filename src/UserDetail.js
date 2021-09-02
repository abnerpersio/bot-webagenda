import { useEffect, useState } from 'react';

import './App.css';
import ChatWidget from './ChatWidget';

function UserDetail({ match }) {
  const [chatKey, setChatKey] = useState(null);

  useEffect(() => {
    fetch(
      `https://web-agenda-api.herokuapp.com/webhooks/chatid?group=${match.params.group}`
    )
      .then((response) => {
        if (response.status !== 200) return;
        return response.json();
      })
      .then((key) => {
        setChatKey(key);
      })
      .catch((error) => console.error(error));
  }, [match.params.group]);

  const openChat = () => {
    document.querySelector('#blip-chat-open-iframe').click();
  };

  const handleContent = () => {
    if (chatKey) {
      return (
        <>
          <p>Clique nesse botão e será atendido ⬇⬇</p>
          <button onClick={openChat} className="App-button">
            Agendar
          </button>
        </>
      );
    }
  };

  return (
    <div className="App-content">
      robô {chatKey ? 'de: ' + match.params.group : 'carregando...'}
      {handleContent()}
      <ChatWidget chat={chatKey} />
    </div>
  );
}

export default UserDetail;
