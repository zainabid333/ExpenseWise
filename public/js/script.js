document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expensesList = document.getElementById("expenses");

  expenseForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("expense-name").value;
    const amount = document.getElementById("expense-amount").value;
    const category = document.getElementById("expense-category").value;

    const response = await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, amount, category }),
    });

    if (response.ok) {
      const expense = await response.json();
      addExpenseToList(expense);
      expenseForm.reset();
    } else {
      console.error("Failed to add expense");
    }
  });

  function addExpenseToList(expense) {
    const li = document.createElement("li");
    li.textContent = `${expense.name} - $${expense.amount} (${expense.category})`;
    expensesList.appendChild(li);
  }
});
