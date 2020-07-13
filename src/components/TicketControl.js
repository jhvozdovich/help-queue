import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { withFirestore } from 'react-redux-firebase'

const questionArray = ["Have you gone through all the steps on the Learn How to Program debugging lesson?",
  "Have you asked another pair for help?",
  "Have you spent 15 minutes going through through the problem documenting every step?"];

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionNumber: 0,
      selectedTicket: null
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
      60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.masterTicketList).forEach(ticket => {
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    });
  }

  handleDetailClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedTicket: null,
        editing: false
      });
    }
  }

  handleFormClick = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);

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
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
    this.setState({
      currentQuestionNumber: 0,
      editing: false
    });
  }

  handleChangingSelectedTicket = (id) => {
    //practice try catch blocks for error handling invalid id!
    this.props.firestore.get({ collection: 'tickets', doc: id }).then((ticket) => {
      const firestoreTicket = {
        names: ticket.get("names"),
        location: ticket.get("location"),
        issue: ticket.get("issue"),
        id: ticket.id
      }
      this.setState({ selectedTicket: firestoreTicket });
    });
  }

  handleDeletingTicket = (id) => {
    this.props.firestore.delete({ collection: 'tickets', doc: id });
    this.setState({
      selectedTicket: null
    });
  }

  handleEditClick = () => {
    this.setState({ editing: true });
  }

  handleEditingTicketInList = () => {
    this.setState({
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
    } else if (this.props.formVisibleOnPage) {
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
      currentlyVisibleState = <TicketList ticketList={this.props.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />
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

TicketControl.propTypes = {
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);
export default withFirestore(TicketControl);