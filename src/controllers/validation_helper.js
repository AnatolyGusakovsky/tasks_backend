export const isValidTask = (task) => {

  if (!task.hasOwnProperty('id') ||
    !task.hasOwnProperty('text') ||
    !task.hasOwnProperty('is_completed') ||
    !task.hasOwnProperty('is_deleted')) {
    return false;
  }

  if (typeof task.id !== 'string' ||
    typeof task.text !== 'string' ||
    typeof task.is_completed !== 'boolean' ||
    typeof task.is_deleted !== 'boolean') {
    return false;
  }

  return true;
}