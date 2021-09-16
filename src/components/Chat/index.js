import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { toast } from 'react-toastify';
import { API_URL } from '../../utils/constants';
import formatPhone from '../../utils/formatPhone';

import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';
import { Container } from './styles';

export default function Chat() {
  const [isModalOpen, setModal] = useState(false);
  const [client, setClient] = useState(null);
  const [chatKey, setChatKey] = useState(null);
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const { group } = useParams();

  function toggleModal() {
    setModal((prevState) => !prevState);
  }

  function handlePhoneChange(event) {
    setPhoneInput(
      formatPhone(event.target.value),
    );
  }

  const isFormValid = (
    nameInput
    && phoneInput
    && phoneInput.length >= 14
  );

  async function setClientData() {
    try {
      if (!isFormValid) {
        return null;
      }

      const data = {
        name: nameInput,
        phone: phoneInput.replace(/\D/g, ''),
      };

      localStorage.setItem('wa_client', JSON.stringify(data));
      setClient(data);
      toggleModal();
      return data;
    } catch (error) {
      toast.error('Oops! Não foi possível salvar seus dados.');
      return null;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setClientData();
  }

  if (!group) {
    toast.error('Oops, algo está errado. Verifique o link.');
    return null;
  }

  useEffect(() => {
    const clientSaved = JSON.parse(localStorage.getItem('wa_client'));

    if (!clientSaved) {
      setModal(true);
      return;
    }

    setClient(clientSaved);
  }, []);

  useEffect(() => {
    fetch(
      `${API_URL}/webhooks/chatid?group=${group}`,
    )
      .then(async (response) => {
        const data = await response.json();
        if (response.status !== 200) {
          toast.error(data?.message || 'Oops! Não foi possível carregar esse chat, verifique o link.');
          return null;
        }

        setChatKey(data);
        return data;
      })
      .catch(() => {
        toast.error('Oops! Não foi possível carregar.');
      });
  }, [group]);

  const openChat = () => {
    document.querySelector('#blip-chat-open-iframe').click();
  };

  useEffect(() => {
    if (!chatKey || !client) {
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
      .withAccount({
        fullName: client?.name,
        phoneNumber: client?.phone,
      })
      .withCustomMessageMetadata({
        chat_group: group,
      })
      .build();
  }, [chatKey, client]);

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

      <Modal
        open={isModalOpen}
        onClose={() => toggleModal()}
        cantClose
      >
        <Container>
          <h3>
            Faça seu cadastro (somente na primeira vez)
          </h3>

          <form noValidate onSubmit={handleSubmit}>
            <div>
              <p>Nome</p>
              <Input
                type="text"
                placeholder="digite seu nome"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </div>

            <div>
              <p>Telefone</p>
              <Input
                type="phone"
                placeholder="digite seu telefone"
                maxLength="15"
                value={phoneInput}
                onChange={handlePhoneChange}
              />
            </div>

            <Button
              disabled={!isFormValid}
            >
              Salvar
            </Button>

          </form>
        </Container>
      </Modal>
    </div>
  );
}
