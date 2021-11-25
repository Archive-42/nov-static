import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
import { useState } from "react";

const NewExpense = (props) => {
  // Add new Expense,
  const [isEditing, setIsEditing] = useState(false);

  const saveExpenseData = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    // state false
    setIsEditing(false);
  };

  const isEditingHandler = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  return (
    <div className={"new-expense"}>
      {
        //isEditing false( )   true false
        isEditing ? (
          <ExpenseForm
            onSaveExpenseData={saveExpenseData}
            onCancel={cancelEditing}
          />
        ) : (
          // false cancel

          // state true
          <button onClick={isEditingHandler}>Add New Expense</button>
        )
      }
    </div>
  );
};

export default NewExpense;
