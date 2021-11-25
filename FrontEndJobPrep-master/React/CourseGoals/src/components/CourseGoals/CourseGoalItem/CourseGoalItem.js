import "./CourseGoalItem.css";

const courseGoalItem = (props) => {
  // item
  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <li className={"goal-item"} onClick={deleteHandler}>
      {props.children}
    </li>
  );
};

export default courseGoalItem;
