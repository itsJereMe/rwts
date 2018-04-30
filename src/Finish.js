// import React dependencies
import React, { Component } from 'react';


class Finish extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className="finished">
        <h4>Dat was 'm dan!</h4>
        <div className="col s12 m2 finito">
          <img className="finito" alt='' src="img/ending.gif" />
        </div>  
      </div>
    );
  }
}

export default Finish;