import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
export class FetchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const shared = this.props.prizeShared;
    const laureates = this.props.foundResults;
    console.log(laureates, shared);
    return (
      <Row className="justify-content-md-center">
        {laureates.length > 0 ? (
          this.props.foundResults.map((rezult, index) => {
            return (
              <Col xs lg="4">
                <Card style={{ width: "25rem" }}>
                  <Card.Body>
                    <Card.Title>
                      {rezult.firstname + " " + rezult.surname}
                    </Card.Title>
                    <Card.Text>
                      <Row>
                        <Col xs lg="5">
                          Date of Birth:
                        </Col>
                        <Col xs lg="7">
                          {rezult.born}
                        </Col>
                        <Col xs lg="5">
                          Born:
                        </Col>
                        <Col xs lg="7">
                          {rezult.bornCity + ", " + rezult.bornCountry}
                        </Col>
                        <Col xs lg="5">
                          Prizes:
                        </Col>
                        <Col xs lg="7">
                          {rezult.prizes.map((prize, i) => {
                            return (
                              <p>
                                {prize.year +
                                  " (" +
                                  prize.category +
                                  ") (Shared with " +
                                  prize.share +
                                  " others)"}
                              </p>
                            );
                          })}
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <Col>Not Found Any Results</Col>
        )}
      </Row>
    );
  }
}
// {laureates.length > 0 ? this.props.foundResults.map((rezult,index)=>{})}
