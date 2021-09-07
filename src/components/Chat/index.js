import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { toast } from 'react-toastify';
import { API_URL } from '../../utils/constants';

export default function Chat() {
  const [chatKey, setChatKey] = useState(null);
  const { group } = useParams();

  if (!group) {
    toast.error('Oops, algo está errado. Verifique o link.');
    return null;
  }

  useEffect(() => {
    fetch(
      `${API_URL}/webhooks/chatid?group=${group}`,
    )
      .then((response) => {
        if (response.status !== 200) {
          toast.error('Oops! Não foi possível carregar esse chat, verifique o link.');
          return null;
        }

        return response.json();
      })
      .then((key) => {
        setChatKey(key);
      })
      .catch(() => {
        toast.error('Oops! Não foi possível carregar.');
      });
  }, [group]);

  const openChat = () => {
    document.querySelector('#blip-chat-open-iframe').click();
  };

  useEffect(() => {
    if (!chatKey) {
      return;
    }

    const blipClient = new window.BlipChat();
    blipClient
      .withAppKey(chatKey)
      .withButton({ color: '#005ef4' })
      .withEventHandler(window.BlipChat.CREATE_ACCOUNT_EVENT, () => {
        blipClient.sendMessage({
          type: 'text/plain',
          content: 'ola, gostaria de agendar',
        });
      })
      .build();
  }, [chatKey]);

  return (
    <div className="App-content">
      <SkeletonTheme color="#202020" highlightColor="#444">

        <p>
          {chatKey ? (
            <>
              robô de
              {' '}
              {group}
            </>
          ) : <Skeleton delay={1} height={24} width={350} count={2} style={{ display: 'block', margin: '10px 0px' }} />}
        </p>
      </SkeletonTheme>

      {
        chatKey && (
          <>
            <p>Clique no botão ⬇⬇</p>
            <button
              type="button"
              onClick={openChat}
              className="App-button"
            >
              Agendar
            </button>
          </>
        )
      }
    </div>
  );
}
