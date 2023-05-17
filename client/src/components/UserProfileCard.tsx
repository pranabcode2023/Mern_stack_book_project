
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';





const UserProfileCard = () => {

return (
     <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://res.cloudinary.com/dtdsw5fg2/image/upload/v1684234717/user_avatars/ibzoaehtyhpv9itx3li5.gif" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
      <Card.Link href="#">Another Link</Card.Link>
      <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default UserProfileCard;