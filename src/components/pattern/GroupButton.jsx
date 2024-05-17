import { Form } from "react-bootstrap";

const GroupButton = ({
  values,
  filterType,
  filterHandler,
  groupType,
  selectedValues,
}) => {
  return (
    <Form className="group-form">
      {values &&
        values.map((item, i) => (
          <Form.Check
          className="check-box"
            key={i}
            label={item}
            type={groupType}
            name={item}
            checked={
              groupType === "checkbox"
                ? selectedValues.includes(item)
                : selectedValues === item
            }
            onChange={() => {
              filterHandler(filterType, item);
            }}
          />
        ))}
    </Form>
  );
};

export default GroupButton;
