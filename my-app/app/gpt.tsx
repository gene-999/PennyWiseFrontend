// pages/index.js
"use client"
import React, { useState } from "react";
import Modal from "react-modal";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



const initialTransactions = [
  { id: 1, date: "1st", value: 180 },
  { id: 2, date: "2nd", value: 135 },
  { id: 3, date: "3rd", value: 45 },
  { id: 4, date: "4th", value: 75 },
  { id: 5, date: "5th", value: 90 },
  { id: 6, date: "6th", value: 150 },
  { id: 7, date: "7th", value: 160 },
  { id: 8, date: "8th", value: 120 },
  { id: 9, date: "9th", value: 90 },
  { id: 10, date: "10th", value: 70 },
  { id: 11, date: "11th", value: 110 },
  { id: 12, date: "12th", value: 130 },
];

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [transactionsData, setTransactionsData] = useState(initialTransactions);
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    value: "",
    description: "",
  });

  // Open and close modal handlers
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Add new transaction handler
  const handleAddTransaction = () => {
    if (!newTransaction.date || !newTransaction.value) {
      alert("Please fill date and value");
      return;
    }
    // Add new transaction as next day with value as number
    setTransactionsData((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        date: newTransaction.date,
        value: Number(newTransaction.value),
        description: newTransaction.description,
      },
    ]);
    setNewTransaction({ date: "", value: "", description: "" });
    closeModal();
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.brand}>Penny Wise</div>
        <div style={styles.navLinks}>
          <a href="#" style={{ ...styles.navLink, fontWeight: "bold" }}>
            Home
          </a>
          <a href="#" style={styles.navLink}>
            Transactions
          </a>
          <a href="#" style={styles.navLink}>
            AI Chatbot
          </a>
        </div>
        <div style={styles.navActions}>
          <button onClick={openModal} style={styles.addButton}>
            Add New Transaction
          </button>
          <div style={styles.profileCircle}>E</div>
          <span>Eugene</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="#666"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            style={{ marginLeft: 12, cursor: "pointer" }}
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" />
          </svg>
        </div>
      </nav>

      <h1 style={styles.greeting}>
        Hello,<strong> Eugene</strong>
        <span style={{ marginLeft: 8 }}>✨</span>
      </h1>

      <section style={styles.cards}>
        <Card
          title="Today"
          tag="#Active"
          amount="₵54.30"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              stroke="#333"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M10 14h4a4 4 0 0 0 0-8H8" />
              <path d="M10 10v4a4 4 0 0 1-4 4H6" />
              <path d="M6 6v12" />
            </svg>
          }
          description="You bought lunch and paid for a ride."
        />

        <Card
          title="This Week 💰"
          amount="₵342.75"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              stroke="#333"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          }
          description="Includes groceries, fuel, and grass touching."
        />

        <Card
          title="This Month 🏆"
          amount="₵1,982.10"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              stroke="#333"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M12 1v22" />
              <circle cx="18" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
            </svg>
          }
          description="Most of your spending went to food, bills, and data."
        />

        <Card
          title="Transactions 🧾"
          amount="47"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              stroke="#333"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <line x1="2" y1="11" x2="22" y2="11" />
            </svg>
          }
          description="You've logged 47 expenses so far this month."
        />
      </section>

      <section style={styles.monthlyOverview}>
        <div style={styles.monthTitle}>
          Monthly Overview <code>July</code>
        </div>
        <h2 style={{ marginTop: 4, marginBottom: 4 }}>₵1,982.10</h2>
        <div style={styles.growth}>
          <span style={{ color: "#00a854" }}>↑ (+75%)</span> more Last 2 Weeks
        </div>

        <ResponsiveContainer width="100%" height={180}>
          <LineChart
            data={transactionsData}
            margin={{ top: 10, right: 30, left: 0, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              interval={0}
              padding={{ left: 10, right: 10 }}
              tick={{ fontSize: 12, fill: "#666" }}
              axisLine={{ stroke: "#ccc" }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 200]}
              tickCount={5}
              tick={{ fontSize: 12, fill: "#666" }}
              axisLine={{ stroke: "#ccc" }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{ fontSize: 12, fontFamily: "monospace" }}
              formatter={(value) => [`₵${value}`, "Amount"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#00a854"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Modal for adding transaction */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Add New Transaction"
      >
        <h2>Add New Transaction</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTransaction();
          }}
        >
          <label style={styles.label}>
            Date (e.g. 13th):
            <input
              type="text"
              value={newTransaction.date}
              onChange={(e) =>
                setNewTransaction((prev) => ({ ...prev, date: e.target.value }))
              }
              style={styles.input}
              placeholder="Enter date like '13th'"
              required
            />
          </label>
          <label style={styles.label}>
            Amount (₵):
            <input
              type="number"
              value={newTransaction.value}
              onChange={(e) =>
                setNewTransaction((prev) => ({
                  ...prev,
                  value: e.target.value,
                }))
              }
              style={styles.input}
              min="0"
              step="0.01"
              required
            />
          </label>
          <label style={styles.label}>
            Description:
            <textarea
              value={newTransaction.description}
              onChange={(e) =>
                setNewTransaction((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              style={{ ...styles.input, height: 80 }}
              placeholder="Optional description"
            />
          </label>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button
              type="button"
              onClick={closeModal}
              style={{ ...styles.button, backgroundColor: "#eee" }}
            >
              Cancel
            </button>
            <button type="submit" style={{ ...styles.button, backgroundColor: "#00a854", color: "white" }}>
              Add Transaction
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const Card = ({ title, tag, amount, icon, description }) => (
  <div style={styles.card}>
    <div style={styles.cardHeader}>
      <div style={styles.cardTitle}>
        {title} {tag && <span style={styles.tag}>{tag}</span>}
      </div>
      <div style={styles.cardIcon}>{icon}</div>
    </div>
    <div style={styles.cardAmount}>{amount}</div>
    <div style={styles.cardDescription}>{description}</div>
  </div>
);

export const styles = {
  container: {
    fontFamily:
      "'SF Mono', 'Consolas', 'Courier New', monospace, 'Segoe UI', Tahoma",
    maxWidth: 1050,
    margin: "40px auto",
    padding: "0 20px",
    color: "#333",
    userSelect: "none",
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #eee",
    paddingBottom: 14,
    marginBottom: 36,
    fontSize: 14,
    color: "#888",
  },
  brand: {
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: 18,
    color: "#666",
  },
  navLinks: {
    display: "flex",
    gap: 30,
    fontWeight: "600",
  },
  navLink: {
    color: "#888",
    fontFamily: "monospace",
    textDecoration: "none",
  },
  navActions: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: 14,
    color: "#444",
  },
  addButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: 20,
    cursor: "pointer",
    fontFamily: "monospace",
    fontWeight: "600",
    fontSize: 12,
  },
  profileCircle: {
    width: 30,
    height: 30,
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "50%",
    fontWeight: "600",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
  },
  greeting: {
    fontWeight: "normal",
    fontSize: 26,
    marginBottom: 40,
    color: "#555",
  },
  cards: {
    display: "flex",
    gap: 16,
    marginBottom: 36,
    flexWrap: "wrap",
  },
  card: {
    flex: "1 1 220px",
    minWidth: 220,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 20,
    fontSize: 14,
    color: "#444",
    userSelect: "text",
    boxShadow: "0 1px 3px rgb(0 0 0 / 0.1)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 14,
    color: "#666",
    fontFamily: "monospace",
  },
  tag: {
    backgroundColor: "#d4f0e1",
    color: "#00a854",
    fontSize: 10,
    fontWeight: "700",
    borderRadius: 12,
    padding: "2px 8px",
    marginLeft: 8,
    fontFamily: "monospace",
    userSelect: "none",
  },
  cardIcon: {
    marginLeft: 10,
  },
  cardAmount: {
    fontWeight: "700",
    fontSize: 22,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: "#777",
  },
  monthlyOverview: {
    border: "1px solid #ccc",
    borderRadius: 12,
    padding: 24,
    fontFamily: "monospace",
    userSelect: "text",
  },
  monthTitle: {
    fontWeight: "700",
    color: "#888",
    fontSize: 12,
  },
  growth: {
    marginBottom: 12,
    fontSize: 12,
    color: "#555",
  },
  label: {
    display: "block",
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    width: "100%",
    padding: 8,
    fontSize: 14,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontFamily: "monospace",
    boxSizing: "border-box",
  },
  button: {
    padding: "8px 16px",
    borderRadius: 12,
    fontWeight: "700",
    fontFamily: "monospace",
    cursor: "pointer",
    border: "none",
  },
};

// Modal styles for react-modal
export const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    borderRadius: 12,
    padding: 24,
    fontFamily: "'SF Mono', monospace",
    boxShadow: "0 6px 20px rgb(0 0 0 / 0.15)",
  },
};
