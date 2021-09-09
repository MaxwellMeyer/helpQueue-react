/* eslint-disable */
import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      masterTicketList: [],
      selectedTicket: null,
    };
  }
  handleAddingNewTicketToList = (newTicket) => {
    const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
    this.setState({
      masterTicketList: newMasterTicketList,
      formVisibleOnPage: false,
    });
  };

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
      });
    } else {
      this.setState((prevState) => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  };

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.masterTicketList.filter(
      (ticket) => ticket.id === id
    )[0];
    this.setState({ selectedTicket: selectedTicket });
  };

  handleDeletingTicket = (id) => {
    const newMasterTicketList = this.state.masterTicketList.filter(
      (ticket) => ticket.id !== id
    );
    this.setState({
      masterTicketList: newMasterTicketList,
      selectedTicket: null,
    });
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.selectedTicket != null) {
      currentlyVisibleState = (
        <TicketDetail
          ticket={this.state.selectedTicket}
          onClickingDelete={this.handleDeletingTicket}
        />
      );
      buttonText = "Return to Ticket List";
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = (
        <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
      );
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = (
        <TicketList
          ticketList={this.state.masterTicketList}
          onTicketSelection={this.handleChangingSelectedTicket}
        />
      );

      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default TicketControl;
