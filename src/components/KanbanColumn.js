import React from "react";
import threedot from "../assets/3 dot menu.svg"
import plus from "../assets/add.svg"

const KanbanColumn = ({ title, tickets }) => {
  return (
    <div className="kanban-column">
      <div className="kanban-column-title">
        {/* adding svg according to title here */}
        <span>
          {title}   {tickets.length}
        </span>
        <div className="kanban-column-title-icons">
          <img
            src={plus}
            alt="Plus Icon"
          />
          <img
            src={threedot}
            alt="Three Dot Icon"
          />
        </div>
      </div>

      {tickets.map((ticket) => (
        <div key={ticket.id} className="kanban-card">
          <div className="kanban-card-id">{ticket.id}</div>
          <div className="kanban-card-title-container">
            <div className="kanban-card-title">{ticket.title}</div>
            <div className="kanban-card-user-circle">
              {ticket.username?.charAt(0).toUpperCase() || "U"}
              {/* we can add active part heree */}
            </div>
          </div>
          <div className="last-line">
            <img src={threedot} alt="Icon" /> {/*we can optimize priority svg by ticket.priority here  */}
            Feature Request
          </div>
        </div>
      ))}
    </div>
  );
};



export default KanbanColumn;

