import styled from 'styled-components'

export const Button = styled.button`
  background: ${(props) => (props.$primary ? '#6200ea' : 'transparent')};
  color: ${(props) => (props.$primary ? 'white' : '#6200ea')};

  padding: ${(props) => (props.$large ? '8px 10px' : '6px 8px')};
  min-width: ${(props) => (props.$wide ? '50%' : 'auto')};
  border: 2px solid #6200ea;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.$primary ? '#651fff' : '#6200ea')};
    color: white;
  }
`
