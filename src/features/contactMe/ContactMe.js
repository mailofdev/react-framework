import DynamicForm from "../../components/forms/DynamicForm";
import ExampleDynamicForm from "../../components/forms/ExampleDynamicForm";

const ContactMe = () => {
    const schema = [
        {
          type: "input",
          name: "title",
          label: "Title",
        //   disabled: mode === "view" && !isEditing,
        },
        
        // Add more fields as needed
      ];
    return (
        <>
        <div>
        <ExampleDynamicForm/>
        </div>
        </>
    )
}
export default ContactMe;