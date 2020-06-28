import React from "react";
import Ticket from "./Ticket";

const masterTicketList = [
  {
    names: "Jessica and Nick",
    location: "3a",
    issue: "Firebase will not save record!"
  },
  {
    names: "Josh and Chelsea",
    location: "11a",
    issue: "Pupper has eaten the hardware!"
  },
  {
    names: 'Imani & Jacob',
    location: '9F',
    issue: 'Child component isn\'t rendering.'
  }
];
function TicketList() {
  return (
    <React.Fragment>
      <hr />
      {masterTicketList.map((ticket, index) =>
        <Ticket names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          key={index} />
      )}
    </React.Fragment>
  );
}

export default TicketList;