import React, {Component} from 'react';
import { Link } from 'react-router-dom';

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
      <div className='card-panel z-depth-1'>
        <p className='grey-text text-darken-1 center-align'>
          Sort/Filter
        </p>

        <div className='center-align'>

          <div className='row black-text'>
            <div className='col s2'>
              <i className='material-icons'>
                credit_card
              </i>
            </div>
            <div className='col s10'>
              <form onSubmit={this.handleSubmit}>
                <div className='input-field'>
                  <select value={this.state.sortOrder} className="browser-default" onChange={this.handleChange}>
                    <option value="0">Price/Hour</option>
                    <option value="1">Ascending</option>
                    <option value="2">Descending</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
          <div className='row black-text'>
            <div className='col s2'>
              <i className='material-icons'>
                room
              </i>
            </div>
            <div className='col s10'>
              <form onSubmit={this.handleSubmit}>
                <div className='input-field'>
                  <div className='input-field'>
                    <select value={this.state.category} className="browser-default" onChange={this.handleCatChange}>
                      <option value="0">Display All</option>
                      <option value="1">Category 1</option>
                      <option value="2">Category 2</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
          <div className='center-align'>
          <Link to={{
            pathname: "/",
            state: {
              sortOrder: this.state.sortOrder,
              category: this.state.category
            }
          }}>
          <button className='btn waves-effect waves-light' type='submit' name='action'>
            Search
          </button>
        </Link>
        </div>
      </div>
    );
  }
};
