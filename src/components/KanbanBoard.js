import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles.css";
import KanbanColumn from "./KanbanColumn";
import displayicon from "../assets/Display.svg"
import down from "../assets/down.svg"

const priorityLabels = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No Priority",
};

const allStatuses = ["Todo", "In progress", "Backlog", "Done", "Cancelled"]; // as given in img 

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");
  const [displayDropdown, setDisplayDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );

        const { tickets, users } = response.data;

        // Map userId to userName
        const userMap = users.reduce((acc, user) => {
          acc[user.id] = user.name; 
          return acc;
        }, {});

        // Update tickets with user names
        const updatedTickets = tickets.map((ticket) => ({
          ...ticket,
          username: userMap[ticket.userId] || "Unknown User", 
        }));

        setTickets(updatedTickets);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const groupedTickets = groupBy(tickets, grouping);
  const sortedTickets = sortTickets(groupedTickets, ordering);

  return (
    <div>
      <div className="dropdown">
        <button
          className="dropdown-toggle"
          onClick={() => setDisplayDropdown(!displayDropdown)}
        >
        <img 
            src={displayicon} 
            alt="Display Icon" 
            className="dropdown-icon" 
        />
          Display
        <img 
            src={down} 
            alt="Icon" 
            className="dropdown-icon" 
        />

        </button>
        {displayDropdown && (
          <div className="dropdown-menu">
            <div>
              <label>Group by: </label>
              <select
                value={grouping}
                onChange={(e) => setGrouping(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="username">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div>
              <label>Order by: </label>
              <select
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="kanban-container">
        {Object.keys(sortedTickets).map((group) => (
          <KanbanColumn
            key={group}
            title={
              grouping === "priority"
                ? priorityLabels[group]
                : grouping === "status"
                ? group
                : group
            } 
            tickets={sortedTickets[group]}
          />
        ))}
      </div>
    </div>
  );
};

const groupBy = (tickets, key) => {
  const grouped = tickets.reduce((acc, ticket) => {
    const group = ticket[key] || "No Group";
    acc[group] = acc[group] || [];
    acc[group].push(ticket);
    return acc;
  }, {});

  // Add empty arrays for missing statuses as no done status in given api 
  if (key === "status") {
    allStatuses.forEach((status) => {
      if (!grouped[status]) {
        grouped[status] = []; 
      }
    });
  }

  return grouped;
};

const sortTickets = (tickets, orderKey) => {
  return Object.keys(tickets).reduce((acc, key) => {
    acc[key] = tickets[key].sort((a, b) => {
      if (orderKey === "priority") return b.priority - a.priority;
      if (orderKey === "title") return a.title.localeCompare(b.title);
      return 0;
    });
    return acc;
  }, {});
};

export default KanbanBoard;




