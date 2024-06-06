export const editExerciseError = (exercices) => {
    let exerciseBeingEdited = null
    exercices && exercices.map(ex => {
        if (ex.edit) {
            exerciseBeingEdited = ex
        }
        return ex
    })
    return exerciseBeingEdited
}
