import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Icon, Input, CardPanel } from 'react-materialize';

export default class SortFilter extends Component {

  constructor(props){
    super(props);
    this.state = {
      sortOrder: "0",
      category: "0"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCatChange = this.handleCatChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({
      sortOrder: event.target.value
    });
  }

  handleCatChange(event){
    this.setState({
      category: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <CardPanel className='z-depth-1'>
        <p className='grey-text text-darken-1 center-align'>
          Sort/Filter
        </p>
        <div className='center-align'>
          <Row className='black-text'>
            <Col s={2}>
              <Icon>
                credit_card
              </Icon>
            </Col>
            <Col s={10}>
              <form onSubmit={this.handleSubmit}>
                <Input type='select' value={this.state.sortOrder} onChange={this.handleChange}>
                  <option value="0">Price/Hour</option>
                  <option value="1">Ascending</option>
                  <option value="2">Descending</option>
                </Input>
              </form>
            </Col>
          </Row>
          <Row className='row black-text'>
            <Col s={2}>
              <Icon>
                room
              </Icon>
            </Col>
            <Col s={10}>
              <form onSubmit={this.handleSubmit}>
                <Input type='select' value={this.state.category} onChange={this.handleCatChange}>
                  <option value="0">Display All</option>
                  <option value="1">Category 1</option>
                  <option value="2">Category 2</option>
                </Input>
              </form>
            </Col>
          </Row>
        </div>
        <div className='center-align'>
          <Link to={{
            pathname: "/",
            state: {
              sortOrder: this.state.sortOrder,
              category: this.state.category
            }
          }}>
            <Button waves='light' type='submit'>
              Search
            </Button>
          </Link>
        </div>
      </CardPanel>
    );
  }
};
