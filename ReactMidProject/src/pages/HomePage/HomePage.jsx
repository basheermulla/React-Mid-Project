import './HomePage.css'
import { Card } from 'react-bootstrap-v5'

function HomePageComp() {
    return (
        <>
            <div className="col-sm-5">
                <div className='card mb-3 border border-dark rounded-bottom' style={{ borderRadius: '32px', backgroundColor: '#e8eaec' }}>
                    <div className='d-flex justify-content-center'>
                        <h3 className='text-center'> Home Page </h3>
                    </div>
                </div>
                <Card
                    className="mb-5 text-center bg-light"
                    border="dark"
                >
                    <Card.Body>
                        <Card.Title> This Region Used To: <br /><br /><br /> </Card.Title>
                        <Card.Title style={{ color: 'blue' }}> Display, Add, Update Or Delete Users </Card.Title>
                    </Card.Body>
                </Card>
            </div>

        </>
    )
}

export default HomePageComp