import "./CourseInput.css";
import { useState } from "react";
import Button from "../../UI/Button/Button";
import styled from "styled-components";

const FormControl = styled.div`
  margin: 0.5rem 0;

  & label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
    color: ${(props) => (props.invalid ? "red" : "black")};
  }

  & input {
    display: block;
    width: 100%;
    border: 1px solid ${(props) => (props.invalid ? "red" : "#ccc")};
    background: ${(props) => (props.invalid ? "#ffd7d7" : "transparent")};
    font: inherit;
    line-height: 1.5rem;
    padding: 0 0.25rem;
  }

  & input:focus {
    outline: none;
    background: #fad0ec;
    border-color: #8b005d;
  }
`;
// placeholder
//2.  prop
const CourseInput = (props) => {
  //4. goalInputChangeHandler hook
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  //3. input state state class
  const goalInputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  //5. form call props, App
  // props function
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    //6. onAddGoal APP , App
    props.onAddGoal(enteredValue);
    setEnteredValue("");
  };

  return (
    <form onSubmit={formSubmitHandler}>
      {/*   div styled component    refer to FormControl function*/}
      <FormControl invalid={!isValid}>
        <label>Course Goal</label>
        {/* input onChange */}
        <input type={"text"} onChange={goalInputChangeHandler} />
      </FormControl>
      <Button type={"submit"}>Add Goal</Button>
    </form>
  );
};

export default CourseInput;
