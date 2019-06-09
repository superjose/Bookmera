import React, { memo, useEffect } from 'react';
import { styled } from '../styles/theme';

const Backdrop = styled.section`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  z-index: 1;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 1em;
`;

const Content = styled.div`
  position: fixed;
  z-index: 2;
  background-color: white;
  overflow-y: scroll;
  width: 90%;
  border-radius: ${props => props.theme.all.borderRadius};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 40rem;

  > .close-btn {
    position: absolute;
    right: 0;
    text-align: center;
    top: 0;
  }
`;

type ModalProps = {
  closeFn(): void;
};

function Modal(props: ModalProps & React.HTMLProps<HTMLDivElement>) {
  function closeModal(evt: KeyboardEvent) {
    if (evt.keyCode !== 27) return;
    props.closeFn();
  }

  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, []);

  return (
    <React.Fragment>
      <Backdrop onClick={props.closeFn} />
      <Content>
        <button className="close-btn" onClick={props.closeFn}>
          Close
        </button>
        {props.children}
      </Content>
    </React.Fragment>
  );
}
export default memo(Modal);
