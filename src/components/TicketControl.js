import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';

const questionArray = ["Have you gone through all the steps on the Learn How to Program debugging lesson?",
  "Have you asked another pair for help?",
  "Have you spent 15 minutes going through through the problem documenting every step?"];

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      currentQuestionNumber: 0,
      masterTicketList: [],
      selectedTicket: null
    };
  }

  handleDetailClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    }
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
  }

  handleBackClick = () => {
    this.setState({
      currentQuestionNumber: 0,
    })
  }

  handleAddingNewTicketToList = (newTicket) => {
    const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
    this.setState({
      masterTicketList: newMasterTicketList,
      formVisibleOnPage: false,
      currentQuestionNumber: 0,
      editing: false
    });
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.masterTicketList
      .filter(ticket => ticket.id === id)[0];
    this.setState({ selectedTicket: selectedTicket });
  }

  handleDeletingTicket = (id) => {
    const newMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      masterTicketList: newMasterTicketList,
      selectedTicket: null
    });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({ editing: true });
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const editedMasterTicketList = this.state.masterTicketList
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit);
    this.setState({
      masterTicketList: editedMasterTicketList,
      editing: false,
      selectedTicket: null
    });
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    let buttonPage = null;
    let breakButton = null;
    let backButton = null;
    if (this.state.editing) {
      currentlyVisibleState = <EditTicketForm ticket={this.state.selectedTicket} onEditTicket={this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
      buttonPage = this.handleDetailClick;
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket={this.state.selectedTicket} onClickingDelete={this.handleDeletingTicket} onClickingEdit={this.handleEditClick} />
      buttonText = "Return to Ticket List";
      buttonPage = this.handleDetailClick;
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
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
      currentlyVisibleState = <TicketList ticketList={this.state.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />
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