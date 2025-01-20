import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'

export default function TrashButton({ onClick }) {
  return (
    <Button
      className='trash-button bg-transparent'
      variant={'danger'}
      onClick={onClick}>
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  )
}
