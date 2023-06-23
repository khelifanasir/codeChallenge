import React, { useState, useEffect } from "react";

const RewardsProgram = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewardsPerMonth, setRewardsPerMonth] = useState({});
  const [totalRewards, setTotalRewards] = useState({});

  useEffect(() => {
    // Simulating an asynchronous API call to fetch data
    const fetchData = async () => {
      // Mock transaction data
      const transactionData = [
        { customerId: 1, purchaseAmount: 120, date: "2023-01-15" },
        { customerId: 1, purchaseAmount: 60, date: "2023-01-20" },
        { customerId: 1, purchaseAmount: 75, date: "2023-02-05" },
        { customerId: 2, purchaseAmount: 80, date: "2023-01-10" },
        { customerId: 2, purchaseAmount: 150, date: "2023-01-25" },
        { customerId: 2, purchaseAmount: 70, date: "2023-02-05" },
        { customerId: 3, purchaseAmount: 50, date: "2023-01-05" },
        { customerId: 3, purchaseAmount: 120, date: "2023-02-15" },
        { customerId: 3, purchaseAmount: 90, date: "2023-02-20" },
        // Add more transaction data as needed
      ];

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTransactions(transactionData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate rewards per month and total
    const calculateRewards = () => {
      const rewardsPerMonthData = {};
      const totalRewardsData = {};

      transactions.forEach((transaction) => {
        const { customerId, purchaseAmount, date } = transaction;
        const [year, month] = date.split("-");

        const rewards =
          Math.max(0, purchaseAmount - 100) * 2 +
          Math.max(0, Math.min(purchaseAmount, 100) - 50);

        if (!rewardsPerMonthData[customerId]) {
          rewardsPerMonthData[customerId] = {};
        }

        if (!rewardsPerMonthData[customerId][year]) {
          rewardsPerMonthData[customerId][year] = {};
        }

        if (!rewardsPerMonthData[customerId][year][month]) {
          rewardsPerMonthData[customerId][year][month] = 0;
        }

        rewardsPerMonthData[customerId][year][month] += rewards;

        if (!totalRewardsData[customerId]) {
          totalRewardsData[customerId] = 0;
        }

        totalRewardsData[customerId] += rewards;
      });

      setRewardsPerMonth(rewardsPerMonthData);
      setTotalRewards(totalRewardsData);
    };

    calculateRewards();
  }, [transactions]);

  const getMonthName = (month) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[parseInt(month, 10) - 1];
  };

  return (
    <div>
      <h2 style={styles.text}>Rewards Program</h2>
      <div style={styles.container}>
        {Object.entries(rewardsPerMonth).map(([customerId, customerData]) => (
          <div key={customerId} style={styles.card}>
            <h4>Customer {customerId}</h4>
            {Object.entries(customerData).map(([year, yearData]) => (
              <div key={year}>
                <h5 style={styles.year}>{year}</h5>
                {Object.entries(yearData).map(([month, rewards]) => (
                  <div key={month} style={styles.month}>
                    <p>Month: {getMonthName(month)}</p>
                    <p>Rewards: {rewards}</p>
                  </div>
                ))}
              </div>
            ))}
            <p style={styles.totalRewards}>
              Total Rewards: {totalRewards[customerId]}
            </p>{" "}
            {/* Display total rewards per customer */}
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  return <RewardsProgram />;
}
const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    backgroundColor: "#f7f7f7",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    minWidth: "300px",
    maxWidth: "400px",
  },
  year: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  month: {
    marginBottom: "10px",
  },
  totalRewards: {
    marginTop: "20px",
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
  },
};

export default App;
