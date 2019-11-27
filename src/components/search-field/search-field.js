import React from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button
} from "react-bootstrap";
import { FetchResults } from "../fetch-results/fetch-results";
export class SearchField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foundNobelLaureates: [],
      sharedWith: [],
      laureateFirstName: "",
      laureateLastName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchNobelLaureates = this.searchNobelLaureates.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  searchNobelLaureates() {
    console.log(this.state.laureateFirstName, this.state.laureateLastName);
    const parameters = {
      firstname: this.state.laureateFirstName,
      surname: this.state.laureateLastName
    };
    return fetch(
      `https://imstrong1997.herokuapp.com/v1/api/prize/fetchprizes?firstname=${encodeURIComponent(
        parameters.firstname
      )}&surname=${encodeURIComponent(parameters.surname)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          foundNobelLaureates: responseJson["laureates"],
          sharedWith: responseJson["prizes"]
        });
        console.log(this.state.foundNobelLaureates, this.state.sharedWith);
      });
  }
  render() {
    const laureatesFound = this.state.foundNobelLaureates;
    const sharedWith = this.state.sharedWith;
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>Find Nobel Laureates</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="8">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>First Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="laureateFirstName"
                onChange={this.handleChange}
              />
              <InputGroup.Prepend>
                <InputGroup.Text>Surname</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="laureateLastName"
                onChange={this.handleChange}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="1">
            <Button
              onClick={this.searchNobelLaureates}
              size="lg"
              variant="outline-primary"
            >
              Search
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs lg="12">
            {laureatesFound.length > 0 ? (
              <FetchResults
                foundResults={laureatesFound}
                prizeShared={sharedWith}
              />
            ) : (
              undefined
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
