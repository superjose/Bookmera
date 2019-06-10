import React, { memo, useEffect } from 'react';
import { styled } from '../styles/theme';
import { ButtonLink } from '../styles/buttonLink';

const Backdrop = styled.section`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
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
  background-color: ${props => props.theme.main.bodyColor};
  color: ${props => props.theme.main.textColor};
  overflow-y: auto;
  width: 90%;
  border-radius: ${props => props.theme.all.borderRadius};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 60rem;

  > .close-btn {
    position: absolute;
    right: 1rem;
    text-align: center;
    top: 1rem;
    font-size: 1.5rem;
    z-index: 2;
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
        <ButtonLink className="close-btn" onClick={props.closeFn}>
          <span className="icon-cross" />
        </ButtonLink>
        {props.children}
      </Content>
    </React.Fragment>
  );
}
export default memo(Modal);
