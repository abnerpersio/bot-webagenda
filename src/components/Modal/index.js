import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Container } from './styles';

export default function Modal({ open, onClose, cantClose, children }) {
  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container>
        {
          !cantClose
          && (
          <button type="button" className="close" onClick={onClose}>
            &times;
          </button>
          )
        }
        {children}
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  cantClose: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  cantClose: false,
};
