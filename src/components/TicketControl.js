import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

const questionArray = ["Have you gone through all the steps on the Learn How to Program debugging lesson?",
  "Have you asked another pair for help?",
  "Have you spent 15 minutes going through through the problem documenting every step?"];

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      currentQuestionNumber: 0 //index -1  question array
    };
  }

  handleFormClick = () => {
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage
    }));

    if (this.state.formVisibleOnPage) {
      this.setState({
        currentQuestionNumber: 0,
      })
    }
  }

  handleQuestionClick = () => {
    this.setState(prevState => {
      return { currentQuestionNumber: prevState.currentQuestionNumber + 1 }
    });

    console.log(this.state.currentQuestionNumber);
  }

  handleBackClick = () => {
    this.setState({
      currentQuestionNumber: 0,
    })
  }




  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    let buttonPage = null;
    let breakButton = null;
    let backButton = null;

    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm />
      buttonText = "Return to Ticket List";
      buttonPage = this.handleFormClick;
    } else if (this.state.currentQuestionNumber === 1) {
      currentlyVisibleState = questionArray[0];
      buttonPage = this.handleQuestionClick;
      buttonText = "Yes";
      breakButton = <br />;
      backButton = <button onClick={this.handleBackClick}>Back</button>
    } else if (this.state.currentQuestionNumber === 2) {
      currentlyVisibleState = questionArray[1];
      buttonPage = this.handleQuestionClick;
      buttonText = "Yes";
      breakButton = <br />;
      backButton = <button onClick={this.handleBackClick}>Back</button>
    } else if (this.state.currentQuestionNumber === 3) {
      currentlyVisibleState = questionArray[2];
      buttonPage = this.handleFormClick;
      buttonText = "Yes";
      breakButton = <br />;
      backButton = <button onClick={this.handleBackClick}>Back</button>
    }
    else {
      currentlyVisibleState = <TicketList />
      buttonText = "Add Ticket";
      buttonPage = this.handleQuestionClick;
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        {breakButton}
        <button onClick={buttonPage}>{buttonText}</button>
        {backButton}
      </React.Fragment >
    );
  }
}
export default TicketControl;