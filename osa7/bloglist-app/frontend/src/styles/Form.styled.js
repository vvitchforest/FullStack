import styled from 'styled-components'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 100%;
    padding: 0.5rem 0.5rem;
    margin: 0.5rem 0;
    border: 1px solid lightgrey;
    border-radius: 0.25rem;

    &:focus {
      border: 2px solid #6200ea;
      outline: none;
    }
  }

  label {
    align-self: flex-start;
  }
`
