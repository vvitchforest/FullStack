import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../styles/Button.styled'

const StyledTogglableContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem 2rem 2rem;
  width: 50%;
  border-radius: 0.5rem;
  border: 1px solid #7c4dff;
`

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <section>
      <div style={hideWhenVisible}>
        <Button $primary $large onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <StyledTogglableContent
        style={showWhenVisible}
        className="togglableContent"
      >
        {props.children}
        <Button $wide onClick={toggleVisibility} style={{ margin: 'auto' }}>
          cancel
        </Button>
      </StyledTogglableContent>
    </section>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
