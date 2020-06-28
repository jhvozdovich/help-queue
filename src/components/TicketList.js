import React from "react";
import Ticket from "./Ticket";

function TicketList() {
  return (
    <React.Fragment>
      <Ticket
        location="3a"
        names="Jessica and Nick"
        issue="Firebase will not save record!" />
      <Ticket
        location="11a"
        names="Josh and Chelsea"
        issue="Pupper has eaten the hardware!" />
    </React.Fragment>
  );
}

export default TicketList;