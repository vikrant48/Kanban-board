import React from "react";
import threedot from "../assets/3 dot menu.svg"
import plus from "../assets/add.svg"
import todoIcon from "../assets/To-do.svg";
import inProcessIcon from "../assets/in-progress.svg";
import doneIcon from "../assets/Done.svg";
import cancelledIcon from "../assets/Cancelled.svg";
import backlogIcon from "../assets/Backlog.svg";
import highPriorityIcon from "../assets/Img - High Priority.svg";
import mediumPriorityIcon from "../assets/Img - Medium Priority.svg";
import lowPriorityIcon from "../assets/Img - Low Priority.svg";
import noPriorityIcon from "../assets/No-priority.svg";
import urgentIcon from "../assets/SVG - Urgent Priority colour.svg";

const iconMapping = {
  Todo: todoIcon,
  "In progress": inProcessIcon,
  Done: doneIcon,
  Cancelled: cancelledIcon,
  Backlog: backlogIcon,
  High: highPriorityIcon,
  Medium: mediumPriorityIcon,
  Low: lowPriorityIcon,
  "No Priority": noPriorityIcon,
  Urgent: urgentIcon,
};

const KanbanColumn = ({ title, tickets }) => {

  const icon = iconMapping[title] || null;
  return (
    <div className="kanban-column">
      <div className="kanban-column-title">
        {/* adding svg according to title here */}
        <div className="kanban-column-icon">
          {icon && <img src={icon} alt={`${title} Icon`} />}
        </div>
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
              <div
                className={`user-status-dot ${ticket.available ? "active" : "inactive"}`}
              ></div>
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

