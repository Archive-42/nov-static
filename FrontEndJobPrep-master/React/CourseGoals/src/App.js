import React from "react";
import "./App.css";
import CourseInput from "./components/CourseGoals/CourseInput/CourseInput";
import { useState } from "react";
import CourseGoalList from "./components/CourseGoals/CourseGoalList/CourseGoalList";

const App = () => {
  //1. courseGoalList
  // state object
  const [courseGoals, setCourseGoals] = useState([
    { text: "Do All Work", id: "g1" },
    { text: "Study the Course", id: "g2" },
  ]);

  // list
  const addGoalHandler = (enteredText) => {
    //
    setCourseGoals((prevState) => {
      const updateGoals = [...prevState];
      updateGoals.unshift({ text: enteredText, id: Math.random().toString() });
      return updateGoals;
    });
  };

  //3. add   list
  let content = <p style={{ textAlign: "center" }}>No goals. Maybe add one?</p>;

  //4.  delete
  const deleteItemHandler = (goalId) => {
    setCourseGoals((prevState) => {
      return prevState.filter((goal) => goal.id !== goalId);
    });
  };

  if (courseGoals.length > 0) {
    content = (
      <CourseGoalList items={courseGoals} onDeleteItem={deleteItemHandler} />
    );
  }

  return (
    <div>
      <section id={"goal-form"}>
        {/*2.  courseInput onAddGoal */}
        <CourseInput onAddGoal={addGoalHandler} />
      </section>
      <section id={"goals"}>{content}</section>
    </div>
  );
};

export default App;
