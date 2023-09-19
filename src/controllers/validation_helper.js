export const validateTask = (task) => {
  let error_message = "";

  if (task.hasOwnProperty("id"))
    error_message += "Id should not be present in payload, put it to url: tasks/${id}. "
  if (!task.hasOwnProperty("text"))
    error_message += "Missed 'text' property. "
  if (!task.hasOwnProperty("is_completed"))
    error_message += "Missed 'is_completed' property. "
  if (!task.hasOwnProperty("is_deleted"))
    error_message += "Missed 'is_completed' property. "


  if (typeof task.text !== "string")
    error_message += "'text' property should be string. "
  if (typeof task.is_completed !== "boolean")
    error_message += "'is_completed' property should be boolean. "
  if (typeof task.is_deleted !== "boolean")
    error_message += "'is_completed' property should be boolean. "

  if (error_message)
    return {isValid: false, error_message: error_message.trim()}
  else
    return {isValid: true}
}